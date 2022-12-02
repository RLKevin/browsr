<script>
    export let post;
</script>

<div class="footer">
    <span class="comments">{post.data.num_comments} comments</span>
    <span class="score">{post.data.score} points</span>
</div>

<style>
    .footer {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: var(--padding);
        padding: var(--padding);
        background-color: var(--cl-bg-alt2);
    }
</style>