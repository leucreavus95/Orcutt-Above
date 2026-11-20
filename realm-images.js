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
  halo:{f:['art/halo-1.webp','art/halo-2.webp','art/halo-3.webp'],
        c:[[{src:'art/halo-1c1.webp',ax:218,ay:477,h:536},{src:'art/halo-1c2.webp',ax:216,ay:507,h:536},{src:'art/halo-1c3.webp',ax:190,ay:429,h:479}],
           [{src:'art/halo-2c1.webp',ax:267,ay:514,h:536},{src:'art/halo-2c2.webp',ax:272,ay:493,h:536},{src:'art/halo-2c3.webp',ax:290,ay:416,h:479}],
           [{src:'art/halo-3c1.webp',ax:309,ay:526,h:536},{src:'art/halo-3c2.webp',ax:250,ay:504,h:536},{src:'art/halo-3c3.webp',ax:290,ay:421,h:479}]],
        a:[[303,790],[327,802],[398,843]]}   // pixel size of each standing figure (w,h)
};
(function(){
  const preload=()=>{for(const id in RL_ART)RL_ART[id].f.forEach(s=>{const i=new Image();i.src=s})};preload();
  const lvOf=(id,o)=>o.lv!=null?o.lv:(o.stage!=null?[1,CR_EVO[0],CR_EVO[1]][o.stage]:crLv(id));
  const oldPort=rlHeroSVG,oldBody=rlHeroBody;
  // card portrait: element backdrop, figure shown head to knees
  rlHeroSVG=function(id,opt){const A=RL_ART[id];if(!A)return oldPort(id,opt);
    const o=opt||{},h=RL_H[id],E=RL_EL[h.el],lv=lvOf(id,o),s=crStage(lv),[iw,ih]=A.a[s],u='ra'+id+s;
    const H=330,W=H*iw/ih,x=100-W/2+(s===2?-W*.04:0),y=s===2?-4:4;
    const motes=o.motes===false?'':[[.1,.2,2.6,0],[.16,.7,2,1.2],[.86,.16,2.2,.6],[.08,.48,1.6,2],[.9,.66,1.8,1.6]].map(m=>`<circle class="rl-mote" cx="${m[0]*200}" cy="${m[1]*220}" r="${m[2]*1.3}" fill="${E.l}" style="animation-delay:-${m[3]}s"/>`).join('');
    return`<svg class="rl-port cr-port rl-art" viewBox="0 0 200 220" role="img" aria-label="${esc(crName(id,lv))}"><defs><radialGradient id="${u}bg" cx=".55" cy=".42" r=".8"><stop offset="0" stop-color="${E.l}" stop-opacity=".6"/><stop offset=".45" stop-color="${E.c}" stop-opacity=".55"/><stop offset="1" stop-color="${E.d}"/></radialGradient></defs><rect class="crbg" width="200" height="220" fill="#0f0d14"/><rect class="crbg" width="200" height="220" fill="url(#${u}bg)"/><g class="crbg" opacity=".2" stroke="${E.l}" fill="none"><circle cx="104" cy="110" r="84" stroke-width="1.2"/></g>${motes}<image href="${A.f[s]}" x="${x.toFixed(1)}" y="${y}" width="${W.toFixed(1)}" height="${H}" preserveAspectRatio="xMidYMin meet"/></svg>`};
  // battle sprite: a canvas the motion loop below draws into
  rlHeroBody=function(id,lv){const A=RL_ART[id];if(!A)return oldBody(id,lv);
    const L=lv==null?crLv(id):lv,s=crStage(L);setTimeout(artLoop,0);
    return`<div class="rl-body rl-artbox" data-id="${id}" data-s="${s}" role="img" aria-label="${esc(crName(id,L))}"><canvas class="rl-artcv"></canvas></div>`};
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
  if(st.cast>=0&&st.frames){const T=(now-st.cast)*speed,C=CAST_T;
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
  const img=artImg(A.f[s]);if(!img)return;const FR=A.c&&A.c[s]&&A.c[s].length?A.c[s]:null;if(FR)FR.forEach(f=>artImg(f.src));
  const dpr=Math.min(2,window.devicePixelRatio||1),cw=Math.round(cv.clientWidth*dpr),ch=Math.round(cv.clientHeight*dpr);if(!cw||!ch)return;
  if(cv.width!==cw||cv.height!==ch){cv.width=cw;cv.height=ch}
  const spr=cv.closest('.rlb-spr'),unit=cv.closest('.rlb-u'),b=typeof rlUI==='function'&&rlUI().b,speed=b&&b.speed||1,dir=unit&&unit.classList.contains('e')?-1:1;
  let st=ART_ST.get(cv);if(!st){st={ph:Math.random()*9000,cast:-1,hit:-1,dash:-1,buf:document.createElement('canvas')};ART_ST.set(cv,st);
    // the battle re-adds these classes within one frame, so watch each change
    const watch=(el,cls,key)=>{if(!el)return;new MutationObserver(rs=>{for(const r of rs)if(!(r.oldValue||'').split(' ').includes(cls)&&el.classList.contains(cls)){st[key]=performance.now();break}}).observe(el,{attributes:true,attributeFilter:['class'],attributeOldValue:true})};
    watch(spr,'cast','cast');watch(unit,'hit','hit');watch(spr,'dash','dash')}
  st.dashOn=!!(spr&&spr.classList.contains('dash'));st.frames=!!(FR&&FR.every(f=>artImg(f.src)));
  const P=artPose(st,now,speed),E=RL_EL[RL_H[id].el],t=(now+st.ph)/1000;
  const sc=cw/AW,buf=st.buf;if(buf.width!==cw||buf.height!==ch){buf.width=cw;buf.height=ch}
  const g=buf.getContext('2d');g.setTransform(1,0,0,1,0,0);g.clearRect(0,0,cw,ch);g.setTransform(sc,0,0,sc,-AX0*sc,-AY0*sc);
  const strips=(im,alpha)=>{const iw=im.naturalWidth,ih=im.naturalHeight,H=(s===2?238:224)*P.sy,W=(s===2?238:224)*iw/ih*P.sx;g.globalAlpha=alpha;
    for(let i=0;i<STRIPS;i++){const v=1-(i+.5)/STRIPS,y0=228-(1-i/STRIPS)*H,y1=228-(1-(i+1)/STRIPS)*H,
      cape=v<.55?Math.sin(Math.PI*v/.55):0,off=dir*P.lean*Math.pow(v,1.3)+P.sway*Math.sin(t*1.7+v*4)*cape+P.drift*v*v,
      sx=1+P.chest*Math.exp(-Math.pow((v-.68)/.12,2)),w=W*sx;
      g.drawImage(im,0,i*ih/STRIPS,iw,ih/STRIPS+.6,120-w/2+off,y0,w,y1-y0+.7)}};
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
