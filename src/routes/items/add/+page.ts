import { goto } from "$app/navigation";
import type { LoadEvent } from "@sveltejs/kit";

export function load(event: LoadEvent) {
    const addItem = async (name: string, description: string) => {
        const response = await event.fetch("http://localhost:8080/items", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                description,
            }),
            // Need to handle this differently when deploying
            mode: "no-cors"
        });
        goto("/items");
    }
    return {
        addItem,
    }
}