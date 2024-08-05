import { getSessionData } from "../_actions/session-actions";
import { getUserById } from "../_actions/users-actions";
import Footer from "../_components/footer";
import Header from "../_components/header/header";
import { User } from "../_types/definitions";

export default async function PricingPage() {
	const sessionData = await getSessionData();
	let user: User | null = null;

	if (sessionData != null) {
		user = await getUserById(sessionData.userId);
	}

	return (
		<>
			<Header user={user} />
			<main className="h-[400px] ">
				<p className="bg-amber-300 p-6 m-6 rounded-2xl">Pricing page is not implemented, yet.</p>
			</main>
			<Footer />
		</>
	);
}
