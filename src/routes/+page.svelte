<script>
    
    import { getSubreddits, getSubredditList, getNextPageSubreddits } from '../lib/reddit.js';
    import { onMount } from 'svelte';
	import { handle_promise } from 'svelte/internal';

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
        <a class="card" href="comments/{post.data.id}">

            <!-- images -->
            {#if post.data.post_hint == 'image'}
                <div class="media">
                    {#if post.data.post_hint == 'image'}
                        <img loading="lazy" src="{post.data.url}" alt="{post.data.title}">
                        <!-- <span class="type">image</span> -->
                    {/if}
                    {#if post.data.post_hint == 'link'}
                        <img loading="lazy" src="{post.data.thumbnail}" alt="{post.data.title}">
                        <span class="type">link</span>
                    {/if}
                </div>
            {/if}

            <!-- video -->
            {#if post.data.is_video}
                <div class="media">
                    <video controls>
                        <source src="{post.data.media.reddit_video.fallback_url}/audio" type="video/mp4">
                    </video>
                    <!-- <span class="type">video</span> -->
                </div>
            {/if}

            <!-- link -->
            {#if post.data.post_hint == 'link'}
                <div class="media link">
                    <img loading="lazy" src="{post.data.thumbnail}" alt="">
                    <span class="link">{post.data.url}</span>
                </div>
            {/if}

            <div class="content">
                <h3>{post.data.title}</h3>
                <div class="info">
                    <span class="subreddit">{post.data.subreddit}</span>
                    {#if post.data.link_flair_text}
                        <span class="flair">{post.data.link_flair_text}</span>
                    {/if}
                    {#if post.data.pinned}
                        <span class="pinned">pinned</span>
                    {/if}
                    {#if post.data.stickied}
                        <span class="stickied">stickied</span>
                    {/if}
                    {#if post.data.over_18}
                        <span class="over18">nsfw</span>
                    {/if}
                </div>

                <!-- selftext -->
                {#if post.data.selftext_html != null}
                    {@html post.data.selftext_html}
                {/if}

                <!-- <span class="author">{post.data.author}</span> -->
                <!-- <span class="date">{timeAgo.format(post.data.created_utc * 1000)}</span> -->
                <!-- {#if post.data.edited}
                    <p class="date">last updated at: {timeAgo.format(post.data.edited * 1000)}</p>
                {/if} -->
            </div>
            <div class="footer">
                <span class="comments">{post.data.num_comments} comments</span>
                <span class="score">{post.data.score} points</span>
            </div>
        </a>
    {/each}
</section>