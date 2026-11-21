"use strict";
/* ================================================================
   REALM ENGINE: progression, gear, summoning, battles, quests, arena.
   Battle logic is pure (no DOM) so it can be tested headless.
   ================================================================ */
const RL_SET_DEFAULT={on:true,gemsPerPoint:3,startGems:300,summonCost:100,rates:{3:72,4:24,5:4},pity:60,energy:true,energyMax:60,energyMin:3,arena:true,arenaDaily:6,arenaScope:'class',mathSkills:true,mathTime:25,auto:true};
const rlCfg=()=>({...RL_SET_DEFAULT,...((typeof state!=='undefined'&&state&&state.settings&&state.settings.realm)||{}),rates:{...RL_SET_DEFAULT.rates,...(((typeof state!=='undefined'&&state&&state.settings&&state.settings.realm)||{}).rates||{})}});
const rlRand=a=>a[Math.floor(Math.random()*a.length)];
const rlClamp=(v,a,b)=>Math.max(a,Math.min(b,v));
function rlSeed(str){let h=2166136261;for(const ch of String(str)){h^=ch.charCodeAt(0);h=Math.imul(h,16777619)}return()=>{h+=0x6D2B79F5;let t=h;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296}}
const rlDay=()=>{const d=new Date();return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()};
const rlWeek=()=>Math.floor((Date.now()/864e5+3)/7);

/* ---------- profile ---------- */
function rlNew(){return{v:2,started:false,heroes:{},gear:[],gid:1,gold:2000,gems:0,energy:60,eT:Date.now(),ess:{any:0},tomes:2,pos:'g0',seen:{g0:1},vis:{g0:1},clr:{},chests:{},shr:{},q:{},daily:null,team:[],pity:0,pulls:0,tower:0,kills:{},math:{ok:0,tot:0},log:[]}}
function rlMigrate(p){if(!p||typeof p!=='object'||p.v!==2)return null; // v2: element-free Realm, older saves start fresh
  const d=rlNew();for(const k in d)if(p[k]===undefined)p[k]=d[k];
  if(!p.sq){(p.gear||[]).forEach(g=>(g.sub||[]).forEach(q=>{if(q[0]==='hp')q[1]=Math.max(1,Math.round(q[1]/RL_SQ));else if(q[0]==='atk'||q[0]==='def')q[1]=Math.max(1,Math.round(q[1]/RL_SQ))}));p.sq=1}
  return p}
function rlGiftHero(p,g){const[id,f]=String(g).split('@');if(!RL_H[id])return null;const fm=Math.max(0,Math.min(2,+f||0)),want=Math.min([1,CR_EVO[0],CR_EVO[1]][fm],rlMaxLv(RL_H[id].r));
  if(!rlAddHero(p,id)){const h=p.heroes[id],k=[1,2,0].find(k=>h.sk[k]<rlSkMax(id,k));if(k!=null)h.sk[k]++}
  const h=p.heroes[id];if(h.lv<want){h.lv=Math.min(want,rlMaxLv(h.st));h.xp=0}return crName(id,h.lv)}
function rlAddHero(p,id){if(p.heroes[id])return false;p.heroes[id]={lv:1,xp:0,st:RL_H[id].r,sk:[1,1,1],g:[0,0,0,0,0,0]};return true}

/* ---------- storage: one document per student ---------- */
const RLS={cache:{},timers:{},busy:{},again:{}};
async function rlLoad(sid){
  if(RLS.cache[sid])return RLS.cache[sid];
  let d=null;
  try{if(store.db){const sn=await store.db.doc('realm/'+sid).get();if(sn.exists)d=JSON.parse(JSON.stringify(sn.data()))}
      else if(store.kind==='local'){const raw=localStorage.getItem('clutch-realm-'+sid);if(raw)d=JSON.parse(raw)}}catch(e){}
  RLS.cache[sid]=rlMigrate(d)||rlNew();return RLS.cache[sid];
}
function rlSave(sid){clearTimeout(RLS.timers[sid]);RLS.timers[sid]=setTimeout(()=>rlFlush(sid),700)}
async function rlFlush(sid){
  const p=RLS.cache[sid];if(!p)return;
  if(RLS.busy[sid]){RLS.again[sid]=true;return}
  RLS.busy[sid]=true;
  try{const body=JSON.parse(JSON.stringify(p));if(store.db)await store.db.doc('realm/'+sid).set(body);else if(store.kind==='local')localStorage.setItem('clutch-realm-'+sid,JSON.stringify(body))}
  catch(e){if(typeof setStatus==='function')setStatus('error')}
  RLS.busy[sid]=false;if(RLS.again[sid]){RLS.again[sid]=false;rlFlush(sid)}
}

/* ---------- energy ---------- */
function rlEnergy(p){const c=rlCfg();if(!c.energy)return Infinity;const step=c.energyMin*60000;if(p.energy>=c.energyMax){p.eT=Date.now();return p.energy}
  const n=Math.floor((Date.now()-p.eT)/step);if(n>0){p.energy=Math.min(c.energyMax,p.energy+n);p.eT+=n*step;if(p.energy>=c.energyMax)p.eT=Date.now()}return p.energy}
function rlEnergyNext(p){const c=rlCfg();if(!c.energy||p.energy>=c.energyMax)return 0;return Math.max(0,c.energyMin*60000-(Date.now()-p.eT))}
const RL_COST={battle:4,elite:6,boss:8,dungeon:6,tower:0,arena:0};

