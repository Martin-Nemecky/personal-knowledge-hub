import { getUserById } from "./_actions/users-actions";
import { User } from "./_types/definitions";
import { getSessionData } from "./_actions/session-actions";
import Header from "./_components/header";
import Footer from "./_components/footer";
import Features from "./_components/features";

export default async function Home() {
	const sessionData = await getSessionData();
	let user: User | null = null;

	if (sessionData != null) {
		user = await getUserById(sessionData.userId);
	}

	return (
		<>
			<Header user={user} />
			<Features />
			<Footer />
		</>
	);
}
