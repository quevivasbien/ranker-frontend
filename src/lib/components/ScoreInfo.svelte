<script lang="ts">
    import type { GlobalScore } from "$lib/interfaces";

    export let score: GlobalScore | null;
</script>

{#if score === null}
    <p>Unrated</p>
{:else}
    <p>Rating: {score.rating}</p>
    <p>Number of votes: {score.numVotes}</p>
{/if}