/* ---------- levels ---------- */
const rlMaxLv=st=>[0,20,25,30,40,50,60][st]||60;
const rlXpNeed=lv=>40+lv*lv*12;
function rlGiveXp(p,id,xp){const h=p.heroes[id];if(!h)return 0;let ups=0;const mx=rlMaxLv(h.st);if(h.lv>=mx)return 0;h.xp+=xp;while(h.lv<mx&&h.xp>=rlXpNeed(h.lv)){h.xp-=rlXpNeed(h.lv);h.lv++;ups++}if(h.lv>=mx)h.xp=0;return ups}
const RL_PROMO=[0,0,0,0,30,60,120];
const rlPromoCost=st=>({ess:RL_PROMO[st+1]||0,gold:6000*st});
const rlSkMax=(h,i)=>RL_H[h]?(RL_H[h].sk[i].pas?1:3):3;

/* ---------- stats ---------- */
const RL_SQ=10,rlR1=v=>Math.round(v*10)/10;
const RL_ROLEB={atk:[520,72,40,18,70,0,15],def:[590,50,68,15,50,0,25],sup:[580,56,50,15,50,15,20],hp:[770,52,52,15,50,0,25]};
function rlBaseStats(id,lv,st){
  const h=RL_H[id],b=RL_ROLEB[h.role],rm=[1,1,1,1,1.1,1.22][h.r],g=(1+.09*(lv-1))*Math.pow(1.1,Math.max(0,st-h.r))*rm;
  return{hp:Math.round(b[0]*g/RL_SQ),atk:rlR1(b[1]*g/RL_SQ),def:rlR1(b[2]*g/RL_SQ),spd:h.spd,cr:b[3],cd:b[4],acc:b[5],res:b[6],steal:0};
}
function rlGearVal(g){const m=RL_GSTAT[g.m],v=m.main[0]+m.main[1]*g.lv;return['hp','atk','def'].includes(g.m)?Math.round(v):Math.round(v*10)/10}
function rlHeroStats(p,id,extra){
  const h=p.heroes[id],s=rlBaseStats(id,h.lv,h.st),flat={hp:0,atk:0,def:0,spd:0,cr:0,cd:0,acc:0,res:0},pct={hp:0,atk:0,def:0,spd:0},sets={};
  const add=(k,v)=>{if(k==='hpP')pct.hp+=v;else if(k==='atkP')pct.atk+=v;else if(k==='defP')pct.def+=v;else if(k==='spdP')pct.spd+=v;else if(k==='steal')s.steal+=v;else flat[k]+=v};
  (h.g||[]).forEach(gid=>{const g=gid&&p.gear.find(x=>x.i===gid);if(!g)return;add(g.m,rlGearVal(g));g.sub.forEach(q=>add(q[0],q[1]));sets[g.set]=(sets[g.set]||0)+1});
  for(const k in sets){const S=RL_SETS[k];const n=Math.floor(sets[k]/S.pcs);for(let i=0;i<n;i++)for(const b in S.b)add(b,S.b[b])}
  for(const nid in p.shr){const n=RL_N[nid];if(n&&n.buff)add(n.buff[0],n.buff[1])}
  if(extra)for(const k in extra)add(k,extra[k]);
  const out={hp:Math.round(s.hp*(1+pct.hp/100)+flat.hp),atk:rlR1(s.atk*(1+pct.atk/100)+flat.atk),def:rlR1(s.def*(1+pct.def/100)+flat.def),spd:Math.round(s.spd*(1+pct.spd/100)+flat.spd),cr:Math.min(100,s.cr+flat.cr),cd:s.cd+flat.cd,acc:s.acc+flat.acc,res:Math.min(100,s.res+flat.res),steal:s.steal};
  out.sets=Object.keys(sets).filter(k=>sets[k]>=RL_SETS[k].pcs);return out;
}
const rlPower=st=>Math.round(st.hp+st.atk*22+st.def*20+st.spd*3+st.cr*3+st.cd*1.2+st.acc+st.res);

/* ---------- gear ---------- */
function rlRollSub(k){const r=RL_GSTAT[k].sub;return Math.round(r[0]+Math.random()*(r[1]-r[0]))}
function rlGearNew(p,o){
  const slot=o.slot!=null?o.slot:Math.floor(Math.random()*6),main=rlRand(RL_SLOTS[slot].main),rar=o.r||'common',set=o.set||rlRand(Object.keys(RL_SETS));
  const g={i:p.gid++,s:slot,set,r:rar,lv:0,m:main,sub:[]};
  const n=RL_GRAR.indexOf(rar)+1;
  while(g.sub.length<n){const k=rlRand(RL_SUBKEYS.filter(k=>k!==main&&!g.sub.some(q=>q[0]===k)));g.sub.push([k,rlRollSub(k)])}
  p.gear.push(g);return g;
}
function rlDropRarity(lv,bonus){const r=Math.random()*100+(bonus||0)+lv*.6;return r>97?'legendary':r>82?'epic':r>50?'rare':'common'}
const rlUpCost=g=>Math.round((g.lv+1)*(g.lv+1)*55*(1+RL_GRAR.indexOf(g.r)*.5));
const rlSellVal=g=>Math.round((120+g.lv*g.lv*30)*(1+RL_GRAR.indexOf(g.r)));
function rlUpgrade(p,g){if(g.lv>=12)return'max';const c=rlUpCost(g);if(p.gold<c)return'gold';p.gold-=c;g.lv++;
  if(g.lv%3===0){if(g.sub.length<4){const k=rlRand(RL_SUBKEYS.filter(k=>k!==g.m&&!g.sub.some(q=>q[0]===k)));g.sub.push([k,rlRollSub(k)])}else{const q=rlRand(g.sub);q[1]+=rlRollSub(q[0])}}
  return'ok'}
