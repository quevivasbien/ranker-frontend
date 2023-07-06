import type { LoadEvent } from "@sveltejs/kit"
import type { User } from "$lib/interfaces";

export async function load(event: LoadEvent) {
    const response = await event.fetch("http://localhost:8080/users");
    const users: User[] = await response.json();
    return {
        users,
    };
}