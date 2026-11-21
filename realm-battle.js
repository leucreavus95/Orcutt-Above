"use strict";
/* ================================================================
   REALM BATTLE SCENE: full-body characters on an illustrated
   battlefield, with canvas spell effects. Loaded after realm-ui.js;
   it replaces the card-based battle display there.
   ================================================================ */

/* ---------- full-body heroes (200 × 360) ---------- */
const RL_BODY={};
function rlHeroBody(id){
  if(RL_BODY[id])return RL_BODY[id];
  const h=RL_H[id],look=rlLook(h),T=HITEM['hx-t-'+id].d,u='hb'+(++_n),skin=SKINS[h.lk[0]]||SKINS[3],E=RL_EL[h.el];
  const c1=T.c1,c2=T.c2,c3=T.c3,dk=shade(c1,-.35),boot='#2a1d14',pants=shade(h.o==='armor'?'#4a4556':c2,-.5);
  const av=avatarSVG(look,true).replace('<svg class="av"','<svg class="av" x="0" y="0" width="200" height="220"');
  const defs=`<defs><linearGradient id="${u}st" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${RL_STEEL[2]}"/><stop offset=".45" stop-color="${RL_STEEL[1]}"/><stop offset="1" stop-color="${RL_STEEL[0]}"/></linearGradient><linearGradient id="${u}sh" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".35"/><stop offset=".4" stop-color="#000" stop-opacity="0"/><stop offset=".7" stop-color="#fff" stop-opacity=".08"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient><filter id="${u}gw" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter><radialGradient id="${u}ob" cx=".35" cy=".3"><stop offset="0" stop-color="#fff"/><stop offset=".3" stop-color="${E.l}"/><stop offset=".75" stop-color="${E.c}"/><stop offset="1" stop-color="${E.d}"/></radialGradient></defs>`;
  const leg=(x)=>`<path d="M${x} 224 L${x} 326" stroke="${pants}" stroke-width="27" stroke-linecap="round"/><path d="M${x-4} 230 L${x-4} 320" stroke="#fff" stroke-opacity=".07" stroke-width="5"/><path d="M${x-15} 330 Q${x} 318 ${x+17} 330 L${x+18} 346 Q${x} 350 ${x-15} 346Z" fill="${boot}"/>`;
  let lower='';
  switch(h.o){
   case'robe':lower=`<path d="M48 204 L152 204 L174 340 Q100 356 26 340Z" fill="${c1}"/><path d="M48 204 L152 204 L174 340 Q100 356 26 340Z" fill="url(#${u}sh)"/><path d="M86 204 L114 204 L122 350 L78 350Z" fill="${c2}"/><path d="M86 204 L78 350 M114 204 L122 350" stroke="${c3}" stroke-width="2"/><path d="M28 328 Q100 344 172 328 L174 340 Q100 356 26 340Z" fill="${c2}"/><path d="M60 240 Q64 300 54 336 M140 240 Q136 300 146 336" stroke="${dk}" stroke-width="2.5" fill="none" opacity=".6"/><ellipse cx="80" cy="351" rx="15" ry="6" fill="${boot}"/><ellipse cx="120" cy="351" rx="15" ry="6" fill="${boot}"/>`;break;
   case'armor':lower=`<rect x="58" y="230" width="34" height="100" rx="10" fill="url(#${u}st)"/><rect x="108" y="230" width="34" height="100" rx="10" fill="url(#${u}st)"/><ellipse cx="75" cy="282" rx="12" ry="9" fill="${RL_STEEL[1]}" stroke="${RL_STEEL[2]}" stroke-width="2"/><ellipse cx="125" cy="282" rx="12" ry="9" fill="${RL_STEEL[1]}" stroke="${RL_STEEL[2]}" stroke-width="2"/><path d="M52 204 H148 L156 262 Q128 270 100 262 Q72 270 44 262Z" fill="${c1}"/><path d="M52 204 H148 L156 262 Q128 270 100 262 Q72 270 44 262Z" fill="url(#${u}sh)"/><rect x="50" y="204" width="100" height="14" rx="3" fill="url(#${u}st)"/><rect x="92" y="204" width="16" height="14" fill="${c3}"/><path d="M56 330 L94 330 L96 348 L52 348Z M106 330 L144 330 L148 348 L104 348Z" fill="${RL_STEEL[2]}"/>`;break;
   case'cloak':lower=`${leg(78)}${leg(122)}<path d="M54 204 H146 L150 250 Q100 258 50 250Z" fill="${c2}"/><path d="M54 204 H146 L150 250 Q100 258 50 250Z" fill="#000" opacity=".35"/><path d="M22 196 Q16 290 38 340 L66 330 L62 210Z" fill="${c1}"/><path d="M178 196 Q184 290 162 340 L134 330 L138 210Z" fill="${c1}"/><path d="M30 230 Q30 290 46 330 M170 230 Q170 290 154 330" stroke="${dk}" stroke-width="3" fill="none" opacity=".6"/>`;break;
   case'coat':lower=`${leg(80)}${leg(120)}<path d="M50 204 H97 L92 326 L38 316Z" fill="${c1}"/><path d="M103 204 H150 L162 316 L108 326Z" fill="${c1}"/><path d="M50 204 H97 L92 326 L38 316Z M103 204 H150 L162 316 L108 326Z" fill="url(#${u}sh)"/><rect x="50" y="204" width="100" height="12" rx="3" fill="${c3}"/><path d="M92 214 L92 326 M108 214 L108 326" stroke="${c2}" stroke-width="4"/>`;break;
   default:lower=`${leg(80)}${leg(120)}<path d="M50 204 H150 L156 266 Q100 278 44 266Z" fill="${c1}"/><path d="M50 204 H150 L156 266 Q100 278 44 266Z" fill="url(#${u}sh)"/><rect x="50" y="206" width="100" height="12" rx="3" fill="${h.o==='vest'?c3:c2}"/><rect x="93" y="204" width="14" height="16" rx="2" fill="${c3}" stroke="${dk}"/><path d="M48 258 Q100 272 152 258" stroke="${c2}" stroke-width="5" fill="none"/>`;
  }
  const sleeve=h.o==='armor'?`url(#${u}st)`:c1,sw=h.o==='robe'?32:25;
  const arm=(x0,x1)=>`<path d="M${x0} 192 Q${(x0+x1)/2+(x1<100?-6:6)} 244 ${x1} 288" stroke="${sleeve}" stroke-width="${sw}" stroke-linecap="round" fill="none"/><path d="M${x0} 192 Q${(x0+x1)/2+(x1<100?-6:6)} 244 ${x1} 288" stroke="#000" stroke-opacity=".18" stroke-width="${sw}" stroke-linecap="round" fill="none" transform="translate(${x1<100?3:-3} 0)" style="mix-blend-mode:multiply"/>${h.o==='armor'?`<circle cx="${x0}" cy="194" r="16" fill="url(#${u}st)" stroke="${c2}" stroke-width="3"/>`:''}`;
  const hand=(x,y)=>`<circle cx="${x}" cy="${y}" r="10.5" fill="${skin}" stroke="#1b1416" stroke-width="1.5"/><path d="M${x-6} ${y-2} H${x+6} M${x-6} ${y+2.5} H${x+6}" stroke="${shade(skin,-.35)}" stroke-width="1.1"/>`;
  const it=h.it,HX=168,HY=296;let item='',left=hand(32,296);
  switch(it){
   case'staff':item=`<path d="M176 354 L158 132" stroke="#5a3a1e" stroke-width="8" stroke-linecap="round"/><path d="M174 350 L157 136" stroke="#9a6a3a" stroke-width="2.5" stroke-linecap="round"/><path d="M146 134 Q158 104 170 134 Q158 124 146 134Z" fill="#5a3a1e"/><circle class="rl-glow" cx="158" cy="114" r="14" fill="${E.c}" filter="url(#${u}gw)"/><circle cx="154" cy="110" r="5" fill="#fff" opacity=".85"/>`;break;
   case'orb':item=`<g class="rl-float"><circle cx="${HX+4}" cy="252" r="20" fill="url(#${u}ob)" filter="url(#${u}gw)"/><ellipse class="rl-spin" cx="${HX+4}" cy="252" rx="30" ry="9" fill="none" stroke="${E.l}" stroke-width="1.8" opacity=".8" style="transform-origin:${HX+4}px 252px"/></g>`;break;
   case'book':item=`<g class="rl-float"><path d="M146 246 L174 252 L174 282 L146 276Z" fill="#f4efe7" stroke="${E.d}" stroke-width="2"/><path d="M200 246 L174 252 L174 282 L200 276Z" fill="#ece4d6" stroke="${E.d}" stroke-width="2"/><path d="M152 256 L168 259 M152 262 L168 265 M180 259 L194 256 M180 265 L194 262" stroke="${E.c}" stroke-width="1.6"/><circle cx="174" cy="240" r="12" fill="${E.c}" opacity=".35" filter="url(#${u}gw)"/></g>`;break;
   case'shield':left=`<path d="M10 236 L58 236 L58 272 Q58 300 34 316 Q10 300 10 272Z" fill="${E.d}" stroke="${RL_STEEL[1]}" stroke-width="4"/><path d="M16 242 L52 242 L52 272 Q52 294 34 308 Q16 294 16 272Z" fill="${E.c}" opacity=".85"/><g transform="translate(34 272)">${rlGlyph(h.el,'#fff',1.2)}</g><path d="M18 244 L26 244" stroke="#fff" stroke-opacity=".5" stroke-width="3" stroke-linecap="round"/>`;break;
   case'lantern':item=`<path d="M${HX} 300 L${HX} 318" stroke="#3a3545" stroke-width="2.5"/><g class="rl-float"><circle cx="${HX}" cy="336" r="24" fill="${E.c}" opacity=".25" filter="url(#${u}gw)"/><path d="M${HX-12} 318 L${HX+12} 318 L${HX+16} 326 L${HX-16} 326Z" fill="#3a3545"/><rect x="${HX-13}" y="326" width="26" height="24" rx="3" fill="${E.l}" stroke="#3a3545" stroke-width="3"/><circle class="rl-glow" cx="${HX}" cy="338" r="6" fill="#fff"/></g>`;break;
   case'lute':item=`<path d="M112 296 L186 214" stroke="#5a3a1e" stroke-width="7" stroke-linecap="round"/><ellipse cx="108" cy="300" rx="22" ry="28" transform="rotate(42 108 300)" fill="#b5762f" stroke="#5a3a1e" stroke-width="3"/><circle cx="110" cy="298" r="6" fill="#3a2412"/>`;break;
   case'quill':item=`<path d="M160 340 L190 150" stroke="#3a3545" stroke-width="2"/><path d="M190 150 Q206 196 172 262 Q166 278 160 290 Q164 240 176 204 Q182 176 190 150Z" fill="${E.c}"/><path d="M190 150 Q170 196 164 240 Q162 262 160 290 Q158 250 164 218 Q172 182 190 150Z" fill="${E.l}" opacity=".8"/>`;break;
   case'banner':item=`<path d="M174 354 L174 110" stroke="#5a3a1e" stroke-width="6" stroke-linecap="round"/><circle cx="174" cy="106" r="6" fill="#e0b100"/><path class="rl-wave" d="M176 116 Q192 122 200 116 L200 170 Q190 176 176 170Z" fill="${E.c}" stroke="${E.d}" stroke-width="2"/>`;break;
  }
  const svg=`<svg class="rl-body" viewBox="0 0 200 360" role="img" aria-label="${esc(h.n)}">${defs}${lower}${arm(40,32)}${arm(160,HX)}${av}${it==='lute'?'':item}${left}${hand(HX,HY)}${it==='lute'?item:''}</svg>`;
  RL_BODY[id]=svg;return svg;
}

