<script>
    export let post;
    export let linkable = false;
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
    {#if linkable}
        <a href="{post.data.url}" target="_blank" rel="noreferrer" class="media link">
            {#if post.data.thumbnail != '' && post.data.thumbnail != 'default' && post.data.thumbnail != 'self' && post.data.thumbnail != 'nsfw' && post.data.thumbnail != 'spoiler' && !post.data.thumbnail}
                <img loading="lazy" src="{post.data.thumbnail}" alt="">
            {/if}
            <span class="link">{post.data.url}</span>
        </a>
    {:else}
        <div class="media link">
            {#if !['default', 'self'].includes(post.data.thumbnail)}
                <!-- <p>{post.data.thumbnail}</p> -->
                <img loading="lazy" src="{post.data.thumbnail}" alt="">
            {/if}
            <span class="link">{post.data.url}</span>
        </div>
    {/if}
{/if}

<style>
    .media {
        position: relative;
        width: 100%;
        background-color: var(--cl-bg-alt2);
        overflow: hidden;
        border-radius: var(--br) var(--br) 0 0;
    }

    .media img,
    .media video,
    .media iframe {
        display: block;
        width: 100%;
        max-height: 80vh;
        height: auto;
        object-fit: contain;
    }

    .media iframe {
        aspect-ratio: 1/1;
    }

    .media.link {
        display: flex !important;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .media.link img {
        width: 64px;
        aspect-ratio: 1/1;
        object-fit: cover;
    }
    .media.link span.link {
        display: block;
        padding: var(--padding);
        width: 100%;
        word-break: break-all;
    }
</style>