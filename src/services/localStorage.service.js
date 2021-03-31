import { writable } from "svelte/store";

export function set(key, value) {
	localStorage.setItem(key, value)
}

export function setWithExpiry(key, value, ttl) {
	const now = new Date()
	const item = {
		value: value,
		expiry: now.getTime() + ttl,
	}
	localStorage.setItem(key, JSON.stringify(item))
}

export function get(key) {
	return localStorage.getItem(key);
}

export function getWithExpiry(key) {
	const itemStr = localStorage.getItem(key)
	if (!itemStr) {
		return null
	}
	const item = JSON.parse(itemStr)
	const now = new Date()

	if (now.getTime() > item.expiry) {
		localStorage.removeItem(key)
		return null
	}
	return item.value
}

export function remove(key) {
	localStorage.removeItem(key)
}