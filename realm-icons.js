"use strict";
/* ================================================================
   SKILL ICONS: a white glyph on the hero's colour, one per skill.
   Glyphs are drawn on a 24×24 grid. RL_SKICON maps skill names to
   glyphs; anything unlisted falls back to a glyph picked from what
   the skill does.
   ================================================================ */
const RL_GLYPH={
  sword:'<path d="M19.5 4.5l-.8 3.6-8.6 8.6-2.8-2.8 8.6-8.6z"/><path d="M5.6 13.2l5.2 5.2M4 20l3.2-3.2"/>',
  fireball:'<circle cx="15" cy="9" r="4.5"/><path d="M11.8 12.2L4 20M10.5 8.5L5 11M15.5 13.5L13 19"/>',
  shield:'<path d="M12 3l7 2.8v5.4c0 4.6-3 7.9-7 9.8-4-1.9-7-5.2-7-9.8V5.8z"/>',
  shieldflame:'<path d="M12 3l7 2.8v5.4c0 4.6-3 7.9-7 9.8-4-1.9-7-5.2-7-9.8V5.8z"/><path d="M12 8c.5 2 2.5 3 2.5 5a2.5 2.5 0 0 1-5 0c0-1 .5-1.6 1-2.2.2.8.7 1.2 1.2 1.2 0-1.4-.4-2.4.3-4z"/>',
  shieldrune:'<path d="M12 3l7 2.8v5.4c0 4.6-3 7.9-7 9.8-4-1.9-7-5.2-7-9.8V5.8z"/><path d="M12 8v8M8.8 10l6.4 4M8.8 14l6.4-4"/>',
  guard:'<path d="M12 3l7 2.8v5.4c0 4.6-3 7.9-7 9.8-4-1.9-7-5.2-7-9.8V5.8z"/><path d="M12 8.5v7M8.5 12h7"/>',
  wall:'<path d="M3 20h18V8H3zM3 14h18M8 8v6M16 8v6M12 14v6M3 8l2-4h14l2 4"/>',
  thrust:'<path d="M3.5 20.5L14.5 9.5"/><path d="M14.5 9.5l1.2-4.6 4.6-1.2-1.2 4.6z"/><path d="M11 9.5l3.5 3.5"/>',
  wave:'<path d="M2.5 15c2.5-4 5.5-4 8 0s5.5 4 8 0c1-1.6 2-2.4 3-2.6"/><path d="M2.5 9.5c2.5-4 5.5-4 8 0s5.5 4 8 0"/>',
  swirl:'<path d="M12 12a2 2 0 1 1 2 2 4 4 0 1 1-4-4 6 6 0 1 1-6 6"/><path d="M20.5 9.5A9 9 0 0 0 9 3.2"/>',
  quake:'<path d="M2.5 19.5h19"/><path d="M12 19.5l-1.5-4 2.5-2.5-2-4 1.5-4.5M6 19.5l-1-3M18 19.5l1-3"/><path d="M5 9l-2-1.5M19 9l2-1.5M7 5.5L6 3.5M17 5.5l1-2"/>',
  crystal:'<path d="M12 2.5l5 6-5 13-5-13z"/><path d="M7 8.5h10M12 2.5v19"/>',
  shards:'<path d="M6 4l2.5 4L6 13 3.5 8z"/><path d="M14 3l3 5-3 6-3-6z"/><path d="M11 13l3 4.5-3 4-3-4z"/>',
  dash:'<path d="M2.5 8h7M2.5 12h10M2.5 16h7"/><path d="M14 5.5L20.5 12 14 18.5"/>',
  blades:'<path d="M3 11l5-5 1.5 1.5L5 12z"/><path d="M9.5 14.5l5-5 1.5 1.5-4.5 4.5z"/><path d="M16 18l5-5"/><path d="M3 11l-0.5 1.5M9.5 14.5L9 16M16 18l-.5 1.5"/>',
  moon:'<path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/><path d="M17 3.5v3M15.5 5h3"/>',
  vine:'<path d="M5 20C5 11 10.5 5.5 20 4c-1.5 9.5-7 15-15 16z"/><path d="M5 20l9.5-9.5M9 14.5H12.5M11.5 12V9"/>',
  spore:'<circle cx="8" cy="14" r="3.5"/><circle cx="15.5" cy="11.5" r="4.5"/><circle cx="6" cy="6" r="1.2"/><circle cx="12" cy="4" r="1"/><circle cx="19" cy="4.5" r="1.2"/><circle cx="18" cy="19" r="1.2"/>',
  bloom:'<circle cx="12" cy="10" r="1.8"/><circle cx="12" cy="5.6" r="2.4"/><circle cx="16.2" cy="8.6" r="2.4"/><circle cx="14.6" cy="13.4" r="2.4"/><circle cx="9.4" cy="13.4" r="2.4"/><circle cx="7.8" cy="8.6" r="2.4"/><path d="M12 16v5M12 19.5c1.4-1.6 3-2 4.5-1.6"/>',
  gear:'<circle cx="12" cy="12" r="3"/><path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M5.6 18.4l1.8-1.8M16.6 7.4l1.8-1.8"/><circle cx="12" cy="12" r="6.5"/>',
  ricochet:'<path d="M3 17l5-9 5 8 4-7"/><path d="M13.5 8.5l3.5.5.5-3.5"/><circle cx="8" cy="8" r="1"/><circle cx="13" cy="16" r="1"/>',
  burst:'<path d="M12 2.5l1.8 5.4 5.4-2-3.2 4.8 5 2.8-5.7.6.8 5.6L12 15.8l-4.1 3.9.8-5.6-5.7-.6 5-2.8-3.2-4.8 5.4 2z"/>',
  soundwave:'<path d="M4 9.5v5"/><path d="M8 7a7 7 0 0 1 0 10M12 4.5a11 11 0 0 1 0 15M16 2.5a14 14 0 0 1 0 19"/>',
  ring:'<circle cx="12" cy="12" r="2.2"/><circle cx="12" cy="12" r="5.6"/><path d="M3.5 8.5a9.5 9.5 0 0 1 3-4M20.5 8.5a9.5 9.5 0 0 0-3-4M3.5 15.5a9.5 9.5 0 0 0 3 4M20.5 15.5a9.5 9.5 0 0 1-3 4"/>',
  bell:'<path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l2 2H4z"/><path d="M10 21h4M12 3v2"/>',
  snow:'<path d="M12 2.5v19M3.8 7.2l16.4 9.6M3.8 16.8l16.4-9.6"/><path d="M9.5 4l2.5 2 2.5-2M9.5 20l2.5-2 2.5 2"/>',
  icicle:'<path d="M5 4h14l-7 17z"/><path d="M9 4l3 8 3-8"/>',
  note:'<path d="M9 18V5.5l11-2V16"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/><path d="M9 9.5l11-2"/>',
  drum:'<ellipse cx="12" cy="9" rx="8" ry="3"/><path d="M4 9v7c0 1.7 3.6 3 8 3s8-1.3 8-3V9"/><path d="M4 9l16 7M20 9L4 16"/><path d="M15 2.5l3 4M9 2.5l-3 4"/>',
  arrow:'<path d="M5 19L19 5"/><path d="M12.5 5H19v6.5"/><path d="M3.5 15.5l5 5M6 13.5l4.5 4.5"/>',
  arrows3:'<path d="M3 15L13 5M7 19L17 9M11 21l9-9"/><path d="M9 5h4v4M13 9h4v4M16 12h4v4"/>',
  rain:'<path d="M6 3v12M12 5v14M18 3v12"/><path d="M3.5 12.5L6 15l2.5-2.5M9.5 16.5L12 19l2.5-2.5M15.5 12.5L18 15l2.5-2.5"/>',
  sweep:'<path d="M4 16a9 9 0 0 1 15-8"/><path d="M14.5 4.5l4.5 3.5-3.5 4.5"/><path d="M3 20h18"/>',
  rock:'<path d="M4 16.5c-1-3.5 1-7.5 4.5-9 3-1.3 7-.6 9.5 1.8 2.3 2.2 2.8 5.5 1.5 8.2-1 .8-2.5 1-4.5 1H7c-1.4 0-2.5-.8-3-2z"/><path d="M10 7.8l1.5 3.4-2 2.8M11.5 11.2l3.5 1.3"/><circle cx="20" cy="5" r="1.2"/><circle cx="16" cy="3.5" r=".9"/>',
  shovel:'<path d="M14 10L20 4M17.5 2.5l4 4"/><path d="M14 10l-1.5-1.5-7 7 0 4.5 4.5 0 7-7z"/>',
  drop:'<path d="M12 3s6.5 7.2 6.5 11.5a6.5 6.5 0 0 1-13 0C5.5 10.2 12 3 12 3z"/><path d="M9 14.5a3 3 0 0 0 3 3"/>',
  flame:'<path d="M12 2.5c1 4.3 6.5 6.2 6.5 11.5a6.5 6.5 0 0 1-13 0c0-3.4 2-4.6 3.2-6.6.2 2.2 1.3 3.3 2.5 3.3 0-3.4-1-5.5.8-8.2z"/>',
  bolt:'<path d="M13.5 2L5 13.5h6.5L10 22l9-12.5h-6.5z"/>',
  tornado:'<path d="M3 4h18M5 8h14M8 12h10M10 16h6M11 20h3"/>',
  star:'<path d="M12 2.8l2.8 6 6.4.7-4.8 4.4 1.4 6.4L12 17l-5.8 3.3 1.4-6.4-4.8-4.4 6.4-.7z"/>',
  sigil:'<circle cx="12" cy="12" r="9"/><path d="M12 5l2 5.2 5.5.4-4.2 3.4 1.4 5.3L12 16.3l-4.7 3 1.4-5.3-4.2-3.4 5.5-.4z"/>',
  rift:'<ellipse cx="12" cy="12" rx="4.5" ry="9"/><path d="M12 7.5c2 1.5 2 7.5 0 9M2.5 12h3M18.5 12h3M4 5.5l2.5 2M20 18.5l-2.5-2"/>',
  feather:'<path d="M20 4C10.5 4 5 10.5 5 19c8.5 0 15-5.5 15-15z"/><path d="M5 19L16 8M9 11.5h4.5M7.5 15H12"/>',
  fang:'<path d="M3.5 5.5h17"/><path d="M6.5 5.5l2 11 2-11M13.5 5.5l2 11 2-11"/>',
  crescents:'<path d="M5 20c8-1 13.5-7 14-15.5"/><path d="M5 20c5.5-2.5 9-7.5 9.5-13"/><path d="M3 13c5-1.2 8.5-4.8 9-10"/>',
  poison:'<path d="M12 3s6 6.7 6 10.7a6 6 0 0 1-12 0C6 9.7 12 3 12 3z"/><circle cx="10" cy="13.5" r="1.4"/><circle cx="14" cy="15.5" r="1"/><circle cx="19.5" cy="5" r="1.3"/><circle cx="4.5" cy="6.5" r="1"/>',
  heal:'<path d="M12 20.5s-8-4.8-8-11a4.4 4.4 0 0 1 8-2.6 4.4 4.4 0 0 1 8 2.6c0 6.2-8 11-8 11z"/><path d="M12 9.5v6M9 12.5h6"/>',
  dew:'<path d="M8 3s4 4.5 4 7.2a4 4 0 0 1-8 0C4 7.5 8 3 8 3z"/><path d="M17 9s3.5 4 3.5 6.3a3.5 3.5 0 0 1-7 0C13.5 13 17 9 17 9z"/><path d="M9 16.5s2 2.3 2 3.6a2 2 0 0 1-4 0c0-1.3 2-3.6 2-3.6z"/>',
  sunrise:'<path d="M2.5 18.5h19"/><path d="M6.5 18.5a5.5 5.5 0 0 1 11 0"/><path d="M12 4v4M4.5 8.5l2.5 2.5M19.5 8.5L17 11"/><path d="M9.5 21.5h5"/>',
  rally:'<path d="M12 20.5s-8-4.8-8-11a4.4 4.4 0 0 1 8-2.6 4.4 4.4 0 0 1 8 2.6c0 6.2-8 11-8 11z"/><path d="M12 16V9M9 11.5l3-3 3 3"/>',
  lantern:'<path d="M8 7h8l1 10H7z"/><path d="M10 7V4.5h4V7M9.5 3h5M6.5 17h11M12 10.5c.8 1 1.5 1.6 1.5 2.6a1.5 1.5 0 0 1-3 0c0-1 .7-1.6 1.5-2.6z"/>',
  veil:'<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="2.8"/><path d="M4 20L20 4"/>'
};
const RL_SKICON={
  'Ember Slash':'sword','Foxfire Bolt':'fireball','Flame Ward':'shieldflame',
  'Tidal Thrust':'thrust','Shellspin Wave':'wave','Guardian Current':'guard',
  'Seismic Strike':'quake','Crystal Burst':'crystal','Earthen Bulwark':'wall',
  'Dusk Dash':'dash','Wingblade Volley':'blades','Nightfall Burst':'moon',
  'Root Snare':'vine','Seedburst':'spore','Rejuvenation Bloom':'bloom',
  'Gear-Shot':'gear','Ricochet Volley':'ricochet','Cogblast':'burst',
  'Soundwave':'soundwave','Ringing Shards':'shards','Resonance Burst':'bell',
  'Frost Cleave':'snow','Ice-Lance Burst':'icicle','Rune Ward':'shieldrune',
  'Rapid Lunge':'dash','Sonic Note Volley':'note','Rhythm Burst':'drum',
  'Charged Arrow':'arrow','Triple-Shot':'arrows3','Arrow Rain':'rain',
  'Spear Thrust':'thrust','Winding Sweep':'sweep','Skycharge':'dash',
  'Pebble Flick':'rock','Spore Puff':'spore','Spore Burst':'burst',
  'Shovel Jab':'shovel','Dirt-Clod Toss':'rock','Burrow Burst':'quake',
  'Wax Glob':'drop','Ember Spit':'fireball','Flame Flick':'flame',
  'Coral-Lance Thrust':'thrust','Water-Blade Volley':'blades','Deep Current':'swirl',
  'Lightning Cleave':'bolt','Chain-Bolt Volley':'ricochet','Tempest Drive':'tornado',
  'Astral Lance':'star','Sigil-Bolt Volley':'sigil','Rift Sweep':'rift',
  'Sunflare Arrow':'arrow','Feather Volley':'feather','Phoenix Rain':'rain',
  'Venom Fang':'fang','Twin Toxin Crescents':'crescents','Caustic Mireburst':'poison',
  'Moonwell Mend':'heal','Dewfall Blessing':'dew','Sanctuary Bloom':'sunrise',
  'Kindled Aid':'lantern','Hearthlight Rally':'rally','Second Dawn':'sunrise',
  'Spearstorm':'rain','Quickstep Cut':'dash','Twin Crescent':'crescents','Veilstep Attack':'veil'
};
function rlGlyphFor(s){if(RL_SKICON[s.n])return RL_SKICON[s.n];const f=s.fx.map(x=>x[0]==='self'||x[0]==='team'?x[1]:x[0]);
  if(f.includes('revive')||s.res)return'sunrise';if(f.some(k=>k==='heal'||k==='healT'))return'heal';if(f.includes('shield'))return'shield';
  if(f.includes('burn'))return'flame';if(f.includes('poison'))return'poison';if(f.includes('chill'))return'snow';if(s.tg==='eA')return'burst';return(s.h||1)>1?'blades':'sword'}
