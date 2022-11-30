export let subreddits = [
    'affinity',
    'harrypottergame',
    'homeassistant',
    'ProgrammerHumor',
    'sveltejs',
    'thesilphroad',
    'trackmania',
    'trap',
    'vaping',
    'web_design',
    'webdev',
    'worldnews',
];

export async function getPosts(subreddit = 'aww') {
	const response = await fetch(`https://api.reddit.com/r/${subreddit}.json?raw_json=1&limit=100`);
	const json = await response.json();
	return json.data.children;
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

	const response = await fetch(`https://api.reddit.com/r/${subreddits.join('+')}.json?raw_json=1&limit=100`);
	const json = await response.json();
	return json.data.children;
}

export async function getSubredditList() {
    // const response = await fetch(`https://www.reddit.com/subreddits.json`);
    // const json = await response.json();
    // return json.data.children;
    return subreddits;
}