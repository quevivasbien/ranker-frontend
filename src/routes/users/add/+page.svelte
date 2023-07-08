<script lang="ts">
    export let data;

    const { addUser } = data;

    let name: string = "";
    let password: string = "";

    $: inputValid = name !== "" && password.length > 4;

    function submitForm() {
        if (!inputValid) return;
        addUser(name, password)
    }
</script>

<div class="flex flex-col space-y-4">
    <h1 class="text-2xl">Register</h1>
    <form on:submit|preventDefault={submitForm} class="flex flex-col max-w-md space-y-2">
        <label class="flex flex-row justify-between">
            <span>Name</span>
            <input type="text" class="border rounded-lg p-2" bind:value={name} />
        </label>
        <label class="flex flex-row justify-between">
            <span>Password</span>
            <input type="password" class="border rounded-lg p-2" bind:value={password} />
        </label>
        <div class="flex flex-row justify-end">
            <button type="submit" class="drop-shadow rounded bg-blue-200 disabled:bg-gray-300 p-2" disabled={!inputValid}>Submit</button>
        </div>
    </form>
</div>
