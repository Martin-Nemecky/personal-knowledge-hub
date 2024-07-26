import Link from "next/link";
import Image from "next/image";

export default function BooksSection() {
	return (
		<div id="books" className="w-full flex flex-col lg:flex-row shadow-inner bg-gray-100 px-20">
			<div className="lg:basis-1/2 lg:ps-32 lg:py-20 xl:py-28 pt-8">
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
					className="hidden lg:block relative top-8 lg:-rotate-12 shadow-2xl overflow-visible z-10 mt-10"
					width={1440}
					height={1024}
					alt="Picture of a desktop view capturing the books section"
					unoptimized={true}
				/>
			</div>
			<div className="lg:basis-1/2 relative top-10 flex justify-center overflow-visible me-5 pb-20">
				<div className="">
					<Image
						src="/page-books2.svg"
						className="hidden lg:block relative top-40 lg:rotate-12"
						width={1440}
						height={1024}
						alt="Picture of a desktop view capturing the details of one book"
						unoptimized={true}
					/>
				</div>
				<div className="">
					<Image
						src="/phone-books.svg"
						className="block lg:hidden relative -rotate-12"
						width={320}
						height={568}
						alt="Picture of a mobile view capturing the books section"
						unoptimized={true}
					/>
				</div>
				<div className="">
					<Image
						src="/phone-books2.svg"
						className="block lg:hidden shadow-lg relative rotate-12"
						width={320}
						height={568}
						alt="Picture of a mobile view capturing the details of one book"
						unoptimized={true}
					/>
				</div>
			</div>
		</div>
	);
}
