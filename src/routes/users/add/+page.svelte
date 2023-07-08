<script lang="ts">
    export let data;

    const { addUser } = data;

    let name: string;
    let password: string;

    function submitForm() {
        addUser(name, password)
    }
</script>

<form on:submit|preventDefault={submitForm}>
    <label>
        Name
        <input type="text" bind:value={name} />
    </label>
    <label>
        Password
        <input type="password" bind:value={password} />
    <button type="submit">Submit</button>
</form>

