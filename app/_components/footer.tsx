import Link from "next/link";

export default function Footer() {
	return (
		<footer className="relative z-20 bg-gradient-to-r from-5% from-gray-700 via-blue-800 to-gray-700 to-95% text-white flex flex-col justify-center px-20 py-5">
			<div className="flex gap-8">
				<h2 className="font-bold text-xl">Personal Knowledge Hub</h2>
				<div>
					<h3 className="font-semibold text-lg">Features</h3>
					<ul>
						<li>
							<Link href={"/books"} className="hover:underline active:font-semibold">
								Books
							</Link>
						</li>
						<li>
							<Link href={"/thoughts"} className="hover:underline active:font-semibold">
								Thoughts
							</Link>
						</li>
						<li>
							<Link href={"/experiences"} className="hover:underline active:font-semibold">
								Experiences
							</Link>
						</li>
						<li>
							<Link href={"/facts"} className="hover:underline active:font-semibold">
								Facts
							</Link>
						</li>
					</ul>
				</div>
			</div>
			<hr className="bg-white my-2" />
			<p className="text-center">Copyright © 2024. All rights reserved.</p>
		</footer>
	);
}
