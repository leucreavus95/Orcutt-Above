"use strict";
/* ================================================================
   REALM ROSTER: the Realm uses only heroes with painted art, and no
   elements. Each hero has a signature colour of their own instead.
   To add a hero: add their art in realm-images.js, then list them here.
   ================================================================ */
const RL_ROSTER=[
  // Ren, the fire fox (chibi art). Epic. A blade fighter who also throws foxfire:
  // his slash sets enemies Burning, his bolt sets every Burn off at once, and his ward
  // shields the team and sets attackers on fire.
  {id:'fox',col:{c:'#ff7a2f',l:'#ffe2c4',d:'#5a1a0c'},vp:['#ffffff','#fff0b8','#ffb347','#e0461c'],
   hero:{n:'Ren',r:4,role:'atk',spd:112,it:'staff',o:'tunic',hg:'',lk:[4,9,1,4,1,2,1,1,3,4],ld:{s:'atk',v:15},
     ev:['Ren','Ren Emberfang','Ren, the Foxfire Warden'],
     sk:[rlSk('Ember Slash',{m:3.7,fx:[['burn',2,45]]}),
         rlSk('Foxfire Bolt',{cd:3,m:3.0,det:true}),
         rlSk('Flame Ward',{cd:4,tg:'aA',fx:[['shield',15,2],['ward',2]]})]}},
  // Kai, the sea turtle (chibi art). Rare. A guardian: his hits scale from DEF, his water spear
  // punches through armor, his wave washes buffs away, and his current lets him take hits for his friends.
  {id:'turtle',col:{c:'#3fc7c0',l:'#d9fbf6',d:'#0d3f45'},vp:['#ffffff','#dffaff','#6fe0f5','#1a7fa8'],
   hero:{n:'Kai',r:3,role:'def',spd:98,it:'staff',o:'tunic',hg:'',lk:[4,9,1,4,1,2,1,1,3,4],ld:{s:'def',v:15},
     ev:['Kai','Kai Tideshell','Kai, the Tide Templar'],
     sk:[rlSk('Tidal Thrust',{m:3.4,sc:'def',ign:.3,fx:[['slow',1,30]]}),
         rlSk('Shellspin Wave',{cd:3,tg:'eA',m:1.9,sc:'def',fx:[['strip',1],['atbDown',20,50]]}),
         rlSk('Guardian Current',{cd:4,tg:'aA',fx:[['shield',18,2],['guard',2]]})]}},
  // Crag, the ram (chibi art). Rare. A hammer bruiser: his slam sends an aftershock through
  // the whole enemy line, his crystals crack armor, and his stone wall blunts every hit on the team.
  {id:'ram',col:{c:'#d98a4a',l:'#f8e7cc',d:'#3e2a1a'},vp:['#fff6e0','#f3d9a8','#d98a4a','#5a3a22'],
   hero:{n:'Crag',r:3,role:'atk',spd:100,it:'staff',o:'tunic',hg:'',lk:[4,9,1,4,1,2,1,1,3,4],ld:{s:'hp',v:15},
     ev:['Crag','Crag Stonehorn','Crag, the Geode King'],
     sk:[rlSk('Seismic Strike',{m:3.5,splash:.35}),
         rlSk('Crystal Burst',{cd:3,m:1.25,h:3,fx:[['defBreak',1,30]]}),
         rlSk('Earthen Bulwark',{cd:4,tg:'aA',fx:[['bulwark',2],['self','defUp',2]]})]}}
];
RL_EL.any={n:'Star',c:'#ffd96a',d:'#8a6a00',l:'#fff6c9',beats:null};
(function(){
  for(const R of RL_ROSTER){
    RL_EL[R.id]={n:'',c:R.col.c,l:R.col.l,d:R.col.d,beats:null};
    if(typeof RL_VP!=='undefined')RL_VP[R.id]=R.vp;
    if(typeof CR_EN!=='undefined'&&!CR_EN[R.id])CR_EN[R.id]=CR_EN.light;
    if(R.hero&&!RL_H[R.id]){const h=Object.assign({id:R.id},R.hero);RL_HEROES.push(h);RL_H[R.id]=h}
    RL_H[R.id].el=R.id;
  }
  const keep=new Set(RL_ROSTER.map(r=>r.id));
  for(let i=RL_HEROES.length-1;i>=0;i--)if(!keep.has(RL_HEROES[i].id))RL_HEROES.splice(i,1);
  RL_STARTERS.splice(0,RL_STARTERS.length,...RL_ROSTER.map(r=>r.id).filter(id=>RL_H[id].r<5)); RL_FREE.splice(0,RL_FREE.length); // 5★ heroes are summon-only
})();
rlElChip=function(){return''}; // no element badges anywhere

// saves made while the old free heroes were still handed out: take them out of the team and collection
(function(){const keep=new Set(RL_ROSTER.map(r=>r.id)),o=rlMigrate;rlMigrate=function(p){const q=o(p);if(!q)return q;
  if(q.heroes)for(const id in q.heroes)if(!keep.has(id))delete q.heroes[id];
  if(Array.isArray(q.team))q.team=q.team.filter(id=>keep.has(id));return q}})();
