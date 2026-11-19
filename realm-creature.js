"use strict";
/* ================================================================
   REALM CREATURES: collectible creatures with three evolution forms,
   and wild ink monsters drawn the same way. Loaded after
   realm-figure.js, so these definitions replace the hero art.
   Canvas: 240 × 240, facing right, ground at y 228.
   ================================================================ */
const CR_INK='#2a2133';
const CR_EVO=[10,25];
const crStage=lv=>lv>=CR_EVO[1]?2:lv>=CR_EVO[0]?1:0;
const cf=v=>Math.round(v*10)/10;
let CRN=0,CRP='x';
function crEll(cx,cy,rx,ry){return`M${cf(cx-rx)} ${cf(cy)}A${cf(rx)} ${cf(ry)} 0 1 0 ${cf(cx+rx)} ${cf(cy)}A${cf(rx)} ${cf(ry)} 0 1 0 ${cf(cx-rx)} ${cf(cy)}Z`}
const crCap=(x1,y1,w1,x2,y2,w2)=>rlfCap(x1,y1,w1,x2,y2,w2);
/* one shaded piece, rendered as a soft lit volume: a thin darker edge, a
   radial light falloff, a coloured rim light on the shadow side and a soft specular */
let CRG={},CRRIM='#fff';
function crGradId(base){const k=base.replace('#','');CRG[k]=base;return CRP+'g'+k}
function crP(ds,fill,P,o){o=o||{};if(typeof ds==='string')ds=[ds];if(o.merge&&ds.length>1)ds=[ds.join(' ')];
  const base=o.back?shade(fill,-.3):fill,edge=shade(base,-.6),sw=o.sw==null?3:Math.min(o.sw,3.2),k=o.sh==null?1:o.sh,id=P+'k'+(CRN++),g=crGradId(base);
  let s=o.noline?'':ds.map(d=>`<path d="${d}" fill="${edge}" stroke="${edge}" stroke-width="${cf(sw*.8)}" stroke-linejoin="round"/>`).join('');
  if(o.flat)return s+ds.map(d=>`<path d="${d}" fill="${base}"/>`).join('')+(o.inner||'');
  s+=`<clipPath id="${id}">${ds.map(d=>`<path d="${d}"/>`).join('')}</clipPath><g clip-path="url(#${id})">`+
    ds.map(d=>`<path d="${d}" fill="${shade(base,.3)}"/>`).join('')+
    (o.back?'':ds.map(d=>`<path d="${d}" fill="${CRRIM}" opacity=".32"/>`).join(''))+
    `<g transform="translate(${cf(-2*k)} ${cf(-3*k)})">${ds.map(d=>`<path d="${d}" fill="url(#${g})"/>`).join('')}</g>`+
    (o.inner||'')+
    (o.back||o.nospec?'':ds.map(d=>`<path d="${d}" fill="url(#${P}sp)"/>`).join(''))+`</g>`;
  return s}
function crLimb(pts,fill,P,o){const ds=[];for(let i=0;i<pts.length-1;i++){const a=pts[i],b=pts[i+1];ds.push(crCap(a[0],a[1],a[2],b[0],b[1],b[2]))}return crP(ds,fill,P,{...(o||{}),merge:1})}
function crStroke(d,col,w,o){o=o||{};return`<path d="${d}" fill="none" stroke="${shade(col,-.6)}" stroke-width="${w+2.4}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"${o.cls?` class="${o.cls}"`:''}/>`}
function crGlow(x,y,r,P,op){return`<circle cx="${cf(x)}" cy="${cf(y)}" r="${cf(r)}" fill="url(#${P}gl)" opacity="${op==null?.85:op}"/>`}
const CR_EN={fire:['#fff3b0','#ffb22e','#e2401c'],water:['#f2fdff','#7fdcff','#2a74d6'],wind:['#f4fff0','#a6f08a','#2f9e5a'],light:['#fffef2','#ffe680','#e0a420'],dark:['#ffe0ff','#c38bff','#5a2aa8']};
function crDefs(P,el){const en=CR_EN[el];
  const vol=Object.entries(CRG).map(([k,c])=>`<radialGradient id="${P}g${k}" cx=".4" cy=".32" r=".8" fx=".34" fy=".24"><stop offset="0" stop-color="${shade(c,.2)}"/><stop offset=".4" stop-color="${shade(c,.05)}"/><stop offset=".75" stop-color="${c}"/><stop offset="1" stop-color="${shade(c,-.34)}"/></radialGradient>`).join('');
  return`<defs>${vol}<radialGradient id="${P}sp" cx=".34" cy=".22" r=".34"><stop offset="0" stop-color="#fff" stop-opacity=".3"/><stop offset=".55" stop-color="#fff" stop-opacity=".07"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient><linearGradient id="${P}en" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="${en[2]}"/><stop offset=".55" stop-color="${en[1]}"/><stop offset="1" stop-color="${en[0]}"/></linearGradient><radialGradient id="${P}gl"><stop offset="0" stop-color="${en[0]}"/><stop offset=".35" stop-color="${en[1]}" stop-opacity=".75"/><stop offset="1" stop-color="${en[1]}" stop-opacity="0"/></radialGradient></defs>`}

/* eye, facing right. f = fierceness (0 round and friendly, 1 narrowed), sq squashes the far eye */
function crEye(x,y,r,o){o=o||{};const f=o.f||0,c=o.c||'#3a2a1a',sq=o.sq||1,a=o.a||0;
  let s=`<g transform="translate(${cf(x)} ${cf(y)}) rotate(${a}) scale(${sq} 1)">`;
  if(o.glow){const g=o.glow;
    return s+`<ellipse rx="${cf(r*2)}" ry="${cf(r*1.6)}" fill="${g}" opacity=".3"/><path d="M${cf(-r*1.1)} ${cf(r*.35)} Q${cf(-r*.3)} ${cf(-r*1.25)} ${cf(r*1.1)} ${cf(-r*.55)} Q${cf(r*.4)} ${cf(r*.95)} ${cf(-r*1.1)} ${cf(r*.35)}Z" fill="${g}" stroke="${CR_INK}" stroke-width="2.6" stroke-linejoin="round"/><ellipse cx="${cf(r*.1)}" cy="${cf(-r*.05)}" rx="${cf(r*.18)}" ry="${cf(r*.5)}" fill="${CR_INK}" opacity=".85"/><circle cx="${cf(-r*.35)}" cy="${cf(-r*.25)}" r="${cf(r*.2)}" fill="#fff"/><path d="M${cf(-r*1.35)} ${cf(-r*1.45)} L${cf(r*1.2)} ${cf(-r*.95)}" stroke="${CR_INK}" stroke-width="${cf(r*.42)}" stroke-linecap="round"/></g>`}
  const yl=-r*(1.08-f*.42),yr=-r*(1.08-f*.8),id=CRP+'e'+(CRN++);
  s+=`<radialGradient id="${id}i" cx=".5" cy=".62" r=".6"><stop offset="0" stop-color="${shade(c,.55)}"/><stop offset=".55" stop-color="${c}"/><stop offset="1" stop-color="${shade(c,-.55)}"/></radialGradient>`+
    `<clipPath id="${id}"><path d="M${cf(-r*1.4)} ${cf(yl)} L${cf(r*1.4)} ${cf(yr)} L${cf(r*1.4)} ${cf(r*1.5)} L${cf(-r*1.4)} ${cf(r*1.5)}Z"/></clipPath><g clip-path="url(#${id})">`+
    `<ellipse rx="${cf(r*.82)}" ry="${cf(r*1.02)}" fill="#1a1222" stroke="${CR_INK}" stroke-width="1.8"/>`+
    `<ellipse cx="${cf(r*.14)}" cy="${cf(r*.1)}" rx="${cf(r*.72)}" ry="${cf(r*.9)}" fill="url(#${id}i)"/>`+
    `<ellipse cx="${cf(r*.22)}" cy="${cf(r*.08)}" rx="${cf(r*.12)}" ry="${cf(r*.56)}" fill="#120c18"/>`+
    `<ellipse cx="0" cy="${cf(-r*.62)}" rx="${cf(r*.8)}" ry="${cf(r*.36)}" fill="#000" opacity=".16"/>`+
    `<ellipse cx="${cf(-r*.08)}" cy="${cf(-r*.3+f*r*.25)}" rx="${cf(r*.26)}" ry="${cf(r*.2)}" fill="#fff"/><circle cx="${cf(r*.44)}" cy="${cf(r*.46)}" r="${cf(r*.11)}" fill="#fff" opacity=".9"/><path d="M${cf(-r*.25)} ${cf(r*.62)} Q${cf(r*.2)} ${cf(r*.86)} ${cf(r*.6)} ${cf(r*.5)}" stroke="#fff" stroke-width="${cf(r*.1)}" opacity=".45" fill="none" stroke-linecap="round"/></g>`;
  s+=`<path d="M${cf(-r*.82)} ${cf(yl*.92+(f?0:r*.55))} Q${cf(-r*.1)} ${cf(Math.min(yl,yr)-r*(f?.05:.4))} ${cf(r*.78)} ${cf(yr*.92+(f?0:r*.35))}" stroke="${CR_INK}" stroke-width="${cf(r*.24)}" stroke-linecap="round" fill="none"/>`;
  if(f>.2)s+=`<path d="M${cf(-r*.9)} ${cf(-r*1.55+f*r*.2)} L${cf(r*.8)} ${cf(-r*1.15+f*r*.45)}" stroke="${CR_INK}" stroke-width="${cf(r*.26)}" stroke-linecap="round" opacity=".85"/>`;
  return s+'</g>'}
/* both eyes of a 3/4 head: near eye at (x,y), far eye toward the snout */
const CR_EYEC={fire:'#ffb52e',water:'#5fe3ff',wind:'#c4f25a',light:'#ffe55c',dark:'#ff4f9a'};
const crIris=sp=>sp.c.eg||CR_EYEC[sp.el]||'#ffb52e';
function crEyes(sp,s,x,y,r,dx,skin,mon){const f=mon?0:[.5,.66,.8][s],c=crIris(sp);r*=.86;
  if(mon)return crEye(x+dx,y-r*.2,r*.62,{glow:mon,sq:.6})+crEye(x,y,r*.85,{glow:mon});
  return(dx?crEye(x+dx,y-r*.25,r*.78,{c,f,skin,sq:.55}):'')+crEye(x,y,r,{c,f,skin})}

/* ---------- tails ---------- */
function crTail(t,ax,ay,z,sp,P,s){const B=sp.c.b,A=sp.c.a,M=sp.c.m;let g='';
  const tr=`translate(${cf(ax)} ${cf(ay)}) scale(${cf(z)})`;
  switch(t){
   case'brush':g=crP(`M4 -2 C-20 6 -48 -6 -56 -34 C-62 -58 -48 -82 -30 -92 C-36 -70 -28 -50 -12 -40 C2 -30 12 -16 4 -2Z`,B,P,{inner:crP(`M-30 -92 C-48 -82 -60 -62 -57 -44 C-48 -54 -40 -62 -28 -70 C-29 -78 -30 -86 -30 -92Z`,A,P,{noline:1})});break;
   case'flame':g=`<g class="cr-flick">${crP(`M4 -2 C-20 4 -42 -10 -48 -34 C-52 -50 -42 -62 -48 -84 C-36 -74 -32 -62 -30 -54 C-30 -70 -22 -86 -8 -100 C-10 -82 -4 -68 -2 -56 C4 -64 10 -70 18 -76 C14 -58 16 -40 12 -24 C10 -12 8 -6 4 -2Z`,M,P,{inner:`<path d="M2 -8 C-14 -8 -28 -20 -30 -38 C-30 -52 -22 -60 -22 -72 C-14 -62 -12 -52 -10 -46 C-6 -58 -2 -66 6 -74 C4 -58 8 -42 6 -26 C5 -16 4 -10 2 -8Z" fill="url(#${P}en)"/>`})}</g>`;break;
   case'leaf':g=crP(`M4 -2 C-8 -30 -40 -64 -78 -70 C-70 -44 -46 -12 4 -2Z`,M,P,{inner:`<path d="M2 -4 C-20 -26 -44 -50 -74 -66" stroke="${shade(M,-.35)}" stroke-width="2.4" fill="none"/>`});break;
   case'ice':g=[[-40,-70,10],[-62,-40,8],[-20,-84,7]].map(q=>crP(`M0 0 L${q[0]-q[2]} ${q[1]+q[2]*1.5} L${q[0]} ${q[1]} L${q[0]+q[2]*1.6} ${q[1]+q[2]*.8}Z`,'#bfe9ff',P,{sw:3.6,inner:`<path d="M0 0 L${q[0]} ${q[1]}" stroke="#fff" stroke-width="2" opacity=".8"/>`})).join('')+crP(`M6 -2 C-14 4 -36 -4 -44 -24 C-34 -20 -20 -22 -8 -14 C-2 -10 4 -6 6 -2Z`,B,P);break;
   case'smoke':g=`<g class="cr-flick">${crP(`M4 -2 C-24 0 -44 -18 -40 -40 C-36 -58 -54 -66 -66 -60 C-58 -76 -34 -80 -24 -64 C-16 -50 -24 -38 -12 -28 C-4 -22 6 -14 4 -2Z`,B,P,{inner:`<path d="M-58 -64 C-46 -70 -34 -66 -30 -56" stroke="${M}" stroke-width="3" fill="none" stroke-linecap="round" opacity=".9"/>`})}</g>`;break;
   case'puff':g=crP(crEll(-8,-8,13,12),A,P);break;
   case'tuft':g=crStroke(`M0 0 C-18 6 -34 -4 -40 -24 C-44 -38 -36 -46 -30 -50`,B,6)+crP(`M-30 -50 C-40 -54 -44 -66 -36 -76 C-30 -66 -22 -66 -16 -64 C-18 -56 -24 -50 -30 -50Z`,M,P,{sw:3.6});break;
   case'lizard':break;
  }
  return`<g class="cr-tail" style="transform-origin:${cf(ax)}px ${cf(ay)}px"><g transform="${tr}">${g}</g></g>`}

/* ---------- heads (local coordinates, facing right, cranium centred on 0,0) ---------- */
const CR_HQ={
 fox:{cr:[30,27],sn:[8,8,26,42,14,12],ear:'point',eh:44,fl:1},
 wolf:{cr:[31,27],sn:[8,8,30,46,15,16],ear:'point',eh:40,fl:1},
 cat:{cr:[30,27],sn:[8,9,24,30,12,17],ear:'point',eh:36,fl:1},
 lion:{cr:[30,27],sn:[8,9,26,32,13,18],ear:'round',fl:0},
 deer:{cr:[27,25],sn:[6,6,24,44,14,15],ear:'side',fl:0},
 hare:{cr:[28,26],sn:[8,8,24,28,11,16],ear:'long',fl:1},
 drake:{cr:[28,24],sn:[8,4,28,48,8,18],ear:'none',fl:0,lz:1},
};
function crHeadQuad(sp,s,P,mon){const H=CR_HQ[sp.h]||CR_HQ.fox,B=sp.c.b,A=sp.c.a,M=sp.c.m,IE=shade(B,-.42),sn=H.sn;
  let behind='',head='',front='';
  const cran=crEll(0,0,H.cr[0],H.cr[1]),snout=crCap(sn[0],sn[1],sn[2],sn[3],sn[4],sn[5]);
  const ds=[cran,snout];
  if(H.fl)ds.push(`M-20 4 L-38 10 L-27 15 L-36 24 L-20 22 L-12 28 L-2 20Z`);
  if(H.lz)ds.push(crCap(2,14,22,36,18,12));
  const eh=H.eh||40;
  // ears
  if(H.ear==='point'){behind+=crP(`M2 -22 Q-2 ${-eh*.62-12} 8 ${-eh-10} Q18 ${-eh*.6-10} 20 -16Z`,B,P,{back:1});
    behind+=crP(`M-26 -9 Q-34 ${-eh*.6-8} -24 ${-eh-12} Q-10 ${-eh*.66-12} -3 -24Z`,B,P,{inner:`<path d="M-21 -14 Q-27 ${-eh*.55-8} -22 ${-eh-3} Q-13 ${-eh*.6-9} -8 -21Z" fill="${IE}"/>`})}
  else if(H.ear==='round'){behind+=crP(crEll(10,-24,9,9),B,P,{back:1});behind+=crP(crEll(-16,-22,10,10),B,P,{inner:`<circle cx="-15" cy="-21" r="5" fill="${IE}"/>`})}
  else if(H.ear==='side'){behind+=crP(`M8 -18 Q24 -36 40 -34 Q30 -20 14 -12Z`,B,P,{back:1});behind+=crP(`M-18 -10 Q-40 -26 -54 -22 Q-42 -6 -22 -2Z`,B,P,{inner:`<path d="M-22 -8 Q-38 -20 -48 -20 Q-38 -10 -24 -6Z" fill="${IE}"/>`})}
  else if(H.ear==='long'){const L=[40,50,58][s];behind+=crP(`M4 -22 Q-${L*.4} -${L*.9} -${L*.95} -${L*.95} Q-${L*.5} -${L*.5} 16 -16Z`,B,P,{back:1});
    behind+=crP(`M-16 -16 Q-${L*.6} -${L*.75} -${L*1.15} -${L*.7} Q-${L*.6} -${L*.3} -4 -24Z`,B,P,{inner:`<path d="M-14 -18 Q-${L*.6} -${L*.68} -${L*1.05} -${L*.68}" stroke="${IE}" stroke-width="4" fill="none" stroke-linecap="round"/>`})}
  // snout details
  const nx=sn[3]+sn[5]*.28,ny=sn[4]-sn[5]*.28;
  let inner='';
  if(!H.lz)inner+=crP(crCap(sn[0]+8,sn[1]+9,sn[2]*.55,sn[3]-1,sn[4]+6,sn[5]*.62),A,P,{noline:1,sh:.6});
  if(H.fl)inner+=`<path d="M-20 6 L-34 11 L-25 15 L-32 22 L-20 21 L-12 26 L-4 20Z" fill="${A}"/>`;
  if(sp.fm)inner+=sp.fm(s);
  head=crP(ds,B,P,{inner});
  head+=H.lz?`<circle cx="${sn[3]-4}" cy="${sn[4]-6}" r="2.2" fill="${CR_INK}"/><path d="M${sn[3]+4} ${sn[4]+6} Q${sn[3]-14} ${sn[4]+12} ${sn[0]+4} ${sn[4]+8}" stroke="${CR_INK}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`:
    `<ellipse cx="${cf(nx)}" cy="${cf(ny)}" rx="5" ry="3.8" fill="${CR_INK}"/><ellipse cx="${cf(nx-1.4)}" cy="${cf(ny-1.4)}" rx="1.6" ry="1" fill="#fff" opacity=".7"/><path d="M${cf(nx)} ${cf(ny+4)} L${cf(nx-3)} ${cf(ny+9)} M${cf(nx-1)} ${cf(ny+9.5)} L${cf(nx-18)} ${cf(ny+9)}" stroke="${CR_INK}" stroke-width="2.3" fill="none" stroke-linecap="round"/>`+`<path d="M${cf(nx-9)} ${cf(ny+9)} l1.6 5.5 l2.6 -5.6Z" fill="#fff" stroke="${CR_INK}" stroke-width="1.2" stroke-linejoin="round"/>`;
  head+=crEyes(sp,s,6,-4,[11,9.6,8.8][s],H.lz?0:21,B,mon);
  return{behind,head,front}}

/* ---------- four-legged ---------- */
function crQuadTorso(rx,ry,rr,cx,cy,cr){const m=(rx+cx)/2;
  return`M${cf(rx-rr*.95)} ${cf(ry)} C${cf(rx-rr*.95)} ${cf(ry-rr*1.05)} ${cf(rx)} ${cf(ry-rr*1.12)} ${cf(rx+rr*.6)} ${cf(ry-rr*1.06)} C${cf(m)} ${cf(Math.min(ry-rr*.98,cy-cr*.9)+3)} ${cf(cx-cr*.7)} ${cf(cy-cr*1.02)} ${cf(cx+cr*.05)} ${cf(cy-cr*1.02)} C${cf(cx+cr*.9)} ${cf(cy-cr*1.0)} ${cf(cx+cr*1.18)} ${cf(cy+cr*.15)} ${cf(cx+cr*.75)} ${cf(cy+cr*.85)} C${cf(cx+cr*.35)} ${cf(cy+cr*1.25)} ${cf(cx-cr*.4)} ${cf(cy+cr*1.0)} ${cf(m)} ${cf((cy+cr*.85+ry+rr*.85)/2)} C${cf(rx+rr*.6)} ${cf(ry+rr*.95)} ${cf(rx+rr*.1)} ${cf(ry+rr*1.08)} ${cf(rx-rr*.4)} ${cf(ry+rr*.95)} C${cf(rx-rr*1.05)} ${cf(ry+rr*.75)} ${cf(rx-rr*1.0)} ${cf(ry+rr*.3)} ${cf(rx-rr*.95)} ${cf(ry)}Z`}