/* the icon tile: glyph on the hero's colour. dim: greyed (on cooldown) */
function rlSkIcon(id,lv,i){const H=RL_H[id],s=H&&H.sk[i];if(!s||s.pas)return'';const E=RL_EL[H.el]||{c:'#888',d:'#222',l:'#fff'},g=RL_GLYPH[rlGlyphFor(s)]||RL_GLYPH.sword;
  return`<span class="rl-skic" style="--ic:${E.c};--icd:${E.d};--icl:${E.l}"><svg viewBox="0 0 24 24" aria-hidden="true"><g class="sh">${g}</g><g>${g}</g></svg>${i===2?'<i class="ult"></i>':''}</span>`}
(function(){const st=document.createElement('style');st.textContent=`
.rl-skic{position:relative;display:grid;place-items:center;width:46px;height:46px;border-radius:11px;flex:0 0 auto;
  background:radial-gradient(120% 90% at 30% 20%,color-mix(in srgb,var(--icl) 35%,var(--ic)),var(--ic) 45%,var(--icd));
  box-shadow:inset 0 1px 0 rgba(255,255,255,.35),inset 0 0 0 1px rgba(255,255,255,.18),inset 0 -6px 10px -6px rgba(0,0,0,.45),0 3px 8px -3px #000}
.rl-skic svg{width:64%;height:64%;overflow:visible;fill:none;stroke:#fff;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.rl-skic svg .sh{stroke:rgba(0,0,0,.4);stroke-width:3.6;transform:translate(.4px,.9px)}
.rl-skic .ult{position:absolute;inset:-1px;border-radius:12px;box-shadow:inset 0 0 0 2px #ffd60a;opacity:.85;pointer-events:none}`;document.head.appendChild(st)})();
