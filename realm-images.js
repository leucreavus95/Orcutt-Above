"use strict";
/* ================================================================
   REALM HERO IMAGES: painted art that replaces the drawn heroes.
   Add a hero by dropping art/<id>-1.webp, -2, -3 (one per form)
   and listing the id below. Heroes not listed keep their drawing.
   ================================================================ */
const RL_ART={
  halo:{f:['art/halo-1.webp','art/halo-2.webp','art/halo-3.webp'],
        a:[[303,790],[327,802],[398,843]]}   // pixel size of each file's figure (w,h)
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
  // battle sprite: full body standing on the ground line (y 228)
  rlHeroBody=function(id,lv){const A=RL_ART[id];if(!A)return oldBody(id,lv);
    const L=lv==null?crLv(id):lv,s=crStage(L),[iw,ih]=A.a[s],H=s===2?238:224,W=H*iw/ih;
    return`<svg class="rl-body cr-bodysvg rl-art" viewBox="0 0 240 240" role="img" aria-label="${esc(crName(id,L))}" overflow="visible"><ellipse cx="120" cy="228" rx="46" ry="7" fill="url(#crsh)"/><image href="${A.f[s]}" x="${(120-W/2).toFixed(1)}" y="${(230-H).toFixed(1)}" width="${W.toFixed(1)}" height="${H}"/></svg>`};
  for(const k in RL_PC)delete RL_PC[k];
})();
