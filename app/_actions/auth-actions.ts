"use server";

import * as bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { createSession, deleteSession } from "../(session)/_lib/session";
import { readUserByUsername } from "@/db/queries";

export async function signIn(username: string, password: string, searchFromParam: string | null) {
	if (username == null || password == null) {
		throw new Error("Invalid username or password...");
	}

	const users = await readUserByUsername(username);
	if (users.length === 0) {
		throw new Error("Credentials are not right.");
	}

	const user = users[0];
	const isPasswordCorrect = await bcrypt.compare(password, user.password);

	if (!isPasswordCorrect) {
		throw new Error("Credentials are not right.");
	}

	await createSession(user.id);

	if (searchFromParam == null) {
		redirect("/");
	} else {
		redirect(searchFromParam);
	}
}

export async function signOut() {
	deleteSession();
	redirect("/");
}
