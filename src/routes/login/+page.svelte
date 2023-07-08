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

<form on:submit|preventDefault={submitForm}>
    <label>
        Username
        <input type="text" bind:value={username} />
    </label>
    <label>
        Password
        <input type="password" bind:value={password} />
    <button type="submit">Submit</button>
</form>
{#if alertText}
    <p>{alertText}</p>
{/if}

<a href="/users/add">Register</a>
