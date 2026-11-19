"use strict";
/* ================================================================
   REALM HEROES: chibi heroes, each with an individual design sheet.
   Loaded after realm-creature.js. Three forms:
     0 novice · 1 ascended (armour, cape, upgraded artifact)
     2 awakened (signature piece, wings, ornate armour, new colours)
   Magical gear only. Canvas 240 × 240, facing right, ground y 228.
   ================================================================ */
/* design keys
   sk skin · hc hair colour · hs hair style · bg bangs · fs face shape
   es eyes · ec eye colour · br brows · mo mouth · fh facial hair · age
   mk mark · hw headwear · bd build · of outfit · c palette [main, second, accent]
   mt metal · it artifact · sig awakened signature · w wings · race */
const HD={
 /* ---------- FIRE ---------- */
 ember:{ev:['Ember','Ember Ashveil','Kaelith the Cinder'],sk:'#e8b896',hc:'#2a1418',hs:'spiky',bg:'messy',fs:'sharp',es:'sharp',ec:'#ffb020',br:'angry',mo:'smirk',fh:'',age:'young',mk:'paint',hw:'headband',bd:'normal',of:'ranger',c:['#2a2226','#c0392b','#ffb020'],mt:'bronze',it:'staff',sig:'flamecrown',w:'phoenix',race:'human'},
 cinder:{ev:['Cinder','Cinder Page','Ashquill Sage'],sk:'#f4dccb',hc:'#c8c0c8',hs:'long',bg:'blunt',fs:'round',es:'sleepy',ec:'#ff7a2e',br:'thin',mo:'neutral',fh:'',age:'young',mk:'freckles',hw:'hairpin',bd:'slim',of:'robe',c:['#5a4a48','#e8d8c0','#ff7a2e'],mt:'bronze',it:'book',sig:'orbit_tomes',w:'energy',race:'elf'},
 brandt:{ev:['Brandt','Sir Brandt','Brandt Emberwall'],sk:'#c48d64',hc:'#7a1a10',hs:'short',bg:'none',fs:'square',es:'narrow',ec:'#e8b04a',br:'thick',mo:'frown',fh:'beard',age:'adult',mk:'',hw:'horned_helm',bd:'brawler',of:'plate',c:['#3a3a42','#8a2a1a','#d98a2a'],mt:'obsidian',it:'shield',sig:'banner_back',w:'none',race:'human'},
 ashling:{ev:['Ashling','Ashling Hearth','Hearthkeeper Asha'],sk:'#f0cbb0',hc:'#ff7a2a',hs:'double_bun',bg:'side',fs:'round',es:'wide',ec:'#4caf50',br:'raised',mo:'grin',fh:'',age:'young',mk:'freckles',hw:'flower',bd:'slim',of:'coat',c:['#f0e2c8','#d9622a','#6aa84f'],mt:'gold',it:'lantern',sig:'orbit_orbs',w:'energy',race:'human'},
 pyra:{ev:['Pyra','Pyra Vale','Pyravelle, Sunflare'],sk:'#f2d0b8',hc:'#d22a2a',hs:'flowing',bg:'side',fs:'sharp',es:'sharp',ec:'#ffd166',br:'thin',mo:'smirk',fh:'',age:'young',mk:'gem',hw:'tiara',bd:'slim',of:'dress',c:['#8a1a2a','#1c1418','#ffd166'],mt:'gold',it:'orb',sig:'sundisc',w:'phoenix',race:'human'},
 solenne:{ev:['Solenne','Solenne Dawnsong','Solenne, Phoenix Queen'],sk:'#8a5a3a',hc:'#ffcf5a',hs:'pony',bg:'center',fs:'round',es:'wide',ec:'#ff8a3d',br:'thin',mo:'neutral',fh:'',age:'young',mk:'paint',hw:'feather',bd:'normal',of:'dress',c:['#fff3e0','#e8742a','#ffd23f'],mt:'gold',it:'banner',sig:'veil',w:'phoenix',race:'elf'},
 ignatius:{ev:['Ignatius','Ignatius Rex','Ignarok the Infernal'],sk:'#6a3a2a',hc:'#f4f0e8',hs:'wild',bg:'messy',fs:'square',es:'narrow',ec:'#ff3a2a',br:'angry',mo:'fang',fh:'goatee',age:'adult',mk:'tattoo',hw:'none',bd:'brawler',of:'coat',c:['#1a1418','#a8231c','#e8c45a'],mt:'obsidian',it:'quill',sig:'mantle',w:'demon',race:'horn'},
 /* ---------- WATER ---------- */
 ripple:{ev:['Ripple','Ripple Tidesworn','Riptide Warden'],sk:'#d6a47e',hc:'#18a8a8',hs:'sidecut',bg:'side',fs:'sharp',es:'sharp',ec:'#5fe3ff',br:'angry',mo:'smirk',fh:'',age:'young',mk:'tattoo',hw:'bandana',bd:'normal',of:'ranger',c:['#0f4a5a','#2fb6c8','#e8f4ff'],mt:'silver',it:'orb',sig:'shellguard',w:'energy',race:'fin'},
 marin:{ev:['Marin','Marin Wavesong','Marina the Abyssal'],sk:'#f6dccb',hc:'#3fc8b8',hs:'curly',bg:'center',fs:'round',es:'round',ec:'#2a9d8f',br:'raised',mo:'grin',fh:'',age:'young',mk:'freckles',hw:'shell_clip',bd:'normal',of:'dress',c:['#3fb6a8','#f4e8d0','#ff8fb3'],mt:'silver',it:'lute',sig:'orbit_orbs',w:'crystal',race:'fin'},
 coral:{ev:['Coral','Coral Knight','Coralforte Paladin'],sk:'#efcbb0',hc:'#ff8fa8',hs:'bob',bg:'blunt',fs:'round',es:'narrow',ec:'#3a86d6',br:'thick',mo:'frown',fh:'',age:'young',mk:'',hw:'winged_helm',bd:'normal',of:'plate',c:['#e8eef4','#ff7f8a','#3a86d6'],mt:'silver',it:'shield',sig:'wingedhelm',w:'none',race:'human'},
 tide:{ev:['Tide','Tide Lyric','Tidelyra the Siren'],sk:'#ad7650',hc:'#1d2a6a',hs:'braid',bg:'none',fs:'sharp',es:'sleepy',ec:'#9fd6ff',br:'thin',mo:'neutral',fh:'mustache',age:'adult',mk:'gem',hw:'scholar',bd:'slim',of:'robe',c:['#1d3a7a','#9fd6ff','#ffe9a0'],mt:'gold',it:'book',sig:'spirit_hands',w:'crystal',race:'human'},
 frostine:{ev:['Frostine','Frostine Rime','Glacivane, Frost Empress'],sk:'#fbeee4',hc:'#dff0ff',hs:'long',bg:'blunt',fs:'sharp',es:'sharp',ec:'#4fc8ff',br:'thin',mo:'frown',fh:'',age:'young',mk:'',hw:'tiara',bd:'slim',of:'dress',c:['#dff0ff','#3a6ab8','#9fe3ff'],mt:'silver',it:'staff',sig:'icecrown',w:'crystal',race:'elf'},
 nerissa:{ev:['Nerissa','Nerissa Moonveil','Nerissa, Tide Oracle'],sk:'#7a4c2f',hc:'#2a2a6a',hs:'flowing',bg:'center',fs:'round',es:'closed',ec:'#c8b8ff',br:'thin',mo:'neutral',fh:'',age:'adult',mk:'moon',hw:'veil_hat',bd:'slim',of:'robe',c:['#141a3a','#5fd0e8','#e8e2ff'],mt:'silver',it:'lantern',sig:'moon',w:'energy',race:'elf'},
 /* ---------- WIND ---------- */
 gale:{ev:['Gale','Gale Swiftwind','Galecrest Ranger'],sk:'#e3b896',hc:'#6a4a2a',hs:'wild',bg:'messy',fs:'sharp',es:'sharp',ec:'#c4f25a',br:'angry',mo:'fang',fh:'',age:'young',mk:'paint',hw:'none',bd:'normal',of:'ranger',c:['#4a3a26','#3f8a4c','#e8d8a0'],mt:'bronze',it:'quill',sig:'leafmantle',w:'feather',race:'wolf'},
 thistle:{ev:['Thistle','Thistle Bloom','Thistlequeen'],sk:'#f6dccb',hc:'#c77dff',hs:'twin',bg:'blunt',fs:'round',es:'wide',ec:'#9a5ad8',br:'raised',mo:'grin',fh:'',age:'young',mk:'',hw:'flower',bd:'slim',of:'dress',c:['#7a3fa8','#a8d878','#ffd6f0'],mt:'gold',it:'banner',sig:'thorncrown',w:'fairy',race:'elf'},
 bramble:{ev:['Bramble','Bramblewood','Elderwood Warden'],sk:'#c48d64',hc:'#e8e8dc',hs:'long',bg:'center',fs:'square',es:'closed',ec:'#9fe36a',br:'thick',mo:'neutral',fh:'longbeard',age:'elder',mk:'tattoo',hw:'antlers',bd:'normal',of:'robe',c:['#3a4a2a','#8a6a40','#9fe36a'],mt:'bronze',it:'staff',sig:'antlercrown',w:'none',race:'elf'},
 pip:{ev:['Pip','Pip Thatch','Thatchfort Guardian'],sk:'#e3b896',hc:'#8a4a1f',hs:'short',bg:'messy',fs:'round',es:'round',ec:'#6a3a1a',br:'thick',mo:'grin',fh:'',age:'young',mk:'freckles',hw:'none',bd:'brawler',of:'plate',c:['#8a5a2c','#5a8a3a','#f2dcb0'],mt:'bronze',it:'shield',sig:'shellguard',w:'none',race:'bear'},
 zephyra:{ev:['Zephyra','Zephyra Stormveil','Zephyra, Tempest'],sk:'#d6a47e',hc:'#e8f0f0',hs:'pony',bg:'side',fs:'sharp',es:'sharp',ec:'#2fd0b0',br:'angry',mo:'smirk',fh:'',age:'young',mk:'mask',hw:'hood',bd:'slim',of:'ranger',c:['#1f5a4a','#e8f4ee','#ffd34d'],mt:'silver',it:'orb',sig:'stormcrown',w:'feather',race:'elf'},
 oakhart:{ev:['Oakhart','Oakhart Rootguard','Oakhart the Ancient'],sk:'#94603d',hc:'#4a2f1d',hs:'short',bg:'none',fs:'square',es:'narrow',ec:'#7dff9a',br:'thick',mo:'frown',fh:'beard',age:'adult',mk:'',hw:'plume_helm',bd:'brawler',of:'plate',c:['#5a6a3a','#8a6a3a','#d9b24a'],mt:'bronze',it:'shield',sig:'mantle',w:'none',race:'human'},
 aeris:{ev:['Aeris','Aeris Quill','Aeris, Sky Sovereign'],sk:'#fbeee4',hc:'#f4fbff',hs:'topknot',bg:'side',fs:'sharp',es:'sleepy',ec:'#5fc8f0',br:'thin',mo:'neutral',fh:'',age:'young',mk:'gem',hw:'none',bd:'slim',of:'robe',c:['#f4fbff','#5fc8b0','#ffd166'],mt:'gold',it:'quill',sig:'feathercrest',w:'feather',race:'elf'},
 /* ---------- LIGHT ---------- */
 lumi:{ev:['Lumi','Lumi Lightweaver','Lumiere the Radiant'],sk:'#fbeee4',hc:'#ffe08a',hs:'bob',bg:'blunt',fs:'round',es:'wide',ec:'#ffb020',br:'raised',mo:'open',fh:'',age:'young',mk:'',hw:'hairpin',bd:'slim',of:'dress',c:['#fff8e6','#ffd84a','#9fd6ff'],mt:'gold',it:'lantern',sig:'orbit_orbs',w:'angel',race:'angel'},
 halo:{ev:['Halo','Halo Wren','Haloseraph'],sk:'#e3b896',hc:'#f0f0f8',hs:'spiky',bg:'messy',fs:'sharp',es:'sharp',ec:'#ffd23f',br:'angry',mo:'smirk',fh:'',age:'young',mk:'',hw:'none',bd:'normal',of:'plate',c:['#f4f4f8','#3a3a48','#ffd23f'],mt:'gold',it:'staff',sig:'halobig',w:'angel',race:'angel'},
 solk:{ev:['Sol','Sol Kade','Solgrim the Dawnbringer'],sk:'#ad7650',hc:'#ffb83a',hs:'wild',bg:'messy',fs:'square',es:'sharp',ec:'#ff8a00',br:'thick',mo:'grin',fh:'stubble',age:'adult',mk:'paint',hw:'headband',bd:'brawler',of:'monk',c:['#e8a83a','#7a2a1a','#fff0c8'],mt:'gold',it:'orb',sig:'sundisc',w:'energy',race:'human'},
 seraphine:{ev:['Seraphine','Seraphine Grace','Seraphiel the Exalted'],sk:'#f6dccb',hc:'#f8d8e8',hs:'flowing',bg:'center',fs:'round',es:'closed',ec:'#e88ab8',br:'thin',mo:'neutral',fh:'',age:'young',mk:'gem',hw:'tiara',bd:'slim',of:'dress',c:['#ffffff','#f0b8d0','#ffd23f'],mt:'gold',it:'book',sig:'halobig',w:'angel',race:'angel'},
 aurelius:{ev:['Aurelius','Aurelius Dawnshield','Aurelius, Holy Bastion'],sk:'#e3b896',hc:'#f4f4f4',hs:'short',bg:'none',fs:'square',es:'narrow',ec:'#3a6ab8',br:'thick',mo:'frown',fh:'longbeard',age:'elder',mk:'',hw:'crown_tassel',bd:'brawler',of:'plate',c:['#e8c45a','#f4f0e6','#3a6ab8'],mt:'gold',it:'shield',sig:'banner_back',w:'angel',race:'human'},
 /* ---------- DARK ---------- */
 umbra:{ev:['Umbra','Umbra Nightshade','Umbralyx the Eclipse'],sk:'#f2d0b8',hc:'#1a1626',hs:'bob',bg:'side',fs:'sharp',es:'sharp',ec:'#c8ff4f',br:'thin',mo:'smirk',fh:'',age:'young',mk:'whisker',hw:'none',bd:'slim',of:'ranger',c:['#1a1622','#5a3a8a','#c8ff4f'],mt:'silver',it:'orb',sig:'masque',w:'demon',race:'cat'},
 grim:{ev:['Grim','Grim Ink','Grimwell the Hollow'],sk:'#c8c4d0',hc:'#1f4a4a',hs:'long',bg:'messy',fs:'sharp',es:'sleepy',ec:'#e8fff8',br:'thin',mo:'frown',fh:'',age:'young',mk:'paint',hw:'none',bd:'slim',of:'coat',c:['#22303a','#9fe3d0','#e8e2d0'],mt:'silver',it:'quill',sig:'spirit_hands',w:'energy',race:'horn'},
 nyx:{ev:['Nyx','Nyx Script','Nyxara, Night Witch'],sk:'#fbeee4',hc:'#2a2a5a',hs:'twin',bg:'blunt',fs:'round',es:'wide',ec:'#ff4f9a',br:'raised',mo:'smirk',fh:'',age:'young',mk:'star',hw:'witch',bd:'slim',of:'dress',c:['#2a1a44','#ffe066','#ff4f9a'],mt:'gold',it:'book',sig:'starcrown',w:'demon',race:'elf'},
 morrow:{ev:['Morrow','Morrow Duskbell','Morrow, Soul Warden'],sk:'#94603d',hc:'#c8c8d0',hs:'sidecut',bg:'none',fs:'square',es:'narrow',ec:'#b9f27c',br:'thick',mo:'neutral',fh:'mustache',age:'adult',mk:'eyepatch',hw:'none',bd:'normal',of:'coat',c:['#2a2a36','#6a6488','#b9f27c'],mt:'obsidian',it:'lantern',sig:'banner_back',w:'demon',race:'human'},
 vesper:{ev:['Vesper','Vesper Shade','Vespera, Void Empress'],sk:'#e8d0e8',hc:'#d8c8ff',hs:'flowing',bg:'side',fs:'sharp',es:'sharp',ec:'#ff3a5a',br:'thin',mo:'smirk',fh:'',age:'young',mk:'gem',hw:'crown_tassel',bd:'slim',of:'dress',c:['#120c1e','#8a1a3a','#d8c8ff'],mt:'obsidian',it:'staff',sig:'thorncrown',w:'demon',race:'horn'},
};
const HR_METAL={gold:['#c9a24a','#e8c45a','#7a5a18'],silver:['#aeb6c4','#e4e8f0','#5a6274'],bronze:['#a8743a','#d89a5a','#5a3a18'],obsidian:['#3a3444','#6a6078','#14101a']};