function rlEquip(p,hid,gid){const g=p.gear.find(x=>x.i===gid);if(!g)return;for(const id in p.heroes){const h=p.heroes[id];if(h.g[g.s]===gid)h.g[g.s]=0}p.heroes[hid].g[g.s]=gid}
const rlOwner=(p,gid)=>Object.keys(p.heroes).find(id=>p.heroes[id].g.includes(gid));

/* ---------- summoning ---------- */
function rlFeatured(){const top=Math.max(...RL_HEROES.map(h=>h.r)),f=RL_HEROES.filter(h=>h.r===top);return f[rlWeek()%f.length].id}
function rlSummon(p,n){
  const c=rlCfg(),out=[],R=c.rates,tot=(+R[3]||0)+(+R[4]||0)+(+R[5]||0)||100,feat=rlFeatured();
  for(let i=0;i<n;i++){
    p.pity++;p.pulls++;
    let x=Math.random()*tot,r=x<(+R[5]||0)?5:x<(+R[5]||0)+(+R[4]||0)?4:3;
    if(c.pity>0&&p.pity>=c.pity)r=5;
    if(n>=10&&i===n-1&&!out.some(o=>RL_H[o.id].r>=4)&&r<4)r=4;
    // the 3★ slot also covers Common/Uncommon heroes: 40% of those pulls land on one when any exist
    if(r===3&&RL_HEROES.some(h=>h.r<3)&&Math.random()<.4)r=Math.random()<.6||!RL_HEROES.some(h=>h.r===2)?(RL_HEROES.some(h=>h.r===1)?1:2):2;
    let pool=RL_HEROES.filter(h=>h.r===r);if(!pool.length){const rs=[...new Set(RL_HEROES.map(h=>h.r))].sort((a,b)=>Math.abs(a-r)-Math.abs(b-r)||b-a);pool=RL_HEROES.filter(h=>h.r===rs[0])}let id=(r===5&&Math.random()<.5)?feat:rlRand(pool).id;
    if(r===5)p.pity=0;
    const isNew=rlAddHero(p,id);let note='new';
    if(!isNew){const h=p.heroes[id];const idx=[1,2,0].find(k=>h.sk[k]<rlSkMax(id,k));if(idx!=null){h.sk[idx]++;note='skill'}else{p.ess.any+=10*r;note='ess'}}
    out.push({id,note});
  }
  return out;
}

/* ---------- encounters ---------- */
function rlMonUnit(type,el,lv,o){
  const m=RL_MON[type].m,g=(1+.13*(lv-1))*(1+lv*.016),gd=1+.085*(lv-1),bs=o&&o.boss?3.6:o&&o.elite?2.1:1,ba=o&&o.boss?1.25:o&&o.elite?1.12:1;
  const sk=RL_MON[type].sk.slice();if(o&&(o.boss||o.elite))sk.push(RL_BOSS_SK(el));
  return{kind:'mon',id:type,el,lv,boss:!!(o&&o.boss),elite:!!(o&&o.elite),name:(o&&o.name)||RL_MON[type].n,sk,skl:[1,1,1],
    stats:{hp:Math.round(40*m[0]*g*bs),atk:rlR1(6*m[1]*g*ba),def:rlR1(4.2*m[2]*gd*(o&&o.boss?1.2:1)),spd:m[3]+Math.floor(lv/6),cr:15,cd:50,acc:Math.round(lv*.7),res:Math.round(15+lv*.5),steal:0}};
}
function rlEncounter(nodeId,o){
  const n=RL_N[nodeId],reg=RL_REG[n?n.reg:'a'],rnd=rlSeed(nodeId+':'+(o&&o.seed||0)),pick=a=>a[Math.floor(rnd()*a.length)];
  let lv=n&&n.lv||1,waves=[],kind=n?n.t:'battle',pool=reg.pool;
  const mob=(L)=>{const q=pick(pool);return rlMonUnit(q[0],q[1],L)};
  if(o&&o.tier!=null){const D=RL_DUNGEON[nodeId];lv=RL_DUNGEON_TIERS[o.tier].lv;pool=[['golem',D.el],['wisp',D.el],['slime',D.el],['specter',D.el]];
    waves=[[mob(lv),mob(lv),mob(lv)],[mob(lv),mob(lv),mob(lv)],[mob(lv),rlMonUnit('golem',D.el,lv+1,{elite:true,name:'Vault Guardian'}),mob(lv)]];kind='dungeon'}
  else if(o&&o.floor){lv=Math.round(30+o.floor*1.5);pool=RL_REG.a.pool;const bossF=o.floor%5===0;
    waves=[[mob(lv),mob(lv),mob(lv)],bossF?[mob(lv),rlMonUnit(pick(['drake','papergolem','golem']),pick(RL_ELS),lv+1,{boss:true,name:'Trial Warden '+o.floor}),mob(lv)]:[mob(lv),mob(lv),mob(lv),mob(lv)]];kind='tower'}
  else if(kind==='boss'){const b=n.boss;waves=[[mob(lv-1),mob(lv-1),mob(lv-1)],[mob(lv-1),rlMonUnit(b[0],b[1],lv,{boss:true,name:b[2]}),mob(lv-1)]]}
  else if(kind==='elite'){const q=pick(pool);waves=[[mob(lv),mob(lv),mob(lv)],[mob(lv),rlMonUnit(q[0],q[1],lv+1,{elite:true,name:'Elite '+RL_MON[q[0]].n}),mob(lv)]]}
  else{const nw=lv<6?2:3;for(let w=0;w<nw;w++)waves.push(Array.from({length:lv<3?2+w:3},()=>mob(Math.max(1,lv-(w<nw-1?1:0)))))}
  return{lv,waves,kind};
}

