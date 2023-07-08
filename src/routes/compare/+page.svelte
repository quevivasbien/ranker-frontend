<script lang="ts">
    import ItemInfo from "$lib/components/ItemInfo.svelte";

    export let data;

    const { getItemsForComparison, getItem, sendUserChoice } = data;

    let itemsPromise: Promise<string[] | null> = getItemsForComparison();

    let itemSelected: string | undefined;

    function submitComparison(items: string[] | null) {
        if (itemSelected === undefined || items === null) {
            return;
        }
        sendUserChoice(items[0], items[1], itemSelected).then(() => {
            itemsPromise = getItemsForComparison();
        });
        itemSelected = undefined;
    }
</script>

<h1>Which do you prefer?</h1>
{#await itemsPromise}
    <p>loading...</p>
{:then items}
    <form on:submit|preventDefault={() => submitComparison(items)} class="flex flex-col space-y-2">
        {#if items}
        <div class="flex flex-row space-x-4">
        {#each items as itemName}
            <label>
                <input type="radio" bind:group={itemSelected} value={itemName} />
                {#await getItem(itemName)}
                    <p>loading...</p>
                {:then item}
                    {#if item !== null}
                        <ItemInfo {item} />
                    {:else}
                        <p>Item not found</p>
                    {/if}
                {/await}
            </label>
        {/each}
        </div>
        {/if}
        <div class="flex flex-row justify-end">
            <button type="button" class="drop-shadow rounded bg-blue-200 disabled:bg-gray-300 p-2" disabled={itemSelected === undefined} on:click={() => submitComparison(items)}>Submit</button>
        </div>
    </form>
    
{/await}