<script>
    export let post;
    export let limitSelftext = true;
</script>

<div class="content">
    <h3>{post.data.title}</h3>
    <div class="info">
        <a class="subreddit" href="../../r/{post.data.subreddit}">{post.data.subreddit}</a>
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
        <div class="selftext {limitSelftext ? 'limit' : ''}">
            {@html post.data.selftext_html}
        </div>
    {/if}

    <span class="author">by {post.data.author}</span>
    <!-- <span class="date">{timeAgo.format(post.data.created_utc * 1000)}</span> -->
    <!-- {#if post.data.edited}
        <p class="date">last updated at: {timeAgo.format(post.data.edited * 1000)}</p>
    {/if} -->
</div>

<style>
    .content {
        display: flex;
        flex-direction: column;
        gap: var(--padding);
        padding: var(--padding);
    }

    .content .info {
        display: flex;
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap;
        gap: var(--padding);
    }
    .content .selftext.limit {
        display: -webkit-box;
		-webkit-line-clamp: 10;
		line-clamp: 10;
		-webkit-box-orient: vertical;
		overflow: hidden;
    }
    span.flair,
    span.pinned,
    span.stickied,
    span.over18 {
        display: inline-block;
        padding: 0.25em 0.5em;
        border-radius: 0.25em;
        font-size: 0.75em;
        width: fit-content;
    }

    span.flair {
        background-color: var(--cl-accent);
        color: var(--cl-accent-text);
    }
    span.pinned,
    span.stickied {
        background-color: var(--cl-accent-2);
        color: var(--cl-accent-2-text);
    }
    span.over18 {
        background-color: var(--cl-warning);
        color: var(--cl-warning-text);
    }

    span.link {
        display: inline-block;
        padding: 0.25em 0.5em;
        border-radius: 0.25em;
        font-size: 0.75em;
        width: fit-content;
        background-color: var(--cl--2);
        color: var(--cl-fg);
    }

    .subreddit {
        display: inline-block;
        font-size: 0.75em;
        color: var(--cl-accent);
    }
</style>