"use strict";
/* ================================================================
   REALM SCENES: softer, painted-looking battle backgrounds drawn in
   code (atmosphere, light, depth). Kinds not listed keep the old art.
   ================================================================ */
(function(){
const old=rlStageBG;
const rng=seed=>{let s=seed;return()=>{s=(s*16807)%2147483647;return s/2147483647}};
const ridge=(r,y,amp,n,rough)=>{let d=`M-20 900 L-20 ${y}`;let px=-20;for(let i=1;i<=n;i++){const x=-20+i*1640/n,cy=y-amp*(.35+r()*.65);d+=` Q${(px+x)/2+(r()-.5)*40} ${cy} ${x} ${y-amp*rough*r()}`;px=x}return d+' L1620 900Z'};
// a painted tree: trunk, then a canopy of many small leaf clumps, shaded dark below and lit above
function tree(r,x,y,s,dark,mid,lit,id){let g=`<ellipse cx="${x}" cy="${y+4}" rx="${70*s}" ry="${10*s}" fill="#1f3518" opacity=".35"/><path d="M${x-7*s} ${y} Q${x-3*s} ${y-60*s} ${x-9*s} ${y-125*s} L${x-2*s} ${y-150*s} L${x+9*s} ${y-125*s} Q${x+4*s} ${y-60*s} ${x+8*s} ${y}Z" fill="#33271b"/><path d="M${x-2*s} ${y-90*s} L${x-30*s} ${y-140*s} M${x+2*s} ${y-100*s} L${x+34*s} ${y-150*s}" stroke="#33271b" stroke-width="${5*s}" stroke-linecap="round"/>`;
  const cl=[];for(let i=0;i<46;i++){const a=r()*6.283,d=Math.sqrt(r())*78*s;cl.push([x+Math.cos(a)*d*1.25,y-165*s+Math.sin(a)*d*.85,(14+r()*16)*s])}
  cl.sort((a,b)=>a[1]-b[1]);const top=y-235*s,bot=y-95*s;
  const col=by=>{const k=Math.min(1,Math.max(0,(by-top)/(bot-top)));return k<.35?'#7ea855':k<.6?'#5f8c45':k<.82?'#466f37':'#30532a'};
  g+=cl.slice().reverse().map(([bx,by,br])=>`<circle cx="${(bx+2*s).toFixed(1)}" cy="${(by+4*s).toFixed(1)}" r="${br.toFixed(1)}" fill="#26431f"/>`).join('');
  g+=cl.map(([bx,by,br])=>`<circle cx="${bx.toFixed(1)}" cy="${by.toFixed(1)}" r="${br.toFixed(1)}" fill="${col(by)}"/>`).join('');
  g+=cl.filter(c=>c[1]<y-170*s).map(([bx,by,br])=>`<path d="M${(bx-br*.5).toFixed(1)} ${(by-br*.2).toFixed(1)} q${(br*.5).toFixed(1)} ${(-br*.6).toFixed(1)} ${br.toFixed(1)} 0" stroke="${lit}" stroke-width="${(3*s).toFixed(1)}" fill="none" opacity=".55" stroke-linecap="round"/>`).join('');
  return g}
const peaks=(r,y,amp,n)=>{let d=`M-20 ${y+40}`;for(let i=0;i<=n;i++){const x=-20+i*1640/n;d+=` L${(x-820/n+(r()-.5)*30).toFixed(0)} ${(y-amp*(.45+r()*.55)).toFixed(0)} L${(x+(r()-.5)*20).toFixed(0)} ${(y-amp*.15*r()).toFixed(0)}`}return d+' L1620 900 L-20 900Z'};
const SC={
 wind(){const r=rng(41),id='scw';let s=`<defs>
  <linearGradient id="${id}sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fb2da"/><stop offset=".55" stop-color="#bcd6df"/><stop offset=".8" stop-color="#efe6c8"/></linearGradient>
  <radialGradient id="${id}sun" cx="1210" cy="170" r="520" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fffbe8"/><stop offset=".12" stop-color="#fff2c4" stop-opacity=".9"/><stop offset=".45" stop-color="#ffe7a8" stop-opacity=".25"/><stop offset="1" stop-color="#ffe7a8" stop-opacity="0"/></radialGradient>
  <linearGradient id="${id}ray" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff8dc" stop-opacity=".5"/><stop offset="1" stop-color="#fff8dc" stop-opacity="0"/></linearGradient>
  <radialGradient id="${id}cl"><stop offset="0" stop-color="#ffffff" stop-opacity=".95"/><stop offset=".6" stop-color="#f6f1e6" stop-opacity=".55"/><stop offset="1" stop-color="#f6f1e6" stop-opacity="0"/></radialGradient>
  <linearGradient id="${id}mt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8ea9bd"/><stop offset="1" stop-color="#b9cbcf"/></linearGradient>
  <linearGradient id="${id}h1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fae7a"/><stop offset="1" stop-color="#7d9d6c"/></linearGradient>
  <linearGradient id="${id}h2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7a9f5e"/><stop offset="1" stop-color="#5f864b"/></linearGradient>
  <linearGradient id="${id}gr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#86a85c"/><stop offset=".45" stop-color="#6b9148"/><stop offset="1" stop-color="#3f6532"/></linearGradient>
  <linearGradient id="${id}fog" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3ecd6" stop-opacity="0"/><stop offset=".5" stop-color="#f3ecd6" stop-opacity=".55"/><stop offset="1" stop-color="#f3ecd6" stop-opacity="0"/></linearGradient>
  <radialGradient id="${id}c" cx=".38" cy=".3" r=".75"><stop offset="0" stop-color="#7fa858"/><stop offset=".55" stop-color="#4c7a3e"/><stop offset="1" stop-color="#2c4f2c"/></radialGradient>
  <radialGradient id="${id}vig" cx=".5" cy=".55" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#1a2410" stop-opacity=".45"/></radialGradient>
  <filter id="${id}blur" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="8"/></filter>
  <filter id="${id}soft"><feGaussianBlur stdDeviation="2.2"/></filter>
  <filter id="${id}grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".9 .6" numOctaves="2" seed="5"/><feColorMatrix values="0 0 0 0 .2  0 0 0 0 .25  0 0 0 0 .1  0 0 0 .5 0"/></filter>
  <filter id="${id}patch" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".004 .012" numOctaves="3" seed="12"/><feColorMatrix values="0 0 0 0 .18  0 0 0 0 .32  0 0 0 0 .1  0 0 0 1.6 -.75"/></filter>
 </defs>`;
  s+=`<rect width="1600" height="900" fill="url(#${id}sky)"/><rect width="1600" height="900" fill="url(#${id}sun)"/>`;
  s+=`<g opacity=".55">${[-.5,-.28,-.05,.18,.4].map(a=>`<path d="M1210 170 L${1210+Math.cos(Math.PI*.62+a)*1700} ${170+Math.sin(Math.PI*.62+a)*1700} L${1210+Math.cos(Math.PI*.62+a+.06)*1700} ${170+Math.sin(Math.PI*.62+a+.06)*1700}Z" fill="url(#${id}ray)" transform="rotate(0)"/>`).join('')}</g>`;
  s+=`<g filter="url(#${id}blur)">${Array.from({length:7},()=>{const cx=r()*1600,cy=60+r()*170,w=120+r()*140;return Array.from({length:5},(_,k)=>`<ellipse cx="${(cx+(k-2)*w*.38).toFixed(0)}" cy="${(cy-Math.sin(k/4*Math.PI)*w*.18).toFixed(0)}" rx="${(w*.42).toFixed(0)}" ry="${(w*.2).toFixed(0)}" fill="url(#${id}cl)"/>`).join('')}).join('')}</g>`;
  s+=`<path d="${peaks(r,400,190,6)}" fill="url(#${id}mt)" opacity=".8"/><path d="${peaks(r,405,120,9)}" fill="#9db5c2" opacity=".75"/><path d="${ridge(r,410,60,16,.3)}" fill="#a9bfc4" opacity=".7"/>`;
  s+=`<rect y="330" width="1600" height="140" fill="url(#${id}fog)"/>`;
  s+=`<path d="${ridge(r,470,70,6,.3)}" fill="url(#${id}h1)"/>`;
  s+=`<g opacity=".8" filter="url(#${id}soft)">${Array.from({length:60},()=>{const x=r()*1600,y=455+r()*25,k=12+r()*16;return`<ellipse cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" rx="${k.toFixed(0)}" ry="${(k*1.3).toFixed(0)}" fill="#5f8556"/>`}).join('')}</g>`;
  s+=`<rect y="420" width="1600" height="110" fill="url(#${id}fog)" opacity=".7"/>`;
  s+=`<path d="${ridge(r,530,40,5,.4)}" fill="url(#${id}h2)"/>`;
  s+=`<path d="M-20 560 Q400 535 800 548 T1620 552 L1620 900 L-20 900Z" fill="url(#${id}gr)"/>`;
  s+=`<rect y="540" width="1600" height="360" filter="url(#${id}patch)" opacity=".55"/>`;
  s+=`<path d="M560 900 Q700 720 760 600 Q790 560 840 560 Q880 600 960 720 Q1060 860 1120 900Z" fill="#a49166" opacity=".28" filter="url(#${id}soft)"/>`;
  s+=`<g>${tree(r,90,600,1.6,0,0,'#b8d27a',id)}${tree(r,250,575,1.1,0,0,'#b8d27a',id)}${tree(r,1500,610,1.75,0,0,'#b8d27a',id)}${tree(r,1360,580,1.15,0,0,'#b8d27a',id)}</g>`;
  s+=`<g>${Array.from({length:140},()=>{const x=r()*1600,y=600+Math.pow(r(),.7)*300,h=6+r()*14*(y/900),c=['#4f7a3a','#6c9548','#89ae5c'][Math.floor(r()*3)];return`<path d="M${x.toFixed(0)} ${y.toFixed(0)} q${(r()*6-3).toFixed(1)} ${(-h).toFixed(1)} ${(r()*8-4).toFixed(1)} ${(-h*1.4).toFixed(1)}" stroke="${c}" stroke-width="2" fill="none" stroke-linecap="round"/>`}).join('')}</g>`;
  s+=`<g opacity=".75">${Array.from({length:40},()=>{const x=r()*1600,y=610+r()*280;return`<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${(1.5+r()*2).toFixed(1)}" fill="${['#f4e7b0','#e9b7c8','#ffffff','#c9b8f0'][Math.floor(r()*4)]}"/>`}).join('')}</g>`;
  s+=`<rect width="1600" height="900" filter="url(#${id}grain)" opacity=".18"/><rect width="1600" height="900" fill="url(#${id}vig)"/>`;
  return`<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true">${s}</svg>`}
};
rlStageBG=function(kind){return SC[kind]?SC[kind]():old(kind)};
})();
