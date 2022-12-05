import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export function load({ setHeaders }) {
	// setHeaders({
	// 	age: 0,
	// 	'cache-control': 'max-age',
	// });
    return;

	throw error(404, 'Not found');
}
