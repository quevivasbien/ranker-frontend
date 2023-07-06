<script lang="ts">
    export let data;

    const { addUser } = data;

    let name: string;

    function submitForm() {
        addUser(name)
    }
</script>

<form on:submit|preventDefault={submitForm}>
    <label for="name">
        Name
        <input type="text" bind:value={name} />
    </label>
    <button type="submit">Submit</button>
</form>

