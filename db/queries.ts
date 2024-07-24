import { db } from "./config";
import {
	authorAssignmentsTable,
	authorsTable,
	booksTable,
	categoriesTable,
	categoryAssignmentsTable,
	usersTable,
} from "./schema";
import { Book } from "./type-definitions";
import { eq } from "drizzle-orm";

async function readBookAuthors(bookId: string) {
	return await db
		.select({ id: authorsTable.id, firstName: authorsTable.firstName, lastName: authorsTable.lastName })
		.from(authorAssignmentsTable)
		.innerJoin(authorsTable, eq(authorAssignmentsTable.authorId, authorsTable.id))
		.where(eq(authorAssignmentsTable.bookId, bookId));
}

async function readBookCategories(bookId: string) {
	return await db
		.select({ id: categoriesTable.id, name: categoriesTable.name })
		.from(categoryAssignmentsTable)
		.innerJoin(categoriesTable, eq(categoryAssignmentsTable.categoryId, categoriesTable.id))
		.where(eq(categoryAssignmentsTable.bookId, bookId));
}

async function readSimplifiedBooks() {
	const simplifiedBooks = await db.select().from(booksTable);
	simplifiedBooks.sort((a, b) => {
		if (a.title > b.title) return 1;
		else if (a.title === b.title) return 0;
		else return -1;
	});
	return simplifiedBooks;
}

export async function readAllBooks() {
	const result: Book[] = [];
	const books = await readSimplifiedBooks();

	for (const book of books) {
		const authors = await readBookAuthors(book.id);
		const categories = await readBookCategories(book.id);
		result.push({ ...book, authors: authors, categories: categories });
	}

	return result;
}

export async function readAllCategories() {
	return await db.select().from(categoriesTable);
}

export async function readUserByUsername(username: string) {
	return await db.select().from(usersTable).where(eq(usersTable.username, username));
}

export async function readUserById(id: string) {
	return await db.select().from(usersTable).where(eq(usersTable.id, id));
}