/* ---------- battlefield backdrops (1600 × 900) ---------- */
function rlStageBG(kind){
  const r=rlSeed('bg'+kind);let s='';
  const sky=(a,b)=>`<defs><linearGradient id="bgsky${kind}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="1600" height="900" fill="url(#bgsky${kind})"/>`;
  const ground=(a,b,y)=>`<defs><linearGradient id="bggr${kind}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><path d="M0 ${y} Q400 ${y-20} 800 ${y} T1600 ${y} V900 H0Z" fill="url(#bggr${kind})"/>`;
  const hills=(col,y,amp,seg)=>{let d=`M0 900 L0 ${y}`;for(let i=0;i<=seg;i++){const x=i*1600/seg;d+=` Q${x-800/seg} ${y-amp*(.5+r())} ${x} ${y-amp*.2*r()}`}return`<path d="${d} L1600 900Z" fill="${col}"/>`};
  switch(kind){
   case'wind':s=sky('#5fb3ff','#dff3ff')+`<circle cx="1260" cy="170" r="70" fill="#fff8d6" opacity=".9"/>`+[0,1,2,3].map(i=>`<ellipse cx="${200+i*380+r()*80}" cy="${120+r()*90}" rx="${90+r()*60}" ry="${22+r()*12}" fill="#fff" opacity=".8"/>`).join('')+hills('#8fc48a',470,120,5)+hills('#5fa35f',540,90,7)+Array.from({length:14},()=>{const x=r()*1600,y=505+r()*40,k=.7+r()*.6;return`<g transform="translate(${x} ${y}) scale(${k})"><rect x="-5" y="0" width="10" height="34" fill="#5a3a1e"/><circle cx="0" cy="-12" r="30" fill="#3f8a4a"/><circle cx="-18" cy="2" r="20" fill="#357a40"/><circle cx="16" cy="-24" r="16" fill="#5aa65a"/></g>`}).join('')+ground('#6fbf5f','#2f6b3a',600)+Array.from({length:60},()=>`<path d="M${r()*1600} ${640+r()*250} l4 -14 l4 14" stroke="#9fdc8a" stroke-width="3" fill="none" opacity=".6"/>`).join('');break;
   case'fire':s=sky('#1c0a10','#b3401f')+`<circle cx="1180" cy="250" r="90" fill="#ff8a3d" opacity=".35"/>`+hills('#3a1410',500,220,4)+`<path d="M520 520 L700 220 L760 250 L940 520Z" fill="#2a0e0a"/><path d="M700 220 L760 250 L730 300 L690 280Z" fill="#ff6a3d"/><path d="M725 230 Q740 140 700 60" stroke="#6b5a5a" stroke-width="40" fill="none" opacity=".4" stroke-linecap="round"/>`+hills('#2a0e0a',580,80,6)+ground('#4a2018','#1c0a08',610)+Array.from({length:12},()=>{const x=r()*1600,y=660+r()*220;return`<path d="M${x} ${y} l${30+r()*50} ${r()*20-10} l${20+r()*30} ${r()*20}" stroke="#ff6a3d" stroke-width="${3+r()*3}" fill="none" opacity=".75"/>`}).join('');break;
   case'water':s=sky('#1a6aa8','#a8e4ff')+`<circle cx="320" cy="180" r="60" fill="#fffbe0" opacity=".9"/><rect x="0" y="430" width="1600" height="160" fill="#2a7fc4"/>`+Array.from({length:18},()=>`<path d="M${r()*1600} ${450+r()*120} q20 -10 40 0 t40 0" stroke="#bfe9ff" stroke-width="3" fill="none" opacity=".6"/>`).join('')+`<path d="M1200 440 L1260 360 L1310 440Z" fill="#3a5a7a"/><path d="M1380 440 L1420 390 L1450 440Z" fill="#3a5a7a"/>`+ground('#e8d39a','#a88a52',590)+`<path d="M0 595 Q400 575 800 595 T1600 590" stroke="#fff" stroke-width="6" fill="none" opacity=".6"/>`+Array.from({length:10},()=>`<ellipse cx="${r()*1600}" cy="${680+r()*200}" rx="${20+r()*30}" ry="${8+r()*6}" fill="#8a6a3a" opacity=".5"/>`).join('');break;
   case'light':s=sky('#ffd98a','#fffaf0')+`<circle cx="800" cy="200" r="130" fill="#fff" opacity=".7"/>`+Array.from({length:9},(_,i)=>{const x=100+i*180+r()*60,h=200+r()*220;return`<path d="M${x} 560 L${x+28} ${560-h} L${x+56} 560Z" fill="#fff6c9" opacity=".85"/><path d="M${x+28} ${560-h} L${x+56} 560 L${x+30} 560Z" fill="#ffd96a" opacity=".7"/>`}).join('')+ground('#f8f3ea','#cfc2a8',580)+Array.from({length:8},(_,i)=>`<path d="M${i*230-100} 900 L${400+i*100} 580" stroke="#e0b100" stroke-width="2" opacity=".35"/>`).join('');break;
   case'dark':s=sky('#0d0718','#3a1f6b')+`<circle cx="1250" cy="170" r="70" fill="#e8e0ff"/><circle cx="1225" cy="155" r="64" fill="#1a0f30"/>`+Array.from({length:40},()=>`<circle cx="${r()*1600}" cy="${r()*380}" r="${1+r()*1.6}" fill="#fff" opacity="${.4+r()*.5}"/>`).join('')+hills('#1c1030',520,120,5)+Array.from({length:9},()=>{const x=r()*1600,y=560+r()*30,k=.8+r()*.7;return`<g transform="translate(${x} ${y}) scale(${k})" stroke="#0d0718" stroke-width="7" fill="none" stroke-linecap="round"><path d="M0 0 L0 -90 M0 -50 L-30 -80 M0 -66 L26 -100 M-30 -80 L-44 -76"/></g>`}).join('')+ground('#2a1a44','#0d0718',600)+Array.from({length:6},()=>`<ellipse cx="${r()*1600}" cy="${640+r()*200}" rx="${200+r()*160}" ry="${24+r()*16}" fill="#b9a6e6" opacity=".09"/>`).join('');break;
   case'arena':s=sky('#2a1a3a','#c4602a')+Array.from({length:14},(_,i)=>`<path d="M${i*120-20} 520 V${360+(i%2)*10} Q${i*120+40} ${320+(i%2)*10} ${i*120+100} ${360+(i%2)*10} V520" fill="#5a3a2a" stroke="#3a2418" stroke-width="6"/>`).join('')+`<rect x="0" y="500" width="1600" height="30" fill="#3a2418"/>`+Array.from({length:40},()=>`<circle cx="${r()*1600}" cy="${380+r()*110}" r="7" fill="${rlRand(['#ffd60a','#4aa8ff','#ff4d6d','#38d39f','#b970ff'])}" opacity=".55"/>`).join('')+ground('#d9b98a','#8a6a3a',590)+`<ellipse cx="800" cy="740" rx="620" ry="120" fill="none" stroke="#fff" stroke-width="6" opacity=".35"/>`;break;
   case'archive':s=`<rect width="1600" height="900" fill="#2a1f18"/>`+Array.from({length:8},(_,i)=>`<rect x="${i*210}" y="80" width="180" height="480" fill="#3a2a1e" stroke="#1c140e" stroke-width="8"/>${Array.from({length:6},(_,j)=>`<rect x="${i*210+10}" y="${100+j*76}" width="160" height="8" fill="#1c140e"/>${Array.from({length:9},(_,k)=>`<rect x="${i*210+14+k*17}" y="${100+j*76-58+((k*7+j)%3)*4}" width="14" height="${54-((k*7+j)%3)*4}" fill="${['#8a3a3a','#3a5a8a','#5a7a3a','#8a7a3a','#5a3a7a'][(i+j+k)%5]}"/>`).join('')}`).join('')}`).join('')+`<rect x="0" y="0" width="1600" height="900" fill="#000" opacity=".25"/>`+ground('#6b4a2e','#2a1a10',590)+Array.from({length:9},(_,i)=>`<path d="M${i*200} 590 L${i*200-120} 900" stroke="#1c140e" stroke-width="4" opacity=".6"/>`).join('');break;
  }
  return`<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true">${s}</svg>`;
}
function rlStageKind(ctx){if(ctx.arenaVs)return'arena';if(ctx.kind==='tower'||(ctx.node&&ctx.node[0]==='a'))return'archive';return ctx.el||'wind'}

