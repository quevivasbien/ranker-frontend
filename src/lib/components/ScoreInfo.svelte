<script lang="ts">
    import type { GlobalScore } from "$lib/interfaces";

    export let score: GlobalScore;
</script>

<h2>{score.itemName}</h2>
<p>Rating: {score.rating}</p>
<p>Number of votes: {score.numVotes}</p>