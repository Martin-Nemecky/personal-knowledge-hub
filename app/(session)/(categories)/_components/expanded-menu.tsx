"use client";

import { signOut } from "@/app/_actions/auth-actions";
import { getSessionData } from "@/app/_actions/session-actions";
import { getUserById } from "@/app/_actions/users-actions";
import { User } from "@/app/_types/definitions";
import { Divider, Button, Menu, MenuItem } from "@mui/material";
import clsx from "clsx";
import Link from "next/link";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";

interface Props {
	links: { title: string; href: string }[];
}

export default function ExpandedMenu({ links }: Props) {
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
		<nav className="hidden xl:block">
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
		</nav>
	);
}
