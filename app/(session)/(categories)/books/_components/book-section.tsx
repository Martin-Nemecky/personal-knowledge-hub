"use client";

import { Button, Card, CardActions, CardContent, IconButton, Paper, Typography } from "@mui/material";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AddIcon from "@mui/icons-material/Add";
import { Book } from "@/app/_types/definitions";
import RemoveDialog from "./remove-dialog";

interface Props {
	books: Book[];
}

export default function BookSection({ books }: Props) {
	const router = useRouter();

	return (
		<section className="flex flex-col gap-8">
			<Paper
				elevation={10}
				id="books"
				className="w-full flex flex-col 2xl:flex-row bg-blue-50 border border-1 border-gray-400 p-4 rounded-3xl"
			>
				<section className="lg:basis-1/2 py-8 lg:ps-12 ps-4">
					<hgroup className="flex gap-4 items-center">
						<ImportContactsIcon className="size-10" />
						<h3 className="text-4xl font-semibold">Books</h3>
					</hgroup>
					<p className="pt-6">Welcome to your personal book section 👋.</p>
					<p className="pt-3">
						You can use this space to manage all the books you have ever read. Each book consists of title,
						authors, categories, description and content. The content represents your notes and insights. We highly
						recommend to follow the given structure of the content in the form when creating new book.
					</p>
					<p className="pt-3">
						You can use <span className="font-semibold text-blue-700">Markdown</span> to style the content. We
						altered some of the tags to make the output better match our expectations (see the help section in the
						form). Just keep in mind that{" "}
						<span className="font-semibold text-blue-700">beauty lies in simplicity</span>.{" "}
					</p>
				</section>
				<section className="lg:basis-1/2 flex justify-center items-center">
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
				</section>
			</Paper>
			<section className="grid lg:grid-cols-2 grid-cols-1 gap-4 mb-4">
				<Paper
					className=" py-[55px] bg-gray-200 flex flex-col gap-4 justify-center items-center rounded-3xl hover:bg-gray-100 hover:cursor-pointer active:bg-gray-50"
					onClick={() => router.push("/books/bookForm")}
				>
					<AddIcon className="size-20" />
					<p className="font-semibold text-2xl">Create new book</p>
				</Paper>
				{books.map((book) => {
					return (
						<article key={book.id} className="relative w-full">
							{/*
		 						This element is used as a anchor for links referencing this particular book.
		 					 	It moves content of the page a bit down, so that the book card is not covered by the navigation bar.
		 					*/}
							<div id={book.id} className="invisible absolute top-[-5.5rem]"></div>

							{/* Book card */}
							<Card className="w-full h-full rounded-3xl border hover:shadow-lg hover:shadow-gray-600 p-5">
								<CardContent>
									<div className="flex justify-between items-center">
										<Typography gutterBottom variant="h5" className="m-0 text-blue-700 font-medium">
											{book.title}
										</Typography>
										<RemoveDialog book={book} />
									</div>
									<Typography variant="body1" color="text.secondary">
										{JSON.stringify(book.authors.map((a) => `${a.firstName} ${a.lastName}`))
											.replace(/[\[\]\"]/g, "")
											.replace(",", ", ")}
									</Typography>

									<Typography variant="body2" color="text.secondary" className="pt-8 line-clamp-4 text-black">
										{book.description}
									</Typography>
								</CardContent>
								<CardActions>
									<Button size="small" onClick={() => router.push(`/books/${book.id}`)}>
										Learn More
									</Button>
								</CardActions>
							</Card>
						</article>
					);
				})}
			</section>
		</section>
	);
}
