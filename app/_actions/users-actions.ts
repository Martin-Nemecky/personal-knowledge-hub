"use server";

import { readUserById, readUserByUsername } from "@/db/queries/user-queries";
import { User } from "../_types/definitions";

export async function getUserByUsername(username: string): Promise<User> {
	const users = await readUserByUsername(username);
	if (users.length === 0) {
		throw new Error("No such user exists.");
	}

	const user = users[0];
	return { id: user.id, username: user.username, password: null };
}

export async function getUserById(id: string): Promise<User> {
	const users = await readUserById(id);
	if (users.length === 0) {
		throw new Error("No such user exists.");
	}

	const user = users[0];
	return { id: user.id, username: user.username, password: null };
}
