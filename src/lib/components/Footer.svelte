<script>
    export let post;
</script>

<a class="footer" href="/comments/{post.data.id}">
    <span class="comments">{post.data.num_comments} comments</span>
    <span class="score">{post.data.score} points</span>
</a>

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