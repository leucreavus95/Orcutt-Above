"use strict";
/* ================================================================
   REALM SCREENS: world map, heroes, summon, gear, arena, quests,
   battle, and the teacher's Realm controls.
   ================================================================ */
const RLU={map:null,drag:null,dragged:false,travel:false,anim:false};
function rlUI(){if(!ui.rl)ui.rl={v:'world',hero:null,hf:'all',gsel:null,gf:{s:-1,set:'',r:''},node:null,tier:0,pan:null,sum:null,b:null,modal:null,tsel:'team'};return ui.rl}
const rlNum=n=>n>=1e6?(n/1e6).toFixed(1)+'M':n>=1e4?Math.round(n/1e3)+'k':String(Math.round(n));
const RL_ICON={gems:'<i class="rl-gem"></i>',gold:'<i class="rl-gold"></i>',energy:'<i class="rl-en"></i>',tomes:'<i class="rl-tome"></i>'};

/* ---------- skill text ---------- */
// Rarity by base stars: 1 common (white), 2 uncommon (green), 3 rare (blue), 4 epic (purple), 5 legendary (orange)
const RL_RAR={1:['Common','#e8e8ee'],2:['Uncommon','#5fd36a'],3:['Rare','#4aa8ff'],4:['Epic','#b970ff'],5:['Legendary','#ff8a1f']};
function rlRarTag(r){const R=RL_RAR[r]||RL_RAR[3];return`<span class="rl-rar" style="color:${R[1]};border-color:${R[1]}">${R[0]}</span>`}
function rlSkillText(h,s,lvl,st){
  if(!st){const p=typeof P_==='function'?P_():null;st=p&&p.heroes&&p.heroes[h.id]?rlHeroStats(p,h.id):rlBaseStats(h.id,1,h.r)}
  if(s.pas)return({counter:`Passive: sometimes strikes back when hit (${s.v}% chance).`,lifesteal:`Passive: heals itself with ${s.v}% of the damage it deals.`,firstStrike:'Passive: gets a head start every battle.'}[s.pas]||'Passive.');
  const who={e1:'one enemy',eA:'all enemies',a1:'one ally',aA:'all allies',self:'itself'}[s.tg]||'one enemy',who2=s.bounce?`random enemies (${s.bounce} ricochets)`:null,bonus=1+.1*((lvl||1)-1);
  const parts=[];const turns=t=>`${t} turn${t>1?'s':''}`;
  if(s.m>0){const base=s.sc==='def'?st.def:s.sc==='hp'?st.hp*2:st.atk,v=base*s.m*bonus,lo=Math.max(1,Math.round(v*.95)),hi=Math.max(lo,Math.round(v*1.05));
    parts.push(`Deals ${lo}–${hi} damage to ${who2||who}${s.h>1?`, ${s.h} times`:''}`)}
  if(s.ign)parts.push('Pierces armor');if(s.vsBurn)parts.push('Extra damage to burning enemies');if(s.critMark)parts.push('Always a critical hit on Marked enemies');if(s.tempo)parts.push('Adds 1 Tempo (max 3). Each Tempo makes Rio\'s attacks deal 10% more');if(s.crescendo)parts.push(`Crescendo: spends all Tempo for +${Math.round(s.crescendo*100)}% damage per beat`);if(s.vsChill)parts.push(`Deals ${Math.round(s.vsChill*100)}% more damage for each Chill on the target`);if(s.vsDaze)parts.push(`Deals ${Math.round(s.vsDaze*100)}% more damage to Dazed enemies`);if(s.ring)parts.push('Stuns every enemy that was already Dazed');if(s.exec)parts.push(`Deals ${Math.round(s.exec*100)}% more damage to enemies under half HP`);if(s.again)parts.push('If it defeats the target, she acts again right away');if(s.splash)parts.push(`Aftershock: ${Math.round(s.splash*100)}% of the damage also hits every other enemy`);if(s.det)parts.push('Sets off all of the target\'s Burns at once');
  s.fx.forEach(f=>{let tgt=who,k=f[0],a=f;if(k==='self'||k==='team'){tgt=k==='self'?'itself':'all allies';a=f.slice(1);k=a[0]}
    const F=RL_FX[k];
    if(k==='heal')parts.push(`Heals ${tgt} for ${Math.round(st.hp*a[1]/100*bonus)} HP`);
    else if(k==='healT')parts.push(`Heals ${tgt} for about ${Math.round(st.hp*a[1]/100*bonus)} HP`);
    else if(k==='cleanse')parts.push(`Removes debuffs from ${tgt}`);
    else if(k==='strip')parts.push(a[1]===1?'Washes away 1 buff from each enemy':'Removes enemy buffs');
    else if(k==='atb')parts.push(`${tgt==='itself'?'Acts':'Allies act'} sooner`);
    else if(k==='atbDown')parts.push(`Delays enemy turns (${a[2]}% chance)`);
    else if(k==='revive')parts.push('Revives fallen allies');
    else if(k==='shield')parts.push(`Shields ${tgt} for ${Math.round(st.hp*a[1]/100*bonus)} HP (${turns(a[2])})`);
    else if(k==='chill')parts.push(`Adds 1 Chill (${a[2]}% chance). At 3 Chill the enemy freezes and skips a turn`);
    else if(k==='rime')parts.push(`Rune Ward on ${tgt} (${turns(a[1])}): enemies that strike them get Chilled`);
    else if(k==='daze')parts.push(`Dazes ${tgt} (${a[2]}% chance, ${turns(a[1])})`);
    else if(k==='seed')parts.push(`Plants a seed (${a[2]}% chance, ${turns(a[1])}): drains 5% HP each turn to heal your most hurt ally`);
    else if(k==='regen')parts.push(`Regrowth for ${tgt}: heals 12% HP each turn (${turns(a[1])})`);
    else if(k==='bulwark')parts.push(`Raises a stone wall: ${tgt} take 25% less damage from hits (${turns(a[1])})`);
    else if(k==='guard')parts.push(`${h.n} takes 30% of the damage aimed at ${tgt} (${turns(a[1])})`);
    else if(k==='ward')parts.push(`Wards ${tgt} for ${turns(a[1])}: enemies that strike a warded ally may catch fire`);
    else if(F&&F.buff)parts.push(`${F.n} for ${tgt} (${turns(a[1])})`);
    else if(F)parts.push(`${k==='stun'?'Stun':F.n} (${a[2]}% chance, ${turns(a[1])})`)});
  return parts.join('. ')+'.';
}
function rlLeadText(h){if(!h.ld)return'';return`Leader: +${h.ld.v}% ${RL_STAT[h.ld.s].n} for every ally while this creature leads the team.`}

/* ---------- entry ---------- */
function sRealm(s){
  const R=rlUI(),p=RLS.cache[s.id];
  if(!p){rlLoad(s.id).then(()=>{if(ui.mode==='student'&&ui.sTab==='realm')render()});return`<div class="loading">Opening the Realm…</div>`}
  if(s.gemBank>0){p.gems+=s.gemBank;R.flash=`+${s.gemBank} gems from class points`;s.gemBank=0;save();rlSave(s.id)}
  rlEnergy(p);rlDailies(p);
  if(!p.started)return rlStartView(s,p);
  if(Array.isArray(s.heroGift)&&s.heroGift.length){const got=s.heroGift.map(g=>rlGiftHero(p,g)).filter(Boolean);s.heroGift=[];save();rlSave(s.id);
    if(got.length)R.flash=`Your teacher gave you ${got.join(', ')}!`}
  if(R.b)return rlBattleShell(s,p);
  const tabs=[['world','World'],['heroes','Creatures'],['summon','Summon'],['gear','Gear'],['arena','Arena'],['quests','Quests']];
  const claim=rlClaimable(p);
  const top=`<div class="rl-top"><div class="rl-tabs">${tabs.map(([k,n])=>`<button data-a="rlTab" data-v="${k}" aria-current="${R.v===k}">${n}${k==='quests'&&claim?`<b class="rl-dot">${claim}</b>`:''}</button>`).join('')}</div>
   <div class="rl-res">${rlCfg().energy?`<span class="rl-pill" title="Energy refills 1 every ${rlCfg().energyMin} min">${RL_ICON.energy}<b class="num">${p.energy}</b><span class="muted">/${rlCfg().energyMax}</span></span>`:''}<span class="rl-pill">${RL_ICON.gold}<b class="num">${rlNum(p.gold)}</b></span><span class="rl-pill">${RL_ICON.gems}<b class="num">${p.gems}</b></span><span class="rl-pill" title="Study tomes">${RL_ICON.tomes}<b class="num">${p.tomes}</b></span></div></div>`;
  const body={world:rlWorld,heroes:rlHeroes,summon:rlSummonView,gear:rlGearView,arena:rlArenaView,quests:rlQuestView}[R.v](s,p);
  const fl=R.flash?`<div class="rl-flash">${esc(R.flash)}</div>`:'';R.flash=null;
  return`<div class="rl">${top}${fl}${body}${rlModal(s,p)}</div>`;
}
function rlStartView(s,p){
  return`<div class="rl rl-start"><div class="rl-hero-intro"><p class="rl-kicker">The Realm of Orcutt</p><h2>The Archive has been scattered</h2><p class="muted">A creeping blankness called the Blank is erasing the Realm's stories. Its pages fell across six regions, and monsters made of lost ink now guard them. Choose your first creature partner. You'll befriend more as you go, and each one evolves twice as it levels up (at level 10 and level 25).</p></div>
  <div class="rl-starters">${RL_STARTERS.map(id=>{const h=RL_H[id];return`<button class="rl-starter" data-a="rlStart" data-v="${id}"><div class="rl-pframe r${h.r} live">${rlHeroSVG(id)}</div><div class="rl-sname">${rlElChip(h.el)}<b>${esc(h.n)}</b>${rlStars(h.r)}</div><p class="muted">${RL_ROLE[h.role]} · ${RL_EL[h.el].n}</p><p class="rl-sdesc">${esc(rlSkillText(h,h.sk[1],1))}</p><span class="btn pri">Choose ${esc(h.n)}</span></button>`}).join('')}</div>
  <p class="muted" style="text-align:center">${RL_FREE.length?RL_FREE.map(id=>RL_H[id].n).join(', ').replace(/, ([^,]*)$/,' and $1')+' join you too, plus ':'You also get '}${rlCfg().startGems} gems for your first summons.</p></div>`;
}
function rlClaimable(p){let n=0;for(const Q of RL_QUESTS){const s=p.q[Q.id];if(s&&s.done&&!s.c)n++}const d=p.daily;if(d)for(const s of d.list){const D=RL_DAILY.find(x=>x.id===s.id);if(s.p>=D.goal.n&&!s.c)n++}return n}

/* ---------- world map ---------- */
function rlHull(pts){pts=pts.slice().sort((a,b)=>a[0]-b[0]||a[1]-b[1]);const cr=(o,a,b)=>(a[0]-o[0])*(b[1]-o[1])-(a[1]-o[1])*(b[0]-o[0]);const lo=[],up=[];for(const q of pts){while(lo.length>=2&&cr(lo[lo.length-2],lo[lo.length-1],q)<=0)lo.pop();lo.push(q)}for(const q of pts.slice().reverse()){while(up.length>=2&&cr(up[up.length-2],up[up.length-1],q)<=0)up.pop();up.push(q)}return lo.slice(0,-1).concat(up.slice(0,-1))}
function rlBlob(ids,pad){const pts=ids.map(id=>[RL_N[id].x,RL_N[id].y]),cx=pts.reduce((a,q)=>a+q[0],0)/pts.length,cy=pts.reduce((a,q)=>a+q[1],0)/pts.length;
  let h=rlHull(pts).map(q=>{const dx=q[0]-cx,dy=q[1]-cy,l=Math.hypot(dx,dy)||1;return[q[0]+dx/l*pad,q[1]+dy/l*pad]});
  const ext=[];for(let i=0;i<h.length;i++){const a=h[i],b=h[(i+1)%h.length];ext.push(a,[(a[0]+b[0])/2+(b[1]-a[1])*.08,(a[1]+b[1])/2-(b[0]-a[0])*.08])}h=ext;
  const n=h.length;let d=`M${((h[n-1][0]+h[0][0])/2).toFixed(0)} ${((h[n-1][1]+h[0][1])/2).toFixed(0)}`;for(let i=0;i<n;i++){const a=h[i],b=h[(i+1)%n];d+=` Q${a[0].toFixed(0)} ${a[1].toFixed(0)} ${((a[0]+b[0])/2).toFixed(0)} ${((a[1]+b[1])/2).toFixed(0)}`}return{d:d+'Z',poly:h,cx,cy}}
