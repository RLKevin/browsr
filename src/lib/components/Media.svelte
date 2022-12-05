<script>
    export let post;
    export let linkable = false;
</script>

{#if post.data.post_hint == 'image'}
    <div class="media {linkable ? 'full-height' : ''}">
        <img loading="lazy" src="{post.data.url}" alt="{post.data.title}">
    </div>
{:else if post.data.is_video} 
    <div class="media {linkable ? 'full-height' : ''}">
        <!-- svelte-ignore a11y-media-has-caption -->
        <video controls>
            <source src="{post.data.media.reddit_video.fallback_url}" type="video/mp4">
        </video>
        <!-- <span class="type">video</span> -->
    </div>
{:else if post.data.url.includes('youtube.com')}
    <div class="media">
        <iframe width="560" height="315" src="{post.data.url.replace('/watch?v=', '/embed/')}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
{:else if post.data.media_embed.content}
    <div class="media {linkable ? 'full-height' : ''}">
        {@html post.data.media_embed.content}
    </div>
{:else if (post.data.is_self)}
    <div class="media none"></div>
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

    .media.full-height > * {
        max-height: none;
    }

    .media iframe {
        aspect-ratio: 16/9;
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
        display: flex;
        align-items: center;
        padding-inline: var(--padding);
        width: 100%;
        min-height: 64px;
        word-break: break-all;
    }
</style>