import { goto } from "$app/navigation";
import type { LoadEvent } from "@sveltejs/kit";

export function load(event: LoadEvent) {
    const addUser = async (name: string) => {
        const response = await event.fetch("http://localhost:8080/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
            }),
            // Need to handle this differently when deploying
            mode: "no-cors"
        });
        goto("/users");
    }
    return {
        addUser,
    }
}