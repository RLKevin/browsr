export let subreddits = [
	'affinity',
	'botw',
	'harrypottergame',
	'homeassistant',
	'ik_ihe',
	'malelivingspace',
	'nintendoswitch',
	'pcgaming',
	'pokemon',
	'ProgrammerHumor',
	'sveltejs',
	'technology',
	'thenetherlands',
	'thesilphroad',
	'trackmania',
	'trap',
	'vaping',
	'web_design',
	'webdev',
	'worldnews',
];

export async function getPosts(subreddit = 'aww') {
	const response = await fetch(
		`https://api.reddit.com/r/${subreddit}.json?raw_json=1&limit=10`
	);
	const json = await response.json();
	return json;
}

export async function getNextPage(subreddit, after) {
	const response = await fetch(
		`https://api.reddit.com/r/${subreddit}.json?raw_json=1&limit=10&after=${after}`
	);
	const json = await response.json();
	return json;
}

export async function getPost(id) {
	const response = await fetch(
		`https://api.reddit.com/comments/${id}.json?raw_json=1&limit=100`
	);
	const json = await response.json();
	return json[0].data.children;
}

export async function getComments(id) {
	const response = await fetch(
		`https://api.reddit.com/comments/${id}.json?raw_json=1&limit=100`
	);
	const json = await response.json();
	return json[1].data.children;
}

export async function getSubreddits() {
	const response = await fetch(
		`https://api.reddit.com/r/${subreddits.join(
			'+'
		)}.json?raw_json=1&limit=100`
	);
	const json = await response.json();
	return json.data.children;
}

export async function getSubredditList() {
	return subreddits;
}
