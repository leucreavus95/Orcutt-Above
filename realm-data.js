"use strict";
/* ================================================================
   REALM DATA. Everything here is plain data, so heroes, monsters,
   map nodes, quests and gear sets can be added or edited in one place.
   ================================================================ */

/* ---------- elements: fire > wind > water > fire, light <> dark ---------- */
const RL_EL={
  fire:{n:'Fire',c:'#ff6a3d',d:'#7a1f0c',l:'#ffb36b',beats:'wind'},
  water:{n:'Water',c:'#3da5ff',d:'#0c3a7a',l:'#9fd6ff',beats:'fire'},
  wind:{n:'Wind',c:'#4fd17a',d:'#0f5a2a',l:'#b5f5c4',beats:'water'},
  light:{n:'Light',c:'#ffd96a',d:'#8a6a00',l:'#fff6c9',beats:'dark'},
  dark:{n:'Dark',c:'#a46bff',d:'#2e0f66',l:'#d9c2ff',beats:'light'}
};
const RL_ELS=['fire','water','wind','light','dark'];
const RL_ROLE={atk:'Attack',def:'Defense',sup:'Support',hp:'Vitality'};

/* ---------- stats ---------- */
const RL_STAT={
  hp:{n:'HP'},atk:{n:'ATK'},def:{n:'DEF'},spd:{n:'SPD'},
  cr:{n:'Crit Rate',p:1},cd:{n:'Crit Dmg',p:1},acc:{n:'Accuracy',p:1},res:{n:'Resist',p:1},
  hpP:{n:'HP',p:1},atkP:{n:'ATK',p:1},defP:{n:'DEF',p:1}
};

/* ---------- status effects ---------- */
const RL_FX={
  atkUp:{n:'ATK Up',buff:1,c:'#ff8a3d',g:'A↑',d:'+50% ATK'},
  defUp:{n:'DEF Up',buff:1,c:'#3da5ff',g:'D↑',d:'+50% DEF'},
  spdUp:{n:'SPD Up',buff:1,c:'#4fd17a',g:'S↑',d:'+30% SPD'},
  critUp:{n:'Crit Up',buff:1,c:'#ffd96a',g:'C↑',d:'+30% Crit Rate'},
  shield:{n:'Shield',buff:1,c:'#9fd6ff',g:'◈',d:'Absorbs damage'},
  immune:{n:'Immunity',buff:1,c:'#fff6c9',g:'✦',d:'Blocks harmful effects'},
  regen:{n:'Regen',buff:1,c:'#38d39f',g:'✚',d:'Heals 12% HP each turn'},
  defBreak:{n:'DEF Break',c:'#ff4d6d',g:'D↓',d:'-50% DEF'},
  atkBreak:{n:'ATK Break',c:'#ff4d6d',g:'A↓',d:'-40% ATK'},
  slow:{n:'Slow',c:'#8a9bb5',g:'S↓',d:'-30% SPD'},
  stun:{n:'Stun',c:'#ffd60a',g:'✶',d:'Skips its next turn'},
  burn:{n:'Burn',c:'#ff6a3d',g:'≈',d:'Takes 6% max HP each turn'},
  seal:{n:'Seal',c:'#a46bff',g:'⊘',d:'Can only use its first skill'},
  mark:{n:'Mark',c:'#ff7eb6',g:'◎',d:'Takes 25% more damage'},
  poison:{n:'Poison',c:'#8bc43a',g:'☠',d:'Stacks up to 5: loses 4% max HP per stack each turn'},
  sigil:{n:'Sigil',c:'#a98bff',g:'✧',d:'Stacks up to 3: Aster\'s Rift Sweep detonates every Sigil for bonus damage'},
  static:{n:'Static',c:'#ffd23a',g:'ϟ',d:'Charged: Brontos\'s bolts crackle harder, and Tempest Drive discharges it for big damage'},
  soak:{n:'Soaked',c:'#5cc4f0',g:'≋',d:'Drenched: Thalos\'s blades cut deeper and his Deep Current drags it further back'},
  blind:{n:'Blinded',c:'#9a6a3a',g:'◌',d:'Dirt in the eyes: its attacks have a 40% chance to miss'},
  drowsy:{n:'Drowsy',c:'#d9b98a',g:'z',d:'35% chance to doze off and lose its turn'},
  chill:{n:'Chill',c:'#7cc4ff',g:'❄',d:'Stacks up to 3: at 3 Chill it freezes solid and skips a turn'},
  rime:{n:'Rune Ward',buff:1,c:'#7cc4ff',g:'❖',d:'Enemies that hit it get Chilled'},
  daze:{n:'Dazed',c:'#7fe3ef',g:'♪',d:'Ringing ears: Chime\'s shards hit harder, and her Resonance Burst stuns it'},
  seed:{n:'Seeded',c:'#a8dc5a',g:'❦',d:'Loses 5% HP each turn; the healing goes to the enemy team'},
  bulwark:{n:'Bulwark',buff:1,c:'#d98a4a',g:'▣',d:'Takes 25% less damage from hits'},
  guard:{n:'Guarded',buff:1,c:'#6fe0f5',g:'⛨',d:'A guardian takes 30% of the damage for it'},
  ward:{n:'Flame Ward',buff:1,c:'#ff9a3d',g:'♨',d:'Enemies that hit it may catch fire'},
  taunt:{n:'Taunted',c:'#e0a83a',g:'⚑',d:'Must aim its single-target attacks at the one who taunted it'},
  veil:{n:'Veiled',buff:1,c:'#b9a3e0',g:'◐',d:'Phased out: enemies can\'t target or hit it'}
};

