export let subreddits = [
	{ name: 'affinity', title: 'Affinity' },
	{ name: 'botw', title: 'Breath of the Wild' },
	{ name: 'gamedeals', title: 'Game Deals' },
	{ name: 'harrypottergame', title: 'Harry Potter: Wizards Unite' },
	{ name: 'homeassistant', title: 'Home Assistant' },
	{ name: 'livestreamfails', title: 'Livestream Fails' },
	{ name: 'malelivingspace', title: 'Male Living Space' },
	{ name: 'nintendoswitch', title: 'Nintendo Switch' },
	{ name: 'outoftheloop', title: 'Out f the Loop' },
	{ name: 'pcgaming', title: 'PC Gaming' },
	{ name: 'pokemon', title: 'Pokémon' },
	{ name: 'ProgrammerHumor', title: 'Programmer Humor' },
	{ name: 'sveltejs', title: 'Svelte' },
	{ name: 'technology', title: 'Technology' },
	{ name: 'thenetherlands', title: 'The Netherlands' },
	{ name: 'thesilphroad', title: 'The Silph Road' },
	{ name: 'trackmania', title: 'Trackmania' },
	{ name: 'trap', title: 'Trap' },
	{ name: 'vaping', title: 'Vaping' },
	{ name: 'web_design', title: 'Web Design' },
	{ name: 'webdev', title: 'Web Development' },
	{ name: 'worldnews', title: 'World News' },
	// { name: 'ik_ihe', title: 'ik_ihe' },
];

export async function getPosts(subreddit = 'aww', after = '') {
	const response = await fetch(
		`https://api.reddit.com/r/${subreddit}.json?raw_json=1&limit=10&after=${after}`
	);
	const json = await response.json();
	return json;
}

export async function getPost(id) {
	const response = await fetch(
		`https://api.reddit.com/comments/${id}.json?raw_json=1&limit=10`
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

export async function getFrontpage(after = '') {
	let url = `https://api.reddit.com/r/${getMultiRedditString()}.json?raw_json=1&limit=10&after=${after}`;
	const response = await fetch(url);
	const json = await response.json();
	return json;
}

export function getMultiRedditString() {
	let list = subreddits.map((subreddit) => subreddit.name);
	list = list.join('+');
	return list;
}

export async function getSubredditListWithNames() {
	return subreddits;
}