/* ---------- face pieces ---------- */
function hrEye(x,y,rx,ry,col,P,o){o=o||{};const id=P+'he'+(CRN++),es=o.es||'round',sk=o.sk||'#f0d0b0',ink='#1a1222';
  if(es==='closed')return`<path d="M${cf(x-rx*1.2)} ${cf(y-ry*.1)} Q${cf(x)} ${cf(y+ry*.55)} ${cf(x+rx*1.2)} ${cf(y-ry*.2)}" stroke="${ink}" stroke-width="2.6" fill="none" stroke-linecap="round"/><path d="M${cf(x+rx*.9)} ${cf(y-ry*.15)} l${cf(rx*.5)} ${cf(-ry*.25)}" stroke="${ink}" stroke-width="2" stroke-linecap="round"/>`;
  const sy={round:1,wide:1.12,sharp:.78,narrow:.6,sleepy:.95}[es]||1,R=ry*sy,lid={sleepy:.42,narrow:.12,sharp:.18}[es]||0,slant={sharp:.5,narrow:.25}[es]||0;
  let s=`<radialGradient id="${id}" cx=".5" cy=".7" r=".7"><stop offset="0" stop-color="${shade(col,.6)}"/><stop offset=".5" stop-color="${col}"/><stop offset="1" stop-color="${shade(col,-.6)}"/></radialGradient>`+
   `<ellipse cx="${cf(x)}" cy="${cf(y)}" rx="${cf(rx)}" ry="${cf(R)}" fill="#fbf9ff" stroke="#2a2133" stroke-width="1.2"/>`+
   `<ellipse cx="${cf(x+rx*.12)}" cy="${cf(y+R*.1)}" rx="${cf(rx*.8)}" ry="${cf(R*.84)}" fill="url(#${id})"/>`+
   `<ellipse cx="${cf(x+rx*.16)}" cy="${cf(y+R*.12)}" rx="${cf(rx*(es==='sharp'?.22:.36))}" ry="${cf(R*.48)}" fill="#120c18"/>`+
   `<ellipse cx="${cf(x-rx*.28)}" cy="${cf(y-R*.3)}" rx="${cf(rx*.32)}" ry="${cf(R*.22)}" fill="#fff"/><circle cx="${cf(x+rx*.42)}" cy="${cf(y+R*.45)}" r="${cf(rx*.15)}" fill="#fff" opacity=".9"/>`;
  const ly=y-R*(1-lid*2.2);
  if(lid)s+=`<path d="M${cf(x-rx*1.3)} ${cf(y-R*1.6)} L${cf(x+rx*1.3)} ${cf(y-R*1.6)} L${cf(x+rx*1.3)} ${cf(ly+slant*R*.8)} L${cf(x-rx*1.3)} ${cf(ly-slant*R*.3)}Z" fill="${sk}"/>`;
  s+=`<path d="M${cf(x-rx*1.25)} ${cf((lid?ly:y-R*.5)-slant*R*.3)} Q${cf(x-rx*.1)} ${cf((lid?ly:y-R*1.15)-R*.15)} ${cf(x+rx*1.25)} ${cf((lid?ly:y-R*.6)+slant*R*.8)}" stroke="${ink}" stroke-width="${cf(Math.max(2.4,rx*.5))}" fill="none" stroke-linecap="round"/>`;
  return s}