/* ---------- battle engine ---------- */
function rlHeroUnit(p,id,stats){const h=p?p.heroes[id]:null,H=RL_H[id];return{kind:'hero',id,el:H.el,lv:h?h.lv:1,st:h?h.st:H.r,name:H.n,sk:H.sk,skl:h?h.sk.slice():[1,1,1],stats:stats||rlHeroStats(p,id)}}
function rlBattle(allies,waves,opt){
  const B={side:[[],[]],waves,wave:0,turn:0,log:[],status:'go',uid:1,opt:opt||{}};
  const mk=(d,side)=>{const s=d.stats,u={...d,uid:B.uid++,side,maxHp:s.hp,hp:s.hp,atb:0,cds:[0,0,0],fx:[],alive:true,shield:0,revived:false};
    u.pas=(d.sk.find(k=>k.pas)||{});if(u.pas.pas==='firstStrike')u.atb=50;if(u.pas.pas==='lifesteal')u.stats={...s,steal:(s.steal||0)+u.pas.v};return u};
  const lead=(units)=>{const L=units[0]&&units[0].kind==='hero'&&RL_H[units[0].id].ld;if(!L)return;units.forEach(u=>{const s=u.stats={...u.stats};if(L.s==='hp'){s.hp=Math.round(s.hp*(1+L.v/100));u.maxHp=u.hp=s.hp}else if(L.s==='atk'||L.s==='def')s[L.s]=Math.round(s[L.s]*(1+L.v/100));else if(L.s==='spd')s.spd=Math.round(s.spd*(1+L.v/100));else s[L.s]+=L.v})};
  B.side[0]=allies.map(d=>mk(d,0));lead(B.side[0]);
  B.loadWave=()=>{B.side[1]=B.waves[B.wave].map(d=>mk(d,1));if(B.opt.enemyLeader)lead(B.side[1]);B.side[0].forEach(u=>{if(u.alive)u.atb=Math.max(u.atb,0)})};
  B.loadWave();
  B.all=()=>B.side[0].concat(B.side[1]);
  B.find=uid=>B.all().find(u=>u.uid===uid);
  return B;
}
const rlHas=(u,k)=>u.fx.some(f=>f.k===k);
function rlEff(u,k){let v=u.stats[k];
  if(k==='atk'){if(rlHas(u,'atkUp'))v*=1.5;if(rlHas(u,'atkBreak'))v*=.6}
  if(k==='def'){if(rlHas(u,'defUp'))v*=1.5;if(rlHas(u,'defBreak'))v*=.5}
  if(k==='spd'){if(rlHas(u,'spdUp'))v*=1.3;if(rlHas(u,'slow'))v*=.7}
  if(k==='cr'&&rlHas(u,'critUp'))v+=30;
  return v}
function rlAdv(a,b){return 0} // no element matchups
/* advance the turn bar until someone can act; returns that unit or null when battle is over */
function rlNextActor(B){
  if(B.status!=='go')return null;
  const live=B.all().filter(u=>u.alive);
  let best=null;for(const u of live)if(u.atb>=100&&(!best||u.atb>best.atb))best=u;
  if(!best){let tmin=Infinity;for(const u of live){const t=(100-u.atb)/rlEff(u,'spd');if(t<tmin)tmin=t}
    for(const u of live)u.atb+=rlEff(u,'spd')*tmin;for(const u of live)if(u.atb>=99.999&&(!best||u.atb>best.atb||(u.atb===best.atb&&rlEff(u,'spd')>rlEff(best,'spd'))))best=u}
  return best;
}
/* start of a unit's turn: damage over time, regen, stun. returns events and whether the unit can act */
function rlTurnStart(B,u){
  const ev=[];B.turn++;u.atb=0;u.cds=u.cds.map(c=>Math.max(0,c-1));
  const burns=u.fx.filter(f=>f.k==='burn').length;
  if(burns){const d=Math.round(u.maxHp*.06*burns);rlDamage(B,u,d,ev,{dot:true})}
  // Seeded: the seed drains 5% HP and heals the most hurt unit on the other side
  if(u.alive&&rlHas(u,'seed')){const d=Math.round(u.maxHp*.05);rlDamage(B,u,d,ev,{dot:true});const fr=B.side[1-u.side].filter(x=>x.alive).sort((a,b)=>a.hp/a.maxHp-b.hp/b.maxHp)[0];if(fr)rlHeal(fr,d,ev)}
  if(u.alive&&rlHas(u,'regen')){const a=Math.round(u.maxHp*.12);rlHeal(u,a,ev)}
  if(!u.alive){rlCheck(B,ev);return{ev,can:false}}
  if(rlHas(u,'stun')){ev.push({k:'skip',u:u.uid});rlTick(u,ev);return{ev,can:false}}
  if(rlHas(u,'drowsy')&&Math.random()<.35){u.fx=u.fx.filter(x=>x.k!=='drowsy');ev.push({k:'doze',u:u.uid});rlTick(u,ev);return{ev,can:false}}
  return{ev,can:true};
}
function rlTick(u,ev){u.fx.forEach(f=>f.t--);const gone=u.fx.filter(f=>f.t<=0);u.fx=u.fx.filter(f=>f.t>0);if(gone.length)ev.push({k:'fxgone',u:u.uid});if(!rlHas(u,'shield'))u.shield=0}
function rlHeal(u,a,ev){if(!u.alive)return;const b=u.hp;u.hp=Math.min(u.maxHp,u.hp+Math.round(a));const d=u.hp-b;if(d>0)ev.push({k:'heal',u:u.uid,v:d})}
function rlDamage(B,u,amt,ev,o){
  let a=Math.max(1,Math.round(amt));
  // Earthen Bulwark: a stone wall blunts direct hits
  if(!(o&&(o.dot||o.guarded))&&rlHas(u,'bulwark'))a=Math.max(1,Math.round(a*.75));
  // Guardian Current: the guardian takes 30% of direct hits aimed at a guarded ally
  const gd=!(o&&(o.dot||o.guarded))&&u.fx.find(f=>f.k==='guard');if(gd){const G=B.all().find(x=>x.uid===gd.src);if(G&&G.alive&&G!==u){const sh=Math.round(a*.3);if(sh>0){a-=sh;ev.push({k:'guarded',u:u.uid,g:G.uid});rlDamage(B,G,sh,ev,{guarded:true})}}}if(u.shield>0){const s=Math.min(u.shield,a);u.shield-=s;a-=s;if(u.shield<=0)u.fx=u.fx.filter(f=>f.k!=='shield')}
  u.hp=Math.max(0,u.hp-a);ev.push({k:'hit',u:u.uid,v:Math.round(amt),hp:u.hp,crit:o&&o.crit,adv:o&&o.adv,dot:o&&o.dot});
  if(u.hp<=0&&u.alive){u.alive=false;u.atb=0;u.fx=[];u.shield=0;ev.push({k:'die',u:u.uid})}
  return a}
