import Link from "next/link";

const links = [
	{ id: 1, title: "Books", href: "/books" },
	{ id: 2, title: "Thoughts", href: "/thoughts" },
	{ id: 3, title: "Experiences", href: "/experiences" },
	{ id: 4, title: "Facts", href: "/facts" },
];

export default function Footer() {
	return (
		<footer className="relative z-20 bg-gradient-to-r from-5% from-gray-700 via-blue-800 to-gray-700 to-95% text-white flex flex-col justify-center px-20 py-8">
			<div className="flex gap-8">
				<h2 className="font-bold text-xl">Personal Knowledge Hub</h2>
				<section>
					<h3 className="font-semibold text-lg">Features</h3>
					<nav>
						<ul>
							{links.map((link) => {
								return (
									<li key={link.id}>
										<Link href={link.href} className="hover:underline active:font-semibold">
											{link.title}
										</Link>
									</li>
								);
							})}
						</ul>
					</nav>
				</section>
			</div>
			<hr className="bg-white my-2" />
			<p className="text-center">Copyright © 2024. All rights reserved.</p>
		</footer>
	);
}
