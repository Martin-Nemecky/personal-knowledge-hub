"server only";

import { Author } from "@/app/_types/definitions";
import { eq } from "drizzle-orm";
import { db } from "../config";
import { authorsTable, authorAssignmentsTable } from "../schema";
import { v4 } from "uuid";

export async function readBookAuthors(bookId: string) {
	return await db
		.select({ id: authorsTable.id, firstName: authorsTable.firstName, lastName: authorsTable.lastName })
		.from(authorAssignmentsTable)
		.innerJoin(authorsTable, eq(authorAssignmentsTable.authorId, authorsTable.id))
		.where(eq(authorAssignmentsTable.bookId, bookId));
}

export async function storeAuthors(bookId: string, authors: Author[], ownerId: string) {
	for (let author of authors) {
		await db
			.insert(authorsTable)
			.values({ id: author.id, firstName: author.firstName, lastName: author.lastName });
	}

	for (let author of authors) {
		await db
			.insert(authorAssignmentsTable)
			.values({ id: v4(), authorId: author.id, bookId: bookId, ownerId: ownerId });
	}
}
