// Service Worker do Terrarium 3D. Ao publicar uma versao nova do jogo, troque o numero em V.
const V='terrarium-v1';
const SHELL=['./','index.html','manifest.json','icons/icon-192.png','icons/icon-512.png','icons/icon-maskable-512.png','icons/apple-touch-icon.png'];
const OPT=['three.min.js'];
const CDN='https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
self.addEventListener('install',e=>{e.waitUntil((async()=>{const c=await caches.open(V);await c.addAll(SHELL);for(const u of OPT){try{await c.add(u)}catch(x){}}try{await c.add(new Request(CDN,{mode:'no-cors'}))}catch(x){}self.skipWaiting()})())});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{for(const k of await caches.keys())if(k!==V)await caches.delete(k);await self.clients.claim()})())});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||!r.url.startsWith('http'))return;
 e.respondWith((async()=>{const c=await caches.open(V),hit=await c.match(r,{ignoreSearch:true});
  const net=fetch(r).then(res=>{if(res&&(res.ok||res.type==='opaque'))c.put(r,res.clone());return res}).catch(()=>null);
  if(r.mode==='navigate')return(await net)||hit||await c.match('index.html');
  return hit||(await net)||new Response('',{status:504})})())});
