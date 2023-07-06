import type { LoadEvent } from "@sveltejs/kit"
import type { GlobalScore, Item } from "$lib/interfaces";
import { allItems } from "$lib/stores";

export async function load(event: LoadEvent) {
    const getGlobalScore = async (itemName: string) => {
        const response = await event.fetch(`http://localhost:8080/items/${itemName}/score`);
        const score = await response.json();
        return {
            itemName: itemName,
            rating: score.rating,
            numVotes: score.num_votes,
        } as GlobalScore;
    }
    const response = await event.fetch("http://localhost:8080/items");
    const items: Item[] = await response.json();
    allItems.set(items);
    return {
        getGlobalScore,
    }
}