"use client";

import CategorySection from "./_components/category-section";
import BookSection from "./_components/book-section";
import ContentsSection from "./_components/contents-section";
import { useEffect, useState } from "react";
import { getAllBooks } from "@/app/_actions/book-actions";

import { getAllCategories } from "@/app/_actions/category-actions";
import { Book, Category } from "@/app/_types/definitions";

export default function Books() {
	const [books, setBooks] = useState<Book[]>([]);
	const [categories, setCategories] = useState<Category[]>([]);
	const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

	useEffect(() => {
		async function getData() {
			const data = await getAllBooks();
			setBooks(data);
		}

		getData();
	}, []);

	useEffect(() => {
		async function getData() {
			const data = await getAllCategories();
			setCategories(data);
			setSelectedCategories(data);
		}

		getData();
	}, []);

	const visibleBooks: Book[] = books
		.filter((b) => b.categories.find((c) => selectedCategories.find((sc) => sc.name === c.name) != null) != null)
		.map((b) => {
			return {
				...b,
				categories: b.categories.map((c) => {
					return { id: c.id, name: c.name };
				}),
			};
		});

	return (
		<section className="flex lg:flex-row flex-col size-full">
			<section className="lg:fixed left-8 top-28 bottom-0 lg:w-60 lg:z-10 pe-4 pt-4 lg:pt-0 lg:overflow-y-auto">
				<CategorySection
					allCategories={categories}
					selectedCategories={selectedCategories}
					setSelectedCategories={setSelectedCategories}
				/>
			</section>
			<section className="lg:ps-96 pe-4 lg:pe-8 xl:pe-96 pt-12 ">
				<BookSection books={visibleBooks} />
			</section>
			<section className="hidden xl:block fixed right-8 top-28 bottom-0 w-60 z-10 overflow-y-auto">
				<ContentsSection books={visibleBooks} />
			</section>
		</section>
	);
}
