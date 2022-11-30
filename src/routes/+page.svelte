<script>
    
    import { getSubreddits, getSubredditList } from '../lib/reddit.js';
    // import TimeAgo from 'javascript-time-ago'

    // // English.
    // import en from 'javascript-time-ago/locale/en'

    // TimeAgo.addDefaultLocale(en)

    // // Create formatter (English).
    // const timeAgo = new TimeAgo('en-US')
    
    let formValue = 'worldnews';
    let posts, subreddits = [];

    let subredditsPromise = getSubredditList().then(data => {
        subreddits = data;
        console.log(subreddits);
    });

    let promise = getSubreddits().then(data => {
        posts = data;
    });

    function handleOnSubmit(event) {
        console_log('form submitted to: ' + formValue);
    }

</script>

<section class="title">
    <h1>RSS feed</h1>
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
    {#await promise}
        <span class="spinner"></span>
    {:then number}
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

                <div class="content">
                    <h3>{post.data.title}</h3>
                    <div class="info">
                        <span class="subreddit">{post.data.subreddit}</span>
                        {#if post.data.link_flair_text}
                            <span class="flair">{post.data.link_flair_text}</span>
                        {/if}
                    </div>

                    <!-- selftext -->
                    {#if post.data.post_hint == 'self'}
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
    {:catch error}
        <p style="color: red">{error.message}</p>
    {/await}
</section>