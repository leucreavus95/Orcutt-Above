"use strict";
/* ================================================================
   REALM WORLD MAP, painted style: soft coastlines, textured ground,
   shaded landmarks, glowing medallion places and cloud-covered
   locked regions. Replaces the flat map drawing from realm-ui.js.
   ================================================================ */
const RL_LAND={
 g:{lo:'#4f7a3a',hi:'#9cbf63',edge:'#3a5a2a',beach:'#d9c98f',label:'#f4f1dc'},
 e:{lo:'#4a2a22',hi:'#9a5a3a',edge:'#2a1410',beach:'#5a4a44',label:'#ffd8b8'},
 t:{lo:'#3f7a6a',hi:'#a9d4b0',edge:'#2a5a52',beach:'#e8dcae',label:'#eafcff'},
 l:{lo:'#a99a6a',hi:'#f4ead0',edge:'#7a6a3a',beach:'#f4ecd0',label:'#fff8e0'},
 d:{lo:'#2e2440',hi:'#6a5a8a',edge:'#1a1428',beach:'#4a4058',label:'#e6dcff'},
 a:{lo:'#6a5a4a',hi:'#c9b896',edge:'#3a2e22',beach:'#d8c8a0',label:'#fff4dc'},
};
// a small painted-grain tile, made once and reused as a pattern so the map stays light to draw
let RL_GRAIN=null;
function rlGrain(){if(RL_GRAIN)return RL_GRAIN;try{const c=document.createElement('canvas');c.width=c.height=160;const x=c.getContext('2d'),d=x.createImageData(160,160);
  let s=9;const r=()=>{s=(s*16807)%2147483647;return s/2147483647};
  for(let i=0;i<d.data.length;i+=4){const v=r();d.data[i]=d.data[i+1]=d.data[i+2]=v>.5?255:0;d.data[i+3]=Math.round(Math.abs(v-.5)*46)}
  x.putImageData(d,0,0);
  // a few broad brush blotches on top
  for(let i=0;i<22;i++){const g=x.createRadialGradient(r()*160,r()*160,0,r()*160,r()*160,20+r()*40);const w=r()>.5;g.addColorStop(0,w?'rgba(255,255,255,.07)':'rgba(0,0,0,.08)');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,160,160)}
  RL_GRAIN=c.toDataURL()}catch(e){RL_GRAIN=''}return RL_GRAIN}
const rlSh=(c,k)=>typeof shade==='function'?shade(c,k):c;
function rlTree(x,y,s,P,rnd){const h=(22+rnd()*10)*s,w=h*.62,tone=rnd();
  const dark=tone<.5?P.lo:rlSh(P.lo,-.1),lit=P.hi;
  return`<g transform="translate(${x} ${y})"><ellipse cx="${w*.25}" cy="2" rx="${w*.7}" ry="${w*.22}" fill="#000" opacity=".22"/><rect x="${-1.6*s}" y="${-h*.25}" width="${3.2*s}" height="${h*.3}" fill="#3a2a1a"/>
   <path d="M0 ${-h} C${w*.55} ${-h*.75} ${w*.7} ${-h*.3} ${w*.5} ${-h*.2} L${-w*.5} ${-h*.2} C${-w*.7} ${-h*.3} ${-w*.55} ${-h*.75} 0 ${-h}Z" fill="${dark}"/>
   <path d="M0 ${-h} C${-w*.5} ${-h*.75} ${-w*.62} ${-h*.35} ${-w*.42} ${-h*.24} C${-w*.1} ${-h*.5} ${-w*.05} ${-h*.8} 0 ${-h}Z" fill="${lit}" opacity=".55"/></g>`}
