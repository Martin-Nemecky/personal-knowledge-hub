import LoginForm from "./ui/login-form";

export default function Page() {
	return (
		<main
			className={`flex min-h-screen justify-center items-center bg-gradient-to-r from-5% from-gray-700 via-blue-800 to-gray-700 to-95%`}
		>
			<LoginForm />
		</main>
	);
}
