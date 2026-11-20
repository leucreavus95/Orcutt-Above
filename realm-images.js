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
  halo:{f:[{src:'art/halo-1.webp',ax:99,ay:520,h:520,w:199,ih:520,ht:7,cx:99,sc:0.6582,fy:40},{src:'art/halo-2.webp',ax:106,ay:520,h:520,w:212,ih:520,ht:5,cx:102,sc:0.6484,fy:40},{src:'art/halo-3.webp',ax:123,ay:520,h:520,w:246,ih:520,ht:8,cx:138,sc:0.6168,fy:45}],
        // the spell each form throws, matched to its casting art.
        // hand = where the spell leaves his hand, in sprite units from his feet (x forward, y up)
        spell:[{kind:'bolt',paint:{shot:'art/fx-halo-shot1.webp',aoe:'fan'},vp:['#ffffff','#e4ffd0','#8df06a','#2f9d3c'],hand:[68,136]},
               {kind:'lance',paint:{shot:'art/fx-halo-shot2.webp',aoe:'fan'},vp:['#ffffff','#fff3c0','#ffd24a','#d98a12'],hand:[34,137]},
               {kind:'shards',paint:{shot:'art/fx-halo-shot3.webp',sigil:'art/fx-halo-sigil3.webp',aoe:'fan'},vp:['#ffffff','#e6dcff','#a98bff','#5a2fd6'],hand:[58,132]}],
        c:[[{src:'art/halo-1c1.webp',ax:218,ay:477,h:536},{src:'art/halo-1c2.webp',ax:216,ay:507,h:536},{src:'art/halo-1c3.webp',ax:190,ay:429,h:479}],
           [{src:'art/halo-2c1.webp',ax:267,ay:514,h:536},{src:'art/halo-2c2.webp',ax:272,ay:493,h:536},{src:'art/halo-2c3.webp',ax:290,ay:416,h:479}],
           [{src:'art/halo-3c1.webp',ax:309,ay:526,h:536},{src:'art/halo-3c2.webp',ax:250,ay:504,h:536},{src:'art/halo-3c3.webp',ax:290,ay:421,h:479}]],
        },
  kael:{f:[{src:'art/kael-1.webp',ax:100,ay:528,h:527,w:323,ih:550,ht:8,cx:150,fy:60},{src:'art/kael-2.webp',ax:121,ay:531,h:529,w:357,ih:552,ht:6,cx:205,fy:60},{src:'art/kael-3.webp',ax:107,ay:548,h:533,w:339,ih:567,ht:6,cx:199,fy:60}],
        c:[[{src:'art/kael-1c1.webp',ax:320,ay:601,h:592,w:609,ih:647,ht:38,cx:386},{src:'art/kael-1c2.webp',ax:349,ay:615,h:592,w:643,ih:682,ht:72,cx:359},{src:'art/kael-1c3.webp',ax:229,ay:483,h:592,w:650,ih:528,ht:20,cx:309}],
           [{src:'art/kael-2c1.webp',ax:227,ay:610,h:627,w:682,ih:659,ht:79,cx:385},{src:'art/kael-2c2.webp',ax:333,ay:620,h:627,w:645,ih:679,ht:38,cx:432},{src:'art/kael-2c3.webp',ax:203,ay:608,h:627,w:624,ih:648,ht:77,cx:333}],
           [{src:'art/kael-3c1.webp',ax:264,ay:595,h:623,w:658,ih:612,ht:23,cx:368},{src:'art/kael-3c2.webp',ax:289,ay:645,h:623,w:654,ih:679,ht:27,cx:404},{src:'art/kael-3c3.webp',ax:163,ay:561,h:623,w:661,ih:602,ht:31,cx:385}]],
        // Kael's own magic: a compass rose that charts a route (skill 1), stars falling
        // from a constellation map (skill 3), and wind ribbons for allies (skill 2)
        spell:[{kind:'needle',support:'paint',paint:{shot:'art/fx-kael-shot1.webp',aura:'art/fx-kael-vortex.webp',aoe:'rain',route:true},vp:['#ffffff','#dffff5','#7fe8c8','#1f8c78'],hand:[61,106]},
               {kind:'needle',support:'paint',paint:{shot:'art/fx-kael-shot2.webp',sigil:'art/fx-kael-sigil2.webp',aura:'art/fx-kael-vortex.webp',aoe:'rain',route:true},vp:['#ffffff','#fff1c8','#ffcf5a','#3fae98'],hand:[55,125]},
               {kind:'needle',support:'paint',paint:{shot:'art/fx-kael-shot3.webp',sigil:'art/fx-kael-sigil3.webp',aura:'art/fx-kael-vortex.webp',aoe:'rain',route:true},vp:['#ffffff','#e9defc','#b28cff','#2b1d44'],hand:[70,139]}]},
  // Thornwick: each casting picture belongs to one skill (attack, shield, special),
  // so he takes the pose of the skill he is using instead of playing a sequence.
  thornwick:{f:[{src:'art/thornwick-1.webp',ax:140,ay:409,h:490,w:254,ih:422,ht:15,cx:131,fy:95},{src:'art/thornwick-2.webp',ax:199,ay:588,h:490,w:361,ih:595,ht:83,cx:210,fy:120},{src:'art/thornwick-3.webp',ax:201,ay:598,h:520,w:375,ih:604,ht:27,cx:185,fy:110}],pose:'skill',
        c:[[{src:'art/thornwick-1c1.webp',ax:348,ay:556,h:598,w:652,ih:574,ht:72,cx:342},{src:'art/thornwick-1c2.webp',ax:240,ay:526,h:598,w:459,ih:539,ht:13,cx:258},{src:'art/thornwick-1c3.webp',ax:218,ay:508,h:598,w:613,ih:521,ht:21,cx:249}],
           [{src:'art/thornwick-2c1.webp',ax:323,ay:603,h:560,w:613,ih:626,ht:52,cx:304},{src:'art/thornwick-2c2.webp',ax:338,ay:619,h:560,w:608,ih:636,ht:54,cx:349},{src:'art/thornwick-2c3.webp',ax:244,ay:542,h:560,w:659,ih:584,ht:50,cx:333}],
           [{src:'art/thornwick-3c1.webp',ax:251,ay:634,h:514,w:573,ih:645,ht:56,cx:291},{src:'art/thornwick-3c2.webp',ax:317,ay:630,h:514,w:648,ih:645,ht:16,cx:321},{src:'art/thornwick-3c3.webp',ax:298,ay:622,h:514,w:658,ih:645,ht:44,cx:358}]],
        spell:[0,1,2].map(()=>({kind:'roots',aoe:'bloom',support:'barkshield',vp:['#ffffff','#e3ffc9','#9ee35f','#3f7a23'],wood:['#8a6238','#5a3c1f'],hand:[70,150]}))},
  // Kheprin, the desert scarab: one casting picture per skill, and painted effects per skill
  scarab:{f:[{src:'art/scarab-1.webp',ax:144,ay:380,h:486,w:226,ih:396,ht:29,cx:148,fy:50},{src:'art/scarab-2.webp',ax:210,ay:483,h:486,w:325,ih:488,ht:29,cx:217,fy:45},{src:'art/scarab-3.webp',ax:191,ay:575,h:516,w:370,ih:582,ht:26,cx:190,fy:120}],pose:'skill',
        c:[[{src:'art/scarab-1c1.webp',ax:286,ay:423,h:528,w:643,ih:462,ht:52,cx:273},{src:'art/scarab-1c2.webp',ax:264,ay:466,h:528,w:609,ih:505,ht:49,cx:276},{src:'art/scarab-1c3.webp',ax:210,ay:477,h:528,w:613,ih:508,ht:45,cx:206}],
           [{src:'art/scarab-2c1.webp',ax:379,ay:497,h:579,w:700,ih:540,ht:42,cx:324},{src:'art/scarab-2c2.webp',ax:400,ay:531,h:579,w:701,ih:574,ht:57,cx:355},{src:'art/scarab-2c3.webp',ax:406,ay:517,h:579,w:703,ih:560,ht:39,cx:312}],
           [{src:'art/scarab-3c1.webp',ax:377,ay:571,h:704,w:703,ih:615,ht:16,cx:309},{src:'art/scarab-3c2.webp',ax:372,ay:636,h:704,w:703,ih:679,ht:46,cx:347},{src:'art/scarab-3c3.webp',ax:381,ay:652,h:704,w:703,ih:694,ht:26,cx:337}]],
        spell:[{vp:['#ffffff','#fff1c8','#f0c062','#a8661c'],hand:[60,112],bySkill:[{shot:'art/fx-sc-arc1.webp'},{shot:'art/fx-sc-coins.webp'},{burst:'art/fx-sc-burst1.webp',aoe:'erupt'}]},
               {vp:['#ffffff','#fff1c8','#f0c062','#a8661c'],hand:[70,124],bySkill:[{shot:'art/fx-sc-arc2.webp'},{shot:'art/fx-sc-spear.webp'},{burst:'art/fx-sc-wave2.webp',aoe:'sweep'}]},
               {vp:['#ffffff','#fff1c8','#f0c062','#a8661c'],hand:[70,128],bySkill:[{shot:'art/fx-sc-sun.webp'},{shot:'art/fx-sc-swirl.webp'},{shot:'art/fx-sc-sparks.webp',aoe:'fan'}]}]},
  // Corvin, the arctic raven duelist: one casting picture per skill, painted ice effects per skill
  raven:{f:[{src:'art/raven-1.webp',ax:154,ay:415,h:496,w:268,ih:425,ht:8,cx:150,fy:60},{src:'art/raven-2.webp',ax:180,ay:598,h:496,w:329,ih:608,ht:47,cx:179,fy:70},{src:'art/raven-3.webp',ax:174,ay:596,h:527,w:354,ih:609,ht:24,cx:171,fy:70}],pose:'skill',
        c:[[{src:'art/raven-1c1.webp',ax:283,ay:532,h:564,w:701,ih:645,ht:135,cx:287},{src:'art/raven-1c2.webp',ax:279,ay:470,h:564,w:714,ih:556,ht:21,cx:305},{src:'art/raven-1c3.webp',ax:249,ay:501,h:564,w:696,ih:556,ht:17,cx:269}],
           [{src:'art/raven-2c1.webp',ax:243,ay:564,h:635,w:703,ih:638,ht:36,cx:248},{src:'art/raven-2c2.webp',ax:277,ay:566,h:635,w:714,ih:623,ht:15,cx:264},{src:'art/raven-2c3.webp',ax:240,ay:563,h:635,w:696,ih:634,ht:63,cx:261}],
           [{src:'art/raven-3c1.webp',ax:237,ay:626,h:713,w:700,ih:692,ht:49,cx:242},{src:'art/raven-3c2.webp',ax:352,ay:588,h:713,w:714,ih:657,ht:50,cx:336},{src:'art/raven-3c3.webp',ax:304,ay:634,h:713,w:696,ih:682,ht:40,cx:233}]],
        spell:[{vp:['#ffffff','#e4f6ff','#8fd3ff','#2a6aa8'],hand:[70,110],bySkill:[{shot:'art/fx-rv-slash1.webp'},{shot:'art/fx-rv-shards.webp'},{burst:'art/fx-rv-frostburst.webp',aoe:'erupt'}]},
               {vp:['#ffffff','#e4f6ff','#8fd3ff','#2a6aa8'],hand:[80,130],bySkill:[{shot:'art/fx-rv-crescent.webp'},{shot:'art/fx-rv-shards.webp'},{burst:'art/fx-rv-wave.webp',aoe:'sweep'}]},
               {vp:['#ffffff','#e4f6ff','#8fd3ff','#2a6aa8'],hand:[80,135],bySkill:[{shot:'art/fx-rv-orb.webp'},{shot:'art/fx-rv-shards.webp'},{shot:'art/fx-rv-spiral.webp',aoe:'fan'}]}]},
  // Varek, the dusk blade: one casting picture per skill, painted crimson-and-ember effects per skill
  dusk:{f:[{src:'art/dusk-1.webp',ax:148,ay:494,h:562,w:236,ih:504,ht:7,cx:155,fy:45},{src:'art/dusk-2.webp',ax:214,ay:562,h:562,w:341,ih:573,ht:9,cx:224,fy:45},{src:'art/dusk-3.webp',ax:195,ay:602,h:597,w:358,ih:611,ht:25,cx:201,fy:65}],pose:'skill',
        c:[[{src:'art/dusk-1c1.webp',ax:317,ay:594,h:541,w:703,ih:679,ht:150,cx:325},{src:'art/dusk-1c2.webp',ax:341,ay:489,h:541,w:692,ih:571,ht:18,cx:349},{src:'art/dusk-1c3.webp',ax:420,ay:592,h:541,w:706,ih:703,ht:159,cx:402}],
           [{src:'art/dusk-2c1.webp',ax:324,ay:605,h:667,w:703,ih:630,ht:21,cx:313},{src:'art/dusk-2c2.webp',ax:327,ay:501,h:667,w:701,ih:595,ht:19,cx:301},{src:'art/dusk-2c3.webp',ax:355,ay:638,h:667,w:706,ih:703,ht:98,cx:387}],
           [{src:'art/dusk-3c1.webp',ax:319,ay:678,h:715,w:697,ih:704,ht:42,cx:329},{src:'art/dusk-3c2.webp',ax:333,ay:592,h:715,w:703,ih:668,ht:32,cx:279},{src:'art/dusk-3c3.webp',ax:284,ay:651,h:715,w:704,ih:706,ht:67,cx:303}]],
        spell:[{vp:['#ffffff','#ffe1c2','#ff8a4a','#8e1c22'],hand:[75,120],bySkill:[{shot:'art/fx-dk-cres1.webp'},{shot:'art/fx-dk-ring2.webp'},{shot:'art/fx-dk-cres1.webp',aoe:'fan'}]},
               {vp:['#ffffff','#ffe1c2','#ff8a4a','#8e1c22'],hand:[85,120],bySkill:[{shot:'art/fx-dk-flame2.webp'},{shot:'art/fx-dk-ring2.webp'},{burst:'art/fx-dk-impact2.webp',aoe:'erupt'}]},
               {vp:['#ffffff','#ffe1c2','#ff8a4a','#8e1c22'],hand:[85,130],bySkill:[{shot:'art/fx-dk-fly3.webp'},{shot:'art/fx-dk-beam3.webp'},{burst:'art/fx-dk-erupt3.webp',aoe:'erupt'}]}]},
  // Orrin, the astral spellweaver: one casting picture per skill, painted starlight effects per skill
  astra:{f:[{src:'art/astra-1.webp',ax:132,ay:382,h:372,w:239,ih:401,ht:5,cx:129,fy:45},{src:'art/astra-2.webp',ax:191,ay:546,h:496,w:335,ih:567,ht:54,cx:203,fy:95},{src:'art/astra-3.webp',ax:169,ay:609,h:560,w:353,ih:631,ht:11,cx:165,fy:120}],pose:'skill',
        c:[[{src:'art/astra-1c1.webp',ax:282,ay:624,h:560,w:703,ih:703,ht:193,cx:312},{src:'art/astra-1c2.webp',ax:239,ay:486,h:560,w:700,ih:563,ht:16,cx:293},{src:'art/astra-1c3.webp',ax:293,ay:564,h:560,w:676,ih:703,ht:157,cx:343}],
           [{src:'art/astra-2c1.webp',ax:381,ay:651,h:602,w:703,ih:708,ht:72,cx:349},{src:'art/astra-2c2.webp',ax:386,ay:580,h:602,w:708,ih:638,ht:60,cx:353},{src:'art/astra-2c3.webp',ax:232,ay:647,h:602,w:693,ih:708,ht:129,cx:243}],
           [{src:'art/astra-3c1.webp',ax:262,ay:634,h:616,w:703,ih:701,ht:42,cx:358},{src:'art/astra-3c2.webp',ax:374,ay:643,h:616,w:708,ih:699,ht:18,cx:384},{src:'art/astra-3c3.webp',ax:303,ay:652,h:616,w:701,ih:701,ht:30,cx:298}]],
        spell:[{vp:['#ffffff','#f1e4ff','#b98cff','#3b2385'],hand:[60,118],bySkill:[{shot:'art/fx-as-bolt1.webp'},{shot:'art/fx-as-arc1.webp'},{shot:'art/fx-as-shards1.webp',aoe:'fan'}]},
               {vp:['#ffffff','#f1e4ff','#b98cff','#3b2385'],hand:[80,128],bySkill:[{shot:'art/fx-as-beam2.webp'},{shot:'art/fx-as-ring2.webp'},{burst:'art/fx-as-swirl2.webp',aoe:'sweep'}]},
               {vp:['#ffffff','#f1e4ff','#b98cff','#3b2385'],hand:[80,130],bySkill:[{shot:'art/fx-as-rain3.webp'},{shot:'art/fx-as-portal3.webp'},{shot:'art/fx-as-bolt1.webp',sigil:'art/fx-as-portal3.webp',aoe:'rain'}]}]},
  // Sylvara, the astral archer: one casting picture per skill, painted arrow effects per skill
  sylva:{f:[{src:'art/sylva-1.webp',ax:132,ay:437,h:459,w:251,ih:447,ht:5,cx:135,fy:40},{src:'art/sylva-2.webp',ax:176,ay:522,h:533,w:335,ih:532,ht:6,cx:172,fy:45},{src:'art/sylva-3.webp',ax:166,ay:609,h:580,w:325,ih:618,ht:22,cx:147,fy:100}],pose:'skill',
        c:[[{src:'art/sylva-1c1.webp',ax:269,ay:542,h:588,w:629,ih:591,ht:87,cx:286},{src:'art/sylva-1c2.webp',ax:269,ay:584,h:588,w:704,ih:701,ht:138,cx:290},{src:'art/sylva-1c3.webp',ax:228,ay:504,h:588,w:694,ih:584,ht:68,cx:250}],
           [{src:'art/sylva-2c1.webp',ax:274,ay:662,h:630,w:703,ih:699,ht:111,cx:291},{src:'art/sylva-2c2.webp',ax:277,ay:616,h:630,w:708,ih:675,ht:87,cx:306},{src:'art/sylva-2c3.webp',ax:269,ay:641,h:630,w:696,ih:701,ht:127,cx:291}],
           [{src:'art/sylva-3c1.webp',ax:233,ay:587,h:630,w:679,ih:666,ht:83,cx:267},{src:'art/sylva-3c2.webp',ax:337,ay:624,h:630,w:707,ih:686,ht:43,cx:363},{src:'art/sylva-3c3.webp',ax:233,ay:616,h:630,w:676,ih:671,ht:40,cx:257}]],
        spell:[{vp:['#ffffff','#fff4cc','#9ee6a0','#2f7a4a'],hand:[90,128],bySkill:[{shot:'art/fx-ar-leaf1.webp'},{shot:'art/fx-ar-twin1.webp'},{shot:'art/fx-ar-twin1.webp',aoe:'fan'}]},
               {vp:['#ffffff','#fff4cc','#9ee6a0','#2f7a4a'],hand:[95,135],bySkill:[{shot:'art/fx-ar-leaf2.webp'},{shot:'art/fx-ar-triple2.webp'},{shot:'art/fx-ar-gold2.webp',aoe:'fan'}]},
               {vp:['#ffffff','#fff4cc','#9ee6a0','#2f7a4a'],hand:[95,135],bySkill:[{shot:'art/fx-ar-burst3.webp'},{shot:'art/fx-ar-star3.webp'},{shot:'art/fx-ar-star3.webp',burst:'art/fx-ar-burst3.webp',aoe:'fan'}]}]},
  // Kairo, the waterweaver: one casting picture per skill, painted water effects per skill
  kairo:{f:[{src:'art/tide-1.webp',ax:102,ay:308,h:347,w:159,ih:315,ht:4,cx:104,fy:20},{src:'art/tide-2.webp',ax:195,ay:410,h:446,w:304,ih:419,ht:6,cx:198,fy:30},{src:'art/tide-3.webp',ax:234,ay:608,h:580,w:456,ih:617,ht:24,cx:233,fy:100}],pose:'skill',
        c:[[{src:'art/tide-1c1.webp',ax:377,ay:588,h:560,w:703,ih:659,ht:69,cx:391},{src:'art/tide-1c2.webp',ax:350,ay:650,h:560,w:708,ih:669,ht:80,cx:421},{src:'art/tide-1c3.webp',ax:260,ay:599,h:560,w:701,ih:700,ht:117,cx:287}],
           [{src:'art/tide-2c1.webp',ax:249,ay:654,h:616,w:703,ih:675,ht:66,cx:335},{src:'art/tide-2c2.webp',ax:409,ay:630,h:616,w:708,ih:701,ht:93,cx:380},{src:'art/tide-2c3.webp',ax:396,ay:633,h:616,w:701,ih:708,ht:106,cx:348}],
           [{src:'art/tide-3c1.webp',ax:297,ay:676,h:658,w:699,ih:697,ht:31,cx:250},{src:'art/tide-3c2.webp',ax:267,ay:664,h:658,w:708,ih:685,ht:33,cx:244},{src:'art/tide-3c3.webp',ax:359,ay:678,h:658,w:700,ih:697,ht:50,cx:368}]],
        spell:[{vp:['#ffffff','#dff7ff','#5fd0e6','#0f5a6e'],hand:[70,120],bySkill:[{shot:'art/fx-wv-arc1.webp'},{shot:'art/fx-wv-swirl1.webp'},{shot:'art/fx-wv-spike1.webp',aoe:'fan'}]},
               {vp:['#ffffff','#dff7ff','#5fd0e6','#0f5a6e'],hand:[90,130],bySkill:[{shot:'art/fx-wv-lance2.webp'},{shot:'art/fx-wv-wave2.webp'},{burst:'art/fx-wv-vortex2.webp',aoe:'sweep'}]},
               {vp:['#ffffff','#dff7ff','#5fd0e6','#0f5a6e'],hand:[95,130],bySkill:[{shot:'art/fx-wv-spear3.webp'},{shot:'art/fx-wv-whirl3.webp'},{burst:'art/fx-wv-geyser3.webp',aoe:'erupt'}]}]},
};
(function(){
  const preload=()=>{for(const id in RL_ART)RL_ART[id].f.forEach(f=>{const i=new Image();i.src=f.src})};preload();
  const lvOf=(id,o)=>o.lv!=null?o.lv:(o.stage!=null?[1,CR_EVO[0],CR_EVO[1]][o.stage]:crLv(id));
  const oldPort=rlHeroSVG,oldBody=rlHeroBody;
  // card portrait: element backdrop, figure shown head to knees
  rlHeroSVG=function(id,opt){const A=RL_ART[id];if(!A)return oldPort(id,opt);
    const o=opt||{},h=RL_H[id],E=RL_EL[h.el],lv=lvOf(id,o),s=crStage(lv),F=A.f[s],u='ra'+id+s;
    // zoom to head-to-knees, but never wider than the card, and centre the whole picture
    // (body plus any floating effects) so nothing gets cut off at the sides
    const R=A.f[1]||F,L=Math.max(40,(R.ay-(R.fy!=null?R.fy:R.ht||0))/(R.sc||1)),kk=320/L/(F.sc||1),W=F.w*kk,H=F.ih*kk,x=100-(F.cx!=null?F.cx:F.ax)*kk,y=58-(F.fy!=null?F.fy:(F.ht||0)+40)*kk; // one zoom per hero; every form's eyes sit on the same line
    const motes=o.motes===false?'':[[.1,.2,2.6,0],[.16,.7,2,1.2],[.86,.16,2.2,.6],[.08,.48,1.6,2],[.9,.66,1.8,1.6]].map(m=>`<circle class="rl-mote" cx="${m[0]*200}" cy="${m[1]*220}" r="${m[2]*1.3}" fill="${E.l}" style="animation-delay:-${m[3]}s"/>`).join('');
    return`<svg class="rl-port cr-port rl-art" viewBox="0 0 200 220" role="img" aria-label="${esc(crName(id,lv))}"><defs><radialGradient id="${u}bg" cx=".55" cy=".42" r=".8"><stop offset="0" stop-color="${E.l}" stop-opacity=".6"/><stop offset=".45" stop-color="${E.c}" stop-opacity=".55"/><stop offset="1" stop-color="${E.d}"/></radialGradient></defs><rect class="crbg" width="200" height="220" fill="#0f0d14"/><rect class="crbg" width="200" height="220" fill="url(#${u}bg)"/><g class="crbg" opacity=".2" stroke="${E.l}" fill="none"><circle cx="104" cy="110" r="84" stroke-width="1.2"/></g>${motes}<image href="${F.src}" x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${W.toFixed(1)}" height="${H.toFixed(1)}" preserveAspectRatio="none"/></svg>`};
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
const AX0=-60,AY0=-80,AW=420,AH=330,STRIPS=72;
const CAST_T=[0,70,260,320,480,520,950,1100,1150]; // reach in, hold, to charge, hold, to release (spell fires at 500), hold, back out, end
function rlArtLead(id){const A=RL_ART[id];return A&&A.c&&A.c.some(x=>x&&x.length)?260:0}
const aEase=k=>k<0?0:k>1?1:k*k*(3-2*k),aBack=k=>{k=Math.min(1,Math.max(0,k));const c=1.7;return 1+(c+1)*Math.pow(k-1,3)+c*Math.pow(k-1,2)};
function artPose(st,now,speed){ // the figure's shape at this moment
  const t=(now+st.ph)/1000,P={lean:0,sy:1,sx:1,chest:0,sway:0,drift:0,glow:0,pose:0,ring:0};
  if(!STILL){P.chest=.014*Math.sin(t*2.2);P.sy=1+.007*Math.sin(t*2.2);P.sway=1.7;P.drift=1.3*Math.sin(t*.8)}
  if(st.cast>=0&&st.frames&&st.mode==='skill'){const T=(now-st.cast)*speed,i=Math.max(0,Math.min(2,st.sk|0));
    if(T>=1150)st.cast=-1;else{const fi=Math.min(1,T/90),fo=T>1000?Math.min(1,(T-1000)/150):0;
      P.seq=fo>0?[[i,1-fo],[-1,fo]]:fi<1?[[-1,1-fi],[i,fi]]:[[i,1]];P.pulse=T>200&&T<700?.02*Math.sin((T-200)/40):0;P.kick=T>480&&T<900?Math.exp(-(T-480)/140):0;
      P.ring=Math.min(1,T/120)*(1-fo);P.glow=0}}
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
  const F0=A.f[s],img=artImg(F0.src);if(!img)return;const FR=A.c&&A.c[s]&&A.c[s].length?A.c[s]:null;if(FR)FR.forEach(f=>artImg(f.src));
  const dpr=Math.min(2,window.devicePixelRatio||1),cw=Math.round(cv.clientWidth*dpr),ch=Math.round(cv.clientHeight*dpr);if(!cw||!ch)return;
  if(cv.width!==cw||cv.height!==ch){cv.width=cw;cv.height=ch}
  const spr=cv.closest('.rlb-spr'),unit=cv.closest('.rlb-u'),b=typeof rlUI==='function'&&rlUI().b,speed=b&&b.speed||1,dir=unit&&unit.classList.contains('e')?-1:1;
  let st=ART_ST.get(cv);if(!st){st={ph:Math.random()*9000,cast:-1,hit:-1,dash:-1,buf:document.createElement('canvas')};ART_ST.set(cv,st);
    // the battle re-adds these classes within one frame, so watch each change
    const watch=(el,cls,key)=>{if(!el)return;new MutationObserver(rs=>{for(const r of rs)if(!(r.oldValue||'').split(' ').includes(cls)&&el.classList.contains(cls)){st[key]=performance.now();break}}).observe(el,{attributes:true,attributeFilter:['class'],attributeOldValue:true})};
    watch(spr,'cast','cast');new MutationObserver(()=>{if(spr&&spr.dataset.sk!=null)st.sk=+spr.dataset.sk}).observe(spr,{attributes:true,attributeFilter:['data-sk']});if(spr&&spr.dataset.sk!=null)st.sk=+spr.dataset.sk;watch(unit,'hit','hit');watch(spr,'dash','dash')}
  st.dashOn=!!(spr&&spr.classList.contains('dash'));st.mode=A.pose||'seq';st.frames=!!(FR&&FR.every(f=>artImg(f.src)));
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
  const Hs=s===2?238:224,frame=(f,al)=>{const im=artImg(f.src),k=Hs/f.h*(1+(P.pulse||0));g.save();g.globalAlpha=al;g.translate(120-dir*7*(P.kick||0),228);g.scale(dir*k,k);g.drawImage(im,-f.ax,-f.ay);g.restore()};
  if(P.seq)P.seq.forEach(([i,al])=>{if(al<=0)return;if(i<0)strips(img,al);else frame(FR[i],al)});else strips(img,1);g.globalAlpha=1;
  const c=cv.getContext('2d');c.setTransform(1,0,0,1,0,0);c.clearRect(0,0,cw,ch);
  if(P.ring>0){c.setTransform(sc,0,0,sc,-AX0*sc,-AY0*sc);c.save();c.translate(120,229);c.scale(1,.24);{const rg=c.createRadialGradient(0,0,0,0,0,80);rg.addColorStop(0,E.l);rg.addColorStop(.5,E.c);rg.addColorStop(1,'rgba(0,0,0,0)');c.globalAlpha=.45*P.ring;c.fillStyle=rg;c.beginPath();c.arc(0,0,80,0,7);c.fill()}c.globalAlpha=P.ring;c.strokeStyle=E.l;c.shadowColor=E.c;c.shadowBlur=14;
    const r=46+20*Math.min(1,P.ring*1.3);c.lineWidth=4.5;c.beginPath();c.arc(0,0,r,0,7);c.stroke();c.lineWidth=1.6;c.setLineDash([10,7]);c.rotate(t*2.4);c.beginPath();c.arc(0,0,r*.74,0,7);c.stroke();c.setLineDash([]);
    for(let k=0;k<8;k++){const a=k/8*6.283-t*1.6;c.beginPath();c.arc(Math.cos(a)*r*.88,Math.sin(a)*r*.88,2.6,0,7);c.fillStyle=E.l;c.fill()}c.restore();c.setTransform(1,0,0,1,0,0)}
  if(P.glow>0){c.save();c.shadowColor=E.c;c.shadowBlur=26*P.glow*sc;c.drawImage(buf,0,0);c.restore();c.globalCompositeOperation='lighter';c.globalAlpha=.22*P.glow;c.drawImage(buf,0,0);c.globalCompositeOperation='source-over';c.globalAlpha=1}
  else c.drawImage(buf,0,0)}
function artLoop(){if(artRaf)return;const step=now=>{const cvs=document.querySelectorAll('.rl-artcv');if(!cvs.length){artRaf=0;return}cvs.forEach(cv=>{try{artDraw(cv,now)}catch(e){}});artRaf=requestAnimationFrame(step)};artRaf=requestAnimationFrame(step)}
(function(){const st=document.createElement('style');st.textContent=`
.rl-artbox{position:relative;width:100%;height:100%}
.rl-artcv{position:absolute;left:-25%;top:-33.333%;width:175%;height:137.5%;pointer-events:none}
.rlb-u.a .rlb-spr:has(.rl-artbox){animation:none}
.rlb-spr.cast:has(.rl-artbox){animation:none!important}`;document.head.appendChild(st)})();

/* ---------- spells that match the art ---------- */
function rlArtSpell(u){const A=RL_ART[u.id];if(!A||!A.spell)return null;const st=crStage(u.lv||crLv(u.id)),S=A.spell[st];if(!S)return null;
  const key='art_'+u.id+st;if(!RL_VP[key])RL_VP[key]=S.vp;return Object.assign({key,uid:u.uid,side:u.side,big:st===2},S)}
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
function rlArtSupport(S,e,sk){if(S.support==='barkshield')return rlArtSupportBark(S,e);const P=S.vp,sp=vSp();e.t.forEach((uid,n)=>{const q=rlbPt(uid,'foot');if(!q)return;const K=q.w/240,cx=q.x,base=q.y,top=q.y-q.h*.85;let t=-n*.06/sp;
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
Object.values(TH_FX).forEach(artImg);
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
rlArtSupportBark=function(S,e){const P=S.vp,sp=vSp(),img=thImg('shield');e.t.forEach((uid,n)=>{const q=rlbPt(uid);if(!q)return;const cx=q.x+q.w*.24,cy=q.y+q.h*.05;let t=-n*.08/sp;
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
    else if(shot){c.rotate(t*.8);const L=70*K*s,H=L*shot.naturalHeight/shot.naturalWidth;for(let i=0;i<3;i++){c.rotate(2.094);c.drawImage(shot,0,-H/2,L,H)}}
    c.restore();if(k>=1)this.done=true}});
  for(let i=0;i<14;i++){const a=Math.random()*6.283,v=vR(90,260)*K;vfxP({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,drag:.88,life:vR(.25,.5),s:vR(2,4)*K,c:rlRand(P)})}}
function paintShot(x0,y0,x1,y1,S,K,big,arc){const p=S.paint,img=artImg(p.shot),P=S.vp,sp=vSp(),dur=(big?.34:.28)/sp,trail=[];let t=0;
  return new Promise(res=>{VFX.items.push({step(dt,c){t+=dt;const k=Math.min(1,t/dur),e=k*k*(3-2*k),bend=arc||0,x=x0+(x1-x0)*e,y=y0+(y1-y0)*e+bend*Math.sin(Math.PI*e),
      dx=(x1-x0)+bend*Math.PI*Math.cos(Math.PI*e)*0,ang=Math.atan2((y1-y0)+bend*Math.PI*Math.cos(Math.PI*e),x1-x0);trail.push([x,y]);
    c.save();if(p.route&&trail.length>1){c.setLineDash([6*K,7*K]);c.lineWidth=2*K;c.strokeStyle=P[2];c.globalAlpha=.8;c.beginPath();trail.forEach(([a,b],i)=>i?c.lineTo(a,b):c.moveTo(a,b));c.stroke();c.setLineDash([])}
    c.globalCompositeOperation='lighter';c.globalAlpha=1;
    if(img){const L=(big?130:105)*K,H=L*img.naturalHeight/img.naturalWidth;c.translate(x,y);c.rotate(ang);c.drawImage(img,-L*.85,-H/2,L,H)}
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
    const n=sk.tg==='eA'?1:Math.min(3,sk.h||1),arc=S.paint.route?-60:-18;
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
      if(img){const w=q.w*1.3,H=w*img.naturalHeight/img.naturalWidth*(1-Math.pow(1-g,3));c.save();c.globalAlpha=a;c.drawImage(img,q.x-w/2,foot-H,w,H);c.restore()}}})})))}
function paintSweep(h,pts,S){const p=S.paint,P=S.vp,sp=vSp(),img=artImg(p.burst||p.shot),x0=Math.min(...pts.map(q=>q.x-q.w)),x1=Math.max(...pts.map(q=>q.x+q.w)),yb=Math.max(...pts.map(q=>q.y+q.h*.45)),Hh=Math.max(...pts.map(q=>q.h))*1.25,dur=.6/sp;
  return new Promise(res=>{let t=0;const hit=new Set();VFX.items.push({step(dt,c){t+=dt;const k=Math.min(1,t/dur),x=x0+(x1-x0)*k,a=k<.8?1:1-(k-.8)/.2;
    if(img){const w=Hh*img.naturalWidth/img.naturalHeight;c.save();c.globalAlpha=a;c.drawImage(img,x-w/2,yb-Hh,w,Hh);c.restore()}
    if(Math.random()<.9)vfxP({x:x+vR(-20,20),y:yb-vR(0,Hh*.6),vx:vR(40,160),vy:vR(-120,20),ay:300,life:vR(.3,.6),s:vR(2,5),c:rlRand(P),shape:'sq',vr:6,glow:false});
    pts.forEach((q,i)=>{if(!hit.has(i)&&x>=q.x){hit.add(i);paintBurst(q.x,q.y,Object.assign({},S,{paint:{shot:p.burst||p.shot}}),1.2,false)}});
    if(hit.size>=pts.length&&!this.r){this.r=1;res()}if(k>=1){this.done=true;if(!this.r)res()}}})})}
(function(){const prev=rlArtFire,prevSup=rlArtSupport;
  rlArtFire=async function(S,e,sk,ult){if(S.bySkill){const p=S.bySkill[e.s]||S.bySkill[0];S=Object.assign({},S,{paint:p,bySkill:null});
      if(sk.tg==='eA'&&(p.aoe==='erupt'||p.aoe==='sweep')){const h=rlArtHand(S);const pts=e.t.map(t=>rlbPt(t)).filter(Boolean);if(!pts.length)return;return p.aoe==='erupt'?paintErupt(pts,S):paintSweep(h,pts,S)}}
    return prev(S,e,sk,ult)};
  Object.values(RL_ART).forEach(A=>(A.spell||[]).forEach(S=>S&&S.bySkill&&S.bySkill.forEach(p=>['shot','burst','sigil','aura'].forEach(k=>p[k]&&artImg(p[k])))));
})();
