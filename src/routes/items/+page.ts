import type { LoadEvent } from "@sveltejs/kit"
import type { GlobalScore, Item } from "$lib/interfaces";
import { allItems, user } from "$lib/stores";
import { get } from "svelte/store";

export async function load(event: LoadEvent) {
    const getGlobalScore = async (itemName: string) => {
        const userInfo = get(user);
        if (userInfo === null) {
            console.log("No user info when fetching global score");
            return null;
        }
        const response = await event.fetch(
            `http://localhost:8080/scores/${itemName}`,
            {
                headers: {
                    "Authorization": userInfo.token,
                },
            },
        );
        if (response.ok) {
            const score: GlobalScore = await response.json();
            return score;
        }
        console.log("Error fetching global score", response);
        return null;
    }
    const response = await event.fetch("http://localhost:8080/items");
    const items: Item[] = await response.json();
    allItems.set(items);
    return {
        getGlobalScore,
    }
}