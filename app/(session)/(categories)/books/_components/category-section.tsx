import { Category } from "@/app/_types/definitions";
import ClearIcon from "@mui/icons-material/Clear";
import { Autocomplete, IconButton, TextField } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { v4 as uuidv4 } from "uuid";

interface Props {
	allCategories: Category[];
	selectedCategories: Category[];
	setSelectedCategories: Dispatch<SetStateAction<Category[]>>;
}

export default function CategorySection({ allCategories, selectedCategories, setSelectedCategories }: Props) {
	return (
		<aside className="flex flex-col gap-4">
			<header>
				<h3 className="text-lg font-medium">Categories</h3>
			</header>
			<Autocomplete
				disablePortal
				id="combo-box-demo"
				autoComplete={true}
				options={allCategories.map((c) => c.name)}
				renderInput={(params) => <TextField {...params} label="Select a category..." />}
				onChange={(e, newValue) => {
					e.preventDefault();
					if (newValue != null && selectedCategories.find((c) => c.name === newValue) == null) {
						const result = selectedCategories.map((c) => {
							return { id: c.id, name: c.name };
						});
						result.push({ id: uuidv4(), name: newValue });
						setSelectedCategories(result);
					}
				}}
			/>

			<ul className="flex gap-2 flex-wrap">
				{selectedCategories.map((category) => {
					return (
						<li
							key={category.id}
							className="flex gap-2 items-center py-1 ps-3 pe-1  rounded-full shadow-md border border-1 border-gray-400 "
						>
							<p>{category.name}</p>
							<IconButton
								aria-label="delete"
								onClick={() => {
									const result = selectedCategories
										.filter((c) => c.id !== category.id)
										.map((c) => {
											return { id: c.id, name: c.name };
										});

									setSelectedCategories(result);
								}}
							>
								<ClearIcon className="size-4 text-red-700" />
							</IconButton>
						</li>
					);
				})}
			</ul>
		</aside>
	);
}