function rlInPoly(x,y,poly){let c=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const a=poly[i],b=poly[j];if((a[1]>y)!==(b[1]>y)&&x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0])c=!c}return c}
function rlDecor(r,x,y,s,rnd){
  switch(r){
   case'g':return rnd()<.25?`<g transform="translate(${x} ${y}) scale(${s})"><path d="M-14 4 L0 -16 L14 4Z" fill="#3f8a4a"/><path d="M-6 4 L8 -10 L16 4Z" fill="#2f6b3a"/></g>`:`<g transform="translate(${x} ${y}) scale(${s})"><rect x="-2" y="0" width="4" height="10" fill="#5a3a1e"/><circle cx="0" cy="-6" r="10" fill="#3f8a4a"/><circle cx="-6" cy="-1" r="7" fill="#357a40"/><circle cx="5" cy="-10" r="5" fill="#5aa65a" opacity=".7"/></g>`;
   case'e':return rnd()<.4?`<g transform="translate(${x} ${y}) scale(${s})"><path d="M-22 10 L-4 -22 L4 -14 L22 10Z" fill="#4a2018"/><path d="M-4 -22 L4 -14 L-2 -10Z" fill="#ff6a3d"/><path d="M-1 -20 Q2 -30 -2 -36" stroke="#8a8f9a" stroke-width="3" fill="none" opacity=".5"/></g>`:`<g transform="translate(${x} ${y}) scale(${s})"><path d="M-16 8 L-2 -14 L14 8Z" fill="#5a2a1c"/><path d="M-8 8 Q0 2 10 8" stroke="#ff8a3d" stroke-width="2" fill="none" opacity=".7"/></g>`;
   case't':return rnd()<.5?`<g transform="translate(${x} ${y}) scale(${s})" fill="none" stroke="#9fd6ff" stroke-width="2" opacity=".55"><path d="M-14 0 Q-7 -6 0 0 Q7 6 14 0"/><path d="M-8 8 Q-2 3 4 8"/></g>`:`<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="4" rx="12" ry="5" fill="#1b3a5a"/><path d="M-10 4 Q-8 -8 0 -8 Q8 -8 10 4Z" fill="#3a5a7a"/></g>`;
   case'l':return`<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 -26 L7 -6 L0 8 L-7 -6Z" fill="#fff6c9" opacity=".9"/><path d="M0 -26 L7 -6 L0 8Z" fill="#ffd96a"/><path d="M10 -12 L14 -2 L10 6 L6 -2Z" fill="#fffbe8" opacity=".8"/></g>`;
   case'd':return rnd()<.4?`<ellipse cx="${x}" cy="${y}" rx="${30*s}" ry="${8*s}" fill="#b9a6e6" opacity=".12"/>`:`<g transform="translate(${x} ${y}) scale(${s})" stroke="#1c1428" stroke-width="3" fill="none" stroke-linecap="round"><path d="M0 10 L0 -12 M0 -4 L-8 -14 M0 -8 L7 -18 M-8 -14 L-12 -12"/></g>`;
   case'a':return`<g transform="translate(${x} ${y}) scale(${s})"><rect x="-10" y="-20" width="20" height="28" fill="#4a3a2e"/>${[0,1,2].map(i=>`<rect x="-8" y="${-18+i*9}" width="16" height="6" fill="${['#8a3a3a','#3a5a8a','#5a7a3a'][i]}"/>`).join('')}</g>`;
  }return'';
}
function rlMapBase(){
  if(RLU.map)return RLU.map;
  let s=`<defs><radialGradient id="rlsea" cx=".5" cy=".5" r=".75"><stop offset="0" stop-color="#16314f"/><stop offset="1" stop-color="#081322"/></radialGradient><pattern id="rlwav" width="60" height="30" patternUnits="userSpaceOnUse"><path d="M0 15 Q15 5 30 15 T60 15" stroke="#2a5a8a" stroke-width="1.2" fill="none" opacity=".35"/></pattern><filter id="rlsoft"><feGaussianBlur stdDeviation="8"/></filter><pattern id="rlfog" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="16" height="16" fill="#0b0a10"/><rect width="2" height="16" fill="#1f1b27"/></pattern></defs>
  <rect x="-400" y="-400" width="2800" height="2200" fill="url(#rlsea)"/><rect x="-400" y="-400" width="2800" height="2200" fill="url(#rlwav)"/>`;
  const regs={};for(const r in RL_REG){const ids=RL_NODES.filter(n=>n.reg===r).map(n=>n.id);regs[r]=rlBlob(ids,r==='a'?80:105)}
  for(const r in regs){const b=regs[r],R=RL_REG[r],E=RL_EL[R.el];
    s+=`<path d="${b.d}" fill="#000" opacity=".45" transform="translate(10 16)" filter="url(#rlsoft)"/><path d="${b.d}" fill="${R.tint}" stroke="${shade(R.tint,.3)}" stroke-width="5"/><path d="${b.d}" fill="${E.c}" opacity=".08"/>`;
    const rnd=rlSeed('decor'+r);const minX=Math.min(...b.poly.map(q=>q[0])),maxX=Math.max(...b.poly.map(q=>q[0])),minY=Math.min(...b.poly.map(q=>q[1])),maxY=Math.max(...b.poly.map(q=>q[1]));
    let placed=0,tries=0;while(placed<38&&tries++<600){const x=minX+rnd()*(maxX-minX),y=minY+rnd()*(maxY-minY);if(!rlInPoly(x,y,b.poly))continue;if(RL_NODES.some(n=>Math.hypot(n.x-x,n.y-y)<48))continue;s+=rlDecor(r,x.toFixed(0),y.toFixed(0),(.8+rnd()*.7).toFixed(2),rnd);placed++}
    s+=`<text x="${b.cx}" y="${Math.max(...b.poly.map(q=>q[1]))-22}" text-anchor="middle" class="rl-mlabel">${R.n.toUpperCase()}</text>`;
  }
  RLU.map={s,regs};return RLU.map;
}
function rlNodeIcon(t){return{
  town:'<path d="M-9 2 L0 -8 L9 2 V9 H-9Z" fill="#f4efe7"/><rect x="-3" y="3" width="6" height="6" fill="#5a3a1e"/>',
  battle:'<path d="M-7 -7 L-2 8 M0 -8 L3 8 M6 -6 L8 7" stroke="#f4efe7" stroke-width="2.6" stroke-linecap="round"/>',
  elite:'<path d="M-9 -2 Q-9 -10 0 -10 Q9 -10 9 -2 Q9 6 4 8 L4 10 L-4 10 L-4 8 Q-9 6 -9 -2Z" fill="#f4efe7"/><circle cx="-3.5" cy="-1" r="2.4" fill="#141218"/><circle cx="3.5" cy="-1" r="2.4" fill="#141218"/><path d="M-9 -6 L-13 -12 M9 -6 L13 -12" stroke="#f4efe7" stroke-width="2.4"/>',
  boss:'<path d="M-11 6 L-9 -8 L-4 -1 L0 -11 L4 -1 L9 -8 L11 6Z" fill="#ffd60a" stroke="#8a6a00" stroke-width="1.5"/>',
  chest:'<rect x="-10" y="-4" width="20" height="13" rx="2" fill="#b5762f" stroke="#3a2412" stroke-width="1.5"/><path d="M-10 -4 Q0 -12 10 -4" fill="#c98a3a" stroke="#3a2412" stroke-width="1.5"/><rect x="-2" y="-1" width="4" height="5" fill="#ffd60a"/>',
  shrine:'<path d="M-6 9 L-4 -8 L0 -12 L4 -8 L6 9Z" fill="#c9ced8"/><circle cx="0" cy="-2" r="2.6" fill="#7af7ff"/>',
  dungeon:'<path d="M-10 9 V-2 Q-10 -11 0 -11 Q10 -11 10 -2 V9 H5 V-1 Q5 -6 0 -6 Q-5 -6 -5 -1 V9Z" fill="#c9ced8"/>',
  tower:'<path d="M-6 10 L-5 -6 L-8 -6 L-8 -11 L-4 -11 L-4 -8 L-1 -8 L-1 -11 L1 -11 L1 -8 L4 -8 L4 -11 L8 -11 L8 -6 L5 -6 L6 10Z" fill="#c9ced8"/>'}[t]||''}
function rlWorld(s,p){
  const R=rlUI(),base=rlMapBase();let roads='',nodes='',fog='';
  for(const[a,b]of RL_EDGES){if(!p.seen[a]||!p.seen[b])continue;const A=RL_N[a],Bn=RL_N[b],open=rlNodeOpen(p,a)&&rlNodeOpen(p,b);roads+=`<path d="M${A.x} ${A.y} Q${(A.x+Bn.x)/2+(Bn.y-A.y)*.12} ${(A.y+Bn.y)/2-(Bn.x-A.x)*.12} ${Bn.x} ${Bn.y}" class="rl-road${open?'':' locked'}"/>`}
  for(const r in RL_REG){if(rlRegOpen(p,r))continue;const b=base.regs[r];const bosses=RL_REG[r].req.map(id=>RL_N[id].n).join(' and ');fog+=`<path d="${b.d}" fill="url(#rlfog)" opacity=".86"/><g class="rl-lock" transform="translate(${b.cx} ${b.cy})"><rect x="-120" y="-24" width="240" height="48" rx="10"/><text y="-4" text-anchor="middle">LOCKED</text><text y="13" text-anchor="middle" class="sm">Defeat ${esc(bosses)}</text></g>`}
  for(const n of RL_NODES){if(!p.seen[n.id])continue;const vis=p.vis[n.id],open=rlNodeOpen(p,n.id),clr=p.clr[n.id],done=(n.t==='chest'&&p.chests[n.id])||(n.t==='shrine'&&p.shr[n.id]);
    const cls=['rl-node','t-'+n.t,vis?'vis':'',open?'':'locked',R.node===n.id?'sel':'',(clr||done)?'clr':''].join(' ');
    nodes+=`<g class="${cls}" data-a="rlNode" data-v="${n.id}" transform="translate(${n.x} ${n.y})" tabindex="0" role="button" aria-label="${esc(n.n)}"><circle class="rl-nring" r="${n.t==='boss'?27:22}"/><circle class="rl-nbg" r="${n.t==='boss'?23:18}"/>${vis?rlNodeIcon(n.t):'<text class="rl-q" y="6" text-anchor="middle">?</text>'}${clr&&['battle','elite','boss'].includes(n.t)?'<circle class="rl-chk" cx="15" cy="-15" r="7"/><path d="M11.5 -15 L14 -12.5 L18.5 -17.5" stroke="#0f3a2c" stroke-width="2.2" fill="none"/>':''}${n.lv&&vis?`<text class="rl-nlv" y="${n.t==='boss'?40:35}" text-anchor="middle">${esc(n.n)} · Lv ${n.lv}</text>`:vis?`<text class="rl-nlv" y="35" text-anchor="middle">${esc(n.n)}</text>`:''}</g>`}
  const me=RL_N[p.pos],face=avatarSVG({...s.equip,pet:'pet-none'},true).replace('<svg class="av" viewBox="0 0 200 220"','<svg x="-22" y="-22" width="44" height="44" viewBox="56 50 88 88"');
  const token=`<g id="rl-token" transform="translate(${me.x} ${me.y-34})"><g class="rl-bob"><path d="M0 26 L-9 12 L9 12Z" fill="#ffd60a"/><circle r="24" fill="#ffd60a"/><clipPath id="rltc"><circle r="21"/></clipPath><circle r="21" fill="#1a1721"/><g clip-path="url(#rltc)">${face}</g></g></g>`;
  const pan=R.pan||{x:460/.9-me.x,y:300/.9-me.y,k:.9};R.pan=pan;
  const sel=R.node&&RL_N[R.node];
  const seen=Object.keys(p.seen).length,visd=Object.keys(p.vis).length;
  return`<div class="rl-world"><div class="rl-map" id="rl-map"><svg id="rl-svg" viewBox="0 0 920 600" preserveAspectRatio="xMidYMid slice"><g id="rl-pan" transform="translate(${pan.x*pan.k} ${pan.y*pan.k}) scale(${pan.k})">${base.s}${roads}${fog}${nodes}${token}</g></svg>
   <div class="rl-mapui"><button class="btn sm" data-a="rlZoom" data-v="1" aria-label="Zoom in">+</button><button class="btn sm" data-a="rlZoom" data-v="-1" aria-label="Zoom out">−</button><button class="btn sm" data-a="rlCenter">Find me</button></div>
   <div class="rl-legend"><b>${esc(RL_REG[me.reg].n)}</b><span class="muted">Explored ${visd} of ${RL_NODES.length} places · ${seen-visd} spotted</span></div>
   ${sel?rlNodePanel(s,p,sel):`<div class="rl-npanel hint"><p class="muted">Click a place on the map to travel there. You can go anywhere you've spotted in an unlocked region. Paths reveal new places as you explore.</p><p class="muted">Team: ${p.team.map(id=>esc(RL_H[id].n)).join(', ')||'none yet'}</p></div>`}</div></div>`;
}
function rlNodePanel(s,p,n){
  const reg=RL_REG[n.reg],open=rlNodeOpen(p,n.id),here=p.pos===n.id,c=rlCfg(),en=rlEnergy(p),cost=RL_COST[n.t]||0;
  let body='';
  if(!open)body=`<p class="muted">This region is sealed. Defeat ${reg.req.map(id=>esc(RL_N[id].n)).join(' and ')} to open it.</p>`;
  else if(!here)body=`<button class="btn pri" data-a="rlGo" data-v="${n.id}">Travel here</button>`;
  else if(n.t==='battle'||n.t==='elite'||n.t==='boss'){const enc=rlEncounter(n.id),mons=enc.waves.flat();const uniq=[...new Map(mons.map(m=>[m.id+m.el+(m.boss?'b':''),m])).values()].slice(0,5);
    body=`<p class="muted">${enc.waves.length} waves · recommended team level ${n.lv}+</p><div class="rl-foes">${uniq.map(m=>`<div class="rl-foe${m.boss?' rlboss':''}" title="${esc(m.name)}">${rlMonSVG(m.id,m.el,m.boss)}<span>${rlElChip(m.el)}</span></div>`).join('')}</div>
    <p class="muted">${p.clr[n.id]?`Cleared ${p.clr[n.id]}×. Repeat for XP, gold and gear.`:`First clear: ${n.t==='boss'?100:n.t==='elite'?50:Math.max(10,Math.round(n.lv*2.5))} gems`}</p>
    <button class="btn pri" data-a="rlFight" data-v="${n.id}" ${c.energy&&en<cost?'disabled':''}>Fight · ${RL_ICON.energy}${cost}</button>`}
  else if(n.t==='town'){const qs=RL_QUESTS.filter(q=>q.at===n.id);
    body=`<h4>Quest board</h4>${qs.map(q=>{const st=p.q[q.id];return`<div class="rl-qrow"><b>${esc(q.n)}</b><span class="muted">${st?(st.c?'Complete':st.done?'Ready to claim':`${st.p}/${q.goal.n}`):'New'}</span></div>`}).join('')}
    <h4 style="margin-top:12px">Merchant</h4><div class="rl-shop">${[['tome','Study tome','+1500 creature XP',1800],['energy','Trail rations','+20 energy',1500],['crate','Gear crate','Random rare or better gear',7000]].filter(x=>x[0]!=='energy'||c.energy).map(x=>`<button class="rl-buy" data-a="rlBuy" data-v="${x[0]}" ${p.gold<x[3]?'disabled':''}><b>${x[1]}</b><span class="muted">${x[2]}</span><span>${RL_ICON.gold}${rlNum(x[3])}</span></button>`).join('')}</div>`}
  else if(n.t==='chest')body=p.chests[n.id]?`<p class="muted">You already emptied this chest.</p>`:`<p>Something glints inside.</p><button class="btn pri" data-a="rlChest" data-v="${n.id}">Open the chest</button>`;
  else if(n.t==='shrine'){const b=n.buff;body=p.shr[n.id]?`<p class="good">Blessing active: +${b[1]}${RL_STAT[b[0]].p?'%':''} ${RL_STAT[b[0]].n} for all your creatures.</p>`:`<p>Pray here for a permanent blessing: +${b[1]}${RL_STAT[b[0]].p?'%':''} ${RL_STAT[b[0]].n} for every creature you own.</p><button class="btn pri" data-a="rlShrine" data-v="${n.id}">Pray</button>`}
  else if(n.t==='dungeon'){const D=RL_DUNGEON[n.id],R=rlUI();
    body=`<p class="muted">Repeatable. Drops essence for promoting creatures and gear from the ${D.sets.map(k=>RL_SETS[k].n).join(', ')} sets.</p><div class="rl-tiers">${RL_DUNGEON_TIERS.map((t,i)=>{const ok=i===0||p.clr[n.id+':'+(i-1)];return`<button class="pill" data-a="rlTier" data-v="${i}" aria-pressed="${R.tier===i}" ${ok?'':'disabled'}>${t.n} · Lv ${t.lv}</button>`}).join('')}</div>
    <button class="btn pri" data-a="rlFight" data-v="${n.id}" ${c.energy&&en<cost?'disabled':''}>Enter ${RL_DUNGEON_TIERS[R.tier].n} · ${RL_ICON.energy}${cost}</button>`}
  else if(n.t==='tower'){const f=p.tower+1;body=`<p>Endless floors that keep getting harder. Best floor: <b>${p.tower}</b>.</p><p class="muted">Floor ${f} · enemy level ${Math.round(30+f*1.5)}${f%5===0?' · warden floor':''}. First clears give gems. No energy needed.</p><button class="btn pri" data-a="rlFight" data-v="${n.id}">Climb to floor ${f}</button>`}
  return`<div class="rl-npanel"><div class="row" style="justify-content:space-between"><span class="rl-ntype">${{town:'Town',battle:'Battle',elite:'Elite battle',boss:'Boss',chest:'Treasure',shrine:'Shrine',dungeon:'Dungeon',tower:'Tower'}[n.t]}</span><button class="btn sm" data-a="rlNodeClose" aria-label="Close">✕</button></div><h3>${esc(n.n)}</h3><p class="muted">${rlElChip(reg.el)} ${esc(reg.n)}${n.lv?' · Lv '+n.lv:''}</p>${body}</div>`;
}
function rlPath(p,from,to){const prev={[from]:null},q=[from];while(q.length){const c=q.shift();if(c===to)break;for(const a of rlAdj(c)){if(a in prev)continue;if(!p.seen[a]||!rlNodeOpen(p,a))continue;prev[a]=c;q.push(a)}}if(!(to in prev))return null;const path=[];for(let c=to;c;c=prev[c])path.unshift(c);return path}
function rlTravel(s,p,to){
  const path=rlPath(p,p.pos,to);if(!path){toast('You can only reach places you have spotted in an unlocked region');return}
  if(path.length<2){rlUI().node=to;render();return}
  RLU.travel=true;const tok=document.getElementById('rl-token');let i=0;
  const hop=()=>{if(i>=path.length-1){RLU.travel=false;path.forEach(id=>rlVisit(p,id));rlUI().node=to;rlSave(s.id);render();return}
    const A=RL_N[path[i]],B=RL_N[path[i+1]],t0=performance.now(),dur=STILL?1:Math.min(520,Math.hypot(B.x-A.x,B.y-A.y)*2.2);
    const step=now=>{const k=Math.min(1,(now-t0)/dur),e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2,mx=(A.x+B.x)/2+(B.y-A.y)*.12,my=(A.y+B.y)/2-(B.x-A.x)*.12,x=(1-e)*(1-e)*A.x+2*(1-e)*e*mx+e*e*B.x,y=(1-e)*(1-e)*A.y+2*(1-e)*e*my+e*e*B.y;
      const t=document.getElementById('rl-token');if(t)t.setAttribute('transform',`translate(${x} ${y-34})`);if(k<1)requestAnimationFrame(step);else{rlVisit(p,path[i+1]);i++;hop()}};
    requestAnimationFrame(step)};
  if(tok)hop();else{path.forEach(id=>rlVisit(p,id));rlUI().node=to;rlSave(s.id);render()}
}
function rlMapWire(){
  const svg=document.getElementById('rl-svg'),g=document.getElementById('rl-pan');if(!svg||!g)return;const R=rlUI();
  const apply=()=>g.setAttribute('transform',`translate(${R.pan.x*R.pan.k} ${R.pan.y*R.pan.k}) scale(${R.pan.k})`);
  svg.onpointerdown=e=>{RLU.drag={x:e.clientX,y:e.clientY,px:R.pan.x,py:R.pan.y};RLU.dragged=false};
  svg.onpointermove=e=>{if(!RLU.drag)return;const b=svg.getBoundingClientRect(),sc=920/b.width*(b.width/b.height<920/600?600/b.height*b.width/920:1),dx=(e.clientX-RLU.drag.x),dy=(e.clientY-RLU.drag.y);if(Math.hypot(dx,dy)>5){RLU.dragged=true;try{svg.setPointerCapture(e.pointerId)}catch(_){}}if(!RLU.dragged)return;const f=Math.max(920/b.width,600/b.height);R.pan.x=RLU.drag.px+dx*f/R.pan.k;R.pan.y=RLU.drag.py+dy*f/R.pan.k;apply()};
  svg.onpointerup=()=>{RLU.drag=null;setTimeout(()=>{RLU.dragged=false},0)};
  svg.onwheel=e=>{e.preventDefault();rlZoomBy(e.deltaY<0?1:-1)};
}
function rlZoomBy(d){const R=rlUI(),k0=R.pan.k,k=rlClamp(k0*(d>0?1.18:1/1.18),.45,1.6);const cx=460,cy=300;R.pan.x+=cx/k-cx/k0;R.pan.y+=cy/k-cy/k0;R.pan.k=k;const g=document.getElementById('rl-pan');if(g)g.setAttribute('transform',`translate(${R.pan.x*R.pan.k} ${R.pan.y*R.pan.k}) scale(${R.pan.k})`)}

