<script lang="ts">
    import ItemInfo from '$lib/components/ItemInfo.svelte';
    import type { GlobalScore, Item, UserScore } from '$lib/interfaces.js';
    import { allItems, user } from '$lib/stores';
    import { onMount } from 'svelte';

    export let data;

    const { getGlobalScore, getUserScore } = data;

    let globalScores = new Map<string, GlobalScore | null>();
    let userScores = new Map<string, UserScore | null>();

    onMount(async () => {
        $allItems.forEach((item) => {
            getGlobalScore(item.name).then((score) => {
                globalScores.set(item.name, score)
                globalScores = globalScores;  // need this so ui updates
            });
            if (user) {
                getUserScore(item.name).then((score) => {
                    userScores.set(item.name, score);
                    userScores = userScores;  // need this so ui updates
                });
            }
        });
    });

    function sortItemsBy(mapping: Map<string, GlobalScore | null> | Map<string, UserScore | null>) {
        $allItems = $allItems.sort((a, b) => {
            const aValue = mapping.get(a.name)?.rating ?? 0;
            const bValue = mapping.get(b.name)?.rating ?? 0;
            return bValue - aValue;
        });
    }

    let sortedBy = '';

</script>

<div class="flex flex-row space-x-8 items-center">
    <div>Total items: {$allItems.length}</div>
    <button class="drop-shadow rounded bg-blue-200 disabled:bg-gray-300 p-2" on:click={() => { sortedBy = 'global'; sortItemsBy(globalScores); }} disabled={sortedBy === 'global'}>Sort by global score</button>
    <button class="drop-shadow rounded bg-blue-200 disabled:bg-gray-300 p-2" on:click={() => { sortedBy = 'user'; sortItemsBy(userScores); }} disabled={sortedBy === 'user'}>Sort by user score</button>
</div>
<div class="flex flex-wrap my-2">
    {#each $allItems as item}
        <div class="m-8 sm:w-1/4">
            {#if globalScores.get(item.name) !== undefined}
                <ItemInfo {item} globalScore={globalScores.get(item.name)} userScore={$user == null ? undefined : userScores.get(item.name)} />
            {:else}
                <p>Loading...</p>
            {/if}
        </div>
    {/each}
</div>