function rlApplyFx(B,src,tgt,f,power,ev,isEnemy){
  const k=f[0],F=RL_FX[k];
  if(k==='heal'){rlHeal(tgt,src.maxHp*f[1]/100*power,ev);return}
  if(k==='healT'){rlHeal(tgt,tgt.maxHp*f[1]/100*power,ev);return}
  if(k==='cleanse'){if(tgt.fx.some(x=>!RL_FX[x.k].buff)){tgt.fx=tgt.fx.filter(x=>RL_FX[x.k].buff);ev.push({k:'cleanse',u:tgt.uid})}return}
  if(k==='strip'){const b=tgt.fx.filter(x=>RL_FX[x.k].buff).slice(0,f[1]);if(b.length){tgt.fx=tgt.fx.filter(x=>!b.includes(x));if(!rlHas(tgt,'shield'))tgt.shield=0;ev.push({k:'strip',u:tgt.uid})}return}
  if(k==='atb'){if(tgt.alive){tgt.atb=Math.min(100,tgt.atb+f[1]);ev.push({k:'atb',u:tgt.uid,v:f[1]})}return}
  if(k==='revive'){return}
  if(k==='atbDown'){if(power<1)return;if(Math.random()*100<f[2]&&!rlResist(src,tgt)&&!rlHas(tgt,'immune')){tgt.atb=Math.max(0,tgt.atb-f[1]);ev.push({k:'atb',u:tgt.uid,v:-f[1]})}else ev.push({k:'resist',u:tgt.uid});return}
  if(!F)return;
  if(k==='guard'&&tgt===src)return; // the guardian doesn't guard himself
  if(F.buff){const t=k==='shield'?f[2]:f[1];tgt.fx=tgt.fx.filter(x=>x.k!==k);tgt.fx.push(k==='guard'?{k,t,src:src.uid}:{k,t:t+(tgt===src?1:0)});if(k==='shield'){tgt.shield=Math.round(src.maxHp*f[1]/100*power*(tgt===src?1:1))}ev.push({k:'fx',u:tgt.uid,f:k});return}
  // debuff
  if(power<1||!tgt.alive)return;
  if(Math.random()*100>=f[2])return;
  if(rlHas(tgt,'immune')||rlResist(src,tgt)){ev.push({k:'resist',u:tgt.uid});return}
  if(k==='chill'){tgt.fx.push({k,t:f[1]});if(tgt.fx.filter(x=>x.k==='chill').length>=3){tgt.fx=tgt.fx.filter(x=>x.k!=='chill'&&x.k!=='stun');tgt.fx.push({k:'stun',t:1});ev.push({k:'frozen',u:tgt.uid});return}}
  else if(k==='burn'){if(tgt.fx.filter(x=>x.k==='burn').length<3)tgt.fx.push({k,t:f[1]})}
  else{tgt.fx=tgt.fx.filter(x=>x.k!==k);tgt.fx.push({k,t:f[1]})}
  ev.push({k:'fx',u:tgt.uid,f:k});
}
function rlResist(src,tgt){return Math.random()*100<rlClamp(tgt.stats.res-src.stats.acc,15,90)}
function rlUsable(u,i){const s=u.sk[i];if(!s||s.pas)return false;if(i>0&&rlHas(u,'seal'))return false;return u.cds[i]<=0}
function rlTargets(B,u,s,tid){
  const foes=B.side[1-u.side].filter(x=>x.alive),mine=B.side[u.side].filter(x=>x.alive);
  if(s.bounce&&foes.length)return Array.from({length:s.bounce},()=>foes[Math.floor(Math.random()*foes.length)]); // Ricochet: random enemy per hit
  if(s.tg==='eA')return foes;if(s.tg==='aA')return s.fx.some(f=>f[0]==='revive')?B.side[u.side]:mine;if(s.tg==='self')return[u];
  if(s.tg==='a1')return[mine.find(x=>x.uid===tid)||mine[0]];
  return[foes.find(x=>x.uid===tid)||foes[0]];
}
/* perform a skill. power: 1 = full, 0.5 = math answer missed */
function rlAct(B,u,i,tid,power){
  const s=u.sk[i],ev=[],pw=power==null?1:power,lvl=u.skl[i]||1,bonus=1+.1*(lvl-1);
  const tg=rlTargets(B,u,s,tid);ev.push({k:'act',u:u.uid,s:i,t:tg.map(x=>x.uid),p:pw});
  if(s.cd)u.cds[i]=Math.max(1,s.cd-(lvl>=3?1:0));
  const foe=s.tg==='e1'||s.tg==='eA';
  if(foe&&s.m>0){
    for(const t of tg){if(!t.alive)continue;
      const adv=rlAdv(u.el,t.el);
      for(let h=0;h<(s.h||1);h++){if(!t.alive)break;
        let base=s.sc==='def'?rlEff(u,'def'):s.sc==='hp'?u.maxHp*2:rlEff(u,'atk');
        let d=base*s.m*bonus*pw;
        let def=rlEff(t,'def')*(1-(s.ign||0));d*=1000/(1140+3.5*RL_SQ*def);
        if(adv>0)d*=1.3;if(adv<0)d*=.75;
        if(s.exec&&t.hp<t.maxHp*.5)d*=1+s.exec; // Finisher
        if(s.opener&&t.hp>=t.maxHp)d*=1+s.opener; // Opening strike
        if(s.vsDaze&&rlHas(t,'daze'))d*=1+s.vsDaze;
        if(s.vsChill)d*=1+s.vsChill*t.fx.filter(x=>x.k==='chill').length;
        if(u.tempo)d*=1+.1*u.tempo+(s.crescendo?s.crescendo*u.tempo:0); // Tempo: +10% per beat; Crescendo spends it big
        if(rlHas(t,'mark'))d*=1.25;if(s.vsBurn&&rlHas(t,'burn'))d*=1+s.vsBurn;
        const cr=rlEff(u,'cr')+(adv>0?15:adv<0?-15:0),crit=(s.critMark&&rlHas(t,'mark'))||Math.random()*100<cr;if(crit)d*=1+u.stats.cd/100;
        d*=.95+Math.random()*.1;
        const dealt=rlDamage(B,t,d,ev,{crit,adv});
        if(s.splash&&h===0)for(const o2 of B.side[t.side].filter(x=>x.alive&&x!==t))rlDamage(B,o2,d*s.splash,ev,{}); // Aftershock
        if(u.stats.steal)rlHeal(u,dealt*u.stats.steal/100,ev);
      }
      const preDaze=s.ring&&rlHas(t,'daze');
      for(const f of s.fx)if(f[0]!=='self'&&f[0]!=='team')rlApplyFx(B,u,t,f,pw*bonus,ev,true);
      // Resonance: an enemy already Dazed when the burst lands is stunned
      if(s.ring&&t.alive&&preDaze&&!rlHas(t,'immune')){t.fx=t.fx.filter(x=>x.k!=='daze'&&x.k!=='stun');t.fx.push({k:'stun',t:1});ev.push({k:'fx',u:t.uid,f:'stun'})}
      // Foxfire: set off every Burn on the target at once (their remaining burn damage, capped)
      if(s.det&&t.alive){const bs=t.fx.filter(x=>x.k==='burn');if(bs.length){const left=bs.reduce((a,x)=>a+Math.max(1,x.t),0);t.fx=t.fx.filter(x=>x.k!=='burn');ev.push({k:'det',u:t.uid});rlDamage(B,t,Math.min(t.maxHp*.06*left,rlEff(u,'atk')*3.2)*pw,ev,{dot:true})}}
      // Rune Ward: whoever strikes a warded unit gets Chilled
      if(u.alive&&rlHas(t,'rime')&&!B._rime){B._rime=true;rlApplyFx(B,t,u,['chill',3,60],1,ev,true);B._rime=false}
      // Flame Ward: whoever strikes a warded unit may catch fire
      if(u.alive&&rlHas(t,'ward')&&!B._ward){B._ward=true;rlApplyFx(B,t,u,['burn',2,50],1,ev,true);B._ward=false}
      if(t.alive&&t.pas.pas==='counter'&&s.tg==='e1'&&!B._counter&&Math.random()*100<t.pas.v){B._counter=true;ev.push({k:'counter',u:t.uid});ev.push(...rlAct(B,t,0,u.uid,1));B._counter=false}
    }
  }else if(foe){for(const t of tg)for(const f of s.fx)if(f[0]!=='self'&&f[0]!=='team')rlApplyFx(B,u,t,f,pw*bonus,ev,true)}
  else{
    for(const f of s.fx){if(f[0]==='revive'){for(const t of B.side[u.side])if(!t.alive&&!t.revived){t.alive=true;t.revived=true;t.hp=Math.round(t.maxHp*f[1]/100*pw);t.atb=0;ev.push({k:'revive',u:t.uid,hp:t.hp})}continue}
      if(f[0]==='self'||f[0]==='team')continue;for(const t of tg)if(t.alive)rlApplyFx(B,u,t,f,pw*bonus,ev,false)}
  }
  for(const f of s.fx){if(f[0]==='self')rlApplyFx(B,u,u,f.slice(1),pw*bonus,ev,false);if(f[0]==='team')for(const t of B.side[u.side])if(t.alive)rlApplyFx(B,u,t,f.slice(1),pw*bonus,ev,false)}
  // Tempo: Rio's beats build up with each skill; Rhythm Burst spends them
  if(s.crescendo&&u.tempo){u.tempo=0;ev.push({k:'tempo',u:u.uid,v:0})}else if(s.tempo){const b=u.tempo||0;u.tempo=Math.min(3,b+s.tempo);if(u.tempo!==b)ev.push({k:'tempo',u:u.uid,v:u.tempo})}
  // Dusk Dash: landing the final blow lets her move again right away
  if(s.again&&u.alive&&tg.some(t=>!t.alive)){u.atb=100;ev.push({k:'again',u:u.uid})}
  if(!B._counter)rlTick(u,ev);
  rlCheck(B,ev);return ev;
}
function rlCheck(B,ev){
  if(B.status!=='go')return;
  if(!B.side[0].some(u=>u.alive)){B.status='lose';ev.push({k:'end',r:'lose'});return}
  if(!B.side[1].some(u=>u.alive)){if(B.wave<B.waves.length-1){B.wave++;B.loadWave();ev.push({k:'wave',n:B.wave})}else{B.status='win';ev.push({k:'end',r:'win'})}}
}
/* simple tactical AI, used for enemies, arena defense and auto-battle */
function rlAI(B,u){
  const mine=B.side[u.side].filter(x=>x.alive),foes=B.side[1-u.side].filter(x=>x.alive),dead=B.side[u.side].some(x=>!x.alive&&!x.revived);
  for(let i=2;i>=0;i--){if(!rlUsable(u,i))continue;const s=u.sk[i];
    const heals=s.fx.some(f=>f[0]==='heal'||f[0]==='healT');
    if(s.fx.some(f=>f[0]==='revive')&&!dead&&!mine.some(x=>x.hp/x.maxHp<.5))continue;
    if((s.tg==='a1'||s.tg==='aA')&&heals&&!s.fx.some(f=>RL_FX[f[0]]&&RL_FX[f[0]].buff)&&!mine.some(x=>x.hp/x.maxHp<.7))continue;
    let tid;
    if(s.tg==='a1'){tid=mine.slice().sort((a,b)=>a.hp/a.maxHp-b.hp/b.maxHp)[0].uid}
    else if(s.tg==='e1'){tid=foes.slice().sort((a,b)=>(rlAdv(u.el,b.el)-rlAdv(u.el,a.el))*.4+(a.hp/a.maxHp-b.hp/b.maxHp))[0].uid}
    return{i,tid};
  }
  return{i:0,tid:foes[0]&&foes[0].uid};
}
/* run a whole battle with AI on both sides (balance testing, previews) */
function rlSimulate(B,power){let guard=0;while(B.status==='go'&&guard++<3000){const u=rlNextActor(B);if(!u)break;const st=rlTurnStart(B,u);if(!st.can)continue;const a=rlAI(B,u);rlAct(B,u,a.i,a.tid,u.side===0&&a.i>0?(typeof power==='function'?power():power==null?1:power):1)}return B.status}