/* ---------- effects engine (canvas) ---------- */
const RL_VP={fire:['#fff3c4','#ffb03d','#ff5a1f','#c4251a'],water:['#ffffff','#bfe9ff','#5fb8ff','#1f6fd1'],wind:['#ffffff','#d9ffd6','#7be08a','#2fa35a'],light:['#ffffff','#fffbe0','#ffe27a','#ffc61a'],dark:['#f0e0ff','#c9a6ff','#8a4dff','#3a1a7a']};
const VFX={cv:null,c:null,parts:[],items:[],raf:0,W:0,H:0,kind:'',amb:0,last:0};
function vfxInit(kind){const cv=document.getElementById('rlb-vfx');if(!cv)return;VFX.cv=cv;VFX.c=cv.getContext('2d');VFX.kind=kind;vfxSize();if(!VFX.raf){VFX.last=performance.now();VFX.raf=requestAnimationFrame(vfxLoop)}}
function vfxSize(){const cv=VFX.cv;if(!cv)return;const r=cv.getBoundingClientRect(),d=Math.min(2,window.devicePixelRatio||1);VFX.W=r.width;VFX.H=r.height;if(cv.width!==Math.round(r.width*d)){cv.width=Math.round(r.width*d);cv.height=Math.round(r.height*d)}VFX.c.setTransform(d,0,0,d,0,0)}
const vR=(a,b)=>a+Math.random()*(b-a);
function vfxP(o){VFX.parts.push(Object.assign({vx:0,vy:0,ax:0,ay:0,drag:1,life:.6,s:4,c:'#fff',shape:'c',rot:0,vr:0,glow:true,grow:0},o,{max:o.life||.6}));}
// If the battle screen re-renders mid-cast (e.g. a points update), finish any pending effects so the turn never stalls.
function vfxFlush(){const d=document.createElement('canvas').getContext('2d');for(let k=0;k<4;k++)for(const it of VFX.items){if(it.done)continue;try{d.save();it.step(5,d)}catch(e){it.done=true}finally{d.restore()}}VFX.items=[]}
setInterval(()=>{if(VFX.items.length&&!VFX.raf){VFX.last=performance.now();VFX.raf=requestAnimationFrame(vfxLoop)}},200);
function vfxLoop(now){
  if(!VFX.cv||!VFX.cv.isConnected){const n=document.getElementById('rlb-vfx');
    if(n){VFX.cv=n;VFX.c=n.getContext('2d');vfxSize()}
    else{vfxFlush();VFX.raf=0;VFX.parts=[];return}}
  const dt=Math.min(.05,(now-VFX.last)/1000);VFX.last=now;const c=VFX.c,W=VFX.W,H=VFX.H;
  if(W<2){vfxSize()}
  c.clearRect(0,0,W,H);
  // ambient
  VFX.amb+=dt;const k=VFX.kind,amb={wind:[.12,()=>vfxP({x:-10,y:vR(0,H*.7),vx:vR(40,90),vy:vR(-5,15),life:vR(5,9),s:vR(4,7),c:rlRand(['#7be08a','#b5f5c4','#d9c46a']),shape:'leaf',vr:vR(-3,3),glow:false})],fire:[.06,()=>vfxP({x:vR(0,W),y:H+5,vx:vR(-10,10),vy:vR(-60,-30),life:vR(2.5,5),s:vR(1.5,3.5),c:rlRand(['#ffb03d','#ff6a3d','#ffd27a'])})],water:[.15,()=>vfxP({x:vR(0,W),y:H+5,vx:vR(-6,6),vy:vR(-40,-20),life:vR(3,6),s:vR(2,5),c:'#bfe9ff',shape:'ring',glow:false})],light:[.1,()=>vfxP({x:vR(0,W),y:vR(0,H*.8),vy:vR(-8,-2),life:vR(2,4),s:vR(1.5,3),c:'#fff6c9',shape:'star'})],dark:[.12,()=>vfxP({x:vR(0,W),y:vR(H*.3,H),vx:vR(-6,6),vy:vR(-14,-4),life:vR(3,6),s:vR(2,4),c:'#c9a6ff'})],arena:[.2,()=>vfxP({x:vR(0,W),y:-5,vx:vR(-15,15),vy:vR(40,80),life:vR(3,5),s:vR(3,5),c:rlRand(['#ffd60a','#4aa8ff','#ff4d6d','#38d39f']),shape:'sq',vr:vR(-6,6),glow:false})],archive:[.18,()=>vfxP({x:vR(0,W),y:vR(0,H*.6),vx:vR(-4,4),vy:vR(2,8),life:vR(4,7),s:vR(1,2.4),c:'#f1e2b0'})]}[k];
  if(amb&&!STILL&&VFX.amb>amb[0]){VFX.amb=0;amb[1]()}
  for(const it of VFX.items){try{c.save();it.step(dt,c)}catch(e){it.done=true;if(it.res)it.res()}finally{c.restore()}}VFX.items=VFX.items.filter(i=>!i.done);
  c.globalCompositeOperation='lighter';
  for(const p of VFX.parts){p.life-=dt;p.vx=(p.vx+p.ax*dt)*p.drag;p.vy=(p.vy+p.ay*dt)*p.drag;p.x+=p.vx*dt;p.y+=p.vy*dt;p.rot+=p.vr*dt;p.s+=p.grow*dt;
    const a=Math.max(0,Math.min(1,p.life/p.max*1.4));if(a<=0)continue;c.globalAlpha=a;c.globalCompositeOperation=p.glow?'lighter':'source-over';c.fillStyle=p.c;c.strokeStyle=p.c;
    if(p.shape==='c'){c.beginPath();c.arc(p.x,p.y,Math.max(.3,p.s),0,6.283);c.fill()}
    else if(p.shape==='sq'){c.save();c.translate(p.x,p.y);c.rotate(p.rot);c.fillRect(-p.s/2,-p.s/2,p.s,p.s*.6);c.restore()}
    else if(p.shape==='leaf'){c.save();c.translate(p.x,p.y);c.rotate(p.rot);c.beginPath();c.ellipse(0,0,p.s,p.s*.45,0,0,6.283);c.fill();c.restore()}
    else if(p.shape==='ring'){c.lineWidth=Math.max(1,p.s*.25);c.beginPath();c.arc(p.x,p.y,p.s,0,6.283);c.stroke()}
    else if(p.shape==='star'){c.save();c.translate(p.x,p.y);c.rotate(p.rot);c.beginPath();for(let i=0;i<8;i++){const r=i%2?p.s*.35:p.s;c.lineTo(Math.cos(i*Math.PI/4)*r,Math.sin(i*Math.PI/4)*r)}c.fill();c.restore()}
    else if(p.shape==='dia'){c.save();c.translate(p.x,p.y);c.rotate(p.rot);c.beginPath();c.moveTo(p.s,0);c.lineTo(0,p.s*.38);c.lineTo(-p.s,0);c.lineTo(0,-p.s*.38);c.closePath();c.fill();c.restore()}
    else if(p.shape==='plus'){c.fillRect(p.x-p.s,p.y-p.s*.3,p.s*2,p.s*.6);c.fillRect(p.x-p.s*.3,p.y-p.s,p.s*.6,p.s*2)}
    else if(p.shape==='shock'){c.lineWidth=Math.max(1,6*a);c.beginPath();c.arc(p.x,p.y,p.s,0,6.283);c.stroke()}
    else if(p.shape==='arrowU'||p.shape==='arrowD'){const d=p.shape==='arrowU'?-1:1;c.beginPath();c.moveTo(p.x,p.y+d*p.s);c.lineTo(p.x-p.s*.8,p.y);c.lineTo(p.x-p.s*.3,p.y);c.lineTo(p.x-p.s*.3,p.y-d*p.s);c.lineTo(p.x+p.s*.3,p.y-d*p.s);c.lineTo(p.x+p.s*.3,p.y);c.lineTo(p.x+p.s*.8,p.y);c.closePath();c.fill()}
  }
  c.globalAlpha=1;c.globalCompositeOperation='source-over';VFX.parts=VFX.parts.filter(p=>p.life>0);
  if(VFX.parts.length>900)VFX.parts.splice(0,VFX.parts.length-900);
  VFX.raf=requestAnimationFrame(vfxLoop);
}
const vSp=()=>Math.max(1,(rlUI().b||{}).speed||1);
function vfxBurst(x,y,el,n,pow){const P=RL_VP[el]||RL_VP.light;for(let i=0;i<n;i++){const a=Math.random()*6.283,v=vR(60,260)*(pow||1);vfxP({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,drag:.9,life:vR(.3,.7),s:vR(2,5)*(pow||1),c:rlRand(P)})}vfxP({x,y,life:.35,s:6,grow:220*(pow||1),c:P[1],shape:'shock'})}
function vfxCharge(x,y,el,dur){const P=RL_VP[el],t=dur||.35;for(let i=0;i<26;i++){const a=Math.random()*6.283,r=vR(40,80);vfxP({x:x+Math.cos(a)*r,y:y+Math.sin(a)*r,vx:-Math.cos(a)*r/t,vy:-Math.sin(a)*r/t,life:t,s:vR(2,4),c:rlRand(P)})}vfxP({x,y,life:t+.1,s:10,grow:30,c:P[2]})}
function vfxShot(x0,y0,x1,y1,el,big){
  return new Promise(res=>{const P=RL_VP[el],dur=(big?.5:.36)/vSp(),arc=-Math.min(80,Math.abs(x1-x0)*.18);let t=0,rot=0;
    VFX.items.push({step(dt,c){t+=dt;const k=Math.min(1,t/dur),x=x0+(x1-x0)*k,y=y0+(y1-y0)*k+arc*Math.sin(k*Math.PI);rot+=dt*14;
      for(let i=0;i<(big?4:2);i++)vfxP({x:x+vR(-4,4),y:y+vR(-4,4),vx:vR(-30,30)-(x1-x0)*.3,vy:vR(-30,30)+(el==='fire'?-40:el==='dark'?-20:0),life:vR(.2,.45),s:vR(2,big?7:5),c:rlRand(P),shape:el==='wind'?'leaf':'c',vr:6});
      const R=big?18:11;c.save();c.globalCompositeOperation='lighter';const g=c.createRadialGradient(x,y,0,x,y,R*2.4);g.addColorStop(0,P[0]);g.addColorStop(.3,P[1]);g.addColorStop(.6,P[2]);g.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=g;c.beginPath();c.arc(x,y,R*2.4,0,6.283);c.fill();
      if(el==='wind'){c.strokeStyle=P[0];c.lineWidth=3;c.beginPath();c.arc(x,y,R,rot,rot+4);c.stroke()}
      if(el==='light'){c.fillStyle='#fff';c.save();c.translate(x,y);c.rotate(rot);for(let i=0;i<4;i++){c.rotate(Math.PI/2);c.fillRect(-1.5,0,3,R*1.6)}c.restore()}
      c.restore();if(k>=1){this.done=true;vfxBurst(x1,y1,el,big?34:18,big?1.4:1);res()}}})});
}
function vfxAoe(el,pts){
  const P=RL_VP[el],sp=vSp();
  if(el==='fire')return Promise.all(pts.map((q,i)=>new Promise(r=>setTimeout(()=>vfxShot(q.x+220,-40,q.x,q.y,'fire',true).then(r),i*110/sp))));
  if(el==='light'){pts.forEach(q=>{let t=0;VFX.items.push({step(dt,c){t+=dt*sp;const a=t<.15?t/.15:Math.max(0,1-(t-.15)/.45);c.save();c.globalCompositeOperation='lighter';const g=c.createLinearGradient(q.x-30,0,q.x+30,0);g.addColorStop(0,'rgba(255,240,180,0)');g.addColorStop(.5,`rgba(255,255,230,${.9*a})`);g.addColorStop(1,'rgba(255,240,180,0)');c.fillStyle=g;c.fillRect(q.x-30,0,60,q.y+10);c.restore();if(t>.6)this.done=true}});vfxBurst(q.x,q.y,'light',16,1.1);for(let i=0;i<10;i++)vfxP({x:q.x+vR(-20,20),y:q.y,vy:vR(-260,-120),life:.6,s:vR(2,4),c:rlRand(P),shape:'star',vr:4})});return new Promise(r=>setTimeout(r,520/sp))}
  if(el==='dark'){pts.forEach(q=>{for(let i=0;i<34;i++)vfxP({x:q.x+vR(-30,30),y:q.y+30,vx:vR(-30,30),vy:vR(-320,-120),drag:.94,life:vR(.4,.8),s:vR(3,8),c:rlRand(P)});vfxBurst(q.x,q.y,'dark',14,1)});return new Promise(r=>setTimeout(r,480/sp))}
  if(el==='water'){const minX=Math.min(...pts.map(q=>q.x))-120,maxX=Math.max(...pts.map(q=>q.x))+80,y=Math.max(...pts.map(q=>q.y));let t=0;
    return new Promise(res=>{VFX.items.push({step(dt,c){t+=dt*sp;const k=Math.min(1,t/.6),x=minX+(maxX-minX)*k;for(let i=0;i<10;i++)vfxP({x:x+vR(-20,20),y:y+40-vR(0,150)*Math.sin(Math.min(1,k*1.2)*Math.PI),vx:vR(80,200),vy:vR(-120,40),ay:400,life:vR(.3,.6),s:vR(3,7),c:rlRand(P)});if(k>=1){this.done=true;pts.forEach(q=>vfxBurst(q.x,q.y,'water',14,1));res()}}})})}
  // wind: a tornado sweeps through the targets
  const cx=pts.reduce((a,q)=>a+q.x,0)/pts.length,cy=pts.reduce((a,q)=>a+q.y,0)/pts.length;let t=0;
  return new Promise(res=>{VFX.items.push({step(dt,c){t+=dt*sp;for(let i=0;i<8;i++){const a=t*14+i*.8,h=vR(0,1);vfxP({x:cx+Math.cos(a)*(20+h*70),y:cy+60-h*220,vx:-Math.sin(a)*120,vy:-30,life:.3,s:vR(2,4),c:rlRand(P),shape:i%2?'leaf':'c',vr:8})}if(t>.65){this.done=true;pts.forEach(q=>vfxBurst(q.x,q.y,'wind',12,1));res()}}})});
}
function vfxHeal(x,y){for(let i=0;i<16;i++)vfxP({x:x+vR(-30,30),y:y+vR(0,40),vy:vR(-120,-50),life:vR(.6,1),s:vR(3,6),c:rlRand(['#5ef0b0','#b5ffd9','#fff']),shape:i%3?'c':'plus'})}
function vfxAura(x,y,col,up){for(let i=0;i<10;i++)vfxP({x:x+vR(-34,34),y:y+(up?vR(10,60):vR(-80,-30)),vy:up?vR(-130,-70):vR(50,110),life:vR(.5,.8),s:vR(5,8),c:col,shape:up?'arrowU':'arrowD',glow:true})}

