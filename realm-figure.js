"use strict";
/* ================================================================
   REALM FIGURES: heroic-proportion hero art (about 7 heads tall),
   three-quarter view facing right. Replaces the avatar-based busts
   for hero portraits and battle sprites. Loaded after realm-battle.js.
   Canvas: 200 × 400, feet near y 390.
   ================================================================ */
const RLF_INK='#17121d';
const RLF_HAIR=['buzz','swept','curly','afro','long','bun','braids','bald','part','short','tail','bob','spiky','locs'];
function rlfCap(x1,y1,w1,x2,y2,w2){const dx=x2-x1,dy=y2-y1,l=Math.hypot(dx,dy)||1,nx=-dy/l,ny=dx/l,r1=w1/2,r2=w2/2,f=v=>v.toFixed(1);
  return`M${f(x1+nx*r1)} ${f(y1+ny*r1)} L${f(x2+nx*r2)} ${f(y2+ny*r2)} A${f(r2)} ${f(r2)} 0 0 0 ${f(x2-nx*r2)} ${f(y2-ny*r2)} L${f(x1-nx*r1)} ${f(y1-ny*r1)} A${f(r1)} ${f(r1)} 0 0 0 ${f(x1+nx*r1)} ${f(y1+ny*r1)}Z`}
/* draw a group of shapes as one piece: outlines first, then fills, then shading */
function rlfPart(ds,fill,P,o){o=o||{};const sw=o.sw||3;
  return ds.map(d=>`<path d="${d}" fill="none" stroke="${RLF_INK}" stroke-width="${sw}" stroke-linejoin="round"/>`).join('')+ds.map(d=>`<path d="${d}" fill="${fill}"/>`).join('')+(o.flat?'':ds.map(d=>`<path d="${d}" fill="url(#${P}${o.back?'sb':'sh'})"/>`).join(''))}
