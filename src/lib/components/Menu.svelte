<script>
    import { getSubredditListWithNames } from '../reddit.js';

    export let name; // page title for later use
    export let nav; // enable/disable navigation

    let formValue = 'worldnews';
    let menuOpen = false;
    let subreddits = [];

    let subredditsPromise = getSubredditListWithNames().then(data => {
        subreddits = data;
    });

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

{#if nav}
    <nav class="{menuOpen ? 'active' : ''}">
        <ul class="menuList">
            {#await subredditsPromise}
            <span class="spinner"></span>
            {:then number}
                <li>
                    <a class="title" href="/">Saved RSS feeds ({subreddits.length})</a>
                </li>
                {#each subreddits as subreddit}
                    <li class="menuListItem">
                        <a href="/r/{subreddit.name}">{subreddit.title}</a>
                    </li>
                {/each}
            {:catch error}
                <p style="color: red">{error.message}</p>
            {/await}
        </ul>
        <form action="/r/{formValue}">
            <input bind:value={formValue} type="text" list="subreddits" placeholder="Enter Here" />
                {#await subredditsPromise}
                    <span class="spinner"></span>
                {:then number}
                <datalist id="subreddits">
                    {#each subreddits as subreddit}
                        <option value="{subreddit.name}">{subreddit.title}</option>
                    {/each}
                </datalist>
            {:catch error}
                <p style="color: red">{error.message}</p>
            {/await}
        </form>
    </nav>
{/if}

<style>
    section.header {
        display: flex;
        position: fixed;
        top: 0;
        left: 0;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        background-color: var(--cl-bg-alt);
        width: 100%;
        margin-inline: auto;
        height: 64px;
        gap: var(--padding);
        z-index: 98;
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
        max-width: var(--navwidth);
        transform: translateX(-100%);
        transition: transform 0.15s ease-out;
        overflow-y: scroll;
    }
    @media screen and (min-width: 1200px) {
        nav {
            transform: translateX(0);
        }
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
    nav ul li a.title {
        color: var(--cl-fg);
    }
    nav ul li:nth-of-type(2n - 1) a {
        background-color: var(--cl-bg);
    }
    nav.active {
        transform: translateX(0);
    }

    section.picker {
        padding: var(--padding);
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    input {
        width: calc(100% - calc(var(--padding) * 2));
        max-width: 400px;
        padding: var(--padding);
        border-radius: var(--br);
        border: 1px solid var(--cl-bg-alt);
        background-color: var(--cl-bg-alt2);
        color: var(--cl-fg);
        font-size: 1em;
        margin: var(--padding) auto;
    }
</style>