function crQuad(sp,s,P,mon){const T=a=>a[s],G=228,c=sp.c,B=c.b,A=c.a;
  const rx=T([100,90,82]),ry=T([184,166,150]),rr=T([22,27,31]);
  const cx=T([136,146,152]),cy=T([180,160,142]),cr=T([25,30,35]);
  const hx=T([160,180,192]),hy=T([138,112,92]),k=T([.96,.93,.92]);
  const lw=T([15,18,21])*(sp.heavy?1.2:1);
  const geo={rx,ry,rr,cx,cy,cr,hx,hy,k,G};const D=sp.deco?sp.deco(s,geo,P,mon):{};
  let o='';
  o+=D.back||'';
  const fl=(x,y,b)=>crLimb([[x,y,lw*1.55],[x+2,y+cr*.9,lw*1.08],[x+4,(y+cr*.9+G)/2,lw*.86],[x+5,G-7,lw*.8]],B,P,{back:b})+crPaw(x+9,G-4,lw,B,P,b,sp);
  const hl=(x,y,b)=>crLimb([[x,y,lw*1.9],[x-4,y+rr*1.0,lw*1.2],[x-12,G-24,lw*.84],[x-6,G-7,lw*.78]],B,P,{back:b})+crPaw(x-2,G-4,lw,B,P,b,sp);
  o+=fl(cx+12,cy+cr*.05,1)+hl(rx+14,ry+rr*.1,1);
  o+=crTail(sp.tail,rx-rr*.72,ry-rr*.45,T([.72,.92,1.1])*(sp.tz||1),sp,P,s);
  if(D.wings)o+=D.wings;
  o+=fl(cx-2,cy+cr*.15,0)+hl(rx+2,ry+rr*.2,0);
  const ds=[crQuadTorso(rx,ry,rr,cx,cy,cr)];
  if(s>0)ds.push(crCap(cx+cr*.15,cy-cr*.3,cr*1.55,hx-10*k,hy+12*k,34*k));
  let inner=crP(crCap(rx+8,ry+rr*.95,rr*1.1,cx+cr*.2,cy+cr*.95,cr*1.2),A,P,{noline:1,sh:.7});
  if(sp.h!=='drake'&&sp.h!=='lion')inner+=`<path d="M${cf(cx+cr*.6)} ${cf(cy-cr*.15)} l8 8 l-6 2 l8 9 l-7 1 l5 9" fill="${A}" stroke="${A}" stroke-width="10" stroke-linejoin="round" opacity=".95"/>`;
  inner+=`<path d="M${cf(rx+rr*.45)} ${cf(ry-rr*.6)} Q${cf(rx+rr*1.0)} ${cf(ry+rr*.2)} ${cf(rx+rr*.4)} ${cf(ry+rr*.98)}" stroke="${shade(B,-.32)}" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M${cf(cx-cr*.25)} ${cf(cy-cr*.3)} Q${cf(cx-cr*.45)} ${cf(cy+cr*.4)} ${cf(cx-cr*.1)} ${cf(cy+cr*.95)}" stroke="${shade(B,-.32)}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
  inner+=D.body||'';
  o+=`<g class="cr-body">`+crP(ds,B,P,{inner});
  if(s>1&&!mon)o+=crPlate(cx-cr*.1,cy-cr*.55,cr*.55,10,sp.c.m,P)+crPlate(rx+rr*.2,ry-rr*.55,rr*.5,-12,sp.c.m,P);
  o+=D.mid||'';
  const Hd=crHeadQuad(sp,s,P,mon);
  o+=`<g class="cr-head" style="transform-origin:${cf(hx-10)}px ${cf(hy+18)}px"><g transform="translate(${hx} ${hy}) scale(${k})">${D.hb||''}${Hd.behind}${Hd.head}${Hd.front}${D.head||''}${s>1&&!mon?crCrown(-4,-26,28,sp.c.m):''}</g></g>`;
  o+=D.front||'';o+='</g>';
  return{svg:o,box:[rx-rr-T([50,66,84])*(sp.tz||1),hy-k*T([60,70,76])-(D.top||0),hx+k*52,G],top:[hx,hy-k*40-(D.top||0)],wa:[cx-cr*.2,cy-cr*.7],hasW:!!(D.wings||D.wings2)}}
function crPaw(x,y,w,fill,P,back,sp){return crP(crEll(x,y-1,w*.74,w*.38+1.5),sp&&sp.c.p||fill,P,{back,sh:.4,sw:3.6})}

/* ---------- upright ---------- */
const CR_HB={
 lizard:{cr:[27,25],lz:1,len:40},
 dragon:{cr:[27,25],lz:1,len:44},
 axolotl:{cr:[34,25],sn:[10,6,30,30,8,24]},
 otter:{cr:[28,25],sn:[10,8,22,30,10,16],ear:1},
 bear:{cr:[30,27],sn:[10,8,24,34,12,18],ear:1},
 rabbit:{cr:[27,25],sn:[10,8,20,26,10,15]},
 imp:{cr:[28,26],sn:[10,6,20,26,10,14]},
 golem:{box:1},treant:{box:1},paper:{box:1},
};
function crHeadBi(sp,s,P,mon){const H=CR_HB[sp.h]||CR_HB.lizard,B=sp.c.b,A=sp.c.a,M=sp.c.m,IE=shade(B,-.42);
  let behind='',head='',front='';
  if(H.box){const tex=sp.h;
    head=crP(`M-24 -20 Q-26 -30 -14 -30 L18 -30 Q30 -30 30 -18 L30 14 Q30 24 18 24 L-14 24 Q-26 24 -24 12Z`,B,P,{inner:tex==='paper'?`<path d="M-24 -8 H30 M-24 6 H30" stroke="${shade(B,-.25)}" stroke-width="2"/>`:tex==='treant'?`<path d="M-10 -30 L-6 22 M10 -30 L12 22" stroke="${shade(B,-.3)}" stroke-width="2.4"/>`:`<path d="M-20 -12 L-6 -4 L-10 10 M16 -28 L8 -14 L18 -4" stroke="${shade(B,-.35)}" stroke-width="2.4" fill="none"/>`});
    if(tex==='treant')behind+=[[-18,-34,20],[6,-40,22],[26,-30,16],[-30,-20,14]].map(q=>crP(crEll(q[0],q[1],q[2],q[2]*.85),M,P,{sw:3.6})).join('');
    if(tex==='paper')front+=`<path d="M-26 -30 L-14 -44 L-2 -30 L10 -46 L22 -30" fill="${A}" stroke="${CR_INK}" stroke-width="3" stroke-linejoin="round"/>`;
    head+=crEye(16,-4,8,{glow:mon||CR_EN[sp.el||'light'][1],sq:.7})+crEye(2,-2,9,{glow:mon||CR_EN[sp.el||'light'][1]});
    return{behind,head,front}}
  if(H.lz){const L=H.len;let inner=crP(`M2 14 Q${L*.5} 20 ${L-4} 12 Q${L*.5} 30 4 26Z`,A,P,{noline:1,sh:.5})+(sp.fm?sp.fm(s):'');
    head=crP([crEll(0,0,H.cr[0],H.cr[1]),`M4 -20 Q${L*.55} -18 ${L} -2 Q${L+4} 6 ${L-2} 12 Q${L*.55} 24 2 22Z`],B,P,{inner});
    head+=`<path d="M${L-8} -4 l3 -2" stroke="${CR_INK}" stroke-width="2.6" stroke-linecap="round"/><path d="M${L} 9 Q${L*.6} 14 ${L*.28} 10" stroke="${CR_INK}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`+`<path d="M${L*.5} 11.5 l2 6 l3 -6.5Z M${L*.72} 11 l1.6 5 l2.6 -5.4Z" fill="#fff" stroke="${CR_INK}" stroke-width="1.4" stroke-linejoin="round"/>`;
    head+=`<path d="M-2 -14 Q12 -22 28 -14" stroke="${shade(B,-.35)}" stroke-width="2.4" fill="none"/>`;
    head+=crEyes(sp,s,10,-6,[11,9.6,8.8][s],18,B,mon);
    return{behind,head,front}}
  const sn=H.sn,ds=[crEll(0,0,H.cr[0],H.cr[1]),crCap(sn[0],sn[1],sn[2],sn[3],sn[4],sn[5])];
  if(H.jaw)ds.push(crCap(4,12,22,36,15,12));
  if(H.ear){behind+=crP(crEll(10,-24,9,9),B,P,{back:1});behind+=crP(crEll(-14,-22,10,10),B,P,{inner:`<circle cx="-13" cy="-21" r="5" fill="${IE}"/>`})}
  let inner='';
  if(sp.h==='otter'||sp.h==='bear'||sp.h==='rabbit'||sp.h==='imp')inner+=crP(crCap(sn[0]+6,sn[1]+8,sn[2]*.6,sn[3],sn[4]+5,sn[5]*.62),A,P,{noline:1,sh:.6});
  if(H.jaw)inner+=crP(crCap(6,18,16,36,18,9),A,P,{noline:1,sh:.5});
  if(sp.fm)inner+=sp.fm(s);
  head=crP(ds,B,P,{inner});
  const nx=sn[3]+sn[5]*.25,ny=sn[4]-sn[5]*.3;
  if(H.jaw)head+=`<circle cx="${sn[3]-2}" cy="${sn[4]-6}" r="2.2" fill="${CR_INK}"/><path d="M${sn[3]+5} ${sn[4]+6} Q${sn[3]-12} ${sn[4]+11} ${sn[0]} ${sn[4]+8}" stroke="${CR_INK}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`+(s>1||mon?`<path d="M${sn[3]-6} ${sn[4]+8} l2 5 l3 -5Z" fill="#fff" stroke="${CR_INK}" stroke-width="1.4"/>`:'');
  else if(sp.h==='axolotl')head+=`<path d="M12 13 L40 10" stroke="${CR_INK}" stroke-width="2.6" fill="none" stroke-linecap="round"/><path d="M30 11 l1.6 5 l2.6 -5.2Z M20 12 l1.4 4.4 l2.4 -4.6Z" fill="#fff" stroke="${CR_INK}" stroke-width="1.2"/><circle cx="36" cy="-1" r="1.8" fill="${CR_INK}"/>`;
  else if(sp.h==='imp')head+=`<path d="M${nx} ${ny+5} Q${nx-8} ${ny+14} ${nx-18} ${ny+8}" stroke="${CR_INK}" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M${nx-6} ${ny+9} l1 5 l3 -5Z" fill="#fff" stroke="${CR_INK}" stroke-width="1.2"/>`;
  else head+=`<ellipse cx="${cf(nx)}" cy="${cf(ny)}" rx="4.6" ry="3.6" fill="${sp.c.n||CR_INK}"/><ellipse cx="${cf(nx-1.4)}" cy="${cf(ny-1.3)}" rx="1.5" ry=".9" fill="#fff" opacity=".7"/><path d="M${cf(nx)} ${cf(ny+4)} L${cf(nx-3)} ${cf(ny+9)} M${cf(nx-1)} ${cf(ny+9.5)} L${cf(nx-16)} ${cf(ny+9)}" stroke="${CR_INK}" stroke-width="2.3" fill="none" stroke-linecap="round"/>`+`<path d="M${cf(nx-8)} ${cf(ny+9)} l1.6 5.5 l2.6 -5.6Z" fill="#fff" stroke="${CR_INK}" stroke-width="1.2" stroke-linejoin="round"/>`;
  if(sp.h==='otter')head+=`<path d="M${nx-4} ${ny+3} l14 -3 M${nx-4} ${ny+6} l14 2" stroke="${CR_INK}" stroke-width="1.2" opacity=".6"/>`;
  const er=sp.h==='axolotl'?[11,9.5,8.6][s]:[11,9.6,8.8][s];
  head+=crEyes(sp,s,sp.h==='axolotl'?10:6,-4,er,sp.h==='axolotl'?22:H.jaw?0:20,B,mon);
  return{behind,head,front}}
function crBiped(sp,s,P,mon){const T=a=>a[s],G=228,c=sp.c,B=c.b,A=c.a,br=sp.brute?1:0;
  const hipX=T([114,112,110]),hipY=T([196,180,164]),hr=T([27,31,34])*(br?1.15:1);
  const chX=T([120,122,124]),chY=T([174,146,120]),chr=T([22,26,30])*(br?1.32:1);
  const hx=T([132,140,148])+(br?-8:0),hy=T([134,100,74])+(br?4:0),k=T([1.0,.95,.92])*(br?.8:1);
  const lw=T([19,22,25])*(br?1.3:1),aw=T([12,15,18])*(br?1.7:1);
  const geo={hipX,hipY,hr,chX,chY,chr,hx,hy,k,G,aw,lw};const D=sp.deco?sp.deco(s,geo,P,mon):{};
  let o=D.back||'';
  // far leg and arm
  o+=crLimb([[hipX-8,hipY+4,lw],[hipX-2,(hipY+G)/2+6,lw*.86],[hipX-8,G-8,lw*.76]],B,P,{back:1})+crFoot(hipX-8,G-4,lw,B,P,1,sp);
  const fhand=[chX+T([20,30,38])*(br?1.1:1),chY+T([8,12,6])+(br?chr*.6:0)];
  o+=crLimb([[chX-4,chY-chr*.38,aw],[chX+6,chY+chr*.5,aw*.92],[fhand[0],fhand[1],aw*.82]],B,P,{back:1})+crHand(fhand[0]+3,fhand[1],aw,B,P,1,sp);
  if(D.wings)o+=D.wings;
  // body, merged with a tail when the creature has one
  const ds=[`M${cf(chX-chr*.95)} ${cf(chY)} C${cf(chX-chr*.95)} ${cf(chY-chr*1.15)} ${cf(chX+chr*.95)} ${cf(chY-chr*1.15)} ${cf(chX+chr*.98)} ${cf(chY)} C${cf(chX+chr*1.05)} ${cf(chY+chr*.8)} ${cf(hipX+hr*1.2)} ${cf(hipY-hr*.5)} ${cf(hipX+hr*1.0)} ${cf(hipY+hr*.45)} C${cf(hipX+hr*.8)} ${cf(hipY+hr*1.08)} ${cf(hipX-hr*.8)} ${cf(hipY+hr*1.08)} ${cf(hipX-hr*1.0)} ${cf(hipY+hr*.35)} C${cf(hipX-hr*1.15)} ${cf(hipY-hr*.5)} ${cf(chX-chr*1.05)} ${cf(chY+chr*.7)} ${cf(chX-chr*.95)} ${cf(chY)}Z`];
  const tw=T([15,19,23]);
  if(sp.tail==='lizard'){const t=[[hipX-hr*.4,hipY+6,tw],[hipX-hr-12,hipY+18,tw*.7],[hipX-hr-T([30,40,50]),G-T([20,22,26]),tw*.42],[hipX-hr-T([44,58,72]),G-T([30,40,50]),tw*.18]];for(let i=0;i<t.length-1;i++)ds.push(crCap(t[i][0],t[i][1],t[i][2],t[i+1][0],t[i+1][1],t[i+1][2]))}
  if(s>1&&!br)ds.push(crCap(chX+4,chY-chr*.6,chr*1.1,hx-8,hy+16,30));
  let inner=crP(crCap(hipX+hr*.42,hipY+2,hr*1.25,chX+chr*.5,chY+2,chr*1.15),A,P,{noline:1,sh:.7});
  if(sp.bands)inner+=[0,1,2,3,4].map(i=>{const y=chY-chr*.3+i*(hipY-chY+chr)/5;return`<path d="M${cf(chX+chr*.05)} ${cf(y)} q${cf(chr*.5)} 4 ${cf(chr*.95)} 0" stroke="${shade(A,-.28)}" stroke-width="2" fill="none"/>`}).join('');
  inner+=D.body||'';
  if(sp.tail&&sp.tail!=='lizard')o+=crTail(sp.tail,hipX-hr*.75,hipY+4,T([.62,.78,.94])*(sp.tz||1),sp,P,s);
  o+=`<g class="cr-body">`+crP(ds,B,P,{inner});
  if(D.tailTip)o+=D.tailTip;
  if(sp.armor){const GD=c.g||CR_GOLD;o+=crStroke(`M${cf(hipX-hr*.95)} ${cf(hipY-hr*.35)} Q${cf(hipX)} ${cf(hipY-hr*.02)} ${cf(hipX+hr*1.05)} ${cf(hipY-hr*.45)}`,GD,7)+crGem(cf(hipX+hr*.45),cf(hipY-hr*.18),5,c.m)+crStroke(`M${cf(chX-chr*.75)} ${cf(chY-chr*.8)} Q${cf(chX+chr*.15)} ${cf(chY-chr*.15)} ${cf(chX+chr*.95)} ${cf(chY-chr*.55)}`,GD,7)}
  // near leg
  o+=crLimb([[hipX+8,hipY+2,lw*1.28],[hipX+16,(hipY+G)/2+6,lw*.98],[hipX+10,G-8,lw*.8]],B,P)+crFoot(hipX+12,G-3,lw,B,P,0,sp);
  if(s>1&&!mon)o+=crPlate(chX+chr*.15,chY-chr*.7,chr*.55,8,c.m,P);
  o+=D.mid||'';
  const Hd=crHeadBi(sp,s,P,mon);
  o+=`<g class="cr-head" style="transform-origin:${cf(hx-6)}px ${cf(hy+20)}px"><g transform="translate(${hx} ${hy}) scale(${cf(k)})">${D.hb||''}${Hd.behind}${Hd.head}${Hd.front}${D.head||''}${s>1&&!mon&&sp.h!=='golem'?crCrown(-2,-24,28,c.m):''}</g></g>`;
  // near arm
  const nh=[chX+T([28,38,48])*(br?1.05:1),chY+T([10,12,2])+(br?chr*.75:0)];
  o+=crLimb([[chX+8,chY-chr*.32,aw*1.05],[chX+16,chY+chr*.55,aw*.95],[nh[0],nh[1],aw*.85]],B,P)+crHand(nh[0]+3,nh[1],aw,B,P,0,sp);
  if(s>1&&!mon)o+=crPlate(chX+10,chY-chr*.35,aw*1.05,20,c.m,P);
  if(sp.armor){const ex=chX+16,ey=chY+chr*.55,a1=[ex+(nh[0]-ex)*.25,ey+(nh[1]-ey)*.25],a2=[ex+(nh[0]-ex)*.72,ey+(nh[1]-ey)*.72];o+=crP(crCap(a1[0],a1[1],aw*1.12,a2[0],a2[1],aw*1.02),c.g||CR_GOLD,P,{sw:2.6,sh:.4})}
  o+=D.front||'';o+='</g>';
  return{wa:[chX-chr*.3,chY-chr*.45],hasW:!!(D.wings||D.wings2),svg:o,box:[hipX-hr-(sp.tail==='lizard'?T([46,60,76]):sp.tail?40:4),hy-k*T([40,46,50])-(D.top||0),Math.max(nh[0]+aw,hx+k*48)+(D.right||0),G],top:[hx,hy-k*30-(D.top||0)]}}
function crFoot(x,y,w,fill,P,back,sp){return crP(crCap(x-4,y-3,w*.95,x+w*.95,y-1,w*.66),sp.c.p||fill,P,{back,sh:.4,sw:3.6})}
function crHand(x,y,w,fill,P,back,sp){let s=crP(crEll(x,y,w*.62,w*.58),sp.c.p||fill,P,{back,sh:.4,sw:3.4});
  if(sp.claw)s+=[-.5,0,.5].map(a=>`<path d="M${cf(x+w*.45*Math.cos(a))} ${cf(y+w*.45*Math.sin(a))} l${cf(w*.38*Math.cos(a))} ${cf(w*.38*Math.sin(a)+2)}" stroke="${CR_INK}" stroke-width="3.4" stroke-linecap="round"/><path d="M${cf(x+w*.45*Math.cos(a))} ${cf(y+w*.45*Math.sin(a))} l${cf(w*.34*Math.cos(a))} ${cf(w*.34*Math.sin(a)+2)}" stroke="#f4ead8" stroke-width="1.8" stroke-linecap="round"/>`).join('');
  return s}

/* ---------- birds ---------- */
function crBird(sp,s,P,mon){const T=a=>a[s],G=228,c=sp.c,B=c.b,A=c.a,M=c.m,W=c.w||B;
  const cx=T([126,130,134]),cy=T([186,170,150]),cr=T([27,30,33]);
  const rx=T([100,96,92]),ry=T([200,192,180]),rr=T([17,18,20]);
  const hx=T([142,150,160]),hy=T([144,122,98]),R=T([23,22,21]);
  const geo={cx,cy,cr,rx,ry,rr,hx,hy,R,G};const D=sp.deco?sp.deco(s,geo,P,mon):{};
  let o=D.back||'';
  // tail feathers
  const tf=sp.tf||[[0,1],[-14,.9],[14,.85]];const tl=T([34,48,62])*(sp.tl||1);
  o+=`<g class="cr-tail" style="transform-origin:${rx}px ${ry}px">`+tf.map(([a,l],i)=>{const ang=163+a*.8,len=tl*l*1.45,ex=rx+Math.cos(ang*Math.PI/180)*len,ey=ry+Math.sin(ang*Math.PI/180)*len;
    return crRibbon(rx+4,ry,len,ang,T([13,15,17]),7,i%2?W:sp.c.t||W,P,{back:i>0,ph:i*.8})+(sp.tfx?sp.tfx(ex,ey,s,i,P):'')}).join('')+'</g>';
  // far wing (raised in the final form)
  const ws=T([.58,.8,1]),wsc=(x,y)=>`translate(${cf(x)} ${cf(y)}) scale(${ws}) translate(${cf(-x)} ${cf(-y)})`;
  if(!sp.fold)o+=`<g class="cr-wing2" style="transform-origin:${cx+6}px ${cy-cr*.6}px"><g transform="${wsc(cx+10,cy-cr*.7)}">`+crWing(cx+10,cy-cr*.7,-1,W,P,1,sp,s)+'</g></g>';
  if(sp.wings4&&!sp.fold)o+=`<g class="cr-wing2" style="transform-origin:${cx}px ${cy}px"><g transform="translate(${cx-2} ${cy+4}) rotate(-38) scale(${cf(ws*.62)}) translate(${-cx+2} ${-cy-4})">`+crWing(cx-2,cy+4,1,W,P,1,sp,s)+'</g></g>';
  // legs
  const lc=c.l||'#e0a33a';
  [[cx-8,1],[cx+4,0]].forEach(([x,back])=>{o+=crStroke(`M${x} ${cy+cr*.6} L${x-2} ${G-6}`,back?shade(lc,-.3):lc,5)+crStroke(`M${x-2} ${G-6} l10 3 M${x-2} ${G-6} l-8 4 M${x-2} ${G-6} l3 5`,back?shade(lc,-.3):lc,3.4)});
  // body + neck + head silhouette
  const ds=[crCap(rx,ry,rr*2,cx,cy,cr*2),crCap(cx+4,cy-cr*.4,cr*1.3,hx-4,hy+8,R*1.5),crEll(hx,hy,R,R*.94)];
  let inner=crP(crCap(cx+cr*.3,cy-cr*.2,cr*1.05,rx+rr*.6,ry+rr*.7,rr*1.1),A,P,{noline:1,sh:.7})+crP(crCap(hx-R*.1,hy+R*.6,R*.9,cx+cr*.5,cy-cr*.4,cr*.9),A,P,{noline:1,sh:.6});
  inner+=D.body||'';
  o+=`<g class="cr-body">`+crP(ds,B,P,{inner});
  // near wing
  if(!sp.fold){o+=crStroke(`M${cf(hx-R*.9)} ${cf(hy+R*.9)} Q${cf(cx+cr*.2)} ${cf(cy-cr*.2)} ${cf(cx+cr*.9)} ${cf(cy-cr*.7)}`,c.g||CR_GOLD,4+s)+crGem(cf(cx+cr*.55),cf(cy-cr*.42),4+s,M)}
  if(sp.wings4&&!sp.fold)o+=`<g class="cr-wing" style="transform-origin:${cx}px ${cy}px"><g transform="translate(${cx-6} ${cy+6}) rotate(-38) scale(${cf(ws*.7)}) translate(${-cx+6} ${-cy-6})">`+crWing(cx-6,cy+6,1,W,P,0,sp,s)+'</g></g>';
  o+=!sp.fold?`<g class="cr-wing" style="transform-origin:${cx-4}px ${cy-cr*.6}px"><g transform="${wsc(cx-4,cy-cr*.6)}">`+crWing(cx-4,cy-cr*.6,1,W,P,0,sp,s)+'</g></g>':crFold(cx,cy,cr,rx,ry,W,P,sp,s);
  // head details
  let hd=(sp.fold?'':[0,1,2].slice(0,s+1+(s>1?1:0)).map(i=>crRibbon(hx-R*.4,hy-R*.6,T([20,30,40])*(1-i*.15),222+i*14,T([9,10,11]),4,i%2?shade(M,-.15):M,P,{back:i>0,ph:i})).join(''))+(D.hb||'');
  const bk=sp.beak||'cone',bc=c.k||'#f2b33d';
  const bx=hx+R*.82,by=hy+R*.05;
  const beak={cone:`M${bx-2} ${by-8} Q${bx+12} ${by-6} ${bx+20} ${by+1} Q${bx+10} ${by+7} ${bx-2} ${by+8}Z`,
    hook:`M${bx-3} ${by-9} Q${bx+14} ${by-12} ${bx+20} ${by+2} Q${bx+20} ${by+9} ${bx+15} ${by+12} Q${bx+14} ${by+4} ${bx+8} ${by+4} Q${bx+2} ${by+7} ${bx-3} ${by+7}Z`,
    long:`M${bx-3} ${by-8} Q${bx+16} ${by-8} ${bx+30} ${by+3} Q${bx+16} ${by+8} ${bx-3} ${by+8}Z`}[bk];
  hd+=crP(beak,bc,P,{sw:3.6,sh:.5})+`<path d="M${bx-1} ${by+1} L${bx+(bk==='long'?24:14)} ${by+2}" stroke="${CR_INK}" stroke-width="1.6" opacity=".6"/>`;
  hd+=crEye(hx+R*.3,hy-R*.12,T([8.4,8,7.6]),mon?{glow:mon}:{c:crIris(sp),f:[.5,.66,.8][s],skin:c.hc||B});
  hd+=D.head||'';
  o+=`<g class="cr-head" style="transform-origin:${hx-4}px ${hy+14}px">${hd}</g>`+(D.front||'')+'</g>';
  const wingTop=!sp.fold?cy-cr*.6-104*ws:hy-R;
  return{hasW:1,svg:o,box:[Math.min(rx-tl*1.35-6,!sp.fold?cx-90*ws:999),Math.min(wingTop,hy-R-T([20,30,40])-(D.top||0)),Math.max(hx+R+(bk==='long'?34:24),cx+40),G],top:[hx,hy-R-(D.top||0)]}}
