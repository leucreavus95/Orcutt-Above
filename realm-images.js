"use strict";
/* ================================================================
   REALM HERO IMAGES: painted art that replaces the drawn heroes.
   Add a hero by dropping art/<id>-1.webp, -2, -3 (one per form)
   and listing the id below. Heroes not listed keep their drawing.
   ================================================================ */
const RL_ART={
  // f: standing art for each form.
  // c (optional): casting frames for each form, played in order during a spell:
  //    reach, charge, release. ax/ay = point between the feet in the file,
  //    h = how tall he would stand in that file's pixels (sets the scale).
  // f: standing art for each form, with the same placement fields (w/ih = file size).
  // Kestran (pangolin spear knight, chibi). EPIC. Frames per form are [Spear Thrust, Winding Sweep, Spearstorm]:
  // the thrust is a lunge; the sweep reuses the thrust stance (the sheet's sweep crosses his legs) and draws the painted arc.
  // Sable (hooded wraith, chibi). LEGENDARY. Frames per form are [Quickstep Cut, Twin Crescent, Veilstep Attack];
  // fv holds the phased-out still poses he shows while Veiled.
  // Garrow (tortoise drake, chibi). LEGENDARY tank. Frames per form are [Shield Bash, Jade Ward, Taunt-Roar];
  // the roar's golden sigil appears over every enemy it taunts.
  // Origa (origami crane, chibi). EPIC. Frames per form are [Fold Dash, Feather Piercer, Paper Storm].
  // Ignis (salamander arcanist, chibi). LEGENDARY. Frames per form are [Cinder Bolt, Scorching Arc, Ignition Burst].
  // Kael (frost owl, chibi). LEGENDARY. Frames per form are [Glacial Talon, Shardstorm, Permafrost Ring].
  // Thorne (stag shaman, chibi). LEGENDARY support. Frames per form are [Spirit Bolt, Totem Ward, Ancestral Tempest].
  // Voltan (lynx striker, chibi). LEGENDARY. Frames per form are [Thunderclap Fist, Chain Arc, Stormstep].
  // Sage (village herbalist, chibi). COMMON healer. Frames per form are [Quick Remedy, Herbal Poultice, Renewing Draught].
  // Bram (boar shieldbearer, chibi). COMMON tank. Frames per form are [Tusker Bash, Shield Brace, Hold the Line].
  // Kasim (jackal duelist, chibi). EPIC. Frames per form are [Sandshear, Twin Dune Cuts, Dust Devil].
  // Corvin (raven hex-scribe, chibi). LEGENDARY. Frames per form are [Quillshot, Binding Script, Blackwing Sigils].
  // Marla (marsh trapper, chibi). RARE. Frames per form are [Hooked Jab, Snare Toss, Bog Sweep].
  // Burl (beaver bridgewright, chibi). COMMON. Frames per form are [Mallet Tap, Timber Toss, Quick Barricade].
  // Varek (ashen chain warden, chibi). LEGENDARY. Frames per form are [Chainhook Strike, Cinder Sweep, Furnace Break].
  // Brakk (fiddler-crab tideguard, chibi). EPIC tank. Frames per form are [Clawguard, Brine Snap, Riptide Lunge].
  // Lysa (human glasswright, chibi). EPIC. Frames per form are [Shardline, Prism Snare, Glassfall].
  // Rowan (standard-bearer, chibi). EPIC support. Frames per form are [Rally Standard, Banner Feint, Commanding Sweep].
  flag:{f:[{src:'art/flag-1.webp',ax:179,ay:856,h:851,w:495,ih:854,ht:0},{src:'art/flag-2.webp',ax:192,ay:862,h:851,w:499,ih:860,ht:0},{src:'art/flag-3.webp',ax:227,ay:892,h:851,w:531,ih:890,ht:0}],pose:'skill',melee:true,meleeSk:[false,true,false],dashPose:1,slash:'spear',
        c:[[{src:'art/flag-1c1.webp',ax:152,ay:432,h:511,w:366,ih:432,ht:0},{src:'art/flag-1c2.webp',ax:37,ay:359,h:511,w:391,ih:360,ht:0},{src:'art/flag-1c3.webp',ax:146,ay:349,h:511,w:401,ih:350,ht:0}],
           [{src:'art/flag-2c1.webp',ax:151,ay:434,h:511,w:372,ih:434,ht:0},{src:'art/flag-2c2.webp',ax:34,ay:366,h:511,w:393,ih:366,ht:0},{src:'art/flag-2c3.webp',ax:148,ay:351,h:511,w:412,ih:351,ht:0}],
           [{src:'art/flag-3c1.webp',ax:171,ay:454,h:511,w:397,ih:453,ht:0},{src:'art/flag-3c2.webp',ax:32,ay:376,h:511,w:419,ih:376,ht:0},{src:'art/flag-3c3.webp',ax:24,ay:375,h:511,w:434,ih:375,ht:0}]],
        spell:[{vp:['#ffffff','#fff0d0','#e8c070','#8a2a24'],hand:[110,150]},
               {vp:['#ffffff','#fff0d0','#e8c070','#8a2a24'],hand:[110,150]},
               {vp:['#ffffff','#fff0d0','#e8c070','#8a2a24'],hand:[110,150]}]},
  glass:{f:[{src:'art/glass-1.webp',ax:170,ay:771,h:765,w:491,ih:769,ht:0},{src:'art/glass-2.webp',ax:173,ay:779,h:765,w:515,ih:777,ht:0},{src:'art/glass-3.webp',ax:177,ay:780,h:765,w:496,ih:778,ht:0}],pose:'skill',
        c:[[{src:'art/glass-1c1.webp',ax:113,ay:379,h:459,w:411,ih:380,ht:0},{src:'art/glass-1c2.webp',ax:119,ay:375,h:459,w:389,ih:375,ht:0},{src:'art/glass-1c3.webp',ax:174,ay:446,h:459,w:396,ih:446,ht:0}],
           [{src:'art/glass-2c1.webp',ax:122,ay:389,h:459,w:418,ih:389,ht:0},{src:'art/glass-2c2.webp',ax:119,ay:386,h:459,w:408,ih:387,ht:0},{src:'art/glass-2c3.webp',ax:188,ay:450,h:459,w:412,ih:451,ht:0}],
           [{src:'art/glass-3c1.webp',ax:129,ay:397,h:459,w:438,ih:398,ht:0},{src:'art/glass-3c2.webp',ax:136,ay:412,h:459,w:431,ih:413,ht:0},{src:'art/glass-3c3.webp',ax:202,ay:469,h:459,w:427,ih:469,ht:0}]],
        spell:[{vp:['#fff6dc','#ffd98a','#f0a830','#5a2a3a'],hand:[130,150],bySkill:[{shot:'art/fx-glass-shard1.webp',sz:.6},{burst:'art/fx-glass-prism1.webp',aoe:'erupt',sz:.5},{aoe:'meteor',shatter:1,img:'art/fx-glass-cry1.webp'}]},
               {vp:['#fff6dc','#ffd98a','#f0a830','#5a2a3a'],hand:[130,150],bySkill:[{shot:'art/fx-glass-shard2.webp',sz:.6},{burst:'art/fx-glass-prism2.webp',aoe:'erupt',sz:.5},{aoe:'meteor',shatter:1,img:'art/fx-glass-cry2.webp'}]},
               {vp:['#fff6dc','#ffd98a','#f0a830','#5a2a3a'],hand:[130,150],bySkill:[{shot:'art/fx-glass-shard3.webp',sz:.6},{burst:'art/fx-glass-prism3.webp',aoe:'erupt',sz:.5},{aoe:'meteor',shatter:1,img:'art/fx-glass-cry3.webp'}]}]},
  crab:{f:[{src:'art/crab-1.webp',ax:108,ay:742,h:736,w:517,ih:743,ht:0},{src:'art/crab-2.webp',ax:112,ay:743,h:736,w:510,ih:744,ht:0},{src:'art/crab-3.webp',ax:121,ay:745,h:736,w:536,ih:744,ht:0}],pose:'skill',melee:true,meleeSk:[true,true,true],dashPose:[0,1,2],slash:'ice',
        c:[[{src:'art/crab-1c1.webp',ax:177,ay:444,h:442,w:355,ih:445,ht:0},{src:'art/crab-1c2.webp',ax:149,ay:412,h:442,w:413,ih:413,ht:0},{src:'art/crab-1c3.webp',ax:167,ay:297,h:442,w:405,ih:308,ht:0}],
           [{src:'art/crab-2c1.webp',ax:200,ay:467,h:442,w:391,ih:467,ht:0},{src:'art/crab-2c2.webp',ax:152,ay:412,h:442,w:434,ih:419,ht:0},{src:'art/crab-2c3.webp',ax:155,ay:317,h:442,w:428,ih:320,ht:0}],
           [{src:'art/crab-3c1.webp',ax:222,ay:473,h:442,w:422,ih:472,ht:0},{src:'art/crab-3c2.webp',ax:154,ay:426,h:442,w:442,ih:438,ht:0},{src:'art/crab-3c3.webp',ax:174,ay:342,h:442,w:428,ih:343,ht:0}]],
        spell:[{vp:['#ffffff','#d6fbff','#5fd0d8','#1e5a5a']},
               {vp:['#ffffff','#d6fbff','#5fd0d8','#1e5a5a']},
               {vp:['#ffffff','#d6fbff','#5fd0d8','#1e5a5a']}]},
  chain:{f:[{src:'art/chain-1.webp',ax:218,ay:737,h:732,w:510,ih:735,ht:0},{src:'art/chain-2.webp',ax:213,ay:738,h:732,w:476,ih:736,ht:0},{src:'art/chain-3.webp',ax:251,ay:742,h:732,w:530,ih:740,ht:0}],pose:'skill',melee:true,meleeSk:[true,false,true],dashPose:[0,1,2],slash:'fire',
        c:[[{src:'art/chain-1c1.webp',ax:139,ay:340,h:439,w:417,ih:341,ht:0},{src:'art/chain-1c2.webp',ax:154,ay:339,h:439,w:401,ih:338,ht:0},{src:'art/chain-1c3.webp',ax:325,ay:442,h:439,w:417,ih:445,ht:0}],
           [{src:'art/chain-2c1.webp',ax:144,ay:342,h:439,w:419,ih:343,ht:0},{src:'art/chain-2c2.webp',ax:198,ay:345,h:439,w:409,ih:345,ht:0},{src:'art/chain-2c3.webp',ax:279,ay:442,h:439,w:419,ih:456,ht:0}],
           [{src:'art/chain-3c1.webp',ax:148,ay:342,h:439,w:421,ih:343,ht:0},{src:'art/chain-3c2.webp',ax:211,ay:346,h:439,w:426,ih:347,ht:0},{src:'art/chain-3c3.webp',ax:300,ay:453,h:439,w:432,ih:454,ht:0}]],
        spell:[{vp:['#fff0d8','#ffb37a','#e2482a','#3a1410'],hand:[140,150],bySkill:[null,{burst:'art/fx-chain-fire1.webp',aoe:'erupt',sz:.55},null]},
               {vp:['#fff0d8','#ffb37a','#e2482a','#3a1410'],hand:[140,150],bySkill:[null,{burst:'art/fx-chain-fire2.webp',aoe:'erupt',sz:.55},null]},
               {vp:['#fff0d8','#ffb37a','#e2482a','#3a1410'],hand:[140,150],bySkill:[null,{burst:'art/fx-chain-fire3.webp',aoe:'erupt',sz:.55},null]}]},
  beav:{f:[{src:'art/beav-1.webp',ax:289,ay:723,h:719,w:500,ih:723,ht:0},{src:'art/beav-2.webp',ax:278,ay:725,h:719,w:486,ih:726,ht:0},{src:'art/beav-3.webp',ax:277,ay:726,h:719,w:486,ih:727,ht:0}],pose:'skill',melee:true,meleeSk:[true,false,false],dashPose:0,
        c:[[{src:'art/beav-1c1.webp',ax:163,ay:370,h:431,w:391,ih:374,ht:0},{src:'art/beav-1c2.webp',ax:156,ay:354,h:431,w:408,ih:359,ht:0},{src:'art/beav-1c3.webp',ax:211,ay:327,h:431,w:398,ih:332,ht:0}],
           [{src:'art/beav-2c1.webp',ax:164,ay:369,h:431,w:398,ih:374,ht:0},{src:'art/beav-2c2.webp',ax:166,ay:372,h:431,w:410,ih:376,ht:0},{src:'art/beav-2c3.webp',ax:214,ay:331,h:431,w:407,ih:336,ht:0}],
           [{src:'art/beav-3c1.webp',ax:168,ay:370,h:431,w:400,ih:376,ht:0},{src:'art/beav-3c2.webp',ax:176,ay:379,h:431,w:413,ih:383,ht:0},{src:'art/beav-3c3.webp',ax:225,ay:332,h:431,w:417,ih:337,ht:0}]],
        spell:[{vp:['#ffffff','#f3e2c4','#c08a52','#4a2e18'],hand:[120,150],bySkill:[null,{shot:'art/fx-beav-log1.webp',sz:.5},null]},
               {vp:['#ffffff','#f3e2c4','#c08a52','#4a2e18'],hand:[120,150],bySkill:[null,{shot:'art/fx-beav-log2.webp',sz:.5},null]},
               {vp:['#ffffff','#f3e2c4','#c08a52','#4a2e18'],hand:[120,150],bySkill:[null,{shot:'art/fx-beav-log3.webp',sz:.5},null]}]},
  marsh:{f:[{src:'art/marsh-1.webp',ax:184,ay:780,h:775,w:498,ih:781,ht:0},{src:'art/marsh-2.webp',ax:199,ay:788,h:775,w:506,ih:789,ht:0},{src:'art/marsh-3.webp',ax:259,ay:799,h:775,w:557,ih:799,ht:0}],pose:'skill',melee:true,meleeSk:[true,false,false],dashPose:0,
        c:[[{src:'art/marsh-1c1.webp',ax:141,ay:378,h:465,w:407,ih:379,ht:0},{src:'art/marsh-1c2.webp',ax:125,ay:361,h:465,w:405,ih:361,ht:0},{src:'art/marsh-1c3.webp',ax:268,ay:358,h:465,w:400,ih:359,ht:0}],
           [{src:'art/marsh-2c1.webp',ax:151,ay:391,h:465,w:435,ih:392,ht:0},{src:'art/marsh-2c2.webp',ax:139,ay:369,h:465,w:437,ih:369,ht:0},{src:'art/marsh-2c3.webp',ax:248,ay:390,h:465,w:432,ih:391,ht:0}],
           [{src:'art/marsh-3c1.webp',ax:153,ay:420,h:465,w:446,ih:420,ht:0},{src:'art/marsh-3c2.webp',ax:139,ay:386,h:465,w:446,ih:387,ht:0},{src:'art/marsh-3c3.webp',ax:230,ay:416,h:465,w:444,ih:416,ht:0}]],
        spell:[{vp:['#ffffff','#eef0d0','#b9b48a','#4a4a2a'],hand:[120,140],bySkill:[null,{shot:'art/fx-marsh-noose1.webp',sz:.55},{burst:'art/fx-marsh-mud1.webp',aoe:'erupt',sz:.5}]},
               {vp:['#ffffff','#eef0d0','#b9b48a','#4a4a2a'],hand:[120,140],bySkill:[null,{shot:'art/fx-marsh-noose2.webp',sz:.55},{burst:'art/fx-marsh-mud2.webp',aoe:'erupt',sz:.5}]},
               {vp:['#ffffff','#eef0d0','#b9b48a','#4a4a2a'],hand:[120,140],bySkill:[null,{shot:'art/fx-marsh-noose3.webp',sz:.55},{burst:'art/fx-marsh-mud3.webp',aoe:'erupt',sz:.5}]}]},
  raven:{f:[{src:'art/raven-1.webp',ax:247,ay:762,h:757,w:480,ih:760,ht:0},{src:'art/raven-2.webp',ax:278,ay:767,h:757,w:500,ih:765,ht:0},{src:'art/raven-3.webp',ax:241,ay:768,h:757,w:527,ih:766,ht:0}],pose:'skill',
        c:[[{src:'art/raven-1c1.webp',ax:130,ay:387,h:454,w:416,ih:387,ht:0},{src:'art/raven-1c2.webp',ax:134,ay:407,h:454,w:416,ih:406,ht:0},{src:'art/raven-1c3.webp',ax:141,ay:392,h:454,w:407,ih:392,ht:0}],
           [{src:'art/raven-2c1.webp',ax:138,ay:387,h:454,w:416,ih:387,ht:0},{src:'art/raven-2c2.webp',ax:140,ay:409,h:454,w:417,ih:408,ht:0},{src:'art/raven-2c3.webp',ax:134,ay:412,h:454,w:410,ih:413,ht:0}],
           [{src:'art/raven-3c1.webp',ax:140,ay:395,h:454,w:427,ih:396,ht:0},{src:'art/raven-3c2.webp',ax:144,ay:412,h:454,w:422,ih:411,ht:0},{src:'art/raven-3c3.webp',ax:132,ay:430,h:454,w:420,ih:430,ht:0}]],
        spell:[{vp:['#fff3dc','#e8c99a','#b9875a','#3a1a2a'],hand:[130,150],bySkill:[{shot:'art/fx-raven-quill1.webp',sz:.55},{burst:'art/fx-raven-script1.webp',aoe:'erupt',sz:.55},{shot:'art/fx-raven-feathers1.webp',aoe:'fan',sz:.5}]},
               {vp:['#fff3dc','#e8c99a','#b9875a','#3a1a2a'],hand:[130,150],bySkill:[{shot:'art/fx-raven-quill2.webp',sz:.55},{burst:'art/fx-raven-script2.webp',aoe:'erupt',sz:.55},{shot:'art/fx-raven-feathers2.webp',aoe:'fan',sz:.5}]},
               {vp:['#fff3dc','#e8c99a','#b9875a','#3a1a2a'],hand:[130,150],bySkill:[{shot:'art/fx-raven-quill3.webp',sz:.55},{burst:'art/fx-raven-script3.webp',aoe:'erupt',sz:.55},{shot:'art/fx-raven-feathers3.webp',aoe:'fan',sz:.5}]}]},
  jack:{f:[{src:'art/jack-1.webp',ax:253,ay:752,h:746,w:478,ih:753,ht:0},{src:'art/jack-2.webp',ax:264,ay:752,h:746,w:515,ih:752,ht:0},{src:'art/jack-3.webp',ax:281,ay:749,h:746,w:539,ih:749,ht:0}],pose:'skill',
        c:[[{src:'art/jack-1c1.webp',ax:117,ay:368,h:433,w:404,ih:371,ht:0},{src:'art/jack-1c2.webp',ax:146,ay:382,h:433,w:389,ih:386,ht:0},{src:'art/jack-1c3.webp',ax:287,ay:408,h:433,w:385,ih:433,ht:0}],
           [{src:'art/jack-2c1.webp',ax:117,ay:371,h:433,w:419,ih:379,ht:0},{src:'art/jack-2c2.webp',ax:152,ay:379,h:433,w:410,ih:387,ht:0},{src:'art/jack-2c3.webp',ax:276,ay:409,h:433,w:397,ih:430,ht:0}],
           [{src:'art/jack-3c1.webp',ax:134,ay:375,h:433,w:423,ih:381,ht:0},{src:'art/jack-3c2.webp',ax:153,ay:387,h:433,w:409,ih:396,ht:0},{src:'art/jack-3c3.webp',ax:278,ay:430,h:433,w:406,ih:444,ht:0}]],
        spell:[{vp:['#fff6dc','#f3d9a0','#d9a95a','#6a4a1e'],hand:[130,135],bySkill:[{shot:'art/fx-jack-wave1.webp',sz:.6},{shot:'art/fx-jack-twin1.webp',sz:.6},{burst:'art/fx-jack-wave1.webp',aoe:'erupt',sz:.5}]},
               {vp:['#fff6dc','#f3d9a0','#d9a95a','#6a4a1e'],hand:[130,135],bySkill:[{shot:'art/fx-jack-wave2.webp',sz:.6},{shot:'art/fx-jack-twin2.webp',sz:.6},{burst:'art/fx-jack-wave2.webp',aoe:'erupt',sz:.5}]},
               {vp:['#fff6dc','#f3d9a0','#d9a95a','#6a4a1e'],hand:[130,135],bySkill:[{shot:'art/fx-jack-wave3.webp',sz:.6},{shot:'art/fx-jack-twin3.webp',sz:.6},{burst:'art/fx-jack-wave3.webp',aoe:'erupt',sz:.5}]}]},
  boar:{f:[{src:'art/boar-1.webp',ax:215,ay:723,h:716,w:487,ih:723,ht:0},{src:'art/boar-2.webp',ax:213,ay:725,h:716,w:487,ih:725,ht:0},{src:'art/boar-3.webp',ax:215,ay:726,h:716,w:502,ih:727,ht:0}],pose:'skill',melee:true,meleeSk:[true,false,false],dashPose:0,
        c:[[{src:'art/boar-1c1.webp',ax:123,ay:320,h:401,w:360,ih:321,ht:0},{src:'art/boar-1c2.webp',ax:137,ay:322,h:401,w:375,ih:323,ht:0},{src:'art/boar-1c3.webp',ax:191,ay:387,h:401,w:375,ih:391,ht:0}],
           [{src:'art/boar-2c1.webp',ax:151,ay:319,h:401,w:407,ih:319,ht:0},{src:'art/boar-2c2.webp',ax:178,ay:375,h:401,w:371,ih:381,ht:0},{src:'art/boar-2c3.webp',ax:202,ay:397,h:401,w:408,ih:400,ht:0}],
           [{src:'art/boar-3c1.webp',ax:216,ay:317,h:401,w:441,ih:325,ht:0},{src:'art/boar-3c2.webp',ax:197,ay:385,h:401,w:413,ih:393,ht:0},{src:'art/boar-3c3.webp',ax:218,ay:401,h:401,w:441,ih:407,ht:0}]],
        spell:[{vp:['#ffffff','#f3e2c4','#c9a26a','#5a3a1e'],hand:[110,140],bySkill:[null,null,{burst:'art/fx-boar-spikes1.webp',aoe:'erupt',sz:.5}]},
               {vp:['#ffffff','#f3e2c4','#c9a26a','#5a3a1e'],hand:[110,140],bySkill:[null,null,{burst:'art/fx-boar-spikes2.webp',aoe:'erupt',sz:.5}]},
               {vp:['#ffffff','#f3e2c4','#c9a26a','#5a3a1e'],hand:[110,140],bySkill:[null,null,{burst:'art/fx-boar-spikes3.webp',aoe:'erupt',sz:.5}]}]},
  herb:{f:[{src:'art/herb-1.webp',ax:181,ay:811,h:806,w:469,ih:811,ht:0},{src:'art/herb-2.webp',ax:200,ay:811,h:806,w:470,ih:812,ht:0},{src:'art/herb-3.webp',ax:206,ay:812,h:806,w:486,ih:812,ht:0}],pose:'skill',
        c:[[{src:'art/herb-1c1.webp',ax:116,ay:395,h:532,w:400,ih:393,ht:0},{src:'art/herb-1c2.webp',ax:118,ay:438,h:532,w:316,ih:436,ht:0},{src:'art/herb-1c3.webp',ax:124,ay:476,h:532,w:333,ih:474,ht:0}],
           [{src:'art/herb-2c1.webp',ax:139,ay:395,h:532,w:426,ih:393,ht:0},{src:'art/herb-2c2.webp',ax:127,ay:438,h:532,w:338,ih:436,ht:0},{src:'art/herb-2c3.webp',ax:127,ay:478,h:532,w:350,ih:476,ht:0}],
           [{src:'art/herb-3c1.webp',ax:138,ay:395,h:532,w:446,ih:393,ht:0},{src:'art/herb-3c2.webp',ax:135,ay:437,h:532,w:353,ih:435,ht:0},{src:'art/herb-3c3.webp',ax:141,ay:477,h:532,w:382,ih:475,ht:0}]],
        spell:[{vp:['#ffffff','#f4ffd6','#b8e07a','#5a7a2a'],hand:[110,150]},
               {vp:['#ffffff','#f4ffd6','#b8e07a','#5a7a2a'],hand:[110,150]},
               {vp:['#ffffff','#f4ffd6','#b8e07a','#5a7a2a'],hand:[110,150]}]},
  lynx:{f:[{src:'art/lynx-1.webp',ax:270,ay:859,h:854,w:504,ih:857,ht:0},{src:'art/lynx-2.webp',ax:266,ay:861,h:854,w:499,ih:859,ht:0},{src:'art/lynx-3.webp',ax:284,ay:866,h:854,w:530,ih:864,ht:0}],pose:'skill',melee:true,meleeSk:[true,false,true],dashPose:[0,1,2],
        c:[[{src:'art/lynx-1c1.webp',ax:158,ay:363,h:495,w:393,ih:361,ht:0},{src:'art/lynx-1c2.webp',ax:164,ay:363,h:495,w:389,ih:364,ht:0},{src:'art/lynx-1c3.webp',ax:48,ay:308,h:495,w:368,ih:311,ht:0}],
           [{src:'art/lynx-2c1.webp',ax:177,ay:373,h:495,w:424,ih:371,ht:0},{src:'art/lynx-2c2.webp',ax:176,ay:373,h:495,w:430,ih:374,ht:0},{src:'art/lynx-2c3.webp',ax:62,ay:309,h:495,w:405,ih:311,ht:0}],
           [{src:'art/lynx-3c1.webp',ax:184,ay:377,h:495,w:449,ih:375,ht:0},{src:'art/lynx-3c2.webp',ax:175,ay:375,h:495,w:466,ih:376,ht:0},{src:'art/lynx-3c3.webp',ax:63,ay:309,h:495,w:445,ih:312,ht:0}]],
        spell:[{vp:['#ffffff','#d6f6ff','#4fd0ff','#1a4a8a'],hand:[120,150],bySkill:[null,{shot:'art/fx-lynx-arc1.webp',sz:.6},null]},
               {vp:['#ffffff','#d6f6ff','#4fd0ff','#1a4a8a'],hand:[120,150],bySkill:[null,{shot:'art/fx-lynx-arc2.webp',sz:.6},null]},
               {vp:['#ffffff','#d6f6ff','#4fd0ff','#1a4a8a'],hand:[120,150],bySkill:[null,{shot:'art/fx-lynx-arc3.webp',sz:.6},null]}]},
  stag:{f:[{src:'art/stag-1.webp',ax:157,ay:824,h:819,w:408,ih:825,ht:0},{src:'art/stag-2.webp',ax:219,ay:843,h:819,w:491,ih:844,ht:0},{src:'art/stag-3.webp',ax:283,ay:907,h:819,w:614,ih:907,ht:0}],pose:'skill',
        c:[[{src:'art/stag-1c1.webp',ax:106,ay:338,h:344,w:401,ih:337,ht:0},{src:'art/stag-1c2.webp',ax:177,ay:391,h:344,w:381,ih:396,ht:0},{src:'art/stag-1c3.webp',ax:183,ay:320,h:344,w:408,ih:319,ht:0}],
           [{src:'art/stag-2c1.webp',ax:111,ay:337,h:344,w:430,ih:336,ht:0},{src:'art/stag-2c2.webp',ax:196,ay:412,h:344,w:426,ih:414,ht:0},{src:'art/stag-2c3.webp',ax:157,ay:398,h:344,w:427,ih:398,ht:0}],
           [{src:'art/stag-3c1.webp',ax:114,ay:338,h:344,w:445,ih:337,ht:0},{src:'art/stag-3c2.webp',ax:211,ay:420,h:344,w:444,ih:422,ht:0},{src:'art/stag-3c3.webp',ax:279,ay:451,h:344,w:447,ih:451,ht:0}]],
        spell:[{vp:['#ffffff','#d8fff2','#5fe0c0','#2d5a3a'],hand:[150,165],support:'totem',shield:'art/fx-stag-totem1.webp',bySkill:[{shot:'art/fx-stag-bolt1.webp',sz:.7},null,{burst:'art/fx-stag-bolt1.webp',aoe:'meteor',img:'art/fx-stag-bolt1.webp'}]},
               {vp:['#ffffff','#d8fff2','#5fe0c0','#2d5a3a'],hand:[150,165],support:'totem',shield:'art/fx-stag-totem2.webp',bySkill:[{shot:'art/fx-stag-bolt2.webp',sz:.7},null,{burst:'art/fx-stag-bolt2.webp',aoe:'meteor',img:'art/fx-stag-bolt2.webp'}]},
               {vp:['#ffffff','#d8fff2','#5fe0c0','#2d5a3a'],hand:[150,165],support:'totem',shield:'art/fx-stag-totem3.webp',bySkill:[{shot:'art/fx-stag-bolt3.webp',sz:.7},null,{burst:'art/fx-stag-bolt3.webp',aoe:'meteor',img:'art/fx-stag-bolt3.webp'}]}]},
  frowl:{f:[{src:'art/frowl-1.webp',ax:196,ay:684,h:679,w:428,ih:685,ht:0},{src:'art/frowl-2.webp',ax:283,ay:704,h:679,w:480,ih:702,ht:0},{src:'art/frowl-3.webp',ax:327,ay:812,h:679,w:638,ih:810,ht:0}],pose:'skill',
        c:[[{src:'art/frowl-1c1.webp',ax:126,ay:327,h:340,w:410,ih:327,ht:0},{src:'art/frowl-1c2.webp',ax:129,ay:322,h:340,w:404,ih:323,ht:0},{src:'art/frowl-1c3.webp',ax:177,ay:256,h:340,w:394,ih:385,ht:0}],
           [{src:'art/frowl-2c1.webp',ax:133,ay:336,h:340,w:438,ih:336,ht:0},{src:'art/frowl-2c2.webp',ax:132,ay:332,h:340,w:430,ih:332,ht:0},{src:'art/frowl-2c3.webp',ax:180,ay:258,h:340,w:431,ih:396,ht:0}],
           [{src:'art/frowl-3c1.webp',ax:144,ay:395,h:340,w:448,ih:395,ht:0},{src:'art/frowl-3c2.webp',ax:140,ay:375,h:340,w:461,ih:375,ht:0},{src:'art/frowl-3c3.webp',ax:206,ay:309,h:340,w:462,ih:440,ht:0}]],
        spell:[{vp:['#ffffff','#dff3ff','#8fcaf5','#2f5f9e'],hand:[135,135],bySkill:[{shot:'art/fx-frowl-wave1.webp',sz:.6},{shot:'art/fx-frowl-shards1.webp',sz:.55},{aoe:'permafrost',img:'art/fx-frowl-ring1.webp'}]},
               {vp:['#ffffff','#dff3ff','#8fcaf5','#2f5f9e'],hand:[135,135],bySkill:[{shot:'art/fx-frowl-wave2.webp',sz:.6},{shot:'art/fx-frowl-shards2.webp',sz:.55},{aoe:'permafrost',img:'art/fx-frowl-ring2.webp'}]},
               {vp:['#ffffff','#dff3ff','#8fcaf5','#2f5f9e'],hand:[135,135],bySkill:[{shot:'art/fx-frowl-wave3.webp',sz:.6},{shot:'art/fx-frowl-shards3.webp',sz:.55},{aoe:'permafrost',img:'art/fx-frowl-ring3.webp'}]}]},
  sal:{f:[{src:'art/sal-1.webp',ax:247,ay:554,h:548,w:470,ih:552,ht:0},{src:'art/sal-2.webp',ax:264,ay:595,h:548,w:504,ih:594,ht:0},{src:'art/sal-3.webp',ax:321,ay:689,h:548,w:589,ih:689,ht:0}],pose:'skill',
        c:[[{src:'art/sal-1c1.webp',ax:131,ay:333,h:362,w:418,ih:333,ht:0},{src:'art/sal-1c2.webp',ax:118,ay:387,h:362,w:414,ih:387,ht:0},{src:'art/sal-1c3.webp',ax:102,ay:307,h:362,w:416,ih:312,ht:0}],
           [{src:'art/sal-2c1.webp',ax:126,ay:350,h:362,w:442,ih:350,ht:0},{src:'art/sal-2c2.webp',ax:123,ay:398,h:362,w:437,ih:400,ht:0},{src:'art/sal-2c3.webp',ax:206,ay:346,h:362,w:434,ih:367,ht:0}],
           [{src:'art/sal-3c1.webp',ax:134,ay:356,h:362,w:462,ih:356,ht:0},{src:'art/sal-3c2.webp',ax:189,ay:403,h:362,w:462,ih:409,ht:0},{src:'art/sal-3c3.webp',ax:325,ay:416,h:362,w:462,ih:420,ht:0}]],
        spell:[{vp:['#fff6d0','#ffd27a','#ff8a2a','#c2280f'],hand:[115,140],bySkill:[{shot:'art/fx-sal-bolt1.webp',sz:.7},{burst:'art/fx-sal-arc1.webp',aoe:'sweep'},{aoe:'meteor',img:'art/fx-sal-bolt1.webp'}]},
               {vp:['#fff6d0','#ffd27a','#ff8a2a','#c2280f'],hand:[115,140],bySkill:[{shot:'art/fx-sal-bolt2.webp',sz:.7},{burst:'art/fx-sal-arc2.webp',aoe:'sweep'},{aoe:'meteor',img:'art/fx-sal-bolt2.webp'}]},
               {vp:['#fff6d0','#ffd27a','#ff8a2a','#c2280f'],hand:[115,140],bySkill:[{shot:'art/fx-sal-bolt3.webp',sz:.7},{burst:'art/fx-sal-arc3.webp',aoe:'sweep'},{aoe:'meteor',img:'art/fx-sal-bolt3.webp'}]}]},
  crane:{f:[{src:'art/crane-1.webp',ax:198,ay:465,h:461,w:470,ih:465,ht:0},{src:'art/crane-2.webp',ax:186,ay:474,h:461,w:458,ih:475,ht:0},{src:'art/crane-3.webp',ax:304,ay:506,h:461,w:615,ih:506,ht:0}],pose:'skill',melee:true,meleeSk:[true,false,false],dashPose:0,slash:'spear',
        c:[[{src:'art/crane-1c1.webp',ax:142,ay:304,h:322,w:404,ih:305,ht:0},{src:'art/crane-1c2.webp',ax:100,ay:284,h:322,w:397,ih:284,ht:0},{src:'art/crane-1c3.webp',ax:187,ay:364,h:322,w:395,ih:363,ht:0}],
           [{src:'art/crane-2c1.webp',ax:153,ay:319,h:322,w:419,ih:321,ht:0},{src:'art/crane-2c2.webp',ax:101,ay:285,h:322,w:421,ih:286,ht:0},{src:'art/crane-2c3.webp',ax:178,ay:379,h:322,w:417,ih:380,ht:0}],
           [{src:'art/crane-3c1.webp',ax:201,ay:322,h:322,w:473,ih:324,ht:0},{src:'art/crane-3c2.webp',ax:189,ay:287,h:322,w:475,ih:288,ht:0},{src:'art/crane-3c3.webp',ax:142,ay:413,h:322,w:469,ih:414,ht:0}]],
        spell:[{vp:['#ffffff','#fbefe6','#d8453a','#7a1f1a'],hand:[125,118],bySkill:[null,{shot:'art/fx-crane-shard1.webp',sz:.55},{shot:'art/fx-crane-shard1.webp',aoe:'fan',sz:.5}]},
               {vp:['#ffffff','#fbefe6','#d8453a','#7a1f1a'],hand:[125,118],bySkill:[null,{shot:'art/fx-crane-shard2.webp',sz:.55},{shot:'art/fx-crane-shard2.webp',aoe:'fan',sz:.5}]},
               {vp:['#ffffff','#fbefe6','#d8453a','#7a1f1a'],hand:[125,118],bySkill:[null,{shot:'art/fx-crane-shard3.webp',sz:.55},{shot:'art/fx-crane-shard3.webp',aoe:'fan',sz:.5}]}]},
  tort:{f:[{src:'art/tort-1.webp',ax:275,ay:694,h:688,w:498,ih:694,ht:0},{src:'art/tort-2.webp',ax:265,ay:695,h:688,w:489,ih:695,ht:0},{src:'art/tort-3.webp',ax:277,ay:737,h:688,w:519,ih:737,ht:0}],pose:'skill',melee:true,meleeSk:[true,false,false],dashPose:0,slash:'jade',
        c:[[{src:'art/tort-1c1.webp',ax:162,ay:374,h:413,w:425,ih:375,ht:0},{src:'art/tort-1c2.webp',ax:193,ay:385,h:413,w:405,ih:390,ht:0},{src:'art/tort-1c3.webp',ax:202,ay:472,h:413,w:409,ih:497,ht:0}],
           [{src:'art/tort-2c1.webp',ax:166,ay:375,h:413,w:431,ih:376,ht:0},{src:'art/tort-2c2.webp',ax:200,ay:391,h:413,w:412,ih:396,ht:0},{src:'art/tort-2c3.webp',ax:206,ay:480,h:413,w:411,ih:504,ht:0}],
           [{src:'art/tort-3c1.webp',ax:176,ay:393,h:427,w:453,ih:393,ht:0},{src:'art/tort-3c2.webp',ax:217,ay:405,h:427,w:456,ih:411,ht:0},{src:'art/tort-3c3.webp',ax:217,ay:486,h:427,w:443,ih:514,ht:0}]],
        spell:[{vp:['#ffffff','#d9fff0','#5fd9b0','#1e6a52'],hand:[60,120],support:'flameward',bySkill:[null,null,{burst:'art/fx-tort-sigil.webp',aoe:'erupt',sz:.45}]},
               {vp:['#ffffff','#d9fff0','#5fd9b0','#1e6a52'],hand:[60,120],support:'flameward',bySkill:[null,null,{burst:'art/fx-tort-sigil.webp',aoe:'erupt',sz:.45}]},
               {vp:['#ffffff','#d9fff0','#5fd9b0','#1e6a52'],hand:[60,120],support:'flameward',bySkill:[null,null,{burst:'art/fx-tort-sigil.webp',aoe:'erupt',sz:.45}]}]},
  sab:{f:[{src:'art/sab-1.webp',ax:229,ay:552,h:547,w:454,ih:553,ht:0},{src:'art/sab-2.webp',ax:240,ay:556,h:547,w:472,ih:556,ht:0},{src:'art/sab-3.webp',ax:294,ay:606,h:547,w:574,ih:607,ht:0}],
        fv:[{src:'art/sab-v1.webp',ax:227,ay:559,h:547,w:452,ih:560,ht:0},{src:'art/sab-v2.webp',ax:245,ay:560,h:547,w:477,ih:561,ht:0},{src:'art/sab-v3.webp',ax:292,ay:633,h:547,w:572,ih:633,ht:0}],pose:'skill',melee:true,meleeSk:[true,false,true],dashPose:[0,1,2],slash:'dusk',
        c:[[{src:'art/sab-1c1.webp',ax:102,ay:287,h:364,w:386,ih:290,ht:0},{src:'art/sab-1c2.webp',ax:152,ay:340,h:364,w:403,ih:342,ht:0},{src:'art/sab-1c3.webp',ax:60,ay:312,h:364,w:398,ih:324,ht:0}],
           [{src:'art/sab-2c1.webp',ax:124,ay:308,h:358,w:410,ih:311,ht:0},{src:'art/sab-2c2.webp',ax:162,ay:340,h:358,w:421,ih:342,ht:0},{src:'art/sab-2c3.webp',ax:46,ay:320,h:358,w:419,ih:329,ht:0}],
           [{src:'art/sab-3c1.webp',ax:139,ay:320,h:383,w:446,ih:322,ht:0},{src:'art/sab-3c2.webp',ax:184,ay:340,h:383,w:450,ih:342,ht:0},{src:'art/sab-3c3.webp',ax:50,ay:345,h:383,w:453,ih:348,ht:0}]],
        spell:[{vp:['#ffffff','#ecdcf4','#b07ac0','#4a1f45'],hand:[70,112],bySkill:[null,{shot:'art/fx-sab-cres.webp',sz:.72},null]},
               {vp:['#ffffff','#ecdcf4','#b07ac0','#4a1f45'],hand:[70,112],bySkill:[null,{shot:'art/fx-sab-cres.webp',sz:.72},null]},
               {vp:['#ffffff','#ecdcf4','#b07ac0','#4a1f45'],hand:[70,112],bySkill:[null,{shot:'art/fx-sab-cres.webp',sz:.72},null]}]},
  pan:{card:{floor:215,tall:213},f:[{src:'art/pan-1.webp',ax:200,ay:607,h:587,w:408,ih:606,ht:0},{src:'art/pan-2.webp',ax:208,ay:615,h:595,w:423,ih:614,ht:0},{src:'art/pan-3.webp',ax:250,ay:618,h:598,w:489,ih:617,ht:0}],pose:'skill',melee:true,meleeSk:[true,false,false],dashPose:0,slash:'jade',
        c:[[{src:'art/pan-1c1.webp',ax:130,ay:284,h:275,w:416,ih:284,ht:0},{src:'art/pan-1c2.webp',ax:130,ay:284,h:275,w:416,ih:284,ht:0},{src:'art/pan-1c3.webp',ax:140,ay:371,h:359,w:346,ih:371,ht:0}],
           [{src:'art/pan-2c1.webp',ax:132,ay:289,h:280,w:428,ih:289,ht:0},{src:'art/pan-2c2.webp',ax:132,ay:289,h:280,w:428,ih:289,ht:0},{src:'art/pan-2c3.webp',ax:144,ay:391,h:379,w:311,ih:391,ht:0}],
           [{src:'art/pan-3c1.webp',ax:135,ay:297,h:288,w:442,ih:297,ht:0},{src:'art/pan-3c2.webp',ax:135,ay:297,h:288,w:442,ih:297,ht:0},{src:'art/pan-3c3.webp',ax:147,ay:401,h:389,w:349,ih:401,ht:0}]],
        spell:[{vp:['#ffffff','#d8fff0','#5fd9b0','#1e5a46'],hand:[150,150],bySkill:[null,{burst:'art/fx-pan-arc1.webp',aoe:'sweep'},{aoe:'spearrain',img:'art/fx-pan-spear1.webp'}]},
               {vp:['#ffffff','#d8fff0','#5fd9b0','#1e5a46'],hand:[150,150],bySkill:[null,{burst:'art/fx-pan-arc2.webp',aoe:'sweep'},{aoe:'spearrain',img:'art/fx-pan-spear2.webp'}]},
               {vp:['#ffffff','#d8fff0','#5fd9b0','#1e5a46'],hand:[150,150],bySkill:[null,{burst:'art/fx-pan-arc3.webp',aoe:'sweep'},{aoe:'spearrain',img:'art/fx-pan-spear3.webp'}]}]},
  // Brenna (lantern medic, chibi). LEGENDARY healer. Frames per form are [Kindled Aid, Hearthlight Rally, Second Dawn];
  // all three land on allies, and Second Dawn can raise a fallen ally.
  med:{f:[{src:'art/med-1.webp',ax:173,ay:713,h:690,w:469,ih:712,ht:0},{src:'art/med-2.webp',ax:178,ay:739,h:714,w:464,ih:737,ht:0},{src:'art/med-3.webp',ax:203,ay:789,h:763,w:501,ih:787,ht:0}],pose:'skill',
        c:[[{src:'art/med-1c1.webp',ax:88,ay:346,h:333,w:241,ih:344,ht:0},{src:'art/med-1c2.webp',ax:121,ay:362,h:353,w:260,ih:364,ht:0},{src:'art/med-1c3.webp',ax:83,ay:351,h:342,w:220,ih:353,ht:0}],
           [{src:'art/med-2c1.webp',ax:98,ay:348,h:335,w:231,ih:346,ht:0},{src:'art/med-2c2.webp',ax:114,ay:376,h:366,w:255,ih:378,ht:0},{src:'art/med-2c3.webp',ax:91,ay:338,h:329,w:242,ih:340,ht:0}],
           [{src:'art/med-3c1.webp',ax:151,ay:402,h:387,w:304,ih:399,ht:0},{src:'art/med-3c2.webp',ax:136,ay:383,h:373,w:267,ih:385,ht:0},{src:'art/med-3c3.webp',ax:131,ay:354,h:345,w:280,ih:356,ht:0}]],
        spell:[{vp:['#ffffff','#fff3c8','#ffc65a','#b5501e'],hand:[95,215],support:'lantern',beam:'art/fx-med-beam1.webp'},
               {vp:['#ffffff','#fff3c8','#ffc65a','#b5501e'],hand:[95,215],support:'lantern',beam:'art/fx-med-beam2.webp'},
               {vp:['#ffffff','#fff3c8','#ffc65a','#b5501e'],hand:[95,215],support:'lantern',beam:'art/fx-med-beam3.webp'}]},
  // Aurelle (moon deer healer, chibi). LEGENDARY. Frames per form are [Moonwell Mend, Dewfall Blessing, Sanctuary Bloom];
  // every spell lands on her allies.
  deer:{f:[{src:'art/deer-1.webp',ax:229,ay:564,h:545,w:476,ih:562,ht:0},{src:'art/deer-2.webp',ax:233,ay:580,h:561,w:498,ih:579,ht:0},{src:'art/deer-3.webp',ax:255,ay:608,h:587,w:546,ih:606,ht:0}],pose:'skill',
        c:[[{src:'art/deer-1c1.webp',ax:110,ay:302,h:293,w:276,ih:303,ht:0},{src:'art/deer-1c2.webp',ax:85,ay:332,h:323,w:247,ih:334,ht:0},{src:'art/deer-1c3.webp',ax:163,ay:265,h:262,w:273,ih:271,ht:0}],
           [{src:'art/deer-2c1.webp',ax:127,ay:331,h:322,w:316,ih:332,ht:0},{src:'art/deer-2c2.webp',ax:105,ay:349,h:341,w:290,ih:352,ht:0},{src:'art/deer-2c3.webp',ax:178,ay:276,h:273,w:293,ih:282,ht:0}],
           [{src:'art/deer-3c1.webp',ax:139,ay:358,h:349,w:324,ih:360,ht:0},{src:'art/deer-3c2.webp',ax:120,ay:359,h:352,w:303,ih:363,ht:0},{src:'art/deer-3c3.webp',ax:155,ay:294,h:289,w:286,ih:298,ht:0}]],
        spell:[{vp:['#ffffff','#e6fbff','#8fe6f0','#2a8a96'],hand:[120,175],support:'moonwell'},
               {vp:['#ffffff','#e6fbff','#8fe6f0','#2a8a96'],hand:[120,175],support:'moonwell'},
               {vp:['#ffffff','#e6fbff','#8fe6f0','#2a8a96'],hand:[120,175],support:'moonwell'}]},
  // Vexis (basilisk, chibi). LEGENDARY. Frames per form are [Venom Fang, Twin Toxin Crescents, Caustic Mireburst].
  bas:{zoom:.42,eyeY:100,f:[{src:'art/bas-1.webp',ax:249,ay:654,h:648,w:467,ih:652,ht:3,cx:285,fy:230},{src:'art/bas-2.webp',ax:250,ay:668,h:648,w:488,ih:666,ht:3,cx:290,fy:240},{src:'art/bas-3.webp',ax:285,ay:701,h:648,w:539,ih:699,ht:1,cx:330,fy:270}],pose:'skill',
        c:[[{src:'art/bas-1c1.webp',ax:184,ay:374,h:385,w:419,ih:375,ht:0},{src:'art/bas-1c2.webp',ax:155,ay:391,h:385,w:413,ih:391,ht:0},{src:'art/bas-1c3.webp',ax:160,ay:352,h:385,w:350,ih:352,ht:0}],
           [{src:'art/bas-2c1.webp',ax:170,ay:384,h:385,w:405,ih:383,ht:0},{src:'art/bas-2c2.webp',ax:159,ay:393,h:385,w:422,ih:393,ht:0},{src:'art/bas-2c3.webp',ax:147,ay:362,h:385,w:322,ih:361,ht:0}],
           [{src:'art/bas-3c1.webp',ax:200,ay:390,h:385,w:453,ih:394,ht:0},{src:'art/bas-3c2.webp',ax:162,ay:397,h:385,w:439,ih:396,ht:0},{src:'art/bas-3c3.webp',ax:155,ay:368,h:385,w:308,ih:367,ht:0}]],
        spell:[{vp:['#ffffff','#eaffb0','#b6e83a','#4a1a2e'],hand:[175,150],bySkill:[{shot:'art/fx-bas-fang1.webp',sz:.75},{shot:'art/fx-bas-cres1.webp',sz:.55},{burst:'art/fx-bas-mire1.webp',aoe:'erupt',sz:.65}]},
               {vp:['#ffffff','#eaffb0','#b6e83a','#4a1a2e'],hand:[175,150],bySkill:[{shot:'art/fx-bas-fang2.webp',sz:.75},{shot:'art/fx-bas-cres2.webp',sz:.55},{burst:'art/fx-bas-mire2.webp',aoe:'erupt',sz:.65}]},
               {vp:['#ffffff','#eaffb0','#b6e83a','#4a1a2e'],hand:[175,150],bySkill:[{shot:'art/fx-bas-fang3.webp',sz:.75},{shot:'art/fx-bas-cres3.webp',sz:.55},{burst:'art/fx-bas-mire3.webp',aoe:'erupt',sz:.65}]}]},
  // Solenne (phoenix archer, chibi). LEGENDARY. Frames per form are [Sunflare Arrow, Feather Volley, Phoenix Rain].
  phx:{zoom:.42,eyeY:95,f:[{src:'art/phx-1.webp',ax:217,ay:514,h:509,w:492,ih:512,ht:2,cx:200,fy:140},{src:'art/phx-2.webp',ax:189,ay:545,h:509,w:479,ih:543,ht:5,cx:200,fy:170},{src:'art/phx-3.webp',ax:237,ay:593,h:509,w:526,ih:591,ht:4,cx:240,fy:200}],pose:'skill',
        c:[[{src:'art/phx-1c1.webp',ax:116,ay:292,h:294,w:375,ih:293,ht:2},{src:'art/phx-1c2.webp',ax:122,ay:299,h:294,w:397,ih:300,ht:2},{src:'art/phx-1c3.webp',ax:95,ay:298,h:294,w:402,ih:299,ht:18}],
           [{src:'art/phx-2c1.webp',ax:134,ay:310,h:294,w:408,ih:311,ht:2},{src:'art/phx-2c2.webp',ax:129,ay:306,h:294,w:410,ih:307,ht:3},{src:'art/phx-2c3.webp',ax:104,ay:312,h:294,w:431,ih:313,ht:24}],
           [{src:'art/phx-3c1.webp',ax:169,ay:358,h:294,w:482,ih:358,ht:3},{src:'art/phx-3c2.webp',ax:154,ay:341,h:294,w:490,ih:342,ht:3},{src:'art/phx-3c3.webp',ax:126,ay:346,h:294,w:488,ih:346,ht:16}]],
        spell:[{vp:['#ffffff','#fff1c0','#ff9a2a','#c42a10'],hand:[185,150],bySkill:[{shot:'art/fx-phx-arrow1.webp'},{shot:'art/fx-phx-feather1.webp',aoe:'fan'},{burst:'art/fx-phx-rain1.webp',aoe:'erupt',sz:.62,up:'art/fx-phx-feather1.webp',hand:[60,215]}]},
               {vp:['#ffffff','#fff1c0','#ff9a2a','#c42a10'],hand:[185,150],bySkill:[{shot:'art/fx-phx-arrow2.webp'},{shot:'art/fx-phx-feather2.webp',aoe:'fan'},{burst:'art/fx-phx-rain2.webp',aoe:'erupt',sz:.62,up:'art/fx-phx-feather2.webp',hand:[60,215]}]},
               {vp:['#ffffff','#fff1c0','#ff9a2a','#c42a10'],hand:[185,150],bySkill:[{shot:'art/fx-phx-arrow3.webp'},{shot:'art/fx-phx-feather3.webp',aoe:'fan'},{burst:'art/fx-phx-rain3.webp',aoe:'erupt',sz:.62,up:'art/fx-phx-feather3.webp',hand:[60,215]}]}]},
  // Aster (astral sorcerer, chibi). LEGENDARY. Frames per form are [Astral Lance, Sigil-Bolt Volley, Rift Sweep].
  star:{zoom:.46,eyeY:95,f:[{src:'art/star-1.webp',ax:203,ay:560,h:555,w:416,ih:560,ht:2,cx:215,fy:175},{src:'art/star-2.webp',ax:235,ay:633,h:555,w:453,ih:633,ht:1,cx:255,fy:250},{src:'art/star-3.webp',ax:264,ay:696,h:555,w:553,ih:696,ht:3,cx:320,fy:320}],pose:'skill',
        c:[[{src:'art/star-1c1.webp',ax:139,ay:338,h:291,w:421,ih:339,ht:3},{src:'art/star-1c2.webp',ax:140,ay:332,h:275,w:422,ih:334,ht:1},{src:'art/star-1c3.webp',ax:119,ay:311,h:254,w:418,ih:314,ht:12}],
           [{src:'art/star-2c1.webp',ax:145,ay:371,h:295,w:439,ih:373,ht:3},{src:'art/star-2c2.webp',ax:143,ay:348,h:280,w:438,ih:350,ht:2},{src:'art/star-2c3.webp',ax:185,ay:330,h:258,w:439,ih:333,ht:3}],
           [{src:'art/star-3c1.webp',ax:137,ay:415,h:308,w:500,ih:417,ht:2},{src:'art/star-3c2.webp',ax:135,ay:387,h:289,w:489,ih:388,ht:2},{src:'art/star-3c3.webp',ax:190,ay:381,h:281,w:512,ih:387,ht:3}]],
        spell:[{vp:['#ffffff','#ece4ff','#a98bff','#2a1f5a'],hand:[165,150],bySkill:[{shot:'art/fx-star-lance1.webp'},{shot:'art/fx-star-bolt1.webp',sz:.6},{burst:'art/fx-star-rift1.webp',aoe:'sweep'}]},
               {vp:['#ffffff','#ece4ff','#a98bff','#2a1f5a'],hand:[165,150],bySkill:[{shot:'art/fx-star-lance2.webp'},{shot:'art/fx-star-bolt2.webp',sz:.6},{burst:'art/fx-star-rift2.webp',aoe:'sweep'}]},
               {vp:['#ffffff','#ece4ff','#a98bff','#2a1f5a'],hand:[165,150],bySkill:[{shot:'art/fx-star-lance3.webp'},{shot:'art/fx-star-bolt3.webp',sz:.6},{burst:'art/fx-star-rift3.webp',aoe:'sweep'}]}]},
  // Brontos (storm hammer knight, chibi). LEGENDARY. Frames per form are [Lightning Cleave, Chain-Bolt Volley, Tempest Drive]:
  // the cleave and the drive are lunges in their own swing poses (the lightning arcs are part of the art).
  thun:{zoom:.5,eyeY:85,f:[{src:'art/thun-1.webp',ax:203,ay:510,h:504,w:454,ih:511,ht:3,cx:235,fy:140},{src:'art/thun-2.webp',ax:246,ay:560,h:504,w:494,ih:561,ht:2,cx:278,fy:140},{src:'art/thun-3.webp',ax:260,ay:580,h:504,w:577,ih:581,ht:4,cx:300,fy:150}],pose:'skill',melee:true,meleeSk:[true,false,true],dashPose:[0,1,2],
        c:[[{src:'art/thun-1c1.webp',ax:123,ay:309,h:275,w:451,ih:310,ht:3},{src:'art/thun-1c2.webp',ax:112,ay:280,h:275,w:435,ih:280,ht:2},{src:'art/thun-1c3.webp',ax:234,ay:336,h:275,w:455,ih:341,ht:20}],
           [{src:'art/thun-2c1.webp',ax:144,ay:333,h:275,w:441,ih:355,ht:4},{src:'art/thun-2c2.webp',ax:111,ay:281,h:275,w:437,ih:281,ht:2},{src:'art/thun-2c3.webp',ax:179,ay:364,h:275,w:433,ih:366,ht:0}],
           [{src:'art/thun-3c1.webp',ax:209,ay:385,h:275,w:511,ih:406,ht:4},{src:'art/thun-3c2.webp',ax:125,ay:315,h:275,w:513,ih:316,ht:4},{src:'art/thun-3c3.webp',ax:259,ay:396,h:275,w:520,ih:398,ht:0}]],
        spell:[{vp:['#ffffff','#fff3b0','#ffd23a','#2a4fbf'],hand:[180,130],bySkill:[null,{shot:'art/fx-thun-bolt1.webp',sz:.6},null]},
               {vp:['#ffffff','#fff3b0','#ffd23a','#2a4fbf'],hand:[180,130],bySkill:[null,{shot:'art/fx-thun-bolt2.webp',sz:.6},null]},
               {vp:['#ffffff','#fff3b0','#ffd23a','#2a4fbf'],hand:[180,130],bySkill:[null,{shot:'art/fx-thun-bolt3.webp',sz:.6},null]}]},
  // Thalos (manta knight, chibi). LEGENDARY. Frames per form are [Coral-Lance Thrust, Water-Blade Volley, Deep Current].
  ray:{zoom:.36,eyeY:90,f:[{src:'art/ray-1.webp',ax:226,ay:485,h:479,w:473,ih:485,ht:3,cx:245,fy:150},{src:'art/ray-2.webp',ax:209,ay:513,h:479,w:475,ih:512,ht:3,cx:250,fy:150},{src:'art/ray-3.webp',ax:304,ay:551,h:479,w:601,ih:552,ht:3,cx:330,fy:175}],pose:'skill',
        c:[[{src:'art/ray-1c1.webp',ax:108,ay:273,h:275,w:443,ih:272,ht:0},{src:'art/ray-1c2.webp',ax:122,ay:281,h:275,w:454,ih:279,ht:3},{src:'art/ray-1c3.webp',ax:237,ay:308,h:275,w:488,ih:313,ht:15}],
           [{src:'art/ray-2c1.webp',ax:134,ay:285,h:275,w:455,ih:285,ht:3},{src:'art/ray-2c2.webp',ax:194,ay:315,h:275,w:439,ih:316,ht:3},{src:'art/ray-2c3.webp',ax:104,ay:337,h:275,w:453,ih:352,ht:7}],
           [{src:'art/ray-3c1.webp',ax:171,ay:352,h:275,w:494,ih:352,ht:3},{src:'art/ray-3c2.webp',ax:244,ay:355,h:275,w:487,ih:355,ht:3},{src:'art/ray-3c3.webp',ax:207,ay:413,h:275,w:494,ih:418,ht:7}]],
        spell:[{vp:['#ffffff','#d8f4ff','#5cc4f0','#1a4f8a'],hand:[190,110],support:'ring',bySkill:[{shot:'art/fx-ray-lance1.webp'},{shot:'art/fx-ray-blade1.webp',sz:.7},{burst:'art/fx-ray-wave1.webp',aoe:'sweep'}]},
               {vp:['#ffffff','#d8f4ff','#5cc4f0','#1a4f8a'],hand:[190,110],support:'ring',bySkill:[{shot:'art/fx-ray-lance2.webp'},{shot:'art/fx-ray-blade2.webp',sz:.7},{burst:'art/fx-ray-wave2.webp',aoe:'sweep'}]},
               {vp:['#ffffff','#d8f4ff','#5cc4f0','#1a4f8a'],hand:[190,110],support:'ring',bySkill:[{shot:'art/fx-ray-lance3.webp'},{shot:'art/fx-ray-blade3.webp',sz:.7},{burst:'art/fx-ray-wave3.webp',aoe:'sweep'}]}]},
  // Wick (candle sprite, chibi). Frames per form are [Wax Glob, Ember Spit, Flame Flick].
  wick:{zoom:.22,eyeY:135,f:[{src:'art/wick-1.webp',ax:191,ay:578,h:482,w:491,ih:583,ht:93,cx:265,fy:370},{src:'art/wick-2.webp',ax:189,ay:600,h:482,w:499,ih:604,ht:115,cx:268,fy:390},{src:'art/wick-3.webp',ax:187,ay:598,h:482,w:481,ih:602,ht:113,cx:268,fy:390}],pose:'skill',
        c:[[{src:'art/wick-1c1.webp',ax:122,ay:406,h:347,w:416,ih:409,ht:69},{src:'art/wick-1c2.webp',ax:122,ay:422,h:347,w:353,ih:423,ht:72},{src:'art/wick-1c3.webp',ax:122,ay:413,h:347,w:404,ih:416,ht:70}],
           [{src:'art/wick-2c1.webp',ax:128,ay:406,h:347,w:427,ih:409,ht:69},{src:'art/wick-2c2.webp',ax:129,ay:424,h:347,w:376,ih:425,ht:73},{src:'art/wick-2c3.webp',ax:129,ay:414,h:347,w:426,ih:417,ht:71}],
           [{src:'art/wick-3c1.webp',ax:130,ay:398,h:347,w:467,ih:400,ht:59},{src:'art/wick-3c2.webp',ax:129,ay:407,h:347,w:390,ih:408,ht:56},{src:'art/wick-3c3.webp',ax:130,ay:416,h:347,w:428,ih:418,ht:72}]],
        spell:[{vp:['#ffffff','#fff0c8','#ffa040','#c84a18'],hand:[115,153],bySkill:[{shot:'art/fx-wick-wax1.webp',sz:.55},{shot:'art/fx-wick-ember1.webp',sz:.45,hand:[100,125]},{shot:'art/fx-wick-flick1.webp',aoe:'fan',sz:.8}]},
               {vp:['#ffffff','#fff0c8','#ffa040','#c84a18'],hand:[115,153],bySkill:[{shot:'art/fx-wick-wax2.webp',sz:.55},{shot:'art/fx-wick-ember2.webp',sz:.45,hand:[100,125]},{shot:'art/fx-wick-flick2.webp',aoe:'fan',sz:.8}]},
               {vp:['#ffffff','#fff0c8','#ffa040','#c84a18'],hand:[115,153],bySkill:[{shot:'art/fx-wick-wax3.webp',sz:.55},{shot:'art/fx-wick-ember3.webp',sz:.45,hand:[100,125]},{shot:'art/fx-wick-flick3.webp',aoe:'fan',sz:.8}]}]},
  // Digby (mole digger, chibi). Frames per form are [Shovel Jab, Dirt-Clod Toss, Burrow Burst]:
  // the jab and the burrow are lunges (each in its own pose); the burrow erupts dirt under the target.
  mole:{zoom:.3,eyeY:110,release:[false,true,false],f:[{src:'art/mole-1.webp',ax:199,ay:471,h:466,w:483,ih:473,ht:2,cx:285,fy:190},{src:'art/mole-2.webp',ax:203,ay:479,h:466,w:488,ih:481,ht:2,cx:290,fy:190},{src:'art/mole-3.webp',ax:201,ay:477,h:466,w:481,ih:479,ht:2,cx:285,fy:190}],pose:'skill',melee:true,meleeSk:[true,false,true],dashPose:[0,1,2],slash:'dirt',
        impactSk:[null,null,true],
        c:[[{src:'art/mole-1c1.webp',ax:136,ay:330,h:327,w:365,ih:332,ht:2},{src:'art/mole-1c2.webp',ax:137,ay:333,h:327,w:392,ih:334,ht:3},{src:'art/mole-1c3.webp',ax:173,ay:223,h:327,w:366,ih:226,ht:3}],
           [{src:'art/mole-2c1.webp',ax:138,ay:334,h:327,w:373,ih:336,ht:2},{src:'art/mole-2c2.webp',ax:141,ay:335,h:327,w:400,ih:336,ht:3},{src:'art/mole-2c3.webp',ax:195,ay:224,h:327,w:387,ih:227,ht:3}],
           [{src:'art/mole-3c1.webp',ax:142,ay:339,h:327,w:384,ih:340,ht:1},{src:'art/mole-3c2.webp',ax:147,ay:338,h:327,w:418,ih:339,ht:2},{src:'art/mole-3c3.webp',ax:200,ay:236,h:327,w:399,ih:239,ht:3}]],
        spell:[{vp:['#fff1d6','#e0b07a','#9a6a3a','#4a2e18'],hand:[170,150],bySkill:[null,{shot:'art/fx-mole-clod1.webp',sz:.7,hand:[-60,150],arc:-110},null]},
               {vp:['#fff1d6','#e0b07a','#9a6a3a','#4a2e18'],hand:[170,150],bySkill:[null,{shot:'art/fx-mole-clod2.webp',sz:.7,hand:[-60,150],arc:-110},null]},
               {vp:['#fff1d6','#e0b07a','#9a6a3a','#4a2e18'],hand:[170,150],bySkill:[null,{shot:'art/fx-mole-clod3.webp',sz:.7,hand:[-60,150],arc:-110},null]}]},
  // Pip (mushroom scout, chibi). Frames per form are [Pebble Flick, Spore Puff, Spore Burst].
  shroom:{zoom:.26,eyeY:125,f:[{src:'art/shroom-1.webp',ax:215,ay:530,h:525,w:477,ih:531,ht:2,cx:270,fy:280},{src:'art/shroom-2.webp',ax:213,ay:533,h:525,w:471,ih:534,ht:2,cx:270,fy:280},{src:'art/shroom-3.webp',ax:236,ay:538,h:525,w:498,ih:539,ht:2,cx:290,fy:285}],pose:'skill',
        c:[[{src:'art/shroom-1c1.webp',ax:133,ay:359,h:345,w:389,ih:360,ht:2},{src:'art/shroom-1c2.webp',ax:132,ay:351,h:345,w:386,ih:351,ht:3},{src:'art/shroom-1c3.webp',ax:111,ay:327,h:345,w:390,ih:327,ht:2}],
           [{src:'art/shroom-2c1.webp',ax:137,ay:360,h:345,w:332,ih:361,ht:1},{src:'art/shroom-2c2.webp',ax:132,ay:354,h:345,w:384,ih:354,ht:3},{src:'art/shroom-2c3.webp',ax:115,ay:338,h:345,w:380,ih:336,ht:1}],
           [{src:'art/shroom-3c1.webp',ax:151,ay:367,h:345,w:458,ih:367,ht:2},{src:'art/shroom-3c2.webp',ax:149,ay:356,h:345,w:434,ih:355,ht:1},{src:'art/shroom-3c3.webp',ax:131,ay:343,h:345,w:456,ih:342,ht:2}]],
        spell:[{vp:['#ffffff','#f6ead2','#d9b98a','#8a5a30'],hand:[170,120],bySkill:[{shot:'art/fx-shroom-pebble1.webp',sz:.3},{shot:'art/fx-shroom-puff1.webp',sz:.75},{burst:'art/fx-shroom-burst1.webp',aoe:'erupt'}]},
               {vp:['#ffffff','#f6ead2','#d9b98a','#8a5a30'],hand:[170,120],bySkill:[{shot:'art/fx-shroom-pebble2.webp',sz:.3},{shot:'art/fx-shroom-puff2.webp',sz:.75},{burst:'art/fx-shroom-burst2.webp',aoe:'erupt'}]},
               {vp:['#ffffff','#f6ead2','#d9b98a','#8a5a30'],hand:[170,120],bySkill:[{shot:'art/fx-shroom-pebble3.webp',sz:.3},{shot:'art/fx-shroom-puff3.webp',sz:.75},{burst:'art/fx-shroom-burst3.webp',aoe:'erupt'}]}]},
  // Milo (spear farmhand, chibi). Frames per form are [Spear Thrust, Winding Sweep, Skycharge]:
  // thrust and skycharge are lunges (each in its own pose), the sweep swings across the enemy line.
  lance:{zoom:.55,eyeY:95,f:[{src:'art/lance-1.webp',ax:206,ay:587,h:583,w:486,ih:588,ht:1,cx:240,fy:140},{src:'art/lance-2.webp',ax:211,ay:587,h:583,w:488,ih:588,ht:1,cx:245,fy:140},{src:'art/lance-3.webp',ax:211,ay:587,h:583,w:520,ih:588,ht:1,cx:245,fy:140}],pose:'skill',melee:true,meleeSk:[true,false,true],dashPose:[0,1,2],slash:'spear',
        c:[[{src:'art/lance-1c1.webp',ax:123,ay:338,h:337,w:408,ih:338,ht:2},{src:'art/lance-1c2.webp',ax:149,ay:342,h:337,w:412,ih:342,ht:2},{src:'art/lance-1c3.webp',ax:185,ay:333,h:337,w:425,ih:339,ht:2}],
           [{src:'art/lance-2c1.webp',ax:134,ay:342,h:337,w:421,ih:342,ht:1},{src:'art/lance-2c2.webp',ax:156,ay:343,h:337,w:425,ih:343,ht:1},{src:'art/lance-2c3.webp',ax:185,ay:334,h:337,w:438,ih:340,ht:2}],
           [{src:'art/lance-3c1.webp',ax:136,ay:342,h:337,w:455,ih:342,ht:1},{src:'art/lance-3c2.webp',ax:159,ay:343,h:337,w:438,ih:343,ht:3},{src:'art/lance-3c3.webp',ax:185,ay:337,h:337,w:448,ih:343,ht:2}]],
        spell:[{vp:['#ffffff','#eef2e6','#b8c4a8','#4a5a3a'],hand:[150,140],bySkill:[null,{burst:'art/fx-lance-sweep1.webp',aoe:'sweep'},null]},
               {vp:['#ffffff','#eef2e6','#b8c4a8','#4a5a3a'],hand:[150,140],bySkill:[null,{burst:'art/fx-lance-sweep2.webp',aoe:'sweep'},null]},
               {vp:['#ffffff','#eef2e6','#b8c4a8','#4a5a3a'],hand:[150,140],bySkill:[null,{burst:'art/fx-lance-sweep3.webp',aoe:'sweep'},null]}]},
  // Wren (ranger, chibi). Frames per form are [Charged Arrow, Triple-Shot, Arrow Rain].
  bow:{zoom:.55,eyeY:95,f:[{src:'art/bow-1.webp',ax:222,ay:551,h:545,w:471,ih:550,ht:3,cx:215,fy:140},{src:'art/bow-2.webp',ax:218,ay:559,h:545,w:496,ih:560,ht:4,cx:215,fy:140},{src:'art/bow-3.webp',ax:271,ay:582,h:545,w:598,ih:583,ht:3,cx:300,fy:150}],pose:'skill',
        c:[[{src:'art/bow-1c1.webp',ax:156,ay:370,h:354,w:470,ih:370,ht:2},{src:'art/bow-1c2.webp',ax:156,ay:360,h:354,w:470,ih:359,ht:3},{src:'art/bow-1c3.webp',ax:214,ay:369,h:354,w:453,ih:374,ht:3}],
           [{src:'art/bow-2c1.webp',ax:152,ay:380,h:354,w:466,ih:380,ht:2},{src:'art/bow-2c2.webp',ax:150,ay:368,h:354,w:450,ih:367,ht:2},{src:'art/bow-2c3.webp',ax:214,ay:370,h:354,w:435,ih:376,ht:3}],
           [{src:'art/bow-3c1.webp',ax:182,ay:388,h:354,w:514,ih:388,ht:3},{src:'art/bow-3c2.webp',ax:206,ay:376,h:354,w:543,ih:376,ht:2},{src:'art/bow-3c3.webp',ax:254,ay:395,h:354,w:514,ih:408,ht:12}]],
        spell:[{vp:['#ffffff','#fff1c8','#f0b050','#3f6a4a'],hand:[190,175],bySkill:[{shot:'art/fx-bow-arrow1.webp'},{shot:'art/fx-bow-arrow1.webp',aoe:'fan'},{burst:'art/fx-bow-rain1.webp',aoe:'erupt'}]},
               {vp:['#ffffff','#fff1c8','#f0b050','#3f6a4a'],hand:[190,175],bySkill:[{shot:'art/fx-bow-arrow2.webp'},{shot:'art/fx-bow-arrow2.webp',aoe:'fan'},{burst:'art/fx-bow-rain2.webp',aoe:'erupt'}]},
               {vp:['#ffffff','#fff1c8','#f0b050','#3f6a4a'],hand:[190,175],bySkill:[{shot:'art/fx-bow-arrow3.webp'},{shot:'art/fx-bow-arrow3.webp',aoe:'fan'},{burst:'art/fx-bow-rain3.webp',aoe:'erupt'}]}]},
  // Rio (drummer duelist, chibi). Frames per form are [Rapid Lunge, Sonic Note Volley, Rhythm Burst].
  drum:{zoom:.62,eyeY:92,f:[{src:'art/drum-1.webp',ax:211,ay:551,h:545,w:486,ih:552,ht:3,cx:225,fy:110},{src:'art/drum-2.webp',ax:211,ay:552,h:545,w:576,ih:553,ht:2,cx:225,fy:110},{src:'art/drum-3.webp',ax:331,ay:552,h:545,w:680,ih:553,ht:2,cx:345,fy:110}],pose:'skill',melee:true,meleeSk:[true,false,false],dashPose:0,slash:'note',
        c:[[{src:'art/drum-1c1.webp',ax:134,ay:378,h:377,w:397,ih:382,ht:1},{src:'art/drum-1c2.webp',ax:134,ay:382,h:377,w:375,ih:386,ht:2},{src:'art/drum-1c3.webp',ax:134,ay:388,h:377,w:385,ih:392,ht:18}],
           [{src:'art/drum-2c1.webp',ax:144,ay:384,h:377,w:449,ih:387,ht:3},{src:'art/drum-2c2.webp',ax:147,ay:385,h:377,w:433,ih:389,ht:2},{src:'art/drum-2c3.webp',ax:148,ay:417,h:377,w:449,ih:422,ht:47}],
           [{src:'art/drum-3c1.webp',ax:170,ay:382,h:377,w:473,ih:387,ht:2},{src:'art/drum-3c2.webp',ax:163,ay:401,h:377,w:473,ih:405,ht:3},{src:'art/drum-3c3.webp',ax:165,ay:440,h:377,w:473,ih:454,ht:3}]],
        spell:[{vp:['#ffffff','#ffe2e6','#ff8fa3','#8e1c3a'],hand:[150,150],bySkill:[null,{shot:'art/fx-drum-note1.webp'},{burst:'art/fx-drum-wave1.webp',aoe:'sweep'}]},
               {vp:['#ffffff','#ffe2e6','#ff8fa3','#8e1c3a'],hand:[150,150],bySkill:[null,{shot:'art/fx-drum-note2.webp'},{burst:'art/fx-drum-wave2.webp',aoe:'sweep'}]},
               {vp:['#ffffff','#ffe2e6','#ff8fa3','#8e1c3a'],hand:[150,150],bySkill:[null,{shot:'art/fx-drum-note3.webp'},{burst:'art/fx-drum-wave3.webp',aoe:'sweep'}]}]},
  // Arlo (frost knight, chibi). Frames per form are [Frost Cleave, Ice-Lance Burst, Rune Ward].
  ice:{zoom:.55,eyeY:95,f:[{src:'art/ice-1.webp',ax:192,ay:572,h:569,w:484,ih:573,ht:0,cx:205,fy:135},{src:'art/ice-2.webp',ax:196,ay:572,h:569,w:511,ih:573,ht:1,cx:215,fy:135},{src:'art/ice-3.webp',ax:260,ay:573,h:569,w:635,ih:573,ht:1,cx:285,fy:135}],pose:'skill',melee:true,meleeSk:[true,false,false],dashPose:0,slash:'ice',
        c:[[{src:'art/ice-1c1.webp',ax:99,ay:355,h:308,w:397,ih:355,ht:29},{src:'art/ice-1c2.webp',ax:141,ay:314,h:308,w:464,ih:315,ht:3},{src:'art/ice-1c3.webp',ax:31,ay:421,h:308,w:382,ih:425,ht:3}],
           [{src:'art/ice-2c1.webp',ax:111,ay:365,h:308,w:446,ih:367,ht:39},{src:'art/ice-2c2.webp',ax:154,ay:314,h:308,w:513,ih:314,ht:3},{src:'art/ice-2c3.webp',ax:44,ay:440,h:308,w:408,ih:444,ht:4}],
           [{src:'art/ice-3c1.webp',ax:125,ay:399,h:308,w:483,ih:400,ht:72},{src:'art/ice-3c2.webp',ax:164,ay:368,h:308,w:552,ih:369,ht:56},{src:'art/ice-3c3.webp',ax:142,ay:449,h:308,w:489,ih:471,ht:7}]],
        spell:[{vp:['#ffffff','#e2f2ff','#7cc4ff','#1f4f9a'],hand:[150,140],support:'ring',bySkill:[null,{shot:'art/fx-ice-lance1.webp'},null]},
               {vp:['#ffffff','#e2f2ff','#7cc4ff','#1f4f9a'],hand:[150,140],support:'ring',bySkill:[null,{shot:'art/fx-ice-lance2.webp'},null]},
               {vp:['#ffffff','#e2f2ff','#7cc4ff','#1f4f9a'],hand:[150,140],support:'ring',bySkill:[null,{shot:'art/fx-ice-lance2.webp'},null]}]},
  // Chime (porcelain bell-keeper, chibi). Frames per form are [Soundwave, Ringing Shards, Resonance Burst].
  bell:{zoom:.45,eyeY:100,f:[{src:'art/bell-1.webp',ax:213,ay:542,h:538,w:448,ih:542,ht:1,cx:190,fy:190},{src:'art/bell-2.webp',ax:218,ay:542,h:538,w:487,ih:542,ht:1,cx:195,fy:190},{src:'art/bell-3.webp',ax:292,ay:606,h:538,w:629,ih:607,ht:2,cx:270,fy:250}],pose:'skill',
        c:[[{src:'art/bell-1c1.webp',ax:98,ay:303,h:279,w:346,ih:304,ht:1},{src:'art/bell-1c2.webp',ax:93,ay:283,h:279,w:322,ih:284,ht:1},{src:'art/bell-1c3.webp',ax:148,ay:285,h:279,w:425,ih:310,ht:31}],
           [{src:'art/bell-2c1.webp',ax:118,ay:341,h:279,w:418,ih:342,ht:29},{src:'art/bell-2c2.webp',ax:117,ay:290,h:279,w:416,ih:290,ht:3},{src:'art/bell-2c3.webp',ax:93,ay:354,h:279,w:400,ih:356,ht:33}],
           [{src:'art/bell-3c1.webp',ax:150,ay:401,h:279,w:498,ih:402,ht:27},{src:'art/bell-3c2.webp',ax:128,ay:326,h:279,w:494,ih:326,ht:3},{src:'art/bell-3c3.webp',ax:116,ay:419,h:279,w:501,ih:422,ht:9}]],
        spell:[{vp:['#ffffff','#e0fcff','#7fe3ef','#1f6f78'],hand:[150,175],support:'ring',bySkill:[{shot:'art/fx-bell-wave1.webp'},{shot:'art/fx-bell-shard1.webp'},{burst:'art/fx-bell-wave1.webp',aoe:'sweep'}]},
               {vp:['#ffffff','#e0fcff','#7fe3ef','#1f6f78'],hand:[150,175],support:'ring',bySkill:[{shot:'art/fx-bell-wave2.webp'},{shot:'art/fx-bell-shard2.webp'},{burst:'art/fx-bell-wave2.webp',aoe:'sweep'}]},
               {vp:['#ffffff','#e0fcff','#7fe3ef','#1f6f78'],hand:[150,175],support:'ring',bySkill:[{shot:'art/fx-bell-wave3.webp'},{shot:'art/fx-bell-shard3.webp'},{burst:'art/fx-bell-wave3.webp',aoe:'sweep'}]}]},
  // Tink (clockwork beetle, chibi). Frames per form are [Gear-Shot, Ricochet Volley, Cogblast].
  bug:{zoom:.4,eyeY:95,f:[{src:'art/bug-1.webp',ax:208,ay:550,h:545,w:472,ih:551,ht:2,cx:290,fy:195},{src:'art/bug-2.webp',ax:203,ay:553,h:545,w:479,ih:552,ht:3,cx:290,fy:195},{src:'art/bug-3.webp',ax:224,ay:601,h:545,w:548,ih:600,ht:2,cx:320,fy:245}],pose:'skill',
        c:[[{src:'art/bug-1c1.webp',ax:101,ay:336,h:304,w:397,ih:337,ht:2},{src:'art/bug-1c2.webp',ax:104,ay:309,h:304,w:411,ih:309,ht:2},{src:'art/bug-1c3.webp',ax:103,ay:300,h:304,w:435,ih:302,ht:3}],
           [{src:'art/bug-2c1.webp',ax:108,ay:338,h:304,w:429,ih:338,ht:3},{src:'art/bug-2c2.webp',ax:112,ay:315,h:304,w:444,ih:316,ht:3},{src:'art/bug-2c3.webp',ax:101,ay:300,h:304,w:460,ih:301,ht:1}],
           [{src:'art/bug-3c1.webp',ax:123,ay:374,h:304,w:484,ih:375,ht:3},{src:'art/bug-3c2.webp',ax:168,ay:343,h:304,w:545,ih:343,ht:7},{src:'art/bug-3c3.webp',ax:116,ay:364,h:304,w:541,ih:422,ht:47}]],
        spell:[{vp:['#ffffff','#d6fff2','#5fe0c0','#8a4a1e'],hand:[170,150],bySkill:[{shot:'art/fx-bug-gear1.webp'},{shot:'art/fx-bug-gear1.webp'},{burst:'art/fx-bug-blast1.webp',aoe:'sweep'}]},
               {vp:['#ffffff','#d6fff2','#5fe0c0','#8a4a1e'],hand:[170,150],bySkill:[{shot:'art/fx-bug-gear2.webp'},{shot:'art/fx-bug-gear2.webp'},{burst:'art/fx-bug-blast2.webp',aoe:'sweep'}]},
               {vp:['#ffffff','#d6fff2','#5fe0c0','#8a4a1e'],hand:[170,150],bySkill:[{shot:'art/fx-bug-gear3.webp'},{shot:'art/fx-bug-gear3.webp'},{burst:'art/fx-bug-blast3.webp',aoe:'sweep'}]}]},
  // Fern (grove sprite, chibi). Frames per form are [Root Snare, Seedburst, Rejuvenation Bloom].
  tree:{zoom:.5,eyeY:100,f:[{src:'art/tree-1.webp',ax:220,ay:564,h:559,w:509,ih:564,ht:2,cx:215,fy:120},{src:'art/tree-2.webp',ax:205,ay:565,h:559,w:491,ih:565,ht:3,cx:210,fy:120},{src:'art/tree-3.webp',ax:230,ay:613,h:559,w:603,ih:613,ht:2,cx:250,fy:165}],pose:'skill',
        c:[[{src:'art/tree-1c1.webp',ax:129,ay:322,h:305,w:472,ih:323,ht:3},{src:'art/tree-1c2.webp',ax:135,ay:314,h:305,w:471,ih:314,ht:6},{src:'art/tree-1c3.webp',ax:140,ay:397,h:305,w:433,ih:439,ht:10}],
           [{src:'art/tree-2c1.webp',ax:143,ay:330,h:305,w:472,ih:331,ht:2},{src:'art/tree-2c2.webp',ax:120,ay:349,h:305,w:439,ih:349,ht:21},{src:'art/tree-2c3.webp',ax:155,ay:405,h:305,w:424,ih:438,ht:2}],
           [{src:'art/tree-3c1.webp',ax:124,ay:356,h:305,w:504,ih:360,ht:1},{src:'art/tree-3c2.webp',ax:124,ay:366,h:305,w:503,ih:374,ht:10},{src:'art/tree-3c3.webp',ax:170,ay:405,h:305,w:463,ih:448,ht:1}]],
        spell:[{vp:['#ffffff','#f4ffd0','#a8dc5a','#3d6e1e'],hand:[150,140],support:'ring',bySkill:[{shot:'art/fx-tree-root1.webp'},{shot:'art/fx-tree-seed1.webp',aoe:'fan'},null]},
               {vp:['#ffffff','#f4ffd0','#a8dc5a','#3d6e1e'],hand:[150,140],support:'ring',bySkill:[{shot:'art/fx-tree-root2.webp'},{shot:'art/fx-tree-seed2.webp',aoe:'fan'},null]},
               {vp:['#ffffff','#f4ffd0','#a8dc5a','#3d6e1e'],hand:[150,140],support:'ring',bySkill:[{shot:'art/fx-tree-root3.webp'},{shot:'art/fx-tree-seed3.webp',aoe:'fan'},null]}]},
  // Nyx (moth, chibi). Frames per form are [Dusk Dash, Wingblade Volley, Nightfall Burst]:
  // a dashing dagger strike, a volley of painted wing-blades, and a crescent of night that sweeps the line.
  moth:{zoom:.5,eyeY:100,f:[{src:'art/moth-1.webp',ax:244,ay:522,h:517,w:500,ih:522,ht:2,cx:320,fy:99},{src:'art/moth-2.webp',ax:235,ay:522,h:517,w:480,ih:522,ht:2,cx:310,fy:99},{src:'art/moth-3.webp',ax:319,ay:560,h:517,w:596,ih:561,ht:2,cx:360,fy:132}],pose:'skill',melee:true,meleeSk:[true,false,false],dashPose:0,slash:'night',
        c:[[{src:'art/moth-1c1.webp',ax:134,ay:318,h:311,w:400,ih:318,ht:3},{src:'art/moth-1c2.webp',ax:117,ay:317,h:311,w:407,ih:318,ht:3},{src:'art/moth-1c3.webp',ax:110,ay:352,h:311,w:450,ih:384,ht:24}],
           [{src:'art/moth-2c1.webp',ax:146,ay:312,h:311,w:421,ih:313,ht:3},{src:'art/moth-2c2.webp',ax:130,ay:318,h:311,w:423,ih:318,ht:3},{src:'art/moth-2c3.webp',ax:115,ay:350,h:311,w:413,ih:399,ht:17}],
           [{src:'art/moth-3c1.webp',ax:188,ay:377,h:311,w:515,ih:379,ht:3},{src:'art/moth-3c2.webp',ax:182,ay:333,h:311,w:558,ih:334,ht:1},{src:'art/moth-3c3.webp',ax:165,ay:402,h:311,w:552,ih:457,ht:8}]],
        spell:[{vp:['#ffffff','#e6dcff','#a98bff','#3b2385'],hand:[150,125],bySkill:[null,{shot:'art/fx-moth-blade1.webp'},{burst:'art/fx-moth-moon1.webp',aoe:'sweep'}]},
               {vp:['#ffffff','#e6dcff','#a98bff','#3b2385'],hand:[150,125],bySkill:[null,{shot:'art/fx-moth-blade2.webp'},{burst:'art/fx-moth-moon2.webp',aoe:'sweep'}]},
               {vp:['#ffffff','#e6dcff','#a98bff','#3b2385'],hand:[150,125],bySkill:[null,{shot:'art/fx-moth-blade3.webp'},{burst:'art/fx-moth-moon3.webp',aoe:'sweep'}]}]},
  // Crag (ram, chibi). Frames per form are [Seismic Strike, Crystal Burst, Earthen Bulwark]:
  // the strike is a hammer lunge that bursts rock spikes under the target, the burst throws painted crystals.
  ram:{zoom:.42,eyeY:112,f:[{src:'art/ram-1.webp',ax:347,ay:858,h:853,w:920,ih:857,ht:2,cx:500,fy:258,sc:2.8721},{src:'art/ram-2.webp',ax:130,ay:297,h:297,w:262,ih:304,ht:2,cx:175,fy:97},{src:'art/ram-3.webp',ax:145,ay:307,h:297,w:338,ih:317,ht:2,cx:200,fy:118}],pose:'skill',melee:true,meleeSk:[true,false,false],dashPose:0,
        impact:['art/fx-ram-rock1.webp','art/fx-ram-rock2.webp','art/fx-ram-rock3.webp'],
        c:[[{src:'art/ram-1c1.webp',ax:110,ay:300,h:297,w:405,ih:321,ht:2},{src:'art/ram-1c2.webp',ax:105,ay:297,h:297,w:425,ih:303,ht:2},{src:'art/ram-1c3.webp',ax:115,ay:377,h:297,w:388,ih:388,ht:2}],
           [{src:'art/ram-2c1.webp',ax:125,ay:318,h:297,w:436,ih:334,ht:3},{src:'art/ram-2c2.webp',ax:130,ay:297,h:297,w:427,ih:304,ht:2},{src:'art/ram-2c3.webp',ax:120,ay:392,h:297,w:408,ih:412,ht:1}],
           [{src:'art/ram-3c1.webp',ax:155,ay:392,h:297,w:516,ih:433,ht:67},{src:'art/ram-3c2.webp',ax:145,ay:307,h:297,w:520,ih:317,ht:2},{src:'art/ram-3c3.webp',ax:155,ay:430,h:297,w:501,ih:447,ht:1}]],
        spell:[{vp:['#fff6e0','#f3d9a8','#d98a4a','#5a3a22'],hand:[150,120],support:'ring',bySkill:[null,{shot:'art/fx-ram-shard1.webp'},null]},
               {vp:['#fff6e0','#f3d9a8','#d98a4a','#5a3a22'],hand:[150,120],support:'ring',bySkill:[null,{shot:'art/fx-ram-shard2.webp'},null]},
               {vp:['#fff6e0','#f3d9a8','#d98a4a','#5a3a22'],hand:[150,120],support:'ring',bySkill:[null,{shot:'art/fx-ram-shard3.webp'},null]}]},
  // Kai (sea turtle, chibi). Frames per form are [Tidal Thrust, Shellspin Wave, Guardian Current]:
  // the thrust fires the painted water spear, the wave rolls across the enemy line, the current rings his allies.
  turtle:{zoom:.5,eyeY:100,f:[{src:'art/turtle-1.webp',ax:223,ay:430,h:425,w:485,ih:431,ht:2,cx:270,fy:100},{src:'art/turtle-2.webp',ax:228,ay:430,h:425,w:474,ih:431,ht:3,cx:270,fy:95},{src:'art/turtle-3.webp',ax:264,ay:568,h:425,w:616,ih:567,ht:2,cx:345,fy:205}],pose:'skill',
        c:[[{src:'art/turtle-1c1.webp',ax:117,ay:266,h:262,w:435,ih:267,ht:1},{src:'art/turtle-1c2.webp',ax:107,ay:318,h:262,w:366,ih:318,ht:56},{src:'art/turtle-1c3.webp',ax:156,ay:370,h:262,w:360,ih:398,ht:54}],
           [{src:'art/turtle-2c1.webp',ax:138,ay:267,h:262,w:430,ih:268,ht:2},{src:'art/turtle-2c2.webp',ax:118,ay:317,h:262,w:406,ih:322,ht:53},{src:'art/turtle-2c3.webp',ax:163,ay:372,h:262,w:390,ih:407,ht:62}],
           [{src:'art/turtle-3c1.webp',ax:169,ay:330,h:262,w:543,ih:330,ht:8},{src:'art/turtle-3c2.webp',ax:171,ay:361,h:262,w:533,ih:380,ht:38},{src:'art/turtle-3c3.webp',ax:206,ay:405,h:262,w:506,ih:487,ht:88}]],
        spell:[{vp:['#ffffff','#dffaff','#6fe0f5','#1a7fa8'],hand:[160,152],support:'ring',bySkill:[{shot:'art/fx-tt-spear1.webp',burst:'art/fx-tt-wave1.webp'},{burst:'art/fx-tt-wave1.webp',aoe:'sweep'},null]},
               {vp:['#ffffff','#dffaff','#6fe0f5','#1a7fa8'],hand:[160,152],support:'ring',bySkill:[{shot:'art/fx-tt-spear2.webp',burst:'art/fx-tt-wave2.webp'},{burst:'art/fx-tt-wave2.webp',aoe:'sweep'},null]},
               {vp:['#ffffff','#dffaff','#6fe0f5','#1a7fa8'],hand:[160,152],support:'ring',bySkill:[{shot:'art/fx-tt-spear3.webp',burst:'art/fx-tt-wave3.webp'},{burst:'art/fx-tt-wave3.webp',aoe:'sweep'},null]}]},
  // Ren (fire fox, chibi). Frames per form are [Ember Slash, Foxfire Bolt, Flame Ward];
  // the slash is a lunge, the bolt throws the painted fireball, the ward rings every ally in fire.
  fox:{zoom:.48,eyeY:100,f:[{src:'art/fox-1.webp',ax:253,ay:554,h:549,w:486,ih:555,ht:2,cx:305,fy:205},{src:'art/fox-2.webp',ax:243,ay:554,h:549,w:488,ih:554,ht:2,cx:295,fy:205},{src:'art/fox-3.webp',ax:231,ay:554,h:549,w:493,ih:555,ht:2,cx:283,fy:205}],pose:'skill',melee:true,meleeSk:[true,false,false],dashPose:0,slash:'fire',
        c:[[{src:'art/fox-1c1.webp',ax:173,ay:382,h:377,w:418,ih:383,ht:2},{src:'art/fox-1c2.webp',ax:180,ay:393,h:388,w:407,ih:393,ht:2},{src:'art/fox-1c3.webp',ax:172,ay:397,h:373,w:370,ih:397,ht:21}],
           [{src:'art/fox-2c1.webp',ax:180,ay:386,h:382,w:434,ih:385,ht:1},{src:'art/fox-2c2.webp',ax:186,ay:394,h:389,w:445,ih:395,ht:2},{src:'art/fox-2c3.webp',ax:195,ay:425,h:374,w:464,ih:444,ht:48}],
           [{src:'art/fox-3c1.webp',ax:192,ay:392,h:386,w:488,ih:392,ht:3},{src:'art/fox-3c2.webp',ax:189,ay:396,h:390,w:510,ih:396,ht:3},{src:'art/fox-3c3.webp',ax:219,ay:449,h:376,w:492,ih:491,ht:70}]],
        spell:[{vp:['#ffffff','#fff0b8','#ffb347','#e0461c'],hand:[118,92],support:'flameward',bySkill:[null,{shot:'art/fx-fox-ball1.webp',burst:'art/fx-fox-ball1.webp'},null]},
               {vp:['#ffffff','#fff0b8','#ffb347','#e0461c'],hand:[118,92],support:'flameward',bySkill:[null,{shot:'art/fx-fox-ball2.webp',burst:'art/fx-fox-ball2.webp'},null]},
               {vp:['#ffffff','#fff0b8','#ffb347','#e0461c'],hand:[118,92],support:'flameward',bySkill:[null,{shot:'art/fx-fox-ball3.webp',burst:'art/fx-fox-ball3.webp'},null]}]},
};
(function(){
  const preload=()=>{if(typeof RL_CUT!=='undefined')for(const id in RL_CUT)for(const st in RL_CUT[id])for(const k in RL_CUT[id][st]){const c=RL_CUT[id][st][k];if(c.b){const i=new Image();i.src=c.b;(window.__rlPre=window.__rlPre||[]).push(i)}}for(const id in RL_ART)[...RL_ART[id].f,...(RL_ART[id].fv||[])].forEach(f=>{const i=new Image();i.decoding='async';i.src=f.src;(window.__rlPre=window.__rlPre||[]).push(i)})};preload();
  const lvOf=(id,o)=>o.lv!=null?o.lv:(o.stage!=null?[1,CR_EVO[0],CR_EVO[1]][o.stage]:crLv(id));
  const oldPort=rlHeroSVG,oldBody=rlHeroBody;
  // card portrait: element backdrop, figure shown head to knees
  rlHeroSVG=function(id,opt){const A=RL_ART[id];if(!A)return oldPort(id,opt);
    const o=opt||{},h=RL_H[id],E=RL_EL[h.el],lv=lvOf(id,o),s=crStage(lv),F=A.f[s],u='ra'+id+s;
    // zoom to head-to-knees, but never wider than the card, and centre the whole picture
    // (body plus any floating effects) so nothing gets cut off at the sides
    const CF=A.card||{},fl=CF.floor||208,kk=Math.min((CF.tall||186)/F.ih,188/F.w),W=F.w*kk,H=F.ih*kk,x=100-W/2,y=fl-H; // card:{floor,tall} for heroes whose weapon towers over them (Kestran's spear) // whole figure, same fit rule for every creature: feet on the card's floor, centred // one zoom per hero; every form's eyes sit on the same line
    const motes=o.motes===false?'':[[.1,.2,2.6,0],[.16,.7,2,1.2],[.86,.16,2.2,.6],[.08,.48,1.6,2],[.9,.66,1.8,1.6]].map(m=>`<circle class="rl-mote" cx="${m[0]*200}" cy="${m[1]*220}" r="${m[2]*1.3}" fill="${E.l}" style="animation-delay:-${m[3]}s"/>`).join('');
    return`<svg class="rl-port cr-port rl-art" viewBox="0 0 200 220" role="img" aria-label="${esc(crName(id,lv))}"><defs><radialGradient id="${u}bg" cx=".5" cy=".45" r=".8"><stop offset="0" stop-color="${E.l}" stop-opacity=".6"/><stop offset=".45" stop-color="${E.c}" stop-opacity=".55"/><stop offset="1" stop-color="${E.d}"/></radialGradient></defs><rect class="crbg" width="200" height="220" fill="#0f0d14"/><rect class="crbg" width="200" height="220" fill="url(#${u}bg)"/>${motes}<image href="${F.src}" x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${W.toFixed(1)}" height="${H.toFixed(1)}" preserveAspectRatio="none"/></svg>`};
  // battle sprite: a canvas the motion loop below draws into
  rlHeroBody=function(id,lv){const A=RL_ART[id];if(!A)return oldBody(id,lv);
    const L=lv==null?crLv(id):lv,s=crStage(L);setTimeout(artLoop,0);
    return`<div class="rl-body rl-artbox" data-id="${id}" data-s="${s}" role="img" aria-label="${esc(crName(id,L))}"><canvas class="rl-artcv"></canvas></div>`};
  // name tags and hit boxes: painted heroes stand about 224 tall on the 240 sprite box
  const oldBox=crBoxOf;crBoxOf=function(u){if(u.kind==='hero'&&RL_ART[u.id])return{box:[0,crStage(u.lv)===2?0:6,240,228]};return oldBox(u)};
  for(const k in RL_PC)delete RL_PC[k];
})();

