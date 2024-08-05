import { Children, ReactNode } from "react";
import { v4 } from "uuid";

interface Params {
	children: React.ReactNode;
}

export default function MyOrderedList({ children }: Params) {
	return (
		<ol className="grid md:grid-cols-2 grid-cols-1 gap-4 font-semibold">
			{Children.map(children, (child) => {
				return (
					<div
						key={v4()}
						className="p-6 rounded-2xl border border-gray-400 overflow-auto hover:shadow-none transition-shadow ease-in-out duration-500 shadow-[0px_0px_10px_1px_rgba(0,0,0,0.3)]"
					>
						{child}
					</div>
				);
			})}
		</ol>
	);
}
