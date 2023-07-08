<script lang="ts">
    import type { GlobalScore, UserScore } from "$lib/interfaces";

    export let score: GlobalScore | UserScore | null;
</script>

{#if score === null}
    <p>No votes yet</p>
{:else}
    <p>Rating: {score.rating}</p>
    <p>Number of votes: {score.numVotes}</p>
{/if}