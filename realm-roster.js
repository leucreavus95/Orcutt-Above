"use strict";
/* ================================================================
   REALM ROSTER: the Realm uses only heroes with painted art, and no
   elements. Each hero has a signature colour of their own instead.
   To add a hero: add their art in realm-images.js, then list them here.
   ================================================================ */
const RL_ROSTER=[
  {id:'halo',col:{c:'#b49bff',l:'#ece4ff',d:'#3b2685'},vp:['#ffffff','#ece4ff','#b49bff','#5a2fd6']},
  {id:'kael',col:{c:'#3fc1a6',l:'#c8f7ec',d:'#0f4a44'},vp:['#ffffff','#dffff5','#8ef0d0','#2a9d8a'],
   hero:{n:'Kael',r:4,role:'sup',spd:114,it:'orb',o:'cloak',hg:'',lk:[1,1,11,1,0,3,3,3,0,0],ld:{s:'spd',v:10},
     ev:['Kael','Kael Meridian','Meridian, Storm Cartographer'],
     sk:[rlSk('Compass Bolt',{m:3.4,fx:[['atbDown',15,50]]}),rlSk('Chart the Winds',{cd:4,tg:'aA',fx:[['spdUp',2],['atb',25]]}),rlSk('Starfall Atlas',{cd:5,tg:'eA',m:2.3,fx:[['slow',2,70],['atbDown',35,70]]})]}}
,
  {id:'thornwick',col:{c:'#79c94a',l:'#dcf5c2',d:'#1f4d1c'},vp:['#ffffff','#e3ffc9','#9ee35f','#3f7a23'],
   hero:{n:'Thornwick',r:5,role:'def',spd:96,it:'shield',o:'armor',hg:'helm',lk:[4,9,1,4,1,2,1,1,3,4],ld:{s:'def',v:15},
     ev:['Thornwick','Thornwick Wardbark','Elderhart, the Antlered Warden'],
     sk:[rlSk('Thornroot',{m:3.8,sc:'def',fx:[['slow',1,35]]}),rlSk('Barkward',{cd:4,tg:'aA',fx:[['shield',20,2],['defUp',2]]}),rlSk('Wildbloom',{cd:5,tg:'eA',m:2.3,sc:'def',fx:[['stun',1,25]]})]}}
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
  RL_STARTERS.splice(0,RL_STARTERS.length,...RL_ROSTER.map(r=>r.id).filter(id=>RL_H[id].r<5)); // 5★ heroes are summon-onlyRL_FREE.splice(0,RL_FREE.length);
})();
rlElChip=function(){return''}; // no element badges anywhere
