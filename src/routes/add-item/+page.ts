import { goto } from "$app/navigation";
import type LoadEvent from "@sveltejs/kit";

export function load(event: LoadEvent) {
    const getItems = async () => {
        const response = await event.fetch("http://localhost:8080/items");
        const items = await response.json();
        return items;
    }
    const addItem = async (name: string, description: string) => {
        const id = Math.random().toString(36).slice(2);
        const response = await event.fetch("http://localhost:8080/items", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id,
                name,
                description,
            }),
            // Need to handle this differently when deploying
            mode: "no-cors"
        });
        // navigate to home page
        goto("/");
    }
    return {
        getItems,
        addItem,
    }
}