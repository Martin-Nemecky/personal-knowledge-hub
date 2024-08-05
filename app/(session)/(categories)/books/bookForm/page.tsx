"use client";

import { IconButton } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { v4 as uuid4 } from "uuid";
import ContentEditor from "./content-editor";

import React from "react";
import { createBook } from "@/app/_actions/book-actions";
import { Author, Category } from "@/app/_types/definitions";
import { useRouter } from "next/navigation";

const initContent =
	"# Your title\n\n## Your author's name\n\n### Description\nSome description...\n\n### Contents\n\n1. Chapter one\n- line 1\n    - line 1/1\n- line 2\n\n2. Chapter two\n- line 1\n";

export default function BookForm() {
	const router = useRouter();
	const [categories, setCategories] = useState<Category[]>([{ id: uuid4(), name: "" }]);
	const [authors, setAuthors] = useState<Author[]>([{ id: uuid4(), firstName: "", lastName: "" }]);
	const [contentValue, setContentValue] = useState(initContent);
	const [isPending, setIsPending] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setIsPending(true);

		const title = (event.currentTarget as any).title.value;
		const formAuthors: Author[] = [];
		const formCategories: Category[] = [];
		const description = (event.currentTarget as any).description.value;

		authors.forEach((author) => {
			const firstnameFieldName = "firstname" + author.id;
			const lastnameFieldName = "lastname" + author.id;
			const firstname = (event.currentTarget as any)[firstnameFieldName].value;
			const lastname = (event.currentTarget as any)[lastnameFieldName].value;
			formAuthors.push({ id: author.id, firstName: firstname, lastName: lastname });
		});

		categories.forEach((category) => {
			const categoryFieldName = "category" + category.id;
			const name = (event.currentTarget as any)[categoryFieldName].value;
			formCategories.push({ id: category.id, name: name });
		});

		try {
			await createBook({
				id: uuid4(),
				title: title,
				authors: formAuthors,
				categories: formCategories,
				description: description,
				content: contentValue,
			});
		} catch (error: any) {
			setIsPending(false);
			setErrorMessage(error.message);
		}
	}

	return (
		<form className="flex flex-col gap-4 py-8 md:px-32" onSubmit={handleSubmit}>
			<h1 className="md:text-4xl text-2xl md:pt-10 font-black ">Create or Update Book</h1>
			<TitleField />
			<AuthorsField authors={authors} setAuthors={setAuthors} />
			<CategoriesField categories={categories} setCategories={setCategories} />
			<DescriptionField />
			<ContentField contentValue={contentValue} setContentValue={setContentValue} />

			{errorMessage !== "" ? <p className="text-red-600 text-base text-center">{errorMessage}</p> : ""}
			<section className="flex justify-end gap-4">
				<button
					type="button"
					className="font-bold text-red-600 rounded-lg hover:bg-gray-200 active:bg-gray-100 uppercase to-95% px-10 py-3"
					onClick={() => router.back()}
				>
					Cancel
				</button>
				<button
					className={`font-bold bg-green-600 text-white rounded-lg hover:bg-green-500 active:bg-green-400 uppercase to-95% px-10 py-3`}
					type="submit"
				>
					{isPending ? "Saving..." : "Save"}
				</button>
			</section>
		</form>
	);
}

function TitleField() {
	return (
		<>
			<label className="w-[70px] text-sm relative top-5 left-1 text-gray-600 rounded-lg bg-white z-10 text-center">
				Title*
			</label>
			<input title="Title" type="text" name="title" className={`border rounded-lg p-2`} required={true} />
		</>
	);
}

interface AuthorParams {
	authors: Author[];
	setAuthors: Dispatch<SetStateAction<Author[]>>;
}

function AuthorsField({ authors, setAuthors }: AuthorParams) {
	return (
		<div className="p-4 flex flex-col gap-4 border rounded-lg">
			<p className="font-medium text-lg">Authors</p>
			<div className="flex flex-col gap-4">
				{authors.map((author) => {
					return (
						<div key={author.id} className="flex flex-row items-center gap-4">
							<div className="relative grow">
								<label className="w-[90px] text-sm absolute -top-2 left-1  text-gray-600 rounded-lg bg-white z-10 text-center">
									First name*
								</label>
								<input
									type="text"
									title="First name"
									name={"firstname" + author.id}
									defaultValue={author.firstName}
									className={`w-full border grow rounded-lg p-2`}
									required={true}
								/>
							</div>
							<div className="relative grow">
								<label className="w-[90px] absolute -top-2 left-1 text-sm text-gray-600 rounded-lg bg-white z-10 text-center">
									Last name*
								</label>
								<input
									type="text"
									title="Last name"
									name={"lastname" + author.id}
									defaultValue={author.lastName}
									className={`w-full border grow rounded-lg p-2`}
									required={true}
								/>
							</div>
							{authors.length > 1 && (
								<IconButton
									aria-label="delete"
									onClick={() => {
										const result = authors
											.filter((a) => author.id !== a.id)
											.map((a) => {
												return { id: a.id, firstName: a.firstName, lastName: a.lastName };
											});

										setAuthors(result);
									}}
								>
									<ClearIcon className="size-7 text-red-700" />
								</IconButton>
							)}
						</div>
					);
				})}
			</div>
			<button
				type="button"
				className={`w-[200px] bg-gray-200 hover:bg-gray-100 active:bg-gray-50 rounded-lg p-3`}
				onClick={() => setAuthors((prev) => [...prev, { id: uuid4(), firstName: "", lastName: "" }])}
			>
				Add another author
			</button>
		</div>
	);
}

