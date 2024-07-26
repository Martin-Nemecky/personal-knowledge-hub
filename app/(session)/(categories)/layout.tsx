import Navigation from "./_components/navigation";

export default function CategoryLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex flex-col">
			<header className="fixed text-blue-700 p-2 min-h-20 z-50 bg-white inset-x-0 border-b-2">
				<Navigation />
			</header>

			<div className="relative top-32 md:top-20 grow px-5">{children}</div>
		</div>
	);
}