function crWing(x,y,dir,W,P,back,sp,s){
  const pts=dir>0?`M${x} ${y} C${x-16} ${y-34} ${x-44} ${y-70} ${x-82} ${y-96} C${x-76} ${y-80} ${x-80} ${y-72} ${x-90} ${y-64} C${x-78} ${y-60} ${x-80} ${y-50} ${x-90} ${y-42} C${x-76} ${y-40} ${x-76} ${y-30} ${x-84} ${y-20} C${x-66} ${y-22} ${x-60} ${y-12} ${x-64} ${y-2} C${x-44} ${y-8} ${x-24} ${y+6} ${x} ${y+10}Z`
    :`M${x} ${y} C${x-6} ${y-36} ${x-24} ${y-74} ${x-50} ${y-104} C${x-48} ${y-88} ${x-54} ${y-80} ${x-62} ${y-74} C${x-50} ${y-70} ${x-52} ${y-60} ${x-60} ${y-52} C${x-46} ${y-50} ${x-44} ${y-38} ${x-50} ${y-28} C${x-34} ${y-24} ${x-18} ${y-10} ${x} ${y+8}Z`;
  const fx=sp.wfx?sp.wfx(x,y,dir,s):'';
  const lines=dir>0?`<path d="M${x-30} ${y-30} Q${x-56} ${y-46} ${x-82} ${y-62} M${x-30} ${y-14} Q${x-56} ${y-26} ${x-82} ${y-40} M${x-26} ${y} Q${x-46} ${y-8} ${x-66} ${y-12}" stroke="${shade(W,-.35)}" stroke-width="2" fill="none" opacity=".7"/>`:'';
  return crP(pts,W,P,{back,inner:crP(dir>0?`M${x} ${y} C${x-16} ${y-34} ${x-34} ${y-56} ${x-54} ${y-72} C${x-40} ${y-40} ${x-20} ${y-6} ${x} ${y+10}Z`:`M${x} ${y} C${x-6} ${y-30} ${x-18} ${y-56} ${x-34} ${y-78} C${x-26} ${y-44} ${x-14} ${y-10} ${x} ${y+8}Z`,sp.c.wa||shade(W,.18),P,{noline:1,sh:.5,back})+lines+fx})}
function crFold(cx,cy,cr,rx,ry,W,P,sp,s){const x=cx+cr*.2,y=cy-cr*.55,tx=rx-[26,34,40][s],ty=ry+[6,4,2][s];
  const d=`M${cf(x)} ${cf(y)} C${cf(x+16)} ${cf(y+18)} ${cf(x+4)} ${cf(cy+cr*.75)} ${cf((x+tx)/2)} ${cf(cy+cr*.7)} C${cf(tx+20)} ${cf(ty+2)} ${cf(tx+8)} ${cf(ty+4)} ${cf(tx)} ${cf(ty)} C${cf(tx+10)} ${cf(ty-14)} ${cf(rx+4)} ${cf(cy-cr*.7)} ${cf(x)} ${cf(y)}Z`;
  const lines=[0,1,2].map(i=>`<path d="M${cf(tx+10+i*4)} ${cf(ty-2-i*3)} Q${cf((x+tx)/2)} ${cf(cy+cr*(.45-i*.22))} ${cf(x+2-i*6)} ${cf(cy+cr*(.2-i*.2))}" stroke="${shade(W,-.35)}" stroke-width="2" fill="none" opacity=".75"/>`).join('');
  return crP(d,W,P,{inner:lines+(sp.wfx?sp.wfx(x,y,0,s,tx,ty):'')})}

/* ---------- floating serpents ---------- */
function crSerpent(sp,s,P,mon){const T=a=>a[s],c=sp.c,B=c.b,A=c.a,M=c.m;
  const raw=[[[150,140],[140,166],[118,182],[94,180],[78,166],[72,148]],
             [[162,122],[152,154],[128,174],[96,174],[72,160],[62,134],[70,112]],
             [[170,104],[160,140],[134,166],[98,170],[68,156],[52,128],[56,100],[74,84]]][s];
  const pts=[];for(let i=0;i<raw.length-1;i++){const p0=raw[Math.max(i-1,0)],p1=raw[i],p2=raw[i+1],p3=raw[Math.min(i+2,raw.length-1)];for(let t=0;t<1;t+=.25){const t2=t*t,t3=t2*t;pts.push([0,1].map(j=>.5*((2*p1[j])+(-p0[j]+p2[j])*t+(2*p0[j]-5*p1[j]+4*p2[j]-p3[j])*t2+(-p0[j]+3*p1[j]-3*p2[j]+p3[j])*t3)))}}
  pts.push(raw[raw.length-1]);
  const w0=T([34,36,38]),n=pts.length,wd=i=>w0*(1-.78*Math.pow(i/(n-1),1.15));
  const geo={pts,wd,s};const D=sp.deco?sp.deco(s,geo,P,mon):{};
  let o=D.back||'';
  const ds=[];for(let i=0;i<n-1;i++)ds.push(crCap(pts[i][0],pts[i][1],wd(i),pts[i+1][0],pts[i+1][1],wd(i+1)));
  // fins along the back
  let fins='';for(let i=4;i<n-2;i+=3){const p=pts[i],q=pts[i+1],dx=q[0]-p[0],dy=q[1]-p[1],l=Math.hypot(dx,dy)||1,nx=dy/l,ny=-dx/l,sg=ny<0?1:-1,w=wd(i)*.5,fx=p[0]+nx*sg*w,fy=p[1]+ny*sg*w,L=wd(i)*.8;
    fins+=crP(`M${cf(fx-dx/l*8)} ${cf(fy-dy/l*8)} Q${cf(fx+nx*sg*L*.6-dx/l*6)} ${cf(fy+ny*sg*L*.6-dy/l*6)} ${cf(fx+nx*sg*L-dx/l*16)} ${cf(fy+ny*sg*L-dy/l*16)} Q${cf(fx+nx*sg*L*.3+dx/l*4)} ${cf(fy+ny*sg*L*.3+dy/l*4)} ${cf(fx+dx/l*10)} ${cf(fy+dy/l*10)}Z`,sp.c.f||M,P,{back:1,sw:3.4,sh:.5})}
  o+=fins;
  // belly band on the underside
  let belly='';for(let i=0;i<n-1;i++){const p=pts[i],q=pts[i+1],dx=q[0]-p[0],dy=q[1]-p[1],l=Math.hypot(dx,dy)||1;let nx=-dy/l,ny=dx/l;if(ny<0){nx=-nx;ny=-ny}const w=wd(i);belly+=`<path d="${crCap(p[0]+nx*w*.32,p[1]+ny*w*.32,w*.55,q[0]+nx*wd(i+1)*.32,q[1]+ny*wd(i+1)*.32,wd(i+1)*.55)}" fill="${A}"/>`}
  o+=`<g class="cr-body">`+crP(ds,B,P,{inner:belly+(D.body||'')});
  const hx=pts[0][0]+4,hy=pts[0][1]-T([14,18,20]),k=T([1.05,.98,.95]);
  const Hd=crHeadBi({...sp,h:sp.h||'dragon'},s,P,mon);
  o+=`<g class="cr-head" style="transform-origin:${hx-8}px ${hy+20}px"><g transform="translate(${hx} ${hy}) scale(${k})">${D.hb||''}${Hd.behind}${Hd.head}${Hd.front}${D.head||''}${s>1&&!mon?crCrown(0,-22,26,M):''}</g></g>`+(D.front||'')+'</g>';
  return{wa:[pts[3][0],pts[3][1]-12],hasW:!!(D.wings||sp.plan==='serpent'&&sp.ev&&sp.ev[2]==='Skyquill'),svg:`<ellipse class="cr-gshadow" cx="118" cy="226" rx="${T([40,52,62])}" ry="6" fill="#000" opacity=".25"/><g class="cr-float">${o}</g>`,box:[Math.min(...raw.map(p=>p[0]))-26,hy-44*k-(D.top||0),hx+50*k,228],top:[hx,hy-34*k-(D.top||0)],float:1}}

/* ---------- shelled ---------- */
function crShell(sp,s,P,mon){const T=a=>a[s],G=228,c=sp.c,B=c.b,A=c.a,M=c.m,SH=c.s||M;
  const cx=T([116,114,112]),by=T([206,198,188]),W=T([46,58,70]),H=T([40,50,62]);
  const lw=T([17,20,24]);
  const hx=cx+W+T([14,16,18]),hy=by-T([18,20,24]),k=T([1.05,.98,.96]);
  const geo={cx,by,W,H,hx,hy,k,G,lw};const D=sp.deco?sp.deco(s,geo,P,mon):{};
  let o=D.back||'';
  if(sp.crab){
    // crab: eye stalks, claws and walking legs
    [[cx+W*.1,1],[cx-W*.35,1],[cx+W*.45,0],[cx-W*.1,0]].forEach(([x,b])=>{o+=crLimb([[x,by-6,9],[x+(x>cx?14:-14),by+4,8],[x+(x>cx?18:-18),G-4,6]],B,P,{back:b,sw:3.6})});
  }else{
    [[cx+W*.62,1],[cx-W*.45,1]].forEach(([x])=>{o+=crLimb([[x,by-8,lw],[x+3,G-6,lw*.9]],B,P,{back:1})+crPaw(x+5,G-3,lw,B,P,1,sp)});
    o+=crP(`M${cx-W+6} ${by-8} L${cx-W-14} ${by+2} L${cx-W+2} ${by+4}Z`,B,P,{sw:3.6});
    o+=crLimb([[cx+W*.86,by-12,lw*1.2],[hx-10,hy+10,lw*1.05]],B,P);}
  // head
  if(!sp.crab){const Hd=crHeadBi({...sp,h:sp.h||'otter'},s,P,mon);
    o+=`<g class="cr-head" style="transform-origin:${hx-14}px ${hy+14}px"><g transform="translate(${hx} ${hy}) scale(${k})">${D.hb||''}${Hd.behind}${Hd.head}${Hd.front}${D.head||''}</g></g>`}
  // shell dome
  const dome=`M${cx-W} ${by} C${cx-W} ${by-H*1.25} ${cx+W} ${by-H*1.25} ${cx+W} ${by} Q${cx} ${by+H*.22} ${cx-W} ${by}Z`;
  const rim=`M${cx-W-6} ${by+2} Q${cx} ${by+H*.36} ${cx+W+6} ${by+2} Q${cx} ${by+H*.12} ${cx-W-6} ${by+2}Z`;
  let pat=D.shell||'';
  if(!sp.crab&&!sp.noScute)pat+=[[-.45,-.42],[0,-.62],[.45,-.42],[-.2,-.12],[.25,-.12]].map(([u,v])=>{const x=cx+u*W,y=by+v*H,r=W*.17;return`<path d="M${cf(x-r)} ${cf(y)} L${cf(x-r*.5)} ${cf(y-r*.85)} L${cf(x+r*.5)} ${cf(y-r*.85)} L${cf(x+r)} ${cf(y)} L${cf(x+r*.5)} ${cf(y+r*.85)} L${cf(x-r*.5)} ${cf(y+r*.85)}Z" fill="${shade(SH,.12)}" stroke="${shade(SH,-.35)}" stroke-width="2"/>`}).join('');
  o+=`<g class="cr-body">`+crP(dome,SH,P,{inner:pat});
  if(!sp.crab)o+=crP(rim,A,P,{sw:3.6,sh:.4});
  // near legs in front of the shell rim
  if(!sp.crab)[[cx+W*.5],[cx-W*.6]].forEach(([x])=>{o+=crLimb([[x,by-2,lw*1.1],[x+2,G-6,lw]],B,P)+crPaw(x+5,G-3,lw*1.05,B,P,0,sp)});
  else{
    o+=crStroke(`M${cx+W*.3} ${by-H*.8} L${cx+W*.3} ${by-H-10} M${cx+W*.62} ${by-H*.7} L${cx+W*.62} ${by-H-6}`,c.b,4);
    o+=crStroke(`M${cx+W*.3} ${by-H*.8} L${cx+W*.3} ${by-H-10} M${cx+W*.62} ${by-H*.7} L${cx+W*.62} ${by-H-6}`,B,4);
    o+=crEye(cx+W*.3,by-H-16,7,{glow:mon||'#fff6a0'})+crEye(cx+W*.62,by-H-12,6,{glow:mon||'#fff6a0',sq:.7});
    [[cx+W*.82,by-H*.2,0],[cx+W*.98,by+2,1]].forEach(([x,y,b])=>{o+=crLimb([[x-8,y,12],[x+14,y-16,11]],B,P,{back:!b})+crP(`M${x+10} ${y-14} C${x+22} ${y-44} ${x+54} ${y-38} ${x+52} ${y-14} L${x+38} ${y-20} L${x+44} ${y-4} C${x+36} ${y+6} ${x+12} ${y+2} ${x+10} ${y-14}Z`,B,P,{back:!b})});
  }
  o+=D.front||'';o+='</g>';
  return{noW:1,svg:o,box:[cx-W-18,Math.min(by-H*1.0-(D.top||0),hy-40*k-(D.hTop||0)),sp.crab?cx+W+56:hx+44*k,G],top:[sp.crab?cx:cx,by-H*1.0-(D.top||0)]}}

/* ---------- winged sprites ---------- */
function crSprite(sp,s,P,mon){const T=a=>a[s],c=sp.c,B=c.b,A=c.a,M=c.m;
  const bx=120,by=T([150,138,124]),r=T([22,25,28]);
  const hx=bx+T([10,12,14]),hy=by-T([22,26,30]),R=T([22,22,22]);
  const geo={bx,by,r,hx,hy,R};const D=sp.deco?sp.deco(s,geo,P,mon):{};
  let o=`<ellipse class="cr-gshadow" cx="${bx}" cy="226" rx="${T([26,32,38])}" ry="5" fill="#000" opacity=".22"/><g class="cr-float">`+(D.back||'');
  const ws=T([.8,1,1.22]);
  const wing=sp.wing||'moth';
  const wingSet=(back)=>{const x=bx-4+(back?10:0),y=by-r*.5,g=back?1:0,cls=back?'cr-wing2':'cr-wing',z=ws*(back?.88:1);
    let w='';
    if(wing==='moth')w=crP(`M0 0 C-20 -36 -64 -66 -86 -48 C-96 -32 -70 -10 -40 -4 C-60 2 -76 20 -64 34 C-48 44 -20 24 0 6Z`,c.w||M,P,{back:g,inner:(sp.wfx?sp.wfx(s,P):'')});
    else if(wing==='bat')w=crP(`M0 0 C-14 -30 -40 -56 -78 -62 C-70 -50 -74 -40 -84 -32 C-70 -30 -66 -20 -70 -8 C-56 -12 -46 -4 -46 6 C-34 -2 -14 4 0 8Z`,c.w||M,P,{back:g,inner:`<path d="M0 2 L-78 -60 M-6 4 L-82 -32 M-8 6 L-68 -8" stroke="${shade(c.w||M,-.35)}" stroke-width="2" opacity=".7"/>`+(sp.wfx?sp.wfx(s,P):'')});
    else if(wing==='leaf')w=crP(`M0 0 C-24 -30 -60 -48 -88 -40 C-74 -18 -40 0 0 6Z`,c.w||M,P,{back:g,inner:`<path d="M0 3 C-30 -14 -56 -30 -84 -38" stroke="${shade(c.w||M,-.35)}" stroke-width="2.2" fill="none"/>`})+crP(`M0 6 C-24 4 -52 14 -64 34 C-38 34 -16 24 0 10Z`,c.w||M,P,{back:g,sh:.6});
    else if(wing==='clear')w=`<path d="M0 0 C-20 -40 -60 -64 -80 -50 C-88 -36 -56 -10 0 4Z M0 6 C-30 4 -66 16 -62 34 C-48 42 -20 26 0 10Z" fill="#fff" fill-opacity=".38" stroke="${CR_INK}" stroke-width="2.6" stroke-linejoin="round"/><path d="M0 2 C-24 -14 -48 -32 -72 -46 M0 8 C-24 12 -42 20 -58 30" stroke="#fff" stroke-width="1.4" opacity=".7" fill="none"/>`;
    if(!w)return'';
    return`<g class="${cls}" style="transform-origin:${x}px ${y}px"><g transform="translate(${x} ${y}) scale(${cf(z)}) ${back?'scale(-.62 1) rotate(-14)':''}">${w}</g></g>`};
  if(wing!=='none'){o+=wingSet(1);}
  // abdomen
  if(sp.abd)o+=crP(crCap(bx-r*.3,by+r*.3,r*1.5,bx-r*1.4,by+r*1.0,r*.9),sp.abd===1?B:sp.abd,P,{inner:sp.abdx?sp.abdx(bx,by,r,s):''});
  // body and head
  const ds=[crEll(bx,by,r,r*1.05),crEll(hx,hy,R,R*.94)];
  let inner=crP(crEll(bx+r*.35,by+r*.35,r*.7,r*.75),A,P,{noline:1,sh:.6});
  if(sp.ruff)inner+=crP(`M${hx-R} ${hy+R*.55} ${[0,1,2,3,4,5].map(i=>`Q${cf(hx-R+i*R*.42+R*.21)} ${cf(hy+R*1.2)} ${cf(hx-R+(i+1)*R*.42)} ${cf(hy+R*.6)}`).join(' ')} L${hx+R*1.4} ${hy+R*1.5} L${hx-R} ${hy+R*1.5}Z`,A,P,{noline:1,sh:.5});
  inner+=D.body||'';
  o+=`<g class="cr-body">`;
  if(sp.ghost){o+=crP(`M${bx-r*1.2} ${by-r*.6} Q${bx-r*1.3} ${hy-R*1.5} ${hx} ${hy-R*1.25} Q${hx+R*1.4} ${hy-R} ${hx+R*1.2} ${by} Q${hx+R} ${by+r*1.6} ${bx+r*.6} ${by+r*2.4} L${bx+r*.2} ${by+r*1.8} L${bx-r*.3} ${by+r*2.6} L${bx-r*.6} ${by+r*1.8} L${bx-r*1.2} ${by+r*2.3} Q${bx-r*1.4} ${by+r} ${bx-r*1.2} ${by-r*.6}Z`,B,P,{inner:`<path d="${crEll(hx+4,hy+4,R*.72,R*.6)}" fill="${CR_INK}" opacity=".9"/>`+(D.body||'')});
    o+=crEye(hx+R*.42,hy+2,6,{glow:mon||M,sq:.7})+crEye(hx-R*.05,hy+4,7.2,{glow:mon||M})}
  else if(sp.wisp){o+=`<g class="cr-flick">`+crP(`M${bx} ${by+r*1.2} C${bx-r*1.4} ${by+r} ${bx-r*1.3} ${by-r*.6} ${bx-r*.6} ${hy-R*.4} C${bx-r*.2} ${hy-R*1.1} ${bx-r*.6} ${hy-R*1.8} ${bx-r*.2} ${hy-R*2.4} C${bx+r*.8} ${hy-R*1.6} ${hx+R*1.2} ${hy-R*.8} ${hx+R} ${hy+R*.2} C${hx+R*.9} ${by+r*.4} ${bx+r} ${by+r*1.2} ${bx} ${by+r*1.2}Z`,B,P,{inner:`<path d="M${bx} ${by+r*.9} C${bx-r*.7} ${by+r*.5} ${bx-r*.6} ${by-r*.6} ${bx-r*.1} ${hy-R*.2} C${bx+r*.6} ${hy} ${hx+R*.5} ${hy+R*.6} ${bx+r*.6} ${by+r*.6}Z" fill="url(#${P}en)" opacity=".9"/>`})+'</g>';
    o+=crEye(hx+R*.38,hy+2,6,{glow:mon||'#fff',sq:.7})+crEye(hx-R*.1,hy+4,7,{glow:mon||'#fff'})}
  else{o+=crP(ds,B,P,{inner});
    let hd='';
    hd+=crEyes(sp,s,hx+R*.12,hy-R*.02,[10.5,9.6,8.8][s],R*.66,B,mon);
    hd+=`<path d="M${hx+R*.48} ${hy+R*.5} L${hx+R*.88} ${hy+R*.44}" stroke="${CR_INK}" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M${hx+R*.56} ${hy+R*.49} l1.4 4.6 l2.4 -4.8Z M${hx+R*.72} ${hy+R*.47} l1.4 4.6 l2.4 -4.8Z" fill="#fff" stroke="${CR_INK}" stroke-width="1.1"/>`;
    o+=`<g class="cr-head" style="transform-origin:${hx}px ${hy+R}px">${D.hb||''}${hd}${D.head||''}</g>`;
    o+=[0,1].map(i=>`<path d="M${cf(bx+r*.7+i*6)} ${cf(by+r*.7)} l${cf(4+i*2)} ${cf(10)} l3 -2" stroke="${shade(B,-.45)}" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`).join('');}
  if(wing!=='none')o+=wingSet(0);
  o+=(D.front||'')+'</g></g>';
  return{svg:o,box:[bx-90*ws,hy-R-(D.top||0)-10,hx+R+16,228],top:[hx,hy-R-(D.top||0)],float:1}}

/* ---------- blobs ---------- */
function crBlob(sp,s,P,mon){const T=a=>a[s],G=228,c=sp.c,B=c.b,A=c.a,M=c.m;
  const W=T([38,46,54]),H=T([66,84,102]),bx=120;
  const geo={bx,W,H,G};const D=sp.deco?sp.deco(s,geo,P,mon):{};
  let o=D.back||'';
  const d=`M${bx-W} ${G-4} C${bx-W*1.15} ${G-H*.55} ${bx-W*.55} ${G-H*.98} ${bx+4} ${G-H} C${bx+W*.6} ${G-H*.98} ${bx+W*1.15} ${G-H*.55} ${bx+W} ${G-4} C${bx+W*.6} ${G+2} ${bx+W*.3} ${G-6} ${bx} ${G-2} C${bx-W*.3} ${G+3} ${bx-W*.6} ${G-6} ${bx-W} ${G-4}Z`;
  const drips=[[-.7,10],[.35,14],[.8,8]].map(([u,l])=>`<path d="${crCap(bx+u*W,G-8,9,bx+u*W,G-8+l,7)}" fill="${B}"/>`).join('');
  o+=`<g class="cr-body cr-squish" style="transform-origin:${bx}px ${G}px">`+crP([d],B,P,{inner:`<path d="M${bx-W*.55} ${G-H*.62} Q${bx-W*.45} ${G-H*.86} ${bx-W*.12} ${G-H*.9}" stroke="#fff" stroke-width="${T([6,7,8])}" stroke-linecap="round" fill="none" opacity=".55"/><circle cx="${bx-W*.62}" cy="${G-H*.48}" r="3.4" fill="#fff" opacity=".5"/>`+(D.body||'')})+drips;
  const ey=G-H*.5,er=T([10.5,9.8,9]);
  const ge=mon||c.eg||'#b48bff';
  o+=crEye(bx+W*.42,ey-2,er*.68,{glow:ge,sq:.75})+crEye(bx+W*.02,ey,er*.82,{glow:ge});
  o+=mon?`<path d="M${bx+W*.05} ${ey+er*1.8} L${bx+W*.18} ${ey+er*1.45} L${bx+W*.3} ${ey+er*1.85} L${bx+W*.42} ${ey+er*1.45} L${bx+W*.52} ${ey+er*1.75}" stroke="${CR_INK}" stroke-width="2.6" fill="none" stroke-linejoin="round"/>`:`<path d="M${bx-W*.1} ${ey+er*1.4} Q${bx+W*.25} ${ey+er*2.6} ${bx+W*.62} ${ey+er*1.3} Q${bx+W*.25} ${ey+er*1.9} ${bx-W*.1} ${ey+er*1.4}Z" fill="#120c18" stroke="${CR_INK}" stroke-width="2"/>`+[0,1,2,3,4].map(i=>{const x=bx-W*.04+i*W*.13;return`<path d="M${cf(x)} ${cf(ey+er*1.55+Math.sin(i/4*Math.PI)*er*.25)} l3 7 l3 -7.4Z" fill="#efe8ff"/>`}).join('');
  if(s>1&&!mon)o+=crCrown(bx+4,G-H+6,W*.7,M);
  o+=(D.front||'')+'</g>';
  return{wa:[bx-W*.3,G-H*.7],svg:o,box:[bx-W-14-(D.left||0),G-H-(D.top||0),bx+W+14,G],top:[bx+4,G-H-(D.top||0)]}}

