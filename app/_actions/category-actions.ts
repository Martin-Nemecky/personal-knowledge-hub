"use server";

import { readAllCategories } from "@/db/queries/category-queries";

export async function getAllCategories() {
	return await readAllCategories();
}