/* ---------- living art: breathing, sway, spell casts, hits ----------
   The picture is cut into thin horizontal strips and each strip is
   nudged, so the figure can lean, stretch and sway as one body.
   Feet stay planted at y 228 of the 240-wide sprite box. */
const ART_IMG={};
function artImg(src){let i=ART_IMG[src];if(!i){i=ART_IMG[src]=new Image();i.src=src}return i.complete&&i.naturalWidth?i:null}
const ART_ST=new WeakMap();let artRaf=0;
const AX0=-140,AY0=-80,AW=560,AH=330,STRIPS=72;
const CAST_T=[0,70,260,320,480,520,950,1100,1150]; // reach in, hold, to charge, hold, to release (spell fires at 500), hold, back out, end
function rlArtLead(id){const A=RL_ART[id];return A&&A.c&&A.c.some(x=>x&&x.length)?260:0}
const aEase=k=>k<0?0:k>1?1:k*k*(3-2*k),aBack=k=>{k=Math.min(1,Math.max(0,k));const c=1.7;return 1+(c+1)*Math.pow(k-1,3)+c*Math.pow(k-1,2)};
function artPose(st,now,speed){ // the figure's shape at this moment
  const t=(now+st.ph)/1000,P={lean:0,sy:1,sx:1,chest:0,sway:0,drift:0,glow:0,pose:0,ring:0};
  if(!STILL){P.chest=.014*Math.sin(t*2.2);P.sy=1+.007*Math.sin(t*2.2);P.sway=1.7;P.drift=1.3*Math.sin(t*.8)}
  if(st.cast>=0&&st.frames&&st.mode==='skill'){const T=(now-st.cast)*speed,i=Math.max(0,Math.min(2,st.sk|0));
    if(T>=1150)st.cast=-1;else{const fi=Math.min(1,T/90),fo=T>1000?Math.min(1,(T-1000)/150):0;
      P.seq=fo>0?[[i,1-fo],[-1,fo]]:fi<1?[[-1,1-fi],[i,fi]]:[[i,1]];
      // throw follow-through: snap from the wind-up frame to the standing pose with a forward lunge as the shot leaves
      const CT=st.cut&&st.cut[i];
      if(CT&&CT.b&&T>=470&&fo<=0){const r=Math.min(1,(T-470)/80);P.seq=r<1?[[i+10,1],[i,1-r]]:[[i+10,1]]}
      else if(CT&&CT.b&&fo>0)P.seq=[[i+10,1-fo],[-1,fo]];
      if(((st.rel&&st.rel[i])||(CT&&CT.snap))&&T>=440){const r=Math.min(1,(T-440)/70);P.seq=r<1?[[i,1-r],[-1,r]]:[[-1,1]];P.lean+=(STILL?0:22)*Math.exp(-(T-440)/160)}P.pulse=T>200&&T<700?.02*Math.sin((T-200)/40):0;P.kick=T>480&&T<900?Math.exp(-(T-480)/140):0;
      P.ring=Math.min(1,T/120)*(1-fo);P.glow=0}}
  else if(st.dashOn&&st.frames&&st.dashPose!=null){P.seq=[[Array.isArray(st.dashPose)?st.dashPose[st.sk||0]:st.dashPose,1]];P.lean=0}
  else if(st.cast>=0&&st.frames){const T=(now-st.cast)*speed,C=CAST_T;
    if(T>=C[8])st.cast=-1;else{const seg=(a,b)=>Math.min(1,Math.max(0,(T-C[a])/(C[b]-C[a])));
      P.seq=T<C[1]?[[-1,1-seg(0,1)],[0,seg(0,1)]]:T<C[2]?[[0,1]]:T<C[3]?[[0,1-seg(2,3)],[1,seg(2,3)]]:T<C[4]?[[1,1]]:T<C[5]?[[1,1-seg(4,5)],[2,seg(4,5)]]:T<C[6]?[[2,1]]:T<C[7]?[[2,1-seg(6,7)],[-1,seg(6,7)]]:[[-1,1]];
      P.pulse=T>C[3]&&T<C[5]?.025*Math.sin((T-C[3])/30):0;P.kick=T>C[5]&&T<C[6]?Math.exp(-(T-C[5])/120):0;
      P.ring=Math.min(1,T/120)*(T>C[6]?1-seg(6,7):1);P.glow=T<C[5]?.25*seg(0,4):0}}
  else if(st.cast>=0){const D=1050/speed,k=(now-st.cast)/D;
    if(k>=1)st.cast=-1;else{const m=STILL?0:1;
      if(k<.22){const e=aEase(k/.22);P.lean=-11*e*m;P.sy*=1-.045*e*m;P.glow=.35*e;P.ring=e}
      else if(k<.38){const e=aEase((k-.22)/.16);P.lean=(-11+35*e)*m;P.sy*=(.955+.105*e*m);P.glow=.35+.65*e;P.ring=1}
      else if(k<.74){const e=(k-.38)/.36;P.lean=(24-8*e)*m;P.sy*=1+(.06-.03*e)*m;P.glow=1;P.ring=1}
      else{const e=aBack((k-.74)/.26);P.lean=16*(1-e)*m;P.sy*=1+.03*(1-e)*m;P.glow=1-e;P.ring=1-e}
      P.pose=k<.3?0:k<.38?(k-.3)/.08:k<.78?1:k<.86?1-(k-.78)/.08:0}}
  if(st.dash>=0){const k=Math.min(1,(now-st.dash)/300);P.lean+=STILL?0:16*Math.sin(Math.PI*Math.min(k*1.4,1));if(k>=1&&!st.dashOn)st.dash=-1}
  if(st.hit>=0){const k=(now-st.hit)/(380/speed);if(k>=1)st.hit=-1;else{const e=Math.sin(Math.PI*k)*(STILL?0:1);P.sy*=1-.075*e;P.sx*=1+.05*e;P.lean-=9*e}}
  return P}
