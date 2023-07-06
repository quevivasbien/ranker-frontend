import type { LoadEvent } from "@sveltejs/kit"
import type { Item } from "$lib/interfaces";
import { allItems } from "$lib/stores";

export async function load(event: LoadEvent) {
    const response = await event.fetch("http://localhost:8080/items");
    const items: Item[] = await response.json();
    allItems.set(items);
}