/* ================================================================
   SPECIES: one entry per collectible, with three evolution names.
   ================================================================ */
const crFlames=(pts,P,z)=>pts.map(([x,y,sc,rot])=>`<g transform="translate(${x} ${y}) rotate(${rot||0}) scale(${cf(sc*(z||1))})"><g class="cr-flick"><path d="M0 0 C-10 0 -14 -10 -10 -20 C-8 -14 -6 -12 -4 -12 C-6 -22 -2 -30 4 -38 C4 -28 10 -22 10 -12 C12 -16 14 -18 16 -20 C18 -8 12 0 0 0Z" fill="url(#${P}en)" stroke="${CR_INK}" stroke-width="2.6" stroke-linejoin="round"/></g></g>`).join('');
const crLeaf=(x,y,sc,rot,col,P)=>`<g transform="translate(${cf(x)} ${cf(y)}) rotate(${rot}) scale(${cf(sc)})">${crP(`M0 0 C6 -10 18 -14 30 -12 C24 -2 12 4 0 0Z`,col,P,{sw:3.2,sh:.4,inner:`<path d="M0 0 C10 -6 18 -9 28 -11" stroke="${shade(col,-.35)}" stroke-width="1.4" fill="none"/>`})}</g>`;
const crGem=(x,y,r,col)=>`<path d="M${x} ${y-r} L${x+r*.8} ${y} L${x} ${y+r} L${x-r*.8} ${y}Z" fill="${col}" stroke="${CR_INK}" stroke-width="2.4" stroke-linejoin="round"/><path d="M${x} ${y-r*.6} L${x+r*.35} ${y} L${x} ${y+r*.1}Z" fill="#fff" opacity=".7"/>`;
const crHorn=(pts,col)=>{const n=pts.match(/-?[\d.]+/g).map(Number);const x0=n[0],y0=n[1],x1=n[n.length-2],y1=n[n.length-1];const cx=n.length>4?n[2]:(x0+x1)/2,cy=n.length>4?n[3]:(y0+y1)/2;
  const dx=x1-x0,dy=y1-y0,l=Math.hypot(dx,dy)||1,w=Math.max(5,l*.18),nx=-dy/l*w,ny=dx/l*w;
  return`<path d="M${cf(x0+nx)} ${cf(y0+ny)} Q${cf(cx+nx*.6)} ${cf(cy+ny*.6)} ${cf(x1)} ${cf(y1)} Q${cf(cx-nx*.6)} ${cf(cy-ny*.6)} ${cf(x0-nx)} ${cf(y0-ny)}Z" fill="${col}" stroke="${CR_INK}" stroke-width="3" stroke-linejoin="round"/><path d="M${cf(x0+nx*.3)} ${cf(y0+ny*.3)} Q${cf(cx+nx*.25)} ${cf(cy+ny*.25)} ${cf(x1)} ${cf(y1)}" stroke="#fff" stroke-width="1.6" opacity=".45" fill="none"/>`};

