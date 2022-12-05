import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export function load({ params, setHeaders }) {
	// setHeaders({
	// 	age: 0,
	// 	'cache-control': 'max-age',
	// });
	return {
		id: params.id,
	};

	throw error(404, 'Not found');
}
