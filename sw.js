const CACHE_NAME = 'rockwell-faults-v7.02'; // Alterado para v3 para limpar o histórico do telemóvel
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './falhas.json',
  'https://github.com/vhmol1/AbDrives/blob/main/Rockwellautomation--Streamline-Simple-Icons.png'
  //'https://cdn-icons-png.flaticon.com/512/595/595000.png'
];

// Instala o Service Worker e guarda os arquivos no cache
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Ativa e limpa caches antigos se houver atualização
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Serve os arquivos direto do cache quando estiver offline
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      return cachedResponse || fetch(e.request);
    })
  );
});
