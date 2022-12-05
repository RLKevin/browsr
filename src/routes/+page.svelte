<script>
    
    import { getFrontpage, getMultiRedditString, getSubredditListWithNames } from '../lib/reddit.js';
    import { onMount } from 'svelte';
    import Card from '../lib/components/Card.svelte';
    import Menu from '../lib/components/Menu.svelte';

    let id = 'BrowsR RSS feed';
    let posts = [];
    let promise;
    let after = '';
    if (posts.length === 0) {
        promise = getFrontpage().then((data) => {
            posts = data.data.children;
            after = data.data.after;
        });
    }

    let subreddits = getSubredditListWithNames();

    onMount(() => {
        window.onscroll = function(e) {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                fetchData();
            }
        };
    });

    const fetchData = async () => {
        const response = await fetch(
            `https://api.reddit.com/r/${getMultiRedditString()}.json?raw_json=1&limit=10&after=${after}`
        );
        const json = await response.json();
        posts = posts.concat(json.data.children);
        after = json.data.after;
    }

</script>

<Menu name={id} nav=true />

<div class="page">

    <section class="posts">
        {#each posts as post}
            <Card {post} />
        {/each}
    </section>

</div>