function artDraw(cv,now){
  const box=cv.parentNode,id=box.dataset.id,s=+box.dataset.s,A=RL_ART[id];if(!A)return;
  const unit0=cv.closest('.rlb-u'),veil=!!(A.fv&&unit0&&unit0.classList.contains('veiled')); // Veiled: the phased-out still pose
  const F0=(veil?A.fv:A.f)[s],img=artImg(F0.src);if(!img)return;if(A.fv)artImg(A.fv[s].src);const FR=A.c&&A.c[s]&&A.c[s].length?A.c[s]:null;if(FR)FR.forEach(f=>artImg(f.src));
  const dpr=Math.min(2,window.devicePixelRatio||1),cw=Math.round(cv.clientWidth*dpr),ch=Math.round(cv.clientHeight*dpr);if(!cw||!ch)return;
  if(cv.width!==cw||cv.height!==ch){cv.width=cw;cv.height=ch}
  const spr=cv.closest('.rlb-spr'),unit=cv.closest('.rlb-u'),b=typeof rlUI==='function'&&rlUI().b,speed=b&&b.speed||1,dir=unit&&unit.classList.contains('e')?-1:1;
  let st=ART_ST.get(cv);if(!st){st={ph:Math.random()*9000,cast:-1,hit:-1,dash:-1,buf:document.createElement('canvas')};ART_ST.set(cv,st);
    // the battle re-adds these classes within one frame, so watch each change
    const watch=(el,cls,key)=>{if(!el)return;new MutationObserver(rs=>{for(const r of rs)if(!(r.oldValue||'').split(' ').includes(cls)&&el.classList.contains(cls)){st[key]=performance.now();break}}).observe(el,{attributes:true,attributeFilter:['class'],attributeOldValue:true})};
    watch(spr,'cast','cast');new MutationObserver(()=>{if(spr&&spr.dataset.sk!=null)st.sk=+spr.dataset.sk}).observe(spr,{attributes:true,attributeFilter:['data-sk']});if(spr&&spr.dataset.sk!=null)st.sk=+spr.dataset.sk;watch(unit,'hit','hit');watch(spr,'dash','dash')}
  st.dashOn=!!(spr&&spr.classList.contains('dash'));st.mode=A.pose||'seq';st.dashPose=A.dashPose;st.rel=A.release;st.cut=typeof RL_CUT!=='undefined'&&RL_CUT[id]&&RL_CUT[id][s]||null;st.frames=!!(FR&&FR.every(f=>artImg(f.src)));
  const P=artPose(st,now,speed),E=RL_EL[RL_H[id].el],t=(now+st.ph)/1000;
  const sc=cw/AW,buf=st.buf;if(buf.width!==cw||buf.height!==ch){buf.width=cw;buf.height=ch}
  const g=buf.getContext('2d');g.setTransform(1,0,0,1,0,0);g.clearRect(0,0,cw,ch);g.setTransform(sc,0,0,sc,-AX0*sc,-AY0*sc);
  const strips=(im,alpha)=>{const iw=im.naturalWidth,ih=im.naturalHeight,k=(s===2?238:224)/F0.h*iw/F0.w,ky=k*P.sy;g.globalAlpha=alpha;
    // k converts file pixels to sprite units; the anchor (ax,ay) between the feet lands on (120,228)
    const ax=F0.ax*iw/F0.w,ay=F0.ay*ih/F0.ih,fh=F0.h*iw/F0.w;
    for(let i=0;i<STRIPS;i++){const sy0=i*ih/STRIPS,sy1=(i+1)*ih/STRIPS,v=Math.max(0,(ay-(sy0+sy1)/2)/fh),y0=228-(ay-sy0)*ky,y1=228-(ay-sy1)*ky,
      cape=v<.55?Math.sin(Math.PI*v/.55):0,off=dir*P.lean*Math.pow(Math.min(v,1.2),1.3)+P.sway*Math.sin(t*1.7+v*4)*cape+P.drift*v*v,
      sx=P.sx*(1+P.chest*Math.exp(-Math.pow((v-.68)/.12,2)));
      g.drawImage(im,0,sy0,iw,sy1-sy0+.6,120-ax*k*sx+off,y0,iw*k*sx,y1-y0+.7)}};
  const Hs=s===2?238:224,frame=(f,al,fi)=>{const im=artImg(f.src),k=Hs/f.h*(1+(P.pulse||0));g.save();g.globalAlpha=al*(veil&&fi!==2?.5:1);g.translate(120-dir*7*(P.kick||0),228);g.scale(dir*k,k);g.drawImage(im,-f.ax,-f.ay);g.restore()};
  if(P.seq)P.seq.forEach(([i,al])=>{if(al<=0)return;if(i<0)strips(img,al);else if(i>=10){const C=st.cut&&st.cut[i-10],F=FR[i-10];if(C&&C.b){const im=artImg(C.b);if(im)frame(Object.assign({},F,{src:C.b}),al,i-10);else frame(F,al,i-10)}}else frame(FR[i],al,i)});else strips(img,1);g.globalAlpha=1;
  const c=cv.getContext('2d');c.setTransform(1,0,0,1,0,0);c.clearRect(0,0,cw,ch);
  if(P.ring>0){c.setTransform(sc,0,0,sc,-AX0*sc,-AY0*sc);c.save();c.translate(120,229);c.scale(1,.24);{const rg=c.createRadialGradient(0,0,0,0,0,80);rg.addColorStop(0,E.l);rg.addColorStop(.5,E.c);rg.addColorStop(1,'rgba(0,0,0,0)');c.globalAlpha=.45*P.ring;c.fillStyle=rg;c.beginPath();c.arc(0,0,80,0,7);c.fill()}c.globalAlpha=P.ring;c.strokeStyle=E.l;c.shadowColor=E.c;c.shadowBlur=14;
    const r=46+20*Math.min(1,P.ring*1.3);c.lineWidth=4.5;c.beginPath();c.arc(0,0,r,0,7);c.stroke();c.lineWidth=1.6;c.setLineDash([10,7]);c.rotate(t*2.4);c.beginPath();c.arc(0,0,r*.74,0,7);c.stroke();c.setLineDash([]);
    for(let k=0;k<8;k++){const a=k/8*6.283-t*1.6;c.beginPath();c.arc(Math.cos(a)*r*.88,Math.sin(a)*r*.88,2.6,0,7);c.fillStyle=E.l;c.fill()}c.restore();c.setTransform(1,0,0,1,0,0)}
  if(P.glow>0){c.save();c.shadowColor=E.c;c.shadowBlur=26*P.glow*sc;c.drawImage(buf,0,0);c.restore();c.globalCompositeOperation='lighter';c.globalAlpha=.22*P.glow;c.drawImage(buf,0,0);c.globalCompositeOperation='source-over';c.globalAlpha=1}
  else{if(veil)c.globalAlpha=.8+.12*Math.sin(t*3.1);c.drawImage(buf,0,0);c.globalAlpha=1}}
