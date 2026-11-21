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
         rlSk('Flame Flick',{cd:4,tg:'eA',m:1.7,vsBurn:.3,fx:[['burn',2,40]]})]}},
  // Thalos, the manta knight (chibi art). LEGENDARY. Master of the tide: his water lance pierces armor and
  // Soaks the target; his water blades seek out enemies and cut deeper into Soaked ones; his Deep Current
  // drags the whole enemy line back (Soaked enemies the furthest) while shielding and hastening his team.
  {id:'ray',col:{c:'#2f7fc0',l:'#d8f4ff',d:'#0a1e3a'},vp:['#ffffff','#d8f4ff','#5cc4f0','#1a4f8a'],
   hero:{n:'Thalos',r:5,role:'atk',spd:117,it:'staff',o:'armor',hg:'',lk:[4,9,1,4,1,2,1,1,3,4],ld:{s:'atk',v:20},
     ev:['Thalos','Thalos Tidecrest','Thalos, Sovereign of the Deep'],
     sk:[rlSk('Coral-Lance Thrust',{m:3.9,ign:.4,fx:[['soak',2,80]]}),
         rlSk('Water-Blade Volley',{cd:3,tg:'eA',m:1.5,bounce:3,vsSoak:.4,fx:[['strip',1]]}),
         rlSk('Deep Current',{cd:5,tg:'eA',m:2.4,undertow:true,fx:[['soak',2,60],['team','shield',12,2],['team','atb',20]]})]}},
  // Brontos, the storm hammer knight (chibi art). LEGENDARY. Charges enemies with Static: his cleave shocks
  // the target and arcs into the rest of the line, his chain-bolts seek and crackle harder on Static foes,
  // and Tempest Drive slams one enemy then discharges every Static enemy at once.
  {id:'thun',col:{c:'#2f5fd0',l:'#fff3b0',d:'#0c163a'},vp:['#ffffff','#fff3b0','#ffd23a','#2a4fbf'],
   hero:{n:'Brontos',r:5,role:'atk',spd:111,it:'staff',o:'armor',hg:'',lk:[4,9,1,4,1,2,1,1,3,4],ld:{s:'atk',v:20},
     ev:['Brontos','Brontos Stormhelm','Brontos, the Thunder Sovereign'],
     sk:[rlSk('Lightning Cleave',{m:3.8,splash:.3,fx:[['static',2,70]]}),
         rlSk('Chain-Bolt Volley',{cd:3,tg:'eA',m:1.4,bounce:4,vsStatic:.5,fx:[['static',2,40]]}),
         rlSk('Tempest Drive',{cd:5,m:4.6,discharge:1.6,fx:[['self','spdUp',2]]})]}},
  // Aster, the astral sorcerer (chibi art). LEGENDARY. Brands enemies with Sigils: his lance pierces and
  // brands the target, his sigil-bolts each brand a random enemy, and Rift Sweep detonates every Sigil
  // (bonus damage per Sigil) while his orbiting star-sphere refreshes the team's cooldowns.
  {id:'star',col:{c:'#7b5cff',l:'#ece4ff',d:'#15102e'},vp:['#ffffff','#ece4ff','#a98bff','#2a1f5a'],
   hero:{n:'Aster',r:5,role:'atk',spd:115,it:'staff',o:'robe',hg:'',lk:[4,9,1,4,1,2,1,1,3,4],ld:{s:'cd',v:20},
     ev:['Aster','Aster Voidweave','Aster, the Star Sovereign'],
     sk:[rlSk('Astral Lance',{m:3.8,ign:.3,fx:[['sigil',3,75]]}),
         rlSk('Sigil-Bolt Volley',{cd:3,tg:'eA',m:1.3,bounce:3,fx:[['sigil',3,60]]}),
         rlSk('Rift Sweep',{cd:5,tg:'eA',m:2.2,rift:.45,fx:[['team','cdDown',1]]})]}},
  // Solenne, the phoenix archer (chibi art). LEGENDARY. Fire that never quite goes out: her arrow scorches,
  // her feather volley burns the whole line, and Phoenix Rain scorches everyone; the first time she falls
  // each battle she is reborn from the ashes (Rebirth).
  {id:'phx',col:{c:'#ff6a2a',l:'#fff1c0',d:'#3a0e06'},vp:['#ffffff','#fff1c0','#ff9a2a','#c42a10'],
   hero:{n:'Solenne',r:5,role:'atk',spd:119,it:'staff',o:'armor',hg:'',lk:[4,9,1,4,1,2,1,1,3,4],ld:{s:'spd',v:15},rebirth:.4,
     ev:['Solenne','Solenne Emberwing','Solenne, the Undying Sun'],
     sk:[rlSk('Sunflare Arrow',{m:3.9,vsBurn:.4,fx:[['burn',2,60]]}),
         rlSk('Feather Volley',{cd:3,tg:'eA',m:1.6,fx:[['burn',2,50]]}),
         rlSk('Phoenix Rain',{cd:5,tg:'eA',m:2.4,vsBurn:.5,fx:[['burn',2,70],['self','healT',25]]})]}},
  // Vexis, the basilisk (chibi art). LEGENDARY. Poison: stacking damage over time (up to 5 stacks,
  // 4% max HP per stack each turn). His fang strikes and poisons, his crescents cut deeper per stack,
  // and Caustic Mireburst poisons the whole line and makes every Poison burst at once for instant damage.
  {id:'bas',col:{c:'#8bc43a',l:'#eaffb0',d:'#2a0e1a'},vp:['#ffffff','#eaffb0','#b6e83a','#4a1a2e'],
   hero:{n:'Vexis',r:5,role:'atk',spd:116,it:'staff',o:'armor',hg:'',lk:[4,9,1,4,1,2,1,1,3,4],ld:{s:'acc',v:25},
     ev:['Vexis','Vexis Venomscale','Vexis, the Plague Sovereign'],
     sk:[rlSk('Venom Fang',{m:3.6,fx:[['poison',3,85,2]]}),
         rlSk('Twin Toxin Crescents',{cd:3,m:1.7,h:2,vsPoison:.12,fx:[['poison',3,70,1]]}),
         rlSk('Caustic Mireburst',{cd:5,tg:'eA',m:1.8,pburst:1.5,fx:[['poison',3,75,2]]})]}},
  // Aurelle, the moon deer (chibi art). LEGENDARY healer. Every spell lands on her allies:
  // a moonwater stream heals and cleanses one ally, dew rains healing and Regen on the team,
  // and Sanctuary Bloom revives the fallen and wraps everyone in a shielded, Immune dome.
  {id:'deer',col:{c:'#4fc6c6',l:'#e6fbff',d:'#0e3a3e'},vp:['#ffffff','#e6fbff','#8fe6f0','#2a8a96'],
   hero:{n:'Aurelle',r:5,role:'sup',spd:112,it:'staff',o:'robe',hg:'',lk:[4,9,1,4,1,2,1,1,3,4],ld:{s:'hp',v:20},
     ev:['Aurelle','Aurelle Dewhorn','Aurelle, the Moonwell Sage'],
     sk:[rlSk('Moonwell Mend',{tg:'a1',fx:[['heal',32],['cleanse'],['shield',10,1]]}),
         rlSk('Dewfall Blessing',{cd:3,tg:'aA',fx:[['heal',18],['regen',2]]}),
         rlSk('Sanctuary Bloom',{cd:5,tg:'aA',fx:[['revive',35],['heal',12],['shield',15,2],['immune',1]]})]}},
  // Brenna, the lantern medic (chibi art). LEGENDARY healer. Kindled Aid beams light to one ally (heal + ATK Up),
  // Hearthlight Rally rings every ally (heal, cleanse, DEF Up), and Second Dawn raises one fallen ally
  // (or, if no one has fallen, fully mends and protects the chosen ally).
  {id:'med',col:{c:'#e08a3a',l:'#fff3c8',d:'#3a1a0a'},vp:['#ffffff','#fff3c8','#ffc65a','#b5501e'],
   hero:{n:'Brenna',r:5,role:'sup',spd:108,it:'staff',o:'robe',hg:'',lk:[4,9,1,4,1,2,1,1,3,4],ld:{s:'def',v:20},
     ev:['Brenna','Brenna Hearthwarden','Brenna, the Beacon-Keeper'],
     sk:[rlSk('Kindled Aid',{tg:'a1',fx:[['heal',28],['atkUp',2]]}),
         rlSk('Hearthlight Rally',{cd:3,tg:'aA',fx:[['heal',16],['cleanse'],['defUp',2]]}),
         rlSk('Second Dawn',{cd:5,tg:'a1',res:true,fx:[['rez',55],['shield',20,2],['immune',1]]})]}},
  // Kestran, the pangolin spear knight (chibi art). EPIC. Breaks armor and punishes broken armor:
  // his thrust pierces and cracks armor, his sweep pushes the line back and raises his scale guard,
  // and Spearstorm rains jade spears that hit far harder on enemies with broken armor.
  // Passive, Scale Plating: takes 20% less damage while above half HP.
  {id:'pan',col:{c:'#2f9a78',l:'#d8fff0',d:'#0e2e24'},vp:['#ffffff','#d8fff0','#5fd9b0','#1e5a46'],
   hero:{n:'Kestran',r:4,role:'def',spd:106,it:'staff',o:'armor',hg:'',lk:[4,9,1,4,1,2,1,1,3,4],ld:{s:'def',v:20},plating:.2,
     ev:['Kestran','Kestran Jadescale','Kestran, the Emerald Bulwark'],
     sk:[rlSk('Spear Thrust',{m:3.6,sc:'def',ign:.5,fx:[['defBreak',2,55]]}),
         rlSk('Winding Sweep',{cd:3,tg:'eA',m:1.9,sc:'def',fx:[['atbDown',25,60],['self','shield',18,2]]}),
         rlSk('Spearstorm',{cd:5,tg:'eA',m:2.4,sc:'def',vsBreak:.7,fx:[['defBreak',1,40]]})]}},
  // Brakk, the fiddler-crab tideguard (chibi art). EPIC tank. Clawguard bashes with his giant claw raised
  // as a shield (DEF-scaled, shields himself), Brine Snap crushes one enemy, Soaking them and sapping their
  // ATK, and Riptide Lunge surges in on a wave: a heavy hit that drags the enemy's turn back (much further
  // if Soaked) and shields the whole team.
  {id:'crab',col:{c:'#3f9a9a',l:'#dffcfc',d:'#12302e'},vp:['#ffffff','#d6fbff','#5fd0d8','#1e5a5a'],
   hero:{n:'Brakk',r:4,role:'def',spd:98,it:'staff',o:'armor',hg:'',lk:[4,9,1,4,1,2,1,1,3,4],ld:{s:'def',v:15},
     ev:['Brakk','Brakk Tideshell','Brakk, the Tideguard'],
     sk:[rlSk('Clawguard',{m:3.2,sc:'def',fx:[['self','shield',10,1]]}),
         rlSk('Brine Snap',{cd:3,m:3.8,sc:'def',fx:[['soak',2,75],['atkBreak',2,45]]}),
         rlSk('Riptide Lunge',{cd:4,m:4.4,sc:'def',undertow:true,fx:[['soak',2,70],['team','shield',12,2]]})]}},
  // Varek, the ashen chain warden (chibi art). LEGENDARY bruiser. Chainhook Strike hooks one enemy and
  // drags their turn back, Cinder Sweep whips a burning chain across every enemy (Burn), and Furnace Break
  // slams the hook down on one enemy: huge damage, more against burning foes, splash to the rest, may stun.
  {id:'chain',col:{c:'#b8442a',l:'#ffe2cc',d:'#1e1410'},vp:['#fff0d8','#ffb37a','#e2482a','#3a1410'],
   hero:{n:'Varek',r:5,role:'atk',spd:104,it:'staff',o:'armor',hg:'',lk:[4,9,1,4,1,2,1,1,3,4],ld:{s:'hp',v:15},
     ev:['Varek','Varek Ashbound','Varek, the Chain Warden'],
     sk:[rlSk('Chainhook Strike',{m:3.8,fx:[['atbDown',25,60]]}),
         rlSk('Cinder Sweep',{cd:3,tg:'eA',m:1.6,fx:[['burn',2,65]]}),
         rlSk('Furnace Break',{cd:4,m:5.0,splash:.35,vsBurn:.5,fx:[['stun',1,40]]})]}},
  // Burl, the beaver bridgewright (chibi art). COMMON. A sturdy builder: Mallet Tap whacks one enemy
  // (DEF-scaled), Timber Toss lobs a log that can stun, and Quick Barricade throws up a wooden wall that
  // shields the whole team and raises their DEF.
  {id:'beav',col:{c:'#a0683a',l:'#f3e2c4',d:'#3a2414'},vp:['#ffffff','#f3e2c4','#c08a52','#4a2e18'],
   hero:{n:'Burl',r:1,role:'def',spd:95,it:'staff',o:'armor',hg:'',lk:[4,9,1,4,1,2,1,1,3,4],ld:{s:'def',v:10},
     ev:['Burl','Burl Dambuilder','Burl, the Bridgewright'],
     sk:[rlSk('Mallet Tap',{m:3.0,sc:'def'}),
         rlSk('Timber Toss',{cd:3,m:2.2,sc:'def',fx:[['stun',1,30]]}),
         rlSk('Quick Barricade',{cd:4,tg:'aA',fx:[['shield',14,2],['defUp',2]]})]}},
  // Marla, the marsh trapper (chibi art). RARE. Hooked Jab dashes in with her boat hook, Snare Toss
  // throws her noose: the Snared enemy can't gain buffs (any that land are blocked), loses one it already
  // has, and gets rope-burned each time it acts; Bog Sweep drags a wave of bog mud through every enemy,
  // slowing them and hitting Snared enemies much harder.
  {id:'marsh',col:{c:'#7a8a4a',l:'#eef0d0',d:'#2a2a18'},vp:['#ffffff','#eef0d0','#b9b48a','#4a4a2a'],
   hero:{n:'Marla',r:3,role:'atk',spd:106,it:'staff',o:'cloak',hg:'',lk:[4,9,1,4,1,2,1,1,3,4],ld:{s:'spd',v:8},
     ev:['Marla','Marla Reedcloak','Marla, the Bog Warden'],
     sk:[rlSk('Hooked Jab',{m:3.4,fx:[['atbDown',10,40]]}),
         rlSk('Snare Toss',{cd:3,m:1.8,fx:[['strip',1],['snare',3,85]]}),
         rlSk('Bog Sweep',{cd:4,tg:'eA',m:1.5,vsSnare:.6,fx:[['slow',2,55]]})]}},
  // Corvin, the raven hex-scribe (chibi art). LEGENDARY. A curse-writer: Quillshot fires an inked quill
  // that Marks, Binding Script wraps one enemy in runes that Seal their skills and sap their ATK, and
  // Blackwing Sigils hexes every enemy with feather-sigils that Mark them and break their DEF.
  {id:'raven',col:{c:'#7a3a5a',l:'#f3e2c8',d:'#1a0e14'},vp:['#fff3dc','#e8c99a','#b9875a','#3a1a2a'],
   hero:{n:'Corvin',r:5,role:'sup',spd:112,it:'staff',o:'cloak',hg:'',lk:[4,9,1,4,1,2,1,1,3,4],ld:{s:'atk',v:15},
     ev:['Corvin','Corvin Inkfeather','Corvin, the Hex-Scribe'],
     sk:[rlSk('Quillshot',{m:3.6,fx:[['mark',2,45]]}),
         rlSk('Binding Script',{cd:3,m:2.2,fx:[['seal',2,80],['atkBreak',2,60]]}),
         rlSk('Blackwing Sigils',{cd:4,tg:'eA',m:1.7,fx:[['mark',2,70],['defBreak',2,55]]})]}},
  // Kasim, the jackal dune duelist (chibi art). EPIC. Sandshear flings a blade of sand that can Blind,
  // Twin Dune Cuts sends two sand slashes that crack DEF, and Dust Devil whips a sandstorm across every
  // enemy, Blinding them, while Kasim speeds up.
  {id:'jack',col:{c:'#d9a95a',l:'#fff1d0',d:'#2a2018'},vp:['#fff6dc','#f3d9a0','#d9a95a','#6a4a1e'],
   hero:{n:'Kasim',r:4,role:'atk',spd:118,it:'staff',o:'tunic',hg:'',lk:[4,9,1,4,1,2,1,1,3,4],ld:{s:'cr',v:15},
     ev:['Kasim','Kasim Dune Blade','Kasim, the Dune Duelist'],
     sk:[rlSk('Sandshear',{m:3.6,fx:[['blind',1,35]]}),
         rlSk('Twin Dune Cuts',{cd:3,m:1.9,h:2,fx:[['defBreak',2,50]]}),
         rlSk('Dust Devil',{cd:4,tg:'eA',m:1.6,fx:[['blind',2,60],['self','spdUp',2]]})]}},
  // Bram, the boar shieldbearer (chibi art). COMMON tank. Tusker Bash shoves one enemy with his shield
  // (DEF-scaled, may stun), Shield Brace digs in for a shield and DEF Up, and Hold the Line plants his
  // shield and taunts every enemy for 2 turns while he takes less damage.
  {id:'boar',col:{c:'#a0703f',l:'#f3e2c4',d:'#3a2414'},vp:['#ffffff','#f3e2c4','#c9a26a','#5a3a1e'],
   hero:{n:'Bram',r:1,role:'def',spd:92,it:'staff',o:'armor',hg:'',lk:[4,9,1,4,1,2,1,1,3,4],ld:{s:'def',v:10},
     ev:['Bram','Bram Tusker','Bram, the Shieldwall'],
     sk:[rlSk('Tusker Bash',{m:3.0,sc:'def',fx:[['stun',1,15]]}),
         rlSk('Shield Brace',{cd:3,tg:'self',fx:[['shield',20,2],['defUp',2]]}),
         rlSk('Hold the Line',{cd:4,tg:'eA',m:.8,sc:'def',fx:[['taunt',2,75],['self','bulwark',2]]})]}},
  // Sage, the village herbalist (chibi art). COMMON healer. Quick Remedy mends one ally, Herbal Poultice
  // patches one ally up and draws out their debuffs, and Renewing Draught heals the whole team over time.
  {id:'herb',col:{c:'#8fb85a',l:'#f4ffd6',d:'#2e3a1c'},vp:['#ffffff','#f4ffd6','#b8e07a','#5a7a2a'],
   hero:{n:'Sage',r:1,role:'sup',spd:100,it:'staff',o:'tunic',hg:'',lk:[4,9,1,4,1,2,1,1,3,4],ld:{s:'hp',v:10},
     ev:['Sage','Sage Herbwise','Sage, the Village Healer'],
     sk:[rlSk('Quick Remedy',{tg:'a1',fx:[['heal',22]]}),
         rlSk('Herbal Poultice',{cd:3,tg:'a1',fx:[['heal',18],['cleanse'],['regen',2]]}),
         rlSk('Renewing Draught',{cd:4,tg:'aA',fx:[['heal',12],['regen',2]]})]}},
  // Voltan, the lynx striker (chibi art). LEGENDARY. A lightning brawler built on Static: Thunderclap Fist
  // charges one enemy with Static, Chain Arc jumps between enemies and hits charged ones harder, and
  // Stormstep blitzes one enemy, discharging all their Static, then leaves him fast and ready to go again.
  {id:'lynx',col:{c:'#4fb4ff',l:'#dff4ff',d:'#14204a'},vp:['#ffffff','#d6f6ff','#4fd0ff','#1a4a8a'],
   hero:{n:'Voltan',r:5,role:'atk',spd:124,it:'staff',o:'tunic',hg:'',lk:[4,9,1,4,1,2,1,1,3,4],ld:{s:'spd',v:15},
     ev:['Voltan','Voltan Sparkpaw','Voltan, the Thunder Striker'],
     sk:[rlSk('Thunderclap Fist',{m:3.7,fx:[['static',2,75]]}),
         rlSk('Chain Arc',{cd:3,tg:'eA',m:1.4,bounce:4,vsStatic:.5,fx:[['static',2,45]]}),
         rlSk('Stormstep',{cd:4,m:4.4,discharge:1.6,fx:[['self','spdUp',2],['self','atb',40]]})]}},
  // Thorne, the stag shaman (chibi art). LEGENDARY support. Spirit Bolt strikes one enemy and mends the
  // team a little; Totem Ward raises a spirit totem over every ally that clears their debuffs and blocks
  // any new ones for 2 turns; Ancestral Tempest sweeps all enemies and delays their turns.
  {id:'stag',col:{c:'#3fbf9a',l:'#dcfff2',d:'#1d3a2a'},vp:['#ffffff','#d8fff2','#5fe0c0','#2d5a3a'],
   hero:{n:'Thorne',r:5,role:'sup',spd:107,it:'staff',o:'cloak',hg:'',lk:[4,9,1,4,1,2,1,1,3,4],ld:{s:'hp',v:20},
     ev:['Thorne','Thorne Antlerwood','Thorne, the Ancestral Shaman'],
     sk:[rlSk('Spirit Bolt',{m:3.5,fx:[['team','healT',5]]}),
         rlSk('Totem Ward',{cd:4,tg:'aA',fx:[['cleanse'],['immune',2],['shield',10,2]]}),
         rlSk('Ancestral Tempest',{cd:4,tg:'eA',m:1.9,fx:[['atbDown',30,70],['atkBreak',2,45]]})]}},
  // Kael, the frost-owl cryomancer (chibi art). LEGENDARY. A control mage: Glacial Talon hurls a frost
  // slash that Chills, Shardstorm pelts one enemy with ice shards (harder per Chill), and
  // Permafrost Ring freezes every enemy solid for 2 turns.
  {id:'frowl',col:{c:'#5aa8e8',l:'#e2f3ff',d:'#14243f'},vp:['#ffffff','#dff3ff','#8fcaf5','#2f5f9e'],
   hero:{n:'Kael',r:5,role:'sup',spd:110,it:'staff',o:'cloak',hg:'',lk:[4,9,1,4,1,2,1,1,3,4],ld:{s:'res',v:25},
     ev:['Kael','Kael Frostplume','Kael, the Permafrost Sage'],
     sk:[rlSk('Glacial Talon',{m:3.6,fx:[['chill',3,65]]}),
         rlSk('Shardstorm',{cd:3,m:1.25,h:3,vsChill:.25,fx:[['chill',3,45]]}),
         rlSk('Permafrost Ring',{cd:5,tg:'eA',m:1.3,fx:[['freeze',2,100]]})]}},
  // Ignis, the kiln-born salamander arcanist (chibi art). LEGENDARY. A fire mage built around Burn:
  // Cinder Bolt scorches one enemy, Scorching Arc sweeps the line and hits burning enemies harder,
  // and Ignition Burst sets every enemy ablaze with 2 stacks of Burn (fire damage each turn for 3 turns).
  {id:'sal',col:{c:'#ff6a2a',l:'#ffe6c8',d:'#4a120a'},vp:['#fff6d0','#ffd27a','#ff8a2a','#c2280f'],
   hero:{n:'Ignis',r:5,role:'atk',spd:108,it:'staff',o:'cloak',hg:'',lk:[4,9,1,4,1,2,1,1,3,4],ld:{s:'atk',v:20},
     ev:['Ignis','Ignis Kilnborn','Ignis, the Kiln-Born Arcanist'],
     sk:[rlSk('Cinder Bolt',{m:3.8,fx:[['burn',2,50]]}),
         rlSk('Scorching Arc',{cd:3,tg:'eA',m:1.7,vsBurn:.4,fx:[['defBreak',1,35]]}),
         rlSk('Ignition Burst',{cd:4,tg:'eA',m:1.5,fx:[['burn',3,90],['burn',3,65]]})]}},
  // Origa, the origami crane lancer (chibi art). Epic. A quick paper spearman: Fold Dash strikes and
  // refolds him to act sooner, Feather Piercer fires paper shards that pierce armor and crack DEF,
  // and Paper Storm whirls razor paper through the enemy line, Blinding and slowing their turns.
  {id:'crane',col:{c:'#d8453a',l:'#fbefe6',d:'#4a1512'},vp:['#ffffff','#fbefe6','#d8453a','#7a1f1a'],
   hero:{n:'Origa',r:4,role:'atk',spd:116,it:'staff',o:'tunic',hg:'',lk:[4,9,1,4,1,2,1,1,3,4],ld:{s:'spd',v:12},
     ev:['Origa','Origa Foldwing','Origa, the Thousand-Fold Lancer'],
     sk:[rlSk('Fold Dash',{m:3.5,fx:[['self','atb',20]]}),
         rlSk('Feather Piercer',{cd:3,m:1.25,h:3,ign:.3,fx:[['defBreak',1,40]]}),
         rlSk('Paper Storm',{cd:4,tg:'eA',m:1.7,fx:[['blind',2,45],['atbDown',20,50]]})]}},
  // Garrow, the jade-shelled tortoise drake (chibi art). LEGENDARY tank. His shield bash can stun, Jade Ward
  // wraps the whole team in a jade dome, and Taunt-Roar forces enemies to aim their attacks at him for 2 turns.
  {id:'tort',col:{c:'#3fae8a',l:'#dcfbee',d:'#123b30'},vp:['#ffffff','#d9fff0','#5fd9b0','#c99a3d'],
   hero:{n:'Garrow',r:5,role:'def',spd:94,it:'staff',o:'armor',hg:'',lk:[4,9,1,4,1,2,1,1,3,4],ld:{s:'hp',v:20},
     ev:['Garrow','Garrow Jadeshell','Garrow, the Living Bastion'],
     sk:[rlSk('Shield Bash',{m:3.4,sc:'def',fx:[['stun',1,25]]}),
         rlSk('Jade Ward',{cd:4,tg:'aA',fx:[['shield',18,2],['defUp',2]]}),
         rlSk('Taunt-Roar',{cd:4,tg:'eA',m:1.1,sc:'def',fx:[['taunt',2,100],['self','bulwark',2]]})]}},
  // Sable, the hooded wraith (chibi art). LEGENDARY. An assassin with twin sickles who slips out of reach:
  // Quickstep Cut finishes off weakened enemies, Twin Crescent hurls two blade waves that Mark the target,
  // and Veilstep Attack strikes, then phases him into the Veil for 2 turns, where nothing can target him.
  // Passive, Shadowstrike: every hit he lands while Veiled is a critical hit.
  {id:'sab',col:{c:'#9a4a86',l:'#f1dcec',d:'#2a1024'},vp:['#ffffff','#ecdcf4','#b07ac0','#4a1f45'],
   hero:{n:'Sable',r:5,role:'atk',spd:121,it:'staff',o:'cloak',hg:'',lk:[4,9,1,4,1,2,1,1,3,4],ld:{s:'cr',v:20},ambush:true,
     ev:['Sable','Sable Duskveil','Sable, the Hollow Wraith'],
     sk:[rlSk('Quickstep Cut',{m:3.7,exec:.4}),
         rlSk('Twin Crescent',{cd:3,m:1.9,h:2,fx:[['mark',2,60]]}),
         rlSk('Veilstep Attack',{cd:5,m:3.3,fx:[['self','veil',2]]})]}}
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
