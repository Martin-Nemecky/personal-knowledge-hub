"use client";

import { signOut } from "@/app/_actions/auth-actions";

export default function SignOutButton() {
	return (
		<button
			className="border rounded-lg py-3 px-5 bg-red-600 hover:bg-red-500 active:bg-red-400"
			onClick={async () => await signOut()}
		>
			Sign Out
		</button>
	);
}
