<script lang="ts">
    export let data;

    const { items } = data;
</script>

<ol>
    {#each items as item}
        <li>{item.name}: {item.description}</li>
    {/each}
</ol>