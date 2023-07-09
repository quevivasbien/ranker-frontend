import { user } from "$lib/stores";
import type { LoadEvent } from "@sveltejs/kit";

export function load(event: LoadEvent) {
    const login = async (username: string, password: string) => {
        const response = await event.fetch("http://localhost:8080/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });
        if (response.ok) {
            const token = await response.json();
            user.set({ username, token });
        }
        return response.status;
    }
    return {
        login,
    }
}