/* ============================================================
   LIVE: Firebase sign-in + Firestore sync for the hosted site.
   The rest of the app keeps working on one in-memory `state` object.
   This file maps that object onto Firestore documents, writes only
   what changed, and merges changes from other devices in real time.
   ============================================================ */
const LIVE_CFG={
  firebase:{apiKey:"AIzaSyBTPZNzzfPRexKHJ5P0F9v39CFcAfXqcRg",authDomain:"orcuttabove-88244.firebaseapp.com",projectId:"orcuttabove-88244",storageBucket:"orcuttabove-88244.firebasestorage.app",messagingSenderId:"222290249849",appId:"1:222290249849:web:3a168b65332bf3b37f2ca8",
    // Realtime Database (used only for who-is-online, challenges and live matches)
    databaseURL:"https://orcuttabove-88244-default-rtdb.firebaseio.com"},
  // Google accounts allowed into the teacher panel (must match the list in firestore.rules)
  teachers:['aarguijo2@orcutt-schools.net'],
};
const LIVE={
  on:false,role:null,uid:null,email:'',name:'',sess:null,owner:null,err:'',
  base:{},remote:{},hashes:{},unsub:[],ready:false,onChange:null,
};
(function(){
  if(typeof window==='undefined')return;
  // Never in the Claude preview (it has its own storage); only when the Firebase SDK loaded.
  if(window.claude||!window.firebase||!firebase.initializeApp)return;
  try{firebase.initializeApp(LIVE_CFG.firebase);LIVE.auth=firebase.auth();LIVE.db=firebase.firestore();LIVE.on=true;
    try{if(firebase.database)LIVE.rt=firebase.database()}catch(e){console.warn('Realtime Database unavailable',e)}}
  catch(e){console.error('Firebase init failed',e)}
})();
const L_COLL=['classes','students','pins','bosses','arena','log','codes','logins'];
const L_INC={students:['coins','points','xp','gemBank'],arena:['r','w','l']};

