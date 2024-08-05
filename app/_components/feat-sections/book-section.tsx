import Link from "next/link";
import Image from "next/image";

export default function BooksSection() {
	return (
		<article id="books" className="w-full flex flex-col xl:flex-row shadow-inner bg-gray-100 px-20">
			<section className="lg:basis-1/2 lg:ps-32 lg:py-20 xl:pt-28 xl:pb-36 pt-8">
				<h1 className="font-bold text-3xl">Books</h1>
				<p className="pt-6">
					These days it can be quite challenging to find time to sit down and reflect upon the books we have just
					read, even though each book have a potential to enrich our life in various ways. And even if we find the
					time, where should we begin? Our app provides a simple styling rules which will help you to concentrate
					on the truly important stuff (whatever that might be).
				</p>
				<div className="mt-5">
					<Link className="text-blue-700 text-lg font-medium active:text-blue-400" href={"/books"}>
						Get Started
					</Link>
				</div>

				<Image
					src="/page-books.svg"
					className="hidden xl:block relative top-8 lg:-rotate-12 shadow-2xl overflow-visible z-10 mt-10"
					width={1440}
					height={1024}
					alt="Picture of a desktop view capturing the books section"
					unoptimized={true}
					priority={false}
				/>
			</section>
			<section className="lg:basis-1/2 relative top-10 flex justify-center overflow-visible me-5 pb-20">
				<div className="">
					<Image
						src="/page-books2.svg"
						className="hidden xl:block relative top-40 lg:rotate-12"
						width={1440}
						height={1024}
						alt="Picture of a desktop view capturing the details of one book"
						unoptimized={true}
						priority={false}
					/>
				</div>
				<div className="">
					<Image
						src="/phone-books.svg"
						className="block xl:hidden relative -rotate-12"
						width={320}
						height={568}
						alt="Picture of a mobile view capturing the books section"
						unoptimized={true}
						priority={false}
					/>
				</div>
				<div className="">
					<Image
						src="/phone-books2.svg"
						className="block xl:hidden shadow-lg relative rotate-12"
						width={320}
						height={568}
						alt="Picture of a mobile view capturing the details of one book"
						unoptimized={true}
						priority={false}
					/>
				</div>
			</section>
		</article>
	);
}