/* ---------- heroes ----------
   lk = look: [skin, hair, hairColor, expression, faceShape, eyeShape, eyeColor, brows, nose, details]
   o = outfit, hg = headgear, it = held item. Skills: tg target (e1 one enemy, eA all enemies,
   a1 one ally, aA all allies, self), m multiplier, h hits, sc stat the damage scales from,
   fx effects [name, turns or %, chance %]. A fx starting with 'self' or 'team' applies to the user's side. */
const rlSk=(n,o)=>Object.assign({n,cd:0,tg:'e1',m:0,h:1,sc:'atk',fx:[]},o);
const RL_HEROES=[
 // FIRE
 {id:'ember',n:'Ember',el:'fire',r:3,role:'atk',spd:101,it:'staff',o:'cloak',hg:'',lk:[3,1,2,1,2,0,0,0,1,1],
  sk:[rlSk('Spark Bolt',{m:3.5,fx:[['burn',2,25]]}),rlSk('Kindle Burst',{cd:3,m:2.2,h:2,fx:[['defBreak',2,40]]}),rlSk('Flare',{cd:4,tg:'eA',m:1.8,fx:[['burn',1,30]]})]},
 {id:'cinder',n:'Cinder Page',el:'fire',r:3,role:'sup',spd:103,it:'book',o:'robe',hg:'circlet',lk:[6,8,0,0,0,3,0,0,0,0],
  sk:[rlSk('Ash Flick',{m:3.2,fx:[['atkBreak',1,25]]}),rlSk('Warm Glow',{cd:3,tg:'aA',fx:[['heal',15]]}),rlSk('Rally Flame',{cd:4,tg:'aA',fx:[['atkUp',2]]})]},
 {id:'brandt',n:'Brandt',el:'fire',r:3,role:'def',spd:96,it:'shield',o:'armor',hg:'helm',lk:[4,9,1,4,1,2,1,1,3,4],
  sk:[rlSk('Shield Bash',{m:3.6,sc:'def',fx:[['stun',1,15]]}),rlSk('Hold the Line',{cd:4,tg:'aA',fx:[['defUp',2]]}),rlSk('Ember Wall',{cd:5,tg:'aA',fx:[['shield',12,2]]})]},
 {id:'ashling',n:'Ashling',el:'fire',r:3,role:'hp',spd:98,it:'lantern',o:'tunic',hg:'',lk:[1,11,9,1,4,1,3,2,0,1],
  sk:[rlSk('Lantern Swing',{m:.16,sc:'hp'}),rlSk('Hearth Light',{cd:3,tg:'a1',fx:[['healT',30],['cleanse']]}),rlSk('Glow Ward',{cd:4,tg:'aA',fx:[['regen',2]]})]},
 {id:'pyra',n:'Pyra Vale',el:'fire',r:4,role:'atk',spd:104,it:'orb',o:'coat',hg:'feather',lk:[2,4,4,2,2,3,2,3,1,0],ld:{s:'atk',v:15},
  sk:[rlSk('Searflare',{m:3.7,fx:[['burn',2,40]]}),rlSk('Firestorm',{cd:4,tg:'eA',m:2.6,fx:[['burn',2,50]]}),rlSk('Inferno Script',{cd:5,m:6.2,ign:.3,vsBurn:.5})]},
 {id:'solenne',n:'Solenne',el:'fire',r:4,role:'sup',spd:110,it:'banner',o:'robe',hg:'tiara',lk:[5,4,3,1,0,0,2,3,2,0],ld:{s:'spd',v:10},
  sk:[rlSk('Sunlit Spark',{m:3.2,fx:[['slow',1,30]]}),rlSk('War Anthem',{cd:4,tg:'aA',fx:[['atkUp',2],['atb',20]]}),rlSk('Phoenix Vow',{cd:5,tg:'aA',fx:[['healT',25],['immune',1]]})]},
 {id:'ignatius',n:'Ignatius',el:'fire',r:5,role:'atk',spd:106,it:'quill',o:'coat',hg:'',lk:[7,12,0,4,1,0,1,1,3,0],ld:{s:'atk',v:20},
  sk:[rlSk('Searing Quill',{m:3.9,fx:[['burn',2,50]]}),rlSk('Combustion',{cd:3,tg:'eA',m:2.4,fx:[['burn',2,60],['defBreak',2,40]]}),rlSk('Supernova Thesis',{cd:5,m:7.4,ign:.5,fx:[['self','atb',30]]})]},
 // WATER
 {id:'ripple',n:'Ripple',el:'water',r:3,role:'atk',spd:102,it:'orb',o:'cloak',hg:'',lk:[2,0,1,0,0,0,4,0,0,0],
  sk:[rlSk('Splash',{m:3.5,fx:[['slow',1,25]]}),rlSk('Undertow',{cd:3,m:2.1,h:2,fx:[['atbDown',25,60]]}),rlSk('Torrent',{cd:4,tg:'eA',m:1.8})]},
 {id:'marin',n:'Marin',el:'water',r:3,role:'hp',spd:97,it:'lute',o:'tunic',hg:'',lk:[8,13,0,1,4,1,1,0,2,0],
  sk:[rlSk('Tide Strum',{m:.15,sc:'hp'}),rlSk('Soothing Song',{cd:3,tg:'aA',fx:[['heal',14]]}),rlSk('Sea Breeze',{cd:4,tg:'aA',fx:[['cleanse'],['regen',1]]})]},
 {id:'coral',n:'Coral Knight',el:'water',r:3,role:'def',spd:95,it:'shield',o:'armor',hg:'helm',lk:[3,0,5,4,1,4,4,4,1,0],
  sk:[rlSk('Reef Strike',{m:3.5,sc:'def',fx:[['defBreak',1,25]]}),rlSk('Barnacle Guard',{cd:4,tg:'aA',fx:[['defUp',2]]}),rlSk('Coral Bulwark',{cd:5,tg:'self',fx:[['shield',30,2],['immune',2]]})]},
 {id:'tide',n:'Tide Lyric',el:'water',r:4,role:'sup',spd:108,it:'book',o:'robe',hg:'circlet',lk:[0,11,10,1,0,3,4,2,0,3],ld:{s:'hp',v:15},
  sk:[rlSk('Wave Verse',{m:3.3,fx:[['atkBreak',1,35]]}),rlSk('Healing Tide',{cd:3,tg:'aA',fx:[['heal',22],['cleanse']]}),rlSk('Tidal Ward',{cd:5,tg:'aA',fx:[['shield',18,2]]})]},
 {id:'frostine',n:'Frostine',el:'water',r:4,role:'atk',spd:105,it:'staff',o:'cloak',hg:'hood',lk:[0,4,5,5,2,3,4,4,0,0],ld:{s:'acc',v:20},
  sk:[rlSk('Frost Needle',{m:3.6,fx:[['slow',2,40]]}),rlSk('Glacial Lance',{cd:4,m:4.8,fx:[['stun',1,40]]}),rlSk('Blizzard',{cd:5,tg:'eA',m:2.5,fx:[['slow',2,60],['atbDown',30,60]]})]},
 {id:'nerissa',n:'Nerissa',el:'water',r:5,role:'sup',spd:109,it:'lantern',o:'robe',hg:'tiara',lk:[9,4,0,0,4,0,2,0,0,0],ld:{s:'hp',v:20},
  sk:[rlSk('Moonbeam',{m:3.4,fx:[['seal',1,30]]}),rlSk('Tidal Blessing',{cd:3,tg:'aA',fx:[['heal',28],['regen',2]]}),rlSk('Moontide Renewal',{cd:6,tg:'aA',fx:[['revive',35],['shield',15,2]]})]},
 // WIND
 {id:'gale',n:'Gale',el:'wind',r:3,role:'atk',spd:108,it:'quill',o:'vest',hg:'feather',lk:[1,12,2,3,2,3,3,0,0,1],
  sk:[rlSk('Gust Dart',{m:3.4,fx:[['self','atb',10]]}),rlSk('Cyclone',{cd:3,m:1.5,h:3}),rlSk('Tailwind',{cd:4,tg:'aA',fx:[['spdUp',2]]})]},
 {id:'thistle',n:'Thistle',el:'wind',r:3,role:'sup',spd:106,it:'banner',o:'tunic',hg:'',lk:[4,8,3,2,4,0,2,3,0,1],
  sk:[rlSk('Burr Toss',{m:3.2,fx:[['slow',1,30]]}),rlSk('Quickstep',{cd:4,tg:'aA',fx:[['atb',25]]}),rlSk('Bloom',{cd:4,tg:'aA',fx:[['heal',12]]})]},
 {id:'bramble',n:'Bramblewood',el:'wind',r:3,role:'hp',spd:94,it:'staff',o:'vest',hg:'antlers',lk:[6,0,1,4,1,2,3,1,2,4],
  sk:[rlSk('Root Lash',{m:.16,sc:'hp',fx:[['slow',1,20]]}),rlSk('Sap Mend',{cd:3,tg:'a1',fx:[['healT',35]]}),rlSk('Thornhide',{cd:5,tg:'aA',fx:[['defUp',2],['regen',2]]})]},
 {id:'pip',n:'Pip Thatch',el:'wind',r:3,role:'def',spd:99,it:'shield',o:'armor',hg:'',lk:[2,9,1,1,4,1,0,1,3,1],
  sk:[rlSk('Hay Bale Bash',{m:3.5,sc:'def'}),rlSk('Haystack Fort',{cd:4,tg:'aA',fx:[['shield',12,2]]}),rlSk('Stubborn',{pas:'counter',v:30})]},
 {id:'zephyra',n:'Zephyra',el:'wind',r:4,role:'atk',spd:112,it:'orb',o:'cloak',hg:'hood',lk:[5,1,8,2,2,3,3,3,0,0],ld:{s:'cr',v:10},
  sk:[rlSk('Razor Wind',{m:1.4,h:3}),rlSk('Gale Lance',{cd:3,m:4.6,fx:[['defBreak',2,50]]}),rlSk('Skyfall',{cd:5,tg:'eA',m:2.6,fx:[['self','atb',40]]})]},
 {id:'oakhart',n:'Oakhart',el:'wind',r:4,role:'def',spd:97,it:'shield',o:'armor',hg:'helm',lk:[7,9,0,4,1,2,0,1,3,4],ld:{s:'def',v:20},
  sk:[rlSk('Bark Slam',{m:3.8,sc:'def',fx:[['stun',1,20]]}),rlSk('Ironbark',{cd:4,tg:'aA',fx:[['defUp',2],['shield',10,2]]}),rlSk('Rootbind',{cd:5,tg:'eA',m:2.4,sc:'def',fx:[['slow',2,50],['atkBreak',2,40]]})]},
 {id:'aeris',n:'Aeris Quill',el:'wind',r:5,role:'sup',spd:118,it:'quill',o:'robe',hg:'circlet',lk:[1,1,11,1,0,3,3,3,0,0],ld:{s:'spd',v:15},
  sk:[rlSk('Feather Dart',{m:3.4,fx:[['atbDown',15,50]]}),rlSk('Jetstream',{cd:4,tg:'aA',fx:[['spdUp',2],['atb',30]]}),rlSk('Eye of the Storm',{cd:5,tg:'eA',m:2.2,fx:[['slow',2,70],['atbDown',40,70]]})]},
 // LIGHT
 {id:'lumi',n:'Lumi',el:'light',r:3,role:'sup',spd:104,it:'lantern',o:'robe',hg:'circlet',lk:[0,11,11,1,0,1,5,0,0,3],
  sk:[rlSk('Glimmer',{m:3.2}),rlSk('Soft Light',{cd:3,tg:'aA',fx:[['heal',15]]}),rlSk('Halo',{cd:5,tg:'a1',fx:[['immune',2],['healT',20]]})]},
 {id:'halo',n:'Halo Wren',el:'light',r:3,role:'atk',spd:103,it:'staff',o:'coat',hg:'',lk:[3,8,3,3,0,0,1,2,1,1],
  sk:[rlSk('Radiant Bolt',{m:3.6}),rlSk('Prism Lance',{cd:3,m:4.2,fx:[['mark',2,40]]}),rlSk('Dazzle',{cd:4,tg:'eA',m:1.6,fx:[['atkBreak',1,40]]})]},
 {id:'solk',n:'Sol Kade',el:'light',r:4,role:'atk',spd:103,it:'orb',o:'coat',hg:'feather',lk:[6,9,3,4,1,1,2,4,3,4],ld:{s:'atk',v:15},
  sk:[rlSk('Sunstrike',{m:3.8,fx:[['mark',1,30]]}),rlSk('Solar Flare',{cd:4,tg:'eA',m:2.4,fx:[['atkBreak',2,45]]}),rlSk('Zenith',{cd:5,m:6.8,fx:[['self','critUp',2]]})]},
 {id:'seraphine',n:'Seraphine',el:'light',r:4,role:'hp',spd:100,it:'book',o:'robe',hg:'tiara',lk:[2,4,3,0,3,1,5,3,0,0],ld:{s:'res',v:25},
  sk:[rlSk('Hymn Strike',{m:.14,sc:'hp',fx:[['team','heal',5]]}),rlSk('Sanctuary',{cd:4,tg:'aA',fx:[['regen',2],['cleanse']]}),rlSk('Grace',{cd:5,tg:'aA',fx:[['healT',30],['immune',1]]})]},
 {id:'aurelius',n:'Aurelius',el:'light',r:5,role:'def',spd:100,it:'shield',o:'armor',hg:'helm',lk:[5,0,5,4,1,2,1,4,3,0],ld:{s:'def',v:25},
  sk:[rlSk('Judgment Slam',{m:4.0,sc:'def',fx:[['stun',1,25]]}),rlSk('Aegis',{cd:4,tg:'aA',fx:[['shield',20,2],['defUp',2]]}),rlSk('Divine Bastion',{cd:6,tg:'aA',fx:[['immune',2],['healT',25],['atb',20]]})]},
 // DARK
 {id:'umbra',n:'Umbra',el:'dark',r:3,role:'atk',spd:105,it:'orb',o:'cloak',hg:'hood',lk:[7,1,0,4,2,4,1,4,0,0],
  sk:[rlSk('Shade Bolt',{m:3.6}),rlSk('Night Pulse',{cd:3,m:2.2,h:2,fx:[['atkBreak',2,35]]}),rlSk('Quick Shadow',{pas:'firstStrike'})]},
 {id:'grim',n:'Grim Ink',el:'dark',r:3,role:'hp',spd:96,it:'quill',o:'tunic',hg:'',lk:[9,6,0,4,0,2,1,1,2,0],
  sk:[rlSk('Ink Splatter',{m:.15,sc:'hp',fx:[['slow',1,25]]}),rlSk('Blot',{cd:3,m:.2,sc:'hp',fx:[['seal',1,40]]}),rlSk('Inkwell Mend',{cd:4,tg:'aA',fx:[['heal',13]]})]},
 {id:'nyx',n:'Nyx Script',el:'dark',r:4,role:'sup',spd:111,it:'book',o:'robe',hg:'witch',lk:[3,4,6,5,2,4,5,4,0,2],ld:{s:'acc',v:25},
  sk:[rlSk('Hex Mark',{m:3.3,fx:[['mark',2,40]]}),rlSk('Unravel',{cd:3,m:3.0,fx:[['strip',2],['seal',2,50]]}),rlSk('Night Veil',{cd:5,tg:'eA',m:1.8,fx:[['atkBreak',2,55],['slow',2,55]]})]},
 {id:'morrow',n:'Morrow',el:'dark',r:4,role:'atk',spd:102,it:'lantern',o:'coat',hg:'',lk:[0,12,10,4,1,0,5,1,1,0],ld:{s:'cd',v:20},
  sk:[rlSk('Soul Lantern',{m:3.8}),rlSk('Dusk Toll',{cd:4,tg:'eA',m:2.4,fx:[['defBreak',2,45]]}),rlSk('Night Feast',{pas:'lifesteal',v:30})]},
 {id:'vesper',n:'Vesper',el:'dark',r:5,role:'atk',spd:107,it:'staff',o:'cloak',hg:'hood',lk:[1,4,0,4,2,3,5,4,3,0],ld:{s:'cr',v:15},
  sk:[rlSk('Shadow Lance',{m:3.8,fx:[['mark',2,50]]}),rlSk('Umbral Rend',{cd:3,m:2.0,h:3,fx:[['defBreak',2,50]]}),rlSk('Eclipse',{cd:5,tg:'eA',m:3.4,fx:[['stun',1,35]]})]},
];
const RL_H=Object.fromEntries(RL_HEROES.map(h=>[h.id,h]));
const RL_STARTERS=['pyra','tide','zephyra'],RL_FREE=['brandt','lumi','bramble'];

