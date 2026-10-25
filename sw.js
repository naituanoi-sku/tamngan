// ตามงาน · service worker (v3.0) — ไม่เก็บแคช ดึงของใหม่จากเน็ตทุกครั้ง มีไว้ให้ติดตั้งเป็นแอปได้
self.addEventListener('install', function(){ self.skipWaiting(); });
self.addEventListener('activate', function(e){ e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', function(){});
