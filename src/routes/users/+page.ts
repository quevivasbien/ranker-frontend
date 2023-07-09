import type { LoadEvent } from "@sveltejs/kit"
import type { User } from "$lib/interfaces";
import { get } from "svelte/store";
import { user } from "$lib/stores";

export async function load(event: LoadEvent) {
    const userInfo = get(user);
    if (userInfo === null) {
        console.log("No user info when fetching user list");
        return {
            users: [],
        };
    }
    const response = await event.fetch(
        "https://ranker-backend.fly.dev/users",
        {
            headers: {
                "Authorization": userInfo.token,
            },
        }
    );
    const users: User[] = await response.json();
    return {
        users,
    };
}