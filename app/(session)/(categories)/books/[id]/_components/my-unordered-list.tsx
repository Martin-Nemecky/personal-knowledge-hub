import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Children } from "react";
import { v4 } from "uuid";

interface Params {
	children: React.ReactNode;
}

export default function MyUnorderedList({ children }: Params) {
	return (
		<ul className="flex flex-col gap-3 p-2 font-normal mt-2">
			{Children.map(children, (child) => {
				return (
					<div key={v4()} className="flex gap-2 items-start">
						<ChevronRightIcon />
						{child}
					</div>
				);
			})}
		</ul>
	);
}
