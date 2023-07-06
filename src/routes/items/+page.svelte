<script lang="ts">
    import { allItems } from '$lib/stores';
</script>

<div>
    Total items: {$allItems.length}
</div>
<ol>
    {#each $allItems as item}
        <li>{item.name}: {item.description}</li>
    {/each}
</ol>