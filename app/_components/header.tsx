"use client";

import Link from "next/link";
import { User } from "../_types/definitions";
import { usePathname } from "next/navigation";
import MenuIcon from "@mui/icons-material/Menu";
import ClearIcon from "@mui/icons-material/Clear";
import clsx from "clsx";
import { signOut } from "../_actions/auth-actions";
import { IconButton, Modal } from "@mui/material";
import { useState } from "react";

interface Params {
	user: User | null;
}

const links = [
	{ title: "Home", href: "/" },
	{ title: "Features", href: "/features" },
	{ title: "Pricing", href: "/pricing" },
	{ title: "About", href: "/about" },
];

export default function Header({ user }: Params) {
	const [open, setOpen] = useState(false);
	const pathname = usePathname();

	return (
		<header className=" bg-gradient-to-r from-5% from-gray-700 via-blue-800 to-gray-700 to-95% px-8 py-8">
			<div className="flex justify-between items-center text-white">
				<ul className="flex gap-6 font-semibold text-lg">
					{links.map((link) => (
						<li
							key={link.title}
							className={clsx(`hidden md:block`, {
								"underline underline-offset-8": pathname === link.href,
							})}
						>
							<Link href={link.href} className="block py-3 px-2">
								{link.title}
							</Link>
						</li>
					))}
				</ul>

				<div>
					{user == null ? (
						<Link
							className="hidden md:block border rounded-lg py-3 px-5 hover:bg-gray-600 active:bg-gray-500"
							href={"/login"}
						>
							Sign In
						</Link>
					) : (
						<button
							className="hidden md:block border rounded-lg py-3 px-5 bg-red-600 hover:bg-red-500 active:bg-red-400"
							onClick={async () => await signOut()}
						>
							Sign Out
						</button>
					)}
					<IconButton aria-label="menu" size="large" onClick={() => setOpen(true)}>
						<MenuIcon className="block md:hidden text-white" />
					</IconButton>
					<Modal
						open={open}
						onClose={() => setOpen(false)}
						aria-labelledby="modal-modal-title"
						aria-describedby="modal-modal-description"
					>
						<div className="bg-blue-900 h-screen w-screen text-white flex flex-col p-4">
							<IconButton size="large" onClick={() => setOpen(false)} className="self-end">
								<ClearIcon className="text-white" />
							</IconButton>
							<ul className="flex flex-col items-center text-2xl gap-4 mt-10 font-semibold">
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
							</ul>
						</div>
					</Modal>
				</div>
			</div>

			<div className="flex flex-col items-center justify-center py-4 md:py-20 gap-4">
				<h1 className="font-black text-white lg:text-6xl md:text-4xl text-3xl">Personal Knowledge Hub</h1>
				<h3 className="font-medium lg:text-xl md:text-lg text-base text-wrap px-4 text-gray-300">
					Manage all the personal wisdom in one place.
				</h3>
			</div>
		</header>
	);
}
