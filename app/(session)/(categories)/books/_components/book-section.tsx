"use client";

import { Button, Card, CardActions, CardContent, IconButton, Paper, Typography } from "@mui/material";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import Image from "next/image";

import Link from "next/link";
import { Book } from "@/db/type-definitions";
import { useRouter } from "next/navigation";
import AddIcon from "@mui/icons-material/Add";

interface Params {
	books: Book[];
}

export default function BookSection({ books }: Params) {
	const router = useRouter();

	return (
		<div className="flex flex-col gap-8">
			<Paper
				elevation={10}
				id="books"
				className="w-full flex flex-col 2xl:flex-row bg-blue-50 border border-1 border-gray-400 ps-8 p-4 rounded-3xl"
			>
				<div className="lg:basis-1/2 pt-8">
					<div className="flex gap-4 items-center">
						<ImportContactsIcon className="size-10" />
						<h3 className="text-4xl font-semibold">Books</h3>
					</div>
					<p className="pt-6">
						This page serves as an overview of your personal{" "}
						<span className="font-semibold text-blue-700">insights</span> that you obtained from the books you have
						read. Individual insights are grouped in various{" "}
						<span className="font-semibold text-blue-700">categories</span>, which you can create, update or delete
						according to your preferences.
					</p>
				</div>
				<div className="lg:basis-1/2 flex justify-center">
					<div className="flex flex-col">
						<Image
							src="/reading.svg"
							className="2xl:w-[350px] 2xl:h-[350px] "
							width={600}
							height={600}
							alt="Picture of a reading boy"
						/>
						<p className="relative bottom-10 right-10 text-xs self-end">
							Designed by{" "}
							<Link
								href="https://www.freepik.com"
								target="_blank"
								className="inline text-blue-600 hover:underline"
							>
								Freepik
							</Link>
						</p>
					</div>
				</div>
			</Paper>
			<div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mb-4">
				<Paper
					className=" py-[55px] bg-gray-200 flex flex-col gap-4 justify-center items-center rounded-3xl hover:bg-gray-100 hover:cursor-pointer active:bg-gray-50"
					onClick={() => router.push("/books/bookForm")}
				>
					<AddIcon className="size-20" />
					<p className="font-semibold text-2xl">Create new book</p>
				</Paper>
				{books.map((book) => {
					return (
						<div key={book.id} className="relative w-full">
							{/*
		 						This element is used as a anchor for links referencing this particular book.
		 					 	It moves content of the page a bit down, so that the book card is not covered by the navigation bar.
		 					*/}
							<div id={book.id} className="invisible absolute top-[-5.5rem]"></div>

							{/* Book card */}
							<Link href={`/books/${book.id}`}>
								<Card className="w-full rounded-3xl border hover:shadow-lg hover:shadow-gray-600  hover:cursor-pointer">
									<CardContent>
										<Typography gutterBottom variant="h5" className="text-blue-700 font-medium">
											{book.title}
										</Typography>
										<Typography variant="body1" color="text.secondary">
											{JSON.stringify(book.authors.map((a) => `${a.firstName} ${a.lastName}`))
												.replace(/[\[\]\"]/g, "")
												.replace(",", ", ")}
										</Typography>

										<Typography variant="body2" color="text.secondary" className="pt-8 line-clamp-3 text-black">
											{book.description}
										</Typography>
									</CardContent>
									<CardActions>
										<Button size="small">Learn More</Button>
									</CardActions>
								</Card>
							</Link>
						</div>
					);
				})}
			</div>
		</div>
		// <div className="flex flex-col gap-4">
		// 	<div className="flex gap-4 items-center">
		// 		<ImportContactsIcon className="size-10" />
		// 		<h3 className="text-4xl font-semibold">Books</h3>
		// 	</div>
		// 	<p className="mb-8">
		// 		This page serves as an overview of your personal{" "}
		// 		<span className="font-semibold text-blue-700">insights</span> that you obtained from the books you have
		// 		read. Individual insights are grouped in various{" "}
		// 		<span className="font-semibold text-blue-700">categories</span>, which you can create, update or delete
		// 		according to your preferences.
		// 	</p>

		// 	{/* CARDS */}

		// </div>
	);
}