function artLoop(){if(artRaf)return;const step=now=>{const cvs=document.querySelectorAll('.rl-artcv');if(!cvs.length){artRaf=0;return}cvs.forEach(cv=>{try{artDraw(cv,now)}catch(e){}});artRaf=requestAnimationFrame(step)};artRaf=requestAnimationFrame(step)}
(function(){const st=document.createElement('style');st.textContent=`
.rl-artbox{position:relative;width:100%;height:100%}
.rl-artcv{position:absolute;left:-58.333%;top:-33.333%;width:233.333%;height:137.5%;pointer-events:none}
.rlb-u.a .rlb-spr:has(.rl-artbox){animation:none}
.rlb-spr.cast:has(.rl-artbox){animation:none!important}`;document.head.appendChild(st)})();

/* ---------- spells that match the art ---------- */
function rlArtSpell(u){const A=RL_ART[u.id];if(!A||!A.spell)return null;const st=crStage(u.lv||crLv(u.id)),S=A.spell[st];if(!S)return null;
  const key='art_'+u.id+st;if(!RL_VP[key])RL_VP[key]=S.vp;return Object.assign({key,uid:u.uid,side:u.side,big:st===2,hid:u.id,st},S)}
function rlArtHand(S){const f=rlbPt(S.uid,'foot');if(!f)return null;const d=S.side?-1:1,k=f.w/240;return{x:f.x+d*S.hand[0]*k,y:f.y-(12+S.hand[1])*k,d,k}}
async function rlArtFire(S,e,sk,ult){const h=rlArtHand(S);if(!h)return;const pts=e.t.map(t=>rlbPt(t)).filter(Boolean);if(!pts.length)return;
  if(sk.tg==='eA'&&S.aoe==='starfall')return vfxStarfall(h,pts,S);
  if(sk.tg==='eA'&&S.aoe==='bloom')return vfxBloom(h,e.t,S);
  if(S.kind==='roots')return Promise.all(e.t.map((t,i)=>new Promise(r=>setTimeout(()=>vfxRoots(h,S.uid,t,S).then(r),i*90/vSp()))));
  const n=sk.tg==='eA'?1:Math.min(3,sk.h||1),sp=vSp(),jobs=[];
  for(const tp of pts)for(let i=0;i<n;i++)jobs.push(new Promise(r=>setTimeout(()=>vfxArtShot(h,tp,S,ult).then(r),(i*110+pts.indexOf(tp)*60)/sp)));
  await Promise.all(jobs)}
