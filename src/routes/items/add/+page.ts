import { goto } from "$app/navigation";
import type { SessionInfo } from "$lib/interfaces";
import { user } from "$lib/stores";
import type { LoadEvent } from "@sveltejs/kit";
import { get } from "svelte/store";

export function load(event: LoadEvent) {
    const sessionInfo = get(user);
    if (sessionInfo === null) {
        goto("/login");
    }
    const addItem = async (name: string, description: string) => {
        const response = await event.fetch("http://localhost:8080/items", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": (sessionInfo as SessionInfo).token,
            },
            body: JSON.stringify({
                name,
                description,
            }),
        });
        if (response.ok) {
            goto("/items");
        }
    }
    return {
        addItem,
    }
}