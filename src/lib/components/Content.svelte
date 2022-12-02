<script>
    export let post;
</script>

<div class="content">
    <h1>{post.data.title}</h1>
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
        {@html post.data.selftext_html}
    {/if}

    <!-- <span class="author">{post.data.author}</span> -->
    <!-- <span class="date">{timeAgo.format(post.data.created_utc * 1000)}</span> -->
    <!-- {#if post.data.edited}
        <p class="date">last updated at: {timeAgo.format(post.data.edited * 1000)}</p>
    {/if} -->
</div>