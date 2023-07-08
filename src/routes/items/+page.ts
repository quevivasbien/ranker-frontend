import type { LoadEvent } from "@sveltejs/kit"
import type { GlobalScore, Item } from "$lib/interfaces";
import { allItems } from "$lib/stores";

export async function load(event: LoadEvent) {
    const getGlobalScore = async (itemName: string) => {
        const response = await event.fetch(`http://localhost:8080/items/${itemName}/score`);
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