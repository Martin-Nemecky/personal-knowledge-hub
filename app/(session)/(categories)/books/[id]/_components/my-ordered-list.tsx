import { Card, Paper } from "@mui/material";
import { Children } from "react";

interface Params {
	children: React.ReactNode;
}

export default function MyOrderedList({ children }: Params) {
	return (
		<ol className="grid md:grid-cols-2 grid-cols-1 gap-4 font-semibold">
			{Children.map(children, (child) => {
				return (
					<Paper
						elevation={10}
						sx={{ "&:hover": { boxShadow: "0px 0px 0px gray" } }}
						className="p-6 rounded-2xl border border-gray-400"
					>
						{child}
					</Paper>
				);
			})}
		</ol>
	);
}