/* ---------- stage layout ---------- */
const RL_FORM={a:[[37,89],[31,61],[19,92],[13,64]],e:[[63,89],[69,61],[81,92],[87,64]],boss:[[79,88],[61,62],[60,93],[90,60]]};
function rlUnitPos(B,u){const side=B.side[u.side],i=side.indexOf(u);if(u.side===0)return RL_FORM.a[i]||[25,75];const hasBoss=side.some(x=>x.boss);if(hasBoss){const order=[side.find(x=>x.boss),...side.filter(x=>!x.boss)];return RL_FORM.boss[order.indexOf(u)]||[70,75]}return RL_FORM.e[i]||[75,75]}
function rlbUnitEl(B,u,enter){const[x,y]=rlUnitPos(B,u),sc=(.8+(y-55)*.011)*(u.boss?1.5:u.elite?1.15:1),hero=u.kind==='hero';
  const spr=hero?rlHeroBody(u.id):rlMonSVG(u.id,u.el,u.boss,{stage:true});
  return`<div class="rlb-u ${u.side?'e':'a'}${hero?' hero':' mon'}${u.boss?' rlboss':''}${enter?' enter':''}" id="rlu-${u.uid}" data-a="rlbTarget" data-v="${u.uid}" style="left:${x}%;top:${y}%;--s:${sc.toFixed(3)};z-index:${Math.round(y)};--d:-${(Math.random()*3).toFixed(2)}s"><div class="rlb-ring"></div><div class="rlb-shadow"></div><div class="rlb-spr live">${spr}</div><div class="rlb-tag"><div class="rlb-nm">${rlElChip(u.el)}<b>${esc(u.name)}</b><span class="num">${u.lv}</span></div><div class="rlb-hp"><i class="hp"></i><i class="sh"></i><span class="num"></span></div><div class="rlb-chips"></div></div></div>`}