const CR_SP={
 /* ---- FIRE ---- */
 ember:{plan:'bird',ev:['Embit','Emberwing','Pyrehawk'],c:{b:'#e0552e',a:'#ffd99a',m:'#ffb020',w:'#c9411f',t:'#ff9a2a',e:'#4a1e0e',k:'#ffcf3a',l:'#7a3a1c'},beak:'cone',
   tfx:(x,y,s,i,P)=>s?crFlames([[x,y+4,.55+s*.15,-60]],P):'',
   deco:(s,g,P)=>({head:crFlames([[g.hx-g.R*.2,g.hy-g.R*.8,[.55,.75,.95][s],-20],[g.hx-g.R*.7,g.hy-g.R*.5,[.4,.6,.8][s],-50]],P)})},
 cinder:{plan:'sprite',ev:['Ashmite','Cindermoth','Pyrelune'],wing:'moth',abd:1,ruff:1,c:{b:'#6e4b45',a:'#f1e3c8',m:'#ff7a2e',w:'#efe2c6',e:'#ff8a1f'},
   wfx:(s,P)=>`<path d="M-20 -14 H-66 M-22 -24 H-58 M-26 -34 H-50 M-14 12 H-50" stroke="#a99a80" stroke-width="2"/><circle cx="-52" cy="-30" r="${7+s*2}" fill="url(#${P}en)" stroke="${CR_INK}" stroke-width="2.2"/><circle cx="-38" cy="18" r="${5+s}" fill="#ff7a2e" stroke="${CR_INK}" stroke-width="2"/>`,
   deco:(s,g,P)=>({head:crStroke(`M${g.hx+4} ${g.hy-g.R*.8} Q${g.hx+10} ${g.hy-g.R*1.6} ${g.hx+24} ${g.hy-g.R*1.9}`,'#4a3430',3)+crStroke(`M${g.hx-8} ${g.hy-g.R*.85} Q${g.hx-14} ${g.hy-g.R*1.7} ${g.hx-2} ${g.hy-g.R*2.1}`,'#4a3430',3)+crFlames([[g.hx+24,g.hy-g.R*1.9,.32,30],[g.hx-2,g.hy-g.R*2.1,.32,-10]],P)+(s>1?crFlames([[g.hx-4,g.hy-g.R*.9,.6,-10]],P):''),top:22})},
 brandt:{plan:'shell',h:'lizard',ev:['Coalshell','Kilnback','Forgeback'],c:{b:'#b5603a',a:'#f0c08a',m:'#ff6a1f',s:'#4a3a3a',e:'#ffb000',p:'#7a3e26'},claw:1,noScute:1,
   deco:(s,g,P)=>{const{cx,by,W,H}=g;let sh=`<path d="M${cx-W*.6} ${by-H*.3} L${cx-W*.25} ${by-H*.62} L${cx+W*.1} ${by-H*.4} L${cx+W*.45} ${by-H*.7} M${cx-W*.2} ${by-H*.1} L${cx+W*.2} ${by-H*.2} L${cx+W*.6} ${by-H*.1}" stroke="#ff8a2a" stroke-width="3.4" fill="none" stroke-linecap="round"/><path d="M${cx-W*.6} ${by-H*.3} L${cx-W*.25} ${by-H*.62} L${cx+W*.1} ${by-H*.4} L${cx+W*.45} ${by-H*.7}" stroke="#ffe08a" stroke-width="1.4" fill="none"/>`;
     const vents=s?[[cx-W*.35,by-H*.92],[cx+W*.2,by-H*1.0]].slice(0,s):[];
     const v=vents.map(([x,y])=>crP(`M${x-12} ${y+8} L${x-7} ${y-8} L${x+7} ${y-8} L${x+12} ${y+8}Z`,'#3a2c2c',P,{sw:3.4})+crFlames([[x,y-6,.5+s*.15,0]],P)).join('');
     return{shell:sh,front:v,top:s?28:0}}},
 ashling:{plan:'biped',h:'lizard',tail:'lizard',ev:['Wickling','Lanternewt','Hearthwyrm'],bands:1,claw:1,c:{b:'#e8743a',a:'#ffe0a8',m:'#ffcc33',e:'#3a1a08'},
   deco:(s,g,P)=>{const tx=g.hipX-g.hr-[44,58,72][s],ty=g.G-[30,40,50][s];return{tailTip:crP(crEll(tx-4,ty-8,10+s*2,12+s*2),'#ffe9a8',P,{sw:3.6,inner:`<circle cx="${tx-4}" cy="${ty-8}" r="${7+s*2}" fill="url(#${P}en)"/>`})+crGlow(tx-4,ty-8,26+s*6,P,.7),
     head:s?crHorn(`M-6 -20 Q-20 -34 -34 -${30+s*6}`,'#ffe0a8'):'',body:s>1?crFlames([[g.chX-g.chr*.5,g.chY-g.chr*.7,.5,-30]],P):''}}},
 pyra:{plan:'quad',h:'fox',tail:'flame',ev:['Pyrakit','Pyrelynx','Pyraleon'],c:{b:'#e4572e',a:'#ffe6be',m:'#ff9f1c',i:'#ffb38a',e:'#5a2a00',p:'#7a2a14'},
   fm:s=>`<path d="M-8 -26 Q-2 -14 4 -26 Q2 -18 -2 -12 Q-6 -18 -8 -26Z" fill="#ffd166"/>`,
   deco:(s,g,P)=>({hb:s>1?crFlames([[-16,-14,1.25,-80],[-12,4,1.2,-100],[-14,-28,1.05,-55],[-16,18,1,-120]],P):s?crFlames([[-16,-10,.85,-80],[-14,6,.8,-105]],P):'',body:'',back:s?crFlames([[g.rx+14,g.ry-g.rr*1.0,.75+s*.15,-25],[(g.rx+g.cx)/2,g.cy-g.cr*.95,.7+s*.15,-15]].concat(s>1?[[g.cx-6,g.cy-g.cr*1.0,.7,-5]]:[]),P):'',top:s>1?18:0})},
 solenne:{plan:'bird',ev:['Sunnet','Solenne','Phoenara'],tl:1.5,tf:[[0,1],[-18,.92],[18,.85],[-32,.75],[30,.7]],c:{b:'#ff8a3d',a:'#ffe7a0',m:'#ffd23f',w:'#f26b2b',t:'#ffc23f',e:'#4a1a00',k:'#ffe066',l:'#a65a1a'},beak:'hook',
   tfx:(x,y,s,i)=>s?`<circle cx="${cf(x+(i%2?4:2))}" cy="${cf(y-4)}" r="${3+s*1.6}" fill="#ffe066" stroke="${CR_INK}" stroke-width="1.8"/><circle cx="${cf(x+(i%2?4:2))}" cy="${cf(y-4)}" r="${1.4+s*.6}" fill="#c0392b"/>`:'',
   deco:(s,g,P)=>({head:crFlames([[g.hx-g.R*.1,g.hy-g.R*.85,[.5,.7,.9][s],-15],[g.hx-g.R*.6,g.hy-g.R*.6,[.4,.6,.8][s],-45]].concat(s>1?[[g.hx-g.R,g.hy-g.R*.2,.7,-75]]:[]),P)+(s>1?`<ellipse cx="${g.hx-4}" cy="${g.hy-g.R-14}" rx="16" ry="5" fill="none" stroke="#ffe066" stroke-width="3"/>`:''),top:s>1?24:10})},
 ignatius:{plan:'biped',h:'dragon',tail:'lizard',ev:['Ignit','Ignadrake','Ignatius'],bands:1,claw:1,c:{b:'#c0392b',a:'#ffcf8a',m:'#ff9a1f',e:'#ffcc00',p:'#8a2a20'},
   deco:(s,g,P)=>{const tx=g.hipX-g.hr-[44,58,72][s],ty=g.G-[30,40,50][s];const wg=s>1?crP(`M${g.chX-6} ${g.chY-g.chr*.4} C${g.chX-30} ${g.chY-80} ${g.chX-70} ${g.chY-110} ${g.chX-110} ${g.chY-104} C${g.chX-96} ${g.chY-86} ${g.chX-98} ${g.chY-70} ${g.chX-108} ${g.chY-56} C${g.chX-90} ${g.chY-54} ${g.chX-86} ${g.chY-38} ${g.chX-92} ${g.chY-24} C${g.chX-70} ${g.chY-28} ${g.chX-46} ${g.chY-14} ${g.chX-16} ${g.chY}Z`,'#e35b2b',P,{back:1,inner:`<path d="M${g.chX-8} ${g.chY-g.chr*.3} L${g.chX-108} ${g.chY-102} M${g.chX-10} ${g.chY-10} L${g.chX-106} ${g.chY-56} M${g.chX-14} ${g.chY-4} L${g.chX-90} ${g.chY-26}" stroke="#5a1a10" stroke-width="3"/>`}):'';
     return{wings:wg?`<g class="cr-wing" style="transform-origin:${g.chX}px ${g.chY}px">${wg}</g>`:'',tailTip:crFlames([[tx-6,ty+2,.6+s*.25,-40]],P),
       head:crHorn(`M-4 -20 Q-18 ${-36-s*6} ${-30-s*6} ${-40-s*8}`,'#f3e3c3')+(s?crHorn(`M8 -22 Q2 ${-38-s*4} ${-6-s*4} ${-46-s*6}`,'#e8d4ae'):''),
       back:s?crFlames([[g.chX-g.chr*.75,g.chY-g.chr*.35,.5+s*.12,-50],[g.hipX-g.hr*.85,g.hipY-g.hr*.5,.45+s*.12,-60]],P):'',top:s>1?30:12}}},
 /* ---- WATER ---- */
 ripple:{plan:'serpent',h:'dragon',ev:['Ripplet','Ripplefin','Riptide'],c:{b:'#2f86d6',a:'#c6ecff',m:'#5ff0e6',f:'#5fd3f0',e:'#0b2a4a'},
   deco:(s,g,P)=>({head:crP(`M-14 -14 Q-36 -30 -52 -22 Q-38 -12 -22 -2Z`,'#5fd3f0',P,{sw:3.4,sh:.5})+(s?crP(`M-4 -22 Q-14 -46 -2 ${-56-s*6} Q4 -40 12 -22Z`,'#5fd3f0',P,{sw:3.4,sh:.5}):''),top:s?20:0})},
 marin:{plan:'quad',h:'wolf',tail:'leaf',tz:.85,ev:['Marfang','Tidemaw','Tidemarin'],c:{b:'#2b5f8f',a:'#bcdff0',m:'#3fb6e8',e:'#5fe3ff',p:'#16324e'},
   deco:(s,g,P)=>{const fin=(x,y,h,r)=>`<g transform="translate(${cf(x)} ${cf(y)}) rotate(${r})">${crP(`M-10 4 Q-6 ${-h*.7} 6 ${-h} Q4 ${-h*.4} 12 4Z`,'#3fb6e8',P,{sw:2.8,inner:`<path d="M-4 2 L4 ${-h*.8} M4 2 L7 ${-h*.6}" stroke="#bfefff" stroke-width="1.4" opacity=".8"/>`})}</g>`;
     return{back:fin(g.rx+12,g.ry-g.rr*.95,18+s*8,-20)+fin((g.rx+g.cx)/2,g.cy-g.cr*.95,22+s*9,-10)+(s>1?fin(g.cx-4,g.cy-g.cr*1.0,22,0):''),
       head:crP(`M-18 -14 Q-40 -22 -54 -12 Q-40 -6 -24 -2Z`,'#3fb6e8',P,{sw:2.8})+(s?crP(`M-4 -24 Q-10 -46 4 ${-58-s*6} Q8 -40 14 -22Z`,'#3fb6e8',P,{sw:2.8}):''),
       body:`<path d="M${g.rx+6} ${g.ry} q12 -6 24 0 q12 -6 24 0" stroke="#7fe0ff" stroke-width="2.4" fill="none" opacity=".8"/>`,top:s?24:8}}},
 coral:{plan:'shell',h:'lizard',ev:['Reeflet','Coralshell','Coralforte'],c:{b:'#5aa7c8',a:'#d9f4f6',m:'#ff7f8a',s:'#2f7fa6',e:'#08304a',p:'#3e7f9e'},
   deco:(s,g,P)=>{const{cx,by,W,H}=g;const br=(x,y,h,rot)=>`<g transform="translate(${cf(x)} ${cf(y)}) rotate(${rot})">${crStroke(`M0 0 L0 ${-h} M0 ${-h*.5} L${h*.35} ${-h*.85} M0 ${-h*.3} L${-h*.32} ${-h*.62}`,'#ff8a96',5)}</g>`;
     const list=[[cx-W*.3,by-H*.95,16,-10],[cx+W*.25,by-H*.98,20,12]].concat(s?[[cx-W*.65,by-H*.55,14,-40],[cx+W*.6,by-H*.62,16,35]]:[]).concat(s>1?[[cx,by-H*1.05,26,0]]:[]);
     return{front:list.map(q=>br(...q)).join(''),top:s>1?26:18}}},
 tide:{plan:'biped',h:'axolotl',tail:'leaf',tz:.9,ev:['Tidelet','Lyrifin','Tidelyric'],c:{b:'#7ccdf5',a:'#eaf8ff',m:'#3a86d6',e:'#103a6a',i:'#ff9ec0'},
   deco:(s,g,P)=>{const gill=(x,y,a,l)=>`<g transform="translate(${x} ${y}) rotate(${a})">${[.25,.5,.75].map(t=>crStroke(`M${-l*t} -2 l-6 -9 M${-l*t} 2 l-6 9`,'#ff8fb8',3.4)).join('')}${crP(crCap(0,0,10,-l,0,6),'#ff8fb8',P,{sw:3.2,sh:.4})}</g>`;
     const L=[24,30,36][s];
     return{hb:gill(-22,-14,-30,L)+gill(-26,0,-4,L)+gill(-22,13,24,L),head:s>1?crP(`M-10 -24 Q8 -50 34 -40 Q14 -32 4 -20Z`,'#3a86d6',P,{sw:3.4,sh:.5}):'',body:s?`<path d="M${g.chX-g.chr*.9} ${g.chY-g.chr*.6} q8 -14 18 -6 q8 -14 18 -4" stroke="#3a86d6" stroke-width="4" fill="none" stroke-linecap="round"/>`:'',top:s>1?18:4}}},
 frostine:{plan:'quad',h:'fox',tail:'ice',ev:['Frostkit','Frostine','Glacivane'],c:{b:'#d6ecff',a:'#ffffff',m:'#6cc4ff',i:'#9fd6ff',e:'#1f5fbf',p:'#9cc8ee'},
   deco:(s,g,P)=>{const sh=(x,y,h,r)=>crP(`M${x-5} ${y} L${x} ${y-h} L${x+6} ${y}Z`,'#a8dcff',P,{sw:3.2,sh:.4});
     return{back:s?[[g.rx+6,g.ry-g.rr*.9,14+s*4],[g.rx+24,g.ry-g.rr*1.05,18+s*5],[g.cx-14,g.cy-g.cr*1.0,16+s*5]].map(q=>sh(...q)).join(''):'',head:s?crP(`M-2 -26 L4 ${-50-s*10} L12 -24Z`,'#a8dcff',P,{sw:3.4,sh:.4,inner:`<path d="M4 -26 L5 ${-46-s*10}" stroke="#fff" stroke-width="1.6"/>`}):'',top:s?10+s*8:0}}},
 nerissa:{plan:'serpent',h:'dragon',ev:['Nerilet','Nerisea','Nerissa'],c:{b:'#3058b0',a:'#dbe8ff',m:'#9fc8ff',f:'#7fb0ff',e:'#e8f4ff'},
   deco:(s,g,P)=>{const t=g.pts[g.pts.length-1];return{front:crP(crEll(t[0],t[1]-6,8+s*2,8+s*2),'#fff4c4',P,{sw:3.4,inner:`<circle cx="${t[0]}" cy="${t[1]-6}" r="${5+s*2}" fill="url(#${P}en)"/>`})+crGlow(t[0],t[1]-6,24+s*6,P,.7),
     head:`<path d="M36 10 q14 8 22 22 M34 14 q10 12 10 26" stroke="#bcd6ff" stroke-width="2.4" fill="none" stroke-linecap="round"/>`+crP(`M-8 -20 Q-24 -46 -10 ${-58-s*6} Q-4 -40 8 -22Z`,'#9fc8ff',P,{sw:3.4,sh:.5})+(s>1?`<path d="M-2 -40 a12 12 0 1 0 14 -10 a9 9 0 1 1 -14 10Z" fill="#fff4c4" stroke="${CR_INK}" stroke-width="2.4"/>`:''),top:s?24:12}}},
 /* ---- WIND ---- */
 gale:{plan:'quad',h:'hare',tail:'leaf',tz:.75,ev:['Galeclaw','Galestrider','Galecrest'],c:{b:'#4f9a5e',a:'#c9eabb',m:'#2a6b3c',e:'#c4f25a',p:'#2a4a2e'},
   deco:(s,g,P)=>({back:crLeaf(g.cx-4,g.cy-g.cr*.95,.9+s*.25,-150,'#2a6b3c',P)+crLeaf(g.rx+20,g.ry-g.rr*1.0,.8+s*.2,-160,'#2a6b3c',P)+(s>1?crLeaf((g.rx+g.cx)/2,g.cy-g.cr,.9,-155,'#2a6b3c',P):''),
     body:`<path d="M${g.cx-g.cr*.4} ${g.cy-g.cr*.6} q10 6 4 18 M${g.rx+g.rr*.2} ${g.ry-g.rr*.6} q10 6 4 18" stroke="#d8ff80" stroke-width="2.6" fill="none" opacity=".85"/>`,
     head:crLeaf(-40,-40,.9+s*.2,-150,'#2a6b3c',P),top:[30,40,50][s]})},
 thistle:{plan:'sprite',ev:['Thornmite','Thistlefly','Thistlebloom'],wing:'leaf',abd:'#3f6b2c',abdx:(x,y,r,s)=>`<path d="M${x-r*1.6} ${y+r*1.3} L${x-r*2.6} ${y+r*1.9} L${x-r*1.9} ${y+r*1.1}Z" fill="#c77dff" stroke="#2a1a3a" stroke-width="2"/>`,c:{b:'#4f8a3a',a:'#86b860',m:'#3f7a2a',w:'#5a9a3e',e:'#c4f25a'},
   deco:(s,g,P)=>{const n=[5,7,9][s];let p='';for(let i=0;i<n;i++){const a=(-160+i*(140/(n-1)))*Math.PI/180,L=g.R*(1+.25*s);p+=`<path d="M${g.hx} ${g.hy-g.R*.6} L${cf(g.hx+Math.cos(a)*L)} ${cf(g.hy-g.R*.6+Math.sin(a)*L)}" stroke="#c77dff" stroke-width="${3+s}" stroke-linecap="round"/>`}
     return{hb:crStroke(`M${g.hx} ${g.hy-g.R*.6} L${g.hx} ${g.hy-g.R*.6}`,'#c77dff',1)+`<g>${p.replace(/stroke="#c77dff" stroke-width="(\d+)"/g,(m,w)=>`stroke="${CR_INK}" stroke-width="${+w+4}"`)}${p}</g>`,top:g.R*(.4+.25*s)+8}}},
 bramble:{plan:'quad',h:'deer',tail:'leaf',tz:.7,ev:['Bramblehorn','Bramblestag','Elderwood'],c:{b:'#5e4630',a:'#a8916c',m:'#3f7a3a',e:'#7dff9a',p:'#2e2218'},
   fm:s=>`<path d="M-8 -24 l5 6 l-5 6 l-5 -6Z" stroke="#8dffaf" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".95"/>`,
   deco:(s,g,P)=>{const sz=[.75,1.02,1.3][s];const ant=`<g transform="translate(-6 -22) scale(${sz})">${crStroke('M0 0 C-6 -24 6 -44 -10 -70 M-2 -26 C12 -34 18 -44 16 -58 M-5 -46 C-20 -52 -26 -62 -28 -74 M-8 -60 C2 -66 6 -74 4 -84','#3e2c1c',6.5)}</g><g transform="translate(12 -24) scale(${sz*.85})">${crStroke('M0 0 C2 -22 12 -40 4 -62 M3 -26 C16 -32 22 -40 24 -52 M6 -44 C-4 -50 -8 -58 -8 -66','#2e2016',5.5)}</g>`;
     const tips=s?crFlames([[-6+(-10)*sz,-22-70*sz,.42+s*.1,-10],[-6+16*sz,-22-58*sz,.36+s*.08,15],[-6-28*sz,-22-74*sz,.38+s*.08,-30]].concat(s>1?[[12+4*sz*.85,-24-62*sz*.85,.36,5]]:[]),P):'';
     const runes=`<path d="M${g.rx} ${g.ry-g.rr*.4} l10 -8 l10 8 l10 -8 M${g.cx-g.cr*.5} ${g.cy-g.cr*.5} l8 10 l-8 10" stroke="#8dffaf" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="${s?.95:.6}"/>`;
     const mantle=s>1?crP(`M${g.cx-g.cr*.9} ${g.cy-g.cr*.95} Q${g.cx} ${g.cy-g.cr*1.35} ${g.cx+g.cr*.9} ${g.cy-g.cr*.6} L${g.cx+g.cr*.7} ${g.cy+g.cr*.2} L${g.cx+g.cr*.3} ${g.cy-g.cr*.1} L${g.cx} ${g.cy+g.cr*.3} L${g.cx-g.cr*.4} ${g.cy-g.cr*.1} L${g.cx-g.cr*.9} ${g.cy+g.cr*.1}Z`,'#2f5a2c',P):'';
     return{hb:ant,head:tips,body:runes,mid:mantle,top:[60,90,118][s]}}},
 pip:{plan:'shell',h:'lizard',ev:['Burrshell','Thornshell','Thatchfort'],noScute:1,c:{b:'#c79a62',a:'#f4dfb6',m:'#6fae4a',s:'#8a5a2c',e:'#2a1a0a',p:'#8a6038'},
   deco:(s,g,P)=>{const{cx,by,W,H}=g;let sh='';for(let i=-3;i<=3;i++)sh+=`<path d="M${cx+i*W*.28} ${by-H*1.2} L${cx+i*W*.28+W*.5} ${by}" stroke="#6b4422" stroke-width="2"/><path d="M${cx+i*W*.28} ${by-H*1.2} L${cx+i*W*.28-W*.5} ${by}" stroke="#6b4422" stroke-width="2"/>`;
     const stem=crStroke(`M${cx+4} ${by-H*.92} q2 -10 10 -14`,'#6b4422',5)+crLeaf(cx+14,by-H*.92-14,.8+s*.2,-30,'#6fae4a',P)+(s?crLeaf(cx,by-H*.92-6,.7+s*.2,-150,'#5a9a3a',P):'');
     return{shell:sh,front:stem+(s>1?crLeaf(cx-W*.55,by-H*.7,1.1,-150,'#4f8f3a',P)+crLeaf(cx+W*.45,by-H*.75,1.1,-40,'#6fae4a',P):''),top:20+s*6}}},
 zephyra:{plan:'bird',ev:['Zephlet','Zephyrin','Zephyra'],tl:1.15,c:{b:'#45b071',a:'#e8ffe8',m:'#1f6b4a',w:'#2f8f5a',t:'#1f6b4a',e:'#5a3a00',k:'#f2c84b',l:'#d9a43a',hc:'#1f6b4a'},beak:'hook',
   deco:(s,g,P)=>({head:crP(`M${g.hx+g.R*.55} ${g.hy-g.R*.55} Q${g.hx} ${g.hy-g.R*1.25} ${g.hx-g.R*.9} ${g.hy-g.R*.55} Q${g.hx-g.R*1.6-s*8} ${g.hy-g.R*(.6+s*.25)} ${g.hx-g.R*2-s*12} ${g.hy-g.R*(.2+s*.3)} Q${g.hx-g.R*1.2} ${g.hy} ${g.hx-g.R*.95} ${g.hy+g.R*.35} Q${g.hx-g.R*.2} ${g.hy-g.R*.3} ${g.hx+g.R*.55} ${g.hy-g.R*.55}Z`,'#1f6b4a',P,{sw:3.6,sh:.6})+`<path d="M${g.hx+g.R*.5} ${g.hy+g.R*.2} q-6 10 -16 12" stroke="#1f6b4a" stroke-width="5" stroke-linecap="round"/>`,top:4})},
 oakhart:{plan:'biped',h:'bear',tail:'leaf',tz:.6,ev:['Barkling','Oakhart','Elderoak'],claw:1,c:{b:'#4e3624',a:'#7a5a3c',m:'#3f7a3a',e:'#7dff9a',n:'#1a120c',p:'#2e2016'},
   deco:(s,g,P)=>{const plate=(x,y,w,r)=>`<g transform="translate(${cf(x)} ${cf(y)}) rotate(${r})">${crP(`M${-w} 0 L${-w*.6} ${-w*.9} L${w*.6} ${-w*.9} L${w} 0 L${w*.4} ${w*.5} L${-w*.4} ${w*.5}Z`,'#6b4a2e',P,{sw:2.8,inner:`<path d="M${-w*.5} ${-w*.4} L${w*.5} ${-w*.4}" stroke="#2e2016" stroke-width="1.6"/>`})}</g>`;
     const br=`<g transform="scale(${[.7,.95,1.2][s]})">${crStroke('M-12 -20 C-18 -40 -10 -52 -22 -66 M-16 -42 C-28 -46 -32 -54 -34 -62 M8 -24 C10 -44 20 -54 14 -70 M12 -46 C22 -50 26 -56 28 -64','#3a281a',5.5)}</g>`;
     const tips=s?crFlames([[-22*[.7,.95,1.2][s],-66*[.7,.95,1.2][s],.4+s*.08,-10],[14*[.7,.95,1.2][s],-70*[.7,.95,1.2][s],.4+s*.08,10]],P):'';
     return{hb:br,head:tips+`<path d="M-6 -24 l4 6 l-4 6 l-4 -6Z" fill="none" stroke="#8dffaf" stroke-width="2.2"/>`,
       body:`<path d="M${g.chX-g.chr*.3} ${g.chY-g.chr*.3} l8 14 l-6 10 l8 16 M${g.hipX+g.hr*.2} ${g.hipY-g.hr*.6} l-6 12 l6 8" stroke="#8dffaf" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity=".9"/>`,
       mid:plate(g.chX+g.chr*.55,g.chY-g.chr*.55,10+s*3,20)+(s?plate(g.chX-g.chr*.5,g.chY-g.chr*.75,9+s*3,-15):''),top:[44,62,84][s]}}},
 aeris:{plan:'serpent',h:'dragon',ev:['Aerlet','Aerisoar','Skyquill'],c:{b:'#a6e8cf',a:'#ffffff',m:'#ffd166',f:'#f6f8ff',e:'#1a6a5a'},
   deco:(s,g,P)=>{const p=g.pts[2],w=[30,40,52][s];const wing=dir=>crP(`M${p[0]} ${p[1]-6} C${p[0]-10} ${p[1]-w} ${p[0]-w} ${p[1]-w*1.4} ${p[0]-w*1.5} ${p[1]-w*1.2} C${p[0]-w*1.2} ${p[1]-w*.9} ${p[0]-w*1.3} ${p[1]-w*.7} ${p[0]-w*1.4} ${p[1]-w*.5} C${p[0]-w} ${p[1]-w*.4} ${p[0]-w*.8} ${p[1]-w*.2} ${p[0]-w*.7} ${p[1]} Z`,'#f6f8ff',P,{back:dir,inner:`<path d="M${p[0]-w*.3} ${p[1]-w*.5} L${p[0]-w*1.3} ${p[1]-w*1.1} M${p[0]-w*.3} ${p[1]-w*.25} L${p[0]-w*1.2} ${p[1]-w*.6}" stroke="#c9d6e8" stroke-width="2"/>`});
     return{back:`<g class="cr-wing2" style="transform-origin:${p[0]}px ${p[1]}px" transform="translate(14 -4)">${wing(1)}</g>`,mid:'',front:`<g class="cr-wing" style="transform-origin:${p[0]}px ${p[1]}px">${wing(0)}</g>`,
       head:crP(`M-10 -18 Q-30 -40 -50 ${-40-s*8} Q-34 -26 -20 -6Z`,'#ffd166',P,{sw:3.4,sh:.5})+crP(`M0 -22 Q-10 -44 -26 ${-56-s*6} Q-12 -36 6 -20Z`,'#ffe9a6',P,{sw:3.4,sh:.5}),top:w*1.4-20}}},
 /* ---- LIGHT ---- */
 lumi:{plan:'sprite',ev:['Lumen','Lumenwing','Lumiere'],wing:'clear',abd:'#f7e27a',c:{b:'#c99a2a',a:'#f5e2a0',m:'#fff7a8',e:'#ffe55c'},
   abdx:(x,y,r,s)=>`<path d="M${x-r*.5} ${y+r*.55} L${x-r*2.4} ${y+r*1.5} L${x-r*.9} ${y+r*1.25}Z" fill="#fff4b0" stroke="#5a4210" stroke-width="2"/><circle cx="${x-r*1.25}" cy="${y+r}" r="${r*.7}" fill="url(#plumi${s}en)"/><path d="M${x-r*.6} ${y+r*.4} l-4 10 M${x-r*1.1} ${y+r*.5} l-4 10 M${x-r*1.6} ${y+r*.7} l-4 10" stroke="#5a4210" stroke-width="2.4"/>`,
   deco:(s,g,P)=>({back:crGlow(g.bx-g.r*1.4,g.by+g.r,g.r*(2+s*.5),P,.9),
     head:crStroke(`M${g.hx-2} ${g.hy-g.R*.8} Q${g.hx-14} ${g.hy-g.R*1.6} ${g.hx-30} ${g.hy-g.R*1.7}`,'#5a4210',2.4)+crStroke(`M${g.hx+6} ${g.hy-g.R*.85} Q${g.hx-4} ${g.hy-g.R*1.8} ${g.hx-18} ${g.hy-g.R*2.1}`,'#5a4210',2.4)+
       crP(`M${g.hx-g.R*.7} ${g.hy-g.R*.55} L${g.hx-g.R*.3} ${g.hy-g.R*(1.4+s*.25)} L${g.hx} ${g.hy-g.R*.75} L${g.hx+g.R*.35} ${g.hy-g.R*(1.3+s*.25)} L${g.hx+g.R*.6} ${g.hy-g.R*.6}Z`,'#ffe680',P,{sw:2.6})+(s>1?`<ellipse cx="${g.hx}" cy="${g.hy-g.R*2-4}" rx="20" ry="5" fill="none" stroke="#ffe066" stroke-width="3.4" class="cr-glowpulse"/>`:''),
     top:30+s*8})},
 halo:{plan:'bird',ev:['Wrenlet','Halowren','Haloharrier'],c:{b:'#dcc490',a:'#fff6e0',m:'#ffe066',w:'#bfa46a',t:'#a68a52',e:'#3a2a10',k:'#f2b33d',l:'#a07a3a'},beak:'cone',
   deco:(s,g,P)=>({head:`<ellipse cx="${g.hx-2}" cy="${g.hy-g.R-8-s*2}" rx="${14+s*4}" ry="${4+s}" fill="none" stroke="${CR_INK}" stroke-width="6"/><ellipse class="cr-glowpulse" cx="${g.hx-2}" cy="${g.hy-g.R-8-s*2}" rx="${14+s*4}" ry="${4+s}" fill="none" stroke="#ffe680" stroke-width="3"/>`+crP(`M${g.hx-g.R*.3} ${g.hy-g.R*.8} Q${g.hx-g.R*.8} ${g.hy-g.R*1.5} ${g.hx-g.R*1.3} ${g.hy-g.R*1.2} Q${g.hx-g.R*.9} ${g.hy-g.R} ${g.hx-g.R*.7} ${g.hy-g.R*.5}Z`,'#bfa46a',P,{sw:3.2,sh:.5}),top:16+s*2})},
 solk:{plan:'quad',h:'lion',tail:'tuft',ev:['Solcub','Solkade','Solgryph'],c:{b:'#f0b43c',a:'#fff0c8',m:'#ff8a00',i:'#ffd27a',e:'#5a2a00',p:'#c47a1a'},
   deco:(s,g,P)=>{const n=12,R1=[30,42,48][s],R2=[22,30,34][s];let pts='';for(let i=0;i<n*2;i++){const a=i/(n*2)*Math.PI*2,r=i%2?R2:R1;pts+=`${cf(-6+Math.cos(a)*r)} ${cf(2+Math.sin(a)*r)} `}
     const mane=crP(`M${pts}Z`,s?'#ff9a1f':'#f7c45a',P,{sw:3.8,inner:`<circle cx="-6" cy="2" r="${R2}" fill="#ffd166" opacity=".55"/>`});
     const wg=s>1?crP(`M${g.cx-10} ${g.cy-g.cr*.8} C${g.cx-30} ${g.cy-70} ${g.cx-70} ${g.cy-100} ${g.cx-104} ${g.cy-96} C${g.cx-92} ${g.cy-82} ${g.cx-96} ${g.cy-70} ${g.cx-104} ${g.cy-60} C${g.cx-88} ${g.cy-58} ${g.cx-90} ${g.cy-44} ${g.cx-98} ${g.cy-34} C${g.cx-74} ${g.cy-34} ${g.cx-50} ${g.cy-20} ${g.cx-30} ${g.cy-g.cr*.2}Z`,'#fff0c8',P,{inner:`<path d="M${g.cx-26} ${g.cy-40} L${g.cx-96} ${g.cy-90} M${g.cx-30} ${g.cy-24} L${g.cx-94} ${g.cy-58}" stroke="#d9b56a" stroke-width="2"/>`}):'';
     return{hb:mane,wings:wg?`<g class="cr-wing" style="transform-origin:${g.cx}px ${g.cy}px">${wg}</g>`:'',top:s>1?20:8}}},
 seraphine:{plan:'quad',h:'drake',tail:'tuft',ev:['Serakin','Seraphine','Seraphiel'],c:{b:'#efe6d4',a:'#ffffff',m:'#ffd23f',e:'#ffe55c',p:'#c9a33a'},
   deco:(s,g,P)=>{const wg=s?crP(`M${g.cx-10} ${g.cy-g.cr*.8} C${g.cx-30} ${g.cy-60-s*14} ${g.cx-64-s*8} ${g.cy-92-s*16} ${g.cx-100-s*10} ${g.cy-90-s*14} C${g.cx-88} ${g.cy-76} ${g.cx-92} ${g.cy-64} ${g.cx-100} ${g.cy-54} C${g.cx-84} ${g.cy-52} ${g.cx-86} ${g.cy-40} ${g.cx-94} ${g.cy-30} C${g.cx-70} ${g.cy-30} ${g.cx-48} ${g.cy-18} ${g.cx-28} ${g.cy-g.cr*.2}Z`,'#fffaf0',P,{inner:`<path d="M${g.cx-26} ${g.cy-40} L${g.cx-96} ${g.cy-86} M${g.cx-30} ${g.cy-24} L${g.cx-92} ${g.cy-54}" stroke="#e0cfa0" stroke-width="2"/>`}):'';
     const mane=crFlames([[g.cx-g.cr*.3,g.cy-g.cr*.9,.6+s*.15,-20],[g.cx+g.cr*.3,g.cy-g.cr*1.0,.65+s*.15,0],[(g.rx+g.cx)/2,g.ry-g.rr*1.0,.5+s*.15,-30]],P);
     return{back:mane,wings:wg?`<g class="cr-wing" style="transform-origin:${g.cx}px ${g.cy}px">${wg}</g>`:'',
       head:crHorn(`M-4 -20 Q-4 ${-44-s*10} 8 ${-60-s*14}`,'#ffd23f')+crFlames([[-20,-18,.55+s*.12,-80],[-22,0,.5+s*.12,-100]],P)+(s>1?`<ellipse cx="-6" cy="-${84}" rx="18" ry="5" fill="none" stroke="#ffe066" stroke-width="3.4" class="cr-glowpulse"/>`:''),
       body:`<path d="M${g.cx-g.cr*.2} ${g.cy-g.cr*.4} l8 8 l-8 8 l8 8" stroke="#ffd23f" stroke-width="2.6" fill="none" stroke-linejoin="round"/>`,top:[40,54,74][s]}}},
 aurelius:{plan:'shell',h:'lizard',ev:['Aurelet','Aurelion','Aurelius'],c:{b:'#e8c46a',a:'#fff3c4',m:'#ffffff',s:'#d7a630',e:'#4a2a00',p:'#b88a2a',i:'#fff3c4',n:'#5a3a10'},noScute:1,
   deco:(s,g,P)=>{const{cx,by,W,H}=g;const rays=[-.6,-.3,0,.3,.6].map(u=>`<path d="M${cx+u*W*.9} ${by-H*.15} L${cx+u*W*1.0} ${by-H*.95}" stroke="#fff3c4" stroke-width="3" opacity=".8"/>`).join('');
     const sp=s?[[-.55,22],[0,30],[.55,22]].slice(0,s>1?3:1).map(([u,h])=>crP(`M${cx+u*W-7} ${by-H*.86+Math.abs(u)*10} L${cx+u*W} ${by-H*.86-h+Math.abs(u)*10} L${cx+u*W+7} ${by-H*.86+Math.abs(u)*10}Z`,'#fff3c4',P,{sw:3.2,sh:.5})).join(''):'';
     return{shell:rays+crGem(cx,by-H*.55,10+s*2,'#ffffff'),front:sp,head:s?crHorn(`M-8 -20 C-30 -30 -34 -6 -18 -2 C-8 0 -8 -10 -14 -12`,'#fff3c4'):'',top:s?(s>1?34:24):0}}},
 /* ---- DARK ---- */
 umbra:{plan:'quad',h:'cat',tail:'smoke',ev:['Umbrakit','Umbracat','Umbralynx'],c:{b:'#3d3060',a:'#7d6bb3',m:'#b388ff',i:'#9a7ad8',e:'#c8ff4f',p:'#2a2045'},
   fm:s=>`<path d="M-4 -26 L0 -16 L4 -26" stroke="#b388ff" stroke-width="3" fill="none"/>`,
   deco:(s,g,P)=>({body:[0,1,2].map(i=>`<path d="M${g.rx+8+i*18} ${g.ry-g.rr} q4 10 0 18" stroke="#b388ff" stroke-width="3.4" fill="none" stroke-linecap="round" opacity=".85"/>`).join(''),head:s?`<path d="M-24 -40 q-6 -14 4 -22 M10 -44 q4 -12 -4 -20" stroke="#b388ff" stroke-width="3" fill="none" opacity=".9"/>`:'',back:s>1?crTail('smoke',g.rx-g.rr*.6,g.ry-g.rr*.2,.9,{c:{b:'#2a2045',m:'#b388ff'}},P,s):''})},
 grim:{plan:'blob',ev:['Blotmaw','Grim Ink','Grimwell'],c:{b:'#2e2545',a:'#5b4a8a',m:'#9b7bff',e:'#7a5aff',eg:'#c9a6ff'},
   deco:(s,g,P)=>{const{bx,W,H,G}=g;const q=(x,y,a)=>`<g transform="translate(${x} ${y}) rotate(${a})">${crStroke('M0 0 L0 -26','#e8e2d0',4)}${crP(`M-6 -24 L0 -44 L6 -24Z`,'#5b4a8a',P,{sw:3})}</g>`;
     return{back:s?q(bx-W*.3,G-H*.86,-24)+(s>1?q(bx+W*.25,G-H*.9,18):''):'',front:s>1?crP(`M${bx-W*.7} ${G-H*.3} q-30 -10 -34 18 q10 -6 20 0`,'#2e2545',P,{sw:3.6})+crP(`M${bx-W*.9} ${G-12} C${bx-W*1.2} ${G-16} ${bx-W*1.3} ${G-2} ${bx-W*1.2} ${G}Z`,'#2e2545',P,{sw:3}):'',top:s?(s>1?40:30):0,left:s>1?30:0}}},
 nyx:{plan:'sprite',ev:['Nyxling','Nyxwing','Nyxscript'],wing:'bat',c:{b:'#33204f',a:'#6a4a98',m:'#ffe066',w:'#4a2c78',e:'#ffe066',eg:'#ff4f9a'},
   wfx:s=>s?`<circle cx="-50" cy="-30" r="2.4" fill="#ffe066"/><circle cx="-34" cy="-16" r="1.8" fill="#ffe066"/><circle cx="-64" cy="-44" r="1.8" fill="#ffe066"/>`:'',
   deco:(s,g,P)=>({head:crHorn(`M${g.hx-g.R*.5} ${g.hy-g.R*.7} Q${g.hx-g.R*.9} ${g.hy-g.R*(1.5+s*.25)} ${g.hx-g.R*(1.6+s*.3)} ${g.hy-g.R*(1.7+s*.3)}`,'#c9b6e8')+crHorn(`M${g.hx+g.R*.2} ${g.hy-g.R*.85} Q${g.hx+g.R*.1} ${g.hy-g.R*(1.6+s*.25)} ${g.hx-g.R*.4} ${g.hy-g.R*(1.9+s*.3)}`,'#a996cc')+`<path d="M${g.hx-g.R*.1} ${g.hy-g.R*.55} l2 -5 l2 5 l5 1 l-5 2 l-2 5 l-2 -5 l-5 -2Z" fill="#ffe066"/>`+(s>1?crFlames([[g.hx-g.R*(1.6+s*.3),g.hy-g.R*(1.7+s*.3),.35,-40],[g.hx-g.R*.4,g.hy-g.R*(1.9+s*.3),.35,-10]],P):''),top:g.R*(1.2+s*.3)})},
 morrow:{plan:'bird',ev:['Morrowling','Morrow','Morrowraven'],tl:1.1,c:{b:'#2e2c40',a:'#6a6488',m:'#b9f27c',w:'#24223a',t:'#1c1a2e',e:'#b9f27c',k:'#4a4560',l:'#4a4560',wa:'#3a3656'},beak:'long',
   deco:(s,g,P)=>{const lx=g.cx+g.cr*.4,ly=g.cy+g.cr*.9;return{front:s?crStroke(`M${g.cx+g.cr*.6} ${g.cy+g.cr*.4} q8 6 6 16`,'#4a4560',3)+crP(`M${lx-8} ${ly+8} L${lx-6} ${ly+30} L${lx+12} ${ly+30} L${lx+14} ${ly+8}Z`,'#4a4560',P,{sw:3.2,inner:`<rect x="${lx-4}" y="${ly+12}" width="14" height="14" fill="url(#${P}en)"/>`})+crGlow(lx+3,ly+20,22,P,.8):'',
     head:crP(`M${g.hx-g.R*.4} ${g.hy-g.R*.85} Q${g.hx-g.R*.9} ${g.hy-g.R*1.4-s*6} ${g.hx-g.R*1.5} ${g.hy-g.R*1.1} Q${g.hx-g.R} ${g.hy-g.R*.9} ${g.hx-g.R*.8} ${g.hy-g.R*.5}Z`,'#24223a',P,{sw:3.2,sh:.5}),top:12+s*4}}},
 vesper:{plan:'biped',h:'dragon',tail:'lizard',ev:['Vespet','Vespire','Vesper'],bands:1,claw:1,c:{b:'#352a55',a:'#8a74c9',m:'#ff4f8b',e:'#ff4f8b',p:'#241c3c'},
   deco:(s,g,P)=>{const wg=s?crP(`M${g.chX-6} ${g.chY-g.chr*.4} C${g.chX-30} ${g.chY-60-s*20} ${g.chX-60-s*10} ${g.chY-90-s*20} ${g.chX-96-s*14} ${g.chY-86-s*18} C${g.chX-84} ${g.chY-70-s*10} ${g.chX-88} ${g.chY-56-s*8} ${g.chX-98-s*8} ${g.chY-44-s*6} C${g.chX-80} ${g.chY-44} ${g.chX-78} ${g.chY-30} ${g.chX-84} ${g.chY-18} C${g.chX-62} ${g.chY-22} ${g.chX-42} ${g.chY-10} ${g.chX-16} ${g.chY}Z`,'#4a3a78',P,{back:1,inner:`<path d="M${g.chX-8} ${g.chY-g.chr*.3} L${g.chX-96-s*14} ${g.chY-84-s*18} M${g.chX-10} ${g.chY-8} L${g.chX-96-s*8} ${g.chY-44-s*6}" stroke="#ff4f8b" stroke-width="2.4" opacity=".8"/>`}):'';
     return{wings:wg?`<g class="cr-wing" style="transform-origin:${g.chX}px ${g.chY}px">${wg}</g>`:'',head:crHorn(`M-2 -20 Q-14 ${-40-s*8} ${-36-s*8} ${-46-s*10}`,'#d8cfee')+(s>1?crHorn('M10 -22 Q8 -44 -6 -58','#b8aee0'):''),
       body:`<path d="M${g.chX-g.chr*.7} ${g.chY-g.chr*.5} q-6 14 2 26" stroke="#ff4f8b" stroke-width="3" fill="none" opacity=".8"/>`,top:s>1?36:16}}},
};
/* wild monsters: same art, with glowing ink-corrupted eyes and an ink puddle */
const CR_MON={
 slime:{plan:'blob'},
 wolf:{plan:'quad',h:'wolf',tail:'brush'},
 treant:{plan:'biped',h:'treant',brute:1,bark:1},
 owl:{plan:'bird',beak:'hook',owl:1,fold:1},
 imp:{plan:'biped',h:'imp',tail:'tuft',claw:1},
 drake:{plan:'quad',h:'drake',tail:'flame',heavy:1,drakeWings:1},
 golem:{plan:'biped',h:'golem',brute:1},
 crab:{plan:'shell',crab:1},
 wisp:{plan:'sprite',wisp:1,wing:'none'},
 specter:{plan:'sprite',ghost:1,wing:'none'},
 inkling:{plan:'blob',inky:1},
 papergolem:{plan:'biped',h:'paper',brute:1},
};
const CR_PLAN={quad:crQuad,biped:crBiped,bird:crBird,serpent:crSerpent,shell:crShell,sprite:crSprite,blob:crBlob};

