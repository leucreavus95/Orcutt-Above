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
         rlSk('Flame Ward',{cd:4,tg:'aA',fx:[['shield',15,2],['ward',2]]})]}}
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
