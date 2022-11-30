<script>
    // import SvelteMarkdown from 'svelte-markdown'
    import { getPost } from '../../../lib/reddit.js';

    export let data;
    let id = data.id;

    let post, source, sourceHTML;

    let promise = getPost(id).then(data => {
        post = data[0].data;
        // console.log(post);
        source = decodeURI(post.body_html);
        // remove comments from source
        // source = source.replace(/<!--.*?-->/g, '');
        sourceHTML = post.selftext_html;
    });
</script>

<section>

    {#await promise}
        <span class="spinner"></span>
    {:then number}
        <a class="media" href="{post.url}">
            {#if post.post_hint == 'image'}
                <img src="{post.url}" alt="{post.title}">
            {/if}
            {#if post.post_hint == 'link'}
                <img src="{post.thumbnail}" alt="{post.title}">
            {/if}
            {#if post.post_hint == 'hosted:video'}
                <img src="{post.thumbnail}" alt="{post.title}">
            {/if}
            {post.post_hint}
        </a>
        <h1>{post.title}</h1>
        <div class="{post.subreddit} reddit">
            {@html sourceHTML}
        </div>
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