import type { Item } from "$lib/interfaces";
import { allItems, user } from "$lib/stores";
import type { LoadEvent } from "@sveltejs/kit";
import { get } from "svelte/store";

export function load(event: LoadEvent) {
    const getItemsForComparison = async () => {
        const userInfo = get(user);
        if (!userInfo) {
            console.log("No user info when fetching items for comparison");
            return null;
        }
        const response = await event.fetch(
            `https://ranker-backend.fly.dev/compare`,
            {
                headers: {
                    "Authorization": userInfo.token,
                },
            }
        );
        if (!response.ok) {
            console.log("Error fetching items for comparison, received response", response);
            return null;
        }
        const items: string[] = await response.json();
        return items;
    }

    const getItem = async (itemName: string) => {
        // try looking item up locally first
        const items = get(allItems);
        let item = items.find(item => item.name === itemName);
        if (item) {
            return item;
        }
        // if not found, fetch from server
        const userInfo = get(user);
        if (userInfo == null) {
            console.log("No user info when fetching item info for comparison");
            return null;
        }
        const response = await event.fetch(
            `https://ranker-backend.fly.dev/items/${itemName}`,  
            {
                headers: {
                    "Authorization": userInfo.token,
                },
            }
        );
        if (!response.ok) {
            console.log("Error fetching item, received response", response);
            return null;
        }
        item = await response.json() as Item;
        items.push(item);
        // update local copy before returning
        allItems.set(items);
        return item;
    }

    const sendUserChoice = async (item1: string, item2: string, winner: string) => {
        const userInfo = get(user);
        if (!userInfo) {
            console.log("No user info when sending user choice");
            return 500;
        }
        const response = await event.fetch(`https://ranker-backend.fly.dev/compare`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": userInfo.token,
            },
            body: JSON.stringify({
                item1,
                item2,
                winner,
            }),
        });
        return response.status;
    }

    return {
        getItemsForComparison,
        getItem,
        sendUserChoice,
    }
}