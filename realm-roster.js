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
         rlSk('Earthen Bulwark',{cd:4,tg:'aA',fx:[['bulwark',2],['self','defUp',2]]})]}},
  // Nyx, the moth (chibi art). Epic. An assassin: her dash finishes off weakened enemies and,
  // if it lands the final blow, she moves again; her wing-blades Mark targets; her night crescent Seals skills.
  {id:'moth',col:{c:'#8f6bff',l:'#ece4ff',d:'#1f1440'},vp:['#ffffff','#e6dcff','#a98bff','#3b2385'],
   hero:{n:'Nyx',r:4,role:'atk',spd:118,it:'staff',o:'cloak',hg:'',lk:[4,9,1,4,1,2,1,1,3,4],ld:{s:'cr',v:15},
     ev:['Nyx','Nyx Duskwing','Nyx, the Moonveil'],
     sk:[rlSk('Dusk Dash',{m:3.3,exec:.5,again:true}),
         rlSk('Wingblade Volley',{cd:3,m:1.2,h:3,fx:[['mark',2,45]]}),
         rlSk('Nightfall Burst',{cd:4,tg:'eA',m:2.1,fx:[['seal',1,35]]})]}},
  // Fern, the grove sprite (chibi art). Rare. The healer: roots pin an enemy in place, seeds planted
  // on every enemy drain them to heal Fern's team, and the bloom heals, cleanses and regrows the team.
  {id:'tree',col:{c:'#8cc63f',l:'#f0fad8',d:'#24401a'},vp:['#ffffff','#f4ffd0','#a8dc5a','#3d6e1e'],
   hero:{n:'Fern',r:3,role:'sup',spd:106,it:'staff',o:'tunic',hg:'',lk:[4,9,1,4,1,2,1,1,3,4],ld:{s:'hp',v:15},
     ev:['Fern','Fern Oakheart','Fern, the Grove Warden'],
     sk:[rlSk('Root Snare',{m:3.2,fx:[['stun',1,30]]}),
         rlSk('Seedburst',{cd:3,tg:'eA',m:1.4,fx:[['seed',2,60]]}),
         rlSk('Rejuvenation Bloom',{cd:4,tg:'aA',fx:[['healT',22],['cleanse'],['regen',2]]})]}},
  // Tink, the clockwork beetle (chibi art). Epic. A gear-slinger: his shot cracks armor, his volley
  // ricochets between random enemies, and his cogblast jams the whole line's turns.
  {id:'bug',col:{c:'#c97a3a',l:'#d6fff2',d:'#1c1410'},vp:['#ffffff','#d6fff2','#5fe0c0','#8a4a1e'],
   hero:{n:'Tink',r:4,role:'atk',spd:102,it:'staff',o:'tunic',hg:'',lk:[4,9,1,4,1,2,1,1,3,4],ld:{s:'acc',v:20},
     ev:['Tink','Tink Cogwright','Tink, the Brass Colossus'],
     sk:[rlSk('Gear-Shot',{m:3.5,ign:.25,fx:[['defBreak',1,30]]}),
         rlSk('Ricochet Volley',{cd:3,tg:'eA',m:1.3,bounce:4}),
         rlSk('Cogblast',{cd:4,tg:'eA',m:2.0,fx:[['atbDown',30,60],['stun',1,20]]})]}},
  // Chime, the porcelain bell-keeper (chibi art). Epic. A controller: the soundwave Dazes, the shards
  // shatter harder on dazed enemies, and the resonance burst stuns every dazed enemy and speeds up the team.
  {id:'bell',col:{c:'#4fb8c0',l:'#e0fcff',d:'#123c40'},vp:['#ffffff','#e0fcff','#7fe3ef','#1f6f78'],
   hero:{n:'Chime',r:4,role:'sup',spd:116,it:'staff',o:'robe',hg:'',lk:[4,9,1,4,1,2,1,1,3,4],ld:{s:'res',v:20},
     ev:['Chime','Chime Stillbell','Chime, the Resonant Sage'],
     sk:[rlSk('Soundwave',{m:3.2,fx:[['daze',2,60]]}),
         rlSk('Ringing Shards',{cd:3,m:1.3,h:3,vsDaze:.6,fx:[['atkBreak',1,35]]}),
         rlSk('Resonance Burst',{cd:4,tg:'eA',m:1.8,ring:true,fx:[['daze',2,50],['team','spdUp',2]]})]}},
  // Arlo, the frost knight (chibi art). Epic. Builds Chill: 3 Chill freezes an enemy solid (skips a turn).
  // His cleave chills, his lances hit harder per Chill, and his rune ward shields the team and chills attackers.
  {id:'ice',col:{c:'#5aa8f0',l:'#e2f2ff',d:'#13284a'},vp:['#ffffff','#e2f2ff','#7cc4ff','#1f4f9a'],
   hero:{n:'Arlo',r:4,role:'atk',spd:108,it:'staff',o:'armor',hg:'',lk:[4,9,1,4,1,2,1,1,3,4],ld:{s:'def',v:15},
     ev:['Arlo','Arlo Frostguard','Arlo, the Glacier Knight'],
     sk:[rlSk('Frost Cleave',{m:3.6,fx:[['chill',3,70]]}),
         rlSk('Ice-Lance Burst',{cd:3,m:1.25,h:3,vsChill:.2,fx:[['chill',3,50]]}),
         rlSk('Rune Ward',{cd:4,tg:'aA',fx:[['shield',16,2],['defUp',2],['rime',2]]})]}},
  // Rio, the drummer duelist (chibi art). Epic. Builds Tempo: every skill he uses adds a beat (max 3),
  // and each beat makes his attacks hit harder. His lunge strikes twice on the beat, his notes set the team's
  // rhythm, and his burst spends the Tempo for a crescendo across the whole line.
  {id:'drum',col:{c:'#c0304a',l:'#ffe2e6',d:'#3a0c18'},vp:['#ffffff','#ffe2e6','#ff8fa3','#8e1c3a'],
   hero:{n:'Rio',r:4,role:'atk',spd:120,it:'staff',o:'coat',hg:'',lk:[4,9,1,4,1,2,1,1,3,4],ld:{s:'spd',v:12},
     ev:['Rio','Rio Quickstep','Rio, the Grand Maestro'],
     sk:[rlSk('Rapid Lunge',{m:1.9,h:2,tempo:1}),
         rlSk('Sonic Note Volley',{cd:3,m:1.2,h:3,tempo:1,fx:[['atbDown',15,60],['team','atb',15]]}),
         rlSk('Rhythm Burst',{cd:4,tg:'eA',m:1.6,crescendo:.35,fx:[['stun',1,15]]})]}},
  // Wren, the ranger (chibi art). Rare. A marksman: her charged arrow is a sure critical on Marked foes,
  // her triple-shot fans across three random enemies and Marks them, her arrow rain pins the whole line.
  {id:'bow',col:{c:'#4f8a5a',l:'#fff1c8',d:'#1a2e20'},vp:['#ffffff','#fff1c8','#f0b050','#3f6a4a'],
   hero:{n:'Wren',r:3,role:'atk',spd:110,it:'staff',o:'cloak',hg:'hood',lk:[4,9,1,4,1,2,1,1,3,4],ld:{s:'cr',v:12},
     ev:['Wren','Wren Swiftfeather','Wren, the Greenwood Ranger'],
     sk:[rlSk('Charged Arrow',{m:3.8,critMark:true}),
         rlSk('Triple-Shot',{cd:3,tg:'eA',m:1.5,bounce:3,fx:[['mark',2,50]]}),
         rlSk('Arrow Rain',{cd:4,tg:'eA',m:1.8,fx:[['slow',2,50],['defBreak',1,25]]})]}},
  // Milo, the spear farmhand (chibi art). Common. A vanguard: his thrust pierces armor, his sweep keeps the
  // line at bay, and his Skycharge hits hardest as an opening strike on an unhurt enemy.
  {id:'lance',col:{c:'#6f9a5a',l:'#eef2e6',d:'#22301a'},vp:['#ffffff','#eef2e6','#b8c4a8','#4a5a3a'],
   hero:{n:'Milo',r:1,role:'atk',spd:112,it:'staff',o:'tunic',hg:'',lk:[4,9,1,4,1,2,1,1,3,4],ld:{s:'spd',v:10},
     ev:['Milo','Milo Brightspear','Milo, the Skylance'],
     sk:[rlSk('Spear Thrust',{m:3.5,ign:.4}),
         rlSk('Winding Sweep',{cd:3,tg:'eA',m:1.8,fx:[['atbDown',25,60]]}),
         rlSk('Skycharge',{cd:4,m:4.2,opener:.6,fx:[['self','spdUp',2]]})]}},
  // Pip, the mushroom scout (chibi art). Uncommon. A pest: pebbles that sting, spores that make enemies
  // Drowsy (sometimes nodding off and losing a turn), and a spore cloud that blankets the whole line.
  {id:'shroom',col:{c:'#c8442c',l:'#f6ead2',d:'#3a1a10'},vp:['#ffffff','#f6ead2','#d9b98a','#8a5a30'],
   hero:{n:'Pip',r:2,role:'sup',spd:108,it:'staff',o:'tunic',hg:'',lk:[4,9,1,4,1,2,1,1,3,4],ld:{s:'hp',v:10},
     ev:['Pip','Pip Capwise','Pip, the Sporeguard'],
     sk:[rlSk('Pebble Flick',{m:3.2,fx:[['atkBreak',1,25]]}),
         rlSk('Spore Puff',{cd:3,m:2.4,fx:[['drowsy',2,70]]}),
         rlSk('Spore Burst',{cd:4,tg:'eA',m:1.5,fx:[['drowsy',2,45],['team','healT',8]]})]}},
  // Digby, the mole digger (chibi art). Uncommon. A tunneler: his shovel cracks armor, a dirt clod to the
  // face Blinds (attacks may miss), and he burrows under an enemy to burst up beneath them.
  {id:'mole',col:{c:'#e0a13a',l:'#fff1d6',d:'#3a2614'},vp:['#fff1d6','#e0b07a','#9a6a3a','#4a2e18'],
   hero:{n:'Digby',r:2,role:'def',spd:100,it:'staff',o:'tunic',hg:'',lk:[4,9,1,4,1,2,1,1,3,4],ld:{s:'def',v:10},
     ev:['Digby','Digby Deepdelve','Digby, the Tunnel Captain'],
     sk:[rlSk('Shovel Jab',{m:3.3,sc:'def',fx:[['defBreak',1,30]]}),
         rlSk('Dirt-Clod Toss',{cd:3,m:2.4,sc:'def',fx:[['blind',2,70]]}),
         rlSk('Burrow Burst',{cd:4,m:3.6,sc:'def',ign:.5,fx:[['stun',1,35],['self','defUp',2]]})]}},
  // Wick, the candle sprite (chibi art). Rare. Wax then fire: his wax glob coats an enemy in Wax (slowed),
  // his ember spit sets it ablaze (twice over on waxed targets), and his flame flick burns the whole line.
  {id:'wick',col:{c:'#ff9a3d',l:'#fff0c8',d:'#4a2410'},vp:['#ffffff','#fff0c8','#ffa040','#c84a18'],
   hero:{n:'Wick',r:3,role:'atk',spd:106,it:'staff',o:'tunic',hg:'',lk:[4,9,1,4,1,2,1,1,3,4],ld:{s:'atk',v:12},
     ev:['Wick','Wick Brasscap','Wick, the Everflame'],
     sk:[rlSk('Wax Glob',{m:3.2,fx:[['slow',2,60]]}),
         rlSk('Ember Spit',{cd:3,m:2.8,waxBurn:true,fx:[['burn',2,70]]}),
         rlSk('Flame Flick',{cd:4,tg:'eA',m:1.7,vsBurn:.3,fx:[['burn',2,40]]})]}}
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
