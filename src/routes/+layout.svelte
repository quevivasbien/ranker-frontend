<script lang="ts">
    import "../app.css";
    import { user } from "$lib/stores";

    function logout() {
        user.set(null);
        location.reload();
    }
</script>


<svelte:head>
    <title>Ranker</title>
</svelte:head>

<div class="flex flex-row my-4 mx-8">
    <div class="flex flex-grow justify-start space-x-3">
        <a href="/items" class="text-blue-500 hover:text-blue-300">Items</a>
        {#if $user}
            <a href="/items/add" class="text-blue-500 hover:text-blue-300">Add Item</a>
            {#if $user.username === 'admin'}
                <a href="/users" class="text-blue-500 hover:text-blue-300">Users</a>
            {/if}
            <a href="/compare" class="text-blue-500 hover:text-blue-300">Compare</a>
        {/if}
    </div>
    <div class="flex justify-end space-x-3">
        {#if $user}
            <span>{$user.username}</span>
            <a href="/items" class="text-blue-500 hover:text-blue-300" on:click={logout}>Logout</a>
        {:else}
            <a href="/login" class="text-blue-500 hover:text-blue-300">Login</a>
        {/if}
    </div>
</div>

<div class="mx-6 mt-8">
    <slot />
</div>