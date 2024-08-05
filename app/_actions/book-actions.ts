"use server";

import { getSessionData } from "./session-actions";
import { redirect } from "next/navigation";
import { Book } from "../_types/definitions";
import { deleteBook, readAllBooks, storeBook } from "@/db/queries/book-queries";
import { storeAuthors } from "@/db/queries/author-queries";
import { storeCategories } from "@/db/queries/category-queries";

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

export async function removeBook(id: string) {
	const data = await getSessionData();
	if (data == null) {
		throw new Error("No user is signed in.");
	}

	await deleteBook(id);
}