function vfxArtShot(h,tp,S,big){if(S.kind==='needle')return new Promise(r=>vfxNeedle(h,tp,S,big,Math.max(1,h.k*1.9)*(big?1.2:1),r));const P=S.vp,sp=vSp(),x0=h.x,y0=h.y,x1=tp.x,y1=tp.y,ang=Math.atan2(y1-y0,x1-x0),ca=Math.cos(ang),sa=Math.sin(ang),dist=Math.hypot(x1-x0,y1-y0),K=h.k*(big?1.25:1);
  // a short muzzle flash at the hand
  vfxP({x:x0,y:y0,life:.25,s:6*K,grow:160*K,c:P[2],shape:'shock'});for(let i=0;i<10;i++){const a=ang+vR(-.6,.6),v=vR(80,240)*K;vfxP({x:x0,y:y0,vx:Math.cos(a)*v,vy:Math.sin(a)*v,drag:.88,life:vR(.15,.35),s:vR(2,4)*K,c:rlRand(P)})}
  const shapes=S.kind==='shards'?(big?[0,-.09,.09,-.17,.17]:[0,-.1,.1]).map((o,i)=>({o,lag:i*.06,len:vR(26,38)})):[{o:0,lag:0,len:S.kind==='lance'?78:96}];
  const dur=(S.kind==='bolt'?.24:S.kind==='lance'?.3:.34)/sp;let t=0;
  return new Promise(res=>{VFX.items.push({step(dt,c){t+=dt;let alldone=true;c.save();c.globalCompositeOperation='lighter';
    for(const s of shapes){const k=Math.max(0,Math.min(1,(t-s.lag/sp)/dur));if(k<1)alldone=false;if(t<s.lag/sp)continue;
      const a=ang+s.o*(1-k),x=x0+Math.cos(a)*dist*k,y=y0+Math.sin(a)*dist*k-(S.kind==='shards'?Math.sin(k*Math.PI)*dist*.06*Math.sign(s.o||1)*(s.o?1:0):0),L=s.len*K;
      c.save();c.translate(x,y);c.rotate(a);
      if(S.kind==='bolt'){ // streak of green energy with a bright head
        const g=c.createLinearGradient(-L*1.6,0,L*.3,0);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(.6,P[3]);g.addColorStop(.85,P[2]);g.addColorStop(1,P[0]);
        c.fillStyle=g;c.beginPath();c.moveTo(L*.3,0);c.quadraticCurveTo(-L*.2,-9*K,-L*1.6,0);c.quadraticCurveTo(-L*.2,9*K,L*.3,0);c.fill();
        c.fillStyle=P[0];c.beginPath();c.ellipse(0,0,10*K,5*K,0,0,6.283);c.fill();
        if(Math.random()<.9)vfxP({x,y,vx:-ca*vR(40,120)+vR(-40,40),vy:-sa*vR(40,120)+vR(-40,40),life:vR(.25,.5),s:vR(3,6)*K,c:rlRand(P),shape:'leaf',vr:vR(-8,8)})}
      else if(S.kind==='lance'){ // a spear of golden light
        const g=c.createLinearGradient(-L*1.8,0,0,0);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,P[2]);c.fillStyle=g;c.fillRect(-L*1.8,-4*K,L*1.8,8*K);
        c.fillStyle=P[2];c.beginPath();c.moveTo(L*.55,0);c.lineTo(0,-8*K);c.lineTo(-L*.45,0);c.lineTo(0,8*K);c.closePath();c.fill();
        c.fillStyle=P[0];c.beginPath();c.moveTo(L*.5,0);c.lineTo(0,-3.5*K);c.lineTo(-L*.35,0);c.lineTo(0,3.5*K);c.closePath();c.fill();
        c.fillStyle=P[1];c.fillRect(-L*.5,-11*K,4*K,22*K);
        vfxP({x:x-ca*L*.3,y:y-sa*L*.3,vx:vR(-20,20),vy:vR(-20,20),life:vR(.2,.35),s:vR(2,4)*K,c:rlRand(P),shape:'star',vr:6})}
      else{ // a crystal shard
        c.fillStyle=P[3];c.beginPath();c.moveTo(L*.6,0);c.lineTo(-L*.1,-7*K);c.lineTo(-L*.5,0);c.lineTo(-L*.1,7*K);c.closePath();c.fill();
        c.fillStyle=P[1];c.beginPath();c.moveTo(L*.55,0);c.lineTo(-L*.05,-4.5*K);c.lineTo(-L*.4,0);c.closePath();c.fill();
        c.fillStyle=P[0];c.beginPath();c.moveTo(L*.5,0);c.lineTo(0,-2*K);c.lineTo(-L*.2,0);c.closePath();c.fill();
        const g=c.createLinearGradient(-L*1.8,0,-L*.4,0);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,P[2]);c.fillStyle=g;c.fillRect(-L*1.8,-3*K,L*1.4,6*K);
        if(Math.random()<.5)vfxP({x,y,vx:-ca*60+vR(-30,30),vy:-sa*60+vR(-30,30),life:vR(.2,.4),s:vR(3,6)*K,c:rlRand(P),shape:'dia',rot:a,vr:vR(-6,6)})}
      c.restore();
      if(k>=1&&!s.hit){s.hit=1;artImpact(x1+vR(-6,6)*K,y1+vR(-6,6)*K,S,K)}}
    c.restore();if(alldone){this.done=true;res()}}})})}
