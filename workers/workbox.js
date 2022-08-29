import { CacheableResponsePlugin } from 'workbox-cacheable-response/CacheableResponsePlugin'
import { ExpirationPlugin } from 'workbox-expiration/ExpirationPlugin'
import { precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing/registerRoute'
import { CacheFirst } from 'workbox-strategies/CacheFirst'

// need for uniq cache of each smart app
const LOCATION_HREF = self.location.href
const CACHE_NAME = `cache_smart_app_${LOCATION_HREF}`
const INDEX_URL = './index.html'

const isIndexPage = (url) => url.match(/\/index\.html/)

precacheAndRoute(self.__WB_MANIFEST)

registerRoute(
  ({ url }) => !isIndexPage(url.pathname),
  new CacheFirst({
    cacheName: `workbox_smart_app_${LOCATION_HREF}`,
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 3, // 3 days
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  }),
)

self.addEventListener('activate', (event) => {
  // make claim for first load page fetch listening
  event.waitUntil(self.clients.claim())
})


self.addEventListener('fetch', event => {
  if (!isIndexPage(event.request.url)) return
  // handle url request
  event.respondWith(
    // Open the cache
    caches.open(CACHE_NAME)
      .then(cache => {
        // Go to the network first
        return fetch(event.request)
          .then(fetchedResponse => {
            // cache index response
            cache.put(INDEX_URL, fetchedResponse.clone())
            return fetchedResponse
          })
          .catch(() => {
            // If the network is unavailable, get
            return cache.match(INDEX_URL)
          })
      }),
  )
})

self.addEventListener('install', event => {
  event.waitUntil(
    // open cache
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.match(URL)
          .then(cachedResponse => {
            // already cache skip
            if (cachedResponse) {
              return true
            }
            const request = new Request(INDEX_URL)
            // fetch index url and cache it
            return fetch(request)
              .then(fetchedResponse => {
                cache.put(INDEX_URL, fetchedResponse.clone())
                return fetchedResponse
              })
          })
      }),
  )
})