/* assemble one creature; returns {art, box, top} */
function crBuild(sp,s,P,el,mon){CRN=0;CRP=P;CRG={};CRRIM=CR_EN[el][1];
  const r=CR_PLAN[sp.plan](sp,s,P,mon);
  const ink=mon?`<g opacity=".9"><ellipse cx="${cf((r.box[0]+r.box[2])/2)}" cy="226" rx="${cf((r.box[2]-r.box[0])*.42)}" ry="7" fill="#120d1c"/>${[[-.3,9],[.1,6],[.35,8]].map(([u,rr])=>`<circle cx="${cf((r.box[0]+r.box[2])/2+u*(r.box[2]-r.box[0]))}" cy="${cf(228+rr*.2)}" r="${rr*.6}" fill="#120d1c"/>`).join('')}</g>`:'';
  let pre='',post='';
  if(!mon&&s>0){const b=r.box,cx=(b[0]+b[2])/2,cy=(b[1]+228)/2,w=b[2]-b[0],h=228-b[1],en=CR_EN[el];
    pre+=`<ellipse cx="${cf(cx)}" cy="${cf(cy)}" rx="${cf(w*(s>1?.62:.45))}" ry="${cf(h*(s>1?.6:.42))}" fill="url(#${P}gl)" opacity="${s>1?.55:.3}"/>`;
    if(s>1){pre+=`<g class="cr-spin" style="transform-origin:${cf(cx)}px 222px"><ellipse cx="${cf(cx)}" cy="222" rx="${cf(w*.5)}" ry="${cf(w*.11)}" fill="none" stroke="${en[1]}" stroke-width="2.4" stroke-dasharray="10 6 2 6" opacity=".85"/><ellipse cx="${cf(cx)}" cy="222" rx="${cf(w*.38)}" ry="${cf(w*.08)}" fill="none" stroke="${en[0]}" stroke-width="1.6" stroke-dasharray="3 5" opacity=".8"/></g>`;
      if(!r.hasW&&!r.noW&&r.wa)pre+=crEWings(r.wa[0],r.wa[1],el,P,Math.min(1.15,Math.max(.8,h/150)));
      post+=`<g class="cr-orbit">${[[-.52,.3,7],[.5,.18,6],[-.36,-.08,5],[.42,.62,5]].map(([u,v,z],i)=>{const x=cx+u*w,y=b[1]+v*h+20;return crGlow(x,y,z*3,P,.9)+`<path d="M${cf(x)} ${cf(y-z*1.5)} L${cf(x+z*.75)} ${cf(y)} L${cf(x)} ${cf(y+z*1.5)} L${cf(x-z*.75)} ${cf(y)}Z" fill="${en[0]}" stroke="${shade(en[2],-.2)}" stroke-width="1.6" class="cr-glowpulse" style="animation-delay:-${i*.5}s"/>`}).join('')}</g>`;
      if(!r.hasW&&!r.noW&&r.wa){const z=Math.min(1.15,Math.max(.8,h/150));r.box[1]=Math.min(r.box[1],r.wa[1]-112*z);r.box[0]=Math.min(r.box[0],r.wa[0]-60*z)}}}
  return{art:crDefs(P,el)+ink+`<g class="cr-all">${pre}${r.svg}${post}</g>`,box:r.box,top:r.top,float:r.float}}
function crCrown(x,y,w,gem){const h=w*.9;return`<path d="M${cf(x-w/2)} ${cf(y)} L${cf(x-w*.5)} ${cf(y-h*.55)} L${cf(x-w*.25)} ${cf(y-h*.3)} L${cf(x)} ${cf(y-h)} L${cf(x+w*.25)} ${cf(y-h*.3)} L${cf(x+w*.5)} ${cf(y-h*.55)} L${cf(x+w/2)} ${cf(y)}Z" fill="${CR_GOLD}" stroke="#6a4a10" stroke-width="2" stroke-linejoin="round"/><path d="M${cf(x-w*.4)} ${cf(y-h*.12)} L${cf(x+w*.4)} ${cf(y-h*.12)}" stroke="#fff3c0" stroke-width="1.4" opacity=".7"/>`+crGem(cf(x),cf(y-h*.45),cf(w*.13),gem)}
function crPlate(x,y,w,r,gem,P){return`<g transform="translate(${cf(x)} ${cf(y)}) rotate(${r})">${crP(`M${-w} ${w*.2} Q${-w} ${-w*.8} 0 ${-w*.9} Q${w} ${-w*.8} ${w} ${w*.2} Q0 ${w*.6} ${-w} ${w*.2}Z`,CR_GOLD,P,{sw:2.4,inner:`<path d="M${-w*.75} ${-w*.1} Q0 ${w*.25} ${w*.75} ${-w*.1}" stroke="#7a5a18" stroke-width="1.6" fill="none"/>`})}${crGem(0,cf(-w*.35),cf(w*.28),gem)}</g>`}
/* great wings of pure element energy for final forms */
function crEWings(x,y,el,P,z){const en=CR_EN[el];let w='';
  const fan=(back)=>[0,1,2,3,4,5].map(i=>crRibbon(x,y,(108-i*9)*z*(back?.88:1),282-i*15+(back?-8:0),19*z*(1-i*.06),5,back?en[2]:crMix(en[1],en[0],i*.08),P,{back,ph:i*.5})).join('');
  w+=crGlow(x-20*z,y-70*z,70*z,P,.6);
  return w+`<g class="cr-wing2" style="transform-origin:${cf(x)}px ${cf(y)}px" transform="translate(14 -2)">${fan(1)}</g><g class="cr-wing" style="transform-origin:${cf(x)}px ${cf(y)}px">${fan(0)}</g>`}
/* final-form palette: deeper, richer body colours and energised manes */
function crMix(a,b,t){const p=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16));const A=p(a),B=p(b);return'#'+A.map((v,i)=>Math.round(v+(B[i]-v)*t).toString(16).padStart(2,'0')).join('')}
const CR_DEEP={fire:'#6a0f14',water:'#0d2f6e',wind:'#0f4a34',light:'#fff3cc',dark:'#120826'};
function crEpicPal(c,el,s){if(s<2)return c;const d=CR_DEEP[el],en=CR_EN[el],o={...c};const hex=v=>typeof v==='string'&&/^#[0-9a-f]{6}$/i.test(v);
  if(hex(c.b))o.b=crMix(c.b,d,el==='light'?.4:.46);if(hex(c.a))o.a=crMix(c.a,en[0],.35);if(hex(c.w))o.w=crMix(c.w,d,.4);if(hex(c.mn))o.mn=crMix(c.mn,en[1],.55);if(hex(c.t))o.t=crMix(c.t,en[1],.5);if(hex(c.p))o.p=crMix(c.p,'#1a1222',.3);
  return o}
const CR_CACHE={};
function crGet(id,s){const k=id+'|'+s;if(CR_CACHE[k])return CR_CACHE[k];const sp=CR_SP[id],h=RL_H[id];if(!sp||!h)return null;
  return CR_CACHE[k]=crBuild({...sp,el:h.el,c:crEpicPal(sp.c,h.el,s)},s,'p'+id+s,h.el,null)}
const CR_MPAL={fire:{b:'#b8452c',a:'#e8a070',m:'#ff8a3a',p:'#6a2414'},water:{b:'#2f6aa8',a:'#8fc4e8',m:'#4fd0e8',p:'#1a3a66'},wind:{b:'#4a8a52',a:'#a8d890',m:'#8acf6a',p:'#24502c'},light:{b:'#c9b06a',a:'#f4e6b8',m:'#fff0a0',p:'#8a7030'},dark:{b:'#4a3478',a:'#8a74c0',m:'#c39bff',p:'#26183f'}};
function crMonGet(type,el,s){const k='m'+type+el+s;if(CR_CACHE[k])return CR_CACHE[k];const base=CR_MON[type]||CR_MON.slime,pal=CR_MPAL[el]||CR_MPAL.dark,glow={fire:'#ffd23a',water:'#7ff0ff',wind:'#d8ff5a',light:'#fff27a',dark:'#ff5ad0'}[el];
  const c={...pal,w:shade(pal.b,-.12),k:shade(pal.a,-.1),l:shade(pal.p,.1),e:glow,i:shade(pal.a,-.2),s:shade(pal.b,-.25)};
  if(type==='treant')Object.assign(c,{b:'#6b4a2e',a:'#9a7650',m:pal.m,p:'#4a301c'});
  if(type==='golem')Object.assign(c,{b:shade(pal.b,-.15),a:shade(pal.a,-.2)});
  if(type==='papergolem')Object.assign(c,{b:'#ece2cf',a:'#fff8ea',m:pal.m,p:'#c9bca2'});
  if(type==='inkling')Object.assign(c,{b:'#1e1830',a:'#3a3058'});
  const sp={...base,c,el};
  if(type==='drake')sp.deco=(st,g,P)=>({wings:`<g class="cr-wing" style="transform-origin:${g.cx}px ${g.cy}px">${crP(`M${g.cx-6} ${g.cy-g.cr*.8} C${g.cx-24} ${g.cy-60} ${g.cx-60} ${g.cy-86} ${g.cx-92} ${g.cy-80} C${g.cx-80} ${g.cy-66} ${g.cx-84} ${g.cy-54} ${g.cx-92} ${g.cy-44} C${g.cx-74} ${g.cy-42} ${g.cx-72} ${g.cy-30} ${g.cx-78} ${g.cy-20} C${g.cx-56} ${g.cy-22} ${g.cx-40} ${g.cy-10} ${g.cx-22} ${g.cy-g.cr*.2}Z`,shade(c.b,-.1),P,{inner:`<path d="M${g.cx-10} ${g.cy-g.cr*.6} L${g.cx-90} ${g.cy-78} M${g.cx-14} ${g.cy-16} L${g.cx-88} ${g.cy-44}" stroke="${shade(c.b,-.45)}" stroke-width="2.6"/>`})}</g>`,
    head:crHorn('M-6 -18 Q-26 -34 -44 -30',shade(c.a,.2))+crHorn('M6 -22 Q0 -40 -14 -46',shade(c.a,.05)),top:10});
  if(type==='owl')sp.deco=(st,g,P)=>({head:crP(`M${g.hx-g.R*.5} ${g.hy-g.R*.6} L${g.hx-g.R*.75} ${g.hy-g.R*1.45} L${g.hx-g.R*.05} ${g.hy-g.R*.85}Z`,c.b,P,{sw:3.4})+crP(`M${g.hx+g.R*.2} ${g.hy-g.R*.8} L${g.hx+g.R*.25} ${g.hy-g.R*1.5} L${g.hx+g.R*.7} ${g.hy-g.R*.6}Z`,c.b,P,{sw:3.4,back:1}),body:[0,1,2,3].map(i=>`<path d="M${g.cx-4+i*3} ${g.cy-6+i*12} q6 5 12 0" stroke="${shade(c.a,-.4)}" stroke-width="2.4" fill="none"/>`).join(''),top:16});
  if(type==='imp')sp.deco=(st,g,P)=>({head:crHorn('M-6 -20 Q-14 -40 -4 -50',shade(c.a,.3))+crHorn('M10 -22 Q8 -40 18 -48',shade(c.a,.1))+crP('M-20 -6 L-44 -16 L-26 4Z',c.b,P,{sw:3.4}),wings:crP(`M${g.chX-8} ${g.chY-g.chr*.4} C${g.chX-30} ${g.chY-40} ${g.chX-50} ${g.chY-50} ${g.chX-62} ${g.chY-40} C${g.chX-52} ${g.chY-30} ${g.chX-56} ${g.chY-20} ${g.chX-60} ${g.chY-10} C${g.chX-44} ${g.chY-12} ${g.chX-28} ${g.chY-4} ${g.chX-14} ${g.chY}Z`,shade(c.b,-.2),P,{back:1}),top:24});
  if(type==='treant')sp.deco=(st,g,P)=>({body:`<path d="M${g.chX-g.chr*.5} ${g.chY-g.chr*.6} q8 30 0 70 M${g.chX} ${g.chY-g.chr*.8} q-6 30 4 80 M${g.chX+g.chr*.5} ${g.chY-g.chr*.6} q6 30 -2 70" stroke="#3a2412" stroke-width="2.6" fill="none"/>`,back:[[g.chX-g.chr*.9,g.chY-g.chr*.9,18],[g.chX+g.chr*.6,g.chY-g.chr*1.0,16]].map(q=>crP(crEll(q[0],q[1],q[2],q[2]*.8),c.m,P,{sw:3.4})).join(''),top:40});
  if(type==='golem')sp.deco=(st,g,P)=>({body:`<path d="M${g.chX-g.chr*.4} ${g.chY-g.chr*.5} L${g.chX-g.chr*.1} ${g.chY} L${g.chX-g.chr*.5} ${g.chY+g.chr*.5} M${g.chX+g.chr*.3} ${g.chY-g.chr*.6} L${g.chX+g.chr*.5} ${g.chY-g.chr*.1}" stroke="${glow}" stroke-width="3" fill="none"/>`,back:crP(crEll(g.chX-g.chr*.7,g.chY-g.chr*.8,g.chr*.55,g.chr*.45),shade(c.b,-.1),P,{back:1}),mid:crP(crEll(g.chX+g.chr*.55,g.chY-g.chr*.8,g.chr*.55,g.chr*.45),c.b,P,{inner:`<circle cx="${g.chX+g.chr*.55}" cy="${g.chY-g.chr*.8}" r="5" fill="${glow}"/>`}),top:6});
  if(type==='papergolem')sp.deco=(st,g,P)=>({body:[0,1,2,3,4].map(i=>`<path d="M${g.chX-g.chr} ${g.chY-g.chr*.6+i*18} H${g.chX+g.chr}" stroke="#b5a88c" stroke-width="2" stroke-dasharray="7 4"/>`).join(''),mid:crP(`M${g.chX+g.chr*.2} ${g.chY-g.chr*.9} L${g.chX+g.chr*1.1} ${g.chY-g.chr*.7} L${g.chX+g.chr*.9} ${g.chY+g.chr*.2} L${g.chX+g.chr*.1} ${g.chY}Z`,'#fff8ea',P,{sw:3.2,inner:`<path d="M${g.chX+g.chr*.3} ${g.chY-g.chr*.6} l20 4 M${g.chX+g.chr*.3} ${g.chY-g.chr*.4} l20 4" stroke="#9a8e74" stroke-width="1.6"/>`}),top:16});
  if(type==='inkling')sp.deco=(st,g,P)=>({back:[[-1.05,-.4,-30],[1.05,-.35,30],[-.6,-.95,-10]].map(([u,v,a])=>`<g transform="translate(${g.bx+u*g.W} ${g.G+v*g.H}) rotate(${a})">${crP(`M-6 0 C-10 -20 -2 -34 8 -40 C4 -28 6 -14 8 0Z`,c.b,P,{sw:3.4})}</g>`).join(''),top:10});
  if(type==='crab')Object.assign(c,{s:c.b});
  if(type==='wolf')sp.deco=(st,g,P)=>({body:[0,1,2].map(i=>`<path d="M${g.rx+6+i*16} ${g.ry-g.rr*.95} l6 12" stroke="${shade(c.b,-.35)}" stroke-width="4" stroke-linecap="round"/>`).join('')});
  const r=crBuild(sp,s,'m'+type+el+s,el,glow);
  return CR_CACHE[k]=r}


/* ================================================================
   MYTHICAL BODY TYPES: elegant steeds and spectral wraiths
   ================================================================ */
const CR_GOLD='#d9b24a';
CR_HQ.steed={cr:[22,20],sn:[4,6,22,40,20,13],ear:'point',eh:26,fl:0};
CR_HB.ram={cr:[25,23],sn:[8,6,22,34,12,16]};
/* a flowing, tapering ribbon (manes, tails, sashes) */
function crRibbon(x,y,len,ang,w,amp,col,P,o){o=o||{};const a=ang*Math.PI/180,dx=Math.cos(a),dy=Math.sin(a),nx=-dy,ny=dx,N=10,L=[],Q=[],C=[];
  for(let i=0;i<=N;i++){const t=i/N,wv=Math.sin(t*Math.PI*1.35+(o.ph||0))*amp*t,px=x+dx*len*t+nx*wv,py=y+dy*len*t+ny*wv,ww=w*(1-t*.94)/2;L.push([px+nx*ww,py+ny*ww]);Q.push([px-nx*ww,py-ny*ww]);C.push([px,py])}
  const pts=L.concat(Q.reverse());let d=`M${cf(pts[0][0])} ${cf(pts[0][1])}`;
  for(let i=1;i<pts.length-1;i++){const m=[(pts[i][0]+pts[i+1][0])/2,(pts[i][1]+pts[i+1][1])/2];d+=` Q${cf(pts[i][0])} ${cf(pts[i][1])} ${cf(m[0])} ${cf(m[1])}`}
  d+=' Z';
  const hl=`<path d="M${C.slice(1,8).map(q=>cf(q[0]-nx*w*.12)+' '+cf(q[1]-ny*w*.12)).join(' L')}" stroke="${shade(col,.45)}" stroke-width="${cf(w*.14)}" fill="none" opacity=".55" stroke-linecap="round"/>`;
  return crP(d,col,P,{sw:2.6,back:o.back,nospec:1,inner:o.back?'':hl})}
function crHoof(x,col,gd,lw,P,back){const G=228;return crP(`M${cf(x-lw*.55)} ${G-11} L${cf(x+lw*.62)} ${G-11} L${cf(x+lw*.85)} ${G-1} L${cf(x-lw*.72)} ${G-1}Z`,col,P,{sw:2.6,back,sh:.4})+crP(crCap(x-lw*.62,G-14,6,x+lw*.62,G-14,6),gd,P,{sw:2.2,back,sh:.3,nospec:1})}
function crSteed(sp,s,P,mon){const T=a=>a[s],G=228,c=sp.c,B=c.b,A=c.a,MN=c.mn||c.m,GD=c.g||CR_GOLD,HF=c.h||'#2a2230';
  const rx=T([94,86,80]),ry=T([170,152,136]),rr=T([19,22,25]);
  const cx=T([134,144,152]),cy=T([166,148,130]),cr=T([21,25,28]);
  const hx=T([166,180,190]),hy=T([118,94,72]),k=T([.8,.82,.84]);
  const lw=T([9,10.5,12]);
  const geo={rx,ry,rr,cx,cy,cr,hx,hy,k,G,lw};const D=sp.deco?sp.deco(s,geo,P,mon):{};
  let o=D.back||'';
  if(D.wings2)o+=D.wings2;
  const fl=(x,y,b)=>crLimb([[x,y,lw*1.9],[x+2,y+cr*.95,lw*1.15],[x+3,(y+cr+G)/2+4,lw*.85],[x+2,G-14,lw*.7]],B,P,{back:b})+crHoof(x+2,HF,GD,lw,P,b)+(s?crRibbon(x-2,G-20,14+s*4,160,8,3,MN,P,{back:b}):'');
  const hl=(x,y,b)=>crLimb([[x,y,lw*2.1],[x+6,y+rr*1.15,lw*1.3],[x-8,G-38,lw*.85],[x-2,G-14,lw*.72]],B,P,{back:b})+crHoof(x-2,HF,GD,lw,P,b)+(s?crRibbon(x-6,G-20,14+s*4,165,8,3,MN,P,{back:b}):'');
  o+=fl(cx+12,cy+cr*.1,1)+hl(rx+12,ry+rr*.1,1);
  // tail
  const tx=rx-rr*.75,ty=ry-rr*.5;
  if(sp.tail==='flame'){const n=s+1;for(let i=0;i<n;i++)o+=`<g transform="rotate(${-10+i*-24} ${cf(tx)} ${cf(ty)})">`+crTail('flame',tx,ty,T([.75,.9,1.05])*(1-i*.08),sp,P,s)+'</g>'}
  else{const n=T([2,3,4]);let t='';for(let i=0;i<n;i++)t+=crRibbon(tx,ty,T([46,62,80])*(1-i*.1),150+i*16,T([14,16,18]),7,i%2?shade(MN,-.12):MN,P,{ph:i*.7});o+=`<g class="cr-tail" style="transform-origin:${cf(tx)}px ${cf(ty)}px">${t}</g>`}
  if(D.wings)o+=D.wings;
  // far mane ribbons
  const nm=T([3,5,7]),mane=[];for(let i=0;i<nm;i++){const t=i/(nm-1||1);mane.push([cx-cr*.1+(hx-12*k-(cx-cr*.1))*t,cy-cr*.9+(hy-10*k-(cy-cr*.9))*t,t])}
  o+=mane.filter((q,i)=>i%2).map(([x,y,t])=>crRibbon(x,y,T([26,38,50])*(1-t*.3),190+t*30,T([12,14,16]),5,shade(MN,-.1),P,{back:1,ph:t*2})).join('');
  o+=fl(cx-2,cy+cr*.2,0)+hl(rx+2,ry+rr*.2,0);
  const ds=[crQuadTorso(rx,ry,rr,cx,cy,cr),crCap(cx+cr*.15,cy-cr*.35,cr*1.35,hx-6*k,hy+14*k,26*k)];
  let inner=crP(crCap(rx+8,ry+rr*.95,rr*1.1,cx+cr*.2,cy+cr*.95,cr*1.15),A,P,{noline:1,sh:.6})+(D.body||'');
  o+=`<g class="cr-body">`+crP(ds,B,P,{inner});
  if(s)o+=crStroke(`M${cf(cx-cr*.25)} ${cf(cy-cr*.95)} Q${cf(cx+cr*.95)} ${cf(cy-cr*.35)} ${cf(cx+cr*.75)} ${cf(cy+cr*.5)}`,GD,5+s)+crGem(cf(cx+cr*.92),cf(cy-cr*.05),5+s,c.m);
  if(s>1&&!mon)o+=crP(`M${cf(cx+cr*.15)} ${cf(cy-cr*.95)} Q${cf(cx+cr*1.2)} ${cf(cy-cr*.55)} ${cf(cx+cr*1.02)} ${cf(cy+cr*.55)} L${cf(cx+cr*.4)} ${cf(cy+cr*.8)} Q${cf(cx+cr*.35)} ${cf(cy-cr*.1)} ${cf(cx+cr*.15)} ${cf(cy-cr*.95)}Z`,CR_GOLD,P,{sw:2.4,inner:`<path d="M${cf(cx+cr*.5)} ${cf(cy-cr*.6)} Q${cf(cx+cr*.95)} ${cf(cy-cr*.2)} ${cf(cx+cr*.85)} ${cf(cy+cr*.5)}" stroke="#7a5a18" stroke-width="1.6" fill="none"/>`})+crGem(cf(cx+cr*.75),cf(cy-cr*.1),7,c.m)+crPlate(rx+rr*.3,ry-rr*.6,rr*.55,-15,c.m,P);
  o+=D.mid||'';
  o+=mane.filter((q,i)=>!(i%2)).map(([x,y,t])=>crRibbon(x,y-2,T([28,40,54])*(1-t*.3),196+t*28,T([13,15,17]),6,MN,P,{ph:t*2+1})).join('');
  const Hd=crHeadQuad(sp,s,P,mon);
  o+=`<g class="cr-head" style="transform-origin:${cf(hx-8)}px ${cf(hy+16)}px"><g transform="translate(${hx} ${hy}) scale(${k})">${D.hb||''}${Hd.behind}${Hd.head}${Hd.front}${crGem(2,-15,4.5,c.m)}${D.head||''}${s>1&&!mon?crCrown(-4,-24,26,c.m):''}</g></g>`;
  o+=(D.front||'')+'</g>';
  return{svg:o,box:[rx-rr-T([58,70,86]),hy-k*T([46,52,56])-(D.top||0),hx+k*46+(D.right||0),G],top:[hx,hy-k*34-(D.top||0)],wa:[cx-cr*.1,cy-cr*.75],hasW:!!(D.wings||D.wings2)}}

