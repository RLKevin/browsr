<script>
    import { getSubredditList, getNextPageSubreddits } from '../reddit.js';

    export let name; // page title for later use

    let formValue = 'worldnews';
    let menuOpen = false;
    let subreddits, newData = [];
    let id = 'BrowsR RSS feed';

    let subredditsPromise = getSubredditList().then(data => {
        subreddits = data;
    });

    function handleOnSubmit(event) {
        console_log('form submitted to: ' + formValue);
    }

    function toggleMenu() {
        menuOpen = !menuOpen;
    }
</script>

<section class="header">
    <button on:click|preventDefault={toggleMenu} class="menu">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-menu">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
    </button>
    <h1 class="pageTitle">
        {name}
    </h1>
</section>

<nav class="{menuOpen ? 'active' : ''}">
    <span class="title">Saved RSS feeds</span>
    <ul class="menuList">
        {#await subredditsPromise}
            <span class="spinner"></span>
        {:then number}
            {#each subreddits as subreddit}
                <li class="menuListItem">
                    <a href="/r/{subreddit}">{subreddit}</a>
                </li>
            {/each}
        {:catch error}
            <p style="color: red">{error.message}</p>
        {/await}
    </ul>
</nav>

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

<style>
    section.header {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        background-color: var(--cl-bg-alt);
        width: 100%;
        max-width: 800px;
        margin-inline: auto;
        height: 64px;
        gap: var(--padding);
    }

    button.menu {
        width: 48px;
        height: 48px;
        all: unset;
        cursor: pointer;
        padding: var(--padding);
        display: grid;
        place-items: center;
    }

    nav {
        position: fixed;
        top: 64px;
        bottom: 0;
        background-color: var(--cl-bg-alt);
        z-index: 99;
        width: calc(100% - 64px);
        transform: translateX(-100%);
        transition: transform 0.15s ease-out;
        overflow-y: scroll;
    }
    span.title {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 48px;
        padding: var(--padding);
    }
    nav ul {
        display: flex;
        flex-direction: column;
        list-style: none;
        margin: 0;
    }
    nav ul li a {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 48px;
        padding: var(--padding);
    }
    nav ul li:nth-of-type(2n - 1) a {
        background-color: var(--cl-bg);
    }
    nav.active {
        transform: translateX(0);
    }
</style>