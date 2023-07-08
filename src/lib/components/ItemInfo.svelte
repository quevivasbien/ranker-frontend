<script lang="ts">
    import type { Item, GlobalScore, UserScore } from "$lib/interfaces";
    import ScoreInfo from "./ScoreInfo.svelte";

    export let item: Item;
    export let globalScore: GlobalScore | null | undefined = undefined;
    export let userScore: UserScore | null | undefined = undefined;
</script>

<div class="space-y-2">
    <h2 class="text-2xl">{item.name}</h2>
    <p class="italic">{item.description}</p>
    {#if globalScore !== undefined}
        <div>
            <h3 class="text-xl">Global score</h3>
            <ScoreInfo score={globalScore} />
        </div>
    {/if}
    {#if userScore !== undefined}
        <div>
            <h3 class="text-xl">Your score</h3>
            <ScoreInfo score={userScore} />
        </div>
    {/if}
</div>