/* ---------- replacements for the card display ---------- */
function rlBattleShell(s,p){const R=rlUI(),b=R.b,kind=rlStageKind(b.ctx);
  return`<div class="rlb" id="rlb"><div class="rlb-top"><div><b>${esc(b.ctx.title)}</b><span class="muted" id="rlb-wave"></span></div><div class="row"><div class="seg" role="group" aria-label="Speed">${[1,2,3].map(v=>`<button data-a="rlbSpeed" data-v="${v}" aria-pressed="${b.speed===v}">${v}×</button>`).join('')}</div>${rlCfg().auto&&!b.ctx.arenaVs?`<button class="btn sm${b.auto?' pri':''}" data-a="rlbAuto">Auto ${b.auto?'on':'off'}</button>`:''}<button class="btn sm" data-a="rlbQuit">${b.res?'Leave':'Retreat'}</button></div></div>
   <div class="rlb-order" id="rlb-order"></div>
   <div class="rlb-stage k-${kind}" id="rlb-stage"><div class="rlb-cam" id="rlb-cam"><div class="rlb-bg">${rlStageBG(kind)}</div><div class="rlb-units" id="rlb-units"></div></div><canvas id="rlb-vfx" aria-hidden="true"></canvas><div class="rlb-dim" id="rlb-dim"></div><div class="rlb-floats" id="rlb-floats"></div></div>
   <div class="rlb-panel" id="rlb-panel"></div></div>`}
function rlbBuild(es){const b=rlUI().b,B=b.B,box=document.getElementById('rlb-units');if(!box)return;const enter=!b.built;b.built=true;
  box.innerHTML=B.all().map(u=>rlbUnitEl(B,u,es!=null?u.side===es:enter)).join('');vfxInit(rlStageKind(b.ctx));rlbSync()}
function rlbSync(){const b=rlUI().b;if(!b)return;const B=b.B;
  for(const u of B.all()){const el=document.getElementById('rlu-'+u.uid);if(!el)continue;
    const pend=!!(b.rezPend&&b.rezPend.has(u.uid));el.classList.toggle('dead',!u.alive||pend);el.classList.toggle('turn',b.actor===u.uid&&u.alive);el.classList.toggle('stunned',rlHas(u,'stun'));
    const hp=el.querySelector('.hp'),sh=el.querySelector('.sh'),tx=el.querySelector('.rlb-hp span'),fx=el.querySelector('.rlb-chips');
    hp.style.width=(u.hp/u.maxHp*100)+'%';hp.classList.toggle('low',u.hp/u.maxHp<.3);sh.style.width=Math.min(100,u.shield/u.maxHp*100)+'%';tx.textContent=u.alive?rlNum(u.hp):'';
    const counts={};u.fx.forEach(f=>counts[f.k]=(counts[f.k]||0)+1);
    fx.innerHTML=Object.keys(counts).map(k=>{const F=RL_FX[k],t=Math.max(...u.fx.filter(f=>f.k===k).map(f=>f.t));return`<span class="rl-fxc${F.buff?' b':''}" style="--fc:${F.c}" title="${F.n}: ${F.d} (${t} turn${t>1?'s':''})">${F.g}${counts[k]>1?'×'+counts[k]:''}<i>${t}</i></span>`}).join('')}
  const w=document.getElementById('rlb-wave');if(w)w.textContent=` · Wave ${B.wave+1} of ${B.waves.length}`;
  const o=document.getElementById('rlb-order');if(o){const live=B.all().filter(u=>u.alive).map(u=>({u,t:(100-u.atb)/rlEff(u,'spd')})).sort((a,c)=>a.t-c.t).slice(0,8);const key=live.map(x=>x.u.uid).join(',');
    if(o.dataset.k!==key){o.dataset.k=key;o.innerHTML=`<span class="muted">Next</span>`+live.map(x=>`<span class="rlb-oc ${x.u.side?'e':'a'}" title="${esc(x.u.name)}">${rlPort(x.u)}</span>`).join('')}}
}
function rlbPt(uid,where){const st=document.getElementById('rlb-stage'),el=document.getElementById('rlu-'+uid);if(!st||!el)return null;const S=st.getBoundingClientRect(),sp=el.querySelector('.rlb-spr').getBoundingClientRect();
  return{x:sp.left+sp.width/2-S.left,y:where==='head'?sp.top-S.top+sp.height*.12:where==='foot'?sp.bottom-S.top:sp.top+sp.height*.45-S.top,w:sp.width,h:sp.height}}
