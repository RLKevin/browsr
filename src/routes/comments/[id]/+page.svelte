<script>
    // import SvelteMarkdown from 'svelte-markdown'
    import { getPost, getComments } from '../../../lib/reddit.js';
    import Media from '../../../lib/components/Media.svelte';
    import Content from '../../../lib/components/Content.svelte';
    import Footer from '../../../lib/components/Footer.svelte';
    import Comment from '../../../lib/components/Comment.svelte';

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

        <Media {post} linkable=true />

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
            <Comment {comment}/>
        {/each}
    {:catch error}
        <p style="color: red">{error.message}</p>
    {/await}
</section>

<style>
    section.post {
        display: flex;
        flex-direction: column;
        background-color: var(--cl-bg-alt);
        width: 100%;
        max-width: 800px;
        margin-inline: auto;
    }
    
    section.comments {
        display: flex;
        flex-direction: column;
        gap: var(--padding);
        padding: var(--padding);
        width: 100%;
        max-width: 800px;
        margin-inline: auto;
    }
</style>