import { User } from "../../_types/definitions";
import ExpandedMenu from "./expanded-menu";
import CollapsedMenu from "./collapsed-menu";

interface Props {
	user: User | null;
}

const links = [
	{ title: "Home", href: "/" },
	{ title: "Features", href: "/features" },
	{ title: "Pricing", href: "/pricing" },
	{ title: "About", href: "/about" },
];

export default function Header({ user }: Props) {
	return (
		<header className=" bg-gradient-to-r from-5% from-gray-700 via-blue-800 to-gray-700 to-95% px-8 py-8">
			<ExpandedMenu links={links} user={user} />
			<CollapsedMenu links={links} user={user} />

			<hgroup className="flex flex-col items-center justify-center py-4 md:py-20 gap-4">
				<h1 className="font-black text-white lg:text-6xl md:text-4xl text-3xl">Personal Knowledge Hub</h1>
				<h2 className="font-medium lg:text-xl md:text-lg text-base text-wrap md:px-4 text-gray-300">
					Manage all your wisdom in one place.
				</h2>
			</hgroup>
		</header>
	);
}