/* ---------- world ---------- */
const rlAdj=id=>RL_EDGES.filter(e=>e[0]===id||e[1]===id).map(e=>e[0]===id?e[1]:e[0]);
const rlRegOpen=(p,r)=>RL_REG[r].req.every(b=>p.clr[b]);
function rlNodeOpen(p,id){return rlRegOpen(p,id[0])}
function rlVisit(p,id){p.pos=id;p.vis[id]=1;p.seen[id]=1;rlAdj(id).forEach(a=>{p.seen[a]=1});rlQ(p,'visit',{node:id})}
const rlStageXp=lv=>Math.round(25+lv*lv*2.2+lv*10);

/* ---------- quests ---------- */
function rlDailies(p){const d=rlDay();if(!p.daily||p.daily.day!==d){const r=rlSeed(d+(p.pulls||0)),pool=RL_DAILY.slice().sort(()=>r()-.5);p.daily={day:d,list:pool.slice(0,3).map(q=>({id:q.id,p:0,c:0}))}}return p.daily}
function rlQ(p,t,o){
  const hit=(goal)=>{if(goal.t!==t)return 0;if(goal.node&&goal.node!==o.node)return 0;if(goal.el&&goal.el!==o.el)return 0;return o.n||1};
  for(const Q of RL_QUESTS){const s=p.q[Q.id];if(!s||s.done)continue;const g=Q.goal;
    if(t==='tower'&&g.t==='tower'){s.p=Math.max(s.p,o.n)}else s.p+=hit(g);
    if(t==='winAny'&&g.t==='win'&&false)s.p+=0;
    if(s.p>=g.n){s.p=g.n;s.done=1}}
  const dl=rlDailies(p);for(const s of dl.list){const D=RL_DAILY.find(x=>x.id===s.id);if(s.p>=D.goal.n)continue;if(D.goal.t===t)s.p=Math.min(D.goal.n,s.p+(o.n||1))}
}
function rlReward(p,rw,lv){const got=[];if(!rw)return got;
  if(rw.gems){p.gems+=rw.gems;got.push({k:'gems',v:rw.gems})}
  if(rw.gold){p.gold+=rw.gold;got.push({k:'gold',v:rw.gold})}
  if(rw.tomes){p.tomes+=rw.tomes;got.push({k:'tomes',v:rw.tomes})}
  if(rw.essence){p.ess.any+=rw.essence[1];got.push({k:'ess',el:'any',v:rw.essence[1]})}
  if(rw.energy){p.energy+=rw.energy;got.push({k:'energy',v:rw.energy})}
  if(rw.gear){const g=rlGearNew(p,{r:rw.gear,set:rw.set});got.push({k:'gear',g})}
  return got}

