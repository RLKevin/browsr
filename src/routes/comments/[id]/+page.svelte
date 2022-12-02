<script>
    // import SvelteMarkdown from 'svelte-markdown'
    import { getPost, getComments } from '../../../lib/reddit.js';
    import Media from '../../../lib/components/Media.svelte';
    import Content from '../../../lib/components/Content.svelte';
    import Footer from '../../../lib/components/Footer.svelte';

    export let data;
    let id = data.id;

    let post, comments, source, sourceHTML;

    let promise = getPost(id).then(data => {
        post = data[0];
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

        <Media {post} />

        <Content {post} />

        <Footer {post} />
        
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