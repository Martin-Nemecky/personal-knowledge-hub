"use client";

import { signIn } from "@/app/_actions/auth-actions";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const [isPending, setIsPending] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setIsPending(true);

		const username = event.currentTarget.username.value;
		const password = event.currentTarget.password.value;

		try {
			await signIn(username, password, searchParams.get("from"));
		} catch (error: any) {
			setIsPending(false);
			setErrorMessage(error.message);
		}
	}

	return (
		<form
			onSubmit={handleSubmit}
			className={`flex flex-col gap-3 sm:h-[400px] h-[450px] bg-white shadow-2xl mx-4 rounded-3xl p-10`}
		>
			<h1 className="text-4xl text-center pt-10 px-6 font-black ">Personal Knowledge Hub</h1>
			<h1 className="text text-center px-6 text-gray-600 ">You have to sign in first to get to your content.</h1>
			<div className="h-[20px]"></div>
			<input
				type="text"
				name="username"
				placeholder="Username"
				className={`border rounded-lg p-2`}
				required={true}
			/>
			<input
				type="password"
				name="password"
				placeholder="Password"
				className={`border rounded-lg p-2`}
				required={true}
			/>

			{errorMessage !== "" ? <p className="text-red-600 text-base text-center">{errorMessage}</p> : ""}
			<button
				className={`font-bold bg-green-600 text-white rounded-lg hover:bg-green-500 active:bg-green-400 uppercase to-95% p-3`}
				type="submit"
			>
				{isPending ? "Signing in..." : "Sign in"}
			</button>
		</form>
	);
}