/* ---------- encoding: Firestore can't hold arrays inside arrays or undefined ---------- */
function lEnc(v){
  if(Array.isArray(v)){if(v.some(x=>Array.isArray(x)))return{__j:JSON.stringify(v)};return v.map(lEnc)}
  if(v&&typeof v==='object'){const o={};for(const k in v){if(v[k]!==undefined)o[k]=lEnc(v[k])}return o}
  if(typeof v==='number'&&!isFinite(v))return null;
  return v;
}
function lDec(v){
  if(Array.isArray(v))return v.map(lDec);
  if(v&&typeof v==='object'){const ks=Object.keys(v);if(ks.length===1&&ks[0]==='__j')return JSON.parse(v.__j);const o={};for(const k of ks)o[k]=lDec(v[k]);return o}
  return v;
}
const lClone=v=>v==null?v:JSON.parse(JSON.stringify(v));
// Firestore returns map keys in its own order, so compare with sorted keys.
const lStable=v=>Array.isArray(v)?'['+v.map(lStable).join(',')+']':v&&typeof v==='object'?'{'+Object.keys(v).sort().map(k=>JSON.stringify(k)+':'+lStable(v[k])).join(',')+'}':JSON.stringify(v===undefined?null:v);
const lSame=(a,b)=>a===b||(a!==undefined&&b!==undefined&&lStable(a)===lStable(b));
const lStrip=(o,...ks)=>{const r={...o};ks.forEach(k=>delete r[k]);return r};
async function lSha(t){const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(t));return[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')}

/* ---------- state -> documents ---------- */
function lProject(st){
  const out={},own=LIVE.owner,put=(p,d)=>{out[p]=lEnc(d)};
  if(LIVE.role==='teacher'){
    put('configs/'+own,{v:st.v||1,arcNoLimit:st.arcNoLimit||0,avMig2:st.avMig2||0,settings:st.settings,itemCfg:st.itemCfg,behaviors:st.behaviors});
    st.classes.forEach((c,i)=>{put('classes/'+c.id,{...c,owner:own,ord:i});if(c.code)put('codes/'+String(c.code).toUpperCase(),{cid:c.id,owner:own})});
    st.students.forEach((s,i)=>{
      put('students/'+s.id,{...lStrip(s,'pin'),owner:own,ord:i});
      const pin=String(s.pin||''),h=LIVE.hashes[s.id+':'+pin];
      put('pins/'+s.id,{pin,h:h||'',cid:s.classId,owner:own});
      if(s.user)put('logins/'+s.classId+'~'+String(s.user).toLowerCase(),{sid:s.id,cid:s.classId,owner:own});
    });
    st.bosses.forEach(b=>put('bosses/'+b.id,{...b,owner:own}));
    for(const sid in (st.arena||{})){const s=st.students.find(x=>x.id===sid);if(s)put('arena/'+sid,{...st.arena[sid],classId:s.classId,owner:own})}
    st.log.forEach(l=>{const s=st.students.find(x=>x.id===l.sid);put('log/'+l.id,{...l,classId:s?s.classId:'',owner:own})});
  }else if(LIVE.role==='student'){
    const me=st.students.find(x=>x.id===LIVE.sess.sid),cid=LIVE.sess.cid;
    if(me){const b=LIVE.base['students/'+me.id];put('students/'+me.id,{...lStrip(me,'pin'),owner:own,ord:b?b.ord:0})}
    st.bosses.filter(b=>b.classId===cid).forEach(b=>put('bosses/'+b.id,{...b,owner:own}));
    for(const sid in (st.arena||{})){const s=st.students.find(x=>x.id===sid);if(s&&s.classId===cid)put('arena/'+sid,{...st.arena[sid],classId:cid,owner:own})}
  }
  return out;
}
async function lPrepHashes(st){
  if(LIVE.role!=='teacher')return;
  for(const s of st.students){const k=s.id+':'+String(s.pin||'');if(!LIVE.hashes[k])LIVE.hashes[k]=await lSha(k)}
}

/* ---------- documents -> state ---------- */
function lAssemble(docs){
  const pick=pre=>Object.keys(docs).filter(p=>p.startsWith(pre+'/')).map(p=>({id:p.slice(pre.length+1),d:lDec(docs[p])}));
  const byOrd=(a,b)=>(a.d.ord??0)-(b.d.ord??0);
  const st={};
  const cfg=docs['configs/'+LIVE.owner]?lDec(docs['configs/'+LIVE.owner]):null;
  const def=defaultState();
  st.v=cfg&&cfg.v||1;st.arcNoLimit=cfg?cfg.arcNoLimit:1;st.avMig2=cfg?cfg.avMig2:1;
  st.settings=cfg&&cfg.settings||def.settings;st.itemCfg=cfg&&cfg.itemCfg||{};st.behaviors=cfg&&cfg.behaviors||def.behaviors;
  st.classes=pick('classes').sort(byOrd).map(x=>lStrip(x.d,'owner','ord'));
  const pins={};pick('pins').forEach(x=>pins[x.id]=x.d.pin);
  st.students=pick('students').sort(byOrd).map(x=>{const s=lStrip(x.d,'owner','ord');if(LIVE.role==='teacher')s.pin=pins[x.id]||'';return s});
  st.bosses=pick('bosses').map(x=>{const b=lStrip(x.d,'owner');const dealt=Object.values(b.dmg||{}).reduce((a,v)=>a+(+v||0),0);if(b.max)b.hp=Math.max(0,b.max-dealt);return b});
  st.arena={};pick('arena').forEach(x=>st.arena[x.id]=lStrip(x.d,'owner','classId'));
  st.log=pick('log').map(x=>lStrip(x.d,'owner','classId')).sort((a,b)=>(b.t||0)-(a.t||0));
  return st;
}
// Copy fresh values into the existing objects so code holding a reference keeps a live one.
function lMergeInto(cur,fresh){
  const objInto=(o,n)=>{for(const k of Object.keys(o))if(!(k in n))delete o[k];Object.assign(o,n);return o};
  const arrInto=(oa,na)=>{const m=new Map((oa||[]).map(x=>[x&&x.id,x]));return na.map(n=>m.has(n.id)?objInto(m.get(n.id),n):n)};
  if(!cur)return fresh;
  cur.v=fresh.v;cur.arcNoLimit=fresh.arcNoLimit;cur.avMig2=fresh.avMig2;
  cur.settings=cur.settings?objInto(cur.settings,fresh.settings):fresh.settings;
  cur.itemCfg=cur.itemCfg?objInto(cur.itemCfg,fresh.itemCfg):fresh.itemCfg;
  cur.behaviors=arrInto(cur.behaviors,fresh.behaviors);
  cur.classes=arrInto(cur.classes,fresh.classes);cur.students=arrInto(cur.students,fresh.students);
  cur.bosses=arrInto(cur.bosses,fresh.bosses);cur.log=arrInto(cur.log,fresh.log);
  const ar=cur.arena||{};for(const k of Object.keys(ar))if(!(k in fresh.arena))delete ar[k];
  for(const k in fresh.arena)ar[k]=ar[k]?objInto(ar[k],fresh.arena[k]):fresh.arena[k];cur.arena=ar;
  return cur;
}

/* ---------- reconcile remote snapshots with unsaved local edits ---------- */
function lReconcile(changed){
  if(!LIVE.ready)return;
  const cur=lProject(state),docs={},teacher=LIVE.role==='teacher';
  const all=new Set([...Object.keys(LIVE.base),...Object.keys(LIVE.remote),...Object.keys(cur)]);
  // Decide what has unsaved local edits before moving anything forward.
  const dirty=new Set([...all].filter(p=>!(LIVE.forceClean&&LIVE.forceClean.has(p))&&(p in cur?!lSame(cur[p],LIVE.base[p]):(teacher&&p in LIVE.base))));
  // Only paths the server actually reported can move the saved copy forward.
  for(const p of (changed||[]))if(!dirty.has(p)){if(p in LIVE.remote)LIVE.base[p]=lClone(LIVE.remote[p]);else delete LIVE.base[p]}
  for(const p of all){
    if(dirty.has(p)){if(p in cur)docs[p]=cur[p]}
    else if(p in LIVE.base)docs[p]=LIVE.base[p];
  }
  const fresh=migrate(lAssemble(docs))||lAssemble(docs);
  state=lMergeInto(state,fresh);
  if(LIVE.onChange)LIVE.onChange();
}

/* ---------- writing ---------- */
async function lFlush(st){
  if(!LIVE.ready||!LIVE.role)return;
  await lPrepHashes(st);
  const cur=lProject(st),FV=firebase.firestore.FieldValue,FP=firebase.firestore.FieldPath;
  const jobs=[];
  const paths=new Set([...Object.keys(cur),...Object.keys(LIVE.base)]);
  for(const p of paths){
    const n=cur[p],o=LIVE.base[p];
    if(lSame(n,o))continue;
    const ref=LIVE.db.doc(p),coll=p.split('/')[0];
    if(n&&!o){jobs.push([p,n,()=>ref.set(n)]);continue}
    if(!n){if(LIVE.role==='teacher')jobs.push([p,undefined,()=>ref.delete()]);continue}
    const args=[],inc=L_INC[coll]||[];
    for(const k of new Set([...Object.keys(o),...Object.keys(n)])){
      const a=o[k],b=n[k];if(lSame(a,b))continue;
      if(!(k in n)){args.push(new FP(k),FV.delete());continue}
      if(inc.includes(k)&&typeof a==='number'&&typeof b==='number'){args.push(new FP(k),FV.increment(b-a));continue}
      const isMap=x=>x&&typeof x==='object'&&!Array.isArray(x)&&!('__j' in x);
      if(isMap(a)&&isMap(b)){for(const sk of new Set([...Object.keys(a),...Object.keys(b)])){if(lSame(a[sk],b[sk]))continue;args.push(new FP(k,sk),sk in b?b[sk]:FV.delete())}continue}
      args.push(new FP(k),b);
    }
    if(args.length)jobs.push([p,n,()=>ref.update(...args)]);
  }
  if(!jobs.length)return;
  const res=await Promise.allSettled(jobs.map(j=>j[2]()));
  let failed=0;const refused=new Set();
  res.forEach((r,i)=>{const[p,n]=jobs[i];if(r.status==='fulfilled'){if(n===undefined)delete LIVE.base[p];else LIVE.base[p]=lClone(n)}
    else{failed++;const code=r.reason&&r.reason.code||'';console.warn('Save failed',p,code,r.reason&&r.reason.message);if(/permission-denied|not-found/.test(code))refused.add(p)}});
  // A change the database refused will never succeed: put that record back the way the server has it.
  if(refused.size){LIVE.forceClean=refused;try{lReconcile([])}finally{LIVE.forceClean=null}}
  if(failed)throw new Error(failed+' change(s) were refused');
}

/* ---------- listening ---------- */
function lListen(q,name,key){
  return new Promise(res=>{let first=true;
    const un=q.onSnapshot(snap=>{
      const ch=[];snap.docChanges().forEach(c=>{const p=name+'/'+c.doc.id;ch.push(p);if(c.type==='removed')delete LIVE.remote[p];else LIVE.remote[p]=c.doc.data()});
      if(first){first=false;res()}else if(ch.length)lReconcile(ch);
    },err=>{console.warn('Listen failed',name,err&&err.message);if(first){first=false;res()}if(LIVE.onError)LIVE.onError(err)});
    LIVE.unsub.push(un);
  });
}
function lListenDoc(path){
  return new Promise(res=>{let first=true;
    const un=LIVE.db.doc(path).onSnapshot(d=>{if(d.exists)LIVE.remote[path]=d.data();else delete LIVE.remote[path];if(first){first=false;res()}else lReconcile([path])},
      err=>{console.warn('Listen failed',path,err&&err.message);if(first){first=false;res()}});
    LIVE.unsub.push(un);
  });
}
function lStop(){LIVE.unsub.forEach(u=>{try{u()}catch(e){}});LIVE.unsub=[];LIVE.base={};LIVE.remote={};LIVE.ready=false}

async function lStartTeacher(user){
  lStop();LIVE.role='teacher';LIVE.uid=user.uid;LIVE.owner=user.uid;LIVE.email=user.email||'';LIVE.name=user.displayName||'';
  const db=LIVE.db,w=c=>db.collection(c).where('owner','==',user.uid);
  await Promise.all([lListenDoc('configs/'+user.uid),...L_COLL.map(c=>lListen(w(c),c))]);
  LIVE.base=lClone(LIVE.remote);LIVE.ready=true;
  const fresh=lAssemble(LIVE.remote);
  const first=!LIVE.remote['configs/'+user.uid]&&!fresh.classes.length;
  if(first){fresh.classes=[];fresh.students=[];fresh.bosses=[];fresh.log=[];fresh.arena={}}
  return {st:migrate(fresh)||fresh,first};
}
async function lStartStudent(sess){
  lStop();LIVE.role='student';LIVE.sess=sess;
  const db=LIVE.db,cdoc=await db.doc('classes/'+sess.cid).get();
  if(!cdoc.exists)throw new Error('class-missing');
  LIVE.owner=cdoc.data().owner;
  const w=c=>db.collection(c).where('classId','==',sess.cid);
  await Promise.all([lListenDoc('configs/'+LIVE.owner),lListenDoc('classes/'+sess.cid),lListen(w('students'),'students'),lListen(w('bosses'),'bosses'),lListen(w('arena'),'arena'),lListen(db.collection('log').where('sid','==',sess.sid),'log')]);
  LIVE.base=lClone(LIVE.remote);LIVE.ready=true;
  const fresh=lAssemble(LIVE.remote);
  return {st:migrate(fresh)||fresh};
}

/* ---------- sign in / out ---------- */
function lAllowed(email){return LIVE_CFG.teachers.includes(String(email||'').toLowerCase())}
async function lTeacherSignIn(){
  const p=new firebase.auth.GoogleAuthProvider();p.setCustomParameters({prompt:'select_account'});
  try{if(LIVE.auth.currentUser)await LIVE.auth.signOut();await LIVE.auth.signInWithPopup(p)}
  catch(e){if(e&&/popup-blocked|operation-not-supported/.test(e.code||''))return LIVE.auth.signInWithRedirect(p);throw e}
}
async function lStudentSignIn(code,user,pin){
  code=String(code||'').trim().toUpperCase();user=String(user||'').trim().toLowerCase();pin=String(pin||'').trim();
  if(!code||!user||!pin)throw new Error('missing');
  let u=LIVE.auth.currentUser;
  if(u&&!u.isAnonymous){await LIVE.auth.signOut();u=null}
  if(!u)u=(await LIVE.auth.signInAnonymously()).user;
  const cd=await LIVE.db.doc('codes/'+code).get();if(!cd.exists)throw new Error('code');
  const cid=cd.data().cid,lg=await LIVE.db.doc('logins/'+cid+'~'+user).get();if(!lg.exists)throw new Error('match');
  const sid=lg.data().sid,h=await lSha(sid+':'+pin);
  try{await LIVE.db.doc('sessions/'+u.uid).set({sid,cid,h,t:Date.now()})}catch(e){throw new Error('match')}
  return {sid,cid};
}
async function lSignOut(){
  lStop();try{duelStop()}catch(e){}const u=LIVE.auth.currentUser;
  try{if(u&&u.isAnonymous)await LIVE.db.doc('sessions/'+u.uid).delete()}catch(e){}
  LIVE.role=null;LIVE.sess=null;LIVE.owner=null;LIVE.email='';
  await LIVE.auth.signOut();
}
// What the browser was signed in as last time.
function lWhoAmI(){
  return new Promise(res=>{const un=LIVE.auth.onAuthStateChanged(async u=>{un();
    if(!u)return res(null);
    if(!u.isAnonymous)return res(lAllowed(u.email)?{role:'teacher',user:u}:{role:'denied',user:u});
    try{const d=await LIVE.db.doc('sessions/'+u.uid).get();res(d.exists?{role:'student',sess:{sid:d.data().sid,cid:d.data().cid}}:null)}catch(e){res(null)}
  })});
}

/* ---------- Realm saves: same API the Realm code already uses ---------- */
const L_REALM_DB={doc(path){
  const sid=String(path).replace(/^realm\//,''),ref=LIVE.db.doc('realm/'+sid);
  return{
    async get(){const d=await ref.get();if(!d.exists)return{exists:false,data:()=>undefined};const v=d.data();let body={};try{body=JSON.parse(v.json||'{}')}catch(e){}return{exists:true,data:()=>body}},
    async set(body){const s=state.students.find(x=>x.id===sid);await ref.set({json:JSON.stringify(body),sid,classId:s?s.classId:(LIVE.sess&&LIVE.sess.cid)||'',owner:LIVE.owner,t:Date.now()})}
  };
}};

/* ============================================================
   DUELS: live two-player Desk Rally over the Realtime Database.
   presence/{classId}/{uid}        who is online, and whether they're busy
   invites/{classId}/{toUid}/{fromUid}  a pending challenge
   matches/{matchId}               players, status, ball events, paddle positions
   ============================================================ */
const DUEL={on:false,uid:null,cid:null,sid:null,busy:false,toff:0,online:{},incoming:{},out:null,offs:[],me:null,onChange:null};
const dSV=()=>firebase.database.ServerValue.TIMESTAMP;
function duelReady(){return!!(LIVE.on&&LIVE.rt&&LIVE.role==='student'&&DUEL.on)}
function duelNow(){return Date.now()+(DUEL.toff||0)}
function duelPing(kind){if(DUEL.onChange)try{DUEL.onChange(kind)}catch(e){console.warn(e)}}
function duelStart(){
  if(DUEL.on||!LIVE.rt||LIVE.role!=='student'||!LIVE.sess)return;
  const u=LIVE.auth.currentUser;if(!u)return;
  const db=LIVE.rt;DUEL.on=true;DUEL.uid=u.uid;DUEL.cid=LIVE.sess.cid;DUEL.sid=LIVE.sess.sid;DUEL.busy=false;
  const on=(ref,fn)=>{ref.on('value',fn,err=>console.warn('Realtime listen failed',err&&err.message));DUEL.offs.push(()=>ref.off('value',fn))};
  on(db.ref('.info/serverTimeOffset'),s=>{DUEL.toff=s.val()||0});
  DUEL.me=db.ref('presence/'+DUEL.cid+'/'+DUEL.uid);
  on(db.ref('.info/connected'),s=>{if(s.val()===true){DUEL.me.onDisconnect().remove();DUEL.me.set({sid:DUEL.sid,busy:!!DUEL.busy,t:dSV()}).catch(()=>{})}});
  on(db.ref('presence/'+DUEL.cid),s=>{DUEL.online=s.val()||{};duelPing('online')});
  on(db.ref('invites/'+DUEL.cid+'/'+DUEL.uid),s=>{DUEL.incoming=s.val()||{};duelPing('invite')});
}
function duelStop(){
  DUEL.offs.forEach(f=>{try{f()}catch(e){}});DUEL.offs=[];
  if(DUEL.out){try{duelCancel()}catch(e){}}
  if(DUEL.me){try{DUEL.me.onDisconnect().cancel();DUEL.me.remove()}catch(e){}}
  Object.assign(DUEL,{on:false,me:null,online:{},incoming:{},out:null,busy:false});
}
function duelSetBusy(b){b=!!b;if(!DUEL.on||DUEL.busy===b)return;DUEL.busy=b;if(DUEL.me)DUEL.me.update({busy:b}).catch(()=>{})}
// Classmates online right now, one entry per student (a student may have two tabs open).
function duelOnline(){
  const out={};
  for(const uid in DUEL.online){const p=DUEL.online[uid];if(!p||uid===DUEL.uid||p.sid===DUEL.sid)continue;
    const prev=out[p.sid];if(!prev||(prev.busy&&!p.busy))out[p.sid]={uid,sid:p.sid,busy:!!p.busy}}
  return Object.values(out);
}
async function duelChallenge(toUid,toSid){
  if(!duelReady()||DUEL.out)return;
  const db=LIVE.rt,mid=db.ref('matches').push().key;
  await db.ref('matches/'+mid).set({cid:DUEL.cid,a:{uid:DUEL.uid,sid:DUEL.sid},b:{uid:toUid,sid:toSid},st:'wait',t:dSV()});
  await db.ref('invites/'+DUEL.cid+'/'+toUid+'/'+DUEL.uid).set({sid:DUEL.sid,mid,t:dSV()});
  const o=DUEL.out={mid,toUid,toSid,st:'wait',at:Date.now()};
  const r=db.ref('matches/'+mid+'/st'),fn=s=>{if(DUEL.out!==o)return;o.st=s.val()||'gone';duelPing('out')};
  r.on('value',fn);o.off=()=>r.off('value',fn);
}
async function duelCancel(){
  const o=DUEL.out;if(!o)return;DUEL.out=null;if(o.off)o.off();
  const db=LIVE.rt;
  await db.ref('invites/'+DUEL.cid+'/'+o.toUid+'/'+DUEL.uid).remove().catch(()=>{});
  if(o.st!=='go')await db.ref('matches/'+o.mid).remove().catch(()=>{});
}
// Answer a challenge: 'go' (accept), 'no' (decline) or 'busy'. Accept only wins if it's still waiting.
async function duelAnswer(fromUid,inv,ans){
  const db=LIVE.rt;let ok=false;
  // Firebase first runs a transaction against the local copy, which is empty (null) until the server answers.
  // Returning a value for null lets the server re-run it with the real status; returning undefined would give up.
  try{const r=await db.ref('matches/'+inv.mid+'/st').transaction(cur=>cur==='wait'||cur===null?ans:undefined);
    ok=!!(r&&r.committed&&ans==='go'&&r.snapshot&&r.snapshot.val()==='go')}catch(e){console.warn('Answer failed',e&&e.message)}
  await db.ref('invites/'+DUEL.cid+'/'+DUEL.uid+'/'+fromUid).remove().catch(()=>{});
  return ok;
}
// The live match connection used by the game.
function duelChannel(mid){
  const db=LIVE.rt,m=db.ref('matches/'+mid),me=DUEL.uid,ch={ev:null,opp:.5,gone:false,offs:[]};
  const on=(ref,fn)=>{ref.on('value',fn,()=>{});ch.offs.push(()=>ref.off('value',fn))};
  on(m.child('ev'),s=>{const v=s.val();if(v&&(!ch.ev||v.n>ch.ev.n))ch.ev=v});
  on(m.child('p'),s=>{const v=s.val()||{};for(const k in v)if(k!==me)ch.opp=v[k]});
  on(m.child('gone'),s=>{const v=s.val()||{};for(const k in v)if(k!==me&&v[k])ch.gone=true});
  on(m,s=>{if(!s.exists()&&ch.ev&&ch.ev.k!=='end')ch.gone=true});
  m.child('gone/'+me).onDisconnect().set(true);
  let lastT=0,lastV=-1;
  ch.pad=v=>{const t=performance.now();if(t-lastT<60||Math.abs(v-lastV)<.003)return;lastT=t;lastV=v;m.child('p/'+me).set(Math.round(v*1000)/1000).catch(()=>{})};
  ch.emit=e=>{e.n=(ch.ev?ch.ev.n:0)+1;ch.ev=e;m.child('ev').set(e).catch(()=>{})};
  ch.leave=()=>m.child('gone/'+me).set(true).catch(()=>{});
  ch.close=(removeLater)=>{ch.offs.forEach(f=>f());ch.offs=[];try{m.child('gone/'+me).onDisconnect().cancel()}catch(e){}if(removeLater)setTimeout(()=>m.remove().catch(()=>{}),4000)};
  ch.now=duelNow;ch.me=me;
  return ch;
}
