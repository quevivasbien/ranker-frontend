<script lang="ts">
    export let data;

    const { addItem } = data;

    let name: string;
    let description: string;

    function submitForm() {
        addItem(name, description)
    }
</script>

<form on:submit|preventDefault={submitForm}>
    <label for="name">
        Name
        <input type="text" bind:value={name} />
    </label>
    <label for="description">
        Description
        <input type="text" bind:value={description} />
    </label>
    <button type="submit">Submit</button>
</form>

