"server only";

import { eq } from "drizzle-orm";
import { db } from "../config";
import { categoriesTable, categoryAssignmentsTable } from "../schema";
import { v4 } from "uuid";
import { Category } from "@/app/_types/definitions";

export async function readBookCategories(bookId: string) {
	return await db
		.select({ id: categoriesTable.id, name: categoriesTable.name })
		.from(categoryAssignmentsTable)
		.innerJoin(categoriesTable, eq(categoryAssignmentsTable.categoryId, categoriesTable.id))
		.where(eq(categoryAssignmentsTable.bookId, bookId));
}

export async function readAllCategories() {
	return await db.select().from(categoriesTable);
}

export async function readCategoryByName(name: string) {
	return await db.select().from(categoriesTable).where(eq(categoriesTable.name, name));
}

export async function storeCategories(bookId: string, categories: Category[], ownerId: string) {
	for (let category of categories) {
		const foundCategories = await readCategoryByName(category.name);
		if (foundCategories.length === 0) {
			await db.insert(categoriesTable).values({ id: category.id, name: category.name });
			await db
				.insert(categoryAssignmentsTable)
				.values({ id: v4(), categoryId: category.id, bookId: bookId, ownerId: ownerId });
		} else {
			const foundCategory = foundCategories[0];
			await db
				.insert(categoryAssignmentsTable)
				.values({ id: v4(), categoryId: foundCategory.id, bookId: bookId, ownerId: ownerId });
		}
	}
}
