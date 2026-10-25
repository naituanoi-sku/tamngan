// ตามงาน · service worker (v3.1) — ไม่เก็บแคช · รับแจ้งเตือนงานด่วน
self.addEventListener('install', function(){ self.skipWaiting(); });
self.addEventListener('activate', function(e){ e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', function(){});
self.addEventListener('push', function(e){
  var d = {};
  try { d = e.data ? e.data.json() : {}; } catch (_) { d = { title: 'ตามงาน', body: e.data ? e.data.text() : '' }; }
  e.waitUntil(self.registration.showNotification(d.title || 'ตามงาน', {
    body: d.body || '', icon: 'icon.svg', tag: 'tamngan-daily', data: { url: d.url || './' }
  }));
});
self.addEventListener('notificationclick', function(e){
  e.notification.close();
  var url = (e.notification.data && e.notification.data.url) || './';
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(ws){
    for (var i = 0; i < ws.length; i++) { if ('focus' in ws[i]) return ws[i].focus(); }
    return self.clients.openWindow(url);
  }));
});