/* ---------- battle rewards ---------- */
function rlFinish(p,ctx,won,team){
  const res={won,items:[],xp:{},ups:{}};if(!won)return res;
  const n=ctx.node&&RL_N[ctx.node],lv=ctx.lv;
  const xp=rlStageXp(lv);team.forEach(id=>{res.xp[id]=xp;res.ups[id]=rlGiveXp(p,id,xp)});
  const gold=Math.round(120+lv*lv*6+lv*40)*(ctx.kind==='boss'?2:ctx.kind==='elite'?1.5:1);p.gold+=gold;res.items.push({k:'gold',v:gold});
  let first=false;
  if(ctx.kind==='tower'){if(ctx.floor>p.tower){p.tower=ctx.floor;first=true;const gm=10+Math.floor(ctx.floor/5)*5;p.gems+=gm;res.items.push({k:'gems',v:gm})}rlQ(p,'tower',{n:p.tower})}
  else if(ctx.node){first=!p.clr[ctx.node];p.clr[ctx.node]=(p.clr[ctx.node]||0)+1;
    if(first&&ctx.kind!=='dungeon'){const gm=ctx.kind==='boss'?100:ctx.kind==='elite'?50:Math.max(10,Math.round(lv*2.5));p.gems+=gm;res.items.push({k:'gems',v:gm})}}
  if(ctx.kind==='dungeon'){const D=RL_DUNGEON[ctx.node];const e=6+ctx.tier*6;p.ess.any+=e;res.items.push({k:'ess',el:'any',v:e});const g=rlGearNew(p,{r:rlDropRarity(lv,8+ctx.tier*4),set:rlRand(D.sets)});res.items.push({k:'gear',g});if(Math.random()<.35){p.tomes++;res.items.push({k:'tomes',v:1})}rlQ(p,'dungeon',{node:ctx.node})}
  else{const ch=ctx.kind==='boss'?1:ctx.kind==='elite'?.75:ctx.kind==='tower'?.6:.32;if(Math.random()<ch){const g=rlGearNew(p,{r:rlDropRarity(lv,ctx.kind==='boss'?20:ctx.kind==='elite'?10:0)});res.items.push({k:'gear',g})}
    if(Math.random()<.2){const e='any';p.ess[e]+=2+Math.floor(lv/5);res.items.push({k:'ess',el:e,v:2+Math.floor(lv/5)})}}
  if(ctx.node)rlQ(p,'win',{node:ctx.node});rlQ(p,'winAny',{});
  (ctx.kills||[]).forEach(k=>{p.kills[k]=(p.kills[k]||0)+1;rlQ(p,'kill',{el:k});rlQ(p,'killAny',{})});
  if(p.gear.length>220){const spare=p.gear.filter(g=>!rlOwner(p,g.i)&&g.lv===0&&g.r==='common');spare.slice(0,p.gear.length-220).forEach(g=>{p.gold+=rlSellVal(g)});const ids=new Set(spare.slice(0,p.gear.length-220).map(g=>g.i));p.gear=p.gear.filter(g=>!ids.has(g.i))}
  res.first=first;return res;
}