function artImpact(x,y,S,K){const P=S.vp;vfxP({x,y,life:.35,s:6*K,grow:170*K,c:P[2],shape:'shock'});vfxP({x,y,life:.14,s:9*K,grow:40*K,c:P[2]});
  if(S.kind==='bolt')for(let i=0;i<22;i++){const a=Math.random()*6.283,v=vR(80,280)*K;vfxP({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,drag:.9,life:vR(.3,.6),s:vR(3,7)*K,c:rlRand(P),shape:'leaf',vr:vR(-10,10)})}
  else if(S.kind==='lance'){vfxP({x,y,life:.35,s:34*K,c:P[0],shape:'star',vr:3});for(let i=0;i<20;i++){const a=Math.random()*6.283,v=vR(100,300)*K;vfxP({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,drag:.88,life:vR(.25,.5),s:vR(2,5)*K,c:rlRand(P),shape:'star',vr:8})}}
  else for(let i=0;i<18;i++){const a=Math.random()*6.283,v=vR(90,300)*K;vfxP({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-80,ay:520,drag:.96,life:vR(.4,.8),s:vR(4,9)*K,c:rlRand(P),shape:'dia',rot:a,vr:vR(-9,9)})}}

/* ---------- painted battle backgrounds ----------
   Add art/bg-<kind>.webp and list it here. Kinds: wind, fire, water,
   light, dark, arena, archive. Any kind not listed keeps its drawing. */
const RL_BGART={};
(function(){const old=rlStageBG;rlStageBG=function(kind){const f=RL_BGART[kind];if(!f)return old(kind);
  return`<div class="rl-bgart" style="background-image:url('${f}')" aria-hidden="true"></div>`};
  const st=document.createElement('style');st.textContent=`.rl-bgart{position:absolute;inset:0;background-size:cover;background-position:center 70%}`;document.head.appendChild(st)})();

/* ---------- Kael's magic ---------- */
// skill 1: a spinning compass rose that curves to the target, drawing a dotted map route
function vfxNeedle(h,tp,S,big,K,res){const P=S.vp,sp=vSp(),x0=h.x,y0=h.y,x1=tp.x,y1=tp.y,dur=.42/sp,bend=-Math.min(90,Math.abs(x1-x0)*.28),trail=[];let t=0;
  VFX.items.push({step(dt,c){t+=dt;const k=Math.min(1,t/dur),e=k*k*(3-2*k),x=x0+(x1-x0)*e,y=y0+(y1-y0)*e+bend*Math.sin(Math.PI*e),R=12*K,rot=t*14;trail.push([x,y]);
    c.save();c.globalCompositeOperation='lighter';
    c.setLineDash([6*K,7*K]);c.lineWidth=2.4*K;c.strokeStyle=P[2];c.globalAlpha=.85;c.beginPath();trail.forEach(([a,b],i)=>i?c.lineTo(a,b):c.moveTo(a,b));c.stroke();c.setLineDash([]);
    c.globalAlpha=1;const g=c.createRadialGradient(x,y,0,x,y,R*2.2);g.addColorStop(0,P[1]);g.addColorStop(.5,P[2]);g.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=g;c.beginPath();c.arc(x,y,R*2.2,0,6.283);c.fill();
    c.translate(x,y);c.strokeStyle=P[0];c.lineWidth=2*K;c.beginPath();c.arc(0,0,R,0,6.283);c.stroke();
    c.rotate(rot);c.fillStyle=P[0];for(let i=0;i<4;i++){c.rotate(Math.PI/2);c.beginPath();c.moveTo(0,-R*1.35);c.lineTo(R*.22,0);c.lineTo(-R*.22,0);c.closePath();c.fill()}
    c.restore();
    if(k>=1){this.done=true;vfxP({x:x1,y:y1,life:.45,s:R,grow:150*K,c:P[2],shape:'ring'});
      // an X marks the spot, then four sparks fly to the compass points
      VFX.items.push({t:0,step(dt,c){this.t+=dt;const a=Math.max(0,1-this.t/.5),L=16*K;c.save();c.globalCompositeOperation='lighter';c.globalAlpha=a;c.strokeStyle=P[1];c.lineWidth=4*K;c.lineCap='round';c.beginPath();c.moveTo(x1-L,y1-L);c.lineTo(x1+L,y1+L);c.moveTo(x1+L,y1-L);c.lineTo(x1-L,y1+L);c.stroke();c.restore();if(this.t>.5)this.done=true}});
      for(let i=0;i<4;i++){const a=i*Math.PI/2;vfxP({x:x1,y:y1,vx:Math.cos(a)*260*K,vy:Math.sin(a)*260*K,drag:.86,life:.4,s:5*K,c:P[0],shape:'dia',rot:a})}
      for(let i=0;i<10;i++){const a=Math.random()*6.283,v=vR(60,180)*K;vfxP({x:x1,y:y1,vx:Math.cos(a)*v,vy:Math.sin(a)*v,drag:.9,life:vR(.25,.5),s:vR(2,4)*K,c:rlRand(P)})}
      res()}}})}
// skill 3: a constellation map is drawn above the enemies, then a star falls on each one
function vfxStarfall(h,pts,S){const P=S.vp,sp=vSp(),K=Math.max(1,h.k*2.2),sky=pts.map(q=>({x:q.x+vR(-30,30),y:Math.max(30,q.y-q.h*1.1-vR(40,90))}));
  for(let i=0;i<14;i++)vfxP({x:h.x,y:h.y,vx:vR(-60,60),vy:vR(-420,-220),drag:.92,life:vR(.3,.6),s:vR(2,4)*K,c:rlRand(P),shape:'star',vr:6});
  return new Promise(res=>{let t=0,hit=0;const draw=.38/sp,gap=.11/sp,fall=.22/sp;
    VFX.items.push({step(dt,c){t+=dt;const a=Math.min(1,t/draw),fade=Math.max(0,1-Math.max(0,t-draw-gap*sky.length-fall)/.3);
      c.save();c.globalCompositeOperation='lighter';c.globalAlpha=.9*fade;c.strokeStyle=P[1];c.lineWidth=2.4*K;c.setLineDash([5*K,5*K]);c.beginPath();
      sky.forEach((s,i)=>{if(i){const p=sky[i-1],m=Math.min(1,a*sky.length-(i-1));if(m>0){c.moveTo(p.x,p.y);c.lineTo(p.x+(s.x-p.x)*m,p.y+(s.y-p.y)*m)}}});c.stroke();c.setLineDash([]);
      sky.forEach((s,i)=>{const st=draw+gap*i,k=(t-st)/fall;
        if(k<0){c.globalAlpha=Math.min(1,a*1.5)*fade;const R2=20*K*(1+.15*Math.sin(t*20+i)),g=c.createRadialGradient(s.x,s.y,0,s.x,s.y,R2);g.addColorStop(0,P[0]);g.addColorStop(.35,P[2]);g.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=g;c.beginPath();c.arc(s.x,s.y,R2,0,6.283);c.fill();c.fillStyle=P[0];c.save();c.translate(s.x,s.y);c.rotate(t*2);for(let j=0;j<4;j++){c.rotate(Math.PI/2);c.beginPath();c.moveTo(0,-R2*.9);c.lineTo(R2*.12,0);c.lineTo(-R2*.12,0);c.closePath();c.fill()}c.restore()}
        else if(k<1){const q=pts[i],x=s.x+(q.x-s.x)*k*k,y=s.y+(q.y-s.y)*k*k;c.globalAlpha=1;const L=90*K,ang=Math.atan2(q.y-s.y,q.x-s.x),gx=x-Math.cos(ang)*L,gy=y-Math.sin(ang)*L,g=c.createLinearGradient(gx,gy,x,y);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,P[2]);c.strokeStyle=g;c.lineWidth=12*K;c.lineCap='round';c.beginPath();c.moveTo(gx,gy);c.lineTo(x,y);c.stroke();c.fillStyle=P[0];c.beginPath();c.arc(x,y,9*K,0,6.283);c.fill();c.fillStyle=P[1];c.globalAlpha=.5;c.beginPath();c.arc(x,y,18*K,0,6.283);c.fill()}
        else if(!s.hit){s.hit=1;hit++;const q=pts[i];vfxP({x:q.x,y:q.y,life:.45,s:34*K,c:P[1],shape:'star',vr:2});vfxP({x:q.x,y:q.y,life:.35,s:6*K,grow:200*K,c:P[2],shape:'shock'});
          for(let j=0;j<16;j++){const an=-Math.PI*vR(.1,.9),v=vR(120,300)*K;vfxP({x:q.x,y:q.y,vx:Math.cos(an)*v,vy:Math.sin(an)*v,ay:600,life:vR(.35,.7),s:vR(2,4)*K,c:rlRand(P),shape:'star',vr:8})}}});
      c.restore();if(hit>=sky.length&&fade<=0){this.done=true}if(hit>=sky.length&&!this.r){this.r=1;res()}}})})}
// skill 2: wind ribbons wrap each ally, with a compass ring at their feet
function rlArtSupport(S,e,sk){if(S.support==='barkshield'||S.support==='totem')return rlArtSupportBark(S,e);const P=S.vp,sp=vSp();e.t.forEach((uid,n)=>{const q=rlbPt(uid,'foot');if(!q)return;const K=q.w/240,cx=q.x,base=q.y,top=q.y-q.h*.85;let t=-n*.06/sp;
  VFX.items.push({step(dt,c){t+=dt;if(t<0)return;const life=.85/sp,k=t/life;if(k>=1){this.done=true;return}const a=Math.sin(Math.PI*Math.min(1,k));
    c.save();c.globalCompositeOperation='lighter';
    c.globalAlpha=.7*a;c.strokeStyle=P[2];c.lineWidth=2*K;c.save();c.translate(cx,base);c.scale(1,.28);c.beginPath();c.arc(0,0,62*K,0,6.283);c.stroke();c.rotate(-t*3);c.fillStyle=P[1];for(let i=0;i<4;i++){c.rotate(Math.PI/2);c.beginPath();c.moveTo(0,-74*K);c.lineTo(6*K,-56*K);c.lineTo(-6*K,-56*K);c.closePath();c.fill()}c.restore();
    for(let r=0;r<2;r++){c.globalAlpha=.85*a;c.strokeStyle=r?P[1]:P[2];c.lineWidth=(r?3:5)*K;c.beginPath();
      for(let i=0;i<=40;i++){const v=i/40,y=base-(base-top)*v*Math.min(1,k*1.6),ang=v*9+t*9*(r?1:-1)+r*Math.PI;const x=cx+Math.cos(ang)*48*K*(1-v*.35);i?c.lineTo(x,y+Math.sin(ang)*8*K):c.moveTo(x,y+Math.sin(ang)*8*K)}c.stroke()}
    c.restore();if(Math.random()<.5)vfxP({x:cx+vR(-40,40)*K,y:base-vR(0,1)*(base-top),vx:vR(-30,30),vy:vR(-140,-60),life:vR(.3,.6),s:vR(3,6)*K,c:rlRand(P),shape:'leaf',vr:vR(-8,8)})}})})}

/* ---------- Thornwick's magic ---------- */
// skill 1: a glowing crack races along the ground, then thorned roots burst up around the target
var vfxRoots=function(h,uid,tid,S){const P=S.vp,W=S.wood,sp=vSp(),a=rlbPt(uid,'foot'),b=rlbPt(tid,'foot');if(!a||!b)return Promise.resolve();
  const K=Math.max(1,b.w/150),run=.26/sp,grow=.18/sp,hold=.22/sp,back=.2/sp,path=[];
  const N=18;for(let i=0;i<=N;i++){const k=i/N;path.push([a.x+(b.x-a.x)*k+(i&&i<N?vR(-6,6):0),a.y+(b.y-a.y)*k+(i&&i<N?vR(-5,5):0)])}
  const spikes=Array.from({length:6},(_,i)=>({dx:(i-2.5)*14*K+vR(-5,5),h:vR(55,95)*K,w:vR(9,14)*K,lean:(i-2.5)*.12+vR(-.1,.1)}));
  return new Promise(res=>{let t=0,hit=false;VFX.items.push({step(dt,c){t+=dt;const k=Math.min(1,t/run);
    c.save();c.globalCompositeOperation='lighter';c.globalAlpha=Math.max(0,1-Math.max(0,t-run-grow-hold)/.3);c.strokeStyle=P[2];c.lineWidth=4;c.lineCap='round';c.beginPath();
    const n=Math.max(1,Math.round(k*N));path.slice(0,n+1).forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.stroke();c.strokeStyle=P[1];c.lineWidth=1.5;c.stroke();c.restore();
    if(k<1&&Math.random()<.8){const[x,y]=path[n];vfxP({x,y,vx:vR(-60,60),vy:vR(-160,-60),ay:500,life:vR(.3,.5),s:vR(2,4),c:rlRand(W),shape:'sq',vr:8,glow:false})}
    const t2=t-run;if(t2>0){const g=t2<grow?1-Math.pow(1-t2/grow,3):t2<grow+hold?1:Math.max(0,1-(t2-grow-hold)/back);
      if(!hit){hit=true;for(let i=0;i<18;i++)vfxP({x:b.x+vR(-40,40)*K,y:b.y,vx:vR(-120,120),vy:vR(-320,-120),ay:700,life:vR(.4,.7),s:vR(3,6),c:rlRand(W),shape:'sq',vr:10,glow:false});for(let i=0;i<10;i++)vfxP({x:b.x+vR(-30,30)*K,y:b.y-vR(10,60)*K,vx:vR(-80,80),vy:vR(-160,-40),life:vR(.4,.8),s:vR(4,7)*K,c:rlRand(P),shape:'leaf',vr:vR(-8,8)});res()}
      for(const s of spikes){const H=s.h*g,x0=b.x+s.dx,y0=b.y+4;c.save();c.translate(x0,y0);c.rotate(s.lean);
        const gr=c.createLinearGradient(0,0,0,-H);gr.addColorStop(0,W[1]);gr.addColorStop(.7,W[0]);gr.addColorStop(1,P[2]);c.fillStyle=gr;c.beginPath();c.moveTo(-s.w/2,0);c.quadraticCurveTo(-s.w*.4,-H*.5,0,-H);c.quadraticCurveTo(s.w*.4,-H*.5,s.w/2,0);c.closePath();c.fill();
        c.fillStyle=W[1];for(let j=1;j<4;j++){const y=-H*j/4.2,sd=j%2?1:-1;c.beginPath();c.moveTo(sd*s.w*.3*(1-j/4),y);c.lineTo(sd*s.w*.9,y-6*K);c.lineTo(sd*s.w*.2*(1-j/4),y-4*K);c.fill()}
        c.globalCompositeOperation='lighter';c.fillStyle=P[1];c.globalAlpha=.8;c.beginPath();c.arc(0,-H,3*K,0,6.283);c.fill();c.restore()}
      if(t2>grow+hold+back)this.done=true}}})})}
// skill 3: a ribbon of glowing pollen sweeps the field, then a great flower blooms under every enemy
var vfxBloom=function(h,ids,S){const P=S.vp,sp=vSp(),pts=ids.map(t=>rlbPt(t,'foot')).filter(Boolean);if(!pts.length)return Promise.resolve();
  const K=Math.max(1,pts[0].w/150),sweep=.4/sp,open=.28/sp,hold=.2/sp;
  const far=pts.reduce((m,q)=>q.x>m.x?q:m,pts[0]);
  return new Promise(res=>{let t=0,hit=false;VFX.items.push({step(dt,c){t+=dt;const k=Math.min(1,t/sweep);
    if(k<1){for(let i=0;i<4;i++){const u=Math.max(0,k-i*.03),x=h.x+(far.x+60-h.x)*u,y=h.y+(far.y-30-h.y)*u-Math.sin(u*Math.PI)*120*K;vfxP({x:x+vR(-8,8),y:y+vR(-8,8),vx:vR(-40,40),vy:vR(-40,40),life:vR(.3,.7),s:vR(2,4)*K,c:rlRand(P),shape:i%2?'star':'c',vr:6})}}
    const t2=t-sweep;if(t2>0){const g=Math.min(1,t2/open),e=1-Math.pow(1-g,3),fade=Math.max(0,1-Math.max(0,t2-open-hold)/.25);
      for(const q of pts){c.save();c.translate(q.x,q.y-6*K);c.scale(1,.5);c.rotate(t2*1.4);c.globalAlpha=fade;
        for(let ring=0;ring<2;ring++){const n=ring?6:8,R=(ring?52:80)*K*e;for(let i=0;i<n;i++){c.save();c.rotate(i/n*6.283+(ring?.4:0));const gr=c.createLinearGradient(0,0,0,-R);gr.addColorStop(0,P[3]);gr.addColorStop(.45,ring?'#fff3c6':P[2]);gr.addColorStop(1,ring?'#ffffff':'#f4ffd8');c.fillStyle=gr;c.strokeStyle=S.wood[1];c.lineWidth=2;c.beginPath();c.ellipse(0,-R*.55,R*.24,R*.55,0,0,6.283);c.fill();c.stroke();c.restore()}}
        c.globalCompositeOperation='lighter';const cg=c.createRadialGradient(0,0,0,0,0,18*K);cg.addColorStop(0,'#fff8c4');cg.addColorStop(.5,'#ffd24a');cg.addColorStop(1,'rgba(255,200,60,0)');c.fillStyle=cg;c.beginPath();c.arc(0,0,26*K*e,0,6.283);c.fill();c.restore()}
      if(g>=1&&!hit){hit=true;for(const q of pts){vfxP({x:q.x,y:q.y-20*K,life:.4,s:8*K,grow:200*K,c:P[2],shape:'shock'});for(let i=0;i<22;i++){const a=-Math.PI*vR(.05,.95),v=vR(120,320)*K;vfxP({x:q.x,y:q.y-10*K,vx:Math.cos(a)*v,vy:Math.sin(a)*v,ay:380,drag:.97,life:vR(.5,.9),s:vR(4,8)*K,c:rlRand(P),shape:'leaf',vr:vR(-10,10)})}}res()}
      if(fade<=0)this.done=true}}})})}
// skill 2: leaves gather in front of each ally and lock into a glowing leaf-shield
var rlArtSupportBark=function(S,e){const P=S.vp,W=S.wood,sp=vSp();e.t.forEach((uid,n)=>{const q=rlbPt(uid);if(!q)return;const K=q.w/240,d=1,cx=q.x+q.w*.22*d,cy=q.y;let t=-n*.07/sp;
  const leaves=Array.from({length:12},()=>({a:vR(0,6.283),r:vR(90,150)*K,o:vR(-.4,.4)}));
  VFX.items.push({step(dt,c){t+=dt;if(t<0)return;const gather=.3/sp,hold=.55/sp,out=.25/sp;if(t>gather+hold+out){this.done=true;return}
    c.save();c.globalCompositeOperation='lighter';
    if(t<gather){const k=t/gather;for(const L of leaves){const r=L.r*(1-k),x=cx+Math.cos(L.a+k*2)*r,y=cy+Math.sin(L.a+k*2)*r*.8;c.save();c.translate(x,y);c.rotate(L.a+k*4);c.fillStyle=P[2];c.globalAlpha=.9;c.beginPath();c.ellipse(0,0,9*K,4*K,0,0,6.283);c.fill();c.restore()}}
    else{const k=Math.min(1,(t-gather)/(.12/sp)),fade=t>gather+hold?1-(t-gather-hold)/out:1,pop=1+.18*Math.sin(Math.min(1,k)*Math.PI),Hh=q.h*.42*pop,Ww=q.w*.2*pop;
      c.globalAlpha=.75*fade;const gr=c.createLinearGradient(cx,cy-Hh,cx,cy+Hh);gr.addColorStop(0,P[1]);gr.addColorStop(.5,P[2]);gr.addColorStop(1,P[3]);c.fillStyle=gr;
      c.beginPath();c.moveTo(cx,cy-Hh);c.quadraticCurveTo(cx+Ww*1.6,cy,cx,cy+Hh);c.quadraticCurveTo(cx-Ww*1.6,cy,cx,cy-Hh);c.fill();
      c.globalAlpha=fade;c.strokeStyle=W[0];c.lineWidth=3*K+1;c.stroke();c.strokeStyle=P[0];c.lineWidth=1.5;c.beginPath();c.moveTo(cx,cy-Hh*.9);c.lineTo(cx,cy+Hh*.9);
      for(let i=-2;i<=2;i++){const y=cy+i*Hh*.3;c.moveTo(cx,y);c.lineTo(cx+Ww*.8,y-Hh*.15);c.moveTo(cx,y);c.lineTo(cx-Ww*.8,y-Hh*.15)}c.stroke();
      const sh=(t*2.2)%1;c.globalAlpha=.6*fade*(1-sh);c.strokeStyle=P[1];c.lineWidth=2;c.beginPath();c.ellipse(cx,cy,Ww*(1+sh*1.5),Hh*(1+sh*.5),0,0,6.283);c.stroke()}
    c.restore()}})})}

