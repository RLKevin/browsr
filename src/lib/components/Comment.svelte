<script>
    export let comment;
</script>

<div class="comment {comment.is_submitter ? 'op' : ''}">
    <div class="author">
        <span>{comment.data.author}</span>
    </div>
    <div class="content">
        {@html comment.data.body_html}
    </div>
</div>

<style>
    .comment {
        display: flex;
        flex-direction: column;
        gap: var(--padding);
    }

    .comment .op {
        background-color: var(--cl-accent);
        color: var(--cl-accent-text);
    }

    .comment .author {
        font-weight: bold;
    }
</style>