/* ---------- arena (ratings and defense teams live in the shared class state) ---------- */
const RL_TIERS=[{n:'Bronze',min:0,c:'#b9774a'},{n:'Silver',min:1100,c:'#c9ccd6'},{n:'Gold',min:1250,c:'#ffd60a'},{n:'Platinum',min:1400,c:'#6fe3d6'},{n:'Diamond',min:1600,c:'#7ab8ff'},{n:'Legend',min:1850,c:'#ff8a1f'}];
const rlTier=r=>{let t=RL_TIERS[0];for(const x of RL_TIERS)if(r>=x.min)t=x;return t};
function rlArena(sid){if(!state.arena)state.arena={};if(!state.arena[sid])state.arena[sid]={r:1000,w:0,l:0,def:null,log:[],day:'',used:0};return state.arena[sid]}
function rlSnapshot(p,ids){return{t:Date.now(),sq:1,u:ids.filter(id=>p.heroes[id]).map(id=>{const h=p.heroes[id],s=rlHeroStats(p,id);delete s.sets;return{id,lv:h.lv,st:h.st,sk:h.sk.slice(),s}})}}
function rlBots(){const r=rlSeed('bots'+rlWeek()),ids=RL_HEROES.map(h=>h.id);return[[850,'Archive Cadet',3],[1000,'Page Warden',8],[1150,'Ink Knight',16],[1350,'Grand Scribe',26],[1600,'Keeper of Tomes',38]].map(([rt,n,lv],i)=>{const team=[0,1,2,3].map(()=>ids[Math.floor(r()*ids.length)]);return{bot:1,id:'bot'+i,name:n,r:rt,def:{u:team.map(id=>{const s=rlBaseStats(id,lv,RL_H[id].r);const k=1+lv/90;return{id,lv,st:RL_H[id].r,sk:[2,2,2],s:{...s,hp:Math.round(s.hp*k),atk:rlR1(s.atk*k),def:rlR1(s.def*k)}}})}}})}
const rlExpect=(a,b)=>1/(1+Math.pow(10,(b-a)/400));
function rlArenaResult(sid,opp,won){
  const me=rlArena(sid),K=32,ea=rlExpect(me.r,opp.r),dA=Math.round(K*((won?1:0)-ea));
  me.r=Math.max(0,me.r+dA);won?me.w++:me.l++;
  if(!opp.bot){const o=rlArena(opp.id),eb=rlExpect(o.r,me.r-dA),dB=Math.round(K*((won?0:1)-eb));o.r=Math.max(0,o.r+dB);o.log.unshift({t:Date.now(),by:sid,won:!won,d:dB});o.log=o.log.slice(0,10)}
  return dA;
}
function rlArenaLeft(sid){const a=rlArena(sid),c=rlCfg();if(a.day!==rlDay()){a.day=rlDay();a.used=0}return c.arenaDaily>0?Math.max(0,c.arenaDaily-a.used):Infinity}
