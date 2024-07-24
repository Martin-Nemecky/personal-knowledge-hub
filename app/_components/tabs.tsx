import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";

interface Params {
	selectedValue: number;
	setSelectedValue: Dispatch<SetStateAction<number>>;
}

const sections = [
	{ value: 0, title: "Books" },
	{ value: 1, title: "Thoughts" },
	{ value: 2, title: "Experiences" },
	{ value: 3, title: "Facts" },
];

export default function Tabs({ selectedValue, setSelectedValue }: Params) {
	return (
		<div className="flex flex-col lg:flex-row justify-center items-center gap-2 py-4 px-8 border-1 border-gray-400 text-lg ">
			{sections.map((section) => {
				const navElement = (
					<div
						className={clsx(
							"lg:w-36 w-full hover:bg-gray-200 active:bg-gray-100 hover:cursor-pointer rounded-full py-3 px-5",
							{
								"bg-gray-200": section.value === selectedValue,
							}
						)}
						onClick={() => setSelectedValue(section.value)}
					>
						<p className=" text-center">{section.title}</p>
					</div>
				);

				return (
					<div key={section.value} className="w-full lg:w-auto flex items-center justify-center gap-2">
						{navElement}
						{section.value !== 3 ? <div className="lg:block hidden w-[100px] h-[1px] bg-gray-400" /> : null}
					</div>
				);
			})}
		</div>
	);
}