function hrBrow(x,y,w,style,col){const sl={angry:.5,thick:.2,thin:.1,raised:-.3}[style]||0,th={thick:3.6,angry:3.2,thin:1.8,raised:2.2}[style]||2.4;
  return`<path d="M${cf(x-w*.55)} ${cf(y-sl*w*.25)} Q${cf(x)} ${cf(y-w*.18-(style==='raised'?w*.12:0))} ${cf(x+w*.55)} ${cf(y+sl*w*.35)}" stroke="${col}" stroke-width="${th}" fill="none" stroke-linecap="round"/>`}
function hrMouth(mo){const ink='#5a2020';switch(mo){
  case'smirk':return`<path d="M139 113 Q146 115 152 109" stroke="${ink}" stroke-width="2" fill="none" stroke-linecap="round"/>`;
  case'frown':return`<path d="M140 115 Q146 111 152 114" stroke="${ink}" stroke-width="2.2" fill="none" stroke-linecap="round"/>`;
  case'grin':return`<path d="M138 110 Q146 120 154 109 Z" fill="#7a2a2a" stroke="${ink}" stroke-width="1.6"/><path d="M140 111 L152 110" stroke="#fff" stroke-width="2"/>`;
  case'open':return`<ellipse cx="146" cy="113" rx="3.4" ry="4" fill="#7a2a2a" stroke="${ink}" stroke-width="1.4"/>`;
  case'fang':return`<path d="M138 112 Q146 116 154 110" stroke="${ink}" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M141 113 l1.4 4.4 l2.2 -4Z M149 112.4 l1.4 4.2 l2 -4.2Z" fill="#fff" stroke="${ink}" stroke-width="1"/>`;
  default:return`<path d="M141 113 L151 112" stroke="${ink}" stroke-width="2" stroke-linecap="round"/>`}}
function hrFacialHair(fh,hc,P){const d=shade(hc,-.15);switch(fh){
  case'stubble':return`<path d="M110 112 Q130 128 156 110 L154 104 Q132 122 112 106Z" fill="${hc}" opacity=".28"/>`;
  case'mustache':return crP(`M138 108 Q144 104 150 107 Q156 104 160 110 Q154 110 150 110 Q144 112 138 108Z`,d,P,{sw:1.6,sh:.3,nospec:1});
  case'goatee':return crP(`M138 108 Q146 104 156 108 Q150 111 146 110 Q140 111 138 108Z`,d,P,{sw:1.6,sh:.3,nospec:1})+crP(`M140 116 Q146 114 152 116 Q150 128 146 132 Q142 126 140 116Z`,d,P,{sw:1.8,sh:.3});
  case'beard':return crP(`M100 100 Q104 124 124 130 Q144 134 158 112 Q154 108 150 114 Q146 120 138 118 Q124 118 112 104Z`,d,P,{sw:2,sh:.4})+crP(`M136 108 Q146 104 158 109 Q150 111 146 111 Q140 112 136 108Z`,d,P,{sw:1.6,sh:.3,nospec:1});
  case'longbeard':return crP(`M100 98 Q102 124 120 132 Q128 158 140 172 Q146 150 152 132 Q160 120 158 110 Q150 114 140 118 Q124 118 112 102Z`,d,P,{sw:2,sh:.4,inner:`<path d="M126 132 Q132 150 140 166 M140 126 Q142 146 144 160" stroke="${shade(d,-.25)}" stroke-width="1.4" fill="none"/>`})+crP(`M134 108 Q146 103 160 110 Q152 112 146 112 Q140 113 134 108Z`,d,P,{sw:1.6,sh:.3,nospec:1});
  default:return''}}
