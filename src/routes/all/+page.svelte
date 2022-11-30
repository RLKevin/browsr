<script>
    
    import { getSubreddits } from '../../lib/reddit.js';
    // import TimeAgo from 'javascript-time-ago'
    // import en from 'javascript-time-ago/locale/en'

    // TimeAgo.addDefaultLocale(en)
    // const timeAgo = new TimeAgo('en-US')

    let posts = [];

    let promise = getSubreddits().then(data => {
        // console.log('got the data');
        // console.log(data);
        posts = data;
        console.log(posts);
    });

</script>

<div class="posts">
    {#await promise}
        <span class="spinner"></span>
    {:then number}
        {#each posts as event}
            <a class="card" href="comments/{event.data.id}">
                <div class="thumbnail" style="background-image: url({event.data.thumbnail})"></div>
                <span class="tag">{event.data.link_flair_css_class}</span>
                <h3>{event.data.title}</h3>
                <!-- {#if event.data.edited}
                    <p class="date">last updated at: {timeAgo.format(event.data.edited * 1000)}</p>
                {/if} -->
            </a>
        {/each}
    {:catch error}
        <p style="color: red">{error.message}</p>
    {/await}
</div>