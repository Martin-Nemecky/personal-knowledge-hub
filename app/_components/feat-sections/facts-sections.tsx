import Link from "next/link";
import Image from "next/image";

export default function FactsSection() {
	return (
		<article id="facts" className="w-full flex flex-col lg:flex-row bg-gray-100 shadow-inner sm:px-20 px-8 py-2">
			<section className="basis-1/2 lg:ps-32 lg:py-32 pt-8">
				<h1 className="font-bold text-3xl">Factual Information</h1>
				<p className="bg-amber-300 p-6 mt-4 rounded-2xl">This feature is not available, yet.</p>
			</section>
			<section className="basis-1/2 flex justify-center">
				<div className="flex flex-col">
					<Image src="/facts.svg" width={700} height={700} alt="Picture of an information seeker" />
					<p className="relative md:bottom-5 lg:bottom-10 right-10 text-xs self-end">
						Designed by{" "}
						<Link href="https://www.freepik.com" target="_blank" className="inline text-blue-600 hover:underline">
							Freepik
						</Link>
					</p>
				</div>
			</section>
		</article>
	);
}