/* ---------- monsters ---------- */
const RL_MON={
 slime:{n:'Slime',m:[1.1,.9,1,95],sk:[rlSk('Gloop',{m:3.0,fx:[['slow',1,20]]}),rlSk('Split Splash',{cd:4,tg:'eA',m:1.4})]},
 wolf:{n:'Wolf',m:[.9,1.15,.85,112],sk:[rlSk('Pounce',{m:3.4}),rlSk('Howl',{cd:4,tg:'aA',fx:[['atkUp',2]]})]},
 treant:{n:'Treant',m:[1.4,.8,1.2,88],sk:[rlSk('Branch Swat',{m:3.2}),rlSk('Bark Mend',{cd:4,tg:'aA',fx:[['heal',10]]})]},
 owl:{n:'Owl',m:[.9,1,.9,115],sk:[rlSk('Feather Storm',{m:1.3,h:3}),rlSk('Screech',{cd:4,tg:'eA',m:1.2,fx:[['atbDown',20,50]]})]},
 imp:{n:'Imp',m:[.85,1.2,.8,108],sk:[rlSk('Firebolt',{m:3.4,fx:[['burn',2,25]]}),rlSk('Cackle',{cd:4,m:2,fx:[['defBreak',2,40]]})]},
 drake:{n:'Drake',m:[1.2,1.15,1,100],sk:[rlSk('Tail Whip',{m:3.6}),rlSk('Breath',{cd:4,tg:'eA',m:1.9,fx:[['slow',1,30]]})]},
 golem:{n:'Golem',m:[1.5,.9,1.4,85],sk:[rlSk('Slam',{m:3.4,sc:'def',fx:[['stun',1,15]]}),rlSk('Harden',{cd:4,tg:'self',fx:[['defUp',2],['shield',20,2]]})]},
 crab:{n:'Crab',m:[1.2,1,1.3,92],sk:[rlSk('Pinch',{m:3.3,fx:[['defBreak',1,25]]}),rlSk('Shell Up',{cd:4,tg:'self',fx:[['shield',20,2]]})]},
 wisp:{n:'Wisp',m:[.8,1.05,.8,116],sk:[rlSk('Flicker',{m:3.2}),rlSk('Glow',{cd:4,tg:'aA',fx:[['heal',12]]})]},
 specter:{n:'Specter',m:[1,1.1,.9,106],sk:[rlSk('Chill Touch',{m:3.4,fx:[['seal',1,20]]}),rlSk('Wail',{cd:4,tg:'eA',m:1.5,fx:[['atkBreak',2,30]]})]},
 inkling:{n:'Inkling',m:[.95,1.1,.9,104],sk:[rlSk('Ink Spit',{m:3.4,fx:[['slow',1,30]]}),rlSk('Blot Out',{cd:4,m:2.4,fx:[['seal',1,40]]})]},
 papergolem:{n:'Paper Golem',m:[1.6,1,1.2,90],sk:[rlSk('Page Slam',{m:3.5}),rlSk('Reshuffle',{cd:4,tg:'self',fx:[['shield',20,2],['regen',2]]})]},
};
const RL_BOSS_SK=el=>rlSk('Cataclysm',{cd:5,tg:'eA',m:2.6,fx:[[{fire:'burn',water:'slow',wind:'atbDown',light:'atkBreak',dark:'stun'}[el],el==='wind'?40:el==='dark'?1:2,el==='dark'?30:50]]});