/* ---------- heroes ---------- */
function rlHeroCard(p,id,o){const h=RL_H[id],m=p.heroes[id];const inTeam=p.team.indexOf(id);
  return`<button class="rl-hcard r${h.r}${m?'':' unowned'}${o&&o.sel?' sel':''}" data-a="${o&&o.act||'rlHero'}" data-v="${id}" ${m?'':'disabled'}><div class="rl-pframe r${h.r}">${m?rlHeroSVG(id,{motes:false}):`<div class="rl-sil">${rlHeroSVG(id,{motes:false})}</div>`}</div>${inTeam>=0&&m?`<span class="rl-tslot">${inTeam===0?'Leader':'Team'}</span>`:''}<div class="rl-hc-name">${rlElChip(h.el)}<b>${m?esc(crName(id,m.lv)):'???'}</b></div><div class="rl-hc-sub">${m?`${rlStars(m.st)}<span class="num">Lv ${m.lv}</span>`:`${rlStars(h.r,'dim')}`}</div></button>`}
function rlHeroes(s,p){
  const R=rlUI(),owned=Object.keys(p.heroes);
  if(R.hero&&p.heroes[R.hero])return rlHeroDetail(s,p,R.hero);
  const list=RL_HEROES.filter(h=>R.hf==='all'||h.el===R.hf).sort((a,b)=>(!!p.heroes[b.id]-!!p.heroes[a.id])||b.r-a.r||(p.heroes[b.id]?p.heroes[b.id].lv:0)-(p.heroes[a.id]?p.heroes[a.id].lv:0));
  const team=i=>{const id=p.team[i];return id?`<button class="rl-slot filled" data-a="rlHero" data-v="${id}"><div class="rl-pframe r${RL_H[id].r} live">${rlHeroSVG(id)}</div><span>${i===0?'Leader':'Slot '+(i+1)}</span></button>`:`<div class="rl-slot"><span>Empty</span></div>`};
  const pw=p.team.reduce((a,id)=>a+rlPower(rlHeroStats(p,id)),0);
  const lead=p.team[0]&&RL_H[p.team[0]].ld;
  return`<div class="rl-sec"><div class="spread"><div><h2>Your team</h2><p class="muted">Power ${rlNum(pw)}. The first creature leads.${lead?' '+esc(rlLeadText(RL_H[p.team[0]])):''} Open a creature to add or remove them.</p></div></div><div class="rl-team">${[0,1,2,3].map(team).join('')}</div></div>
  <div class="rl-sec"><div class="spread"><div><h2>Collection</h2><p class="muted">${owned.length} of ${RL_HEROES.length} creatures found</p></div><div class="row">${[].map(e=>`<button class="pill" data-a="rlHf" data-v="${e}" aria-pressed="${R.hf===e}">${e==='all'?'All':rlElChip(e)+RL_EL[e].n}</button>`).join('')}</div></div>
  <div class="rl-grid">${list.map(h=>rlHeroCard(p,h.id)).join('')}</div></div>`;
}
function rlStatRows(st,base){const keys=['hp','atk','def','spd','cr','cd','acc','res'];return keys.map(k=>{const v=st[k],b=base[k],d=v-b;return`<div class="rl-srow"><span>${RL_STAT[k].n}</span><b class="num">${rlNum(v)}${RL_STAT[k].p?'%':''}</b>${d>0?`<span class="good num">+${rlNum(d)}</span>`:'<span></span>'}</div>`}).join('')}
function rlGearChip(g,o){if(!g)return'';const S=RL_SETS[g.set];return`<span class="rl-gchip ${g.r}" style="--sc:${S.c}"><b>${RL_SLOTS[g.s].n}</b> +${g.lv}<i>${S.n}</i></span>`}
function rlHeroDetail(s,p,id){
  const h=RL_H[id],m=p.heroes[id],st=rlHeroStats(p,id),base=rlBaseStats(id,m.lv,m.st),need=rlXpNeed(m.lv),mx=rlMaxLv(m.st),pc=rlPromoCost(m.st),inTeam=p.team.includes(id);
  const gear=[0,1,2,3,4,5].map(i=>{const g=p.gear.find(x=>x.i===m.g[i]);return`<button class="rl-gslot${g?' '+g.r:''}" data-a="rlGearSlot" data-v="${i}">${g?`<span class="rl-gs-set" style="color:${RL_SETS[g.set].c}">${RL_SETS[g.set].n}</span><b>${RL_SLOTS[i].n} +${g.lv}</b><span class="muted">${RL_STAT[g.m].n} +${rlGearVal(g)}${RL_STAT[g.m].p?'%':''}</span>`:`<b class="muted">${RL_SLOTS[i].n}</b><span class="muted">Empty</span>`}</button>`}).join('');
  return`<div class="rl-sec"><button class="btn sm" data-a="rlHeroBack">← All creatures</button></div>
  <div class="rl-hd"><div class="rl-hd-art"><div class="showcase"><div class="float"><div class="rl-pframe big r${h.r} live">${rlHeroSVG(id)}</div></div></div></div>
  <div class="stack"><div class="panel stack"><div class="row" style="justify-content:space-between"><div><h2 class="rl-hname">${esc(crName(id,m.lv))}</h2><p class="muted">${rlRarTag(h.r)} ${RL_ROLE[h.role]} · ${rlStars(m.st)}</p></div><div style="text-align:right"><p class="muted">Power</p><p class="big num">${rlNum(rlPower(st))}</p></div></div>
    <div><div class="row" style="justify-content:space-between;margin-bottom:6px"><span class="lv">Level ${m.lv} / ${mx}</span><span class="muted num">${m.lv>=mx?'Max level':`${m.xp} / ${need} XP`}</span></div><div class="bar"><i style="width:${m.lv>=mx?100:m.xp/need*100}%"></i></div></div>${crEvoPath(id,m.lv)}
    <div class="row"><button class="btn" data-a="rlTome" ${p.tomes&&m.lv<mx?'':'disabled'}>Use study tome (${p.tomes})</button>${m.st<6?`<button class="btn ${m.lv>=mx?'pri':''}" data-a="rlPromote" ${m.lv>=mx&&p.ess.any>=pc.ess&&p.gold>=pc.gold?'':'disabled'}>Promote to ${m.st+1}★ · ${pc.ess} essence (have ${p.ess.any||0}) + ${rlNum(pc.gold)} gold</button>`:''}<button class="btn ${inTeam?'danger':'pri'}" data-a="rlTeamToggle" data-v="${id}">${inTeam?'Remove from team':'Add to team'}</button>${inTeam&&p.team[0]!==id?`<button class="btn" data-a="rlLead" data-v="${id}">Make leader</button>`:''}</div>
    ${m.lv>=mx&&m.st<6?`<p class="muted">Max level reached. Promote to raise the cap to ${rlMaxLv(m.st+1)} and boost all stats by 10%.</p>`:''}</div>
   <div class="rl-hd-cols"><div class="panel"><h3 style="margin-bottom:8px">Stats</h3><div class="rl-stats">${rlStatRows(st,base)}</div>${st.sets.length?`<p class="muted" style="margin-top:8px">Active sets: ${st.sets.map(k=>`<b style="color:${RL_SETS[k].c}">${RL_SETS[k].n}</b> (${RL_SETS[k].d})`).join(', ')}</p>`:''}</div>
   <div class="panel"><h3 style="margin-bottom:8px">Skills</h3><div class="stack" style="gap:10px">${h.sk.map((k,i)=>`<div class="rl-skill"><div class="row" style="justify-content:space-between"><b>${esc(k.n)}</b><span class="muted">${k.pas?'Passive':k.cd?`Cooldown ${Math.max(1,k.cd-(m.sk[i]>=3?1:0))}`:'Basic'} · Lv ${m.sk[i]}/${rlSkMax(id,i)}</span></div><p class="muted">${esc(rlSkillText(h,k,m.sk[i],st))}${i>0&&!k.pas?' <span class="rl-mathtag">Answer a question for full power</span>':''}</p></div>`).join('')}${h.ld?`<div class="rl-skill lead"><b>Leader skill</b><p class="muted">${esc(rlLeadText(h))}</p></div>`:''}<p class="muted">Summoning ${esc(h.n)} again levels up a skill.</p></div></div></div>
   <div class="panel"><h3 style="margin-bottom:8px">Gear</h3><div class="rl-gslots">${gear}</div></div></div></div>`;
}

/* ---------- summon ---------- */
function rlSummonView(s,p){
  const c=rlCfg(),R=rlUI(),feat=RL_H[rlFeatured()],tot=(+c.rates[3])+(+c.rates[4])+(+c.rates[5])||100,cost10=c.summonCost*9;
  const res=R.sum?`<div class="rl-sumres">${R.sum.map((o,i)=>{const h=RL_H[o.id];return`<div class="rl-reveal r${h.r}" style="animation-delay:${i*.12}s"><div class="rl-pframe r${h.r}">${rlHeroSVG(o.id,{motes:false})}</div><b>${esc(h.n)}</b>${rlStars(h.r)}<span class="${o.note==='new'?'good':'muted'}">${o.note==='new'?'New creature!':o.note==='skill'?'Skill level up':'+ essence'}</span></div>`}).join('')}</div><div class="row" style="justify-content:center"><button class="btn" data-a="rlSumClear">Done</button></div>`:'';
  return`<div class="rl-sum"><div class="rl-portal"><div class="rl-ring a"></div><div class="rl-ring b"></div><div class="rl-ring c"></div><div class="rl-core"></div></div>
  <div class="stack"><div class="panel stack"><p class="rl-kicker">Featured this week</p><div class="row" style="gap:16px;flex-wrap:nowrap"><div class="rl-pframe r5 live" style="width:120px;flex:none">${rlHeroSVG(feat.id)}</div><div><h3>${esc(feat.n)}</h3><p class="muted">${RL_ROLE[feat.role]} ${rlStars(feat.r)}</p><p class="muted">Your best odds this week are ${esc(feat.n)}. ${esc(rlLeadText(feat))}</p></div></div></div>
   <div class="panel stack"><div class="row" style="justify-content:space-between"><h3>Summon</h3><span class="rl-pill">${RL_ICON.gems}<b class="num">${p.gems}</b></span></div>
    <div class="row"><button class="btn pri" data-a="rlSummon" data-v="1" ${p.gems<c.summonCost?'disabled':''}>Summon ×1 · ${RL_ICON.gems}${c.summonCost}</button><button class="btn pri" data-a="rlSummon" data-v="10" ${p.gems<cost10?'disabled':''}>Summon ×10 · ${RL_ICON.gems}${cost10}</button></div>
    <div class="rates">${[5,4,3].map(r=>`<span class="rl-stars">${'★'.repeat(r)}</span><div class="bar"><i style="width:${c.rates[r]/tot*100}%;background:${r===5?'#ff8a1f':r===4?'#b970ff':'#4aa8ff'}"></i></div><span class="num">${Math.round(c.rates[r]/tot*1000)/10}%</span>`).join('')}</div>
    <p class="muted">${c.pity>0?`A 5★ creature is guaranteed within <b>${Math.max(1,c.pity-p.pity)}</b> more summons. `:''}A ×10 summon costs 10% less and always includes a 4★ or better. Gems come from class points, first clears, quests and the arena. Real money is never involved.</p></div></div>${res}</div>`;
}