function rlfLimb(pts,fill,P,o){o=o||{};const ds=[];for(let i=0;i<pts.length-1;i++){const a=pts[i],b=pts[i+1];ds.push(rlfCap(a[0],a[1],a[2],b[0],b[1],b[2]))}
  let out=ds.map(d=>`<path d="${d}" fill="none" stroke="${RLF_INK}" stroke-width="3" stroke-linejoin="round"/>`).join('')+ds.map(d=>`<path d="${d}" fill="${fill}"/>`).join('');
  if(o.back)out+=`<g opacity=".32">${ds.map(d=>`<path d="${d}" fill="#000"/>`).join('')}</g>`;
  else{const hl=pts.map((q,i)=>{const n=pts[Math.min(i+1,pts.length-1)],m=pts[Math.max(i-1,0)],dx=n[0]-m[0],dy=n[1]-m[1],l=Math.hypot(dx,dy)||1;return[(q[0]+dy/l*q[2]*.28).toFixed(1),(q[1]-dx/l*q[2]*.28).toFixed(1)]});
    out+=`<path d="M${hl.map(q=>q.join(' ')).join(' L')}" stroke="#fff" stroke-opacity=".16" stroke-width="${(pts[0][2]*.22).toFixed(1)}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
    const sh=pts.map((q,i)=>{const n=pts[Math.min(i+1,pts.length-1)],m=pts[Math.max(i-1,0)],dx=n[0]-m[0],dy=n[1]-m[1],l=Math.hypot(dx,dy)||1;return[(q[0]-dy/l*q[2]*.3).toFixed(1),(q[1]+dx/l*q[2]*.3).toFixed(1)]});
    out+=`<path d="M${sh.map(q=>q.join(' ')).join(' L')}" stroke="#000" stroke-opacity=".22" stroke-width="${(pts[0][2]*.3).toFixed(1)}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`}
  return out}
function rlfHand(x,y,rot,skin,P,open){const d=open?`M${x-7} ${y+3} Q${x-8} ${y-6} ${x} ${y-7} Q${x+9} ${y-7} ${x+10} ${y-1} L${x+14} ${y-4} Q${x+16} ${y-1} ${x+12} ${y+3} Q${x+6} ${y+8} ${x-7} ${y+3}Z`:`M${x-7} ${y-6} Q${x+2} ${y-10} ${x+8} ${y-5} Q${x+11} ${y+1} ${x+7} ${y+7} Q${x-1} ${y+10} ${x-7} ${y+5} Q${x-10} ${y} ${x-7} ${y-6}Z`;
  return`<g transform="rotate(${rot} ${x} ${y})">${rlfPart([d],skin,P,{sw:2.4})}${open?'':`<path d="M${x-4} ${y-3} L${x+6} ${y-3} M${x-4} ${y+1} L${x+6} ${y+1}" stroke="${shade(skin,-.4)}" stroke-width="1"/>`}</g>`}
const RLF_POSE={sh:[86,104],fs:[130,104],be:[73,148],bh:[78,186],fe:[148,138],fh:[162,158],hipB:[97,198],hipF:[119,198],bk:[85,288],ba:[78,366],fk:[134,286],fa:[143,366]};

function rlFigure(id){
  if(rlFigure.c[id])return rlFigure.c[id];
  const h=RL_H[id],L=h.lk,P='f'+id,T=HITEM['hx-t-'+id].d,E=RL_EL[h.el];
  const skin=SKINS[L[0]]||SKINS[3],skD=shade(skin,-.22),skDD=shade(skin,-.42),hc=HAIRC[L[2]]||HAIRC[0],hcD=shade(hc,-.35),hcL=shade(hc,.25),eye=EYEC[L[6]]||EYEC[0];
  const c1=T.c1,c2=T.c2,c3=T.c3,steel=RL_STEEL,o=h.o,armor=o==='armor';
  const pants=armor?'#3a3545':shade(o==='robe'?c1:c2,-.55),boot=armor?steel[0]:'#3b2a1d',bootD=shade(boot,-.3);
  const hg=h.hg,X=RLF_POSE;let hair=RLF_HAIR[L[1]]||'short';
  const covered=['hood','helm','witch','feather'].includes(hg);
  /* ---------- defs ---------- */
  const defs=`<defs><linearGradient id="${P}sh" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".32"/><stop offset=".45" stop-color="#000" stop-opacity="0"/><stop offset=".8" stop-color="#fff" stop-opacity=".1"/><stop offset="1" stop-color="#fff" stop-opacity=".18"/></linearGradient>
<linearGradient id="${P}sb" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".5"/><stop offset="1" stop-color="#000" stop-opacity=".25"/></linearGradient>
<linearGradient id="${P}st" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${steel[1]}"/><stop offset=".5" stop-color="${steel[0]}"/><stop offset="1" stop-color="${steel[2]}"/></linearGradient>
<radialGradient id="${P}sk" cx=".62" cy=".4" r=".7"><stop offset="0" stop-color="${shade(skin,.12)}"/><stop offset=".6" stop-color="${skin}"/><stop offset="1" stop-color="${skD}"/></radialGradient>
<linearGradient id="${P}hr" x1="0" y1="0" x2=".4" y2="1"><stop offset="0" stop-color="${hcL}"/><stop offset=".55" stop-color="${hc}"/><stop offset="1" stop-color="${hcD}"/></linearGradient>
<radialGradient id="${P}gl" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff"/><stop offset=".35" stop-color="${E.l}"/><stop offset=".7" stop-color="${E.c}" stop-opacity=".8"/><stop offset="1" stop-color="${E.c}" stop-opacity="0"/></radialGradient>
<filter id="${P}bl" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2.5"/></filter></defs>`;
  const metal=armor?`url(#${P}st)`:null;
  /* ---------- back hair & capes (behind everything) ---------- */
  let behind='';
  if(o==='cloak'||(o==='robe'&&h.role==='sup'&&L[1]%2===0))behind+=rlfPart([`M84 98 Q60 200 50 332 Q66 352 92 344 Q86 250 104 108Z`],c1,P,{back:true});
  if(o==='coat')behind+=rlfPart([`M90 176 Q80 250 66 306 Q84 316 102 308 L106 190Z`],shade(c1,-.12),P,{back:true});
  if(!covered||hg==='feather'){
    if(hair==='long'||hair==='locs'||hair==='braids'||hair==='part')behind+=rlfPart([`M88 34 Q70 70 74 128 Q86 136 98 128 Q94 92 100 60Z`],`url(#${P}hr)`,P,{flat:true});
    if(hair==='tail')behind+=rlfPart([`M88 30 Q66 34 64 70 Q62 104 72 126 Q78 100 80 76 Q84 52 96 44Z`],`url(#${P}hr)`,P,{flat:true});
    if(hair==='bob')behind+=rlfPart([`M86 30 Q72 60 80 82 Q92 88 100 80 L100 50Z`],`url(#${P}hr)`,P,{flat:true});
    if(hair==='afro')behind+=`<circle cx="104" cy="34" r="34" fill="${RLF_INK}"/><circle cx="104" cy="34" r="32" fill="url(#${P}hr)"/>`;
  }
  /* ---------- back limbs ---------- */
  const legW=armor?[24,18,13]:[23,16,11];
  let backLeg=rlfLimb([[...X.hipB,legW[0]],[...X.bk,legW[1]],[...X.ba,legW[2]]],armor?metal:pants,P,{back:true});
  let frontLeg=rlfLimb([[...X.hipF,legW[0]],[...X.fk,legW[1]],[...X.fa,legW[2]]],armor?metal:pants,P);
  if(armor){backLeg+=rlfPart([`M76 278 Q86 270 94 280 Q92 296 84 298 Q76 294 76 278Z`],`url(#${P}st)`,P,{back:true});frontLeg+=rlfPart([`M124 276 Q136 268 144 280 Q142 296 132 298 Q124 292 124 276Z`],`url(#${P}st)`,P)}
  const bootB=rlfPart([`M68 340 L90 340 L92 376 L104 380 Q108 388 102 391 L66 391 Q62 384 66 376Z`],boot,P,{back:true}),bootF=rlfPart([`M132 340 L154 340 L154 372 L174 380 Q180 388 172 391 L134 391 Q130 382 132 372Z`],boot,P);
  const cuffB=armor?'':`<path d="M68 344 H90" stroke="${bootD}" stroke-width="3"/>`,cuffF=armor?'':`<path d="M132 344 H154" stroke="${bootD}" stroke-width="3"/>`;
  const sleeve=armor?metal:o==='vest'||o==='tunic'?c2:c1;
  const armWB=o==='robe'?[17,16,20]:[15,12,10],armWF=o==='robe'?[17,16,20]:[15,12,10];
  const backArm=rlfLimb([[...X.sh,armWB[0]],[...X.be,armWB[1]],[...X.bh,armWB[2]]],sleeve,P,{back:true})+(o==='vest'||o==='tunic'?rlfLimb([[74,160,13],[77,180,12]],shade(c1,-.1),P,{back:true}):'')+rlfHand(X.bh[0],X.bh[1]+6,100,skin,P);
  /* ---------- torso & clothing ---------- */
  const torsoD=`M84 102 Q108 90 134 98 L139 118 Q137 150 129 178 L126 200 L90 202 L88 178 Q80 142 80 114Z`;
  let torso='',over='';
  switch(o){
   case'robe':torso=rlfPart([torsoD],c1,P)+rlfPart([`M88 176 L130 176 Q146 270 152 374 Q114 386 72 378 Q78 270 88 176Z`],c1,P)+`<path d="M108 98 L114 176 L120 378" stroke="${c2}" stroke-width="9" fill="none"/><path d="M108 98 L114 176 L120 378" stroke="${c3}" stroke-width="2" fill="none" transform="translate(4 0)"/><path d="M74 368 Q114 378 151 366" stroke="${c2}" stroke-width="7" fill="none"/><path d="M86 172 Q110 182 132 172 L132 184 Q110 194 86 184Z" fill="${c2}" stroke="${RLF_INK}" stroke-width="2"/><circle cx="116" cy="181" r="4" fill="${c3}" stroke="${RLF_INK}" stroke-width="1.5"/><path d="M98 200 Q96 280 92 360 M132 210 Q138 280 140 360" stroke="${shade(c1,-.35)}" stroke-width="2" fill="none" opacity=".7"/>`;break;
   case'armor':torso=rlfPart([torsoD],metal,P)+rlfPart([`M98 104 L128 102 L130 196 L102 198Z`],c1,P)+`<g transform="translate(114 138)">${rlGlyph(h.el,c3,1.1)}</g>`+rlfPart([`M84 182 L130 180 L136 222 L120 226 L112 206 L104 226 L86 222Z`],metal,P)+rlfPart([`M86 178 L132 176 L132 188 L86 190Z`],c2,P,{flat:true});
     over=rlfPart([`M116 96 Q142 86 152 110 Q150 124 138 126 Q126 112 114 110Z`],metal,P)+rlfPart([`M118 112 Q138 104 150 120`],'none',P,{flat:true});break;
   case'cloak':torso=rlfPart([torsoD],c2,P)+rlfPart([`M88 176 L128 176 L134 238 Q110 246 86 238Z`],c2,P)+rlfPart([`M84 102 Q104 92 130 98 Q122 116 104 124 Q90 118 84 102Z`],c1,P)+`<rect x="86" y="178" width="46" height="9" fill="${shade(c2,-.4)}" stroke="${RLF_INK}" stroke-width="1.5"/><circle cx="118" cy="110" r="5" fill="${c3}" stroke="${RLF_INK}" stroke-width="1.5"/>`;break;
   case'vest':torso=rlfPart([torsoD],c2,P)+rlfPart([`M88 108 Q100 100 110 104 L116 196 L90 200 Q84 150 88 108Z M118 102 Q130 100 136 108 Q136 150 128 196 L120 196Z`],c1,P)+rlfPart([`M88 176 L130 176 L134 232 Q110 240 86 232Z`],shade(c1,-.1),P)+`<path d="M86 110 L132 186" stroke="${c3}" stroke-width="6"/><rect x="86" y="180" width="46" height="9" fill="${shade(c3,-.3)}" stroke="${RLF_INK}" stroke-width="1.5"/><rect x="104" y="179" width="10" height="11" rx="2" fill="${c3}" stroke="${RLF_INK}" stroke-width="1.5"/>`;break;
   case'coat':torso=rlfPart([torsoD],c1,P)+rlfPart([`M106 98 L122 98 L124 176 L112 180Z`],'#ece6dc',P)+`<path d="M112 100 L118 100 L117 122 L114 126 L111 122Z" fill="${c3}" stroke="${RLF_INK}" stroke-width="1.2"/>`+rlfPart([`M100 100 L112 180 L104 182 L96 120Z`],c2,P)+rlfPart([`M122 98 L134 100 L128 176 L124 176Z`],c2,P)+rlfPart([`M110 182 L130 178 Q140 240 146 300 Q130 310 116 304 Z`],c1,P)+`<circle cx="126" cy="142" r="2.6" fill="${c3}"/><circle cx="125" cy="158" r="2.6" fill="${c3}"/>`;break;
   default:torso=rlfPart([torsoD],c1,P)+rlfPart([`M88 176 L130 176 L136 236 Q110 244 84 236Z`],c1,P)+`<path d="M108 100 L114 128" stroke="${shade(c1,-.4)}" stroke-width="3"/><path d="M109 108 L116 110 M110 116 L117 118" stroke="${c3}" stroke-width="1.6"/><rect x="86" y="178" width="46" height="9" fill="${c2}" stroke="${RLF_INK}" stroke-width="1.5"/><path d="M86 232 Q110 240 136 232" stroke="${c2}" stroke-width="5" fill="none"/>`;
  }
  if(armor){torso=rlfPart([`M78 98 Q86 90 96 98 Q98 112 90 122 Q80 118 78 98Z`],metal,P,{back:true})+torso}
  /* ---------- neck & head ---------- */
  const neck=rlfPart([`M101 62 L102 92 Q110 98 120 92 L119 66Z`],skD,P,{flat:true})+`<path d="M103 84 Q111 90 119 84" stroke="${skDD}" stroke-width="2" fill="none" opacity=".6"/>`;
  const headD=`M88 40 C84 12 124 4 130 30 C132 38 131 44 134 50 L137 58 Q136 60 132 60 C133 64 130 66 129 67 C127 73 121 77 114 76 C105 75 97 67 93 59 C89 54 88 47 88 40Z`;
  const ex=L[3]|0;const mouth=[`M121 66 Q125 66.6 129 65.6`,`M120 65.5 Q125 68 129.5 64.4`,`M120.5 66 Q125 66.8 129.6 63.6`,`M120 64.8 Q125 69.4 130 64`,`M121 66.6 Q125 65.4 129 66.4`,`M121.4 66.4 H129`][ex]||`M121 66 Q125 66.6 129 65.6`;
  const browW=[2.6,3.6,1.8,2.4,2.8][L[7]|0]||2.6,browUp=ex===4?-1.5:ex===3?1.2:0,eyeH=[1,1.25,.8,.95,.75][L[5]|0]||1,lid=ex===5?.6:1;
  const head=`<path d="${headD}" fill="none" stroke="${RLF_INK}" stroke-width="3.2" stroke-linejoin="round"/><path d="${headD}" fill="url(#${P}sk)"/>
<path d="M95 60 Q104 72 116 75" stroke="${skDD}" stroke-width="3" fill="none" opacity=".35"/>
<ellipse cx="97" cy="49" rx="5.2" ry="8" fill="${skin}" stroke="${RLF_INK}" stroke-width="2"/><path d="M97.5 44 Q95 49 98 54" stroke="${skDD}" stroke-width="1.4" fill="none"/>
<g class="fg-eyes"><path d="M108.5 47.5 Q114 ${47.5-4*eyeH*lid} 120 46.4 Q114.5 ${47.5+2.6*eyeH} 108.5 47.5Z" fill="#f3eee8" stroke="${RLF_INK}" stroke-width="1.3"/><circle cx="115.4" cy="47.2" r="${2.3*Math.min(1,eyeH)}" fill="${eye}"/><circle cx="115.6" cy="47.2" r="1.1" fill="#0b0807"/><circle cx="114.6" cy="46.2" r=".6" fill="#fff"/><path d="M108 47.4 Q114 ${47.5-4.4*eyeH*lid} 120.6 46.2" stroke="${RLF_INK}" stroke-width="1.9" fill="none" stroke-linecap="round"/>
<path d="M124.5 46 Q127.3 ${45.6-2.6*eyeH*lid} 129.6 45 Q127.5 ${46.6+1.5*eyeH} 124.5 46Z" fill="#f3eee8" stroke="${RLF_INK}" stroke-width="1.1"/><circle cx="127.6" cy="45.8" r="1.25" fill="${eye}"/><path d="M124.2 45.9 Q127.3 ${45.4-2.9*eyeH*lid} 130 44.8" stroke="${RLF_INK}" stroke-width="1.4" fill="none" stroke-linecap="round"/></g>
<path d="M106 ${40.5-browUp} Q113 ${36-browUp} 121 ${38.5-browUp+(ex===4?2:0)}" stroke="${hcD}" stroke-width="${browW}" fill="none" stroke-linecap="round"/><path d="M124 ${38.6-browUp+(ex===4?1:0)} Q127.5 ${37.4-browUp} 131 ${39-browUp}" stroke="${hcD}" stroke-width="${browW*.75}" fill="none" stroke-linecap="round"/>
<path d="M130 49 L135.5 57.5 Q134 60 130.5 59.4" stroke="${skDD}" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".85"/>
<path d="${mouth}" stroke="${shade(mixHex(skin,'#a8505a',.5),-.3)}" stroke-width="1.9" fill="none" stroke-linecap="round"/><path d="M122.5 68.6 Q125.5 69.6 128 68.4" stroke="${mixHex(skin,'#a8505a',.4)}" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".7"/>
${ex===3?`<path d="M121 65.4 Q125 67.6 129.4 64.6 L129 66 Q125 68.4 121.4 66.4Z" fill="#f4efe7"/>`:''}
${(L[9]|0)===1?[[118,55],[121,57],[124,55],[126,57.5],[111,54]].map(q=>`<circle cx="${q[0]}" cy="${q[1]}" r=".7" fill="${skDD}" opacity=".8"/>`).join(''):''}${(L[9]|0)===4?`<path d="M100 62 Q112 78 129 66 L130 70 Q120 80 106 74Z" fill="${hcD}" opacity=".25"/>`:''}
<path d="M126 30 Q131 40 132 49" stroke="#fff" stroke-opacity=".25" stroke-width="2" fill="none"/>`;
  /* ---------- hair (front) ---------- */
  const HP=d=>rlfPart([d],`url(#${P}hr)`,P,{flat:true,sw:2.6});
  const cap=`M86 46 C80 12 126 0 133 30 C127 24 114 22 105 27 C98 32 95 41 94 52 Z`;
  let hairF='';
  if(covered&&hg!=='feather'){hairF=HP(`M120 26 Q131 28 131 38 Q124 32 116 32Z`)}
  else switch(hair){
   case'bald':hairF='';break;
   case'buzz':hairF=`<path d="${cap}" fill="${hc}" opacity=".85" stroke="${RLF_INK}" stroke-width="1.6"/>`;break;
   case'swept':case'spiky':hairF=HP(hair==='spiky'?`M84 48 C76 22 92 8 104 10 L106 0 L114 10 L124 2 L124 14 L138 12 L132 24 L142 30 Q132 30 124 28 C114 26 104 30 98 40 Q94 46 94 54Z`:`M84 48 C78 14 122 -2 136 22 Q140 30 138 38 Q128 26 116 28 C106 30 98 38 95 52Z`);break;
   case'curly':case'afro':hairF=[[92,30,13],[104,18,14],[118,16,13],[128,26,10],[90,44,10],[110,26,12]].map(q=>`<circle cx="${q[0]}" cy="${q[1]}" r="${q[2]+(hair==='afro'?3:0)}" fill="${RLF_INK}"/>`).join('')+[[92,30,11.6],[104,18,12.6],[118,16,11.6],[128,26,8.6],[90,44,8.6],[110,26,10.6]].map(q=>`<circle cx="${q[0]}" cy="${q[1]}" r="${q[2]+(hair==='afro'?3:0)}" fill="url(#${P}hr)"/>`).join('');break;
   case'bun':hairF=`<circle cx="92" cy="14" r="11" fill="url(#${P}hr)" stroke="${RLF_INK}" stroke-width="2.4"/>`+HP(cap);break;
   case'part':hairF=HP(`M84 52 C78 14 124 0 134 28 Q136 36 134 44 Q126 30 116 30 Q112 22 108 30 C100 34 96 42 95 54Z`);break;
   case'bob':hairF=HP(`M84 54 C76 12 128 0 136 34 L134 42 Q122 34 108 34 C100 36 96 44 96 56Z`);break;
   default:hairF=HP(cap);
  }
  if(!covered&&hair!=='bald'&&hair!=='buzz')hairF+=`<path d="M98 20 Q112 10 126 18" stroke="#fff" stroke-opacity=".22" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
  if(hair==='braids'&&!covered)hairF+=[0,1,2,3].map(i=>`<ellipse cx="${86-i*1.5}" cy="${70+i*13}" rx="6" ry="7.5" fill="url(#${P}hr)" stroke="${RLF_INK}" stroke-width="2"/>`).join('');
  /* ---------- headgear ---------- */
  let gear='';const gc=hg==='helm'?metal:hg==='tiara'||hg==='circlet'?'#e0b100':hg==='antlers'?'#6b4423':c1;
  switch(hg){
   case'hood':gear=rlfPart([`M80 64 C68 22 104 -4 132 18 C142 28 142 46 139 58 L133 57 C131 42 124 28 108 28 C96 30 92 42 94 58 C96 74 104 86 112 94 L96 108 C84 98 80 82 80 64Z`],c1,P)+`<path d="M133 57 C131 42 124 28 108 28 C96 30 92 42 94 58 C96 74 104 86 112 94" stroke="${shade(c1,-.5)}" stroke-width="4" fill="none" opacity=".7"/>`;break;
   case'helm':gear=rlfPart([`M100 12 Q118 -10 152 2 Q132 6 120 18Z`],c2,P,{sw:2.4})+rlfPart([`M84 46 C80 14 126 4 134 30 L137 44 L129 46 C127 34 119 27 108 27 C98 28 93 38 93 50 L95 64 L87 68 C84 60 84 52 84 46Z`],metal,P)+`<path d="M86 38 Q110 26 135 36" stroke="${c2}" stroke-width="3.5" fill="none"/>`;break;
   case'circlet':gear=`<path d="M90 34 Q112 24 133 31" stroke="${RLF_INK}" stroke-width="5" fill="none"/><path d="M90 34 Q112 24 133 31" stroke="#e0b100" stroke-width="3" fill="none"/><path d="M118 23 L122 28 L118 33 L114 28Z" fill="${c3}" stroke="${RLF_INK}" stroke-width="1.2"/>`;break;
   case'feather':gear=rlfPart([`M88 28 C88 4 128 2 130 26Z`],c1,P)+rlfPart([`M76 30 Q108 18 142 30 Q108 40 76 30Z`],shade(c1,-.2),P)+rlfPart([`M92 20 Q70 -6 40 -6 Q66 6 84 26Z`],c3,P,{sw:2})+`<path d="M90 24 Q120 18 129 22" stroke="${c2}" stroke-width="4" fill="none"/>`;break;
   case'tiara':gear=rlfPart([`M98 22 L102 10 L108 18 L114 4 L120 16 L126 8 L128 24 Q114 18 98 22Z`],'#e0b100',P,{sw:2,flat:true})+`<circle cx="114" cy="14" r="2.6" fill="${c3}"/>`;break;
   case'witch':gear=rlfPart([`M84 30 L66 -44 Q100 -20 128 26Z`],c1,P)+rlfPart([`M70 32 Q108 14 146 30 Q108 42 70 32Z`],shade(c1,-.2),P)+`<path d="M86 26 Q108 18 128 24" stroke="${c3}" stroke-width="4" fill="none"/>`;break;
   case'antlers':gear=`<g stroke="${RLF_INK}" stroke-width="7" fill="none" stroke-linecap="round"><path d="M96 22 Q86 0 92 -18 M90 4 Q78 0 72 -10 M118 18 Q124 -4 140 -14 M126 4 Q138 4 146 -2"/></g><g stroke="#7a5230" stroke-width="4.4" fill="none" stroke-linecap="round"><path d="M96 22 Q86 0 92 -18 M90 4 Q78 0 72 -10 M118 18 Q124 -4 140 -14 M126 4 Q138 4 146 -2"/></g>`;break;
  }
  /* ---------- front arm & held item ---------- */
  const it=h.it,FH=X.fh;let itemBack='',itemFront='',handOpen=false,handRot=-20;
  const glow=(x,y,r)=>`<circle cx="${x}" cy="${y}" r="${r*1.9}" fill="url(#${P}gl)" class="rl-glow"/>`;
  switch(it){
   case'staff':itemBack=`<path d="M169 392 L153 26" stroke="${RLF_INK}" stroke-width="9" stroke-linecap="round"/><path d="M169 392 L153 26" stroke="#6b4423" stroke-width="5.5" stroke-linecap="round"/><path d="M168 390 L152.6 30" stroke="#a87a48" stroke-width="1.5"/>`+rlfPart([`M140 30 Q144 6 158 2 Q150 12 152 24 Q160 14 170 16 Q160 24 160 34Z`],'#8a6a3a',P,{sw:2.2})+glow(153,20,9)+`<circle cx="153" cy="20" r="6" fill="#fff"/>`;break;
   case'orb':handOpen=true;handRot=-8;itemFront=`<g class="fg-item">${glow(170,124,15)}<circle cx="170" cy="124" r="12" fill="${E.c}" stroke="${RLF_INK}" stroke-width="2"/><circle cx="170" cy="124" r="12" fill="url(#${P}gl)"/><ellipse class="rl-spin" cx="170" cy="124" rx="22" ry="6" fill="none" stroke="${E.l}" stroke-width="1.6" style="transform-origin:170px 124px"/></g>`;break;
   case'book':handOpen=true;itemFront=`<g class="fg-item">${glow(174,136,12)}${rlfPart([`M150 140 L172 146 L172 168 L150 160Z`],'#f4efe7',P,{sw:2,flat:true})}${rlfPart([`M194 136 L172 146 L172 168 L194 158Z`],'#e6dccb',P,{sw:2,flat:true})}<path d="M154 148 L168 152 M154 154 L168 158 M176 152 L190 147 M176 158 L190 153" stroke="${E.c}" stroke-width="1.5"/></g>`;break;
   case'shield':itemFront=rlfPart([`M140 128 L184 128 L184 168 Q184 200 162 218 Q140 200 140 168Z`],E.d,P)+`<path d="M146 134 L178 134 L178 168 Q178 194 162 208 Q146 194 146 168Z" fill="${E.c}" opacity=".85"/><g transform="translate(162 168)">${rlGlyph(h.el,'#fff',1.25)}</g><path d="M148 138 L158 138" stroke="#fff" stroke-opacity=".5" stroke-width="3" stroke-linecap="round"/>`;break;
   case'lantern':itemFront=`<path d="M162 164 L162 180" stroke="${RLF_INK}" stroke-width="2.5"/><g class="fg-item">${glow(162,198,16)}${rlfPart([`M150 182 L174 182 L176 188 L148 188Z`],'#3a3545',P,{sw:2,flat:true})}<rect x="151" y="188" width="22" height="22" rx="3" fill="${E.l}" stroke="${RLF_INK}" stroke-width="2.4"/><path d="M162 188 V210 M151 199 H173" stroke="#3a3545" stroke-width="2"/><circle class="rl-glow" cx="162" cy="199" r="5" fill="#fff"/></g>`;break;
   case'lute':itemFront=`<path d="M120 196 L176 146" stroke="${RLF_INK}" stroke-width="9" stroke-linecap="round"/><path d="M120 196 L176 146" stroke="#6b4423" stroke-width="5" stroke-linecap="round"/>`+rlfPart([`M98 186 Q100 164 124 168 Q142 172 140 194 Q138 220 114 220 Q94 216 98 186Z`],'#b5762f',P)+`<circle cx="120" cy="192" r="6" fill="#3a2412"/>`;break;
   case'quill':itemFront=`<path d="M160 162 L192 46" stroke="${RLF_INK}" stroke-width="3"/>`+rlfPart([`M192 40 Q206 84 176 132 Q170 144 164 152 Q166 112 178 86 Q184 62 192 40Z`],E.c,P,{sw:2.2,flat:true})+`<path d="M192 40 Q176 92 166 148" stroke="${E.l}" stroke-width="2" fill="none"/>`+glow(186,70,10);break;
   case'banner':itemBack=`<path d="M166 392 L160 10" stroke="${RLF_INK}" stroke-width="7.5" stroke-linecap="round"/><path d="M166 392 L160 10" stroke="#6b4423" stroke-width="4.5" stroke-linecap="round"/><circle cx="160" cy="8" r="6" fill="#e0b100" stroke="${RLF_INK}" stroke-width="2"/>`;itemFront=`<path class="rl-wave" d="M162 20 Q182 28 198 20 L198 82 Q182 90 163 82Z" fill="${E.c}" stroke="${RLF_INK}" stroke-width="2.4"/><g transform="translate(180 52)">${rlGlyph(h.el,'#fff',.85)}</g>`;break;
  }
  const frontArm=rlfLimb([[...X.fs,armWF[0]],[...X.fe,armWF[1]],[...FH,armWF[2]]],sleeve,P)+(armor?rlfPart([`M140 128 L156 122 L164 148 L152 156Z`],metal,P):'')+(o==='robe'?`<path d="M152 166 Q160 170 170 160" stroke="${c2}" stroke-width="5" fill="none"/>`:'')+(o==='vest'||o==='tunic'?rlfLimb([[150,140,12],[160,154,11]],shade(c1,-.1),P):'');
  const frontHand=rlfHand(FH[0]+2,FH[1]+2,handRot,skin,P,handOpen);
  /* ---------- assemble ---------- */
  const art=`${defs}<g class="fg-all">${behind}<g class="fg-back">${backLeg}${bootB}${cuffB}${backArm}</g>${frontLeg}${bootF}${cuffF}<g class="fg-up">${itemBack}${torso}${over}${neck}<g class="fg-head">${head}${hairF}${gear}</g>${frontArm}${it==='shield'?'':frontHand}${itemFront}</g></g>`;
  rlFigure.c[id]=art;return art;
}
rlFigure.c={};

/* ---------- replace portraits and battle sprites ---------- */
function rlHeroSVG(id,opt){
  const h=RL_H[id];if(!h)return'';const o=opt||{},E=RL_EL[h.el],u='hp'+id;
  const motes=o.motes===false?'':[[62,40,2.6,0],[74,140,2,1.2],[182,30,2.2,.6],[60,96,1.6,2],[186,140,1.8,1.6]].map(m=>`<circle class="rl-mote" cx="${m[0]}" cy="${m[1]}" r="${m[2]}" fill="${E.l}" style="animation-delay:-${m[3]}s"/>`).join('');
  return`<svg class="rl-port" viewBox="52 -2 144 158" role="img" aria-label="${esc(h.n)}"><defs><radialGradient id="${u}bg" cx=".55" cy=".35" r=".8"><stop offset="0" stop-color="${E.l}" stop-opacity=".6"/><stop offset=".45" stop-color="${E.c}" stop-opacity=".55"/><stop offset="1" stop-color="${E.d}"/></radialGradient></defs><rect x="52" y="-2" width="144" height="158" fill="#0f0d14"/><rect x="52" y="-2" width="144" height="158" fill="url(#${u}bg)"/><g opacity=".2" stroke="${E.l}" fill="none"><circle cx="118" cy="60" r="60" stroke-width="1.2"/><circle cx="118" cy="60" r="48" stroke-width=".8" stroke-dasharray="3 5"/></g>${motes}${rlFigure(id)}<rect x="52" y="120" width="144" height="36" fill="url(#${u}fd)"/><defs><linearGradient id="${u}fd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${E.d}" stop-opacity="0"/><stop offset="1" stop-color="${E.d}" stop-opacity=".85"/></linearGradient></defs></svg>`;
}
function rlHeroBody(id){return`<svg class="rl-body" viewBox="0 -46 200 446" role="img" aria-label="${esc((RL_H[id]||{}).n||'')}">${rlFigure(id)}</svg>`}
for(const k in RL_PC)delete RL_PC[k];

/* ---------- monsters: glowing eyes instead of cartoon eyes ---------- */
const _rlMon=rlMonSVG;
rlMonSVG=function(type,el,boss,opt){
  let s=_rlMon(type,el,boss,opt);
  // swap round white eyes + pupils for glowing almond eyes
  s=s.replace(/<ellipse cx="([\d.]+)" cy="([\d.]+)" rx="([\d.]+)" ry="([\d.]+)" fill="([^"]+)" filter="url\(#(\w+)\)"\/><ellipse cx="([\d.]+)" cy="([\d.]+)" rx="[\d.]+" ry="[\d.]+" fill="[^"]+" filter="url\(#\w+\)"\/><circle cx="[\d.]+" cy="[\d.]+" r="[\d.]+" fill="#141218"\/><circle cx="[\d.]+" cy="[\d.]+" r="[\d.]+" fill="#141218"\/>/g,(m,x1,y1,rx,ry,col,f,x2,y2)=>{const r=+rx,eye=(x,y,sd)=>`<path d="M${x-r*1.2} ${+y+r*.2} Q${x} ${y-r*.9} ${+x+r*1.2} ${y-r*.5*sd} Q${x} ${+y+r*.7} ${x-r*1.2} ${+y+r*.2}Z" fill="${col}" filter="url(#${f})"/><path d="M${x-r*.15} ${y-r*.5} L${+x+r*.15} ${+y+r*.5}" stroke="#141218" stroke-width="${(r*.35).toFixed(1)}" stroke-linecap="round"/>`;
    return`<path d="M${x1-r*1.6} ${y1-r*1.2} L${+x1+r*1.1} ${y1-r*.5}" stroke="#141218" stroke-width="${(r*.5).toFixed(1)}" stroke-linecap="round"/><path d="M${+x2+r*1.6} ${y2-r*1.2} L${x2-r*1.1} ${y2-r*.5}" stroke="#141218" stroke-width="${(r*.5).toFixed(1)}" stroke-linecap="round"/>`+eye(+x1,+y1,1)+eye(+x2,+y2,-1)});
  // slime smile and owl sclera discs -> sterner shapes
  s=s.replace('<path d="M88 172 Q100 180 112 172" stroke="#141218" stroke-width="3" fill="none" stroke-linecap="round"/>','<path d="M86 174 L92 170 L98 175 L104 170 L110 175 L114 171" stroke="#141218" stroke-width="3" fill="none" stroke-linejoin="round"/>');
  s=s.replace('<circle cx="80" cy="124" r="17" fill="#f4efe7"/><circle cx="120" cy="124" r="17" fill="#f4efe7"/>','<path d="M62 114 Q80 104 98 118 Q80 134 62 114Z M138 114 Q120 104 102 118 Q120 134 138 114Z" fill="#141218" opacity=".55"/>');
  s=s.replace('<circle cx="94" cy="136" r="3" fill="#fff"/>','');
  return s;
};

/* ---------- battle sprite sizing for the taller figures ---------- */
(function(){const st=document.createElement('style');st.textContent=`
.rlb-u.hero{aspect-ratio:200/446;height:calc(40% * var(--s))}
.rlb-u.hero.e .rlb-spr svg{transform:scaleX(-1)}
.rl-body .fg-up{animation:fgBreath 3.2s ease-in-out infinite;transform-origin:108px 200px;transform-box:view-box}
.rl-body .fg-head{animation:fgHead 4.6s ease-in-out infinite;transform-origin:110px 80px;transform-box:view-box}
.rl-port .fg-head{animation:fgHead 4.6s ease-in-out infinite;transform-origin:110px 80px;transform-box:view-box}
.fg-item{animation:rlFloat 2.6s ease-in-out infinite}
@keyframes fgBreath{50%{transform:rotate(-1.2deg) translateY(1.5px)}}
@keyframes fgHead{0%,100%{transform:rotate(0)}50%{transform:rotate(2.5deg)}}
.rlb-u.hero .rlb-tag{bottom:92%}
@media(prefers-reduced-motion:reduce){.fg-up,.fg-head,.fg-item{animation:none!important}}
`;document.head.appendChild(st)})();
