<script>
    import Comment from './Comment.svelte';

    export let comment;

    let replies;
    let expanded = false;
    let hasReplies = comment.data.replies ? comment.data.replies.data.children.length : false;
    if (hasReplies) {
        replies = comment.data.replies.data.children;
        replies.splice(-1, 1);
    }

    function handleClick() {
        expanded = !expanded;
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div on:click={handleClick} class:active="{expanded}" class="comment {comment.data.is_submitter ? 'op' : ''}">
    <div class="author">
        <span>{comment.data.author}</span>
    </div>
    <div class="content">
        {@html comment.data.body_html}
    </div>
    {#if hasReplies}
        <div class="replies">
            {#each replies as reply}
                <Comment comment={reply}/>
            {/each}
        </div>
    {/if}
</div>

<style>
    .comment {
        display: flex;
        flex-direction: column;
        gap: var(--padding);
        border-radius: var(--br);
        padding: var(--padding);
        background-color: var(--cl-bg-alt);
    }

    .comment.op {
        background-color: var(--cl-accent);
        color: var(--cl-accent-text);
    }

    .comment .author {
        font-weight: bold;
    }

    .replies {
        display: none;
        flex-direction: column;
        gap: var(--padding);
        margin-inline-start: calc(.5 * var(--padding));
    }

    .comment.active .replies {
        display: flex;
    }
</style>