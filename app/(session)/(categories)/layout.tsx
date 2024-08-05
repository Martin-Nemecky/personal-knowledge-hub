import Link from "next/link";
import ExpandedMenu from "./_components/expanded-menu";
import CollapsedMenu from "./_components/collapsed-menu";

const links = [
	{ title: "Books", href: "/books" },
	{ title: "Thoughts", href: "/thoughts" },
	{ title: "Experiences", href: "/experiences" },
	{ title: "Facts", href: "/facts" },
];

export default function CategoryLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<header className="fixed text-blue-700 p-2 min-h-20 z-50 bg-white inset-x-0 border-b-2">
				<section className="flex justify-between items-center">
					<h1 className="text-lg text-center font-bold p-4">
						<Link href={"/"}>Personal Knowledge Hub</Link>
					</h1>
					<ExpandedMenu links={links} />
					<CollapsedMenu links={links} />
				</section>
			</header>

			<main className="relative top-20 px-5">{children}</main>
		</>
	);
}
