<script lang="ts">
    export let data;

    const { users } = data;
</script>

<div>
    Total users: {users.length}
</div>
<ol>
    {#each users as user}
        <li>{user.name}</li>
    {/each}
</ol>