/* ---------- gear ---------- */
function rlGearCard(p,g,sel){const S=RL_SETS[g.set],own=rlOwner(p,g.i);return`<button class="rl-gcard ${g.r}${sel?' sel':''}" data-a="rlGSel" data-v="${g.i}"><span class="rl-gs-set" style="color:${S.c}">${S.n}</span><b>${RL_SLOTS[g.s].n} +${g.lv}</b><span>${RL_STAT[g.m].n} ${rlGearVal(g)}${RL_STAT[g.m].p?'%':''}</span><span class="muted">${g.sub.length} bonus stat${g.sub.length===1?'':'s'}</span>${own?`<i class="rl-gown">${esc(RL_H[own].n)}</i>`:''}</button>`}
function rlGearView(s,p){
  const R=rlUI(),f=R.gf;let list=p.gear.filter(g=>(f.s<0||g.s===f.s)&&(!f.set||g.set===f.set)&&(!f.r||g.r===f.r));
  list.sort((a,b)=>RL_GRAR.indexOf(b.r)-RL_GRAR.indexOf(a.r)||b.lv-a.lv||a.s-b.s);
  const g=p.gear.find(x=>x.i===R.gsel);
  return`<div class="spread"><div><h2>Gear</h2><p class="muted">${p.gear.length} pieces. Four of a set (or two, for some sets) unlock a set bonus.</p></div></div>
  <div class="row" style="margin-bottom:10px"><select data-c="rlGf" data-k="s" aria-label="Slot"><option value="-1">All slots</option>${RL_SLOTS.map((x,i)=>`<option value="${i}"${f.s===i?' selected':''}>${x.n}</option>`).join('')}</select><select data-c="rlGf" data-k="set" aria-label="Set"><option value="">All sets</option>${Object.keys(RL_SETS).map(k=>`<option value="${k}"${f.set===k?' selected':''}>${RL_SETS[k].n} (${RL_SETS[k].pcs}): ${RL_SETS[k].d}</option>`).join('')}</select><select data-c="rlGf" data-k="r" aria-label="Rarity"><option value="">All rarities</option>${RL_GRAR.map(r=>`<option value="${r}"${f.r===r?' selected':''}>${r}</option>`).join('')}</select></div>
  <div class="rl-gwrap"><div class="rl-ggrid">${list.map(x=>rlGearCard(p,x,x.i===R.gsel)).join('')||'<p class="muted">No gear yet. Battles, bosses, chests and dungeons drop it.</p>'}</div>${g?rlGearDetail(p,g):''}</div>`;
}
function rlGearDetail(p,g,forHero){
  const S=RL_SETS[g.set],own=rlOwner(p,g.i),cost=rlUpCost(g);
  return`<div class="panel stack rl-gdet ${g.r}"><div class="row" style="justify-content:space-between"><span class="rar ${g.r}">${g.r}</span><span class="muted">${RL_SLOTS[g.s].n}</span></div><h3>${S.n} ${RL_SLOTS[g.s].n} +${g.lv}</h3>
   <p class="rl-main">${RL_STAT[g.m].n} <b>+${rlGearVal(g)}${RL_STAT[g.m].p?'%':''}</b></p>${g.sub.map(q=>`<p class="rl-sub">${RL_STAT[q[0]].n} +${q[1]}${RL_STAT[q[0]].p?'%':''}</p>`).join('')}${g.sub.length<4?`<p class="muted">${4-g.sub.length} more bonus stat${4-g.sub.length>1?'s':''} unlock at +3, +6, +9, +12.</p>`:''}
   <p class="muted"><b style="color:${S.c}">${S.n} set (${S.pcs}):</b> ${S.d}</p>
   <div class="row">${g.lv<12?`<button class="btn pri" data-a="rlUp" data-v="${g.i}" ${p.gold<cost?'disabled':''}>Upgrade · ${RL_ICON.gold}${rlNum(cost)}</button>`:'<span class="muted">Fully upgraded</span>'}${forHero?(own===forHero?`<button class="btn" data-a="rlUnequip" data-v="${g.i}">Unequip</button>`:`<button class="btn pri" data-a="rlEquipG" data-v="${g.i}">Equip${own?` (take from ${esc(RL_H[own].n)})`:''}</button>`):`<button class="btn danger" data-a="rlSell" data-v="${g.i}" ${own?'disabled':''}>Sell · ${RL_ICON.gold}${rlNum(rlSellVal(g))}</button>`}</div>${own&&!forHero?`<p class="muted">Worn by ${esc(RL_H[own].n)}.</p>`:''}</div>`;
}
function rlModal(s,p){
  const R=rlUI(),M=R.modal;if(!M)return'';
  if(M.t==='gear'){const h=R.hero,slot=M.slot,list=p.gear.filter(g=>g.s===slot).sort((a,b)=>RL_GRAR.indexOf(b.r)-RL_GRAR.indexOf(a.r)||b.lv-a.lv),g=p.gear.find(x=>x.i===R.gsel&&x.s===slot);
    return`<div class="scrim" data-a="rlModalClose"><div class="modal" role="dialog" aria-modal="true" style="width:min(860px,100%)"><div class="row" style="justify-content:space-between"><h3>${esc(RL_H[h].n)} · ${RL_SLOTS[slot].n}</h3><button class="btn sm" data-a="rlModalX">Close</button></div><div class="rl-gwrap"><div class="rl-ggrid">${list.map(x=>rlGearCard(p,x,x.i===R.gsel)).join('')||`<p class="muted">You have no ${RL_SLOTS[slot].n} gear yet.</p>`}</div>${g?rlGearDetail(p,g,h):''}</div></div></div>`}
  return'';
}

/* ---------- arena ---------- */
function rlArenaView(s,p){
  const c=rlCfg();if(!c.arena)return`<div class="panel"><h3>The arena is closed</h3><p class="muted">Your teacher has paused arena battles.</p></div>`;
  const me=rlArena(s.id),T=rlTier(me.r),left=rlArenaLeft(s.id);
  const pool=Object.keys(state.arena||{}).filter(id=>id!==s.id&&state.arena[id].def&&S(id)&&(c.arenaScope==='all'||S(id).classId===s.classId)).map(id=>({id,name:S(id).name,r:state.arena[id].r,def:state.arena[id].def}));
  const opps=pool.concat(rlBots()).sort((a,b)=>Math.abs(a.r-me.r)-Math.abs(b.r-me.r)).slice(0,8);
  const board=Object.keys(state.arena||{}).filter(id=>S(id)&&(c.arenaScope==='all'||S(id).classId===s.classId)).map(id=>({id,r:state.arena[id].r,w:state.arena[id].w})).sort((a,b)=>b.r-a.r).slice(0,10);
  const mini=u=>`<div class="rl-mini" title="${esc(RL_H[u.id].n)} Lv ${u.lv}"><div class="rl-pframe r${RL_H[u.id].r}">${rlHeroSVG(u.id,{motes:false})}</div><span class="num">${u.lv}</span></div>`;
  return`<div class="rl-arena"><div class="stack"><div class="panel rl-rank" style="--tc:${T.c}"><p class="rl-kicker">Arena rating</p><p class="big num">${me.r}</p><p><b style="color:${T.c}">${T.n}</b> · ${me.w} wins, ${me.l} losses</p><p class="muted">${left===Infinity?'Unlimited battles today':`${left} battle${left===1?'':'s'} left today`}</p></div>
   <div class="panel stack"><h3>Defense team</h3><p class="muted">Classmates battle this saved team. It fights on its own using its skills at full power. Save again after you level up or change gear.</p><div class="row">${me.def?me.def.u.map(mini).join(''):'<span class="muted">Not set yet.</span>'}</div><button class="btn pri" data-a="rlSetDef" ${p.team.length?'':'disabled'}>Save current team as defense</button>${me.def?`<p class="muted">Saved ${new Date(me.def.t).toLocaleDateString()}</p>`:''}</div>
   <div class="panel"><h3 style="margin-bottom:8px">Defense log</h3>${me.log.length?me.log.map(l=>`<div class="rl-qrow"><span>${esc(S(l.by)?S(l.by).name:'Someone')} attacked</span><b class="${l.won?'good':'bad'}">${l.won?'Defended':'Lost'} ${l.d>0?'+':''}${l.d}</b></div>`).join(''):'<p class="muted">No one has attacked yet.</p>'}</div></div>
  <div class="stack"><div class="panel"><h3 style="margin-bottom:8px">Challengers</h3><div class="stack" style="gap:8px">${opps.map(o=>`<div class="rl-opp"><div><b>${esc(o.name)}</b>${o.bot?' <span class="muted">(practice)</span>':''}<br><span class="num" style="color:${rlTier(o.r).c}">${o.r}</span> <span class="muted">${rlTier(o.r).n}</span></div><div class="row">${o.def.u.map(mini).join('')}</div><button class="btn pri" data-a="rlArenaGo" data-v="${o.id}" ${left>0&&p.team.length?'':'disabled'}>Battle</button></div>`).join('')}</div></div>
   <div class="panel"><h3 style="margin-bottom:8px">Ladder</h3>${board.map((b,i)=>`<div class="rl-qrow${b.id===s.id?' me':''}"><span><b class="num">${i+1}</b> &nbsp;${esc(S(b.id).name)}</span><span class="num" style="color:${rlTier(b.r).c}">${b.r}</span></div>`).join('')||'<p class="muted">No ratings yet.</p>'}</div></div></div>`;
}

/* ---------- quests ---------- */
function rlRwText(rw){return Object.entries(rw).map(([k,v])=>k==='gems'?`${RL_ICON.gems}${v}`:k==='gold'?`${RL_ICON.gold}${rlNum(v)}`:k==='tomes'?`${RL_ICON.tomes}${v}`:k==='energy'?`${RL_ICON.energy}${v}`:k==='essence'?`${v[1]} ${RL_EL[v[0]].n} essence`:k==='gear'?`${v} gear`:'').join(' ')}
function rlQuestView(s,p){
  const dl=rlDailies(p),act=RL_QUESTS.filter(q=>p.q[q.id]),locked=RL_QUESTS.filter(q=>!p.q[q.id]);
  const row=(Q,st,daily)=>{const n=Q.goal.n,v=Math.min(n,st.p),ready=v>=n&&!st.c;return`<div class="rl-quest${st.c?' done':ready?' ready':''}"><div class="stack" style="gap:4px"><b>${esc(Q.n)}</b>${Q.d?`<span class="muted">${esc(Q.d)}</span>`:''}<div class="bar"><i style="width:${v/n*100}%"></i></div><span class="muted num">${v} / ${n} · Reward ${rlRwText(Q.rw)}</span></div>${st.c?'<span class="good">Claimed</span>':ready?`<button class="btn pri" data-a="${daily?'rlClaimD':'rlClaim'}" data-v="${Q.id}">Claim</button>`:''}</div>`};
  const visd=Object.keys(p.vis).length,chests=Object.keys(p.chests).length,shr=Object.keys(p.shr).length;
  return`<div class="rl-qs"><div class="stack"><div class="panel stack"><h3>Daily quests</h3><p class="muted">New ones every day.</p>${dl.list.map(st=>row(RL_DAILY.find(x=>x.id===st.id),st,true)).join('')}</div>
   <div class="panel stack"><h3>Explorer's journal</h3><div class="rl-stats">${[['Places explored',`${visd}/${RL_NODES.length}`],['Treasure chests',`${chests}/${RL_NODES.filter(n=>n.t==='chest').length}`],['Shrines blessed',`${shr}/${RL_NODES.filter(n=>n.t==='shrine').length}`],['Bosses defeated',`${RL_NODES.filter(n=>n.t==='boss'&&p.clr[n.id]).length}/6`],['Heroes found',`${Object.keys(p.heroes).length}/${RL_HEROES.length}`],['Tower record',`Floor ${p.tower}`],['Skill questions',`${p.math.ok}/${p.math.tot} correct`],['Monsters defeated',Object.values(p.kills).reduce((a,b)=>a+b,0)]].map(r=>`<div class="rl-srow"><span>${r[0]}</span><b class="num">${r[1]}</b><span></span></div>`).join('')}</div></div></div>
  <div class="panel stack"><h3>Story quests</h3><p class="muted">Visit a town to pick up its quests.</p>${act.map(Q=>row(Q,p.q[Q.id])).join('')}${locked.length?`<p class="muted">${locked.length} more quest${locked.length>1?'s':''} waiting in towns you haven't reached.</p>`:''}</div></div>`;
}

/* ---------- battle ---------- */
function rlStartBattle(s,p,ctx,allyDefs,waves,opt){
  const R=rlUI();const B=rlBattle(allyDefs,waves,opt);
  R.b={B,ctx,team:allyDefs.filter(d=>d.kind==='hero').map(d=>d.id),phase:'go',actor:null,pick:null,speed:R.lastSpeed||1,auto:false,math:null,res:null,kills:[],log:[]};
  R.node=ctx.node||R.node;render();setTimeout(rlbStep,450);
}
function rlBattleShell(s,p){const R=rlUI(),b=R.b;
  return`<div class="rlb" id="rlb" style="--elc:${RL_EL[(b.ctx.el)||'light'].c}"><div class="rlb-top"><div><b>${esc(b.ctx.title)}</b><span class="muted" id="rlb-wave"></span></div><div class="row"><div class="seg" role="group" aria-label="Speed">${[1,2,3].map(v=>`<button data-a="rlbSpeed" data-v="${v}" aria-pressed="${b.speed===v}">${v}×</button>`).join('')}</div>${rlCfg().auto&&!b.ctx.arenaVs?`<button class="btn sm${b.auto?' pri':''}" data-a="rlbAuto">Auto ${b.auto?'on':'off'}</button>`:''}<button class="btn sm" data-a="rlbQuit">${b.res?'Leave':'Retreat'}</button></div></div>
   <div class="rlb-order" id="rlb-order"></div><div class="rlb-field" id="rlb-field"><div class="rlb-side a" id="rlb-a"></div><div class="rlb-vs">VS</div><div class="rlb-side e" id="rlb-e"></div><div class="rlb-fx" id="rlb-fx"></div></div><div class="rlb-panel" id="rlb-panel"></div></div>`}
function rlMount(){
  if(ui.mode!=='student'||ui.sTab!=='realm')return;const R=rlUI();
  if(document.getElementById('rl-svg'))rlMapWire();
  if(R.b&&document.getElementById('rlb')){rlbBuild();rlbPanel()}
  const rv=document.querySelector('.rl-sumres');if(rv&&!STILL)rv.scrollIntoView({behavior:'smooth',block:'nearest'});
}
const RL_PC={};function rlPort(u){const k=u.kind==='hero'?'h'+u.id:'m'+u.id+u.el+(u.boss?1:0);return RL_PC[k]||(RL_PC[k]=u.kind==='hero'?rlHeroSVG(u.id,{motes:false}):rlMonSVG(u.id,u.el,u.boss))}
function rlbUnitHTML(u){const port=rlPort(u);
  return`<div class="rlu${u.boss?' boss':''}${u.alive?'':' dead'}" id="rlu-${u.uid}" data-a="rlbTarget" data-v="${u.uid}"><div class="rlu-port">${port}</div><div class="rlu-info"><div class="rlu-name">${rlElChip(u.el)}<b>${esc(u.name)}</b><span class="muted num">${u.lv}</span></div><div class="rlu-hp"><i class="hp"></i><i class="sh"></i><span class="num"></span></div><div class="rlu-atb"><i></i></div><div class="rlu-fx"></div></div></div>`}
function rlbBuild(){const b=rlUI().b,B=b.B;const A=document.getElementById('rlb-a'),E=document.getElementById('rlb-e');if(!A)return;
  A.innerHTML=B.side[0].map(rlbUnitHTML).join('');E.innerHTML=B.side[1].map(rlbUnitHTML).join('');rlbSync()}
