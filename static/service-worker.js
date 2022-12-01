'use strict';

/**
 * Service Worker of BrowsR
 */

const cacheName = 'browsr';
const startPage = 'https://browsr.netflify.app';
const offlinePage = 'https://browsr.netflify.app';
const filesToCache = [startPage, offlinePage];
const neverCacheUrls = [];

// Install
self.addEventListener('install', function (e) {
	console.log('BrowsR service worker installation');
	e.waitUntil(
		caches.open(cacheName).then(function (cache) {
			console.log('BrowsR service worker caching dependencies');
			filesToCache.map(function (url) {
				return cache.add(url).catch(function (reason) {
					return console.log(
						'BrowsR: ' + String(reason) + ' ' + url
					);
				});
			});
		})
	);
});

// Activate
self.addEventListener('activate', function (e) {
	console.log('BrowsR service worker activation');
	e.waitUntil(
		caches.keys().then(function (keyList) {
			return Promise.all(
				keyList.map(function (key) {
					if (key !== cacheName) {
						console.log('BrowsR old cache removed', key);
						return caches.delete(key);
					}
				})
			);
		})
	);
	return self.clients.claim();
});

// Range Data Code
var fetchRangeData = function (event) {
	var pos = Number(
		/^bytes\=(\d+)\-$/g.exec(event.request.headers.get('range'))[1]
	);
	console.log(
		'Range request for',
		event.request.url,
		', starting position:',
		pos
	);
	event.respondWith(
		caches
			.open(cacheName)
			.then(function (cache) {
				return cache.match(event.request.url);
			})
			.then(function (res) {
				if (!res) {
					return fetch(event.request).then((res) => {
						return res.arrayBuffer();
					});
				}
				return res.arrayBuffer();
			})
			.then(function (ab) {
				return new Response(ab.slice(pos), {
					status: 206,
					statusText: 'Partial Content',
					headers: [
						// ['Content-Type', 'video/webm'],
						[
							'Content-Range',
							'bytes ' +
								pos +
								'-' +
								(ab.byteLength - 1) +
								'/' +
								ab.byteLength,
						],
					],
				});
			})
	);
};

// Fetch
self.addEventListener('fetch', function (e) {
	// Return if the current request url is in the never cache list
	if (!neverCacheUrls.every(checkNeverCacheList, e.request.url)) {
		console.log('BrowsR: Current request is excluded from cache.');
		return;
	}

	// redirect to home page if url ens with .json
	// if (e.request.url.endsWith('.json')) {
	// 	e.respondWith(
	// 		caches.match(startPage).then(function (response) {
	// 			return response || fetch(e.request);
	// 		})
	// 	);
	// 	return;
	// }

	// Return if request url protocal isn't http or https
	if (!e.request.url.match(/^(http|https):\/\//i)) return;

	// Return if request url is from an external domain.
	if (new URL(e.request.url).origin !== location.origin) return;
	// For Range Headers
	// For POST requests, do not use the cache. Serve offline page if offline.
	if (e.request.method !== 'GET') {
		e.respondWith(
			fetch(e.request).catch(function () {
				return caches.match(offlinePage);
			})
		);
		return;
	}

	// Revving strategy
	if (
		(e.request.mode === 'navigate' || e.request.mode === 'cors') &&
		navigator.onLine
	) {
		e.respondWith(
			fetch(e.request).then(function (response) {
				return caches.open(cacheName).then(function (cache) {
					cache.put(e.request, response.clone());
					return response;
				});
			})
		);
		return;
	}

	e.respondWith(
		caches
			.match(e.request)
			.then(function (response) {
				return (
					response ||
					fetch(e.request).then(function (response) {
						return caches.open(cacheName).then(function (cache) {
							cache.put(e.request, response.clone());
							return response;
						});
					})
				);
			})
			.catch(function () {
				return caches.match(offlinePage);
			})
	);
});

// Check if current url is in the neverCacheUrls list
function checkNeverCacheList(url) {
	if (this.match(url)) {
		return false;
	}
	return true;
}