/* ---------- world ----------
   regions unlock when every boss listed in `req` has been beaten.
   node types: town, battle, elite, boss, chest, shrine, dungeon, tower */
const RL_REG={
 g:{n:'Greenhollow Fields',el:'wind',lv:'1–8',req:[],pool:[['slime','wind'],['wolf','wind'],['treant','wind'],['owl','wind'],['slime','water'],['wolf','fire']],tint:'#2f6b3a',d:'Rolling meadows where the first pages of the Archive fell.'},
 e:{n:'Emberpeak Crags',el:'fire',lv:'9–18',req:['g8'],pool:[['imp','fire'],['drake','fire'],['golem','fire'],['slime','fire'],['wolf','fire'],['imp','wind']],tint:'#7a2a14',d:'Volcanic ridges glowing with molten ink.'},
 t:{n:'Tidecrest Coast',el:'water',lv:'9–18',req:['g8'],pool:[['crab','water'],['slime','water'],['wisp','water'],['specter','water'],['drake','water'],['crab','fire']],tint:'#14507a',d:'Reefs and sunken ruins along a stormy shore.'},
 l:{n:'Lumen Spires',el:'light',lv:'19–30',req:['e8'],pool:[['wisp','light'],['owl','light'],['golem','light'],['specter','light'],['drake','light']],tint:'#8a7420',d:'Crystal towers that bend sunlight into song.'},
 d:{n:'Hollowmere',el:'dark',lv:'19–30',req:['t8'],pool:[['specter','dark'],['inkling','dark'],['wolf','dark'],['imp','dark'],['owl','dark']],tint:'#3a1f6b',d:'A misty bog where the Blank first seeped in.'},
 a:{n:'The Grand Archive',el:'light',lv:'31–45',req:['l8','d8'],pool:[['papergolem','light'],['papergolem','dark'],['inkling','dark'],['drake','fire'],['wisp','water'],['golem','wind'],['specter','light']],tint:'#5a4a3a',d:'The great library at the heart of the Realm.'}
};
const rlNode=(id,n,x,y,t,o)=>Object.assign({id,n,x,y,t,reg:id[0]},o||{});
const RL_NODES=[
 rlNode('g0','Orcutt Village',190,1250,'town'),rlNode('g1','Meadow Path',310,1175,'battle',{lv:1}),rlNode('g2','Whispering Brook',440,1265,'battle',{lv:2}),
 rlNode('g3','Old Windmill',330,1050,'chest',{loot:{gems:60,gold:1500,gear:'rare'}}),rlNode('g4','Sprout Grove',570,1170,'battle',{lv:4}),
 rlNode('g5','Hilltop Shrine',470,1010,'shrine',{buff:['hpP',4]}),rlNode('g6','Gale Hollow',640,1030,'dungeon'),rlNode('g7','Bramble Thicket',710,1275,'elite',{lv:7}),
 rlNode('g8','Thornback Den',800,1120,'boss',{lv:8,boss:['treant','wind','Thornback the Elder']}),
 rlNode('e0','Cinder Gate',960,1160,'battle',{lv:9}),rlNode('e1','Ashfall Road',1110,1260,'battle',{lv:10}),rlNode('e2','Smolder Camp',1180,1100,'town'),
 rlNode('e3','Lava Steps',1310,1250,'battle',{lv:12}),rlNode('e4','Obsidian Cache',1250,975,'chest',{loot:{gems:80,gold:4000,gear:'epic'}}),
 rlNode('e5','Flame Shrine',1430,1100,'shrine',{buff:['atkP',4]}),rlNode('e6','Magma Forge',1530,1265,'dungeon'),rlNode('e7','Scorchwing Roost',1610,1060,'elite',{lv:16}),
 rlNode('e8','Pyre Colossus',1760,1180,'boss',{lv:18,boss:['golem','fire','The Pyre Colossus']}),
 rlNode('t0','Shoreline Trail',430,870,'battle',{lv:9}),rlNode('t1','Saltwind Docks',250,790,'town'),rlNode('t2','Coral Shallows',430,705,'battle',{lv:11}),
 rlNode('t3','Sunken Bell',220,620,'chest',{loot:{gems:80,gold:4000,gear:'epic'}}),rlNode('t4','Kelp Maze',580,620,'battle',{lv:13}),
 rlNode('t5','Tide Shrine',380,540,'shrine',{buff:['defP',4]}),rlNode('t6','Abyss Grotto',660,770,'dungeon'),rlNode('t7','Stormcaller Reef',620,470,'elite',{lv:16}),
 rlNode('t8',"Leviathan's Maw",450,420,'boss',{lv:18,boss:['drake','water','The Leviathan']}),
 rlNode('l0','Dawn Stair',1650,820,'battle',{lv:19}),rlNode('l1','Radiant Terrace',1500,700,'battle',{lv:21}),rlNode('l2','Sunspire',1720,620,'town'),
 rlNode('l3','Prism Garden',1340,610,'chest',{loot:{gems:120,gold:9000,gear:'legendary'}}),rlNode('l4','Choir of Glass',1560,500,'battle',{lv:24}),
 rlNode('l5','Light Shrine',1800,450,'shrine',{buff:['spd',3]}),rlNode('l6','Gleaming Vault',1380,420,'dungeon'),rlNode('l7',"Seraph's Watch",1640,300,'elite',{lv:28}),
 rlNode('l8','The Gilded Arbiter',1460,200,'boss',{lv:30,boss:['specter','light','The Gilded Arbiter']}),
 rlNode('d0','Gloomwood Edge',480,330,'battle',{lv:19}),rlNode('d1','Lantern Hamlet',290,300,'town'),rlNode('d2','Whisper Bog',630,255,'battle',{lv:21}),
 rlNode('d3','Forgotten Crypt',170,180,'chest',{loot:{gems:120,gold:9000,gear:'legendary'}}),rlNode('d4','Moonless Path',420,170,'battle',{lv:24}),
 rlNode('d5','Shadow Shrine',650,110,'shrine',{buff:['cr',3]}),rlNode('d6','Night Archive',290,75,'dungeon'),rlNode('d7',"Hollow Knight's Rest",770,215,'elite',{lv:28}),
 rlNode('d8','The Eraser Wraith',560,55,'boss',{lv:30,boss:['specter','dark','The Eraser Wraith']}),
 rlNode('a0','Archive Steps',1000,830,'battle',{lv:31}),rlNode('a1','Hall of Records',890,700,'battle',{lv:33}),rlNode('a2','Scriptorium',1110,700,'town'),
 rlNode('a3','Vault of Lost Pages',1000,600,'chest',{loot:{gems:200,gold:20000,gear:'legendary'}}),rlNode('a4','Index Corridors',880,520,'battle',{lv:36}),
 rlNode('a5','Great Shrine',1120,520,'shrine',{buff:['hpP',3]}),rlNode('a6','Tower of Trials',1000,420,'tower'),rlNode('a7',"Librarian's Sentinel",900,340,'elite',{lv:41}),
 rlNode('a8','The Blank',1090,320,'boss',{lv:45,boss:['papergolem','dark','The Blank']}),
];
const RL_N=Object.fromEntries(RL_NODES.map(n=>[n.id,n]));
const RL_EDGES=[
 ['g0','g1'],['g1','g2'],['g1','g3'],['g3','g5'],['g2','g4'],['g4','g5'],['g5','g6'],['g4','g7'],['g4','g8'],['g7','g8'],['g6','g8'],
 ['g8','e0'],['g5','t0'],
 ['e0','e1'],['e0','e2'],['e1','e2'],['e2','e3'],['e2','e4'],['e3','e5'],['e4','e5'],['e5','e6'],['e5','e7'],['e3','e6'],['e6','e8'],['e7','e8'],
 ['t0','t1'],['t0','t2'],['t1','t3'],['t2','t3'],['t2','t4'],['t3','t5'],['t4','t5'],['t4','t6'],['t4','t7'],['t5','t8'],['t7','t8'],
 ['e7','l0'],['t8','d0'],
 ['l0','l1'],['l0','l2'],['l1','l3'],['l1','l4'],['l2','l4'],['l2','l5'],['l3','l6'],['l4','l6'],['l4','l7'],['l5','l7'],['l7','l8'],['l6','l8'],
 ['d0','d1'],['d0','d2'],['d1','d3'],['d1','d4'],['d2','d4'],['d2','d7'],['d4','d5'],['d3','d6'],['d4','d6'],['d5','d8'],['d5','d7'],['d7','d8'],
 ['l3','a2'],['d7','a1'],
 ['a0','a1'],['a0','a2'],['a1','a3'],['a2','a3'],['a3','a4'],['a3','a5'],['a4','a7'],['a3','a6'],['a6','a8'],['a7','a8'],['a5','a8'],
];
const RL_DUNGEON={g6:{el:'wind',sets:['swift','focus','vigor']},e6:{el:'fire',sets:['fury','blade','vampire']},t6:{el:'water',sets:['guard','endure','vigor']},l6:{el:'light',sets:['swift','blade','guard']},d6:{el:'dark',sets:['vampire','fury','focus']}};
const RL_DUNGEON_TIERS=[{n:'Floor I',lv:6},{n:'Floor II',lv:14},{n:'Floor III',lv:22},{n:'Floor IV',lv:32},{n:'Floor V',lv:42}];

