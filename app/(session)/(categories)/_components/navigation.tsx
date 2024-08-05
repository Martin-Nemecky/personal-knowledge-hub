"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/app/_actions/auth-actions";
import { getUserById } from "@/app/_actions/users-actions";
import React, { useEffect, useState } from "react";
import { Button, Divider, Menu, MenuItem } from "@mui/material";
import { getSessionData } from "@/app/_actions/session-actions";
import { User } from "@/app/_types/definitions";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const links = [
	{ title: "Books", href: "/books" },
	{ title: "Thoughts", href: "/thoughts" },
	{ title: "Experiences", href: "/experiences" },
	{ title: "Facts", href: "/facts" },
];

export default function Navigation() {
	const pathname = usePathname();

	const [user, setUser] = useState<User | null>(null);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = async () => {
		setAnchorEl(null);
	};

	useEffect(() => {
		async function getUser() {
			const data = await getSessionData();
			const user = await getUserById(data?.userId);
			setUser(user);
		}

		getUser();
	}, []);
	return (
		<nav className="flex md:flex-row flex-col justify-between items-center">
			<h1 className="text-lg text-center font-bold p-4">
				<Link href={"/"} className="block">
					Personal Knowledge Hub
				</Link>
			</h1>

			<div>
				<ul className="flex justify-center gap-2">
					{links.map((link) => (
						<li
							key={link.title}
							className={clsx(`text-center lg:w-36 hover:bg-blue-100 hover:rounded-full active:bg-blue-200`, {
								"shadow-md rounded-full border border-blue-700 font-semibold": pathname === link.href,
							})}
						>
							<Link href={link.href} className="block py-3 px-2">
								{link.title}
							</Link>
						</li>
					))}
					<li>
						<Divider orientation="vertical" />
					</li>
					<li>
						<Button
							id="demo-customized-button"
							aria-controls={open ? "demo-customized-menu" : undefined}
							aria-haspopup="true"
							aria-expanded={open ? "true" : undefined}
							variant="text"
							disableElevation
							onClick={handleClick}
							endIcon={<KeyboardArrowDownIcon />}
							className="rounded-full py-3 md:px-10 px-2"
						>
							{user == null ? "not defined" : user.username}
						</Button>
						<Menu
							id="basic-menu"
							anchorEl={anchorEl}
							open={open}
							onClose={handleClose}
							MenuListProps={{
								"aria-labelledby": "basic-button",
							}}
						>
							<MenuItem
								onClick={async () => {
									await handleClose();
									await signOut();
								}}
							>
								Sign Out
							</MenuItem>
						</Menu>
					</li>
				</ul>
			</div>
		</nav>
	);
}
