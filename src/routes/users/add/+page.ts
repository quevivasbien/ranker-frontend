import { goto } from "$app/navigation";
import type { LoadEvent } from "@sveltejs/kit";

export function load(event: LoadEvent) {
    const addUser = async (name: string, password: string) => {
        const response = await event.fetch("http://localhost:8080/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                password,
            }),
        });
        if (response.ok) {
            goto("/login");
        }
    }
    return {
        addUser,
    }
}