/* ---------- quests ---------- */
const RL_QUESTS=[
 {id:'q1',at:'g0',n:'A Gust of Trouble',d:'Monsters are spilling onto the Meadow Path. Win a battle there.',goal:{t:'win',node:'g1',n:1},rw:{gems:50,gold:500}},
 {id:'q2',at:'g0',n:'Find a Friend',d:'Visit the Summon portal and call a new creature.',goal:{t:'summon',n:1},rw:{tomes:2}},
 {id:'q3',at:'g0',n:'Windmill Secrets',d:'The miller says something shines inside the Old Windmill. Go look.',goal:{t:'visit',node:'g3',n:1},rw:{gold:1000}},
 {id:'q4',at:'g0',n:'Gear Up',d:'Put a piece of gear on any creature.',goal:{t:'equip',n:1},rw:{gold:800}},
 {id:'q5',at:'g0',n:'The Thornback Threat',d:'An ancient treant guards the road east. Defeat Thornback the Elder.',goal:{t:'win',node:'g8',n:1},rw:{gems:150,gear:'epic'}},
 {id:'q6',at:'e2',n:'Ember Trial',d:'Prove yourself to the forge-keepers. Defeat 20 fire monsters.',goal:{t:'kill',el:'fire',n:20},rw:{gems:80,essence:['fire',20]}},
 {id:'q7',at:'e2',n:'Forge Ahead',d:'Clear the Magma Forge dungeon once.',goal:{t:'dungeon',node:'e6',n:1},rw:{gold:4000}},
 {id:'q8',at:'e2',n:'The Colossus Wakes',d:'Bring down the Pyre Colossus.',goal:{t:'win',node:'e8',n:1},rw:{gems:200,gear:'legendary'}},
 {id:'q9',at:'t1',n:'Tidebound',d:'Clear the reefs. Defeat 20 water monsters.',goal:{t:'kill',el:'water',n:20},rw:{gems:80,essence:['water',20]}},
 {id:'q10',at:'t1',n:'The Sunken Bell',d:'Divers hear ringing from the deep. Find the Sunken Bell.',goal:{t:'visit',node:'t3',n:1},rw:{gold:3000,tomes:2}},
 {id:'q11',at:'t1',n:'Leviathan Rising',d:"Defeat the Leviathan in its Maw.",goal:{t:'win',node:'t8',n:1},rw:{gems:200,gear:'legendary'}},
 {id:'q12',at:'l2',n:'Song of Glass',d:'Win at the Choir of Glass three times.',goal:{t:'win',node:'l4',n:3},rw:{gems:120,tomes:3}},
 {id:'q13',at:'l2',n:'Dawnbringer',d:'Defeat the Gilded Arbiter atop the Spires.',goal:{t:'win',node:'l8',n:1},rw:{gems:300,gear:'legendary'}},
 {id:'q14',at:'d1',n:'Crypt Keeper',d:'Explore the Forgotten Crypt.',goal:{t:'visit',node:'d3',n:1},rw:{gold:8000}},
 {id:'q15',at:'d1',n:'Lanterns in the Dark',d:'Banish the Eraser Wraith.',goal:{t:'win',node:'d8',n:1},rw:{gems:300,gear:'legendary'}},
 {id:'q16',at:'a2',n:'Climb the Tower',d:'Reach floor 10 of the Tower of Trials.',goal:{t:'tower',n:10},rw:{gems:250}},
 {id:'q17',at:'a2',n:'The Last Page',d:'Face the Blank and restore the Archive.',goal:{t:'win',node:'a8',n:1},rw:{gems:600,gear:'legendary'}},
];
const RL_DAILY=[
 {id:'dw',n:'Win 3 battles',goal:{t:'winAny',n:3},rw:{gems:20}},
 {id:'dm',n:'Power up 5 skills with correct answers',goal:{t:'math',n:5},rw:{gems:25}},
 {id:'da',n:'Win an arena battle',goal:{t:'arena',n:1},rw:{gems:20}},
 {id:'ds',n:'Summon a creature',goal:{t:'summon',n:1},rw:{gold:2000}},
 {id:'du',n:'Upgrade gear twice',goal:{t:'upgrade',n:2},rw:{gems:15}},
 {id:'dd',n:'Clear a dungeon',goal:{t:'dungeon',n:1},rw:{tomes:2}},
 {id:'dk',n:'Defeat 15 monsters',goal:{t:'killAny',n:15},rw:{gold:3000}},
];

