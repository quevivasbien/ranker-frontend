import { writable, type Writable } from 'svelte/store';
import type { Item } from '$lib/interfaces';

export const allItems: Writable<Item[]> = writable([]);