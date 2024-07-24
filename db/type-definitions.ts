export type Book = {
	id: string;
	title: string;
	authors: Author[];
	description: string;
	categories: Category[];
	content: string;
};

export type InsertBook = {
	title: string;
	author: string;
	description: string;
	categories: string[];
	content: string;
};

export type UpdateBook = {
	id: string;
	title?: string;
	author?: string;
	description?: string;
	categories?: string[];
	content?: string;
};

export type Category = {
	id: string;
	name: string;
};

export type InsertCategory = {
	name: string;
};

export type UpdateCategory = {
	id: string;
	name?: string;
};

export type Author = {
	id: string;
	firstName: string;
	lastName: string;
};
