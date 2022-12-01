<script>
    export let name;

    function handleRefresh() {
        localStorage.removeItem(name);
        promise = getPosts(name).then((data) => {
            posts = data;
            console.log(posts);
            localStorage.setItem(name, JSON.stringify(posts));
        });
    }
</script>

<section class="title">
    <h1>{name}</h1>
    <button class="refresh" on:click={handleRefresh}>

    </button>
</section>