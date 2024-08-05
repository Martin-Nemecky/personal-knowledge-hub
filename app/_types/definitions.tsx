export type User = {
	id: string;
	username: string;
	password: string | null;
};

export type Book = {
	id: string;
	title: string;
	authors: Author[];
	description: string;
	categories: Category[];
	content: string;
};

export type Category = {
	id: string;
	name: string;
};

export type Author = {
	id: string;
	firstName: string;
	lastName: string;
};