function rlbSync(){const b=rlUI().b;if(!b)return;const B=b.B;
  for(const u of B.all()){const el=document.getElementById('rlu-'+u.uid);if(!el)continue;
    el.classList.toggle('dead',!u.alive);el.classList.toggle('turn',b.actor===u.uid);
    const hp=el.querySelector('.hp'),sh=el.querySelector('.sh'),tx=el.querySelector('.rlu-hp span'),at=el.querySelector('.rlu-atb i'),fx=el.querySelector('.rlu-fx');
    hp.style.width=(u.hp/u.maxHp*100)+'%';hp.classList.toggle('low',u.hp/u.maxHp<.3);sh.style.width=Math.min(100,u.shield/u.maxHp*100)+'%';tx.textContent=u.alive?`${rlNum(u.hp)} / ${rlNum(u.maxHp)}`:'Defeated';at.style.width=Math.min(100,u.atb)+'%';
    const counts={};u.fx.forEach(f=>counts[f.k]=(counts[f.k]||0)+1);
    fx.innerHTML=Object.keys(counts).map(k=>{const F=RL_FX[k],t=Math.max(...u.fx.filter(f=>f.k===k).map(f=>f.t));return`<span class="rl-fxc${F.buff?' b':''}" style="--fc:${F.c}" title="${F.n}: ${F.d} (${t} turn${t>1?'s':''})">${F.g}${counts[k]>1?'×'+counts[k]:''}<i>${t}</i></span>`}).join('')}
  const w=document.getElementById('rlb-wave');if(w)w.textContent=` · Wave ${B.wave+1} of ${B.waves.length}`;
  const o=document.getElementById('rlb-order');if(o){const live=B.all().filter(u=>u.alive).map(u=>({u,t:(100-u.atb)/rlEff(u,'spd')})).sort((a,c)=>a.t-c.t).slice(0,8);const key=live.map(x=>x.u.uid).join(',');
    if(o.dataset.k!==key){o.dataset.k=key;o.innerHTML=`<span class="muted">Next</span>`+live.map(x=>`<span class="rlb-oc ${x.u.side?'e':'a'}" title="${esc(x.u.name)}">${rlPort(x.u)}</span>`).join('')}}
}
function rlbPanel(){const R=rlUI(),b=R.b,el=document.getElementById('rlb-panel');if(!el||!b)return;const B=b.B;
  if(b.res){el.innerHTML=rlbResult(b);return}
  if(b.math){const m=b.math;el.innerHTML=`<div class="rlb-math"><p class="rl-kicker">Power up ${esc(m.sk.n)}</p><div class="q"><small>${esc(m.q.topic)}</small>${m.q.q}</div><div class="rlb-mt"><i id="rlb-mt" style="width:100%"></i></div><div class="choices">${m.q.choices.map((c,i)=>`<button class="choice" data-a="rlbAns" data-v="${i}"><kbd>${i+1}</kbd>${esc(c)}</button>`).join('')}</div><p class="muted">Correct: full power. Wrong or out of time: half power, and its harmful effects won't land.</p></div>`;if(!STILL)el.scrollIntoView({behavior:'smooth',block:'nearest'});return}
  const u=b.phase==='pick'&&B.find(b.actor);
  if(!u){el.innerHTML=`<p class="muted rlb-wait">${b.auto?'Auto battle: skills fire at half power without questions.':'…'}</p>`;return}
  el.innerHTML=`<div class="rlb-actor"><div class="rl-pframe r${RL_H[u.id].r}">${rlHeroSVG(u.id,{motes:false})}</div><div><b>${esc(u.name)}'s turn</b><p class="muted">${b.pick!=null?`Choose a target for ${esc(u.sk[b.pick].n)}.`:'Choose a skill.'}</p></div></div><div class="rlb-skills">${u.sk.map((k,i)=>{if(k.pas)return`<div class="rlb-sk pas"><b>${esc(k.n)}</b><span>Passive</span></div>`;const ok=rlUsable(u,i);return`<button class="rlb-sk${b.pick===i?' on':''}" data-a="rlbSkill" data-v="${i}" ${ok?'':'disabled'} title="${esc(rlSkillText(RL_H[u.id],k,u.skl[i],u.stats))}"><b>${esc(k.n)}</b><span>${!ok?(rlHas(u,'seal')&&i>0?'Sealed':`Ready in ${u.cds[i]}`):i===0?'Basic':rlCfg().mathSkills?'⚡ Question':'Skill'}</span><small>${esc(rlSkillText(RL_H[u.id],k,u.skl[i],u.stats))}</small></button>`}).join('')}</div>`;
}
function rlbDelay(ms){const b=rlUI().b;return new Promise(r=>setTimeout(r,STILL?0:ms/(b?b.speed:1)))}
function rlbFloat(uid,text,cls){const el=document.getElementById('rlu-'+uid);if(!el)return;const f=document.createElement('span');f.className='rlb-float '+(cls||'');f.textContent=text;f.style.left=(30+Math.random()*40)+'%';el.appendChild(f);setTimeout(()=>f.remove(),1100)}
function rlbShot(fromUid,toUid,col,big){const fx=document.getElementById('rlb-fx'),a=document.getElementById('rlu-'+fromUid),t=document.getElementById('rlu-'+toUid);if(!fx||!a||!t||STILL)return;
  const F=fx.getBoundingClientRect(),A=a.getBoundingClientRect(),T=t.getBoundingClientRect(),o=document.createElement('i');o.className='rlb-orb'+(big?' big':'');o.style.setProperty('--oc',col);
  o.style.left=(A.left+A.width/2-F.left)+'px';o.style.top=(A.top+A.height/2-F.top)+'px';fx.appendChild(o);
  requestAnimationFrame(()=>{o.style.transform=`translate(${T.left-A.left+(T.width-A.width)/2}px,${T.top-A.top+(T.height-A.height)/2}px) scale(${big?1.4:1})`});setTimeout(()=>o.remove(),420/(rlUI().b.speed))}
async function rlbPlay(ev){
  const b=rlUI().b,B=b.B;
  for(const e of ev){
    if(!rlUI().b)return;
    if(e.k==='act'){const u=B.find(e.u),s=u.sk[e.s],el=document.getElementById('rlu-'+e.u);b.actor=e.u;rlbSync();
      rlbFloat(e.u,s.n+(e.p<1?' (half)':''),'name');if(el){el.classList.add('acting',u.side?'lunge-l':'lunge-r');setTimeout(()=>el.classList.remove('acting','lunge-l','lunge-r'),420)}
      const foe=s.tg==='e1'||s.tg==='eA';const col=RL_EL[u.el].c;
      if(foe)e.t.forEach(t=>rlbShot(e.u,t,col,s.tg==='e1'&&e.s>0));else e.t.forEach(t=>{const te=document.getElementById('rlu-'+t);if(te){te.classList.add('blessed');setTimeout(()=>te.classList.remove('blessed'),600)}});
      await rlbDelay(foe?380:300)}
    else if(e.k==='hit'){const el=document.getElementById('rlu-'+e.u);if(el){el.classList.remove('hit');void el.offsetWidth;el.classList.add('hit')}
      rlbFloat(e.u,(e.dot?'':'−')+rlNum(e.v)+(e.crit?'!':''),e.dot?'dot':e.crit?'crit':'dmg');if(e.adv>0)rlbFloat(e.u,'Strong','adv');if(e.adv<0)rlbFloat(e.u,'Weak','weak');rlbSync();await rlbDelay(e.crit?220:150)}
    else if(e.k==='heal'){rlbFloat(e.u,'+'+rlNum(e.v),'heal');rlbSync();await rlbDelay(120)}
    else if(e.k==='fx'){const F=RL_FX[e.f];rlbFloat(e.u,F.n,F.buff?'buff':'debuff');rlbSync();await rlbDelay(140)}
    else if(e.k==='resist'){rlbFloat(e.u,'Resisted','muted');await rlbDelay(90)}
    else if(e.k==='die'){const u=B.find(e.u);if(u&&u.side===1)b.kills.push(u.el);rlbSync();await rlbDelay(260)}
    else if(e.k==='revive'){rlbFloat(e.u,'Revived','heal');rlbSync();await rlbDelay(220)}
    else if(e.k==='atb'){rlbFloat(e.u,(e.v>0?'+':'')+e.v+'% turn',e.v>0?'buff':'debuff');rlbSync();await rlbDelay(90)}
    else if(e.k==='skip'){rlbFloat(e.u,'Stunned','debuff');await rlbDelay(320)}
    else if(e.k==='counter'){rlbFloat(e.u,'Counter!','buff');await rlbDelay(150)}
    else if(e.k==='cleanse'||e.k==='strip'){rlbFloat(e.u,e.k==='cleanse'?'Cleansed':'Buffs removed',e.k==='cleanse'?'buff':'debuff');rlbSync();await rlbDelay(120)}
    else if(e.k==='wave'){await rlbDelay(500);const f=document.getElementById('rlb-field');if(f){const w=document.createElement('div');w.className='rlb-banner';w.textContent=`Wave ${e.n+1}`;f.appendChild(w);setTimeout(()=>w.remove(),1300)}rlbBuild();await rlbDelay(700)}
    else if(e.k==='fxgone')rlbSync();
  }
  rlbSync();
}
async function rlbStep(){
  const R=rlUI(),b=R.b;if(!b||b.res||b.busy)return;b.busy=true;
  try{
    const B=b.B;
    while(B.status==='go'&&rlUI().b===b){
      const u=rlNextActor(B);if(!u)break;b.actor=u.uid;rlbSync();
      const st=rlTurnStart(B,u);if(st.ev.length)await rlbPlay(st.ev);if(!st.can)continue;
      if(u.side===0&&!b.auto&&!b.ctx.arenaAuto){b.phase='pick';b.pick=null;rlbPanel();b.busy=false;return}
      const a=rlAI(B,u);await rlbDelay(220);
      const pw=u.side===0&&a.i>0?.5:1;const ev=rlAct(B,u,a.i,a.tid,pw);await rlbPlay(ev);
    }
    if(rlUI().b===b&&B.status!=='go')rlbEnd();
  }finally{b.busy=false}
}
function rlbUse(i,tid){const R=rlUI(),b=R.b,u=b.B.find(b.actor),s=u.sk[i],c=rlCfg();
  const go=async pw=>{b.phase='go';b.pick=null;b.math=null;rlbPanel();const ev=rlAct(b.B,u,i,tid,pw);await rlbPlay(ev);if(b.B.status!=='go')rlbEnd();else rlbStep()};
  if(i>0&&c.mathSkills){const s0=S(ui.sId),q=genQuestion((C(s0.classId)||{level:2}).level);b.math={q,sk:s,i,tid,t0:Date.now(),go};b.phase='math';rlbPanel();
    const tick=()=>{const m=b.math;if(!m||rlUI().b!==b)return;const f=1-(Date.now()-m.t0)/(c.mathTime*1000),el=document.getElementById('rlb-mt');if(el)el.style.width=Math.max(0,f*100)+'%';if(f<=0){rlbAnswer(null)}else requestAnimationFrame(tick)};requestAnimationFrame(tick)}
  else go(1);
}
function rlbAnswer(i){const R=rlUI(),b=R.b,m=b&&b.math;if(!m||m.done)return;m.done=true;const p=RLS.cache[ui.sId];const ok=i!=null&&m.q.choices[i]===m.q.answer;
  p.math.tot++;if(ok){p.math.ok++;rlQ(p,'math',{})}
  document.querySelectorAll('.rlb-math .choice').forEach((el,k)=>{el.disabled=true;if(m.q.choices[k]===m.q.answer)el.classList.add('right');else if(k===i)el.classList.add('wrong')});
  const fb=document.createElement('p');fb.className='rlb-verdict '+(ok?'good':'bad');fb.textContent=ok?'Full power!':i==null?'Out of time: half power':'Half power';document.querySelector('.rlb-math').prepend(fb);
  setTimeout(()=>m.go(ok?1:.5),ok?650:1300);}
function rlbEnd(){
  const R=rlUI(),b=R.b,s=S(ui.sId),p=RLS.cache[ui.sId];const won=b.B.status==='win';
  if(b.ctx.arenaVs){const opp=b.ctx.arenaVs,me=rlArena(s.id);me.used++;const d=rlArenaResult(s.id,opp,won);let items=[];if(won){p.gems+=15;p.gold+=1500;items=[{k:'gems',v:15},{k:'gold',v:1500}];rlQ(p,'arena',{})}else{p.gems+=3;items=[{k:'gems',v:3}]}b.res={won,items,xp:{},ups:{},arenaD:d,rating:me.r};save()}
  else{const res=rlFinish(p,{...b.ctx,kills:b.kills},won,b.team);if(won&&b.ctx.tier!=null)p.clr[b.ctx.node+':'+b.ctx.tier]=1;b.res=res}
  b.actor=null;rlSave(s.id);rlbSync();rlbPanel();const q=document.querySelector('.rlb-top [data-a="rlbQuit"]');if(q)q.textContent='Leave';
}
function rlbResult(b){const r=b.res;const item=i=>i.k==='gear'?`<div class="rl-ritem gear ${i.g.r}"><span class="rar ${i.g.r}">${i.g.r}</span><b>${RL_SETS[i.g.set].n} ${RL_SLOTS[i.g.s].n}</b><span class="muted">${RL_STAT[i.g.m].n} +${rlGearVal(i.g)}${RL_STAT[i.g.m].p?'%':''}</span></div>`:`<div class="rl-ritem">${i.k==='ess'?`${rlElChip(i.el)}<b>${i.v}</b><span class="muted">${RL_EL[i.el].n} essence</span>`:`${RL_ICON[i.k]||''}<b>${rlNum(i.v)}</b><span class="muted">${i.k}</span>`}</div>`;
  return`<div class="rlb-res"><h2 class="${r.won?'good':'bad'}">${r.won?'Victory':'Defeat'}</h2>${r.arenaD!=null?`<p class="big num ${r.arenaD>=0?'good':'bad'}">${r.arenaD>=0?'+':''}${r.arenaD}</p><p class="muted">Rating now ${r.rating}</p>`:''}
   ${r.won||r.arenaD!=null?`<div class="rl-ritems">${r.items.map(item).join('')}</div>`:`<p class="muted">Tips: level creatures with tomes (they evolve at level 10 and 25) and repeat earlier stages, fill every gear slot, and bring creatures with an element advantage (Fire beats Wind, Wind beats Water, Water beats Fire, Light and Dark beat each other).</p>`}
   ${Object.keys(r.xp).length?`<div class="row" style="justify-content:center">${Object.keys(r.xp).map(id=>`<span class="pill">${esc(crName(id,(P_()&&P_().heroes[id]||{}).lv))} +${r.xp[id]} XP${r.ups[id]?` <b class="good">Level up!</b>`:''}</span>`).join('')}</div>`:''}${crEvoBlock(r)}
   <div class="row" style="justify-content:center"><button class="btn pri" data-a="rlbQuit">Continue</button>${b.ctx.node&&!b.ctx.arenaVs&&b.ctx.kind!=='tower'?`<button class="btn" data-a="rlbAgain">Fight again</button>`:''}${b.ctx.kind==='tower'&&r.won?`<button class="btn" data-a="rlbAgain">Next floor</button>`:''}</div></div>`}

