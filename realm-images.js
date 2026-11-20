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
  halo:{f:[{src:'art/halo-1.webp',ax:99,ay:520,h:520,w:199,ih:520},{src:'art/halo-2.webp',ax:106,ay:520,h:520,w:212,ih:520},{src:'art/halo-3.webp',ax:123,ay:520,h:520,w:246,ih:520}],
        // the spell each form throws, matched to its casting art.
        // hand = where the spell leaves his hand, in sprite units from his feet (x forward, y up)
        spell:[{kind:'bolt',vp:['#ffffff','#e4ffd0','#8df06a','#2f9d3c'],hand:[68,136]},
               {kind:'lance',vp:['#ffffff','#fff3c0','#ffd24a','#d98a12'],hand:[34,137]},
               {kind:'shards',vp:['#ffffff','#e6dcff','#a98bff','#5a2fd6'],hand:[58,132]}],
        c:[[{src:'art/halo-1c1.webp',ax:218,ay:477,h:536},{src:'art/halo-1c2.webp',ax:216,ay:507,h:536},{src:'art/halo-1c3.webp',ax:190,ay:429,h:479}],
           [{src:'art/halo-2c1.webp',ax:267,ay:514,h:536},{src:'art/halo-2c2.webp',ax:272,ay:493,h:536},{src:'art/halo-2c3.webp',ax:290,ay:416,h:479}],
           [{src:'art/halo-3c1.webp',ax:309,ay:526,h:536},{src:'art/halo-3c2.webp',ax:250,ay:504,h:536},{src:'art/halo-3c3.webp',ax:290,ay:421,h:479}]],
        },
  kael:{f:[{src:'art/kael-1.webp',ax:100,ay:528,h:527,w:323,ih:550},{src:'art/kael-2.webp',ax:121,ay:531,h:529,w:357,ih:552},{src:'art/kael-3.webp',ax:107,ay:548,h:533,w:339,ih:567}],
        c:[[{src:'art/kael-1c1.webp',ax:320,ay:601,h:592,w:609,ih:647},{src:'art/kael-1c2.webp',ax:349,ay:615,h:592,w:643,ih:682},{src:'art/kael-1c3.webp',ax:229,ay:483,h:592,w:650,ih:528}],
           [{src:'art/kael-2c1.webp',ax:227,ay:610,h:627,w:682,ih:659},{src:'art/kael-2c2.webp',ax:333,ay:620,h:627,w:645,ih:679},{src:'art/kael-2c3.webp',ax:203,ay:608,h:627,w:624,ih:648}],
           [{src:'art/kael-3c1.webp',ax:264,ay:595,h:623,w:658,ih:612},{src:'art/kael-3c2.webp',ax:289,ay:645,h:623,w:654,ih:679},{src:'art/kael-3c3.webp',ax:163,ay:561,h:623,w:661,ih:602}]],
        spell:[{kind:'bolt',vp:['#ffffff','#dffff5','#8ef0d0','#2a9d8a'],hand:[61,106]},
               {kind:'lance',vp:['#ffffff','#fff3c0','#ffd24a','#d98a12'],hand:[55,125]},
               {kind:'shards',vp:['#ffffff','#e6dcff','#a98bff','#5a2fd6'],hand:[70,139]}]},
};
(function(){
  const preload=()=>{for(const id in RL_ART)RL_ART[id].f.forEach(f=>{const i=new Image();i.src=f.src})};preload();
  const lvOf=(id,o)=>o.lv!=null?o.lv:(o.stage!=null?[1,CR_EVO[0],CR_EVO[1]][o.stage]:crLv(id));
  const oldPort=rlHeroSVG,oldBody=rlHeroBody;
  // card portrait: element backdrop, figure shown head to knees
  rlHeroSVG=function(id,opt){const A=RL_ART[id];if(!A)return oldPort(id,opt);
    const o=opt||{},h=RL_H[id],E=RL_EL[h.el],lv=lvOf(id,o),s=crStage(lv),F=A.f[s],u='ra'+id+s;
    const k=330/F.h*(s===2?1.04:1),W=F.w*k,H=F.ih*k,x=100-F.ax*k,y=338-F.ay*k;
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
  const F0=A.f[s],img=artImg(F0.src);if(!img)return;const FR=A.c&&A.c[s]&&A.c[s].length?A.c[s]:null;if(FR)FR.forEach(f=>artImg(f.src));
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
  const n=sk.tg==='eA'?1:Math.min(3,sk.h||1),sp=vSp(),jobs=[];
  for(const tp of pts)for(let i=0;i<n;i++)jobs.push(new Promise(r=>setTimeout(()=>vfxArtShot(h,tp,S,ult).then(r),(i*110+pts.indexOf(tp)*60)/sp)));
  await Promise.all(jobs)}
function vfxArtShot(h,tp,S,big){const P=S.vp,sp=vSp(),x0=h.x,y0=h.y,x1=tp.x,y1=tp.y,ang=Math.atan2(y1-y0,x1-x0),ca=Math.cos(ang),sa=Math.sin(ang),dist=Math.hypot(x1-x0,y1-y0),K=h.k*(big?1.25:1);
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