function hrMark(mk,c3,ec,hc,P){switch(mk){
  case'paint':return`<path d="M130 106 l10 -2 M131 110 l10 -2" stroke="${c3}" stroke-width="2.4" stroke-linecap="round"/>`;
  case'freckles':return[[130,106],[134,108],[138,106],[151,105],[154,107]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="1.1" fill="#a85a3a" opacity=".7"/>`).join('');
  case'tattoo':return`<path d="M122 104 Q128 112 136 108 Q132 116 124 116" stroke="${c3}" stroke-width="1.8" fill="none" opacity=".9"/>`;
  case'gem':return crGem(132,74,3.4,c3);
  case'moon':return`<path d="M128 70 a5 5 0 1 0 6 6 a4 4 0 1 1 -6 -6Z" fill="#e8e2ff"/>`;
  case'star':return`<path d="M134 104 l1.2 -3 l1.2 3 l3 1 l-3 1.2 l-1.2 3 l-1.2 -3 l-3 -1.2Z" fill="${c3}"/>`;
  case'whisker':return`<path d="M128 108 l-8 -1 M128 111 l-8 2 M156 106 l6 -2" stroke="#2a1a2a" stroke-width="1.2" opacity=".7"/>`;
  case'mask':return crP(`M100 104 Q120 112 158 104 Q160 118 150 122 Q128 128 108 120 Q100 114 100 104Z`,c3==='#ffd34d'?'#1f5a4a':shade(c3,-.4),P,{sw:2,sh:.4,inner:`<path d="M106 110 Q128 116 154 110" stroke="#ffd34d" stroke-width="1.6" fill="none"/>`});
  case'eyepatch':return`<path d="M96 82 Q128 70 160 86" stroke="#14101a" stroke-width="2.4" fill="none"/>`+crP(crEll(148,95,6.4,8),'#14101a',P,{sw:1.6,sh:.3,nospec:1});
  default:return''}}

/* ---------- hair ---------- */
function hrHairBack(hs,hc,s,P){const d=shade(hc,-.12);let o='';
  switch(hs){
   case'long':o+=crP(`M88 72 C84 112 90 152 102 ${s===2?178:164} L126 ${s===2?172:160} C120 130 116 104 120 80Z`,hc,P,{back:1});break;
   case'flowing':o+=crP(`M88 70 C80 110 84 ${s===2?170:150} 96 ${s===2?196:176} Q104 ${s===2?186:168} 110 ${s===2?194:174} Q116 ${s===2?182:164} 124 ${s===2?186:166} C118 140 116 104 120 78Z`,hc,P,{back:1,inner:`<path d="M96 90 C92 120 96 150 102 ${s===2?186:166} M108 92 C104 120 108 150 112 ${s===2?182:162}" stroke="${shade(hc,-.25)}" stroke-width="1.6" fill="none"/>`});break;
   case'pony':o+=crP(crEll(98,56,9,8),hc,P,{sw:2})+crRibbon(94,58,s===2?92:72,112,20,6,hc,P,{back:1});break;
   case'twin':o+=crP(crEll(94,60,8,7),hc,P,{sw:2})+crRibbon(92,62,s===2?84:66,108,18,5,hc,P,{back:1})+crRibbon(150,56,s===2?80:62,78,16,5,d,P,{back:1});break;
   case'braid':o+=[0,1,2,3,4,5].slice(0,s===2?6:4).map(i=>crP(crEll(98-i*2,92+i*14,8-i*.5,9-i*.4),i%2?d:hc,P,{back:1,sw:2})).join('');break;
   case'curly':case'bob':o+=crP(crEll(118,86,40,38),hc,P,{back:1});if(hs==='curly')o+=[[84,96],[90,116],[104,126],[150,118]].map(([x,y])=>crP(crEll(x,y,11,11),d,P,{back:1,sw:2})).join('');break;
   case'double_bun':o+=crP(crEll(98,52,13,13),hc,P,{sw:2.2})+crP(crEll(146,46,12,12),d,P,{sw:2.2});break;
   case'topknot':o+=crP(crEll(120,38,13,12),hc,P,{sw:2.2})+crRibbon(116,36,s===2?60:44,195,10,6,'#e8e8f4',P);break;
   case'wild':{let sp='';const n=11;for(let i=0;i<n;i++){const a=(-215+i*(230/(n-1)))*Math.PI/180,l=i%2?44:62;sp+=`${i?'L':'M'}${cf(120+Math.cos(a)*l)} ${cf(80+Math.sin(a)*l)} L${cf(120+Math.cos(a+.15)*30)} ${cf(80+Math.sin(a+.15)*30)} `}o+=crP(sp+'Z',hc,P,{back:1});break}
   case'spiky':{let sp='';const n=9;for(let i=0;i<n;i++){const a=(-200+i*(200/(n-1)))*Math.PI/180,l=i%2?40:54;sp+=`${i?'L':'M'}${cf(122+Math.cos(a)*l)} ${cf(74+Math.sin(a)*l)} L${cf(122+Math.cos(a+.17)*28)} ${cf(74+Math.sin(a+.17)*28)} `}o+=crP(sp+'Z',hc,P,{back:1});break}
   case'sidecut':o+=crP(`M100 70 Q104 32 132 36 Q158 40 160 64 Q150 50 136 50 Q118 50 108 66Z`,hc,P,{sw:2.4});break;
  }
  return o+crP(crEll(122,74,36,32),hc,P)}
function hrBangs(bg,hs,hc,P){const hl=`<path d="M106 56 Q122 48 140 54" stroke="${shade(hc,.35)}" stroke-width="3" fill="none" opacity=".55"/>`;
  switch(bg){
   case'blunt':return crP(`M92 80 C92 54 110 46 126 46 C148 46 162 60 160 82 L160 84 L92 84Z`,hc,P,{sw:2.4,inner:hl});
   case'side':return crP(`M92 84 C90 54 110 44 128 44 C150 46 162 60 160 80 C150 70 138 70 126 76 C114 82 104 86 92 84Z`,hc,P,{sw:2.4,inner:hl})+crP(`M96 82 Q112 88 128 76 Q116 92 98 96Z`,shade(hc,-.1),P,{sw:2});
   case'center':return crP(`M92 84 C90 54 108 44 126 44 C148 44 162 58 160 84 C152 70 138 62 128 58 C118 62 104 70 92 84Z`,hc,P,{sw:2.4,inner:hl});
   case'none':return crP(`M94 78 C94 54 110 46 126 46 C148 46 160 58 160 76 C150 64 136 60 126 60 C112 60 100 66 94 78Z`,hc,P,{sw:2.4,inner:hl});
   default:return crP(`M92 78 C92 54 110 46 126 46 C148 46 162 60 160 82 L152 70 L146 84 L138 68 L130 82 L122 66 L114 80 L108 66 L100 84 L96 74Z`,hc,P,{sw:2.4,inner:hl});
  }}

/* ---------- headwear ---------- */
function hrHeadwear(hw,s,D,M,gem,P){const[c1,c2,c3]=D.c,g=M[1],gd=M[2];switch(hw){
  case'headband':return crP(`M92 70 Q126 60 160 70 L160 77 Q126 67 92 77Z`,c3==='#ffb020'?'#c0392b':c2,P,{sw:2})+crRibbon(92,72,s===2?50:36,190,8,5,c3==='#ffb020'?'#c0392b':c2,P)+(s?crGem(126,66,3+s,gem):'');
  case'bandana':return crP(`M90 76 C90 50 110 40 128 40 C150 42 162 56 160 74 Q126 64 90 76Z`,c2,P,{sw:2.2,inner:`<path d="M100 60 l4 4 M120 52 l4 4 M140 54 l4 4" stroke="${c3}" stroke-width="2"/>`})+crRibbon(92,72,40,200,10,5,c2,P,{back:1});
  case'hairpin':return crStroke(`M100 64 L86 52`,g,3)+crGem(86,52,4,c3)+`<path d="M88 54 l-3 12 M86 54 l2 12" stroke="${g}" stroke-width="1.4"/>`+crP(crEll(98,62,5,5),c3,P,{sw:1.6,sh:.3});
  case'flower':return[[100,58,8],[112,50,7],[94,70,6]].map(([x,y,r],i)=>[0,1,2,3,4].map(k=>{const a=k*1.26;return`<circle cx="${cf(x+Math.cos(a)*r*.6)}" cy="${cf(y+Math.sin(a)*r*.6)}" r="${cf(r*.55)}" fill="${i%2?c3:'#ffffff'}" stroke="#7a3a5a" stroke-width="1"/>`}).join('')+`<circle cx="${x}" cy="${y}" r="${cf(r*.3)}" fill="#ffd23f"/>`).join('');
  case'shell_clip':return crP(`M92 70 Q98 54 112 58 Q108 66 92 70Z`,'#ffd6e0',P,{sw:1.8,inner:`<path d="M94 68 L106 58 M98 69 L108 61" stroke="#d88aa0" stroke-width="1.2"/>`})+crGem(104,66,3,'#ffffff');
  case'tiara':return crP(`M98 68 Q126 58 156 68 L150 64 L144 56 L138 62 L126 48 L114 62 L108 56 L102 64Z`,g,P,{sw:2,sh:.3})+crGem(126,60,4+s,gem);
  case'feather':return crRibbon(110,52,46+s*12,215,12,6,c3,P)+crRibbon(114,50,38+s*10,235,10,5,c2,P)+crP(crEll(112,56,5,5),g,P,{sw:1.6});
  case'scholar':return crP(`M92 72 L96 36 Q126 26 156 36 L160 72 Q126 62 92 72Z`,c1,P,{sw:2.6,inner:`<path d="M94 62 Q126 52 158 62" stroke="${g}" stroke-width="4" fill="none"/><path d="M126 30 L126 60" stroke="${shade(c1,.3)}" stroke-width="2"/>`})+crP(`M86 74 L94 60 L92 92Z`,c1,P,{sw:2,back:1})+crGem(126,46,4+s,gem);
  case'crown_tassel':{let o=crP(`M90 72 L92 34 L104 46 L114 26 L126 42 L138 24 L148 44 L160 32 L160 72 Q126 62 90 72Z`,g,P,{sw:2.4,inner:`<path d="M92 62 Q126 52 160 62" stroke="${gd}" stroke-width="2" fill="none"/>`})+crGem(126,54,5+s,gem);
    o+=[96,104,148,156].map(x=>`<path d="M${x} 70 L${x} ${86+s*4}" stroke="${g}" stroke-width="1.4"/><circle cx="${x}" cy="${88+s*4}" r="2.4" fill="${c3}" stroke="${gd}" stroke-width="1"/>`).join('');return o}
  case'horned_helm':return crP(`M88 86 C86 48 108 36 126 36 C150 36 166 52 164 86 L152 86 L150 70 C140 62 110 62 100 72 L100 100 L88 98Z`,M[0],P,{sw:2.6,inner:`<path d="M126 36 L126 64" stroke="${c2}" stroke-width="4"/>`})+crHorn(`M96 54 Q78 ${34-s*6} ${70-s*6} ${16-s*10}`,shade(c2,.1))+crHorn(`M150 48 Q158 ${28-s*6} ${154-s*6} ${10-s*10}`,c2)+crGem(126,54,4+s,gem);
  case'winged_helm':return crP(`M90 84 C88 50 110 40 126 40 C150 40 164 56 162 84 L150 84 L148 70 C140 64 110 64 102 72 L100 98 L90 96Z`,M[1],P,{sw:2.6,inner:`<path d="M126 40 L126 66" stroke="${c2}" stroke-width="4"/>`})+[0,1,2].map(i=>crP(`M94 ${66-i*6} Q${74-i*4} ${50-i*10} ${70-i*6} ${34-i*10} Q${86-i*2} ${48-i*6} 100 ${62-i*6}Z`,'#fbf8f0',P,{sw:1.8,sh:.3,nospec:1})).join('')+crGem(126,58,4+s,gem);
  case'plume_helm':return crP(`M90 86 C88 50 110 40 126 40 C150 40 164 56 162 86 L150 86 L148 70 C140 64 110 64 102 72 L100 100 L90 98Z`,M[0],P,{sw:2.6,inner:`<path d="M126 40 L126 66" stroke="${M[1]}" stroke-width="3"/><path d="M90 80 L100 80" stroke="${M[1]}" stroke-width="3"/>`})+crRibbon(120,42,50+s*14,200,16,7,c2,P)+crGem(126,56,4+s,gem);
  case'hood':return crP(`M84 100 C78 52 108 32 128 34 C156 36 170 60 164 96 L156 92 C156 66 140 54 124 54 C108 56 96 70 98 104Z`,c1,P,{sw:2.6,inner:`<path d="M98 100 C96 70 108 56 124 56" stroke="${c3}" stroke-width="2" fill="none"/>`});
  case'witch':return crP(`M82 66 Q122 52 164 64 Q140 56 132 30 Q120 ${4-s*8} ${100-s*6} ${-8-s*10} Q112 22 108 56 Q96 60 82 66Z`,c1,P,{sw:2.6,inner:`<path d="M90 64 Q122 54 158 64" stroke="${c2}" stroke-width="4" fill="none"/>`})+crGem(120,58,4+s,gem);
  case'veil_hat':return crP(`M78 70 Q126 54 172 70 Q126 64 78 70Z`,c1,P,{sw:2.4})+crP(`M104 64 Q106 42 126 40 Q146 42 148 64Z`,c1,P,{sw:2.4,inner:`<path d="M104 60 Q126 54 148 60" stroke="${c3}" stroke-width="3" fill="none"/>`})+`<path d="M80 70 Q78 100 86 ${118+s*8} M170 70 Q172 96 166 ${112+s*8}" stroke="${c2}" stroke-width="1.2" opacity=".6"/><path d="M80 70 Q126 ${82} 172 70 L168 ${100+s*6} Q126 ${108} 86 ${104+s*6}Z" fill="${c2}" opacity=".18"/>`;
  case'antlers':return crStroke(`M106 54 C100 38 108 26 100 ${12-s*8} M104 40 C94 36 90 30 90 ${22-s*6} M142 50 C146 36 154 26 150 ${10-s*8} M146 36 C156 32 160 26 160 ${18-s*6}`,'#8a6a40',4.5)+(s?crLeaf(100,12-s*8,.6,-100,'#5aa84f',P)+crLeaf(150,10-s*8,.6,-80,'#5aa84f',P):'');
  default:return''}}

/* ---------- awakened signatures ---------- */
function hrSigBack(sig,D,M,E,P){const[c1,c2,c3]=D.c;switch(sig){
  case'sundisc':return`<circle cx="120" cy="76" r="54" fill="url(#${P}gl)" opacity=".8"/><g class="cr-spin"><circle cx="120" cy="76" r="46" fill="none" stroke="${E[0]}" stroke-width="3" stroke-dasharray="4 8"/></g>`+[0,1,2,3,4,5,6,7,8,9,10,11].map(i=>{const a=i*Math.PI/6;return`<path d="M${cf(120+Math.cos(a)*44)} ${cf(76+Math.sin(a)*44)} L${cf(120+Math.cos(a)*62)} ${cf(76+Math.sin(a)*62)}" stroke="${E[1]}" stroke-width="4" stroke-linecap="round" opacity=".85"/>`}).join('');
  case'halobig':return`<circle cx="118" cy="70" r="50" fill="none" stroke="${E[1]}" stroke-width="5" class="cr-glowpulse"/><circle cx="118" cy="70" r="42" fill="none" stroke="#fff" stroke-width="1.6" stroke-dasharray="2 6"/>`+[0,1,2,3,4,5,6,7].map(i=>{const a=i*Math.PI/4;return crGem(cf(118+Math.cos(a)*50),cf(70+Math.sin(a)*50),4,'#fff')}).join('');
  case'moon':return`<path d="M86 40 a44 44 0 1 0 64 -10 a34 34 0 1 1 -64 10Z" fill="#e8e2ff" stroke="#9a8ad8" stroke-width="2" opacity=".85"/>`+crGlow(110,60,50,P,.5);
  case'banner_back':return[0,1].map(i=>{const x=92+i*14;return crStroke(`M${x} 170 L${x-4} 18`,M[2],3.6)+crP(`M${x-3} 22 L${x-34} 30 L${x-28} 46 L${x-36} 62 L${x-3} 56Z`,i?c2:c1,P,{sw:2,inner:`<g transform="translate(${x-20} 42) scale(.7)">${rlGlyph(D.el,'#fff',1)}</g>`})}).join('');
  case'veil':return crRibbon(110,52,150,110,56,12,crMix(c3,'#ffffff',.5),P,{back:1})+crRibbon(116,50,140,128,40,10,crMix(c2,'#ffffff',.4),P,{back:1});
  case'spirit_hands':return[[60,120,-20],[178,96,20]].map(([x,y,r])=>`<g transform="translate(${x} ${y}) rotate(${r})" opacity=".85">${crGlow(0,0,26,P,.8)}${crP(`M-12 10 Q-14 -6 -8 -10 L-8 -24 Q-6 -28 -3 -24 L-2 -12 L0 -28 Q3 -32 5 -28 L5 -12 L8 -24 Q11 -27 12 -22 L11 -6 L16 -14 Q20 -14 18 -8 L10 10Z`,crMix(E[1],'#ffffff',.3),P,{sw:2,nospec:1})}</g>`).join('');
  case'orbit_tomes':return[[58,110],[182,78],[70,40]].map(([x,y],i)=>`<g transform="translate(${x} ${y}) rotate(${-15+i*20})">${crGlow(0,0,20,P,.7)}${crP(`M-14 -4 Q-7 -10 0 -4 Q7 -10 14 -4 L14 8 Q7 2 0 8 Q-7 2 -14 8Z`,c1,P,{sw:2,inner:`<path d="M-12 -2 Q-6 -7 -1 -2 L-1 6 Q-6 1 -12 6Z M12 -2 Q6 -7 1 -2 L1 6 Q6 1 12 6Z" fill="#fbf3dc"/>`})}</g>`).join('');
  case'orbit_orbs':return[[62,104],[182,84],[80,44],[170,140]].map(([x,y],i)=>crGlow(x,y,18,P,.9)+`<circle cx="${x}" cy="${y}" r="${7-i%2*2}" fill="url(#${P}en)" stroke="${E[2]}" stroke-width="1.6" class="cr-glowpulse" style="animation-delay:-${i*.4}s"/>`).join('');
  default:return''}}
function hrSigFront(sig,D,M,E,s,P){const[c1,c2,c3]=D.c;switch(sig){
  case'flamecrown':return crFlames([[104,52,.8,-30],[116,44,.95,-10],[130,42,1,5],[144,46,.85,20]],P);
  case'icecrown':return[[-28,104,52,22],[-10,116,44,30],[8,130,42,34],[26,144,46,24]].map(([r,x,y,h])=>`<g transform="translate(${x} ${y}) rotate(${r/2})">${crP(`M-5 4 L0 ${-h} L6 4Z`,'#cfeeff',P,{sw:2,sh:.3,inner:'<path d="M0 2 L0 -18" stroke="#fff" stroke-width="1.4"/>'})}</g>`).join('');
  case'stormcrown':return[[104,54,24],[118,46,32],[134,44,34],[148,50,26]].map(([x,y,h])=>`<path d="M${x} ${y} l-4 ${-h*.45} l6 0 l-4 ${-h*.55} l10 ${h*.6} l-6 0 l4 ${h*.4}Z" fill="#e8ffff" stroke="#1a6a7a" stroke-width="1.6" class="cr-glowpulse"/>`).join('');
  case'thorncrown':return crStroke(`M92 66 Q126 54 160 66`,shade(c1,-.2),5)+[96,108,120,132,144,156].map((x,i)=>crP(`M${x-4} ${66-Math.abs(i-2.5)*2} L${x} ${46-(i%2)*8} L${x+4} ${64-Math.abs(i-2.5)*2}Z`,i%2?c3:c2,P,{sw:1.8,sh:.3})).join('')+crGem(126,58,5,c3);
  case'starcrown':return[0,1,2,3,4].map(i=>{const x=100+i*13,y=50-(i===2?12:i%2?6:0);return`<path d="M${x} ${y-8} l2.4 6 l6 .6 l-4.6 4 l1.6 6 l-5.4 -3.4 l-5.4 3.4 l1.6 -6 l-4.6 -4 l6 -.6Z" fill="${c2}" stroke="#6a4a10" stroke-width="1.2" class="cr-glowpulse" style="animation-delay:-${i*.3}s"/>`}).join('');
  case'antlercrown':return crStroke(`M106 50 C96 30 106 16 96 -6 M102 32 C88 26 84 18 84 8 M146 46 C152 28 164 16 158 -8 M152 30 C166 24 170 16 170 6`,'#c9b07a',6)+crFlames([[96,-6,.5,-10],[158,-8,.5,10],[84,8,.4,-30],[170,6,.4,30]],P);
  case'feathercrest':return[0,1,2,3,4].map(i=>crRibbon(116,50,50-i*4,200+i*14,12,5,i%2?c2:'#ffffff',P)).join('');
  case'masque':return crP(`M100 86 Q126 76 160 86 Q162 98 150 102 Q140 96 130 100 Q118 104 104 98Z`,c2,P,{sw:2,inner:`<path d="M104 90 Q126 82 156 90" stroke="${M[1]}" stroke-width="1.8" fill="none"/>`})+crEye(146,94,3.6,{glow:E[1],sq:.7})+crEye(128,95,4.4,{glow:E[1]});
  case'wingedhelm':return[0,1,2,3].map(i=>crP(`M150 ${64-i*7} Q${172+i*4} ${48-i*10} ${178+i*6} ${30-i*10} Q${164+i*2} ${46-i*6} 152 ${60-i*7}Z`,'#fffaf0',P,{sw:1.8,sh:.3,nospec:1})).join('');
  case'mantle':return crP(`M92 128 Q96 110 120 112 Q146 110 150 128 Q152 142 140 138 Q132 146 120 140 Q108 146 100 138 Q88 142 92 128Z`,'#e8e0d0',P,{sw:2.2,inner:[0,1,2,3,4].map(i=>`<path d="M${100+i*10} 120 l-2 10" stroke="#b8a888" stroke-width="1.4"/>`).join('')})+crFlames([[100,122,.5,-40],[140,120,.5,30]],P);
  case'leafmantle':return[0,1,2,3,4,5].map(i=>crLeaf(96+i*9,130+Math.abs(i-2.5)*2,.9,-120+i*14,i%2?'#3f8a4c':'#5aa84f',P)).join('');
  case'shellguard':return crP(`M92 138 Q84 110 104 104 Q118 104 120 120 Q110 118 102 128Z`,crMix(c2,'#ffffff',.2),P,{sw:2,inner:`<path d="M96 132 Q98 116 112 110 M100 134 Q104 120 116 116" stroke="${shade(c2,-.3)}" stroke-width="1.6" fill="none"/>`})+crP(`M138 144 Q138 116 158 114 Q172 116 168 140 Q158 130 148 136Z`,crMix(c2,'#ffffff',.2),P,{sw:2,inner:`<path d="M144 138 Q146 124 160 120 M150 140 Q154 128 164 126" stroke="${shade(c2,-.3)}" stroke-width="1.6" fill="none"/>`});
  default:return''}}

/* ---------- the hero ---------- */
function crChibi(sp,s,P,mon){
  const id=sp.id,h=RL_H[id],D={...HD[id],el:h.el},el=h.el,E=CR_EN[el],T=a=>a[s];
  const M=HR_METAL[D.mt||'gold'];let[c1,c2,c3]=D.c;
  if(s===2){c1=crMix(c1,CR_DEEP[el],el==='light'?.15:.25);c2=crMix(c2,E[1],.15)}
  D.c=[c1,c2,c3];
  const skin=D.sk,hc=D.age==='elder'&&s<2?D.hc:D.hc,gem=E[1],tr=s===2?M[1]:M[0];
  const bw={slim:.9,normal:1,brawler:1.22}[D.bd]||1,of=D.of,it=h.it;
  const wingT=s===2?(D.w||'energy'):'none';
  let back='',farArm='',farLeg='',body='',nearLeg='',head='',nearArm='',front='',hairBack='';
  /* wings */
  const wx=112,wy=134;
  if(wingT!=='none'){let wg='';
    if(wingT==='angel'||wingT==='feather'){const col=wingT==='angel'?'#fbf8f0':crMix(c2,'#ffffff',.45),spw={c:{wa:'#ffffff'}},sc=`translate(${wx} ${wy}) scale(1.25) translate(${-wx} ${-wy})`;wg=`<g class="cr-wing2" style="transform-origin:${wx}px ${wy}px"><g transform="translate(16 -6) ${sc}">${crWing(wx,wy,1,col,P,1,spw,2)}</g></g><g class="cr-wing" style="transform-origin:${wx}px ${wy}px"><g transform="${sc}">${crWing(wx,wy,1,col,P,0,spw,2)}</g></g>`}
    else if(wingT==='demon'){const col=crMix(c1,'#120a1c',.4);const d=`M${wx} ${wy} C${wx-20} ${wy-50} ${wx-50} ${wy-84} ${wx-88} ${wy-86} C${wx-78} ${wy-72} ${wx-82} ${wy-62} ${wx-92} ${wy-52} C${wx-76} ${wy-50} ${wx-78} ${wy-38} ${wx-86} ${wy-28} C${wx-64} ${wy-28} ${wx-44} ${wy-16} ${wx-18} ${wy+6}Z`;
      const vein=`<path d="M${wx} ${wy} L${wx-88} ${wy-84} M${wx-4} ${wy+2} L${wx-90} ${wy-52} M${wx-8} ${wy+4} L${wx-84} ${wy-28}" stroke="${gem}" stroke-width="2.2" opacity=".85"/>`;
      wg=`<g class="cr-wing2" style="transform-origin:${wx}px ${wy}px" transform="translate(12 -4)">${crP(d,col,P,{back:1})}</g><g class="cr-wing" style="transform-origin:${wx}px ${wy}px">${crP(d,col,P,{inner:vein})}</g>`}
    else if(wingT==='fairy')wg=`<g class="cr-wing" style="transform-origin:${wx}px ${wy}px"><path d="M${wx} ${wy} C${wx-20} ${wy-60} ${wx-70} ${wy-80} ${wx-86} ${wy-60} C${wx-90} ${wy-40} ${wx-50} ${wy-10} ${wx} ${wy}Z M${wx} ${wy+4} C${wx-40} ${wy+4} ${wx-74} ${wy+20} ${wx-66} ${wy+40} C${wx-50} ${wy+48} ${wx-20} ${wy+24} ${wx} ${wy+8}Z" fill="${E[0]}" fill-opacity=".45" stroke="${E[2]}" stroke-width="2"/></g>`;
    else if(wingT==='crystal'){const sh=(a,l)=>{const ang=a*Math.PI/180,ex=wx+Math.cos(ang)*l,ey=wy+Math.sin(ang)*l,nx=-Math.sin(ang)*8,ny=Math.cos(ang)*8;return crP(`M${cf(wx+nx)} ${cf(wy+ny)} L${cf(ex)} ${cf(ey)} L${cf(wx-nx)} ${cf(wy-ny)}Z`,crMix(E[1],'#ffffff',.4),P,{sw:2,sh:.3})};wg=`<g class="cr-wing" style="transform-origin:${wx}px ${wy}px">${[250,232,214,196,178].map((a,i)=>sh(a,80-i*8)).join('')}</g>`}
    else if(wingT==='phoenix')wg=`<g class="cr-wing" style="transform-origin:${wx}px ${wy}px">${[0,1,2,3,4,5].map(i=>crRibbon(wx,wy,96-i*8,278-i*16,18,5,crMix(E[1],E[0],i*.1),P,{ph:i*.5})).join('')}</g>`;
    else wg=crEWings(wx,wy,el,P,1);
    back+=wg}
  if(s===2)back+=hrSigBack(D.sig,D,M,E,P);
  /* cape */
  if(s>=1&&of!=='monk'){const cl=s===2?crMix(c2,'#1a1022',.2):c2,cb=T([0,196,216]);
    back+=crP(`M100 128 C88 150 80 ${cb-30} 70 ${cb} Q92 ${cb-6} 110 ${cb+2} Q126 ${cb-8} 136 ${cb-4} C132 170 132 150 138 128Z`,cl,P,{back:1,inner:`<path d="M72 ${cb-2} Q92 ${cb-8} 110 ${cb} Q126 ${cb-10} 136 ${cb-6}" stroke="${tr}" stroke-width="3" fill="none"/>`})}
  if(of==='coat')back+=crP(`M104 150 C98 170 94 190 92 ${208+s*4} L108 ${200+s*4} L118 ${210+s*4} C120 190 122 170 124 150Z`,c1,P,{back:1,inner:`<path d="M94 ${206+s*4} L108 ${198+s*4} L118 ${208+s*4}" stroke="${tr}" stroke-width="2.4" fill="none"/>`});
  if(['long','flowing','pony','twin','braid','curly','bob','topknot'].includes(D.hs))hairBack=hrHairBack(D.hs,hc,s,P);
  /* legs */
  const legC=of==='monk'?c2:shade(c2,-.15),bootC=s?crMix(c1,'#2a2030',.35):(of==='monk'?'#5a3e2c':shade(c1,-.2));
  const leg=(x0,x1,x2,b)=>crLimb([[x0,170,13*(bw>1?1.15:1)],[x1,196,12*(bw>1?1.15:1)],[x2,212,11]],legC,P,{back:b});
  const boot=(x,b)=>crP(`M${x-8} 204 Q${x-10} 224 ${x-6} 227 L${x+16} 227 Q${x+20} 222 ${x+12} 216 L${x+8} 204Z`,bootC,P,{back:b,sw:2.6,inner:s?`<path d="M${x-8} 206 L${x+8} 206" stroke="${tr}" stroke-width="3"/>`:''})+(s?crGem(x,212,3+s,gem):'');
  farLeg=leg(110,106,104,1)+boot(104,1);
  nearLeg=leg(128,133,136,0)+boot(136,0)+(s&&of!=='dress'&&of!=='robe'?crP(`M128 192 L140 190 L142 202 L130 206Z`,tr,P,{sw:2.2,sh:.3}):'');
  /* arms */
  const bareArms=of==='monk',sleeve=bareArms?skin:(of==='robe'||of==='dress'?c2:c1),aw=bw>1?13:10;
  farArm=crLimb([[104-(bw-1)*20,134,aw+1],[98-(bw-1)*20,152,aw],[103-(bw-1)*20,166,aw-1]],sleeve,P,{back:1})+crP(crEll(104-(bw-1)*20,168,6*(bw>1?1.2:1),6*(bw>1?1.2:1)),s?tr:skin,P,{back:1,sw:2});
  /* torso by outfit */
  const W=(x)=>cf(120+(x-120)*bw);
  const skirtLen={robe:220,dress:214,coat:196,ranger:188,plate:184,monk:184}[of]||190;
  let skirt;
  if(of==='dress'){const n=6;skirt=`M${W(104)} 158 C${W(96)} 180 86 200 82 ${skirtLen}`;for(let i=0;i<n;i++){const x0=82+i*(76/n),x1=82+(i+1)*(76/n);skirt+=` Q${cf((x0+x1)/2)} ${skirtLen+7} ${cf(x1)} ${skirtLen}`}skirt+=` C154 200 ${W(144)} 180 ${W(136)} 158Z`}
  else if(of==='monk')skirt=`M${W(104)} 160 L${W(100)} ${skirtLen} L${W(116)} ${skirtLen-4} L${W(120)} 172 L${W(124)} ${skirtLen-4} L${W(140)} ${skirtLen} L${W(136)} 160Z`;
  else skirt=`M${W(104)} 160 C${W(98)} ${skirtLen-20} ${W(92)} ${skirtLen-6} ${W(90)} ${skirtLen} L${W(of==='robe'?150:146)} ${skirtLen} C${W(of==='robe'?146:142)} ${skirtLen-8} ${W(138)} ${skirtLen-20} ${W(134)} 160Z`;
  body+=crP(skirt,of==='plate'?shade(c2,-.1):c2,P,{inner:`<path d="M${W(92)} ${skirtLen-4} L${W(of==='robe'?148:144)} ${skirtLen-4}" stroke="${tr}" stroke-width="${s?4:2.5}"/>`+(of==='robe'?`<path d="M119 162 L119 ${skirtLen-6}" stroke="${shade(c2,-.3)}" stroke-width="2"/>`:'')+(of==='dress'&&s?`<path d="M90 ${skirtLen-14} Q119 ${skirtLen-24} 150 ${skirtLen-14}" stroke="${c3}" stroke-width="2.4" fill="none"/>`:'')});
  if(of==='plate'||s>=1&&of!=='dress'&&of!=='robe'&&of!=='monk'){const n=s===2?4:3;for(let i=0;i<n;i++){const x=96+i*(40/(n-1));body+=crP(`M${W(x-7)} 162 L${W(x+7)} 162 L${W(x+6)} ${176+s*6} L${W(x)} ${181+s*7} L${W(x-6)} ${176+s*6}Z`,crMix(c1,M[1],of==='plate'?.45:.2),P,{sw:2.2,sh:.4,inner:`<path d="M${W(x-6)} 165 L${W(x+6)} 165" stroke="${tr}" stroke-width="2"/>`})}}
  const torso=`M${W(100)} 128 Q120 120 ${W(140)} 128 L${W(138)} 160 Q120 166 ${W(102)} 160Z`;
  let chest='';
  if(of==='plate'||s>=1)chest=crP(`M${W(106)} 130 Q120 124 ${W(134)} 130 L${W(132)} 154 Q120 160 ${W(108)} 154Z`,crMix(c1,M[1],of==='plate'?.5:.2),P,{sw:2,sh:.5,inner:`<path d="M${W(108)} 131 Q120 126 ${W(132)} 131 M120 128 L120 156" stroke="${tr}" stroke-width="2" fill="none"/>`});
  else if(of==='monk')chest=`<path d="M${W(104)} 132 L${W(136)} 156 M${W(136)} 132 L${W(104)} 156" stroke="${c3}" stroke-width="5"/>`;
  else if(of==='ranger')chest=`<path d="M${W(104)} 130 L${W(132)} 158" stroke="#5a3a1a" stroke-width="5"/>`+crP(crEll(W(130),152,5,5),'#7a5a2a',P,{sw:1.6,sh:.3});
  else if(of==='coat')chest=crP(`M114 128 L120 160 L126 128Z`,c3,P,{sw:1.6,sh:.3,nospec:1})+`<path d="M${W(106)} 130 L114 160 M${W(134)} 130 L126 160" stroke="${tr}" stroke-width="2.4"/>`;
  else chest=`<path d="M112 128 L120 144 L128 128" stroke="${c3}" stroke-width="3" fill="none"/>`;
  body+=crP(torso,of==='monk'?skin:c1,P,{inner:chest+(s?crGem(120,140,4+s*1.5,gem):'')});
  body+=crStroke(`M${W(102)} 160 Q119 166 ${W(136)} 160`,of==='monk'?c3:tr,s?5:3)+crGem(119,163,s?4:3,s?gem:c3);
  if(of==='ranger')body+=crRibbon(112,128,s?40:28,170,14,5,c2,P,{back:1})+crStroke(`M${W(100)} 128 Q120 136 ${W(140)} 128`,c2,7);
  if(of==='monk')body+=crRibbon(104,162,34+s*8,120,10,5,c3,P);
  /* head */
  const fs={round:`M93 86 C93 58 111 52 125 52 C146 52 158 66 158 86 C158 104 150 117 137 121 C125 124 107 120 100 110 C95 104 93 96 93 86Z`,
    sharp:`M93 84 C93 58 111 52 125 52 C146 52 158 66 158 84 C158 100 152 112 140 124 C128 128 108 118 100 108 C95 102 93 94 93 84Z`,
    square:`M92 86 C92 58 110 50 126 50 C148 50 160 64 160 86 C160 104 156 118 146 122 C132 126 108 124 100 114 C94 106 92 96 92 86Z`}[D.fs]||'';
  if(!['long','flowing','pony','twin','braid','curly','bob','topknot'].includes(D.hs)&&!['horned_helm','winged_helm','plume_helm','hood'].includes(D.hw))head+=hrHairBack(D.hs,hc,s,P);
  else if(!['horned_helm','winged_helm','plume_helm','hood'].includes(D.hw))head+=['bob','curly','topknot'].includes(D.hs)?'':crP(crEll(122,74,36,32),hc,P);
  if(['bob','curly','topknot','double_bun'].includes(D.hs)&&!['horned_helm','winged_helm','plume_helm','hood'].includes(D.hw))head+=hrHairBack(D.hs,hc,s,P);
  if(D.hw==='hood')head+=hrHeadwear('hood',s,D,M,gem,P);
  // race features behind face
  const race=D.race;
  if(race==='wolf'||race==='cat'){head+=crP(`M96 62 L${race==='cat'?88:82} ${race==='cat'?28:20} L118 52Z`,hc,P,{sw:2.4,inner:`<path d="M98 58 L90 34 L110 52Z" fill="${shade(hc,-.4)}"/>`})+crP(`M126 52 L${race==='cat'?138:136} ${race==='cat'?20:14} L150 58Z`,shade(hc,-.12),P,{sw:2.4})}
  else if(race==='bear')head+=crP(crEll(100,56,12,12),hc,P,{sw:2.4,inner:`<circle cx="100" cy="57" r="6" fill="${shade(hc,-.35)}"/>`})+crP(crEll(146,52,11,11),shade(hc,-.12),P,{sw:2.4});
  else if(race==='horn'&&!['horned_helm','crown_tassel'].includes(D.hw)){const hn=s===2?'#2a1a2a':'#e8dcc8';head+=crHorn(`M104 60 Q86 ${36-s*6} ${70-s*6} ${32-s*10}`,hn)+crHorn(`M138 54 Q140 ${26-s*6} ${128-s*4} ${14-s*10}`,shade(hn,-.1))}
  head+=crP(fs,skin,P,{sw:2.6,sh:.6,inner:`<ellipse cx="132" cy="108" rx="8" ry="4" fill="#ff8a8a" opacity="${D.age==='elder'?.08:.2}"/>`+(D.age==='elder'?`<path d="M118 100 l6 2 M152 98 l4 2 M120 76 Q130 72 140 76" stroke="${shade(skin,-.35)}" stroke-width="1.4" fill="none"/>`:'')});
  if(race==='elf')head+=crP(`M100 92 Q74 70 70 62 Q84 82 98 104Z`,skin,P,{sw:2.2,sh:.4});
  else if(race==='fin')head+=crP(`M100 90 Q78 76 74 66 Q80 84 76 92 Q88 96 98 106Z`,crMix(E[1],skin,.35),P,{sw:2.2,sh:.4,inner:`<path d="M98 96 L78 72 M98 100 L78 88" stroke="${E[2]}" stroke-width="1.4"/>`});
  else if(race==='human'||race==='angel')head+=crP(crEll(101,96,6,9),skin,P,{sw:2.2,sh:.4});
  // eyes, brows, mouth
  const es=D.es,ec=D.ec,brC=shade(hc,-.45);
  if(D.mk!=='eyepatch')head+=hrEye(148,95,4.4,8.4,ec,P,{es,sk:skin});
  head+=hrEye(128,96,6.6,9.2,ec,P,{es,sk:skin});
  if(!['horned_helm','winged_helm','plume_helm'].includes(D.hw)||true)head+=hrBrow(129,82,15,D.br,brC)+(D.mk!=='eyepatch'?hrBrow(149,81,10,D.br,brC):'');
  head+=`<path d="M155 101 l2 5 l-3 1" stroke="${shade(skin,-.4)}" stroke-width="1.4" fill="none"/>`;
  head+=hrMark(D.mk,c3,ec,hc,P);
  if(D.mk!=='mask'&&!['beard','longbeard'].includes(D.fh))head+=hrMouth(D.mo);
  head+=hrFacialHair(D.fh,hc,P);
  if(['beard','longbeard'].includes(D.fh)&&D.mk!=='mask')head+=hrMouth(D.mo==='grin'?'grin':'neutral');
  // bangs and headwear
  if(!['horned_helm','winged_helm','plume_helm'].includes(D.hw)){head+=hrBangs(D.bg,D.hs,hc,P);
    if(['long','flowing','braid','bob','curly'].includes(D.hs))head+=crP(`M96 78 C92 96 94 116 100 128 L106 124 C102 108 102 94 104 82Z`,shade(hc,-.15),P,{sw:2.2})}
  if(D.hs==='sidecut')head+=crP(`M94 84 C92 62 104 52 112 50 L108 70 Q100 74 98 86Z`,shade(hc,-.35),P,{sw:1.6,sh:.3,nospec:1});
  if(D.hw!=='hood')head+=hrHeadwear(D.hw,s,D,M,gem,P);
  if(s===1&&['none','headband','hairpin','flower','bandana','shell_clip'].includes(D.hw))head+=crStroke(`M96 70 Q126 60 158 70`,tr,3)+crGem(126,63,4,gem);
  if(race==='angel')head+=`<ellipse cx="124" cy="${s===2?22:30}" rx="${18+s*4}" ry="5" fill="none" stroke="#ffe680" stroke-width="3.4" class="cr-glowpulse"/>`;
  if(s===2)head+=hrSigFront(['flamecrown','icecrown','stormcrown','thorncrown','starcrown','antlercrown','feathercrest','masque','wingedhelm'].includes(D.sig)?D.sig:'',D,M,E,s,P);
  if(s===2&&!['crown_tassel','horned_helm','winged_helm','plume_helm','witch','scholar','antlers','tiara'].includes(D.hw)&&!['flamecrown','icecrown','stormcrown','thorncrown','starcrown','antlercrown','masque'].includes(D.sig))head+=crCrown(126,54,30,gem);
  /* pauldrons */
  const paul=(x,y,z,b)=>{const col=crMix(c1,M[1],of==='plate'?.5:.25);let p=crP(`M${x-14*z} ${y+6*z} Q${x-16*z} ${y-12*z} ${x} ${y-14*z} Q${x+16*z} ${y-12*z} ${x+15*z} ${y+6*z} Q${x} ${y+12*z} ${x-14*z} ${y+6*z}Z`,col,P,{back:b,sw:2.4,inner:`<path d="M${x-12*z} ${y+3*z} Q${x} ${y+9*z} ${x+12*z} ${y+3*z}" stroke="${tr}" stroke-width="2.4" fill="none"/>`});
    if(s===2){const dir=b?-1:1;p+=[0,1,2].map(i=>{const bx=x+dir*(6+i*5)*z,by=y-(8-i*2)*z,tx=x+dir*(16+i*8)*z,ty=y-(22-i*5)*z;return crP(`M${cf(bx-4)} ${cf(by)} L${cf(tx)} ${cf(ty)} L${cf(bx+4)} ${cf(by+2)}Z`,crMix(col,'#ffffff',.2),P,{back:b,sw:2,sh:.3})}).join('')+crGem(x,y-2*z,4,gem)}
    return p};
  const hasPaul=(s>=1||of==='plate')&&of!=='dress';
  if(hasPaul)back+=paul(102-(bw-1)*20,132,(s===2?1.15:s?.85:.7)*bw,1);
  /* artifact */
  const hand=[160+(bw-1)*14,168];let itB='',itF='';const glow=(x,y,r)=>crGlow(x,y,r,P,.9);const staffTop=T([86,72,58]);
  switch(it){
    case'staff':case'quill':{itB+=crStroke(`M160 220 L166 ${staffTop}`,s===2?'#2a1a2a':'#6a4a2a',5);
      if(it==='quill')itF+=crP(`M166 ${staffTop+8} C186 ${staffTop-20} 184 ${staffTop-56} 170 ${staffTop-70} C168 ${staffTop-46} 160 ${staffTop-26} 162 ${staffTop+6}Z`,s===2?E[1]:c3,P,{sw:2.4,inner:`<path d="M166 ${staffTop+4} Q172 ${staffTop-30} 170 ${staffTop-64}" stroke="#fff" stroke-width="1.6" fill="none"/>`});
      else{itF+=glow(166,staffTop-6,14+s*8)+crP(`M166 ${staffTop-22-s*6} L174 ${staffTop-6} L166 ${staffTop+8} L158 ${staffTop-6}Z`,crMix(E[1],'#ffffff',.3),P,{sw:2.4,sh:.4});
        if(s)itF+=crStroke(`M154 ${staffTop+4} Q166 ${staffTop+14} 178 ${staffTop+4} M156 ${staffTop-2} Q148 ${staffTop-26} 160 ${staffTop-34} M176 ${staffTop-2} Q184 ${staffTop-26} 172 ${staffTop-34}`,tr,3)}
      if(s===2)itF+=`<ellipse cx="166" cy="${staffTop-6}" rx="22" ry="7" fill="none" stroke="${E[0]}" stroke-width="2" class="cr-glowpulse"/>`;break}
    case'orb':case'lantern':{const oy=hand[1]-T([22,26,30]),ox=hand[0]+8;itF+=glow(ox,oy,16+s*8)+(it==='lantern'?crP(`M${ox-8} ${oy-10} L${ox+8} ${oy-10} L${ox+10} ${oy+10} L${ox-10} ${oy+10}Z`,'#3a2a3a',P,{sw:2.2,inner:`<rect x="${ox-6}" y="${oy-7}" width="12" height="14" fill="url(#${P}en)"/>`})+crStroke(`M${ox} ${oy-10} L${ox} ${oy-16} M${hand[0]} ${hand[1]} L${ox} ${oy-16}`,tr,2):`<circle cx="${ox}" cy="${oy}" r="${8+s*2}" fill="url(#${P}en)" stroke="${E[2]}" stroke-width="2"/><circle cx="${ox-3}" cy="${oy-3}" r="3" fill="#fff" opacity=".8"/>`);
      if(s===2)itF+=`<ellipse cx="${ox}" cy="${oy}" rx="20" ry="6" fill="none" stroke="${E[0]}" stroke-width="2" class="cr-glowpulse"/>`;break}
    case'book':{const bx=hand[0]+12,by=hand[1]-T([20,24,28]);itF+=glow(bx,by,16+s*6)+crP(`M${bx-16} ${by-6} Q${bx-8} ${by-12} ${bx} ${by-6} Q${bx+8} ${by-12} ${bx+16} ${by-6} L${bx+16} ${by+8} Q${bx+8} ${by+2} ${bx} ${by+8} Q${bx-8} ${by+2} ${bx-16} ${by+8}Z`,c1,P,{sw:2.4,inner:`<path d="M${bx-14} ${by-4} Q${bx-7} ${by-9} ${bx-1} ${by-4} L${bx-1} ${by+5} Q${bx-7} ${by} ${bx-14} ${by+5}Z M${bx+14} ${by-4} Q${bx+7} ${by-9} ${bx+1} ${by-4} L${bx+1} ${by+5} Q${bx+7} ${by} ${bx+14} ${by+5}Z" fill="#fbf3dc"/>`})+(s?`<path d="M${bx-6} ${by-12} l3 -10 l3 10 M${bx+6} ${by-12} l3 -14 l3 14" stroke="${E[1]}" stroke-width="2" class="cr-glowpulse"/>`:'');break}
    case'shield':{const sx=hand[0]+4,sy=hand[1]-10,z=T([.8,1,1.18])*(bw>1?1.08:1);itF+=crP(`M${sx-18*z} ${sy-24*z} Q${sx} ${sy-32*z} ${sx+18*z} ${sy-24*z} L${sx+16*z} ${sy+10*z} Q${sx} ${sy+34*z} ${sx-16*z} ${sy+10*z}Z`,crMix(c1,M[1],.4),P,{sw:2.8,inner:`<path d="M${sx-14*z} ${sy-20*z} Q${sx} ${sy-27*z} ${sx+14*z} ${sy-20*z} L${sx+12*z} ${sy+8*z} Q${sx} ${sy+28*z} ${sx-12*z} ${sy+8*z}Z" fill="none" stroke="${tr}" stroke-width="3"/>`})+`<g transform="translate(${sx} ${sy-2})">${rlGlyph(el,'#fff',.9*z)}</g>`+(s?crGem(sx,sy-18*z,4+s,gem):'')+(s===2?crGlow(sx,sy,30,P,.4):'');break}
    case'banner':{itB+=crStroke(`M162 220 L164 ${staffTop-10}`,'#4a3424',4.5)+crGem(164,staffTop-14,4,gem);itB+=crP(`M165 ${staffTop-6} Q186 ${staffTop} 204 ${staffTop-6} L204 ${staffTop+46} Q186 ${staffTop+40} 165 ${staffTop+46}Z`,c1,P,{sw:2.4,inner:`<path d="M168 ${staffTop+40} Q186 ${staffTop+34} 202 ${staffTop+40}" stroke="${tr}" stroke-width="3" fill="none"/><g transform="translate(184 ${staffTop+18})">${rlGlyph(el,'#fff',.9)}</g>`});break}
    case'lute':{const lx=hand[0],ly=hand[1]-6;itF+=crP(`M${lx-10} ${ly+14} C${lx-18} ${ly-10} ${lx-10} ${ly-30} ${lx} ${ly-34} C${lx+10} ${ly-30} ${lx+18} ${ly-10} ${lx+10} ${ly+14} Q${lx} ${ly+20} ${lx-10} ${ly+14}Z`,s===2?M[1]:'#b8863a',P,{sw:2.4,inner:[-4,0,4].map(d=>`<path d="M${lx+d} ${ly-26} L${lx+d} ${ly+10}" stroke="${E[0]}" stroke-width="1.2"/>`).join('')})+(s?glow(lx,ly-10,18+s*4):'');break}
  }
  const gl=s?crMix(c1,M[1],.4):(bareArms?'#7a5a3a':skin);
  nearArm=crLimb([[138+(bw-1)*20,140,aw+1],[148+(bw-1)*16,156,aw],[hand[0]-4,hand[1],aw-1]],sleeve,P)+(s||bareArms?crP(crCap(148+(bw-1)*16,158,aw+2,hand[0]-6,hand[1]-1,aw+1),gl,P,{sw:2.2,sh:.4}):'')+crP(crEll(hand[0],hand[1],6.5*(bw>1?1.25:1),6.5*(bw>1?1.25:1)),s?gl:skin,P,{sw:2.2,sh:.4});
  const nearPaul=hasPaul?paul(142+(bw-1)*20,141,(s===2?1.25:s?.95:.75)*bw,0):'';
  if(s===2)front+=hrSigFront(['mantle','leafmantle','shellguard'].includes(D.sig)?D.sig:'',D,M,E,s,P);
  /* assemble */
  const k=T([.86,.93,1]);
  const svg=`<g transform="translate(120 228) scale(${k}) translate(-120 -228)">${back}${hairBack}${itB}${farArm}${farLeg}<g class="cr-body" style="transform-origin:120px 200px">${body}</g>${nearLeg}${front}<g class="cr-head" style="transform-origin:122px 120px"><g transform="translate(0 -6)">${head}</g></g>${nearArm}${nearPaul}${itF}</g>`;
  const sc=v=>120+(v-120)*k,sy=v=>228+(v-228)*k;
  let top=30;
  if(['horned_helm'].includes(D.hw))top=Math.min(top,12-s*10);if(D.hw==='witch')top=-20-s*16;if(D.hw==='crown_tassel'||D.hw==='scholar')top=20;if(D.hw==='antlers')top=10-s*8;
  if(D.hs==='wild'||D.hs==='spiky')top=Math.min(top,14);if(D.hs==='topknot')top=Math.min(top,22);if(race==='wolf'||race==='cat')top=Math.min(top,12);if(race==='horn')top=Math.min(top,20-s*10);
  if(it==='staff'||it==='quill')top=Math.min(top,staffTop-74);if(s===2){top=Math.min(top,wingT==='none'?(D.sig==='antlercrown'?-14:D.sig==='banner_back'?14:20):wy-100);if(['sundisc','halobig','moon'].includes(D.sig))top=Math.min(top,14)}
  const left=s===2&&wingT!=='none'?20:['flowing','pony'].includes(D.hs)?50:66;
  return{svg,box:[sc(left),sy(top-6),sc(it==='banner'?208:192),228],top:[sc(124),sy(30)],hasW:1}}
CR_PLAN.chibi=crChibi;

/* every collectible becomes a chibi hero */
for(const h of RL_HEROES){const H=HD[h.id];CR_SP[h.id]={plan:'chibi',id:h.id,ev:H?H.ev:[h.n,h.n,h.n],c:{b:'#888',a:'#ccc',m:CR_EN[h.el][1]}};h.ev=CR_SP[h.id].ev;h.n=h.ev[0]}
for(const k in CR_CACHE)delete CR_CACHE[k];for(const k in RL_PC)delete RL_PC[k];
[['brandt',0,'Shield Bash'],['marin',0,'Tide Strum'],['ashling',0,'Lantern Swing'],['pip',0,'Hay Bale Bash'],['ignatius',0,'Searing Quill']].forEach(([id,i,n])=>{if(RL_H[id])RL_H[id].sk[i].n=n});
