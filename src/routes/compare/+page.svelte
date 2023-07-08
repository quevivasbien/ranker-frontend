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
    <form on:submit|preventDefault={() => submitComparison(items)}>
        {#if items}
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
        {/if}
        <button type="submit" disabled={itemSelected === undefined}>Submit</button>
    </form>
    
{/await}