/* ---------- actions ---------- */
const P_=()=>RLS.cache[ui.sId];
function rlLaunch(nodeId){const s=S(ui.sId),p=P_(),R=rlUI(),n=RL_N[nodeId],c=rlCfg();if(!p.team.length){toast('Add creatures to your team first (Creatures tab)');return}
  const cost=RL_COST[n.t]||0;if(c.energy&&rlEnergy(p)<cost){toast(`Not enough energy. It refills 1 every ${c.energyMin} minutes.`);return}
  let enc,ctx;
  if(n.t==='dungeon'){enc=rlEncounter(nodeId,{tier:R.tier,seed:Date.now()});ctx={node:nodeId,lv:enc.lv,kind:'dungeon',tier:R.tier,title:`${n.n} · ${RL_DUNGEON_TIERS[R.tier].n}`,el:RL_DUNGEON[nodeId].el}}
  else if(n.t==='tower'){const f=p.tower+1;enc=rlEncounter(nodeId,{floor:f,seed:f});ctx={node:nodeId,lv:enc.lv,kind:'tower',floor:f,title:`Tower of Trials · Floor ${f}`,el:'light'}}
  else{enc=rlEncounter(nodeId,{seed:(p.clr[nodeId]||0)});ctx={node:nodeId,lv:enc.lv,kind:enc.kind,title:n.n,el:RL_REG[n.reg].el}}
  if(c.energy)p.energy-=cost;rlSave(s.id);
  rlStartBattle(s,p,ctx,p.team.map(id=>rlHeroUnit(p,id)),enc.waves);
}
const REALM_ACTIONS={
  rlTab(d){const R=rlUI();R.v=d.v;R.hero=null;R.modal=null;R.sum=null;render()},
  rlStart(d){const s=S(ui.sId),p=P_(),c=rlCfg();rlAddHero(p,d.v);RL_FREE.forEach(id=>rlAddHero(p,id));p.team=[d.v,...RL_FREE];p.gems+=c.startGems;p.started=true;p.energy=c.energyMax;
    RL_QUESTS.filter(q=>q.at==='g0').forEach(q=>{p.q[q.id]={p:0}});rlVisit(p,'g0');rlSave(s.id);rlUI().v='world';rlUI().flash=`${RL_H[d.v].n} joins you. Welcome to the Realm!`;render()},
  rlNode(d){if(RLU.dragged||RLU.travel)return;const p=P_();const R=rlUI();if(p.pos===d.v||!rlNodeOpen(p,d.v)){R.node=d.v;render();return}R.node=d.v;rlTravel(S(ui.sId),p,d.v)},
  rlGo(d){if(RLU.travel)return;rlTravel(S(ui.sId),P_(),d.v)},
  rlNodeClose(){rlUI().node=null;render()},
  rlZoom(d){rlZoomBy(+d.v)},
  rlCenter(){const p=P_(),me=RL_N[p.pos],R=rlUI();R.pan={x:460/R.pan.k-me.x,y:300/R.pan.k-me.y,k:R.pan.k};render()},
  rlFight(d){rlLaunch(d.v)},
  rlTier(d){rlUI().tier=+d.v;render()},
  rlChest(d){const p=P_(),n=RL_N[d.v];if(p.chests[d.v])return;p.chests[d.v]=1;const got=rlReward(p,n.loot);rlSave(ui.sId);rlUI().flash='Found: '+got.map(g=>g.k==='gear'?`${g.g.r} ${RL_SETS[g.g.set].n} ${RL_SLOTS[g.g.s].n}`:`${rlNum(g.v)} ${g.k}`).join(', ');render()},
  rlShrine(d){const p=P_(),n=RL_N[d.v];if(p.shr[d.v])return;p.shr[d.v]=1;rlSave(ui.sId);rlUI().flash=`Blessing received: +${n.buff[1]}${RL_STAT[n.buff[0]].p?'%':''} ${RL_STAT[n.buff[0]].n} for every creature.`;render()},
  rlBuy(d){const p=P_(),c={tome:1800,energy:1500,crate:7000}[d.v];if(p.gold<c)return;p.gold-=c;let msg='';if(d.v==='tome'){p.tomes++;msg='Bought a study tome'}else if(d.v==='energy'){p.energy+=20;msg='+20 energy'}else{const g=rlGearNew(p,{r:rlDropRarity(20,25)});msg=`Crate: ${g.r} ${RL_SETS[g.set].n} ${RL_SLOTS[g.s].n}`}rlSave(ui.sId);rlUI().flash=msg;render()},
  rlHero(d){const R=rlUI();R.hero=d.v;R.v='heroes';render()},
  rlHeroBack(){rlUI().hero=null;render()},
  rlHf(d){rlUI().hf=d.v;render()},
  rlTeamToggle(d){const p=P_(),i=p.team.indexOf(d.v);if(i>=0)p.team.splice(i,1);else{if(p.team.length>=4){toast('Your team is full. Remove someone first.');return}p.team.push(d.v)}rlSave(ui.sId);render()},
  rlLead(d){const p=P_(),i=p.team.indexOf(d.v);if(i>0){p.team.splice(i,1);p.team.unshift(d.v);rlSave(ui.sId);render()}},
  rlTome(){const p=P_(),id=rlUI().hero;if(!p.tomes)return;p.tomes--;const ups=rlGiveXp(p,id,1500);rlSave(ui.sId);const lv0=p.heroes[id].lv-ups;rlUI().flash=ups?(crStage(lv0)<crStage(p.heroes[id].lv)?`${crName(id,lv0)} evolved into ${crName(id,p.heroes[id].lv)}!`:`${crName(id,p.heroes[id].lv)} reached level ${p.heroes[id].lv}!`):`${crName(id,p.heroes[id].lv)} gained 1500 XP`;render()},
  rlPromote(){const p=P_(),id=rlUI().hero,h=p.heroes[id],c=rlPromoCost(h.st),el=RL_H[id].el;if(h.lv<rlMaxLv(h.st)||p.ess.any<c.ess||p.gold<c.gold)return;p.ess.any-=c.ess;p.gold-=c.gold;h.st++;rlSave(ui.sId);rlUI().flash=`${crName(id,h.lv)} is now ${h.st}★!`;render()},
  rlGearSlot(d){const R=rlUI();R.modal={t:'gear',slot:+d.v};const p=P_(),h=p.heroes[R.hero];R.gsel=h.g[+d.v]||null;render()},
  rlModalX(){rlUI().modal=null;render()},
  rlModalClose(d,el,ev){if(ev.target===el){rlUI().modal=null;render()}},
  rlGSel(d){rlUI().gsel=+d.v;render()},
  rlEquipG(d){const p=P_(),R=rlUI();rlEquip(p,R.hero,+d.v);rlQ(p,'equip',{});rlSave(ui.sId);R.modal=null;render()},
  rlUnequip(d){const p=P_();for(const id in p.heroes){const h=p.heroes[id];h.g=h.g.map(x=>x===+d.v?0:x)}rlSave(ui.sId);render()},
  rlUp(d){const p=P_(),g=p.gear.find(x=>x.i===+d.v);if(!g)return;const r=rlUpgrade(p,g);if(r==='ok'){rlQ(p,'upgrade',{});rlSave(ui.sId);if(g.lv%3===0)rlUI().flash=`+${g.lv}! A bonus stat was ${g.sub.length<=4?'added or improved':'improved'}.`}render()},
  rlSell(d){const p=P_(),g=p.gear.find(x=>x.i===+d.v);if(!g||rlOwner(p,g.i))return;p.gold+=rlSellVal(g);p.gear=p.gear.filter(x=>x!==g);rlUI().gsel=null;rlSave(ui.sId);render()},
  rlSummon(d){const p=P_(),c=rlCfg(),n=+d.v,cost=n===10?c.summonCost*9:c.summonCost*n;if(p.gems<cost)return;p.gems-=cost;const out=rlSummon(p,n);rlQ(p,'summon',{n});rlSave(ui.sId);rlUI().sum=out;render()},
  rlSumClear(){rlUI().sum=null;render()},
  rlSetDef(){const s=S(ui.sId),p=P_(),a=rlArena(s.id);a.def=rlSnapshot(p,p.team);save();rlUI().flash='Defense team saved';render()},
  rlArenaGo(d){const s=S(ui.sId),p=P_();if(rlArenaLeft(s.id)<=0||!p.team.length)return;
    const opp=d.v.startsWith('bot')?rlBots().find(b=>b.id===d.v):{id:d.v,name:S(d.v).name,r:rlArena(d.v).r,def:rlArena(d.v).def};if(!opp||!opp.def)return;
    const foes=opp.def.u.map(u=>{let st=u.s;if(!opp.def.sq&&!opp.bot)st={...st,hp:Math.round(st.hp/RL_SQ),atk:rlR1(st.atk/RL_SQ),def:rlR1(st.def/RL_SQ)};return{...rlHeroUnit(null,u.id,st),lv:u.lv,st:u.st,skl:u.sk}});
    rlStartBattle(s,p,{arenaVs:opp,title:`Arena vs ${opp.name}`,el:RL_H[opp.def.u[0].id].el,lv:0},p.team.map(id=>rlHeroUnit(p,id)),[foes],{enemyLeader:true})},
  rlClaim(d){const p=P_(),Q=RL_QUESTS.find(q=>q.id===d.v),st=p.q[d.v];if(!st||!st.done||st.c)return;st.c=1;const got=rlReward(p,Q.rw);rlSave(ui.sId);rlUI().flash='Quest complete: '+got.map(g=>g.k==='gear'?`${g.g.r} gear`:g.k==='ess'?`${g.v} ${RL_EL[g.el].n} essence`:`${rlNum(g.v)} ${g.k}`).join(', ');render()},
  rlClaimD(d){const p=P_(),st=p.daily.list.find(x=>x.id===d.v),D=RL_DAILY.find(x=>x.id===d.v);if(!st||st.c||st.p<D.goal.n)return;st.c=1;rlReward(p,D.rw);rlSave(ui.sId);render()},
  rlbSpeed(d){const R=rlUI();R.b.speed=+d.v;R.lastSpeed=+d.v;document.querySelectorAll('[data-a="rlbSpeed"]').forEach(x=>x.setAttribute('aria-pressed',x.dataset.v===d.v))},
  rlbAuto(el){const b=rlUI().b;b.auto=!b.auto;const btn=document.querySelector('[data-a="rlbAuto"]');if(btn){btn.textContent='Auto '+(b.auto?'on':'off');btn.classList.toggle('pri',b.auto)}if(b.auto&&b.phase==='pick'){b.phase='go';rlbPanel();rlbStep()}else rlbPanel()},
  rlbSkill(d){const b=rlUI().b;if(b.phase!=='pick')return;const u=b.B.find(b.actor),i=+d.v,s=u.sk[i];if(!rlUsable(u,i))return;
    if(s.tg==='e1'||s.tg==='a1'){b.pick=i;rlbPanel();document.querySelectorAll('[id^="rlu-"]').forEach(x=>x.classList.remove('targetable'));const side=s.tg==='e1'?1-u.side:u.side;b.B.side[side].filter(x=>x.alive).forEach(x=>{const e=document.getElementById('rlu-'+x.uid);if(e)e.classList.add('targetable')});return}
    b.phase='busy';rlbUse(i)},
  rlbTarget(d){const b=rlUI().b;if(!b||b.phase!=='pick'||b.pick==null)return;const u=b.B.find(b.actor),s=u.sk[b.pick],t=b.B.find(+d.v);if(!t||!t.alive)return;
    if((s.tg==='e1'&&t.side===u.side)||(s.tg==='a1'&&t.side!==u.side))return;document.querySelectorAll('[id^="rlu-"]').forEach(x=>x.classList.remove('targetable'));const i=b.pick;b.phase='busy';rlbUse(i,t.uid)},
  rlbAns(d){rlbAnswer(+d.v)},
  rlbQuit(){const R=rlUI(),b=R.b;if(!b)return;if(!b.res&&!b.ctx.arenaVs){confirmBox('Retreat from battle?','You keep nothing from this battle, and the energy is not refunded.','Retreat',()=>{R.b=null})}else if(!b.res&&b.ctx.arenaVs){confirmBox('Forfeit this arena battle?','It counts as a loss.','Forfeit',()=>{b.B.status='lose';rlbEnd();R.b=null})}else{R.b=null;R.v=b.ctx.arenaVs?'arena':'world';render()}},
  rlbAgain(){const R=rlUI(),b=R.b;const node=b.ctx.node;R.b=null;rlLaunch(node)},
  // teacher
  rlTGiveHero(){const id=document.getElementById('rlt-hero').value,f=+document.getElementById('rlt-form').value,who=document.getElementById('rlt-hwho').value;if(!RL_H[id])return;
    const ids=who==='all'?state.students.map(s=>s.id):who.startsWith('c:')?state.students.filter(s=>s.classId===who.slice(2)).map(s=>s.id):[who];
    ids.forEach(sid=>{const s=S(sid);if(s)s.heroGift=[...(Array.isArray(s.heroGift)?s.heroGift:[]),id+'@'+f]});save();
    toast(`Sent ${RL_H[id].ev[f]} to ${ids.length===1?S(ids[0]).name:ids.length+' students'}. It arrives next time they open the Realm.`)},
  rlTGive(d){const v=parseInt((document.getElementById('rlt-gems')||{}).value,10);if(!v||v<0)return;const who=document.getElementById('rlt-who').value;const ids=who==='all'?state.students.map(s=>s.id):who.startsWith('c:')?state.students.filter(s=>s.classId===who.slice(2)).map(s=>s.id):[who];ids.forEach(id=>{const s=S(id);if(s)s.gemBank=(s.gemBank||0)+v});save();toast(`Sent ${v} gems to ${ids.length} student${ids.length>1?'s':''}. They arrive next time they open the Realm.`)},
  rlTSeason(){confirmBox('Start a new arena season?','Every rating goes back to 1000 and records reset. Defense teams stay.','Reset ratings',()=>{for(const id in (state.arena||{})){const a=state.arena[id];a.r=1000;a.w=0;a.l=0;a.log=[]}save()})},
  rlTLoad(){Promise.all(state.students.map(s=>rlLoad(s.id))).then(()=>{rlUI().tload=true;render()})},
};
const REALM_CHANGE={
  rlGf(el){const R=rlUI();R.gf[el.dataset.k]=el.dataset.k==='s'?+el.value:el.value;render()},
};
function rlKey(ev){const b=ui.rl&&ui.rl.b;if(!b||ui.mode!=='student'||ui.sTab!=='realm')return false;
  if(b.math&&'1234'.includes(ev.key)){rlbAnswer(+ev.key-1);return true}
  if(b.phase==='pick'&&'qwe'.includes(ev.key.toLowerCase())){REALM_ACTIONS.rlbSkill({v:String('qwe'.indexOf(ev.key.toLowerCase()))});return true}
  return false}

