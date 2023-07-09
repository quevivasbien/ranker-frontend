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

<div>
    <div class="flex flex-row mx-auto p-4 sm:max-w-6xl sticky top-0 bg-white/50 border-b-2 backdrop-blur-sm">
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


    <div class="mt-8 mx-auto px-8 sm:max-w-4xl border-l">
        <slot />
    </div>
</div>