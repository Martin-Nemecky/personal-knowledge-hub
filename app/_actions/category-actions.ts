"use server";

import { readAllCategories } from "@/db/queries";

export async function getAllCategories() {
	return await readAllCategories();
}
