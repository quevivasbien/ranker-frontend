<script lang="ts">
    import type { Item } from "$lib/interfaces";

    export let item: Item;
</script>

<h2>{item.name}</h2>
<p>{item.description}</p>