/* ---------- teacher controls ---------- */
function tRealm(){
  const c=rlCfg(),R=rlUI(),tot=(+c.rates[3])+(+c.rates[4])+(+c.rates[5]);
  const set=(k,label,t,extra)=>t==='bool'?`<label class="chk"><input type="checkbox" id="rls-${k}" data-c="rlSet" data-k="${k}" data-t="bool"${c[k]?' checked':''}>${label}</label>`:`<label class="f">${label}<input type="number" id="rls-${k}" data-c="rlSet" data-k="${k}" data-t="int" value="${c[k]}" min="0"${extra||''}></label>`;
  const rows=state.students.map(s=>{const p=RLS.cache[s.id],a=(state.arena||{})[s.id];if(!p||!p.started)return`<tr><td><b>${esc(s.name)}</b></td><td class="muted" colspan="6">${p?'Not started':R.tload?'Not started':'…'}</td><td class="num">${(s.gemBank||0)}</td></tr>`;
    const lv=Math.max(...Object.values(p.heroes).map(h=>h.lv)),boss=RL_NODES.filter(n=>n.t==='boss'&&p.clr[n.id]).length;return`<tr><td><b>${esc(s.name)}</b></td><td class="num">${Object.keys(p.heroes).length}</td><td class="num">${lv}</td><td class="num">${boss}/6</td><td class="num">${p.tower}</td><td class="num">${a?a.r:'—'}</td><td class="num">${p.math.tot?Math.round(p.math.ok/p.math.tot*100)+'%':'—'}</td><td class="num">${p.gems}${s.gemBank?` (+${s.gemBank})`:''}</td></tr>`}).join('');
  return`<div class="spread"><div><h2>Realm</h2><p class="muted">The collectible RPG. Students explore the map, summon creatures, battle with math-powered skills and challenge classmates in the arena. Their Realm progress saves separately from points.</p></div></div>
  <div class="stack"><div class="bgrid"><div class="panel stack"><h3>Access</h3>${set('on','Realm is open to students','bool')}${set('mathSkills','Special skills need a correct math answer for full power','bool')}${set('mathTime','Seconds to answer')}${set('auto','Allow auto battle (skills at half power, no questions)','bool')}</div>
   <div class="panel stack"><h3>Gems and summoning</h3>${set('gemsPerPoint','Gems per positive point you give')}${set('startGems','Starting gems for new players')}${set('summonCost','Gems per summon (×10 costs 9×)')}<div class="row">${[3,4,5].map(r=>`<label class="f"><span class="rl-stars">${'★'.repeat(r)}</span> %<input type="number" id="rls-r${r}" data-c="rlSet" data-k="rates.${r}" data-t="int" value="${c.rates[r]}" min="0" max="100"></label>`).join('')}</div><p class="${tot===100?'muted':'bad'}">Odds add up to ${tot}%.</p>${set('pity','Guaranteed 5★ within this many summons (0 = off)')}</div></div>
   <div class="bgrid"><div class="panel stack"><h3>Energy</h3>${set('energy','Battles cost energy (limits how much students can play)','bool')}${set('energyMax','Most energy a student can hold')}${set('energyMin','Minutes for 1 energy to refill')}<p class="muted">Battles cost 4, elites 6, bosses 8, dungeons 6. The tower is free.</p></div>
   <div class="panel stack"><h3>Arena</h3>${set('arena','Arena is open','bool')}${set('arenaDaily','Arena battles per student per day (0 = no limit)')}<label class="f">Who students can challenge<select data-c="rlSet" data-k="arenaScope" data-t="str" id="rls-scope"><option value="class"${c.arenaScope==='class'?' selected':''}>Their own class</option><option value="all"${c.arenaScope==='all'?' selected':''}>All my classes</option></select></label><button class="btn danger" data-a="rlTSeason">Start a new season (reset ratings)</button></div></div>
   <div class="panel stack"><h3>Give gems</h3><div class="row"><label class="f">To<select id="rlt-who"><option value="all">Everyone</option>${state.classes.map(c=>`<option value="c:${c.id}">${esc(c.name)}</option>`).join('')}${state.students.map(s=>`<option value="${s.id}">${esc(s.name)}</option>`).join('')}</select></label><label class="f">Gems<input type="number" id="rlt-gems" value="100" min="1"></label><button class="btn pri" data-a="rlTGive" style="align-self:flex-end">Send</button></div></div>
   <div class="panel stack"><h3>Give a creature</h3><p class="muted">Lands in their collection next time they open the Realm. If they already have it, it levels up to the form you pick and gets a skill upgrade.</p><div class="row" style="flex-wrap:wrap"><label class="f">To<select id="rlt-hwho"><option value="all">Everyone</option>${state.classes.map(c=>`<option value="c:${c.id}">${esc(c.name)}</option>`).join('')}${state.students.map(s=>`<option value="${s.id}">${esc(s.name)}</option>`).join('')}</select></label><label class="f">Creature<select id="rlt-hero">${[0].map(()=>`<optgroup label="Heroes">${RL_HEROES.map(h=>`<option value="${h.id}">${esc(h.n)} ${'★'.repeat(h.r)}${typeof RL_ART!=='undefined'&&RL_ART[h.id]?' (new art)':''}</option>`).join('')}</optgroup>`).join('')}</select></label><label class="f">Form<select id="rlt-form"><option value="0">Base (Lv 1)</option><option value="1">Evolved (Lv ${CR_EVO[0]})</option><option value="2">Fully evolved (Lv ${CR_EVO[1]})</option></select></label><button class="btn pri" data-a="rlTGiveHero" style="align-self:flex-end">Give</button></div></div>
   <div class="panel scroll"><div class="row" style="justify-content:space-between;margin-bottom:8px"><h3>Student progress</h3><button class="btn sm" data-a="rlTLoad">${R.tload?'Refresh':'Load progress'}</button></div><table><thead><tr><th>Student</th><th>Creatures</th><th>Top level</th><th>Bosses</th><th>Tower</th><th>Arena</th><th>Skill questions</th><th>Gems</th></tr></thead><tbody>${rows}</tbody></table></div></div>`;
}
const REALM_TCHANGE={
  rlSet(el){if(!state.settings.realm)state.settings.realm={};const k=el.dataset.k,t=el.dataset.t,v=t==='bool'?el.checked:t==='int'?Math.max(0,parseInt(el.value,10)||0):el.value;
    if(k.startsWith('rates.')){state.settings.realm.rates={...rlCfg().rates,[k.slice(6)]:v}}else state.settings.realm[k]=v;save();if(t!=='int'||k.startsWith('rates'))render()},
};

