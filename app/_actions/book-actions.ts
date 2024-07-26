"use server";

import { readAllBooks, storeAuthors, storeBook, storeCategories } from "@/db/queries";
import { Book } from "@/db/type-definitions";
import { getSessionData } from "./session-actions";
import { redirect } from "next/navigation";

export async function getAllBooks() {
	return await readAllBooks();
}

export async function createBook(book: Book) {
	const data = await getSessionData();
	if (data == null) {
		throw new Error("No user is signed in.");
	}

	await storeBook(book.id, book.title, book.description, book.content, data.userId);
	await storeCategories(book.id, book.categories, data.userId);
	await storeAuthors(book.id, book.authors, data.userId);
	redirect("/books");
}