function crWraith(sp,s,P,mon){const T=a=>a[s],c=sp.c,B=c.b,A=c.a,M=c.m,GD=c.g||CR_GOLD;
  const x=120,top=T([152,142,130]),bot=T([208,212,216]),W=T([30,40,50]),n=T([4,5,6]);
  const sh=top-T([26,32,38]),hx=x+6,hy=sh-T([19,21,23]),R=T([17,18,19]);
  const geo={x,top,bot,W,sh,hx,hy,R,n};const D=sp.deco?sp.deco(s,geo,P,mon):{};
  const gid=P+'sk';
  let o=`<defs><linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${B}" stop-opacity="0"/><stop offset=".55" stop-color="${M}" stop-opacity=".25"/><stop offset="1" stop-color="${M}" stop-opacity=".95"/></linearGradient></defs>`;
  o+=`<ellipse class="cr-gshadow" cx="${x}" cy="226" rx="${T([30,38,46])}" ry="5" fill="url(#crsh)"/>`;
  o+=`<g class="cr-float">`+crGlow(x,bot-4,W*1.1,P,.5)+(D.back||'');
  const skirt=(w,b,nn,ph)=>{let d=`M${x-8} ${top} C${cf(x-w*.5)} ${top+10} ${cf(x-w)} ${cf(b-34)} ${cf(x-w)} ${cf(b)}`;
    for(let i=0;i<nn;i++){const x0=x-w+i*2*w/nn,x1=x-w+(i+1)*2*w/nn,ny=b-T([14,17,20])+((i+ph)%2)*4;d+=` Q${cf((x0+x1)/2)} ${cf(ny)} ${cf(x1)} ${cf(b+((i+ph)%2?3:-1))}`}
    return d+` C${cf(x+w)} ${cf(b-34)} ${cf(x+w*.5)} ${top+10} ${x+8} ${top}Z`};
  const sk1=skirt(W*1.18,bot+5,n+1,1),sk2=skirt(W,bot,n,0);
  o+=crP(sk1,shade(B,-.15),P,{back:1,inner:`<path d="${sk1}" fill="url(#${gid})" opacity=".7"/>`});
  // far sleeve
  const sleeve=(sx,sy,hx2,hy2,b)=>crP(`M${cf(sx-6)} ${cf(sy)} C${cf(sx+4)} ${cf(sy+22)} ${cf(hx2-14)} ${cf(hy2-8)} ${cf(hx2+6)} ${cf(hy2+2)} L${cf(hx2-6)} ${cf(hy2+16)} C${cf(hx2-16)} ${cf(hy2+4)} ${cf(sx)} ${cf(sy+26)} ${cf(sx+8)} ${cf(sy-2)}Z`,B,P,{back:b,inner:b?'':`<path d="M${cf(hx2+6)} ${cf(hy2+2)} L${cf(hx2-6)} ${cf(hy2+16)}" stroke="${GD}" stroke-width="4"/>`})+[0,1,2].map(i=>crStroke(`M${cf(hx2-i*4)} ${cf(hy2+6+i*3)} q${cf(8-i)} ${cf(2+i)} ${cf(11-i*2)} ${cf(9+i*2)}`,b?shade(A,-.3):A,3)).join('');
  const fh=[x+T([20,26,32]),sh+T([26,30,34])],nh=[x+T([28,36,44]),sh+T([16,18,20])];
  o+=sleeve(x-2,sh+2,fh[0],fh[1],1);
  o+=`<g class="cr-body" style="transform-origin:${x}px ${bot}px">`+crP(sk2,B,P,{inner:`<path d="${sk2}" fill="url(#${gid})"/>`+(D.skirt||'')});
  o+=crP([crCap(x,top+8,22,x+3,sh+6,30)],B,P,{inner:crP(crCap(x+6,top,8,x+7,sh+8,12),A,P,{noline:1,sh:.4})+(D.body||'')});
  o+=crStroke(`M${x-10} ${sh+2} Q${x+4} ${sh+12} ${x+16} ${sh}`,GD,4+s)+crGem(x+4,sh+10,4+s,M);
  o+=D.mid||'';
  // head with a mask
  let hd=(D.hb||'')+crP(crEll(hx,hy,R*.88,R),B,P,{inner:crP(`M${cf(hx-R*.1)} ${cf(hy-R*1.05)} Q${cf(hx+R*1.15)} ${cf(hy-R*.7)} ${cf(hx+R*.95)} ${cf(hy+R*.45)} Q${cf(hx+R*.5)} ${cf(hy+R*1.05)} ${cf(hx)} ${cf(hy+R*.7)}Z`,A,P,{noline:1,sh:.4})});
  const ge=mon||crIris(sp);
  hd+=crEye(hx+R*.72,hy-R*.12,R*.24,{glow:ge,sq:.6})+crEye(hx+R*.34,hy-R*.05,R*.3,{glow:ge});
  hd+=D.head||'';if(s>1&&!mon)hd+=crCrown(hx,hy-R*.8,R*1.5,M);
  o+=`<g class="cr-head" style="transform-origin:${hx}px ${hy+R}px">${hd}</g>`;
  o+=sleeve(x+10,sh+4,nh[0],nh[1],0);
  o+=(D.front||'')+'</g></g>';
  return{wa:[x-2,sh+6],svg:o,box:[x-W*1.2-12,hy-R-(D.top||0)-6,Math.max(x+W*1.2,nh[0]+16)+(D.right||0),228],top:[hx,hy-R-(D.top||0)],float:1}}
CR_PLAN.steed=crSteed;CR_PLAN.wraith=crWraith;

