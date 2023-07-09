<script lang="ts">
    import { goto } from '$app/navigation';

    export let data;

    const { login } = data;


    let username: string;
    let password: string;
    let alertText: string;

    async function submitForm() {
        const status = await login(username, password);
        if (status === 200) {
            goto('/items');
            return;
        }
        password = '';
        if (status === 401) {
            alertText = 'Incorrect username or password';
        }
        else {
            alertText = 'An error occurred';
        }
    }
</script>

<div class="flex flex-col space-y-4">
    <h1 class="text-2xl">Login</h1>
    <form on:submit|preventDefault={submitForm} class="flex flex-col max-w-md space-y-2">
        <label class="flex flex-row justify-between">
            <span>Username</span>
            <input type="text" class="border rounded-lg p-2" bind:value={username} />
        </label>
        <label class="flex flex-row justify-between">
            <span>Password</span>
            <input type="password" class="border rounded-lg p-2" bind:value={password} />
        </label>
        <div class="flex flex-row justify-end">
            {#if alertText}
                <div class="text-red-500">{alertText}</div>
            {/if}
        </div>
        <div class="flex flex-row justify-end">
            <button type="submit" class="drop-shadow rounded bg-blue-200 disabled:bg-gray-300 p-2">Submit</button>
        </div>
    </form>


    <div>
        <span>Don't have an account?</span>
        <a href="/users/add" class="text-blue-500 hover:text-blue-300">Register</a>
    </div>
    
</div>