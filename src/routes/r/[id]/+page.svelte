<script>
    
    import { getPosts } from '../../../lib/reddit.js';
    import Menu from '../../../lib/components/Menu.svelte';
    import { onMount } from 'svelte';
    import Card from '../../../lib/components/Card.svelte';

    export let data;
    let id = data.id;
    console.log(id);

    let posts = [];
    let promise;
    let loading = true;
    let after = '';
    if (posts.length === 0) {
        promise = getPosts(id).then((data) => {
            posts = data.data.children;
            after = data.data.after;
        });
    }

    $: data.id,reset();
    function reset() {
        id = data.id;
        promise = getPosts(id).then((data) => {
            posts = data.data.children;
            after = data.data.after;
            loading = false;
        });
    }

    onMount(() => {
        window.onscroll = function(e) {
            let scrollpercentage = (window.innerHeight + window.scrollY) / document.body.offsetHeight;
            console.log(scrollpercentage, loading);
            if (scrollpercentage > 0.97 && !loading) {
                loading = true;
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
        loading = false;
    }

</script>

<Menu name={id} nav="false" />

<div class="page">

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

</div>
