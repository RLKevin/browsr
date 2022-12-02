<script>
    import { getSubredditList, getNextPageSubreddits } from '../reddit.js';

    let formValue = 'worldnews';
    let subreddits, newData = [];
    let id = 'BrowsR RSS feed';

    let subredditsPromise = getSubredditList().then(data => {
        subreddits = data;
    });

    function handleOnSubmit(event) {
        console_log('form submitted to: ' + formValue);
    }
</script>

<section class="picker">
    <form action="./r/{formValue}">
        <input bind:value={formValue} type="text" list="subreddits" placeholder="Enter Here" />
            {#await subredditsPromise}
                <span class="spinner"></span>
            {:then number}
            <datalist id="subreddits">
                {#each subreddits as subreddit}
                    <option value="{subreddit}">{subreddit}</option>
                {/each}
            </datalist>
        {:catch error}
            <p style="color: red">{error.message}</p>
        {/await}
    </form>
</section>