"use client";

import { signOut } from "@/app/_actions/auth-actions";
import { User } from "@/app/_types/definitions";
import { useRouter } from "next/navigation";

interface Props {
	user: User | null;
}

export default function SignInOutButton({ user }: Props) {
	const router = useRouter();

	if (user == null) {
		return (
			<button
				className="border rounded-lg py-3 px-5 hover:bg-gray-600 active:bg-gray-500"
				onClick={() => router.push("/login")}
			>
				Sign In
			</button>
		);
	} else {
		return (
			<button
				className="border rounded-lg py-3 px-5 bg-red-600 hover:bg-red-500 active:bg-red-400"
				onClick={async () => await signOut()}
			>
				Sign Out
			</button>
		);
	}
}
