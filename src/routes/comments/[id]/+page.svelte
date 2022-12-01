<script>
    // import SvelteMarkdown from 'svelte-markdown'
    import { getPost, getComments } from '../../../lib/reddit.js';

    export let data;
    let id = data.id;

    let post, comments, source, sourceHTML;

    let promise = getPost(id).then(data => {
        post = data[0].data;
        console.log(post);
    });

    let commentPromise = getComments(id).then(data => {
        comments = data;
    });
</script>

<section class="post">

    {#await promise}
        <span class="spinner"></span>
    {:then number}
        <!-- images -->
        {#if post.post_hint == 'image'}
            <div class="media">
                {#if post.post_hint == 'image'}
                    <img loading="lazy" src="{post.url}" alt="{post.title}">
                    <!-- <span class="type">image</span> -->
                {/if}
                {#if post.post_hint == 'link'}
                    <img loading="lazy" src="{post.thumbnail}" alt="{post.title}">
                    <span class="type">link</span>
                {/if}
            </div>
        {/if}

        <!-- video -->
        {#if post.is_video}
            <div class="media">
                <video controls>
                    <source src="{post.media.reddit_video.fallback_url}/audio" type="video/mp4">
                </video>
                <!-- <span class="type">video</span> -->
            </div>
        {/if}

        <!-- link -->
        {#if post.post_hint == 'link'}
            <div class="media link">
                <img loading="lazy" src="{post.thumbnail}" alt="">
                <span class="link">{post.url}</span>
            </div>
        {/if}

        <div class="content">
            <h1>{post.title}</h1>
            <div class="info">
                <a class="subreddit" href="../../r/{post.subreddit}">{post.subreddit}</a>
                {#if post.link_flair_text}
                    <span class="flair">{post.link_flair_text}</span>
                {/if}
                {#if post.pinned}
                    <span class="pinned">pinned</span>
                {/if}
                {#if post.stickied}
                    <span class="stickied">stickied</span>
                {/if}
                {#if post.over_18}
                    <span class="over18">nsfw</span>
                {/if}
            </div>

            <!-- selftext -->
            {#if post.selftext_html != ''}
                {@html post.selftext_html}
            {/if}
        </div>
        <div class="footer">
            <span class="comments">{post.num_comments} comments</span>
            <span class="score">{post.score} points</span>
        </div>
    {:catch error}
        <p style="color: red">{error.message}</p>
    {/await}
</section>

<section class="comments">
    {#await commentPromise}
        <span class="spinner"></span>
    {:then number}
        {#each comments as comment}
            <div class="comment {comment.is_submitter ? 'op' : ''}">
                <div class="author">
                    <span>{comment.data.author}</span>
                </div>
                <div class="content">
                    {@html comment.data.body_html}
                </div>
            </div>
        {/each}
    {:catch error}
        <p style="color: red">{error.message}</p>
    {/await}
</section>

<style>
    .media {
        display: block;
        width: 100%;
        height: auto;
    }
</style>