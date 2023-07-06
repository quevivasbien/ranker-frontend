<script lang="ts">
    import ItemInfo from '$lib/components/ItemInfo.svelte';
    import ScoreInfo from '$lib/components/ScoreInfo.svelte';
    import { allItems } from '$lib/stores';

    export let data;

    const { getGlobalScore } = data;
</script>

<div>
    Total items: {$allItems.length}
</div>
<div>
    {#each $allItems as item}
        <ItemInfo {item} />
        {#await getGlobalScore(item.name)}
            <p>loading...</p>
        {:then score}
            <ScoreInfo {score} />
        {/await}
    {/each}
</div>