"use client";

import { IconButton, Modal } from "@mui/material";
import clsx from "clsx";
import Link from "next/link";
import ClearIcon from "@mui/icons-material/Clear";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { getSessionData } from "@/app/_actions/session-actions";
import { getUserById } from "@/app/_actions/users-actions";
import { User } from "@/app/_types/definitions";
import { signOut } from "@/app/_actions/auth-actions";

interface Props {
	links: { title: string; href: string }[];
}

export default function CollapsedMenu({ links }: Props) {
	const [open, setOpen] = useState(false);
	const [user, setUser] = useState<User | null>(null);
	const pathname = usePathname();

	useEffect(() => {
		async function getUser() {
			const data = await getSessionData();
			const user = await getUserById(data?.userId);
			setUser(user);
		}

		getUser();
	}, []);

	return (
		<section className="flex xl:hidden justify-end items-center text-white">
			<IconButton title="Menu" aria-label="menu" size="large" onClick={() => setOpen(true)}>
				<MenuIcon />
			</IconButton>

			<Modal open={open} onClose={() => setOpen(false)}>
				<section className="h-screen w-screen bg-gray-200 flex flex-col p-4">
					<IconButton title="Close" size="large" onClick={() => setOpen(false)} className="self-end">
						<ClearIcon />
					</IconButton>
					<nav>
						<ul className="flex flex-col items-center text-2xl gap-6 mt-10 font-semibold">
							{links.map((link) => (
								<li
									key={link.title}
									className={clsx(`text-blue-700 active:text-blue-500`, {
										"underline underline-offset-8": pathname === link.href,
									})}
									onClick={() => setOpen(false)}
								>
									<Link href={link.href}>{link.title}</Link>
								</li>
							))}

							<li className="mt-20 uppercase">
								<p>{user?.username}</p>
							</li>
							<li className=" text-xl">
								<button
									className="border rounded-lg py-3 px-5 text-white bg-red-600 hover:bg-red-500 active:bg-red-400"
									onClick={async () => await signOut()}
								>
									Sign Out
								</button>
							</li>
						</ul>
					</nav>
				</section>
			</Modal>
		</section>
	);
}
