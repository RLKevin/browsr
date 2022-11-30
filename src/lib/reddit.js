export async function getPosts(subreddit = 'aww') {
	const response = await fetch(`https://api.reddit.com/r/${subreddit}.json`);
	const json = await response.json();
	return json.data.children;
}

export async function getPost(id) {
	const response = await fetch(
		`https://api.reddit.com/comments/${id}.json?raw_json=1`
	);
	const json = await response.json();
	return json[0].data.children;
}

export async function getSubreddits() {
    let subreddits = [
		'homeassistant',
        'vaping',
		// 'webdev',
		// 'web_design',
		// 'sveltejs',
		// 'programminghumor',
		// 'affinity',
		// 'trackmania',
		// 'worldnews',
	];

	const response = await fetch(`https://api.reddit.com/r/${subreddits.join('+')}.json`);
	const json = await response.json();
	return json.data.children;
}
