import { Book } from "@/app/_types/definitions";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Link from "next/link";

interface Props {
	books: Book[];
}

export default function ContentsSection({ books }: Props) {
	return (
		<aside>
			<header className="mb-4">
				<h2 className="text-lg font-medium ">Contents</h2>
			</header>

			<ul className="flex flex-col gap-2">
				{books.map((book) => {
					return (
						<li key={book.id} className="flex gap-2 items-start">
							<ArrowForwardIosIcon className="relative top-1 text-gray-400 size-4" />
							<Link href={"#" + book.id}>{book.title}</Link>
						</li>
					);
				})}
			</ul>
		</aside>
	);
}