Object.assign(CR_SP,{
 pyra:{plan:'steed',h:'steed',tail:'flame',ev:['Pyrakin','Pyrequin','Pyraleon'],c:{b:'#c9402a',a:'#ffd6a0',m:'#ffb020',mn:'#ff8a1f',h:'#3a1a12'},
   deco:(s,g,P)=>({hb:crFlames([[-14,-10,.7+s*.2,-80],[-10,-24,.6+s*.2,-55],[-16,4,.6+s*.18,-105]],P),head:s?crHorn(`M-2 -18 Q-10 ${-36-s*6} ${-24-s*8} ${-44-s*8}`,CR_GOLD)+crHorn(`M8 -20 Q4 ${-36-s*5} ${-8-s*6} ${-46-s*7}`,'#b8913a'):'',
     back:s?crFlames([[g.rx+12,g.ry-g.rr*1.0,.6+s*.15,-25],[(g.rx+g.cx)/2,g.cy-g.cr*1.0,.55+s*.15,-15]],P):'',top:s?24+s*6:10})},
 frostine:{plan:'steed',h:'steed',ev:['Rimeling','Frostine','Glacivane'],c:{b:'#d8e9fb',a:'#ffffff',m:'#4fc8ff',mn:'#7fbcff',h:'#3a5a8a',g:'#a8d8ff'},
   deco:(s,g,P)=>{const sh=(x,y,h,r)=>`<g transform="translate(${cf(x)} ${cf(y)}) rotate(${r})">${crP(`M-5 0 L0 ${-h} L6 0Z`,'#bfe6ff',P,{sw:2.4,sh:.4,inner:`<path d="M0 0 L0 ${-h*.9}" stroke="#fff" stroke-width="1.4"/>`})}</g>`;
     const crown=[[-6,-18,16+s*8,-20],[2,-20,22+s*10,-5],[10,-18,14+s*7,15]].map(q=>sh(...q)).join('');
     const fan=s>1?`<g class="cr-wing" style="transform-origin:${g.cx}px ${g.cy}px">${[-70,-50,-30,-12].map((a,i)=>sh(g.cx-8,g.cy-g.cr*.6,44+i*10,a-10)).join('')}</g>`:'';
     return{hb:crown,wings:fan,back:s?[[g.rx+8,g.ry-g.rr*.95,12+s*4,-15],[(g.rx+g.cx)/2,g.cy-g.cr*1.0,14+s*5,-5]].map(q=>sh(q[0],q[1],q[2],q[3])).join(''):'',top:22+s*10}}},
 bramble:{plan:'steed',h:'steed',ev:['Bramblehorn','Thornhart','Elderwood'],c:{b:'#34503a',a:'#9cc28e',m:'#7dff9a',mn:'#5fc882',h:'#1e1812',g:'#c9b07a'},
   deco:(s,g,P)=>{const z=[.7,.95,1.2][s];const ant=`<g transform="translate(-4 -18) scale(${z})">${crStroke('M0 0 C-8 -22 4 -40 -12 -64 M-3 -24 C10 -32 16 -42 14 -56 M-6 -44 C-20 -50 -26 -60 -28 -72 M-9 -58 C1 -64 5 -72 3 -82','#c9b07a',5.5)}</g><g transform="translate(10 -20) scale(${z*.85})">${crStroke('M0 0 C2 -22 12 -40 4 -62 M3 -26 C16 -32 22 -40 24 -52 M6 -44 C-4 -50 -8 -58 -8 -66','#a68f5c',5)}</g>`;
     const tips=crFlames([[-4-12*z,-18-64*z,.32+s*.08,-10],[-4+14*z,-18-56*z,.3+s*.07,15],[-4-28*z,-18-72*z,.3+s*.07,-30]],P);
     return{hb:ant+tips,body:`<path d="M${g.rx} ${g.ry-g.rr*.4} l8 -7 l8 7 l8 -7 M${g.cx-g.cr*.4} ${g.cy-g.cr*.4} l7 9 l-7 9" stroke="#8dffaf" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,top:[56,80,104][s]}}},
 seraphine:{plan:'steed',h:'steed',ev:['Serakin','Seraphine','Seraphiel'],c:{b:'#f2ede4',a:'#ffffff',m:'#ffc93f',mn:'#ffe7a0',h:'#b8902a'},
   deco:(s,g,P)=>{const wing=(b)=>crP(`M${g.cx-6} ${g.cy-g.cr*.75} C${g.cx-24} ${g.cy-56-s*14} ${g.cx-60-s*8} ${g.cy-92-s*16} ${g.cx-98-s*10} ${g.cy-92-s*14} C${g.cx-86} ${g.cy-78} ${g.cx-90} ${g.cy-66} ${g.cx-98} ${g.cy-56} C${g.cx-82} ${g.cy-54} ${g.cx-84} ${g.cy-42} ${g.cx-92} ${g.cy-32} C${g.cx-70} ${g.cy-32} ${g.cx-48} ${g.cy-20} ${g.cx-26} ${g.cy-g.cr*.2}Z`,'#fffaf0',P,{back:b,inner:`<path d="M${g.cx-26} ${g.cy-40} L${g.cx-94} ${g.cy-88} M${g.cx-30} ${g.cy-24} L${g.cx-90} ${g.cy-56}" stroke="#e8d8a8" stroke-width="2"/>`});
     return{wings2:s?`<g class="cr-wing2" style="transform-origin:${g.cx}px ${g.cy}px" transform="translate(12 -6)">${wing(1)}</g>`:'',wings:s?`<g class="cr-wing" style="transform-origin:${g.cx}px ${g.cy}px">${wing(0)}</g>`:'',
       head:crHorn(`M2 -18 Q4 ${-40-s*8} 14 ${-56-s*12}`,CR_GOLD)+(s>1?`<ellipse cx="2" cy="-88" rx="18" ry="5" fill="none" stroke="#ffe066" stroke-width="3.4" class="cr-glowpulse"/>`:''),top:s?(s>1?96:70):30}}},
 gale:{plan:'quad',h:'wolf',tail:'leaf',tz:.85,ev:['Galeclaw','Galestrider','Galecrest'],c:{b:'#3f7f56',a:'#cfeac0',m:'#a6f08a',e:'#c4f25a',p:'#1e3a28'},
   deco:(s,g,P)=>({back:[0,1,2].slice(0,s+1).map(i=>crLeaf(g.rx+10+i*((g.cx-g.rx)/2),g.ry-g.rr*1.0-i*6,.9+s*.2,-155+i*6,'#2a6b3c',P)).join(''),
     mid:crRibbon(g.cx+g.cr*.1,g.cy-g.cr*.6,T3(s,[30,40,52]),200,10,6,'#e8ffe0',P),head:crLeaf(-26,-30,.8+s*.2,-150,'#2a6b3c',P)+(s?crLeaf(-14,-34,.7+s*.2,-125,'#3f8a4c',P):''),top:20+s*6})},
 cinder:{plan:'wraith',ev:['Cinderwisp','Cinderveil','Pyrelune'],c:{b:'#3a2422',a:'#ecd8b8',m:'#ff6a1f'},
   deco:(s,g,P)=>({hb:crFlames([[g.hx-g.R*.6,g.hy-g.R*.4,.7+s*.2,-60],[g.hx-g.R*.2,g.hy-g.R*.8,.75+s*.2,-25],[g.hx-g.R,g.hy+g.R*.1,.6+s*.15,-95]],P),
     skirt:[0,1,2,3].map(i=>`<circle cx="${cf(g.x-g.W*.6+i*g.W*.4)}" cy="${cf(g.bot-12-(i%2)*14)}" r="${2+s*.6}" fill="#ffd27a"/>`).join(''),head:s>1?crFlames([[g.hx,g.hy-g.R,.55,-5]],P):'',top:g.R*(1.6+s*.4)})},
 tide:{plan:'wraith',ev:['Tidewisp','Lyrisong','Tidelyric'],c:{b:'#1d4a86',a:'#e2f5ff',m:'#4fe0ff'},
   deco:(s,g,P)=>{const fin=(a,l)=>`<g transform="translate(${g.hx-g.R*.4} ${g.hy-g.R*.3}) rotate(${a})">${crP(`M0 6 Q${-l*.6} -2 ${-l} -10 Q${-l*.7} 2 ${-l*.9} 10 Q${-l*.5} 10 0 12Z`,'#4fc8ff',P,{sw:2.4,inner:`<path d="M-4 8 L${-l*.9} -6 M-4 10 L${-l*.8} 6" stroke="#bff2ff" stroke-width="1.4"/>`})}</g>`;
     return{hb:fin(-20,28+s*8)+fin(10,24+s*7)+(s?fin(-45,22+s*6):''),skirt:`<path d="M${g.x-g.W*.7} ${g.bot-20} q10 -6 20 0 t20 0 t20 0 t20 0" stroke="#bff2ff" stroke-width="2.4" fill="none" opacity=".8"/>`,
       back:s?[0,1].map(i=>crGlow(g.x-g.W*1.1+i*g.W*2.3,g.sh-10+i*20,10+s*3,P,.9)+`<circle cx="${cf(g.x-g.W*1.1+i*g.W*2.3)}" cy="${cf(g.sh-10+i*20)}" r="${4+s}" fill="#e8fbff"/>`).join(''):'',top:g.R*1.2}}},
 thistle:{plan:'wraith',ev:['Thistlewisp','Thistleveil','Thistlebloom'],c:{b:'#29502a',a:'#e4eed0',m:'#c77dff'},
   deco:(s,g,P)=>{const n=[5,7,9][s];let sp='';for(let i=0;i<n;i++){const a=(-170+i*(130/(n-1)))*Math.PI/180,L=g.R*(1.3+.3*s);sp+=crStroke(`M${g.hx-2} ${g.hy-g.R*.5} L${cf(g.hx-2+Math.cos(a)*L)} ${cf(g.hy-g.R*.5+Math.sin(a)*L)}`,'#c77dff',2.6)}
     return{hb:sp,skirt:[0,1,2].map(i=>crLeaf(g.x-g.W*.8+i*g.W*.7,g.top+30+i*8,.8+s*.2,-30+i*30,'#4f8a3a',P)).join(''),top:g.R*(1.4+.3*s)}}},
 lumi:{plan:'wraith',ev:['Lumen','Lumenveil','Lumiere'],c:{b:'#efe0b4',a:'#ffffff',m:'#ffd84a'},
   deco:(s,g,P)=>({back:crRibbon(g.x-8,g.sh+2,T3(s,[50,66,84]),118,16,7,'#fff3c0',P,{back:1})+crRibbon(g.x-4,g.sh,T3(s,[56,74,92]),132,16,7,'#ffe9a0',P)+(s?crRibbon(g.x-10,g.sh-2,T3(s,[0,60,80]),150,12,6,'#ffd84a',P,{back:1}):''),
     head:`<ellipse cx="${g.hx}" cy="${g.hy-g.R-8}" rx="${14+s*3}" ry="4" fill="none" stroke="#ffe066" stroke-width="3.2" class="cr-glowpulse"/>`+[-40,-15,10].map(a=>`<path d="M${g.hx} ${g.hy-g.R*.6} l${cf(Math.cos((a-90)*Math.PI/180)*(14+s*5))} ${cf(Math.sin((a-90)*Math.PI/180)*(14+s*5))}" stroke="#fff4b0" stroke-width="2.6" stroke-linecap="round"/>`).join(''),top:g.R+16+s*4})},
 nyx:{plan:'wraith',ev:['Nyxling','Nyxveil','Nyxscript'],c:{b:'#26173f',a:'#cbbcef',m:'#a46bff',eg:'#ff4f9a'},
   deco:(s,g,P)=>({hb:crP(`M${g.hx+g.R*.6} ${g.hy-g.R*.9} Q${g.hx-g.R*.2} ${g.hy-g.R*(1.9+s*.3)} ${g.hx-g.R*(1.6+s*.4)} ${g.hy-g.R*(1.4+s*.3)} Q${g.hx-g.R*1.2} ${g.hy} ${g.hx-g.R*.9} ${g.hy+g.R*.9} L${g.hx} ${g.hy+g.R*.4}Z`,'#1c1030',P,{sw:2.6}),
     head:`<path d="M${g.hx-g.R*.3} ${g.hy-g.R*1.3} a${g.R*.5} ${g.R*.5} 0 1 0 ${g.R*.6} ${-g.R*.3} a${g.R*.36} ${g.R*.36} 0 1 1 ${-g.R*.6} ${g.R*.3}Z" fill="#ffe066"/>`,
     skirt:[0,1,2,3,4].map(i=>`<path d="M${cf(g.x-g.W*.7+i*g.W*.35)} ${cf(g.bot-14-(i%2)*16)} l1.5 -4 l1.5 4 l4 1 l-4 1.5 l-1.5 4 l-1.5 -4 l-4 -1.5Z" fill="#ffe066"/>`).join(''),top:g.R*(1.1+s*.3)})},
 aurelius:{plan:'biped',h:'ram',armor:1,ev:['Aurelet','Aurelion','Aurelius'],c:{b:'#e6d9b8',a:'#fff6e0',m:'#ffd23f',e:'#ffe55c',p:'#c9a35a',n:'#6a4a20'},
   deco:(s,g,P)=>({back:crP(`M${g.chX-g.chr*.6} ${g.chY-g.chr*.8} C${g.chX-g.chr*1.6} ${g.chY} ${g.hipX-g.hr*1.5} ${g.G-30} ${g.hipX-g.hr*1.9} ${g.G-6} L${g.hipX-g.hr*.4} ${g.G-14} C${g.hipX-g.hr*.6} ${g.hipY} ${g.chX-g.chr*.4} ${g.chY} ${g.chX+g.chr*.2} ${g.chY-g.chr*.9}Z`,'#b8342a',P,{back:1}),
     hb:crStroke(`M6 -18 C-2 -34 -26 -34 -30 -14 C-32 0 -20 8 -12 0`,'#b8913a',8),head:`<g transform="scale(${[.85,1,1.15][s]})">`+crStroke(`M-4 -16 C-14 -36 -42 -34 -44 -10 C-46 8 -28 18 -18 6 C-12 -2 -18 -10 -24 -6`,CR_GOLD,10)+`</g>`+crGem(6,-20,5,'#ffffff'),top:s?20:10})},
 pip:{plan:'biped',h:'golem',brute:1,ev:['Pebbleroot','Rootwarden','Thatchfort'],c:{b:'#6b6a5c',a:'#8f8c78',m:'#5fa85a',p:'#4a483e'},
   deco:(s,g,P)=>({back:[[g.chX-g.chr*.7,g.chY-g.chr*.85,14+s*3],[g.chX+g.chr*.4,g.chY-g.chr*1.0,12+s*3]].map(q=>crP(crEll(q[0],q[1],q[2],q[2]*.7),'#4f8a3a',P,{sw:2.8})).join(''),
     body:`<path d="M${g.chX-g.chr*.4} ${g.chY-g.chr*.4} l6 12 l-8 10 l6 12 M${g.chX+g.chr*.4} ${g.chY-g.chr*.5} l-4 14" stroke="#8dffaf" stroke-width="2.6" fill="none" stroke-linejoin="round"/>`,
     mid:[0,1,2].slice(0,s+1).map(i=>`<g transform="translate(${g.chX-g.chr*.2+i*14} ${g.chY-g.chr*1.0}) rotate(${-20+i*18})">${crP(`M-5 0 L0 ${-16-s*4} L5 0Z`,'#9affc0',P,{sw:2.2,sh:.4})}</g>`).join(''),top:16+s*4})},
});
function T3(s,a){return a[s]}
Object.assign(CR_SP.ignatius,{armor:1});Object.assign(CR_SP.vesper,{armor:1,c:{...CR_SP.vesper.c,g:'#b9a6e8'}});
Object.assign(CR_SP.ember,{tl:1.6,tf:[[0,1],[-14,.92],[14,.86],[-28,.78],[26,.7]],ev:['Embit','Emberwing','Pyrehawk']});
Object.assign(CR_SP.halo,{tl:1.4,tf:[[0,1],[-16,.9],[16,.86],[-30,.75]],ev:['Haloling','Halowing','Haloseraph']});


Object.assign(CR_SP.halo,{wings4:1});
Object.assign(CR_SP.zephyra,{ev:['Zephlet','Zephyrin','Zephyra'],c:{...CR_SP.zephyra.c,b:'#2f8f6a',w:'#1f6b55',t:'#2fbf8a',m:'#9ff0ff'},deco:(s,g,P)=>{const bolt=(x,y,z)=>`<path d="M${x} ${y} l${-6*z} ${12*z} l${5*z} 0 l${-7*z} ${14*z} l${12*z} ${-16*z} l${-5*z} 0 l${5*z} ${-10*z}Z" fill="#e8ffff" stroke="#1a6a7a" stroke-width="1.6" class="cr-glowpulse"/>`;
  return{body:bolt(g.cx-g.cr*.2,g.cy-g.cr*.3,1+s*.2)+bolt(g.rx+4,g.ry-6,.8+s*.15),head:crP(`M${g.hx+g.R*.55} ${g.hy-g.R*.55} Q${g.hx} ${g.hy-g.R*1.25} ${g.hx-g.R*.9} ${g.hy-g.R*.55} Q${g.hx-g.R*1.6-s*8} ${g.hy-g.R*(.6+s*.25)} ${g.hx-g.R*2-s*12} ${g.hy-g.R*(.2+s*.3)} Q${g.hx-g.R*1.2} ${g.hy} ${g.hx-g.R*.95} ${g.hy+g.R*.35} Q${g.hx-g.R*.2} ${g.hy-g.R*.3} ${g.hx+g.R*.55} ${g.hy-g.R*.55}Z`,'#174f40',P,{sw:3})+(s?crGlow(g.hx-g.R*1.6,g.hy-g.R*.4,14+s*4,P,.8):''),top:6}}});
Object.assign(CR_SP.morrow,{deco:(s,g,P)=>{const lx=g.cx+g.cr*.4,ly=g.cy+g.cr*.9;return{front:s?crStroke(`M${g.cx+g.cr*.6} ${g.cy+g.cr*.4} q8 6 6 16`,'#4a4560',3)+crP(`M${lx-8} ${ly+8} L${lx-6} ${ly+30} L${lx+12} ${ly+30} L${lx+14} ${ly+8}Z`,'#4a4560',P,{sw:2.6,inner:`<rect x="${lx-4}" y="${ly+12}" width="14" height="14" fill="url(#${P}en)"/>`})+crGlow(lx+3,ly+20,22,P,.8):'',
  head:crP(`M${g.hx-g.R*.2} ${g.hy-g.R*.85} Q${g.hx+g.R*.9} ${g.hy-g.R*.9} ${g.hx+g.R*1.05} ${g.hy+g.R*.1} Q${g.hx+g.R*.6} ${g.hy+g.R*.55} ${g.hx+g.R*.1} ${g.hy+g.R*.35} Q${g.hx-g.R*.4} ${g.hy-g.R*.2} ${g.hx-g.R*.2} ${g.hy-g.R*.85}Z`,'#e8e2d6',P,{sw:2.4,inner:`<path d="M${g.hx-g.R*.1} ${g.hy+g.R*.05} l${g.R*.25} -3 M${g.hx+g.R*.05} ${g.hy+g.R*.25} l${g.R*.2} -2" stroke="#8a8478" stroke-width="1.6"/>`})+crEye(g.hx+g.R*.3,g.hy-g.R*.12,7.6,{glow:'#b9f27c'})+crHorn(`M${g.hx-g.R*.3} ${g.hy-g.R*.8} Q${g.hx-g.R*.9} ${g.hy-g.R*(1.6+s*.2)} ${g.hx-g.R*(1.6+s*.3)} ${g.hy-g.R*(1.5+s*.3)}`,'#d8d2c4'),top:16+s*6}}});
CR_MON.owl={plan:'bird',beak:'hook'};
CR_MON.specter={plan:'wraith',ghostly:1};
/* shell behemoths: horned heads and a spiked ridge */
const _crShellBase=crShell;
crShell=function(sp,s,P,mon){const r=_crShellBase(sp,s,P,mon);if(sp.crab)return r;
  const T=a=>a[s],cx=T([116,114,112]),by=T([206,198,188]),W=T([46,58,70]),H=T([40,50,62]),hx=cx+W+T([14,16,18]),hy=by-T([18,20,24]),k=T([1.05,.98,.96]);
  const col=sp.c.sp||'#e8dcc0';let x='';const n=T([3,4,5]);
  for(let i=0;i<n;i++){const t=(i+.5)/n,u=-.8+t*1.6,px=cx+u*W*.95,py=by-H*.95*Math.sqrt(1-u*u*.8)-H*.06,h=T([12,16,20])*(1-Math.abs(u)*.4);x+=`<g transform="translate(${cf(px)} ${cf(py)}) rotate(${cf(u*30)})">${crP(`M-6 4 L0 ${-h} L6 4Z`,col,P,{sw:2.4,sh:.4})}</g>`}
  x+=crP(`M${cx-W-6} ${by+2} Q${cx} ${by+H*.36} ${cx+W+6} ${by+2}`,CR_GOLD,P,{flat:1,sw:0}).replace(/fill="[^"]*"/g,'fill="none"')+crStroke(`M${cx-W-4} ${by+2} Q${cx} ${by+H*.3} ${cx+W+4} ${by+2}`,CR_GOLD,4);
  const horns=`<g transform="translate(${hx} ${hy}) scale(${k})">${crHorn(`M-4 -18 Q-16 ${-36-s*6} ${-32-s*6} ${-40-s*8}`,col)}${crHorn(`M8 -20 Q4 ${-36-s*5} ${-8-s*6} ${-46-s*6}`,shade(col,-.15))}</g>`;
  r.svg=r.svg.replace(/<\/g>$/,x+horns+'</g>');r.box[1]-=s?12:6;return r};
CR_PLAN.shell=crShell;
Object.assign(CR_SP.brandt,{c:{...CR_SP.brandt.c,sp:'#3a2c2c'}});Object.assign(CR_SP.coral,{c:{...CR_SP.coral.c,sp:'#ff9aa5'}});Object.assign(CR_SP.pip||{},{});
/* sun sphinx */
Object.assign(CR_SP.solk,{plan:'steed',h:'lion',tail:'flame',ev:['Solkin','Solkade','Solgryph'],c:{b:'#e8a83a',a:'#fff0c8',m:'#ff8a00',mn:'#ffc94a',h:'#6a3a10',e:'#ffe55c'}});


Object.assign(CR_SP.umbra,{plan:'steed',h:'cat',tail:'',ev:['Umbrakin','Umbravex','Umbralynx'],c:{b:'#2e2448',a:'#6a58a0',m:'#ff4f9a',mn:'#8a5cff',h:'#140e22',g:'#b9a6e8',eg:'#ff4f9a'},
  deco:(s,g,P)=>({head:crHorn(`M-4 -18 Q-14 ${-34-s*6} ${-30-s*8} ${-38-s*8}`,'#c9b6e8')+(s?crHorn(`M8 -20 Q2 ${-34-s*5} ${-12-s*6} ${-42-s*6}`,'#a996cc'):''),
    body:[0,1,2].map(i=>`<path d="M${g.rx+6+i*16} ${g.ry-g.rr*.8} q4 10 0 18" stroke="#b388ff" stroke-width="3" fill="none" opacity=".85"/>`).join(''),
    back:crGlow(g.hx-10,g.hy-10,18+s*6,P,.5),top:20+s*8})});
Object.assign(CR_SP.ashling,{armor:1});
{const d0=CR_SP.ashling.deco;CR_SP.ashling.deco=(s,g,P)=>{const r=d0(s,g,P);r.hb=(r.hb||'')+crFlames([[-18,-14,.6+s*.15,-75],[-14,-28,.55+s*.15,-50]],P);return r}}
{const sp=CR_MON.specter;sp.deco=(s,g,P)=>({hb:crP(`M${g.hx+g.R*.7} ${g.hy-g.R*.8} Q${g.hx-g.R*.1} ${g.hy-g.R*1.9} ${g.hx-g.R*1.5} ${g.hy-g.R*1.2} Q${g.hx-g.R*1.3} ${g.hy+g.R*.2} ${g.hx-g.R*.8} ${g.hy+g.R*1.0} L${g.hx} ${g.hy+g.R*.5}Z`,'#141020',P,{sw:2.6}),top:g.R*.9})}

/* ---------- names, levels and stages ---------- */
for(const id in CR_SP){const h=RL_H[id];if(h){h.ev=CR_SP[id].ev;h.n=CR_SP[id].ev[0]}}
[['brandt',0,'Shell Bash'],['marin',0,'Tail Slap'],['ashling',0,'Lantern Tail'],['pip',0,'Acorn Bash'],['ignatius',0,'Searing Claw'],['oakhart',0,'Bark Slam']].forEach(([id,i,n])=>{if(RL_H[id])RL_H[id].sk[i].n=n});
function crLv(id){try{const p=typeof P_==='function'?P_():null;const m=p&&p.heroes&&p.heroes[id];return m?m.lv:0}catch(e){return 0}}
function crName(id,lv){const h=RL_H[id];if(!h)return'';const ev=h.ev||[h.n];return ev[crStage(lv||0)]||h.n}

/* ---------- portraits and battle sprites ---------- */
function crFit(box,asp,pad){let[x0,y0,x1,y1]=box;x0-=pad;x1+=pad;y0-=pad;y1+=3;let w=x1-x0,h=y1-y0;
  if(w/h>asp){const nh=w/asp;y0-=nh-h;h=nh}else{const nw=h*asp;x0-=(nw-w)/2;w=nw}return[x0,y0,w,h].map(cf)}
function rlHeroSVG(id,opt){const h=RL_H[id];if(!h)return'';const o=opt||{},E=RL_EL[h.el];
  const lv=o.lv!=null?o.lv:(o.stage!=null?[1,CR_EVO[0],CR_EVO[1]][o.stage]:crLv(id)),s=crStage(lv),c=crGet(id,s);if(!c)return'';
  const[x,y,w,hh]=crFit(c.box,200/220,10),u='cp'+id+s;
  const motes=o.motes===false?'':[[.1,.2,2.6,0],[.16,.7,2,1.2],[.86,.16,2.2,.6],[.08,.48,1.6,2],[.9,.66,1.8,1.6]].map(m=>`<circle class="rl-mote" cx="${cf(x+m[0]*w)}" cy="${cf(y+m[1]*hh)}" r="${cf(m[2]*w/150)}" fill="${E.l}" style="animation-delay:-${m[3]}s"/>`).join('');
  return`<svg class="rl-port cr-port" viewBox="${x} ${y} ${w} ${hh}" role="img" aria-label="${esc(crName(id,lv))}"><defs><radialGradient id="${u}bg" cx=".55" cy=".42" r=".8"><stop offset="0" stop-color="${E.l}" stop-opacity=".6"/><stop offset=".45" stop-color="${E.c}" stop-opacity=".55"/><stop offset="1" stop-color="${E.d}"/></radialGradient></defs><rect class="crbg" x="${x}" y="${y}" width="${w}" height="${hh}" fill="#0f0d14"/><rect class="crbg" x="${x}" y="${y}" width="${w}" height="${hh}" fill="url(#${u}bg)"/><g class="crbg" opacity=".2" stroke="${E.l}" fill="none"><circle cx="${cf(x+w*.52)}" cy="${cf(y+hh*.5)}" r="${cf(w*.42)}" stroke-width="${cf(w/170)}"/></g><ellipse cx="${cf((c.box[0]+c.box[2])/2)}" cy="227" rx="${cf((c.box[2]-c.box[0])*.42)}" ry="7" fill="url(#crsh)"/>${motes}${c.art}</svg>`}
function rlHeroBody(id,lv){const c=crGet(id,crStage(lv==null?crLv(id):lv));if(!c)return'';return`<svg class="rl-body cr-bodysvg" viewBox="0 0 240 240" role="img" aria-label="${esc(crName(id,lv))}">${c.art}</svg>`}
const _rlMonOld=rlMonSVG;
rlMonSVG=function(type,el,boss,opt){const s=boss?2:(opt&&opt.elite)?2:1,c=crMonGet(type,el,s);
  const E=RL_EL[el];
  const crown=boss?`<g transform="translate(${cf(c.top[0])} ${cf(c.top[1]-4)})">${[-14,0,14].map((x,i)=>`<path d="M${x-6} 0 L${x} ${i===1?-26:-18} L${x+6} 0Z" fill="#1a1226" stroke="${CR_EN[el][1]}" stroke-width="2.4" stroke-linejoin="round"/>`).join('')}<circle cy="-6" r="3" fill="${CR_EN[el][0]}"/></g>`:'';
  if(opt&&opt.stage)return`<svg class="rl-body cr-bodysvg${boss?' rl-mboss':''}" viewBox="0 0 240 240" role="img" aria-label="${RL_MON[type]?RL_MON[type].n:'Monster'}">${boss?`<ellipse cx="${cf((c.box[0]+c.box[2])/2)}" cy="${cf((c.box[1]+228)/2)}" rx="${cf((c.box[2]-c.box[0])*.6)}" ry="${cf((228-c.box[1])*.6)}" fill="url(#m${type}${el}${s}gl)" opacity=".35"/>`:''}${c.art}${crown}</svg>`;
  const[x,y,w,hh]=crFit([c.box[0],Math.min(c.box[1],boss?c.top[1]-30:999),c.box[2],c.box[3]],200/220,10),u='mb'+type+el;
  return`<svg class="rl-port rl-mon cr-port${boss?' rl-mboss':''}" viewBox="${x} ${y} ${w} ${hh}" role="img" aria-label="${RL_MON[type]?RL_MON[type].n:'Monster'}"><defs><radialGradient id="${u}bg" cx=".5" cy=".55" r=".7"><stop offset="0" stop-color="${E.c}" stop-opacity=".45"/><stop offset="1" stop-color="#0f0d14"/></radialGradient></defs><rect x="${x}" y="${y}" width="${w}" height="${hh}" fill="#0f0d14"/><rect x="${x}" y="${y}" width="${w}" height="${hh}" fill="url(#${u}bg)"/>${c.art}${crown}</svg>`};
for(const k in RL_PC)delete RL_PC[k];
function rlPort(u){const hero=u.kind==='hero',k=hero?'h'+u.id+crStage(u.lv):'m'+u.id+u.el+(u.boss?1:0);return RL_PC[k]||(RL_PC[k]=hero?rlHeroSVG(u.id,{motes:false,lv:u.lv}):rlMonSVG(u.id,u.el,u.boss))}
function crBoxOf(u){return u.kind==='hero'?crGet(u.id,crStage(u.lv)):crMonGet(u.id,u.el,u.boss||u.elite?2:1)}
function rlbUnitEl(B,u,enter){const[x,y]=rlUnitPos(B,u),sc=(.8+(y-55)*.011)*(u.boss?1.5:u.elite?1.15:1),hero=u.kind==='hero';
  const spr=hero?rlHeroBody(u.id,u.lv):rlMonSVG(u.id,u.el,u.boss,{stage:true,elite:u.elite});
  const c=crBoxOf(u),top=c?Math.max(0,c.box[1])/240:.2;
  return`<div class="rlb-u ${u.side?'e':'a'}${hero?' hero':' mon'}${u.boss?' rlboss':''}${enter?' enter':''}${c&&c.float?' flt':''}" id="rlu-${u.uid}" data-a="rlbTarget" data-v="${u.uid}" data-top="${cf(top)}" style="left:${x}%;top:${y}%;--s:${sc.toFixed(3)};--tt:${cf((1-top)*100)}%;z-index:${Math.round(y)};--d:-${(Math.random()*3).toFixed(2)}s"><div class="rlb-ring"></div><div class="rlb-shadow"></div><div class="rlb-spr live">${spr}</div><div class="rlb-tag"><div class="rlb-nm">${rlElChip(u.el)}<b>${esc(u.name)}</b><span class="num">${u.lv}</span></div><div class="rlb-hp"><i class="hp"></i><i class="sh"></i><span class="num"></span></div><div class="rlb-chips"></div></div></div>`}
function rlbPt(uid,where){const st=document.getElementById('rlb-stage'),el=document.getElementById('rlu-'+uid);if(!st||!el)return null;const S=st.getBoundingClientRect(),sp=el.querySelector('.rlb-spr').getBoundingClientRect(),t=+el.dataset.top||0;
  const top=sp.top+sp.height*t,hh=sp.bottom-top;
  return{x:sp.left+sp.width/2-S.left,y:where==='head'?top-S.top+hh*.1:where==='foot'?sp.bottom-S.top:top+hh*.5-S.top,w:sp.width,h:hh}}
/* creature names follow evolution */
const _rlHeroUnit=rlHeroUnit;
rlHeroUnit=function(p,id,stats){const u=_rlHeroUnit(p,id,stats);u.name=crName(id,u.lv);return u};

/* ---------- styles ---------- */
(function(){const st=document.createElement('style');st.textContent=`
.rlb-u.hero,.rlb-u.mon{aspect-ratio:1/1;height:calc(33% * var(--s))}
.rlb-u.hero.e .rlb-spr svg{transform:scaleX(-1)}
.rlb-u.hero .rlb-tag,.rlb-u.mon .rlb-tag{bottom:calc(var(--tt) + 4px)}
.rlb-u .rlb-shadow{opacity:.55}
.rlb-u.flt .rlb-shadow{opacity:.25}
.cr-all .cr-body{animation:crBreath 3s ease-in-out infinite;transform-origin:120px 228px;transform-box:view-box}
.cr-all .cr-head{animation:crHead 4.2s ease-in-out infinite;transform-box:view-box}
.cr-all .cr-tail{animation:crTail 2.6s ease-in-out infinite;transform-box:view-box}
.cr-all .cr-wing{animation:crWing 1.8s ease-in-out infinite;transform-box:view-box}
.cr-all .cr-wing2{animation:crWing 1.8s ease-in-out infinite -.15s;transform-box:view-box}
.cr-all .cr-float{animation:crFloat 3.2s ease-in-out infinite}
.cr-all .cr-flick{animation:crFlick .9s ease-in-out infinite alternate;transform-box:fill-box;transform-origin:50% 100%}
.cr-all .cr-squish{animation:crSquish 2.4s ease-in-out infinite}
.cr-glowpulse{animation:crPulse 2s ease-in-out infinite}
.cr-port .cr-wing,.cr-port .cr-wing2{animation-duration:3.2s}
@keyframes crBreath{50%{transform:scale(1.012,.988)}}
@keyframes crHead{0%,100%{transform:rotate(0)}50%{transform:rotate(-3deg)}}
@keyframes crTail{0%,100%{transform:rotate(0)}50%{transform:rotate(7deg)}}
@keyframes crWing{0%,100%{transform:rotate(0)}50%{transform:rotate(-9deg)}}
@keyframes crFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes crFlick{from{transform:scale(1,1)}to{transform:scale(.92,1.1)}}
@keyframes crSquish{0%,100%{transform:scale(1,1)}50%{transform:scale(1.05,.95)}}
@keyframes crPulse{50%{opacity:.5}}
.cr-all .cr-spin ellipse{animation:crDash 7s linear infinite}
@keyframes crDash{to{stroke-dashoffset:-140}}
.cr-all .cr-orbit{animation:crFloat 2.6s ease-in-out infinite}
@keyframes crSpin{to{transform:rotate(360deg) }}
.rl-sil .crbg,.rl-sil .rl-mote{display:none}
.rl-sil .cr-port{filter:brightness(0) invert(.32)}
.cr-evo{display:flex;align-items:center;gap:6px;flex-wrap:wrap}
.cr-evo .cr-evs{display:flex;flex-direction:column;align-items:center;gap:2px;width:84px}
.cr-evo .cr-evs .rl-pframe{width:84px}
.cr-evo .cr-evs.lock .rl-pframe{filter:grayscale(.85) brightness(.55)}
.cr-evo .cr-evs span{font-size:12px;text-align:center;line-height:1.2}
.cr-evo .arr{opacity:.6;font-size:18px}
.cr-evolve{display:flex;align-items:center;justify-content:center;gap:12px;margin:6px 0}
.cr-evolve .rl-pframe{width:110px}
.cr-evolve .new{animation:crEvoIn 1.2s cubic-bezier(.2,.8,.2,1) both}
@keyframes crEvoIn{0%{filter:brightness(4) saturate(0);transform:scale(.7)}60%{filter:brightness(2.2) saturate(.4);transform:scale(1.08)}100%{filter:none;transform:scale(1)}}
@media(prefers-reduced-motion:reduce){.cr-all *{animation:none!important}}
`;document.head.appendChild(st)})();

/* ---------- evolution UI ---------- */
function crEvoPath(id,lv){const h=RL_H[id];if(!h||!h.ev)return'';const s=crStage(lv),at=[1,CR_EVO[0],CR_EVO[1]];
  return`<div class="cr-evo" aria-label="Evolution path">${[0,1,2].map(i=>`${i?'<span class="arr" aria-hidden="true">→</span>':''}<div class="cr-evs${i>s?' lock':''}"><div class="rl-pframe r${h.r}">${rlHeroSVG(id,{stage:i,motes:false})}</div><span><b>${esc(h.ev[i])}</b><br><span class="muted">${i===0?'Base form':i<=s?'Evolved':'Evolves at Lv '+at[i]}</span></span></div>`).join('')}</div>`}
function crEvoBlock(r){const p=typeof P_==='function'?P_():null;if(!p||!r||!r.ups)return'';
  const ev=Object.keys(r.ups).filter(id=>{const m=p.heroes[id];return m&&r.ups[id]&&crStage(m.lv-r.ups[id])<crStage(m.lv)});
  return ev.map(id=>{const m=p.heroes[id],a=m.lv-r.ups[id];return`<div class="cr-evolve"><div class="rl-pframe r${RL_H[id].r}">${rlHeroSVG(id,{lv:a,motes:false})}</div><span class="arr" style="font-size:22px">→</span><div class="rl-pframe r${RL_H[id].r} new live">${rlHeroSVG(id,{lv:m.lv})}</div></div><p class="good" style="text-align:center"><b>${esc(crName(id,a))} evolved into ${esc(crName(id,m.lv))}!</b></p>`}).join('')}
/* shared soft shadow gradient */
(function(){const d=document.createElementNS('http://www.w3.org/2000/svg','svg');d.setAttribute('width','0');d.setAttribute('height','0');d.setAttribute('aria-hidden','true');d.style.position='absolute';
  d.innerHTML='<defs><radialGradient id="crsh"><stop offset="0" stop-color="#000" stop-opacity=".45"/><stop offset=".6" stop-color="#000" stop-opacity=".22"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient></defs>';
  (document.body||document.documentElement).appendChild(d)})();
