<script>
    
    import { getSubreddits, getSubredditList, getNextPageSubreddits } from '../lib/reddit.js';
    import { onMount } from 'svelte';
    import Card from '../lib/components/Card.svelte';

    let posts = [];
    let promise;
    let after = '';
    if (posts.length === 0) {
        promise = getSubreddits().then((data) => {
            posts = data.data.children;
            after = data.data.after;
        });
    }
    
    let formValue = 'worldnews';
    let subreddits, newData = [];
    let id = 'BrowsR RSS feed';

    let subredditsPromise = getSubredditList().then(data => {
        subreddits = data;
    });

    function handleOnSubmit(event) {
        console_log('form submitted to: ' + formValue);
    }

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

<section class="title">
    <h1>{id}</h1>
</section>

<section class="picker">
    <form action="./r/{formValue}">
        <input bind:value={formValue} type="text" list="subreddits" placeholder="Enter Here" />
            {#await subredditsPromise}
                <span class="spinner"></span>
            {:then number}
            <datalist id="subreddits">
                {#each subreddits as subreddit}
                    <option value="{subreddit}">{subreddit}</option>
                {/each}
            </datalist>
        {:catch error}
            <p style="color: red">{error.message}</p>
        {/await}
    </form>
</section>

<section class="posts">
    {#each posts as post}
        <Card {post} />
    {/each}
</section>