function rlbFloat(uid,text,cls){const box=document.getElementById('rlb-floats'),p=rlbPt(uid,'head');if(!box||!p)return;const f=document.createElement('span');f.className='rlb-float '+(cls||'');f.textContent=text;f.style.left=(p.x+vR(-18,18))+'px';f.style.top=(p.y+(cls==='name'?-24:0))+'px';box.appendChild(f);setTimeout(()=>f.remove(),1200)}
function rlbShake(big){const c=document.getElementById('rlb-cam');if(!c||STILL)return;c.classList.remove('shake','shake2');void c.offsetWidth;c.classList.add(big?'shake2':'shake')}
function rlbBanner(text,col){const box=document.getElementById('rlb-floats');if(!box)return;const w=document.createElement('div');w.className='rlb-ult';w.style.setProperty('--uc',col);w.innerHTML=`<span>${esc(text)}</span>`;box.appendChild(w);setTimeout(()=>w.remove(),1100)}
function rlbMelee(u,si){if(u.kind==='hero'){const A=typeof RL_ART!=='undefined'&&RL_ART[u.id];if(A&&A.meleeSk)return !!A.meleeSk[si||0];if(A&&A.melee)return true;return u.sk&&RL_H[u.id].role==='def'&&!(A&&A.spell)}return['wolf','treant','golem','crab','drake','papergolem','slime','owl'].includes(u.id)}
async function rlbPlay(ev){
  const b=rlUI().b,B=b.B;let lastEl='light';
  for(const e of ev){
    if(!rlUI().b)return;
    if(e.k==='act'){const u=B.find(e.u),s=u.sk[e.s],el=document.getElementById('rlu-'+e.u),spr=el&&el.querySelector('.rlb-spr');lastEl=u.el;b.actor=e.u;if(s.res){b.rezPend=new Set(e.t.filter(t=>{const x=document.getElementById('rlu-'+t);return x&&x.classList.contains('dead')}))}rlbSync();
      const foe=s.tg==='e1'||s.tg==='eA',ult=e.s===2,col=RL_EL[u.el].c,src=rlbPt(e.u);
      rlbFloat(e.u,s.n+(e.p<1?' · half power':''),'name');
      if(ult&&!STILL){const d=document.getElementById('rlb-dim');if(d){d.classList.remove('on');void d.offsetWidth;d.classList.add('on')}rlbBanner(s.n,col);await rlbDelay(380)}
      if(foe&&s.m>0&&rlbMelee(u,e.s)&&s.tg==='e1'&&spr){const tp=rlbPt(e.t[0]);if(tp&&src){spr.dataset.sk=e.s;spr.style.setProperty('--dx',(tp.x-src.x+(u.side?tp.w*.55:-tp.w*.55))+'px');spr.style.setProperty('--dy',(tp.y-src.y)*.6+'px');spr.classList.add('dash');await rlbDelay(230);if(!(typeof rlArtMelee==='function'&&rlArtMelee(u,tp,ult,e.s)))vfxBurst(tp.x,tp.y,u.el,22,1.2);rlbShake(false);setTimeout(()=>spr.classList.remove('dash'),120)}}
      else if(foe&&s.m>0){const AS=u.kind==='hero'&&typeof rlArtSpell==='function'?rlArtSpell(u):null;if(spr){spr.dataset.sk=e.s;spr.classList.remove('cast');void spr.offsetWidth;spr.classList.add('cast')}if(src&&!AS)vfxCharge(src.x,src.y,u.el,.28/b.speed);await rlbDelay(240+(u.kind==='hero'&&typeof rlArtLead==='function'?rlArtLead(u.id):0));
        if(AS)await rlArtFire(AS,e,s,ult);
        else if(s.tg==='eA'){const pts=e.t.map(t=>rlbPt(t)).filter(Boolean);await vfxAoe(u.el,pts)}
        else{const tp=rlbPt(e.t[0]);if(tp&&src){const n=Math.min(3,s.h||1);for(let i=0;i<n;i++){const p=vfxShot(src.x+(u.side?-20:20),src.y-10,tp.x,tp.y,u.el,ult);if(i===n-1)await p;else await rlbDelay(90)}}}}
      else{const AS=u.kind==='hero'&&typeof rlArtSpell==='function'?rlArtSpell(u):null,ASup=AS&&AS.support&&rlArtSupport;if(spr){spr.dataset.sk=e.s;spr.classList.remove('cast');void spr.offsetWidth;spr.classList.add('cast')}if(src&&!ASup)vfxCharge(src.x,src.y,u.el,.28/b.speed);await rlbDelay(260+(u.kind==='hero'&&typeof rlArtLead==='function'?rlArtLead(u.id):0));
        if(ASup)await rlArtSupport(AS,e,s);
        e.t.forEach(t=>{const tp=rlbPt(t);if(!tp)return;if(ASup){const te=document.getElementById('rlu-'+t);if(te){te.classList.add('blessed');setTimeout(()=>te.classList.remove('blessed'),650)}return}const heal=s.fx.some(f=>f[0]==='heal'||f[0]==='healT'||f[0]==='revive');if(heal)vfxHeal(tp.x,tp.y);else vfxAura(tp.x,tp.y,col,true);const te=document.getElementById('rlu-'+t);if(te){te.classList.add('blessed');setTimeout(()=>te.classList.remove('blessed'),650)}});await rlbDelay(260)}
      await rlbDelay(60)}
    else if(e.k==='hit'){const el=document.getElementById('rlu-'+e.u);if(el){el.classList.remove('hit');void el.offsetWidth;el.classList.add('hit')}
      if(e.dot){const p=rlbPt(e.u);if(p)vfxBurst(p.x,p.y,'fire',8,.6)}
      rlbFloat(e.u,(e.dot?'':'−')+rlNum(e.v)+(e.crit?'!':''),e.dot?'dot':e.crit?'crit':'dmg');if(e.crit)rlbShake(true);if(e.adv>0)rlbFloat(e.u,'Strong','adv');if(e.adv<0)rlbFloat(e.u,'Weak','weak');rlbSync();await rlbDelay(e.crit?230:150)}
    else if(e.k==='heal'){rlbFloat(e.u,'+'+rlNum(e.v),'heal');const p=rlbPt(e.u);if(p)vfxHeal(p.x,p.y);rlbSync();await rlbDelay(110)}
    else if(e.k==='fx'){const F=RL_FX[e.f],p=rlbPt(e.u);rlbFloat(e.u,F.n,F.buff?'buff':'debuff');if(p){if(e.f==='shield')vfxP({x:p.x,y:p.y,life:.5,s:p.w*.45,grow:20,c:'#9fd6ff',shape:'shock'});else vfxAura(p.x,p.y,F.c,!!F.buff)}rlbSync();await rlbDelay(150)}
    else if(e.k==='resist'){rlbFloat(e.u,'Resisted','muted');await rlbDelay(90)}
    else if(e.k==='die'){const u=B.find(e.u),p=rlbPt(e.u);if(u&&u.side===1)b.kills.push(u.el);if(p){vfxBurst(p.x,p.y,u?u.el:'dark',30,1.3);for(let i=0;i<20;i++)vfxP({x:p.x+vR(-p.w/3,p.w/3),y:p.y+vR(-p.h/3,p.h/3),vy:vR(-90,-30),life:vR(.6,1.1),s:vR(2,4),c:'#e8e0ff',glow:false})}rlbSync();await rlbDelay(320)}
    else if(e.k==='revive'){if(b.rezPend)b.rezPend.delete(e.u);const p=rlbPt(e.u);if(p){vfxAoe('light',[p])}rlbFloat(e.u,'Revived','heal');rlbSync();await rlbDelay(260)}
    else if(e.k==='atb'){rlbFloat(e.u,(e.v>0?'+':'')+e.v+'% turn',e.v>0?'buff':'debuff');rlbSync();await rlbDelay(90)}
    else if(e.k==='skip'){rlbFloat(e.u,'Stunned','debuff');await rlbDelay(340)}
    else if(e.k==='counter'){rlbFloat(e.u,'Counter!','buff');await rlbDelay(160)}
    else if(e.k==='again'){rlbFloat(e.u,'Again!','buff');await rlbDelay(160)}
    else if(e.k==='toxic'){rlbFloat(e.u,'☠'.repeat(Math.min(5,e.v))+' Toxic burst!','crit');const p=rlbPt(e.u);if(p){vfxP({x:p.x,y:p.y,life:.45,s:10,grow:240,c:'#b6e83a',shape:'shock'});for(let i=0;i<10*e.v;i++){const a=Math.random()*6.283,v=vR(60,220);vfxP({x:p.x,y:p.y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-60,ay:200,life:vR(.4,.8),s:vR(3,7),c:rlRand(['#eaffb0','#b6e83a','#6aa020'])})}}await rlbDelay(200)}
    else if(e.k==='ptick'){const p=rlbPt(e.u);if(p)for(let i=0;i<6+e.v*3;i++)vfxP({x:p.x+vR(-p.w/3,p.w/3),y:p.y+vR(-p.h/4,p.h/4),vy:vR(-90,-30),life:vR(.4,.8),s:vR(3,6),c:rlRand(['#eaffb0','#b6e83a','#6aa020'])});await rlbDelay(60)}
    else if(e.k==='reborn'){rlbFloat(e.u,'Reborn!','heal');const p=rlbPt(e.u);if(p){vfxP({x:p.x,y:p.y,life:.6,s:12,grow:280,c:'#ffb347',shape:'shock'});for(let i=0;i<40;i++)vfxP({x:p.x+vR(-p.w/3,p.w/3),y:p.y+p.h*.4,vx:vR(-60,60),vy:vR(-380,-140),life:vR(.5,1),s:vR(3,7),c:rlRand(['#ffffff','#fff1c0','#ff9a2a','#c42a10'])})}rlbSync();await rlbDelay(420)}
    else if(e.k==='rift'){rlbFloat(e.u,'✧'.repeat(e.v)+' Rift!','crit');const p=rlbPt(e.u);if(p){vfxP({x:p.x,y:p.y,life:.4,s:10,grow:240,c:'#a98bff',shape:'shock'});for(let i=0;i<8*e.v;i++){const a=Math.random()*6.283,v=vR(80,240);vfxP({x:p.x,y:p.y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,drag:.9,life:vR(.4,.7),s:vR(3,6),c:rlRand(['#ffffff','#ece4ff','#a98bff']),shape:'star',vr:4})}}await rlbDelay(180)}
    else if(e.k==='zap'){rlbFloat(e.u,'Discharge!','crit');const p=rlbPt(e.u);if(p){vfxP({x:p.x,y:p.y,life:.4,s:10,grow:260,c:'#ffd23a',shape:'shock'});for(let i=0;i<5;i++){let x=p.x+vR(-20,20),y=p.y-p.h*.8;for(let j=0;j<7;j++){const nx=x+vR(-14,14),ny=y+p.h*.25;for(let k=0;k<4;k++)vfxP({x:x+(nx-x)*k/4,y:y+(ny-y)*k/4,life:.25,s:3,c:'#fff3b0'});x=nx;y=ny}}}rlbShake(true);await rlbDelay(200)}
    else if(e.k==='miss'){rlbFloat(e.u,'Miss!','muted');await rlbDelay(140)}
    else if(e.k==='doze'){rlbFloat(e.u,'Zzz… dozed off','debuff');await rlbDelay(340)}
    else if(e.k==='tempo'){rlbFloat(e.u,e.v?('♪'.repeat(e.v)+' Tempo '+e.v):'Crescendo!',e.v?'buff':'crit');await rlbDelay(e.v?120:220)}
    else if(e.k==='frozen'){rlbFloat(e.u,'Frozen!','crit');const p=rlbPt(e.u);if(p){vfxP({x:p.x,y:p.y,life:.5,s:10,grow:240,c:'#bfe4ff',shape:'shock'});for(let i=0;i<22;i++){const a=Math.random()*6.283,v=vR(60,200);vfxP({x:p.x,y:p.y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,drag:.9,life:vR(.4,.8),s:vR(3,6),c:rlRand(['#ffffff','#bfe4ff','#7cc4ff']),shape:'dia',vr:4})}}rlbShake(true);await rlbDelay(260)}
    else if(e.k==='guarded'){rlbFloat(e.g,'Guard!','buff');const a=rlbPt(e.u),g=rlbPt(e.g);if(a&&g){for(let i=0;i<14;i++){const k=i/14;vfxP({x:a.x+(g.x-a.x)*k,y:a.y+(g.y-a.y)*k-Math.sin(k*Math.PI)*40,vy:vR(-40,-10),life:vR(.3,.6),s:vR(2,4),c:rlRand(RL_VP.turtle||RL_VP.light)})}}await rlbDelay(120)}
    else if(e.k==='det'){rlbFloat(e.u,'Detonate!','crit');const p=rlbPt(e.u);if(p){vfxBurst(p.x,p.y,'fox',40,1.6);vfxP({x:p.x,y:p.y,life:.45,s:10,grow:320,c:'#ffb347',shape:'shock'})}rlbShake(true);await rlbDelay(260)}
    else if(e.k==='cleanse'||e.k==='strip'){rlbFloat(e.u,e.k==='cleanse'?'Cleansed':'Buffs removed',e.k==='cleanse'?'buff':'debuff');const p=rlbPt(e.u);if(p)vfxAura(p.x,p.y,e.k==='cleanse'?'#ffffff':'#ff4d6d',e.k==='cleanse');rlbSync();await rlbDelay(130)}
    else if(e.k==='wave'){await rlbDelay(520);const f=document.getElementById('rlb-floats');if(f){const w=document.createElement('div');w.className='rlb-banner';w.textContent=`Wave ${e.n+1}`;f.appendChild(w);setTimeout(()=>w.remove(),1300)}rlbBuild(1);await rlbDelay(800)}
    else if(e.k==='end'&&e.r==='win'){const st=document.getElementById('rlb-stage');if(st){const S=st.getBoundingClientRect();for(let i=0;i<70;i++)vfxP({x:vR(0,S.width),y:-10,vx:vR(-40,40),vy:vR(120,260),life:vR(1.4,2.4),s:vR(4,7),c:rlRand(['#ffd60a','#38d39f','#4aa8ff','#ff7eb6','#fff']),shape:'sq',vr:vR(-8,8),glow:false})}}
    else if(e.k==='fxgone')rlbSync();
  }
  rlbSync();
}
window.addEventListener('resize',()=>{if(VFX.cv)vfxSize()});

