import { writable, type Writable } from 'svelte/store';
import type { Item, SessionInfo } from '$lib/interfaces';


export const allItems: Writable<Item[]> = writable([]);
export const user: Writable<SessionInfo | null> = writable(null);