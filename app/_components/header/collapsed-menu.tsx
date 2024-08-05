"use client";

import { IconButton, Modal } from "@mui/material";
import clsx from "clsx";
import Link from "next/link";
import ClearIcon from "@mui/icons-material/Clear";
import { usePathname } from "next/navigation";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { User } from "@/app/_types/definitions";
import SignInOutButton from "./sign-in-out-button";

interface Props {
	links: { title: string; href: string }[];
	user: User | null;
}

export default function CollapsedMenu({ links, user }: Props) {
	const [open, setOpen] = useState(false);
	const pathname = usePathname();

	return (
		<section className="flex md:hidden justify-end items-center text-white">
			<IconButton title="Menu" aria-label="menu" size="large" onClick={() => setOpen(true)}>
				<MenuIcon className="text-white" />
			</IconButton>

			<Modal open={open} onClose={() => setOpen(false)}>
				<section className="bg-blue-900 h-screen w-screen text-white flex flex-col p-4">
					<IconButton title="Close" size="large" onClick={() => setOpen(false)} className="self-end">
						<ClearIcon className="text-white" />
					</IconButton>
					<nav>
						<ul className="flex flex-col items-center text-2xl gap-6 mt-10 font-semibold">
							{links.map((link) => (
								<li
									key={link.title}
									className={clsx(``, {
										"underline underline-offset-8": pathname === link.href,
									})}
								>
									<Link href={link.href}>{link.title}</Link>
								</li>
							))}

							<li className="mt-20 text-xl">
								<SignInOutButton user={user} />
							</li>
						</ul>
					</nav>
				</section>
			</Modal>
		</section>
	);
}
