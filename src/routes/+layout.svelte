<script lang="ts">

    import { user } from "$lib/stores";

    function logout() {
        user.set(null);
    }
</script>

<a href="/items">Items</a>
{#if $user}
    <a href="/items/add">Add Item</a>
    {#if $user.username === 'admin'}
        <a href="/users">Users</a>
    {/if}
    <a href="/compare">Compare</a>
    <span>{$user.username}</span>
    <a href="/items" on:click={logout}>Logout</a>
{:else}
    <a href="/login">Login</a>
{/if}

<svelte:head>
    <title>Ranker</title>
</svelte:head>

<slot />