/* ---------- Thornwick, painted effects (cut from his own casting sheet) ---------- */
const TH_FX={roots:'art/fx-th-roots.webp',ring:'art/fx-th-ring.webp',shield:'art/fx-th-shield.webp',beam:'art/fx-th-beam.webp'};

const thImg=k=>artImg(TH_FX[k]);
const glow=(c,x,y,r,col,a)=>{c.save();c.globalCompositeOperation='lighter';c.globalAlpha=a;const g=c.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,'#f6ffd8');g.addColorStop(.3,col);g.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=g;c.beginPath();c.arc(x,y,r,0,6.283);c.fill();c.restore()};
// Thornroot: a dark crack runs along the ground, then gnarled roots tear up around the enemy
vfxRoots=function(h,uid,tid,S){const P=S.vp,W=S.wood,sp=vSp(),a=rlbPt(uid,'foot'),b=rlbPt(tid,'foot');if(!a||!b)return Promise.resolve();
  const K=b.w/150,run=.24/sp,grow=.14/sp,hold=.38/sp,back=.22/sp,path=[],N=16,img=thImg('roots');
  for(let i=0;i<=N;i++){const k=i/N;path.push([a.x+(b.x-a.x)*k+(i&&i<N?vR(-5,5):0),a.y+(b.y-a.y)*k+(i&&i<N?vR(-3,3):0)])}
  return new Promise(res=>{let t=0,hit=false;VFX.items.push({step(dt,c){t+=dt;const k=Math.min(1,t/run),n=Math.max(1,Math.round(k*N)),fade=Math.max(0,1-Math.max(0,t-run-grow-hold)/back);
    c.save();c.globalAlpha=.85*fade;c.strokeStyle='#2a1a0c';c.lineWidth=5;c.lineCap='round';c.beginPath();path.slice(0,n+1).forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.stroke();
    c.globalCompositeOperation='lighter';c.strokeStyle=P[2];c.lineWidth=1.6;c.stroke();c.restore();
    if(k<1&&Math.random()<.7){const[x,y]=path[n];vfxP({x,y,vx:vR(-50,50),vy:vR(-140,-50),ay:520,life:vR(.3,.5),s:vR(2,4),c:rlRand(W),shape:'sq',vr:8,glow:false})}
    const t2=t-run;if(t2>0){const g=t2<grow?1-Math.pow(1-t2/grow,3):1,sink=t2>grow+hold?Math.min(1,(t2-grow-hold)/back):0;
      if(!hit){hit=true;rlbShake&&rlbShake(false);for(let i=0;i<16;i++)vfxP({x:b.x+vR(-50,50)*K,y:b.y,vx:vR(-140,140),vy:vR(-340,-120),ay:760,life:vR(.4,.7),s:vR(3,6),c:rlRand(W),shape:'sq',vr:10,glow:false});res()}
      glow(c,b.x,b.y-10*K,70*K*g,P[2],.8*(1-sink));
      if(img){const w=b.w*1.55,hh=w*img.naturalHeight/img.naturalWidth,H=hh*g*(1-sink*.6);c.save();c.globalAlpha=1-sink;c.drawImage(img,b.x-w/2,b.y+hh*.12-H,w,H);c.restore()}
      if(t2>grow+hold+back)this.done=true}}})})};
// Barkward: the crystal leaf-shield from his art forms in front of each ally
rlArtSupportBark=function(S,e){const P=S.vp,sp=vSp(),img=S.shield?artImg(S.shield):thImg('shield');e.t.forEach((uid,n)=>{const q=rlbPt(uid);if(!q)return;const cx=q.x+q.w*.24,cy=q.y+q.h*.05;let t=-n*.08/sp;
  const leaves=Array.from({length:10},()=>({a:vR(0,6.283),r:vR(80,140)*q.w/240}));
  VFX.items.push({step(dt,c){t+=dt;if(t<0)return;const gather=.22/sp,hold=.7/sp,out=.25/sp;if(t>gather+hold+out){this.done=true;return}
    if(t<gather){const k=t/gather;for(const L of leaves){const r=L.r*(1-k);vfxP({x:cx+Math.cos(L.a+k*3)*r,y:cy+Math.sin(L.a+k*3)*r*.8,life:.08,s:4,c:P[2],shape:'leaf',rot:L.a})}return}
    const k=Math.min(1,(t-gather)/(.14/sp)),fade=t>gather+hold?1-(t-gather-hold)/out:1,pop=.75+.25*(1-Math.pow(1-k,3))+.06*Math.sin(Math.min(1,k)*Math.PI);
    const H=q.h*.62*pop;glow(c,cx,cy,H*.65,P[2],.5*fade);
    if(img){const w=H*img.naturalWidth/img.naturalHeight;c.save();c.globalAlpha=fade;c.drawImage(img,cx-w/2,cy-H/2,w,H);c.restore()}
    if(k<1&&k>.5)for(let i=0;i<3;i++)vfxP({x:cx+vR(-15,15),y:cy+vR(-H/2,H/2),vx:vR(-80,80),vy:vR(-80,40),life:.4,s:vR(2,4),c:rlRand(P),shape:'star',vr:6})}})})};
// Wildbloom: green bolts streak from his staff, then a ring of living vines snaps shut around every enemy
vfxBloom=function(h,ids,S){const P=S.vp,W=S.wood,sp=vSp(),pts=ids.map(t=>rlbPt(t)).filter(Boolean),beam=thImg('beam'),ring=thImg('ring');if(!pts.length)return Promise.resolve();
  const fly=.26/sp,snap=.2/sp,hold=.35/sp,out=.25/sp;
  return new Promise(res=>{let t=0,hit=false;VFX.items.push({step(dt,c){t+=dt;
    pts.forEach((q,i)=>{const t0=i*.06/sp,k=Math.min(1,Math.max(0,(t-t0)/fly));
      if(k>0&&k<1&&beam){const x=h.x+(q.x-h.x)*k,y=h.y+(q.y-h.y)*k,ang=Math.atan2(q.y-h.y,q.x-h.x),L=110*h.k*1.8;c.save();c.globalCompositeOperation='lighter';c.translate(x,y);c.rotate(ang);c.drawImage(beam,-L,-L*beam.naturalHeight/beam.naturalWidth/2,L,L*beam.naturalHeight/beam.naturalWidth);c.restore()}
      const t2=t-t0-fly;if(t2>0&&ring){const s=t2<snap?1.7-0.75*(1-Math.pow(1-t2/snap,3)):.95,fade=t2>snap+hold?Math.max(0,1-(t2-snap-hold)/out):1,R=q.h*.62*s;
        glow(c,q.x,q.y,R*.9,P[2],.35*fade);c.save();c.globalAlpha=Math.min(1,t2/(snap*.5))*fade;c.translate(q.x,q.y);c.rotate((1-Math.min(1,t2/snap))*-.6);c.drawImage(ring,-R,-R,R*2,R*2);c.restore();
        if(!q.hit&&t2>=snap){q.hit=1;vfxP({x:q.x,y:q.y,life:.35,s:10,grow:220,c:P[2],shape:'shock'});for(let j=0;j<18;j++){const a=Math.random()*6.283,v=vR(120,300);vfxP({x:q.x+Math.cos(a)*R*.8,y:q.y+Math.sin(a)*R*.8,vx:Math.cos(a)*v,vy:Math.sin(a)*v,ay:300,drag:.95,life:vR(.4,.7),s:vR(4,7),c:rlRand([P[2],P[3],W[0]]),shape:'leaf',vr:vR(-10,10),glow:false})}}}});
    if(!hit&&pts.every(q=>q.hit)){hit=true;res()}
    if(t>fly+snap+hold+out+pts.length*.06/sp+.05)this.done=true}})})};

/* ================================================================
   PAINTED SPELLS (used by every hero from here on)
   Cut the magic out of a hero's casting sheet and list it on each form's spell:
     paint:{ shot:'art/..'   a projectile pointing right; flies from the hand to the target
             burst:'art/..'  (optional) impact picture; otherwise the shot flares into a star
             sigil:'art/..'  (optional) magic circle: flashes on targets, or hangs above them for 'rain'
             aura:'art/..'   (optional) wraps each ally for support skills
             aoe:'fan'|'rain' area skills: shots to every enemy, or a sigil above each enemy that drops a shot
             route:true      leave a dotted map-route behind the shot }
   ================================================================ */
function paintScale(h){return Math.max(1,h.k*1.7)}
function paintBurst(x,y,S,K,big){const P=S.vp,p=S.paint,img=p.burst&&artImg(p.burst),sig=p.sigil&&artImg(p.sigil),shot=artImg(p.shot);let t=0;const life=.42/vSp();
  VFX.items.push({step(dt,c){t+=dt;const k=Math.min(1,t/life),a=k<.25?k/.25:1-(k-.25)/.75,s=.55+.65*(1-Math.pow(1-k,3));c.save();c.globalCompositeOperation='lighter';c.globalAlpha=Math.max(0,a);c.translate(x,y);
    if(img){const w=110*K*s*(big?1.2:1),h=w*img.naturalHeight/img.naturalWidth;c.drawImage(img,-w/2,-h/2,w,h)}
    else if(sig&&big){c.rotate(t*1.5);const w=120*K*s;c.drawImage(sig,-w/2,-w/2,w,w)}
    else if(shot){c.rotate(t*.8);const L=70*K*s*(p.sz||1),H=L*shot.naturalHeight/shot.naturalWidth;for(let i=0;i<3;i++){c.rotate(2.094);c.drawImage(shot,0,-H/2,L,H)}}
    c.restore();if(k>=1)this.done=true}});
  for(let i=0;i<14;i++){const a=Math.random()*6.283,v=vR(90,260)*K;vfxP({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,drag:.88,life:vR(.25,.5),s:vR(2,4)*K,c:rlRand(P)})}}
function paintShot(x0,y0,x1,y1,S,K,big,arc){const p=S.paint,img=artImg(p.shot),P=S.vp,sp=vSp(),dur=(big?.34:.28)/sp,trail=[];let t=0;
  return new Promise(res=>{VFX.items.push({step(dt,c){t+=dt;const k=Math.min(1,t/dur),e=k*k*(3-2*k),bend=arc||0,x=x0+(x1-x0)*e,y=y0+(y1-y0)*e+bend*Math.sin(Math.PI*e),
      dx=(x1-x0)+bend*Math.PI*Math.cos(Math.PI*e)*0,ang=Math.atan2((y1-y0)+bend*Math.PI*Math.cos(Math.PI*e),x1-x0);trail.push([x,y]);
    c.save();if(p.route&&trail.length>1){c.setLineDash([6*K,7*K]);c.lineWidth=2*K;c.strokeStyle=P[2];c.globalAlpha=.8;c.beginPath();trail.forEach(([a,b],i)=>i?c.lineTo(a,b):c.moveTo(a,b));c.stroke();c.setLineDash([])}
    c.globalCompositeOperation='lighter';c.globalAlpha=1;
    if(img){const L=(big?130:105)*K*(p.sz||1),H=L*img.naturalHeight/img.naturalWidth;c.translate(x,y);c.rotate(ang);c.drawImage(img,-L*.85,-H/2,L,H)}
    c.restore();if(Math.random()<.8)vfxP({x,y,vx:-Math.cos(ang)*80+vR(-30,30),vy:-Math.sin(ang)*80+vR(-30,30),life:vR(.2,.4),s:vR(2,4)*K,c:rlRand(P)});
    if(k>=1){this.done=true;paintBurst(x1,y1,S,K,big);res()}}})})}
function paintRain(h,pts,S){const p=S.paint,P=S.vp,sp=vSp(),K=paintScale(h),sig=p.sigil&&artImg(p.sigil),shot=artImg(p.shot),open=.3/sp,fall=.18/sp,hold=.25/sp;
  for(let i=0;i<12;i++)vfxP({x:h.x,y:h.y,vx:vR(-60,60),vy:vR(-380,-200),drag:.92,life:vR(.3,.6),s:vR(2,4)*K,c:rlRand(P)});
  return Promise.all(pts.map((q,i)=>new Promise(res=>{const sx=q.x,sy=Math.max(40,q.y-q.h*1.05);let t=-i*.08/sp,hit=false;
    VFX.items.push({step(dt,c){t+=dt;if(t<0)return;const g=Math.min(1,t/open),fade=Math.max(0,1-Math.max(0,t-open-fall-hold)/.25);
      c.save();c.globalCompositeOperation='lighter';c.translate(sx,sy);c.globalAlpha=g*fade;c.scale(1,.42);c.rotate(t*1.8);
      if(sig){const w=110*K*(.4+.6*g);c.drawImage(sig,-w/2,-w/2,w,w)}else{const gr=c.createRadialGradient(0,0,0,0,0,50*K);gr.addColorStop(0,P[1]);gr.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=gr;c.beginPath();c.arc(0,0,50*K,0,6.283);c.fill()}
      c.restore();const t2=t-open;
      if(t2>0&&t2<fall&&shot){const k=t2/fall,y=sy+(q.y-sy)*k*k,L=110*K,H=L*shot.naturalHeight/shot.naturalWidth;c.save();c.globalCompositeOperation='lighter';c.translate(sx,y);c.rotate(Math.PI/2);c.drawImage(shot,-L*.85,-H/2,L,H);c.restore()}
      if(t2>=fall&&!hit){hit=true;paintBurst(q.x,q.y,S,K,true);vfxP({x:q.x,y:q.y,life:.35,s:8,grow:200*K,c:P[2],shape:'shock'});res()}
      if(fade<=0&&hit)this.done=true}})})))}
function paintSupport(S,e){const p=S.paint,P=S.vp,sp=vSp(),img=artImg(p.aura||p.sigil);if(!img)return;e.t.forEach((uid,n)=>{const q=rlbPt(uid);if(!q)return;let t=-n*.07/sp;const life=.9/sp;
  VFX.items.push({step(dt,c){t+=dt;if(t<0)return;const k=t/life;if(k>=1){this.done=true;return}const a=Math.sin(Math.PI*k),H=q.h*1.05*(.85+.15*k);
    c.save();c.globalCompositeOperation='lighter';c.globalAlpha=a;c.translate(q.x,q.y);c.rotate(-t*4);const w=H*img.naturalWidth/img.naturalHeight;c.drawImage(img,-w/2,-H/2,w,H);c.rotate(Math.PI);c.globalAlpha=a*.5;c.drawImage(img,-w/2,-H/2,w,H);c.restore();
    if(Math.random()<.4)vfxP({x:q.x+vR(-q.w/3,q.w/3),y:q.y+vR(-q.h/3,q.h/3),vy:vR(-90,-30),life:vR(.3,.6),s:vR(2,4),c:rlRand(P)})}})})}
(function(){const oFire=rlArtFire,oShot=vfxArtShot,oSup=rlArtSupport;
  rlArtFire=async function(S,e,sk,ult){if(!S.paint)return oFire(S,e,sk,ult);const h=rlArtHand(S);if(!h)return;const pts=e.t.map(t=>rlbPt(t)).filter(Boolean);if(!pts.length)return;const K=paintScale(h),sp=vSp();
    if(sk.tg==='eA'&&S.paint.aoe==='rain')return paintRain(h,pts,S);
    const n=sk.tg==='eA'?1:Math.min(3,sk.h||1),arc=S.paint.arc!=null?S.paint.arc:S.paint.route?-60:-18;
    await Promise.all(pts.flatMap((q,j)=>Array.from({length:n},(_,i)=>new Promise(r=>setTimeout(()=>paintShot(h.x,h.y,q.x,q.y,S,K,sk.tg==='eA'||ult,arc*(j%2?-1:1)).then(r),(i*120+j*70)/sp)))))};
  vfxArtShot=function(h,tp,S,big){return S.paint?paintShot(h.x,h.y,tp.x,tp.y,S,paintScale(h),big,-18):oShot(h,tp,S,big)};
  rlArtSupport=function(S,e,sk){return S.paint&&(S.paint.aura||S.paint.sigil)?paintSupport(S,e):oSup(S,e,sk)};
  Object.values(RL_ART).forEach(A=>(A.spell||[]).forEach(S=>S&&S.paint&&['shot','burst','sigil','aura'].forEach(k=>S.paint[k]&&artImg(S.paint[k]))));
})();

/* per-skill painted effects, and two more area styles: 'erupt' (bursts up under each enemy)
   and 'sweep' (one wave rolls across the whole enemy line) */
function paintErupt(pts,S){const p=S.paint,P=S.vp,sp=vSp(),img=artImg(p.burst||p.shot);
  return Promise.all(pts.map((q,i)=>new Promise(res=>{let t=-i*.08/sp,hit=false;const life=.7/sp,foot=q.y+q.h*.45;
    VFX.items.push({step(dt,c){t+=dt;if(t<0)return;const k=t/life;if(k>=1){this.done=true;return}const g=Math.min(1,k/.25),a=k<.6?1:1-(k-.6)/.4;
      if(!hit&&k>.15){hit=true;for(let j=0;j<16;j++)vfxP({x:q.x+vR(-q.w/3,q.w/3),y:foot,vx:vR(-120,120),vy:vR(-320,-120),ay:700,life:vR(.4,.7),s:vR(2,5),c:rlRand(P),shape:'sq',vr:8,glow:false});res()}
      if(img){const w=q.w*1.3*(p.sz||1),H=w*img.naturalHeight/img.naturalWidth*(1-Math.pow(1-g,3));c.save();c.globalAlpha=a;c.drawImage(img,q.x-w/2,foot-H,w,H);c.restore()}}})})))}
function paintSweep(h,pts,S){const p=S.paint,P=S.vp,sp=vSp(),img=artImg(p.burst||p.shot),x0=Math.min(...pts.map(q=>q.x-q.w)),x1=Math.max(...pts.map(q=>q.x+q.w)),yb=Math.max(...pts.map(q=>q.y+q.h*.45)),Hh=Math.max(...pts.map(q=>q.h))*1.25,dur=.6/sp;
  return new Promise(res=>{let t=0;const hit=new Set();VFX.items.push({step(dt,c){t+=dt;const k=Math.min(1,t/dur),x=x0+(x1-x0)*k,a=k<.8?1:1-(k-.8)/.2;
    if(img){const w=Hh*img.naturalWidth/img.naturalHeight;c.save();c.globalAlpha=a;c.drawImage(img,x-w/2,yb-Hh,w,Hh);c.restore()}
    if(Math.random()<.9)vfxP({x:x+vR(-20,20),y:yb-vR(0,Hh*.6),vx:vR(40,160),vy:vR(-120,20),ay:300,life:vR(.3,.6),s:vR(2,5),c:rlRand(P),shape:'sq',vr:6,glow:false});
    pts.forEach((q,i)=>{if(!hit.has(i)&&x>=q.x){hit.add(i);paintBurst(q.x,q.y,Object.assign({},S,{paint:{shot:p.burst||p.shot}}),1.2,false)}});
    if(hit.size>=pts.length&&!this.r){this.r=1;res()}if(k>=1){this.done=true;if(!this.r)res()}}})})}
(function(){const prev=rlArtFire,prevSup=rlArtSupport;
  rlArtFire=async function(S,e,sk,ult){if(S.bySkill){const p=S.bySkill[e.s]||S.bySkill[0]||{},C=typeof RL_CUT!=='undefined'&&RL_CUT[S.hid]&&RL_CUT[S.hid][S.st]&&RL_CUT[S.hid][S.st][e.s];S=Object.assign({},S,{paint:p,bySkill:null},p.hand?{hand:p.hand}:{},C&&C.hand&&p.shot&&!p.up?{hand:C.hand}:{});
      if(p.aoe==='spearrain'){const pts=e.t.map(t=>rlbPt(t)).filter(Boolean);const h=rlArtHand(S);if(h)await vfxShootUp(h,S,p.img);return vfxSpearRain(pts,S,p.img)}
      if(p.aoe==='permafrost'){const pts=e.t.map(t=>rlbPt(t)).filter(Boolean);return vfxPermafrost(pts,S,p.img)}
      if(p.aoe==='meteor'){const pts=e.t.map(t=>rlbPt(t)).filter(Boolean);const h=rlArtHand(S);if(h)await vfxShootUp(h,S,p.img);return vfxMeteor(pts,p.shatter?Object.assign({},S,{shatter:1}):S,p.img)}
      if(p.aoe==='spearsweep'){const pts=e.t.map(t=>rlbPt(t)).filter(Boolean);return vfxSpearSweep(pts,S)}
      if(sk.tg==='eA'&&(p.aoe==='erupt'||p.aoe==='sweep')){const h=rlArtHand(S);const pts=e.t.map(t=>rlbPt(t)).filter(Boolean);if(!pts.length)return;if(p.up&&h){await vfxShootUp(h,S,p.up);}return p.aoe==='erupt'?paintErupt(pts,S):paintSweep(h,pts,S)}}
    return prev(S,e,sk,ult)};
  Object.values(RL_ART).forEach(A=>(A.spell||[]).forEach(S=>S&&S.bySkill&&S.bySkill.forEach(p=>p&&['shot','burst','sigil','aura','img','up'].forEach(k=>p[k]&&artImg(p[k])))));
})();

/* a broad spear sweep across the enemy line: silver slash arcs, dust and a shove */
function vfxSpearSweep(pts,S){if(!pts.length)return Promise.resolve();const P=S.vp,sp=vSp();
  return Promise.all(pts.map((q,i)=>new Promise(res=>{let t=-i*.07/sp,hit=false;const life=.42/sp,R=q.w*.75;
    VFX.items.push({step(dt,c){t+=dt;if(t<0)return;const k=t/life;if(k>=1){this.done=true;return}
      const a0=-2.4,a1=.6,a=a0+(a1-a0)*Math.min(1,k*1.6),fade=k<.6?1:1-(k-.6)/.4;
      c.save();c.translate(q.x,q.y);c.globalAlpha=fade;c.lineCap='round';
      for(let j=0;j<3;j++){c.strokeStyle=j===0?'rgba(60,45,30,.55)':j===1?'#e6ecf2':'#ffffff';c.lineWidth=[14,6,2][j];c.beginPath();c.arc(0,0,R,Math.max(a0,a-1.3),a);c.stroke()}
      c.restore();
      if(!hit&&k>.35){hit=true;rlbShake&&rlbShake(false);for(let j=0;j<14;j++)vfxP({x:q.x+vR(-q.w/3,q.w/3),y:q.y+q.h*.4,vx:vR(-160,160),vy:vR(-260,-80),ay:700,life:vR(.35,.6),s:vR(3,6),c:rlRand(['#8a6a4a','#c9a26a','#5a4630']),shape:'sq',vr:8,glow:false});
        vfxP({x:q.x,y:q.y,life:.3,s:6,grow:150,c:'#f4ead0',shape:'shock'});res()}}})})))}