function rlRound(x,y,s,P,rnd){const r=(9+rnd()*5)*s;return`<g transform="translate(${x} ${y})"><ellipse cx="${r*.4}" cy="${r*.2}" rx="${r*1.1}" ry="${r*.35}" fill="#000" opacity=".2"/><rect x="${-1.5*s}" y="${-r*.6}" width="${3*s}" height="${r*.7}" fill="#3a2a1a"/><circle cy="${-r}" r="${r}" fill="${P.lo}"/><circle cx="${-r*.35}" cy="${-r*1.3}" r="${r*.55}" fill="${P.hi}" opacity=".5"/></g>`}
function rlMtn(x,y,s,c1,c2,snow,glow){const w=(46+Math.random()*0)*s,h=w*.85;
  return`<g transform="translate(${x} ${y})"><ellipse cx="${w*.3}" cy="2" rx="${w*.8}" ry="${w*.16}" fill="#000" opacity=".25"/><path d="M${-w*.6} 0 L${-w*.05} ${-h} L${w*.6} 0Z" fill="${c1}"/><path d="M${-w*.05} ${-h} L${w*.6} 0 L${w*.12} 0Z" fill="${c2}"/>
   ${snow?`<path d="M${-w*.05} ${-h} L${-w*.2} ${-h*.68} L${-w*.08} ${-h*.74} L${w*.02} ${-h*.62} L${w*.14} ${-h*.72} Z" fill="${snow}"/>`:''}${glow?`<path d="M${-w*.05} ${-h} q${w*.08} ${h*.3} ${-w*.02} ${h*.55} q${w*.12} ${h*.2} ${w*.04} ${h*.45}" stroke="${glow}" stroke-width="${2.2*s}" fill="none" opacity=".85"/>`:''}</g>`}
function rlDecor2(r,x,y,s,rnd){const P=RL_LAND[r],k=rnd();
  switch(r){
   case'g':return k<.12?rlMtn(x,y,s*.8,'#6a8a5a','#4a6a3f','#e8efe0'):k<.6?rlTree(x,y,s,P,rnd):rlRound(x,y,s,P,rnd);
   case'e':return k<.45?rlMtn(x,y,s,'#5a3428','#3a1e18',null,'#ff7a3a'):k<.6?`<g transform="translate(${x} ${y})"><ellipse rx="${16*s}" ry="${5*s}" fill="#ff6a2a" opacity=".55"/><ellipse rx="${9*s}" ry="${2.6*s}" fill="#ffd27a" opacity=".8"/></g>`:`<g transform="translate(${x} ${y})"><path d="M${-12*s} 0 L${-4*s} ${-14*s} L${6*s} ${-10*s} L${12*s} 0Z" fill="#3a221c"/><path d="M${-4*s} ${-14*s} L${6*s} ${-10*s} L${2*s} ${-4*s}Z" fill="#6a3a2a"/></g>`;
   case't':return k<.35?`<g transform="translate(${x} ${y})" opacity=".7"><path d="M${-16*s} 0 q${8*s} ${-6*s} ${16*s} 0 t${16*s} 0" stroke="#eafcff" stroke-width="${1.6*s}" fill="none"/></g>`:k<.7?`<g transform="translate(${x} ${y})"><path d="M0 0 q${2*s} ${-14*s} ${-4*s} ${-24*s}" stroke="#5a4a2a" stroke-width="${2.4*s}" fill="none"/>${[0,1,2,3].map(i=>`<path d="M${-4*s} ${-24*s} q${(i-1.5)*9*s} ${-4*s} ${(i-1.5)*14*s} ${6*s}" stroke="#3f8a5a" stroke-width="${3*s}" fill="none" stroke-linecap="round"/>`).join('')}</g>`:`<g transform="translate(${x} ${y})"><ellipse cx="${3*s}" cy="${2*s}" rx="${13*s}" ry="${4*s}" fill="#000" opacity=".2"/><path d="M${-12*s} 0 q${2*s} ${-10*s} ${12*s} ${-10*s} q${10*s} 0 ${12*s} ${10*s}Z" fill="#7a8a8a"/><path d="M${-2*s} ${-10*s} q${10*s} 0 ${12*s} ${10*s} L${4*s} 0Z" fill="#5a6a6a"/></g>`;
   case'l':return k<.6?`<g transform="translate(${x} ${y})"><ellipse cx="${4*s}" cy="2" rx="${14*s}" ry="${4*s}" fill="#000" opacity=".18"/><ellipse cy="${-12*s}" rx="${16*s}" ry="${20*s}" fill="#fff6c9" opacity=".18"/><path d="M0 ${-30*s} L${8*s} ${-8*s} L0 ${2*s} L${-8*s} ${-8*s}Z" fill="#e6f3ff"/><path d="M0 ${-30*s} L${8*s} ${-8*s} L0 ${2*s}Z" fill="#b9d4f0"/><path d="M${10*s} ${-14*s} L${14*s} ${-4*s} L${10*s} ${3*s} L${6*s} ${-4*s}Z" fill="#fff8dc"/></g>`:rlRound(x,y,s*.9,{lo:'#b8a86a',hi:'#fff4cc'},rnd);
   case'd':return k<.35?`<ellipse cx="${x}" cy="${y}" rx="${34*s}" ry="${9*s}" fill="#c9b8ff" opacity=".1"/>`:k<.75?`<g transform="translate(${x} ${y})" stroke="#140f1e" stroke-width="${3*s}" fill="none" stroke-linecap="round"><path d="M0 0 L0 ${-22*s} M0 ${-10*s} L${-9*s} ${-20*s} M0 ${-15*s} L${8*s} ${-26*s} M${-9*s} ${-20*s} L${-13*s} ${-18*s}"/><circle cx="${-4*s}" cy="${-12*s}" r="${1.4*s}" fill="#b9ff6a" stroke="none"/></g>`:`<g transform="translate(${x} ${y})"><ellipse rx="${14*s}" ry="${4*s}" fill="#1a3a2a" opacity=".8"/><ellipse rx="${8*s}" ry="${2*s}" fill="#3a6a4a" opacity=".6"/></g>`;
   case'a':return k<.55?`<g transform="translate(${x} ${y})"><ellipse cx="${4*s}" cy="2" rx="${16*s}" ry="${4*s}" fill="#000" opacity=".22"/><rect x="${-11*s}" y="${-24*s}" width="${22*s}" height="${24*s}" fill="#8a7a62"/><path d="M${-13*s} ${-24*s} L0 ${-34*s} L${13*s} ${-24*s}Z" fill="#5a3a2a"/><rect x="${-3*s}" y="${-12*s}" width="${6*s}" height="${12*s}" fill="#2a1e14"/><rect x="${-8*s}" y="${-20*s}" width="${4*s}" height="${4*s}" fill="#ffd27a"/><rect x="${4*s}" y="${-20*s}" width="${4*s}" height="${4*s}" fill="#ffd27a"/></g>`:`<g transform="translate(${x} ${y})">${[0,1,2,3].map(i=>`<path d="M${(i-2)*7*s} ${-i*3*s} l${6*s} ${-2*s}" stroke="${['#a83a3a','#3a5a9a','#4a7a3a','#c9a03a'][i]}" stroke-width="${4*s}"/>`).join('')}</g>`;
  }return''}
