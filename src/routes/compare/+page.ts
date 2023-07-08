import type { Item } from "$lib/interfaces";
import { allItems, user } from "$lib/stores";
import type { LoadEvent } from "@sveltejs/kit";
import { get } from "svelte/store";

export function load(event: LoadEvent) {
    const getItemsForComparison = async () => {
        const userInfo = get(user);
        if (!userInfo) {
            return [];
        }
        const username = userInfo.username;
        const response = await event.fetch(`http://localhost:8080/users/${username}/compare`);
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
        const response = await event.fetch(`http://localhost:8080/items/${itemName}`);
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
            return 500;
        }
        const username = userInfo.username;
        const response = await event.fetch(`http://localhost:8080/users/${username}/compare`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
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