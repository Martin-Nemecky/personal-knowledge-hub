"use server";

import { readAllBooks } from "@/db/queries";

export async function getAllBooks() {
	return await readAllBooks();
}
