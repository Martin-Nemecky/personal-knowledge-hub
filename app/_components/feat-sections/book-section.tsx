import Link from "next/link";
import Image from "next/image";

export default function BooksSection() {
	return (
		<div id="books" className="w-full flex flex-col xl:flex-row shadow-inner bg-gray-100 px-20">
			<div className="lg:basis-1/2 xl:ps-32 xl:py-20 pt-8">
				<h1 className="font-bold text-3xl">Books</h1>
				<p className="pt-6">
					Create beautiful summaries of all the books you have ever read and never forget the wisdom you obtained
					from them.
				</p>
				<div className="mt-5">
					<Link className="text-blue-700" href={"/books"}>
						Get Started
					</Link>
				</div>

				<Image
					src="/page-books.svg"
					className="relative top-8 xl:-rotate-12 shadow-2xl overflow-visible z-10 mt-10"
					width={1440}
					height={1024}
					alt="Picture of a reading boy"
					unoptimized={true}
				/>
			</div>
			<div className="lg:basis-1/2 flex justify-center overflow-visible me-5">
				<div className="">
					<Image
						src="/page-books2.svg"
						className="relative top-40 xl:rotate-12"
						width={1440}
						height={1024}
						alt="Picture of a reading boy"
						unoptimized={true}
					/>
				</div>
			</div>
		</div>
	);
}
