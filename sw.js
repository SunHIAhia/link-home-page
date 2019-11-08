/**
 * service worker 安装激活
 */

let dataCacheName = 'new-data-v1'
let cacheName = 'first-pwa-app-1'
let filesToCache = [
  '/index.html',
  '/about.html',
  '/404.html',
  '/assets/css/fonts/arimo.css',
  '/assets/css/fonts/linecons/css/linecons.css',
  '/assets/css/fonts/fontawesome/css/font-awesome.min.css',
  '/assets/css/bootstrap.css',
  '/assets/css/xenon-core.css',
  '/assets/css/xenon-components.css',
  '/assets/css/xenon-skins.css',
  '/assets/css/nav.css',
  '/assets/css/gitalk.css',
  '/assets/js/jquery-1.11.1.min.js',
  '/assets/js/index.js',
  '/assets/js/bootstrap.min.js',
  '/assets/js/TweenMax.min.js',
  '/assets/js/resizeable.js',
  '/assets/js/joinable.js',
  '/assets/js/xenon-api.js',
  '/assets/js/xenon-toggles.js',
  'assets/js/xenon-custom.js',
  'assets/js/gitalk.min.js',
  '/assets/images/favicon.ico',
  '/assets/images/logo.png',
  '/assets/images/forkme.png',
  '/assets/images/icons/icon_144x144.png',
  '/assets/images/icons/icon_152x152.png',
  '/assets/images/icons/icon_192x192.png',
  '/assets/images/icons/icon_256x256.png',
  '/assets/images/flags/flag-cn.png',
  '/assets/images/flags/flag-us.png',
  '/assets/images/logos/123apps.png',
  '/assets/images/logos/aliyun.png',
  '/assets/images/logos/apkpure.png',
  '/assets/images/logos/archwiki.png',
  '/assets/images/logos/baiduwp.png',
  '/assets/images/logos/chazhongzi.png',
  '/assets/images/logos/chrome.png',
  '/assets/images/logos/cloudflare.png',
  '/assets/images/logos/convertio.png',
  '/assets/images/logos/crx4chrome.png',
  '/assets/images/logos/cupfox.png',
  '/assets/images/logos/dropmail.png',
  '/assets/images/logos/erin.png',
  '/assets/images/logos/fake-name-generator.png',
  '/assets/images/logos/firefox-send.png',
  '/assets/images/logos/freessl.png',
  '/assets/images/logos/gandi.png',
  '/assets/images/logos/github.png',
  '/assets/images/logos/gmail.png',
  '/assets/images/logos/google.png',
  '/assets/images/logos/google-analytics.png',
  '/assets/images/logos/google-drive.png',
  '/assets/images/logos/google-keep.png',
  '/assets/images/logos/google-photos.png',
  '/assets/images/logos/google-translate.png',
  '/assets/images/logos/how2j.png',
  '/assets/images/logos/icourse163.png',
  '/assets/images/logos/imooc.png',
  '/assets/images/logos/ipip.png',
  '/assets/images/logos/i-remember.png',
  '/assets/images/logos/itellyou.png',
  '/assets/images/logos/jianrrys.png',
  '/assets/images/logos/jikipedia.png',
  '/assets/images/logos/keylol.png',
  '/assets/images/logos/lang-8.png',
  '/assets/images/logos/liaoxuefeng.png',
  '/assets/images/logos/magazinechina.png',
  '/assets/images/logos/microsoft.png',
  '/assets/images/logos/mozilla.png',
  '/assets/images/logos/mubu.png',
  '/assets/images/logos/mvnrepository.png',
  '/assets/images/logos/namesilo.png',
  '/assets/images/logos/ojad.png',
  '/assets/images/logos/opsx.png',
  '/assets/images/logos/osboxes.png',
  '/assets/images/logos/owllook.png',
  '/assets/images/logos/pansou.png',
  '/assets/images/logos/ping.png',
  '/assets/images/logos/ping-pe.png',
  '/assets/images/logos/ruanyifeng.png',
  '/assets/images/logos/runoob.png',
  '/assets/images/logos/ruyo.png',
  '/assets/images/logos/shiyanlou.png',
  '/assets/images/logos/silk.png',
  '/assets/images/logos/squoosh.png',
  '/assets/images/logos/tableconvert.png',
  '/assets/images/logos/taonpm.png',
  '/assets/images/logos/tencent-cloud.png',
  '/assets/images/logos/tophub.png',
  '/assets/images/logos/ubuntu.png',
  '/assets/images/logos/udacity.png',
  '/assets/images/logos/v2ex.png',
  '/assets/images/logos/virscan.png',
  '/assets/images/logos/vultr.png',
  '/assets/images/logos/wikihow.png',
  '/assets/images/logos/Wikipedia.png',
  '/assets/images/logos/zhihu.png',
  '/assets/images/logos/zqbook.png'
]

self.addEventListener('install', function (e) {
  console.log('SW Install')
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log('SW precaching')
      return cache.addAll(filesToCache)
    })
  )
  self.skipWaiting()
})

self.addEventListener('activate', function (e) {
  console.log('SW Activate')
  e.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('SW Removing old cache', key)
          return caches.delete(key)
        }
      }))
    })
  )
  return self.clients.claim()
})

self.addEventListener('fetch', function (e) {
  console.log('SW Fetch', e.request.url)
  // 如果数据相关的请求，需要请求更新缓存
  let dataUrl = '/mockData/'
  if (e.request.url.indexOf(dataUrl) > -1) {
    e.respondWith(
      caches.open(dataCacheName).then(function (cache) {
        return fetch(e.request).then(function (response) {
          cache.put(e.request.url, response.clone())
          return response
        }).catch(function () {
          return caches.match(e.request)
        })
      })
    )
  } else {
    e.respondWith(
      caches.match(e.request).then(function (response) {
        return response || fetch(e.request)
      })
    )
  }
})
