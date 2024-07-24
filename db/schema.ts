import { pgTable, text } from "drizzle-orm/pg-core";

export const booksTable = pgTable("books_table", {
	id: text("id").primaryKey(),
	title: text("title").notNull(),
	description: text("description").notNull(),
	content: text("content").notNull(),
	ownerId: text("owner_id")
		.notNull()
		.references(() => usersTable.id, { onDelete: "cascade" }),
});

export const categoriesTable = pgTable("categories_table", {
	id: text("id").primaryKey(),
	name: text("name").notNull().unique(),
});

export const categoryAssignmentsTable = pgTable("category_assignments_table", {
	id: text("id").primaryKey(),
	categoryId: text("category_id")
		.notNull()
		.references(() => categoriesTable.id, { onDelete: "cascade" }),
	bookId: text("book_id")
		.notNull()
		.references(() => booksTable.id, { onDelete: "cascade" }),
});

export const authorsTable = pgTable("authors_table", {
	id: text("id").primaryKey(),
	firstName: text("first_name").notNull(),
	lastName: text("last_name").notNull(),
});

export const authorAssignmentsTable = pgTable("author_assignments_table", {
	id: text("id").primaryKey(),
	authorId: text("author_id")
		.notNull()
		.references(() => authorsTable.id, { onDelete: "cascade" }),
	bookId: text("book_id")
		.notNull()
		.references(() => booksTable.id, { onDelete: "cascade" }),
});

export const usersTable = pgTable("users_table", {
	id: text("id").primaryKey(),
	username: text("username").notNull().unique(),
	password: text("password").notNull(),
});