/* ---------- Ren (fire fox): a fire crescent where his blade lands, and a ring of fire for Flame Ward ---------- */
function rlArtMelee(u,tp,big,si){const A=RL_ART[u.id];
  if(A&&A.impactSk&&A.impactSk[si]){const P=RL_VP[u.id],foot=tp.y+tp.h*.42;let t=0;const life=.7/vSp();
    VFX.items.push({step(dt,c){t+=dt;const k=t/life;if(k>=1){this.done=true;return}const g=Math.min(1,k/.2),a=k<.6?1:1-(k-.6)/.4;c.save();c.globalAlpha=a;
      for(let i=0;i<7;i++){const ox=(i-3)*tp.w*.13,r=tp.w*(.12+.05*Math.sin(i*1.7))*g;c.fillStyle=i%2?P[2]:P[3];c.beginPath();c.ellipse(tp.x+ox,foot-r*.35,r,r*.7,0,Math.PI,0);c.fill()}
      c.restore()}});for(let i=0;i<26;i++)vfxP({x:tp.x+vR(-tp.w/3,tp.w/3),y:tp.y+tp.h*.4,vx:vR(-160,160),vy:vR(-380,-140),ay:800,life:vR(.4,.8),s:vR(3,7),c:rlRand(P),shape:'sq',vr:8,glow:false});rlbShake(true);return true}if(A&&A.impact){const st=crStage(u.lv||crLv(u.id));paintErupt([tp],{vp:RL_VP[u.id],paint:{burst:A.impact[st]}});rlbShake(true);return true}
  if(!A||!A.slash)return false;const st=crStage(u.lv||crLv(u.id)),sp=vSp(),d=u.side?-1:1,R=tp.h*.55*(1+.12*st),P=RL_VP[u.id]||RL_VP.fox;let t=0;const life=.42/sp;
  VFX.items.push({step(dt,c){t+=dt;const k=Math.min(1,t/life),sw=-1.9+3.2*Math.min(1,k/.45),a=k<.45?1:1-(k-.45)/.55;c.save();c.translate(tp.x,tp.y);c.scale(d,1);c.globalCompositeOperation='lighter';
    for(let i=0;i<3;i++){const w=[26,15,6][i]*(1+.3*st),col=[P[3],P[2],P[0]][i];c.globalAlpha=a*[.55,.8,1][i];c.strokeStyle=col;c.lineWidth=w;c.lineCap='round';c.beginPath();c.arc(-R*.25,0,R,-1.9,Math.max(-1.89,sw));c.stroke()}
    c.restore();if(k<.5)for(let i=0;i<3;i++){const an=-1.9+3.2*Math.min(1,k/.45)+vR(-.2,.2);vfxP({x:tp.x+d*(Math.cos(an)*R-R*.25),y:tp.y+Math.sin(an)*R,vx:d*vR(20,140),vy:vR(-160,-40),ay:200,life:vR(.3,.6),s:vR(2,5),c:rlRand(P)})}
    if(k>=1)this.done=true}});
  vfxP({x:tp.x,y:tp.y,life:.3,s:8,grow:200,c:P[2],shape:'shock'});for(let i=0;i<18;i++){const a=Math.random()*6.283,v=vR(80,260);vfxP({x:tp.x,y:tp.y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-60,drag:.9,life:vR(.3,.6),s:vR(2,5),c:rlRand(P)})}
  return true}
function vfxFlameWard(S,e){const P=S.vp,sp=vSp(),big=S.big;e.t.forEach((uid,n)=>{const q=rlbPt(uid);if(!q)return;let t=-n*.08/sp;const life=1/sp,R=q.h*.62;
  VFX.items.push({step(dt,c){t+=dt;if(t<0)return;const k=t/life;if(k>=1){this.done=true;return}const g=Math.min(1,k/.3),a=k<.7?1:1-(k-.7)/.3;c.save();c.globalCompositeOperation='lighter';c.translate(q.x,q.y);
    c.globalAlpha=a*.25;c.fillStyle=P[2];c.beginPath();c.ellipse(0,0,R*.8*g,R*g,0,0,6.283);c.fill();
    for(let i=0;i<3;i++){c.globalAlpha=a*[.5,.8,1][i];c.strokeStyle=[P[3],P[2],P[1]][i];c.lineWidth=[12,7,3][i];c.beginPath();c.ellipse(0,0,R*.8*g,R*g,0,0,6.283);c.stroke()}
    c.restore();const fl=big?5:3;for(let i=0;i<fl;i++){const an=Math.random()*6.283;vfxP({x:q.x+Math.cos(an)*R*.8*g,y:q.y+Math.sin(an)*R*g,vy:vR(-150,-60),life:vR(.3,.6),s:vR(3,7),c:rlRand(P),shape:i%2?'c':'dia',vr:4})}}})})}
(function(){const prev=rlArtSupport;rlArtSupport=function(S,e,sk){if(S.support==='lantern')return vfxLantern(S,e,sk);if(S.support==='moonwell')return vfxMoonwell(S,e,sk);if(S.support==='flameward'||S.support==='ring')return vfxFlameWard(S,e);return prev(S,e,sk)}})();

/* volley fired skyward before an arrow rain lands: flaming arrows streak up off the top of the stage */
/* Permafrost Ring: a frost ring races out under each enemy and ice crystals spear up around them */
function vfxPermafrost(pts,S,src){const img=artImg(src),P=S.vp,sp=vSp();rlbShake(true);
  return Promise.all(pts.map((q,j)=>new Promise(res=>{let t=-j*.07/sp,hit=false;const life=1.2/sp,foot=q.y+q.h*.45;
    VFX.items.push({step(dt,c){t+=dt;if(t<0)return;const k=t/life;if(k>=1){this.done=true;return}if(k>.28&&!hit){hit=true;res()}
      if(!img)return;const g=Math.min(1,k/.28),e=1-Math.pow(1-g,3),sy=.25+.75*e,a=k<.72?Math.min(1,g*1.6):1-(k-.72)/.28;
      // the ring from the art, rising out of the ground under the enemy (its centre sits ~72% down the picture)
      const W=q.w*1.45*(.8+.2*e),H=W*img.naturalHeight/img.naturalWidth;c.save();c.globalAlpha=a;c.translate(q.x,foot);c.scale(1,sy);c.drawImage(img,-W/2,-H*.72,W,H);c.restore();
      if(Math.random()<.5)vfxP({x:q.x+vR(-W*.4,W*.4),y:foot-vR(0,q.h*.5),vx:vR(-15,15),vy:vR(-50,-10),life:vR(.4,.8),s:vR(2,3),c:rlRand(P),shape:'dia',vr:3})}})})))}

/* Ignition Burst: fireballs fly up off the staff, then drop straight onto each enemy and blossom into flame */
function vfxMeteor(pts,S,src){const img=artImg(src),P=S.vp,sp=vSp();
  return Promise.all(pts.map((q,j)=>new Promise(res=>{let t=-j*.08/sp,hit=false;const life=.36/sp,x1=q.x,y1=q.y+q.h*.18,x0=x1-q.h*.35,y0=y1-q.h*2.2,ang=Math.atan2(y1-y0,x1-x0),L=q.h*1.05;
    VFX.items.push({step(dt,c){t+=dt;if(t<0)return;const k=Math.min(1,t/life),e=k*k,x=x0+(x1-x0)*e,y=y0+(y1-y0)*e;
      if(img){const H=L*img.naturalHeight/img.naturalWidth;c.save();c.globalCompositeOperation='lighter';c.translate(x,y);c.rotate(ang);c.drawImage(img,-L*.88,-H/2,L,H);c.restore()}
      if(Math.random()<.9)vfxP({x:x+vR(-6,6),y:y-vR(0,20),vx:vR(-30,30),vy:vR(-90,-30),life:vR(.2,.45),s:vR(2,5),c:rlRand(P)});
      if(k>=1&&!hit){hit=true;this.done=true;(S.shatter?vfxShatter:vfxIgnite)(q,P);res()}}})})))}
// glass hitting home: a bright flash and a spray of glittering shards, no flame
function vfxShatter(q,P){const sp=vSp(),cy=q.y+q.h*.15;rlbShake(false);vfxP({x:q.x,y:cy,life:.3,s:8,grow:160,c:P[1],shape:'shock'});
  for(let i=0;i<26;i++){const an=Math.random()*6.283,v=vR(140,360);vfxP({x:q.x,y:cy,vx:Math.cos(an)*v,vy:Math.sin(an)*v-90,ay:520,life:vR(.35,.7)/sp,s:vR(3,7),c:rlRand(P),shape:'dia',vr:vR(-8,8)})}}
function vfxIgnite(q,P){const sp=vSp(),life=.7/sp,R=q.w*.62,foot=q.y+q.h*.42;let t=0;rlbShake(true);
  VFX.items.push({step(dt,c){t+=dt;const k=t/life;if(k>=1){this.done=true;return}const g=1-Math.pow(1-Math.min(1,k/.35),3),a=k<.45?1:1-(k-.45)/.55;
    c.save();c.globalCompositeOperation='lighter';
    // ground ring
    c.save();c.translate(q.x,foot);c.scale(1,.3);c.globalAlpha=a*.9;c.strokeStyle=P[2];c.lineWidth=6;c.beginPath();c.arc(0,0,R*1.15*g,0,6.283);c.stroke();c.globalAlpha=a*.45;c.fillStyle=P[3];c.beginPath();c.arc(0,0,R*1.1*g,0,6.283);c.fill();c.restore();
    // fireball bloom
    const cy=q.y+q.h*.1,rg=c.createRadialGradient(q.x,cy,0,q.x,cy,R*g);rg.addColorStop(0,P[0]);rg.addColorStop(.35,P[1]);rg.addColorStop(.7,P[2]);rg.addColorStop(1,'rgba(0,0,0,0)');
    c.globalAlpha=a*.95;c.fillStyle=rg;c.beginPath();c.arc(q.x,cy,R*g,0,6.283);c.fill();
    // petals of flame
    for(let i=0;i<8;i++){const an=i/8*6.283+k*1.2,r0=R*.35*g,r1=R*(.8+.25*Math.sin(i*2.3))*g;c.globalAlpha=a*.85;c.fillStyle=i%2?P[2]:P[1];c.beginPath();
      c.moveTo(q.x+Math.cos(an-.22)*r0,cy+Math.sin(an-.22)*r0);c.quadraticCurveTo(q.x+Math.cos(an)*r1*1.1,cy+Math.sin(an)*r1*1.1,q.x+Math.cos(an+.22)*r0,cy+Math.sin(an+.22)*r0);c.fill()}
    c.restore()}});
  for(let i=0;i<22;i++)vfxP({x:q.x+vR(-q.w*.35,q.w*.35),y:foot-vR(0,q.h*.3),vx:vR(-60,60),vy:vR(-360,-140),ay:-60,drag:.96,life:vR(.45,.85)/sp,s:vR(3,7),c:rlRand(P),shape:i%3?'c':'dia',vr:4});
  for(let i=0;i<14;i++){const an=Math.random()*6.283,v=vR(120,300);vfxP({x:q.x,y:q.y+q.h*.1,vx:Math.cos(an)*v,vy:Math.sin(an)*v-80,ay:400,life:vR(.3,.6),s:vR(2,4),c:rlRand(P)})}}

function vfxShootUp(h,S,src){const img=artImg(src),P=S.vp,sp=vSp(),n=5;
  return new Promise(res=>{let done=0;for(let i=0;i<n;i++){let t=-i*.06/sp;const life=.42/sp,ang=-Math.PI/2+h.d*(.22+i*.06),L=60*Math.max(1,h.k*1.7);
    VFX.items.push({step(dt,c){t+=dt;if(t<0)return;const k=Math.min(1,t/life),e=k*k,x=h.x+Math.cos(ang)*900*e,y=h.y+Math.sin(ang)*900*e;
      c.save();c.globalCompositeOperation='lighter';c.globalAlpha=k<.8?1:1-(k-.8)/.2;c.translate(x,y);c.rotate(ang);
      if(img){const H=L*img.naturalHeight/img.naturalWidth;c.drawImage(img,-L/2,-H/2,L,H)}c.restore();
      if(Math.random()<.8)vfxP({x,y,vx:vR(-30,30),vy:vR(40,120),life:vR(.2,.45),s:vR(2,5),c:rlRand(P)});
      if(k>=1){this.done=true;if(++done===n)res()}}})}
    vfxP({x:h.x,y:h.y,life:.3,s:8,grow:180,c:P[2],shape:'shock'})}).then(()=>new Promise(r=>setTimeout(r,60/sp)))}

/* Aurelle: healing that flows onto allies. 0 = a moonwater stream arcs from her staff to one ally;
   1 = dew rains down on every ally; 2 = a crescent moon rises and a sanctuary dome closes over the team */
const DEER_FX={stream:'art/fx-deer-stream.webp',dew:'art/fx-deer-dew.webp',moon:'art/fx-deer-moon.webp'};
function vfxMoonwell(S,e,sk){const P=S.vp,sp=vSp(),h=rlArtHand(S),pts=e.t.map(t=>({uid:t,q:rlbPt(t)})).filter(o=>o.q);if(!pts.length)return;const glow=(x,y,R)=>vfxP({x,y,life:.45,s:R*.3,grow:R*3,c:P[1],shape:'shock'});
  const sparkle=q=>{for(let i=0;i<18;i++)vfxP({x:q.x+vR(-q.w/3,q.w/3),y:q.y+vR(-q.h/3,q.h/2),vy:vR(-110,-40),life:vR(.5,.9),s:vR(2,5),c:rlRand(P),shape:i%3?'c':'star',vr:3});vfxHeal(q.x,q.y)};
  if(h)glow(h.x,h.y,14);
  if(e.s===0){const q=pts[0].q;if(!h){sparkle(q);return}
    return paintShot(h.x,h.y,q.x,q.y-q.h*.1,Object.assign({},S,{paint:{shot:DEER_FX.stream}}),Math.max(1,h.k*1.6),true,-90).then(()=>{sparkle(q);glow(q.x,q.y,20)})}
  if(e.s===1){const img=artImg(DEER_FX.dew);return Promise.all(pts.map(({q},i)=>new Promise(res=>{let t=-i*.08/sp,hit=false;const life=.7/sp,w=q.w*.95;
    VFX.items.push({step(dt,c){t+=dt;if(t<0)return;const k=t/life;if(k>=1){this.done=true;return}const y=q.y-q.h*1.3+q.h*1.1*Math.min(1,k/.5),a=k<.55?Math.min(1,k/.15):1-(k-.55)/.45;
      if(img){const H=w*img.naturalHeight/img.naturalWidth;c.save();c.globalAlpha=a*.7;c.drawImage(img,q.x-w/2,y-H*.75,w,H);c.restore()}
      if(Math.random()<.7)vfxP({x:q.x+vR(-w/2,w/2),y:y,vy:vR(120,260),life:vR(.2,.4),s:vR(2,4),c:rlRand(P)});
      if(!hit&&k>.45){hit=true;sparkle(q);res()}}})})))}
  // Sanctuary Bloom
  const img=artImg(DEER_FX.moon),xs=pts.map(o=>o.q.x),cx=(Math.min(...xs)+Math.max(...xs))/2,top=Math.min(...pts.map(o=>o.q.y-o.q.h*.9)),bot=Math.max(...pts.map(o=>o.q.y+o.q.h*.5)),
    rx=(Math.max(...xs)-Math.min(...xs))/2+pts[0].q.w*1.1,ry=(bot-top)*.75,cy=bot,life=1.3/sp;let t=0;
  return new Promise(res=>{let hit=false;VFX.items.push({step(dt,c){t+=dt;const k=t/life;if(k>=1){this.done=true;return}const g=Math.min(1,k/.35),a=k<.75?1:1-(k-.75)/.25;
    c.save();c.globalAlpha=a*.28*g;c.fillStyle=P[2];c.beginPath();c.ellipse(cx,cy,rx*g,ry*g,0,Math.PI,0);c.fill();
    c.globalAlpha=a*.9;c.strokeStyle=P[1];c.lineWidth=4;c.beginPath();c.ellipse(cx,cy,rx*g,ry*g,0,Math.PI,0);c.stroke();
    c.globalAlpha=a*.5;c.lineWidth=10;c.strokeStyle=P[2];c.beginPath();c.ellipse(cx,cy,rx*g*1.04,ry*.18*g,0,0,6.283);c.stroke();
    if(img){const w=60*Math.max(1,(h?h.k:1)*1.5)*(.6+.4*g),my=cy-ry*g-w*.35;c.globalAlpha=a;c.drawImage(img,cx-w/2,my-w/2,w,w)}c.restore();
    if(Math.random()<.8)vfxP({x:cx+vR(-rx,rx)*g,y:cy-vR(0,ry)*g,vy:vR(-60,-20),life:vR(.5,.9),s:vR(2,4),c:rlRand(P),shape:'star',vr:2});
    if(!hit&&k>.4){hit=true;pts.forEach(o=>sparkle(o.q));res()}}})})}
Object.values(DEER_FX).forEach(artImg);

/* Brenna: lantern light on allies. 0 = a star-beam from her lantern to one ally; 1 = golden rings rise
   around every ally; 2 = a pillar of dawn light and a rune circle raise the chosen ally */
function vfxLantern(S,e,sk){const P=S.vp,sp=vSp(),h=rlArtHand(S),pts=e.t.map(t=>rlbPt(t)).filter(Boolean);if(!pts.length)return;
  const sparkle=q=>{for(let i=0;i<16;i++)vfxP({x:q.x+vR(-q.w/3,q.w/3),y:q.y+vR(-q.h/3,q.h/2),vy:vR(-110,-40),life:vR(.5,.9),s:vR(2,5),c:rlRand(P),shape:i%3?'c':'star',vr:3});vfxHeal(q.x,q.y)};
  if(h)vfxP({x:h.x,y:h.y,life:.45,s:6,grow:160,c:P[2],shape:'shock'});
  if(e.s===0){const q=pts[0];if(!h){sparkle(q);return}return paintShot(h.x,h.y,q.x,q.y-q.h*.1,Object.assign({},S,{paint:{shot:S.beam}}),Math.max(1,h.k*1.6),false,-40).then(()=>sparkle(q))}
  if(e.s===1)return Promise.all(pts.map((q,i)=>new Promise(res=>{let t=-i*.07/sp,hit=false;const life=.9/sp,foot=q.y+q.h*.42;
    VFX.items.push({step(dt,c){t+=dt;if(t<0)return;const k=t/life;if(k>=1){this.done=true;return}const a=k<.7?1:1-(k-.7)/.3;c.save();c.globalCompositeOperation='lighter';
      for(let j=0;j<3;j++){const kk=Math.max(0,Math.min(1,k*1.4-j*.18)),y=foot-q.h*.75*kk,rx=q.w*(.55+.1*j);c.globalAlpha=a*(1-kk*.6);c.strokeStyle=j%2?P[1]:P[2];c.lineWidth=5;c.beginPath();c.ellipse(q.x,y,rx,rx*.22,0,0,6.283);c.stroke()}
      c.restore();if(!hit&&k>.4){hit=true;sparkle(q);res()}}})})));
  // Second Dawn: pillar of light + rune circle on the chosen ally
  const q=pts[0],foot=q.y+q.h*.45,life=1.2/sp;let t=0;
  return new Promise(res=>{let hit=false;VFX.items.push({step(dt,c){t+=dt;const k=t/life;if(k>=1){this.done=true;return}const g=Math.min(1,k/.25),a=k<.75?1:1-(k-.75)/.25;
    c.save();c.globalCompositeOperation='lighter';c.globalAlpha=a;
    const w=q.w*.8*g,gr=c.createLinearGradient(q.x-w,0,q.x+w,0);gr.addColorStop(0,'rgba(255,200,90,0)');gr.addColorStop(.5,'rgba(255,240,190,.85)');gr.addColorStop(1,'rgba(255,200,90,0)');
    c.fillStyle=gr;c.fillRect(q.x-w,0,w*2,foot);
    c.strokeStyle=P[2];c.lineWidth=4;c.beginPath();c.ellipse(q.x,foot,q.w*.9*g,q.w*.22*g,0,0,6.283);c.stroke();
    c.lineWidth=2;c.strokeStyle=P[1];c.beginPath();c.ellipse(q.x,foot,q.w*.65*g,q.w*.15*g,0,0,6.283);c.stroke();
    c.beginPath();for(let i=0;i<8;i++){const an=i*Math.PI/4+t;c.moveTo(q.x,foot);c.lineTo(q.x+Math.cos(an)*q.w*.65*g,foot+Math.sin(an)*q.w*.15*g)}c.stroke();c.restore();
    if(Math.random()<.9)vfxP({x:q.x+vR(-w,w),y:foot-vR(0,q.h),vy:vR(-140,-60),life:vR(.4,.8),s:vR(2,5),c:rlRand(P),shape:'star',vr:3});
    if(!hit&&k>.35){hit=true;sparkle(q);res()}}})})}

/* Kestran: a storm of jade spears slams down diagonally onto every enemy */
function vfxSpearRain(pts,S,src){const img=artImg(src),P=S.vp,sp=vSp();
  return Promise.all(pts.map((q,j)=>Promise.all([0,1,2].map(i=>new Promise(res=>{let t=-(i*.09+j*.05)/sp,hit=false;const life=.32/sp,w=q.w*.55,
      x1=q.x+vR(-q.w*.25,q.w*.25),y1=q.y+vR(-q.h*.1,q.h*.3),x0=x1-q.h*1.1,y0=y1-q.h*1.6;
    VFX.items.push({step(dt,c){t+=dt;if(t<0)return;const k=Math.min(1,t/life),x=x0+(x1-x0)*k,y=y0+(y1-y0)*k;
      if(img){const H=w*img.naturalHeight/img.naturalWidth;c.save();c.globalAlpha=k<.9?1:1-(k-.9)/.1;c.translate(x,y);c.drawImage(img,-w*.8,-H*.8,w,H);c.restore()}
      if(Math.random()<.6)vfxP({x,y,vx:vR(-30,30),vy:vR(-60,-20),life:vR(.2,.4),s:vR(2,4),c:rlRand(P)});
      if(k>=1&&!hit){hit=true;this.done=true;vfxP({x:x1,y:y1,life:.3,s:6,grow:150,c:P[2],shape:'shock'});for(let n=0;n<8;n++)vfxP({x:x1,y:y1,vx:vR(-150,150),vy:vR(-200,-40),ay:500,life:vR(.3,.6),s:vR(2,4),c:rlRand(P),shape:'dia',vr:6});res()}}})})))))}