/* ---------- styles ---------- */
(function(){const st=document.createElement('style');st.textContent=`
.rlb-stage{position:relative;height:clamp(300px,48vw,540px);border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,.12);box-shadow:0 30px 60px -30px #000;background:#120f19;user-select:none}
.rlb-cam{position:absolute;inset:0;transform-origin:50% 70%}
.rlb-bg{position:absolute;inset:-3%}.rlb-bg svg{width:100%;height:100%;display:block}
.rlb-units{position:absolute;inset:0}
#rlb-vfx{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:150}
.rlb-floats{position:absolute;inset:0;pointer-events:none;z-index:200}
.rlb-dim{position:absolute;inset:0;background:radial-gradient(circle at 50% 60%,transparent 20%,rgba(0,0,0,.65));opacity:0;pointer-events:none;z-index:140}
.rlb-dim.on{animation:rlDim 1.3s ease-out}@keyframes rlDim{15%,60%{opacity:1}100%{opacity:0}}
.rlb-u{position:absolute;height:calc(31% * var(--s));aspect-ratio:200/360;transform:translate(-50%,-100%);cursor:default}
.rlb-u.mon{aspect-ratio:200/220;height:calc(25% * var(--s))}
.rlb-spr{position:absolute;inset:0;transition:transform .22s cubic-bezier(.3,.7,.3,1),filter .3s,opacity .5s}
.rlb-spr svg{width:100%;height:100%;display:block;overflow:visible}
.rlb-u.e .rlb-spr svg{transform:scaleX(-1)}
.rlb-u.hero.e .rlb-spr svg{transform:none}
.rlb-u.a .rlb-spr{animation:rlBreathe 2.6s ease-in-out infinite;animation-delay:var(--d)}
.rlb-u.mon .rlb-spr{animation:rlHover 2.2s ease-in-out infinite;animation-delay:var(--d)}
@keyframes rlBreathe{50%{transform:translateY(-1.5%) scaleY(1.01)}}
@keyframes rlHover{50%{transform:translateY(-3%)}}
.rlb-shadow{position:absolute;left:12%;right:12%;bottom:-3%;height:8%;border-radius:50%;background:radial-gradient(closest-side,rgba(0,0,0,.55),transparent)}
.rlb-ring{position:absolute;left:-6%;right:-6%;bottom:-6%;height:14%;border-radius:50%;border:3px solid transparent;opacity:0;transition:opacity .2s}
.rlb-u.turn .rlb-ring{opacity:1;border-color:#ffd60a;box-shadow:0 0 20px #ffd60a,inset 0 0 14px #ffd60a;animation:rlRing 1.2s ease-in-out infinite}
.rlb-u.targetable{cursor:pointer}.rlb-u.targetable .rlb-ring{opacity:1;border-color:#ff4d6d;box-shadow:0 0 18px #ff4d6d;animation:rlRing .9s ease-in-out infinite}
.rlb-u.targetable:hover .rlb-spr{filter:brightness(1.25) drop-shadow(0 0 10px #ff4d6d)}
@keyframes rlRing{50%{transform:scale(1.08)}}
.rlb-tag{position:absolute;left:50%;bottom:100%;transform:translate(-50%,-4px);width:max(110px,90%);display:flex;flex-direction:column;gap:2px;pointer-events:none}
.rlb-nm{opacity:0;transition:opacity .15s;display:flex;gap:4px;align-items:center;justify-content:center;font-size:12px;line-height:1;text-shadow:0 1px 3px #000;white-space:nowrap}.rlb-nm b{overflow:hidden;text-overflow:ellipsis;max-width:110px}.rlb-nm .rl-elc{width:15px;height:15px}.rlb-nm .rl-elc svg{width:10px;height:10px}.rlb-nm .num{opacity:.75}
.rlb-hp{position:relative;height:10px;background:#2a0d14;border-radius:5px;overflow:hidden;border:1px solid rgba(0,0,0,.7);box-shadow:0 2px 6px rgba(0,0,0,.5)}
.rlb-hp .hp{position:absolute;inset:0 auto 0 0;background:linear-gradient(180deg,#5ef0b0,#1f9d6a);transition:width .35s}.rlb-hp .hp.low{background:linear-gradient(180deg,#ff8a9a,#c42a44)}
.rlb-u.e .rlb-hp .hp{background:linear-gradient(180deg,#ff8a9a,#c42a44)}
.rlb-hp .sh{position:absolute;inset:0 auto 0 0;background:repeating-linear-gradient(45deg,rgba(159,214,255,.85) 0 4px,rgba(159,214,255,.5) 4px 8px);transition:width .35s}
.rlb-hp span{position:absolute;inset:0;display:grid;place-items:center;font-size:9px;font-weight:800;text-shadow:0 1px 2px #000;line-height:1}
.rlb-u.turn .rlb-nm,.rlb-u.targetable .rlb-nm,.rlb-u:hover .rlb-nm,.rlb-u.rlboss .rlb-nm{opacity:1}
.rlb-chips{display:flex;gap:2px;justify-content:center;flex-wrap:wrap;min-height:14px}.rlb-chips .rl-fxc{font-size:9px;line-height:11px;padding:0 3px}
.rlb-u.rlboss .rlb-tag{width:max(150px,70%)}.rlb-u.rlboss .rlb-hp{height:14px}
.rlb-u.enter.a .rlb-spr{animation:rlEnterL .7s cubic-bezier(.2,.8,.3,1) both}.rlb-u.enter.e .rlb-spr{animation:rlEnterR .7s cubic-bezier(.2,.8,.3,1) both}
@keyframes rlEnterL{from{transform:translateX(-160%);opacity:0}}@keyframes rlEnterR{from{transform:translateX(160%);opacity:0}}
.rlb-spr.dash{transform:translate(var(--dx),var(--dy)) scale(1.08)!important;animation:none!important;z-index:300}
.rlb-spr.cast{animation:rlCast .5s ease-out!important}@keyframes rlCast{30%{transform:translateY(-8%) scale(1.05);filter:brightness(1.4) drop-shadow(0 0 14px #fff)}}
.rlb-u.hit .rlb-spr{animation:rlHitB .32s!important}@keyframes rlHitB{20%{transform:translateX(var(--kb,-7%));filter:brightness(3) saturate(0)}60%{transform:translateX(calc(var(--kb,-7%) * -.4))}}
.rlb-u.e{--kb:7%}
.rlb-u.blessed .rlb-spr{filter:drop-shadow(0 0 14px #5ef0b0) brightness(1.15)}
.rlb-u.stunned .rlb-spr::after{content:"✦ ✦ ✦";position:absolute;left:0;right:0;top:-2%;text-align:center;color:#ffd60a;font-size:14px;letter-spacing:4px;animation:rlSpin 1.2s linear infinite;text-shadow:0 0 6px #ffd60a}
.rlb-u.dead .rlb-spr{opacity:0;transform:translateY(8%) scale(.9);filter:grayscale(1) brightness(.4);animation:none!important;transition:opacity .7s .1s,transform .7s,filter .4s}
.rlb-u.dead .rlb-tag,.rlb-u.dead .rlb-shadow{opacity:0;transition:opacity .4s}
.rlb-u.dead.targetable .rlb-spr{opacity:.45;filter:grayscale(1) brightness(.8)}.rlb-u.dead.targetable{cursor:pointer}
.rlb-cam.shake{animation:rlShake .3s}.rlb-cam.shake2{animation:rlShake2 .42s}
@keyframes rlShake{20%{transform:translate(-5px,3px)}40%{transform:translate(5px,-3px)}60%{transform:translate(-3px,2px)}80%{transform:translate(2px,-1px)}}
@keyframes rlShake2{10%{transform:translate(-9px,5px) scale(1.02)}30%{transform:translate(9px,-6px) scale(1.02)}50%{transform:translate(-7px,4px)}70%{transform:translate(5px,-2px)}90%{transform:translate(-2px,1px)}}
.rlb-float{position:absolute;transform:translateX(-50%);font-family:var(--display);font-size:24px;pointer-events:none;text-shadow:0 2px 0 #000,0 0 10px rgba(0,0,0,.8);animation:rlRise 1.1s ease-out forwards;white-space:nowrap}
.rlb-float.crit{color:#ffb800;font-size:34px}.rlb-float.dmg{color:#fff}.rlb-float.dot{color:#ff8a3d;font-size:18px}.rlb-float.heal{color:#5ef0b0}.rlb-float.buff{color:#7ab8ff;font-size:15px}.rlb-float.debuff{color:#ff7a8f;font-size:15px}.rlb-float.adv{color:#ffd60a;font-size:13px;margin-top:26px}.rlb-float.weak{color:#c9bfd6;font-size:13px;margin-top:26px}.rlb-float.muted{color:#c9bfd6;font-size:14px}.rlb-float.name{color:#ffd60a;font-size:14px;font-family:var(--body);font-weight:800;background:rgba(15,13,20,.75);padding:2px 8px;border-radius:6px;text-shadow:none;animation:rlRise 1.2s ease-out forwards}
@keyframes rlRise{0%{transform:translate(-50%,8px) scale(.7);opacity:0}15%{transform:translate(-50%,0) scale(1.12);opacity:1}100%{transform:translate(-50%,-40px);opacity:0}}
.rlb-ult{position:absolute;left:0;right:0;top:38%;display:grid;place-items:center;animation:rlUlt 1.1s cubic-bezier(.2,.8,.3,1) forwards}
.rlb-ult span{font-family:var(--display);font-size:clamp(28px,5vw,52px);letter-spacing:.06em;text-transform:uppercase;color:#fff;padding:6px 40px;background:linear-gradient(90deg,transparent,color-mix(in srgb,var(--uc) 70%,#000),transparent);text-shadow:0 0 20px var(--uc)}
@keyframes rlUlt{0%{transform:translateX(-40%) skewX(-12deg);opacity:0}20%{transform:none;opacity:1}75%{opacity:1}100%{transform:translateX(30%);opacity:0}}
.rlb-banner{position:absolute;inset:0;display:grid;place-items:center;font-family:var(--display);font-size:60px;color:#fff;text-shadow:0 0 30px #000,0 4px 0 #000;animation:rlBanner 1.3s ease-out forwards}
@media(max-width:700px){.rlb-stage{height:70vw;min-height:290px}.rlb-nm b{max-width:64px}.rlb-nm{font-size:10px}.rlb-tag{width:max(48px,105%)}.rlb-hp{height:7px}.rlb-hp span{display:none}.rlb-chips .rl-fxc i{display:none}.rlb-float{font-size:18px}.rlb-float.crit{font-size:24px}}
@media(prefers-reduced-motion:reduce){.rlb *{animation:none!important;transition:none!important}}
`;document.head.appendChild(st)})();
