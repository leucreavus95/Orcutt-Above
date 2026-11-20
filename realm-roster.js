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
,
  {id:'scarab',col:{c:'#e0a63a',l:'#fff1c8',d:'#5a3a10'},vp:['#ffffff','#fff1c8','#f0c062','#a8661c'],
   hero:{n:'Kheprin',r:4,role:'atk',spd:110,it:'staff',o:'armor',hg:'',lk:[4,9,1,4,1,2,1,1,3,4],ld:{s:'atk',v:15},
     ev:['Kheprin','Kheprin Dunehide','Kheprin, the Sun Scarab'],
     sk:[rlSk('Dune Slash',{m:3.7,fx:[['defBreak',1,30]]}),rlSk("Scarab's Toll",{cd:3,m:2.1,h:2,fx:[['atkBreak',1,40]]}),rlSk('Sunstorm',{cd:5,tg:'eA',m:2.5,fx:[['slow',2,50]]})]}}
,
  {id:'raven',col:{c:'#5fb4f0',l:'#e4f6ff',d:'#13304f'},vp:['#ffffff','#e4f6ff','#8fd3ff','#2a6aa8'],
   hero:{n:'Corvin',r:5,role:'atk',spd:115,it:'staff',o:'cloak',hg:'hood',lk:[4,9,1,4,1,2,1,1,3,4],ld:{s:'cr',v:15},
     ev:['Corvin','Corvin Rimequill','Corvin, the Winter Raven'],
     sk:[rlSk('Rime Cut',{m:3.9,fx:[['slow',1,40]]}),rlSk('Shardstorm',{cd:3,m:1.5,h:3,fx:[['defBreak',2,35]]}),rlSk('Whiteout',{cd:5,tg:'eA',m:2.6,fx:[['stun',1,30]]})]}}
,
  {id:'dusk',col:{c:'#d8463a',l:'#ffd2c4',d:'#3a0c10'},vp:['#ffffff','#ffe1c2','#ff8a4a','#8e1c22'],
   hero:{n:'Varek',r:4,role:'atk',spd:108,it:'staff',o:'armor',hg:'',lk:[4,9,1,4,1,2,1,1,3,4],ld:{s:'atk',v:15},
     ev:['Varek','Varek Duskblade','Varek, the Eclipse'],
     sk:[rlSk('Dusk Cleave',{m:4.0,fx:[['defBreak',1,35]]}),rlSk('Crimson Crescent',{cd:3,m:2.2,h:2,fx:[['mark',2,40]]}),rlSk('Eclipse Ring',{cd:5,tg:'eA',m:2.6,fx:[['atkBreak',2,40]]})]}}
,
  {id:'astra',col:{c:'#9b7cff',l:'#f1e4ff',d:'#22134f'},vp:['#ffffff','#f1e4ff','#b98cff','#3b2385'],
   hero:{n:'Orrin',r:4,role:'sup',spd:112,it:'staff',o:'robe',hg:'',lk:[4,9,1,4,1,2,1,1,3,4],ld:{s:'spd',v:10},
     ev:['Orrin','Orrin Starweave','Orrin, the Astral Weaver'],
     sk:[rlSk('Starbolt',{m:3.5,fx:[['atbDown',20,50]]}),rlSk('Orbit Lock',{cd:3,m:2.8,fx:[['seal',1,45]]}),rlSk('Cosmic Rift',{cd:5,tg:'eA',m:2.4,fx:[['slow',2,60],['mark',2,40]]})]}}
,
  {id:'sylva',col:{c:'#5cc489',l:'#fff4cc',d:'#123a24'},vp:['#ffffff','#fff4cc','#9ee6a0','#2f7a4a'],
   hero:{n:'Sylvara',r:4,role:'atk',spd:113,it:'staff',o:'cloak',hg:'hood',lk:[4,9,1,4,1,2,1,1,3,4],ld:{s:'cr',v:10},
     ev:['Sylvara','Sylvara Leafwing','Sylvara, the Star Archer'],
     sk:[rlSk('Swift Shot',{m:3.6,fx:[['mark',1,35]]}),rlSk('Twin Volley',{cd:3,m:1.6,h:3,fx:[['defBreak',1,30]]}),rlSk('Starfall Rain',{cd:5,tg:'eA',m:2.3,fx:[['slow',1,50]]})]}}
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
