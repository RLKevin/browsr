<script>
    
    import { getSubreddits, getSubredditList, getNextPageSubreddits } from '../lib/reddit.js';
    import { onMount } from 'svelte';
    import Card from '../lib/components/Card.svelte';
    import Title from '../lib/components/Title.svelte';
    import Menu from '../lib/components/Menu.svelte';

    let id = 'BrowsR RSS feed';
    let posts = [];
    let promise;
    let after = '';
    if (posts.length === 0) {
        promise = getSubreddits().then((data) => {
            posts = data.data.children;
            after = data.data.after;
        });
    }

    let subreddits = [];
    let subredditsPromise = getSubredditList().then(data => {
        subreddits = data;
    });

    onMount(() => {
        window.onscroll = function(e) {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                fetchData();
            }
        };
    });

    const fetchData = async () => {
        const response = await fetch(
            `https://api.reddit.com/r/${subreddits.join(
                '+'
            )}.json?raw_json=1&limit=10&after=${after}`
        );
        const json = await response.json();
        posts = posts.concat(json.data.children);
        after = json.data.after;
    }

</script>

<Menu name={id} />

<section class="posts">
    {#each posts as post}
        <Card {post} />
    {/each}
</section>