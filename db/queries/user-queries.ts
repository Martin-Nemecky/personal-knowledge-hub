"server only";

import { eq } from "drizzle-orm";
import { db } from "../config";
import { usersTable } from "../schema";

export async function readUserByUsername(username: string) {
	return await db.select().from(usersTable).where(eq(usersTable.username, username));
}

export async function readUserById(id: string) {
	return await db.select().from(usersTable).where(eq(usersTable.id, id));
}
