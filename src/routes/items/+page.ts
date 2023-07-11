import type { LoadEvent } from "@sveltejs/kit"
import type { GlobalScore, Item, UserScore } from "$lib/interfaces";
import { allItems, user } from "$lib/stores";
import { get } from "svelte/store";

export async function load(event: LoadEvent) {
    const getGlobalScore = async (itemName: string) => {
        const response = await event.fetch(
            `https://ranker-backend.fly.dev/scores/${itemName}`,
        );
        if (response.ok) {
            const score: GlobalScore = await response.json();
            return score;
        }
        console.log("Error fetching global score", response);
        return null;
    }
    const getUserScore = async (itemName: string) => {
        const userInfo = get(user);
        if (!userInfo) {
            console.log("No user info when fetching user score");
            return null;
        }
        const response = await event.fetch(
            `https://ranker-backend.fly.dev/scores/${itemName}/${userInfo.username}`,
            {
                headers: {
                    "Authorization": userInfo.token,
                },
            },
        );
        if (response.ok) {
            const score: UserScore = await response.json();
            return score;
        }
        if (response.status !== 404) {
            console.log("Error fetching user score", response);
        }
        return null;
    }

    const response = await event.fetch("https://ranker-backend.fly.dev/items");
    const items: Item[] = await response.json();
    allItems.set(items);
    return {
        getGlobalScore,
        getUserScore,
    }
}