interface CategoryParams {
	categories: Category[];
	setCategories: Dispatch<SetStateAction<Category[]>>;
}

function CategoriesField({ categories, setCategories }: CategoryParams) {
	return (
		<div className="p-4 flex flex-col gap-2 border rounded-lg">
			<p className="font-medium text-lg">Categories</p>
			{categories.map((category) => {
				return (
					<div key={category.id} className="flex flex-col">
						<label className="w-[90px] text-sm relative top-2 left-1 text-gray-600 rounded-lg bg-white z-10 text-center">
							Category*
						</label>
						<div className="flex flex-row items-center">
							<input
								type="text"
								title="Category"
								name={"category" + category.id}
								defaultValue={category.name}
								className={`border grow rounded-lg p-2`}
								required={true}
							/>
							{categories.length > 1 && (
								<IconButton
									aria-label="delete"
									onClick={() => {
										const result = categories
											.filter((c) => category.id !== c.id)
											.map((c) => {
												return { id: c.id, name: c.name };
											});

										setCategories(result);
									}}
								>
									<ClearIcon className="size-7 text-red-700" />
								</IconButton>
							)}
						</div>
					</div>
				);
			})}

			<button
				type="button"
				className={`w-[200px] bg-gray-200 hover:bg-gray-100 active:bg-gray-50 rounded-lg p-3`}
				onClick={() => setCategories((prev) => [...prev, { id: uuid4(), name: "" }])}
			>
				Add another category
			</button>
		</div>
	);
}

function DescriptionField() {
	return (
		<>
			<label className="w-[90px] text-sm relative top-6 left-1 text-gray-600 rounded-lg bg-white z-10 text-center">
				Description
			</label>
			<textarea
				title="Description"
				name="description"
				className={`h-[100px] border rounded-lg p-2`}
				required={true}
			/>
		</>
	);
}

interface ContentParams {
	contentValue: string;
	setContentValue: Dispatch<SetStateAction<string>>;
}

const tips = [
	{
		id: uuid4(),
		tip: (
			<>
				Use <strong>#</strong> to style the title of your book.
			</>
		),
		example: "# Romeo and Juliet",
	},
	{
		id: uuid4(),
		tip: (
			<>
				Use <strong>##</strong> to style the author of your book.
			</>
		),
		example: "## William Shakespeare",
	},
	{
		id: uuid4(),
		tip: (
			<>
				Use <strong>###</strong> to style any other heading you have.
			</>
		),
		example: "### Contents",
	},
	{
		id: uuid4(),
		tip: (
			<>
				Use double enter or <strong>{"<br/>"}</strong> to create a new line.
			</>
		),
		example: "<br/>",
	},
	{
		id: uuid4(),
		tip: (
			<>
				Use <strong>{"<number>. <tile_name>"}</strong> to create a tile with a title.
			</>
		),
		example: "1. Chapter One",
	},
	{
		id: uuid4(),
		tip: (
			<>
				Use <strong>-</strong> (dash) to create a bullet list. You can also nest them if you use 4 spaces to
				separate the individual levels.
			</>
		),
		example: "- Item",
	},
];

function ContentField({ contentValue, setContentValue }: ContentParams) {
	const [tooltipOpen, setTooltipOpen] = useState(false);
	const helpColor = tooltipOpen ? "bg-gray-200" : "";

	return (
		<div className="p-4 flex flex-col gap-4 border rounded-lg">
			<div className="flex gap-2 items-center">
				<p className="font-medium text-lg">Content</p>
				<IconButton title="Help" className={helpColor} onClick={() => setTooltipOpen((prev) => !prev)}>
					<HelpOutlineIcon />
				</IconButton>
			</div>
			{tooltipOpen && (
				<div className="relative right-1 bg-gray-200  overflow-y-auto z-10 rounded-lg p-2 border-2">
					<h1 className="font-semibold text-lg">Hints</h1>
					<p>
						To design your output, you should use Markdown. There are plenty of tags to remember, but we selected
						just a few to make it easy on you.
					</p>
					<p>Here are some of our recommendations:</p>
					<div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 mt-2 gap-4">
						{tips.map((tip, i) => {
							return (
								<div key={tip.id} className="rounded-lg bg-white shadow-lg p-4">
									<div className="grid grid-cols-3">
										<p>Tip {i + 1}:</p>
										<p className="col-span-2">{tip.tip}</p>
										<p>Example:</p>
										<p className="col-span-2 w-full h-full rounded-lg bg-blue-100 p-2">{tip.example}</p>
									</div>
								</div>
							);
						})}
					</div>
					<p className="mt-2">You can also use other tags, but keep in mind that beauty is in simplicity.</p>
				</div>
			)}
			<div className="">
				<ContentEditor contentValue={contentValue} setContentValue={setContentValue} />
			</div>
		</div>
	);
}
