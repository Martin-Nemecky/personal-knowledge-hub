"use client";

import { getAllBooks } from "@/app/_actions/book-actions";
import Markdown from "markdown-to-jsx";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import MyUnorderedList from "./_components/my-unordered-list";
import MyOrderedList from "./_components/my-ordered-list";
import { Book } from "@/app/_types/definitions";

export default function BookDetails() {
	const params = useParams<{ id: string }>();
	const [book, setBook] = useState<Book>({
		id: "",
		title: "",
		authors: [],
		description: "",
		categories: [],
		content: "",
	});

	useEffect(() => {
		async function getData() {
			const data = await getAllBooks();
			const result = data.find((b) => b.id === params.id)!;
			setBook(result);
		}

		getData();
	}, []);

	return (
		<article className="py-10 2xl:px-96 xl:px-60 lg:px-20 px-4">
			<Markdown
				options={{
					overrides: {
						h1: {
							props: {
								className: "text-3xl text-blue-700 font-semibold",
							},
						},
						h2: {
							props: {
								className: "text-xl text-gray-500",
							},
						},
						h3: {
							props: {
								className: "mt-5 mb-2 text-lg text-blue-700 font-semibold",
							},
						},
						ol: {
							component: MyOrderedList,
						},
						ul: {
							component: MyUnorderedList,
						},
					},
				}}
			>
				{book.content}
			</Markdown>
		</article>
	);
}
