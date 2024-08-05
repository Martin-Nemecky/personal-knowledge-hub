"server only";

import { Book } from "@/app/_types/definitions";

import { eq } from "drizzle-orm";
import { booksTable } from "../schema";
import { db } from "../config";
import { readBookCategories } from "./category-queries";
import { readBookAuthors } from "./author-queries";

export async function readSimplifiedBooks() {
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

export async function deleteBook(id: string) {
	await db.delete(booksTable).where(eq(booksTable.id, id));
}
