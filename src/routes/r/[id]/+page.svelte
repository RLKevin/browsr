<script>
    
    import { getPosts, getNextPage } from '../../../lib/reddit.js';
    import Title from '../../../lib/components/Title.svelte';
    import { onMount } from 'svelte';
    import Card from '../../../lib/components/Card.svelte';

    export let data;
    let id = data.id;

    let posts = [];
    let promise;
    let after = '';
    if (posts.length === 0) {
        promise = getPosts(id).then((data) => {
            posts = data.data.children;
            after = data.data.after;
        });
    }

    onMount(() => {
        window.onscroll = function(e) {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                fetchData();
            }
        };
    });

    const fetchData = async () => {
        const response = await fetch(
            `https://api.reddit.com/r/${id}.json?raw_json=1&limit=10&after=${after}`
        );
        const json = await response.json();
        posts = posts.concat(json.data.children);
        after = json.data.after;
    }

</script>

<!-- <Title name={id} /> -->

<section class="title">
    <h1>{id}</h1>
</section>

<section class="posts">
    {#await promise}
        <span class="spinner"></span>
    {:then number}
        {#each posts as post}
            <Card {post} />
        {/each}
    {:catch error}
        <p style="color: red">{error.message}</p>
    {/await}
</section>