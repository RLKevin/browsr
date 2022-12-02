<script>
    export let post;
</script>

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
{:else if post.data.is_video} 
    <div class="media">
        <video controls>
            <source src="{post.data.media.reddit_video.fallback_url}/audio" type="video/mp4">
        </video>
        <!-- <span class="type">video</span> -->
    </div>
{:else }
    <a href="{post.data.url}" target="_blank" rel="noreferrer" class="media link">
        {#if post.data.thumbnail != '' && post.data.thumbnail != 'default' && post.data.thumbnail != 'self' && post.data.thumbnail != 'nsfw' && post.data.thumbnail != 'spoiler' && !post.data.thumbnail}
            <img loading="lazy" src="{post.data.thumbnail}" alt="">
        {/if}
        <span class="link">{post.data.url}</span>
    </a>
{/if}