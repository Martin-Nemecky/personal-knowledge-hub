"use client";

import { User } from "@/app/_types/definitions";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SignInOutButton from "./sign-in-out-button";

interface Props {
	links: { title: string; href: string }[];
	user: User | null;
}

export default function ExpandedMenu({ links, user }: Props) {
	const pathname = usePathname();

	return (
		<section className="hidden md:flex justify-between items-center text-white">
			<nav>
				<ul className="flex gap-6 font-semibold text-lg">
					{links.map((link) => (
						<li key={link.title} className={clsx("", { "underline underline-offset-8": pathname === link.href })}>
							<Link href={link.href} className="block py-3 px-2">
								{link.title}
							</Link>
						</li>
					))}
				</ul>
			</nav>
			<SignInOutButton user={user} />
		</section>
	);
}
