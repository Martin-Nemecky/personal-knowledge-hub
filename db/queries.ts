import { db } from "./config";
import {
	authorAssignmentsTable,
	authorsTable,
	booksTable,
	categoriesTable,
	categoryAssignmentsTable,
	usersTable,
} from "./schema";

import { eq } from "drizzle-orm";
import { Author, Book, Category } from "./type-definitions";
import { v4 as uuid4 } from "uuid";

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

export async function storeBook(id: string, title: string, description: string, content: string, ownerId: string) {
	await db.insert(booksTable).values({ id, title, description, content, ownerId });
}

export async function readAllCategories() {
	return await db.select().from(categoriesTable);
}

export async function readCategoryByName(name: string) {
	return await db.select().from(categoriesTable).where(eq(categoriesTable.name, name));
}

export async function readUserByUsername(username: string) {
	return await db.select().from(usersTable).where(eq(usersTable.username, username));
}

export async function readUserById(id: string) {
	return await db.select().from(usersTable).where(eq(usersTable.id, id));
}

export async function storeCategories(bookId: string, categories: Category[], ownerId: string) {
	for (let category of categories) {
		const foundCategories = await readCategoryByName(category.name);
		if (foundCategories.length === 0) {
			await db.insert(categoriesTable).values({ id: category.id, name: category.name });
			await db
				.insert(categoryAssignmentsTable)
				.values({ id: uuid4(), categoryId: category.id, bookId: bookId, ownerId: ownerId });
		} else {
			const foundCategory = foundCategories[0];
			await db
				.insert(categoryAssignmentsTable)
				.values({ id: uuid4(), categoryId: foundCategory.id, bookId: bookId, ownerId: ownerId });
		}
	}
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
			.values({ id: uuid4(), authorId: author.id, bookId: bookId, ownerId: ownerId });
	}
}
