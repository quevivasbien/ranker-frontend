import { redirect, type LoadEvent } from "@sveltejs/kit";

export function load(event: LoadEvent) {
    throw redirect(303, "/login");
}