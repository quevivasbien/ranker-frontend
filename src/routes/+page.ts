import type { LoadEvent } from "@sveltejs/kit"

export async function load(event: LoadEvent) {
    const response = await event.fetch("http://localhost:8080/items");
    const items = await response.json();
    return {
        items
    };
}