<script>
    import Media from './Media.svelte';
    import Content from './Content.svelte';
    import Footer from './Footer.svelte';
    export let post;
</script>

<a class="card" href="/comments/{post.data.id}">

    <Media {post} />

    <Content {post} />

    <Footer {post} />

</a>