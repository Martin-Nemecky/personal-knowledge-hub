import { CircularProgress } from "@mui/material";

export default function Loading() {
	return (
		<div className="h-full w-full flex justify-center items-center pt-10">
			<CircularProgress />
		</div>
	);
}