/* ---------- gear ---------- */
const RL_SLOTS=[{n:'Charm',main:['atk']},{n:'Cloak',main:['spd','hpP','atkP','defP']},{n:'Boots',main:['def']},{n:'Amulet',main:['cr','cd','hpP','atkP','defP']},{n:'Ring',main:['hp']},{n:'Tome',main:['acc','res','hpP','atkP','defP']}];
const RL_GSTAT={hp:{main:[9,4.5],sub:[4,12]},atk:{main:[1,.45],sub:[1,2]},def:{main:[1,.45],sub:[1,2]},hpP:{main:[5,1.8],sub:[3,7]},atkP:{main:[5,1.8],sub:[3,7]},defP:{main:[5,1.8],sub:[3,7]},spd:{main:[4,1.3],sub:[2,5]},cr:{main:[4,1.3],sub:[2,5]},cd:{main:[6,2.2],sub:[3,6]},acc:{main:[5,1.8],sub:[3,7]},res:{main:[5,1.8],sub:[3,7]}};
const RL_SUBKEYS=['hp','atk','def','hpP','atkP','defP','spd','cr','cd','acc','res'];
const RL_SETS={
 swift:{n:'Swift',pcs:4,b:{spdP:25},d:'+25% SPD',c:'#4fd17a'},fury:{n:'Fury',pcs:4,b:{cd:40},d:'+40% Crit Dmg',c:'#ff6a3d'},
 vampire:{n:'Vampire',pcs:4,b:{steal:25},d:'Heal 25% of damage dealt',c:'#c23a5a'},vigor:{n:'Vigor',pcs:2,b:{hpP:15},d:'+15% HP',c:'#38d39f'},
 guard:{n:'Guard',pcs:2,b:{defP:15},d:'+15% DEF',c:'#3da5ff'},blade:{n:'Blade',pcs:2,b:{cr:12},d:'+12% Crit Rate',c:'#ffd96a'},
 focus:{n:'Focus',pcs:2,b:{acc:20},d:'+20% Accuracy',c:'#b970ff'},endure:{n:'Endure',pcs:2,b:{res:20},d:'+20% Resist',c:'#9fd6ff'}
};
const RL_GRAR=['common','rare','epic','legendary'];