/* ---------- styles ---------- */
(function(){const st=document.createElement('style');st.textContent=`
.rl{display:flex;flex-direction:column;gap:14px}
.rl-top{display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap}
.rl-tabs{display:flex;gap:4px;flex-wrap:wrap;background:rgba(0,0,0,.3);border:1px solid rgba(255,255,255,.07);border-radius:12px;padding:4px}
.rl-tabs button{border:0;background:none;color:var(--muted);font-weight:700;text-transform:uppercase;letter-spacing:.06em;font-size:13px;padding:8px 14px;border-radius:9px;position:relative}
.rl-tabs button[aria-current="true"]{background:linear-gradient(180deg,#3a2f52,#2a2338);color:#fff;box-shadow:inset 0 1px 0 rgba(255,255,255,.1),0 0 18px -6px #b970ff}
.rl-dot{position:absolute;top:2px;right:2px;background:var(--bad);color:#fff;font-size:10px;border-radius:99px;padding:0 5px;line-height:15px}
.rl-res{display:flex;gap:6px;flex-wrap:wrap}
.rl-pill{display:inline-flex;align-items:center;gap:6px;background:linear-gradient(180deg,#2a2634,#1f1c27);border:1px solid rgba(255,255,255,.09);border-radius:99px;padding:5px 12px;font-size:14px}
.rl-gem,.rl-gold,.rl-en,.rl-tome{display:inline-block;width:14px;height:14px;flex:none;vertical-align:-2px}
.rl-gem{background:linear-gradient(135deg,#bfe9ff,#3da5ff 50%,#1b3fa8);clip-path:polygon(50% 0,100% 38%,50% 100%,0 38%);filter:drop-shadow(0 0 4px #3da5ff)}
.rl-gold{border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff7b0,#ffd60a 45%,#c99a00)}
.rl-en{background:#4fd17a;clip-path:polygon(55% 0,10% 58%,45% 58%,35% 100%,90% 40%,55% 40%)}
.rl-tome{background:linear-gradient(90deg,#8a3a3a 0 20%,#c94a4a 20%);border-radius:2px}
.rl-flash{background:linear-gradient(90deg,rgba(56,211,159,.2),rgba(56,211,159,.04));border:1px solid rgba(56,211,159,.4);border-radius:10px;padding:10px 14px;font-weight:600}
.rl-kicker{font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#c9b3ff}
.rl-stars{color:#ffd60a;letter-spacing:-1px;text-shadow:0 0 8px rgba(255,214,10,.5);font-size:13px}.rl-stars.dim{opacity:.35}
.rl-elc{display:inline-grid;place-items:center;width:20px;height:20px;border-radius:50%;background:radial-gradient(circle at 35% 30%,color-mix(in srgb,var(--ec) 60%,#fff),var(--ec));box-shadow:0 0 8px color-mix(in srgb,var(--ec) 60%,transparent);vertical-align:-4px;flex:none}
.rl-port{display:block;width:100%;height:auto}
.rl-pframe{border-radius:10px;overflow:hidden;padding:2px;background:#3a3545;position:relative}
.rl-pframe svg{border-radius:8px}
.rl-pframe.rl-rar{display:inline-block;font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;border:1px solid;border-radius:999px;padding:1px 8px;margin-right:4px}
.r1{background:linear-gradient(160deg,#f4f4f6,#9a9aa6)}.r2{background:linear-gradient(160deg,#8fe08a,#2c7a35)}.r3{background:linear-gradient(160deg,#6fa8ff,#2a4a8a)}.rl-pframe.r4{background:linear-gradient(160deg,#d9a8ff,#6a2ab5);box-shadow:0 0 14px -4px #b970ff}.rl-pframe.r5{background:conic-gradient(from var(--ang,0deg),#ffd60a,#ff8a1f,#fff3b0,#ff8a1f,#ffd60a);box-shadow:0 0 20px -4px #ff8a1f;animation:spin 6s linear infinite}
.live .rl-mote{animation:rlMote 4s ease-in-out infinite}@keyframes rlMote{0%,100%{transform:translateY(0);opacity:.25}50%{transform:translateY(-14px);opacity:.9}}
.live .rl-float,.rl-float{animation:rlFloat 3s ease-in-out infinite}@keyframes rlFloat{50%{transform:translateY(-5px)}}
.rl-spin{animation:rlSpin 6s linear infinite}@keyframes rlSpin{to{transform:rotate(360deg)}}
.rl-glow{animation:rlGlow 2.2s ease-in-out infinite}@keyframes rlGlow{50%{opacity:.6}}
.rl-idle{animation:rlIdle 2.8s ease-in-out infinite;transform-origin:100px 210px}@keyframes rlIdle{50%{transform:scale(1.02,.98) translateY(1px)}}
.rl-start{align-items:center;text-align:center}.rl-hero-intro{max-width:640px}.rl-hero-intro h2{font-size:44px;margin:6px 0 10px}
.rl-starters{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;width:100%;max-width:900px}
.rl-starter{background:linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,.01)),#1a1721;border:1px solid rgba(255,255,255,.1);border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:8px;text-align:left;transition:transform .2s}
.rl-starter:hover{transform:translateY(-6px);box-shadow:0 20px 40px -20px #000,0 0 0 1px #b970ff}
.rl-sname{display:flex;gap:8px;align-items:center;font-size:18px}.rl-sdesc{font-size:14px}
.rl-world{position:relative}
.rl-map{position:relative;height:min(68vh,620px);min-height:420px;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,.1);box-shadow:0 30px 60px -30px #000;background:#081322;touch-action:none;cursor:grab}
.rl-map svg{width:100%;height:100%;display:block}
.rl-mlabel{font-family:var(--display);font-size:26px;fill:#fff;opacity:.55;letter-spacing:.12em;paint-order:stroke;stroke:#000;stroke-width:4px;stroke-opacity:.4;pointer-events:none}
.rl-road{fill:none;stroke:#e8d9b0;stroke-width:4;stroke-dasharray:10 8;opacity:.7}.rl-road.locked{opacity:.2}
.rl-node{cursor:pointer}.rl-node .rl-nring{fill:none;stroke:#fff;stroke-opacity:.0;stroke-width:3}.rl-node .rl-nbg{fill:#2a2433;stroke:#e8d9b0;stroke-width:2.5}
.rl-node.vis .rl-nbg{fill:#3a2f52}.rl-node.t-boss .rl-nbg{fill:#5a1a24;stroke:#ffd60a}.rl-node.t-elite .rl-nbg{fill:#4a1f3a}.rl-node.t-town .rl-nbg{fill:#2a4a3a}.rl-node.t-dungeon .rl-nbg{fill:#1f3a5a}.rl-node.t-tower .rl-nbg{fill:#3a3a5a;stroke:#ffd60a}.rl-node.t-chest .rl-nbg{fill:#5a3a1e}.rl-node.t-shrine .rl-nbg{fill:#1f4a5a}
.rl-node.clr .rl-nbg{stroke:#38d39f}.rl-node.locked{opacity:.45}
.rl-node:hover .rl-nring,.rl-node.sel .rl-nring{stroke-opacity:.9;animation:rlPulse 1.4s ease-in-out infinite}@keyframes rlPulse{50%{stroke-opacity:.2}}
.rl-q{font-family:var(--display);font-size:20px;fill:#e8d9b0}
.rl-nlv{font-size:13px;font-weight:700;fill:#fff;paint-order:stroke;stroke:#000;stroke-width:3.5px;stroke-opacity:.75;pointer-events:none}
.rl-chk{fill:#38d39f}
.rl-lock rect{fill:rgba(15,13,20,.85);stroke:rgba(255,255,255,.2)}.rl-lock text{fill:#fff;font-family:var(--display);font-size:18px;letter-spacing:.1em}.rl-lock text.sm{font-family:var(--body);font-size:12px;letter-spacing:0;fill:#c9bfd6}
.rl-bob{animation:rlBob 1.6s ease-in-out infinite}@keyframes rlBob{50%{transform:translateY(-5px)}}
.rl-mapui{position:absolute;left:12px;top:12px;display:flex;gap:6px}
.rl-legend{position:absolute;left:12px;bottom:12px;background:rgba(15,13,20,.75);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:8px 12px;display:flex;flex-direction:column;font-size:14px}
.rl-npanel{position:absolute;right:12px;top:12px;bottom:12px;width:min(340px,calc(100% - 24px));overflow:auto;background:rgba(20,17,28,.88);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.12);border-radius:14px;padding:16px;display:flex;flex-direction:column;gap:10px;box-shadow:0 20px 40px -20px #000;cursor:default}
.rl-npanel.hint{bottom:auto}
.rl-ntype{font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#c9b3ff}
.rl-foes{display:flex;gap:6px;flex-wrap:wrap}.rl-foe{width:62px;position:relative}.rl-foe svg{border-radius:8px;border:1px solid rgba(255,255,255,.1)}.rl-foe span{position:absolute;right:-4px;bottom:-4px}.rl-foe.rlboss{width:80px}
.rl-qrow{display:flex;justify-content:space-between;gap:10px;padding:6px 0;border-bottom:1px solid rgba(255,255,255,.06)}.rl-qrow.me{background:rgba(255,214,10,.08)}
.rl-shop{display:grid;gap:6px}.rl-buy{display:grid;grid-template-columns:1fr auto;gap:2px 10px;text-align:left;background:linear-gradient(180deg,#2c2836,#221e2b);border:1px solid rgba(255,255,255,.08);border-radius:10px;padding:8px 10px}.rl-buy span:last-child{grid-row:1/3;grid-column:2;align-self:center;display:flex;gap:4px;align-items:center;font-weight:700}
.rl-tiers{display:flex;gap:6px;flex-wrap:wrap}
@media(max-width:700px){.rl-map{height:58vh;min-height:340px}.rl-npanel{position:static;width:auto;margin-top:12px;max-height:none}.rl-world{display:flex;flex-direction:column}.rl-legend{display:none}}
.rl-sec{margin-bottom:6px}
.rl-team{display:grid;grid-template-columns:repeat(4,minmax(0,170px));gap:12px}
.rl-slot{border:2px dashed rgba(255,255,255,.15);border-radius:12px;min-height:120px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;background:none;color:var(--muted);padding:6px}
.rl-slot.filled{border-style:solid;border-color:rgba(255,255,255,.1);background:rgba(255,255,255,.03)}.rl-slot.filled .rl-pframe{width:100%}
.rl-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:12px}
.rl-hcard{background:linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.01)),#1a1721;border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:6px;display:flex;flex-direction:column;gap:5px;text-align:left;position:relative;transition:transform .18s}
.rl-hcard:hover:not(:disabled){transform:translateY(-4px)}
.rl-hcard.unowned{opacity:.55}.rl-sil svg{filter:brightness(.12) saturate(0) contrast(1.4)}
.rl-hc-name{display:flex;gap:6px;align-items:center;font-size:14px;line-height:1.1}.rl-hc-sub{display:flex;justify-content:space-between;font-size:13px}
.rl-tslot{position:absolute;top:10px;left:10px;background:#ffd60a;color:#17140a;font-size:10px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;padding:1px 6px;border-radius:4px}
.rl-hd{display:grid;grid-template-columns:minmax(240px,320px) 1fr;gap:20px;align-items:start}
.rl-pframe.big{width:100%}
.rl-hname{font-size:40px}
.rl-hd-cols{display:grid;grid-template-columns:1fr 1.4fr;gap:14px}
@media(max-width:900px){.rl-hd{grid-template-columns:1fr}.rl-hd-art{max-width:300px}.rl-hd-cols{grid-template-columns:1fr}.rl-team{grid-template-columns:repeat(2,1fr)}}
.rl-stats{display:grid;gap:2px}.rl-srow{display:grid;grid-template-columns:1fr auto 60px;gap:8px;padding:5px 0;border-bottom:1px solid rgba(255,255,255,.06)}.rl-srow span:last-child{text-align:right;font-size:13px}
.rl-skill{border-left:3px solid #b970ff;padding:2px 0 2px 10px}.rl-skill.lead{border-color:#ffd60a}
.rl-mathtag{display:inline-block;background:rgba(255,214,10,.15);color:#ffd60a;border-radius:4px;padding:0 6px;font-size:12px;font-weight:700}
.rl-gslots{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px}
.rl-gslot,.rl-gcard{display:flex;flex-direction:column;gap:2px;text-align:left;background:linear-gradient(180deg,#2a2634,#1d1a24);border:1px solid rgba(255,255,255,.08);border-left:3px solid #6f6a7a;border-radius:10px;padding:8px 10px;position:relative}
.rl-gslot.rare,.rl-gcard.rare{border-left-color:#4aa8ff}.rl-gslot.epic,.rl-gcard.epic{border-left-color:#b970ff;box-shadow:0 0 14px -8px #b970ff}.rl-gslot.legendary,.rl-gcard.legendary{border-left-color:#ff8a1f;box-shadow:0 0 16px -8px #ff8a1f}
.rl-gcard.sel{outline:2px solid var(--accent)}
.rl-gs-set{font-size:11px;font-weight:800;letter-spacing:.1em;text-transform:uppercase}
.rl-gown{position:absolute;right:8px;top:8px;font-style:normal;font-size:11px;color:var(--muted)}
.rl-gwrap{display:grid;grid-template-columns:1fr 320px;gap:14px;align-items:start}@media(max-width:820px){.rl-gwrap{grid-template-columns:1fr}}
.rl-ggrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:8px;max-height:60vh;overflow:auto;padding:2px}
.rl-main{font-size:20px}.rl-sub{border-bottom:1px solid rgba(255,255,255,.06);padding:3px 0}
.rl-sum{display:grid;grid-template-columns:minmax(220px,340px) 1fr;gap:20px;align-items:start}.rl-sum>.rl-sumres,.rl-sum>.row{grid-column:1/-1}
@media(max-width:820px){.rl-sum{grid-template-columns:1fr}}
.rl-portal{position:relative;aspect-ratio:1;max-width:340px;width:100%;margin:0 auto}
.rl-ring{position:absolute;inset:0;border-radius:50%;border:3px solid #b970ff;box-shadow:0 0 30px #b970ff,inset 0 0 30px #b970ff}
.rl-ring.a{animation:rlSpin 9s linear infinite;border-style:dashed}.rl-ring.b{inset:12%;border-color:#4aa8ff;box-shadow:0 0 24px #4aa8ff,inset 0 0 24px #4aa8ff;animation:rlSpin 6s linear infinite reverse;border-style:dotted}.rl-ring.c{inset:26%;border-color:#ffd60a;box-shadow:0 0 22px #ffd60a;animation:rlSpin 4s linear infinite}
.rl-core{position:absolute;inset:36%;border-radius:50%;background:radial-gradient(circle,#fff,#d9c2ff 30%,#7a3cff 60%,transparent 72%);animation:rlGlow 2s ease-in-out infinite}
.rl-sumres{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:12px}
.rl-reveal{display:flex;flex-direction:column;gap:4px;align-items:center;text-align:center;animation:rlReveal .6s cubic-bezier(.2,1.4,.4,1) both}
.rl-reveal .rl-pframe{width:100%}.rl-reveal.r5 .rl-pframe{box-shadow:0 0 40px #ff8a1f}
@keyframes rlReveal{from{transform:rotateY(90deg) scale(.7);opacity:0}}
.rl-arena{display:grid;grid-template-columns:minmax(260px,360px) 1fr;gap:16px;align-items:start}@media(max-width:900px){.rl-arena{grid-template-columns:1fr}}
.rl-rank{text-align:center;background:radial-gradient(80% 60% at 50% 0%,color-mix(in srgb,var(--tc) 30%,transparent),transparent 70%),linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.01)),#1a1721}
.rl-mini{width:54px;position:relative}.rl-mini span{position:absolute;bottom:2px;right:4px;font-size:11px;font-weight:800;text-shadow:0 1px 2px #000}
.rl-opp{display:grid;grid-template-columns:1fr auto auto;gap:12px;align-items:center;padding:8px;border-radius:10px;background:rgba(255,255,255,.03)}
@media(max-width:600px){.rl-opp{grid-template-columns:1fr auto}.rl-opp .row{grid-column:1/-1}}
.rl-qs{display:grid;grid-template-columns:1fr 1fr;gap:16px;align-items:start}@media(max-width:900px){.rl-qs{grid-template-columns:1fr}}
.rl-quest{display:grid;grid-template-columns:1fr auto;gap:12px;align-items:center;padding:10px;border-radius:10px;background:rgba(255,255,255,.03)}.rl-quest.ready{background:rgba(255,214,10,.08);box-shadow:inset 0 0 0 1px rgba(255,214,10,.4)}.rl-quest.done{opacity:.55}
/* battle */
.rlb{display:flex;flex-direction:column;gap:10px}
.rlb-top{display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap}.rlb-top b{font-family:var(--display);font-size:22px;letter-spacing:.04em;text-transform:uppercase;font-weight:400}
.rlb-order{display:flex;gap:6px;align-items:center;min-height:40px}.rlb-oc{width:34px;border-radius:6px;overflow:hidden;border:2px solid #4aa8ff}.rlb-oc.e{border-color:#ff4d6d}.rlb-oc:first-of-type{width:44px;box-shadow:0 0 12px #ffd60a}
.rlb-field{position:relative;display:grid;grid-template-columns:1fr auto 1fr;gap:14px;align-items:center;padding:18px;border-radius:16px;border:1px solid rgba(255,255,255,.1);background:radial-gradient(70% 60% at 50% 100%,color-mix(in srgb,var(--elc) 30%,transparent),transparent 70%),radial-gradient(120% 80% at 50% 0%,#2a2340,#120f19);overflow:hidden;min-height:320px}
.rlb-field::before{content:"";position:absolute;left:0;right:0;bottom:0;height:40%;background:linear-gradient(transparent,rgba(0,0,0,.4)),repeating-linear-gradient(90deg,rgba(255,255,255,.04) 0 1px,transparent 1px 60px);transform:perspective(400px) rotateX(55deg);transform-origin:bottom;pointer-events:none}
.rlb-vs{font-family:var(--display);font-size:30px;color:rgba(255,255,255,.18)}
.rlb-side{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;position:relative;z-index:1}
.rlb-fx{position:absolute;inset:0;pointer-events:none;z-index:3}
.rlu{min-width:0;display:grid;grid-template-columns:88px minmax(0,1fr);gap:8px;align-items:center;background:rgba(15,13,20,.72);border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:6px;position:relative;transition:transform .25s cubic-bezier(.2,.8,.3,1),opacity .3s,filter .3s;cursor:default}
.rlu.boss{grid-column:1/-1;grid-template-columns:130px 1fr;border-color:#ffd60a;box-shadow:0 0 24px -8px #ffd60a}
.rlu-port{border-radius:8px;overflow:hidden}
.rlu-info{min-width:0}.rlu-name{min-width:0;display:flex;gap:5px;align-items:center;font-size:15px;line-height:1.1}.rlu-name b{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.rlu-hp{position:relative;height:16px;background:#2a0d14;border-radius:5px;overflow:hidden;margin-top:4px;border:1px solid rgba(0,0,0,.5)}
.rlu-hp .hp{position:absolute;inset:0 auto 0 0;background:linear-gradient(180deg,#5ef0b0,#1f9d6a);transition:width .35s}.rlu-hp .hp.low{background:linear-gradient(180deg,#ff8a9a,#c42a44)}
.rlu-hp .sh{position:absolute;inset:0 auto 0 0;background:repeating-linear-gradient(45deg,rgba(159,214,255,.8) 0 4px,rgba(159,214,255,.5) 4px 8px);transition:width .35s}
.rlu-hp span{position:absolute;inset:0;display:grid;place-items:center;font-size:11px;font-weight:800;text-shadow:0 1px 2px #000}
.rlu-atb{height:4px;background:rgba(255,255,255,.08);border-radius:2px;margin-top:3px;overflow:hidden}.rlu-atb i{display:block;height:100%;background:#4aa8ff;transition:width .3s}.e .rlu-atb i{background:#ff7a8f}
.rlu-fx{display:flex;gap:3px;flex-wrap:wrap;min-height:18px;margin-top:3px}
.rl-fxc{position:relative;font-size:10px;font-weight:800;padding:1px 4px;border-radius:4px;background:color-mix(in srgb,var(--fc) 25%,#1a1721);border:1px solid var(--fc);color:#fff;line-height:14px;animation:rlPop .25s}
.rl-fxc i{font-style:normal;opacity:.7;margin-left:2px}
@keyframes rlPop{from{transform:scale(.4)}}
.rlu.turn{border-color:#ffd60a;box-shadow:0 0 0 2px #ffd60a,0 0 24px -4px #ffd60a}
.rlu.dead{opacity:.35;filter:grayscale(1)}
.rlu.targetable{cursor:pointer;animation:rlTarget 1s ease-in-out infinite}.rlu.targetable:hover{transform:scale(1.04);border-color:#fff}
@keyframes rlTarget{50%{box-shadow:0 0 0 2px #ff4d6d,0 0 24px -4px #ff4d6d}}
.rlu.lunge-r{transform:translateX(18px) scale(1.04)}.rlu.lunge-l{transform:translateX(-18px) scale(1.04)}
.rlu.hit{animation:rlHit .3s}@keyframes rlHit{25%{transform:translateX(-6px);filter:brightness(2.2)}60%{transform:translateX(5px)}}
.rlu.blessed{box-shadow:0 0 0 2px #38d39f,0 0 30px -2px #38d39f}
.rlb-orb{position:absolute;width:18px;height:18px;margin:-9px;border-radius:50%;background:radial-gradient(circle,#fff,var(--oc) 45%,transparent 70%);box-shadow:0 0 20px var(--oc),0 0 40px var(--oc);transition:transform .3s cubic-bezier(.4,0,.6,1)}.rlb-orb.big{width:30px;height:30px;margin:-15px}
.rlb-float{position:absolute;top:10%;font-family:var(--display);font-size:22px;pointer-events:none;z-index:4;text-shadow:0 2px 0 #000,0 0 10px rgba(0,0,0,.8);animation:rlRise 1.05s ease-out forwards;white-space:nowrap}
.rlb-float.crit{color:#ffb800;font-size:30px}.rlb-float.dmg{color:#fff}.rlb-float.dot{color:#ff8a3d;font-size:18px}.rlb-float.heal{color:#5ef0b0}.rlb-float.buff{color:#7ab8ff;font-size:15px}.rlb-float.debuff{color:#ff7a8f;font-size:15px}.rlb-float.adv{color:#ffd60a;font-size:13px;top:40%}.rlb-float.weak{color:#a69fb0;font-size:13px;top:40%}.rlb-float.muted{color:#a69fb0;font-size:14px}.rlb-float.name{color:#ffd60a;font-size:15px;top:-6px;font-family:var(--body);font-weight:800}
@keyframes rlRise{0%{transform:translateY(8px) scale(.7);opacity:0}15%{transform:translateY(0) scale(1.1);opacity:1}100%{transform:translateY(-34px);opacity:0}}
.rlb-banner{position:absolute;inset:0;display:grid;place-items:center;font-family:var(--display);font-size:56px;color:#fff;text-shadow:0 0 30px var(--elc);z-index:5;animation:rlBanner 1.3s ease-out forwards;pointer-events:none}@keyframes rlBanner{0%{transform:scale(1.6);opacity:0}20%{transform:scale(1);opacity:1}80%{opacity:1}100%{opacity:0}}
.rlb-panel{background:linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.01)),#1a1721;border:1px solid rgba(255,255,255,.09);border-radius:14px;padding:12px;min-height:120px}
.rlb-wait{text-align:center;padding:30px 0}
.rlb-actor{display:flex;gap:12px;align-items:center;margin-bottom:10px}.rlb-actor .rl-pframe{width:56px}
.rlb-skills{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.rlb-sk{display:flex;flex-direction:column;gap:3px;text-align:left;background:linear-gradient(180deg,#332d40,#251f30);border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:10px;transition:transform .12s,border-color .12s}
.rlb-sk:hover:not(:disabled){transform:translateY(-2px);border-color:#ffd60a}.rlb-sk.on{border-color:#ffd60a;box-shadow:0 0 18px -6px #ffd60a}.rlb-sk:disabled{opacity:.45}
.rlb-sk span{font-size:12px;font-weight:700;color:#ffd60a}.rlb-sk small{font-size:12px;color:var(--muted);line-height:1.3}.rlb-sk.pas{opacity:.6}
@media(max-width:700px){.rlb-skills{grid-template-columns:1fr}.rlb-field{grid-template-columns:1fr;padding:10px;min-height:0}.rlb-vs{display:none}.rlb-side.e{order:-1}.rlb-side{gap:6px}.rlu{grid-template-columns:44px minmax(0,1fr);gap:6px;padding:5px}.rlu.boss{grid-template-columns:64px minmax(0,1fr)}.rlu-name{font-size:13px}.rlu-name .muted{display:none}}
.rlb-math{display:flex;flex-direction:column;gap:10px}.rlb-math .q{padding:16px}
.rlb-mt{height:6px;background:rgba(255,255,255,.08);border-radius:99px;overflow:hidden}.rlb-mt i{display:block;height:100%;background:#ffd60a}
.rlb-verdict{font-family:var(--display);font-size:26px;text-align:center}
.rlb-res{display:flex;flex-direction:column;gap:12px;align-items:center;text-align:center}.rlb-res h2{font-size:56px}
.rl-ritems{display:flex;gap:8px;flex-wrap:wrap;justify-content:center}.rl-ritem{display:flex;flex-direction:column;align-items:center;gap:2px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:10px;padding:8px 14px;min-width:90px;animation:rlReveal .5s both}.rl-ritem.gear{border-left:3px solid #6f6a7a}.rl-ritem.gear.rare{border-left-color:#4aa8ff}.rl-ritem.gear.epic{border-left-color:#b970ff}.rl-ritem.gear.legendary{border-left-color:#ff8a1f}
@media(prefers-reduced-motion:reduce){.rl *{animation:none!important;transition:none!important}}
`;document.head.appendChild(st)})();