rlMapBase=function(){
  if(RLU.map)return RLU.map;
  const grain=rlGrain();
  let s=`<defs>
   <radialGradient id="rlsea" cx=".45" cy=".55" r=".8"><stop offset="0" stop-color="#2f6f86"/><stop offset=".55" stop-color="#1c4a66"/><stop offset="1" stop-color="#0d2236"/></radialGradient>
   ${grain?`<pattern id="rlgrain" width="160" height="160" patternUnits="userSpaceOnUse"><image href="${grain}" width="160" height="160"/></pattern>`:''}
   <pattern id="rlwav" width="90" height="46" patternUnits="userSpaceOnUse"><path d="M6 14 q10 -7 20 0 M52 34 q10 -7 20 0" stroke="#bfe6f0" stroke-width="1.6" fill="none" opacity=".22" stroke-linecap="round"/></pattern>
   <filter id="rlsoft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="14"/></filter>
   <filter id="rlsoft2" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="5"/></filter>
   <radialGradient id="rlcloud"><stop offset="0" stop-color="#f4f1fa" stop-opacity=".97"/><stop offset=".6" stop-color="#d9d3e6" stop-opacity=".9"/><stop offset="1" stop-color="#b9b1c9" stop-opacity="0"/></radialGradient>
   <radialGradient id="rlvig" cx=".5" cy=".5" r=".75"><stop offset=".6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#03070d" stop-opacity=".55"/></radialGradient>
   ${Object.keys(RL_LAND).map(r=>{const P=RL_LAND[r];return`<radialGradient id="rlland-${r}" cx=".42" cy=".38" r=".8"><stop offset="0" stop-color="${P.hi}"/><stop offset=".65" stop-color="${rlSh(P.lo,.12)}"/><stop offset="1" stop-color="${P.lo}"/></radialGradient>`}).join('')}
  </defs>
  <rect x="-500" y="-500" width="3000" height="2400" fill="url(#rlsea)"/>${grain?'<rect x="-500" y="-500" width="3000" height="2400" fill="url(#rlgrain)" opacity=".7"/>':''}<rect x="-500" y="-500" width="3000" height="2400" fill="url(#rlwav)"/>`;
  const regs={};for(const r in RL_REG){const ids=RL_NODES.filter(n=>n.reg===r).map(n=>n.id);regs[r]=rlBlob(ids,r==='a'?80:105)}
  // shallows and foam first, so every island sits in a ring of lighter water
  for(const r in regs){const b=regs[r];s+=`<path d="${b.d}" fill="none" stroke="#7fc6cf" stroke-width="70" opacity=".28" filter="url(#rlsoft)"/><path d="${b.d}" fill="none" stroke="#e8fbff" stroke-width="10" opacity=".35" filter="url(#rlsoft2)"/>`}
  for(const r in regs){const b=regs[r],P=RL_LAND[r];
    s+=`<path d="${b.d}" fill="#000" opacity=".4" transform="translate(6 18)" filter="url(#rlsoft2)"/>`+   // drop shadow: the land stands above the sea
      `<path d="${b.d}" fill="${P.edge}" transform="translate(0 9)"/>`+                                        // cliff face
      `<path d="${b.d}" fill="${P.beach}"/>`+                                                                   // shoreline
      `<path d="${b.d}" fill="url(#rlland-${r})" transform="translate(${b.cx} ${b.cy}) scale(.975) translate(${-b.cx} ${-b.cy})"/>`+
      (grain?`<path d="${b.d}" fill="url(#rlgrain)" opacity=".9"/>`:'')+
      `<path d="${b.d}" fill="none" stroke="${P.edge}" stroke-width="3" opacity=".6"/>`;
    const rnd=rlSeed('decor2'+r);const xs=b.poly.map(q=>q[0]),ys=b.poly.map(q=>q[1]),minX=Math.min(...xs),maxX=Math.max(...xs),minY=Math.min(...ys),maxY=Math.max(...ys);
    const pts=[];let tries=0;
    // clusters read better than an even sprinkle: grow little groves and ridges around seed points
    while(pts.length<70&&tries++<1800){const cx=minX+rnd()*(maxX-minX),cy=minY+rnd()*(maxY-minY),n=2+Math.floor(rnd()*4);
      for(let i=0;i<n;i++){const x=cx+(rnd()-.5)*70,y=cy+(rnd()-.5)*40;
        if(!rlInPoly(x,y,b.poly)||!rlInPoly(x,y-30,b.poly))continue;if(RL_NODES.some(nd=>Math.hypot(nd.x-x,nd.y-y)<52))continue;
        if(RL_EDGES.some(([a,c])=>{const A=RL_N[a],C=RL_N[c];if(A.reg!==r&&C.reg!==r)return false;const t=Math.max(0,Math.min(1,((x-A.x)*(C.x-A.x)+(y-A.y)*(C.y-A.y))/((C.x-A.x)**2+(C.y-A.y)**2||1)));return Math.hypot(A.x+(C.x-A.x)*t-x,A.y+(C.y-A.y)*t-y)<24}))continue;
        pts.push([x,y])}}
    pts.sort((a,c)=>a[1]-c[1]);for(const[x,y]of pts)s+=rlDecor2(r,x.toFixed(0),y.toFixed(0),(.75+rnd()*.6).toFixed(2),rnd);
    const ly=Math.max(...ys)-26,R=RL_REG[r];
    s+=`<text x="${b.cx}" y="${ly}" text-anchor="middle" class="rl-mlabel" style="fill:${P.label}">${R.n.toUpperCase()}</text>`;
  }
  // compass rose, bottom left of the known world
  s+=`<g transform="translate(70 1420)" opacity=".75"><circle r="44" fill="none" stroke="#e8d9b0" stroke-width="1.5"/><circle r="36" fill="none" stroke="#e8d9b0" stroke-width=".8" stroke-dasharray="3 4"/>${[0,1,2,3].map(i=>`<path d="M0 -50 L7 -8 L0 0 L-7 -8Z" fill="${i%2?'#c9b88a':'#f4ead0'}" transform="rotate(${i*90})"/>`).join('')}<text y="-56" text-anchor="middle" fill="#f4ead0" font-size="16" font-family="Georgia,serif">N</text></g>`;
  RLU.map={s,regs};return RLU.map;
};
// clouds over regions that are still sealed, instead of hatching
(function(){const old=rlWorld;rlWorld=function(s,p){let h=old(s,p);
  h=h.replace(/<path d="([^"]+)" fill="url\(#rlfog\)" opacity="\.86"\/>/g,(m,d)=>{const r=Object.keys(RLU.map.regs).find(k=>RLU.map.regs[k].d===d),b=RLU.map.regs[r],rnd=rlSeed('cloud'+r);
    let c=`<g class="rl-clouds"><path d="${d}" fill="#c9c1d9" opacity=".72"/>`;const xs=b.poly.map(q=>q[0]),ys=b.poly.map(q=>q[1]);
    for(let i=0;i<26;i++){const x=Math.min(...xs)+rnd()*(Math.max(...xs)-Math.min(...xs)),y=Math.min(...ys)+rnd()*(Math.max(...ys)-Math.min(...ys)),R=60+rnd()*80;c+=`<ellipse cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" rx="${R.toFixed(0)}" ry="${(R*.6).toFixed(0)}" fill="url(#rlcloud)"/>`}
    return c+'</g>'});
  // lock badges go on top of every cloud bank
  const locks=[];h=h.replace(/<g class="rl-lock"[^>]*>.*?<\/g>/g,m=>{locks.push(m);return''});
  const i=h.indexOf('<g class="rl-node');if(i>0)h=h.slice(0,i)+locks.join('')+h.slice(i);else h=h.replace('<g id="rl-token"',locks.join('')+'<g id="rl-token"');
  return h.replace('</g></svg>','</g><rect x="0" y="0" width="920" height="600" fill="url(#rlvig)" pointer-events="none"/></svg>')}})();
