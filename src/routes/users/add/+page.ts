import { goto } from "$app/navigation";
import { base } from "$app/paths";
import type { LoadEvent } from "@sveltejs/kit";

export function load(event: LoadEvent) {
    const addUser = async (name: string, password: string) => {
        const response = await event.fetch("https://ranker-backend.fly.dev/users", {
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
            goto(`${base}/login`);
        }
    }
    return {
        addUser,
    }
}