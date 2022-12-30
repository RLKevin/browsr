<script>
    import Media from './Media.svelte';
    import Content from './Content.svelte';
    import Footer from './Footer.svelte';
    export let post;

    function logCardInfo() {
        console.log(post);
    }
</script>

<!-- <div on:click={logCardInfo} class="card-info">
    log card info
</div> -->
<div class="card">

    <Media {post} />

    <Content {post} />

    <Footer {post} />

</div>

<style>
    .card {
        display: flex;
        flex-direction: column;
        width: 100%;
        /* gap: 16px; */
        background-color: var(--cl-bg-alt);
        border-radius: var(--br);
        overflow: hidden;
        /* padding: var(--padding); */
        text-decoration: none;
        color: var(--cl-fg);
        height: auto;
        margin-bottom: auto;
    }
</style>