(function(){const st=document.createElement('style');st.textContent=`
.rl-map{background:#0d2236}
.rl-mlabel{font-family:Georgia,"Times New Roman",serif;font-style:italic;font-size:30px;letter-spacing:.16em;opacity:.85;paint-order:stroke;stroke:#1a140c;stroke-width:5px;stroke-opacity:.55}
.rl-road{stroke:#2a1e12;stroke-width:9;stroke-dasharray:none;opacity:.35}
.rl-road+.rl-road{}
.rl-road.locked{opacity:.12}
.rl-roadtop{fill:none;stroke:#f1e2b8;stroke-width:3.2;stroke-dasharray:2 9;stroke-linecap:round;opacity:.95}
.rl-roadtop.locked{opacity:.25}
.rl-node .rl-nbg{fill:url(#rlmed);stroke:#e8c97a;stroke-width:3;filter:drop-shadow(0 4px 3px rgba(0,0,0,.55))}
.rl-node .rl-nring{stroke:#ffe9a8;stroke-width:3}
.rl-node.vis .rl-nbg{fill:url(#rlmed)}
.rl-node.t-boss .rl-nbg{fill:url(#rlmedb);stroke:#ffd060;stroke-width:4}
.rl-node.t-elite .rl-nbg{fill:url(#rlmede)}
.rl-node.t-town .rl-nbg{fill:url(#rlmedt)}
.rl-node.t-dungeon .rl-nbg,.rl-node.t-tower .rl-nbg{fill:url(#rlmedd)}
.rl-node.t-chest .rl-nbg{fill:url(#rlmedc)}
.rl-node.t-shrine .rl-nbg{fill:url(#rlmeds)}
.rl-node.clr .rl-nbg{stroke:#7fe6b5}
.rl-node.t-boss .rl-nring{stroke:#ff7a5a;stroke-opacity:.6;animation:rlPulse 1.8s ease-in-out infinite}
.rl-nlv{font-family:Georgia,serif;font-size:14px;font-weight:700;fill:#fff8e6;stroke:#1a140c;stroke-width:4px;stroke-opacity:.85}
.rl-q{font-family:Georgia,serif;fill:#ffe9a8}
.rl-clouds{pointer-events:none}
.rl-lock rect{fill:rgba(30,24,40,.82);stroke:#e8c97a;stroke-opacity:.6}
.rl-lock text{font-family:Georgia,serif;letter-spacing:.2em}
`;document.head.appendChild(st)})();
// shared medallion gradients and a two-layer trail for roads
(function(){const old=rlWorld;rlWorld=function(s,p){let h=old(s,p);
  const med=(id,a,b)=>`<radialGradient id="${id}" cx=".38" cy=".32" r=".75"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></radialGradient>`;
  const defs=`<defs>${med('rlmed','#5a4a6a','#211a2c')}${med('rlmedb','#a83a3a','#3a0c12')}${med('rlmede','#8a3a6a','#2a0e22')}${med('rlmedt','#4a8a5a','#16301e')}${med('rlmedd','#3a6a9a','#0e1e34')}${med('rlmedc','#b07a3a','#3a220e')}${med('rlmeds','#3a9aa8','#0e2a34')}</defs>`;
  h=h.replace(/<path d="([^"]+)" class="rl-road( locked)?"\/>/g,(m,d,l)=>`${m}<path d="${d}" class="rl-roadtop${l||''}"/>`);
  return h.replace('<g id="rl-pan"',defs+'<g id="rl-pan"')}})();
