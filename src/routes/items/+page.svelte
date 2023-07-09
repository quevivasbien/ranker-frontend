<script lang="ts">
    import ItemInfo from '$lib/components/ItemInfo.svelte';
    import { allItems, user } from '$lib/stores';

    export let data;

    const { getGlobalScore, getUserScore } = data;

    async function getScores(item: string) {
        const globalScore = await getGlobalScore(item);
        let userScore;
        if ($user !== null) {
            userScore = await getUserScore(item);
        }
        return { globalScore, userScore };
    }
</script>

<div>
    Total items: {$allItems.length}
</div>
<div class="flex flex-wrap my-2">
    {#each $allItems as item}
    <div class="m-8">
        {#await getScores(item.name)}
            <p>loading...</p>
        {:then scores}
            <ItemInfo {item} globalScore={scores.globalScore} userScore={scores.userScore} />
        {/await}
    </div>
    {/each}
</div>