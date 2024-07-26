import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Markdown from "markdown-to-jsx";
import MyOrderedList from "../[id]/_components/my-ordered-list";
import MyUnorderedList from "../[id]/_components/my-unordered-list";

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function CustomTabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box>{children}</Box>}
		</div>
	);
}

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

interface Params {
	contentValue: string;
	setContentValue: React.Dispatch<React.SetStateAction<string>>;
}

export default function ContentEditor({ contentValue, setContentValue }: Params) {
	const [value, setValue] = React.useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<Box sx={{ width: "100%" }}>
			<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
				<Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
					<Tab label="Editor" {...a11yProps(0)} />
					<Tab label="Preview" {...a11yProps(1)} />
				</Tabs>
			</Box>
			<CustomTabPanel value={value} index={0}>
				<div className="flex flex-col gap-2">
					<textarea
						name="content"
						defaultValue={contentValue}
						className={`w-full h-[500px] border p-2`}
						onChange={(e) => setContentValue(e.target.value)}
					/>
				</div>
			</CustomTabPanel>
			<CustomTabPanel value={value} index={1}>
				<div className="h-[500px]">
					<div className="border border-gray-700  rounded-lg p-4 h-[500px] overflow-auto">
						<Markdown
							options={{
								overrides: {
									h1: {
										props: {
											className: "text-3xl text-blue-700 font-semibold",
										},
									},
									h2: {
										props: {
											className: "text-xl text-gray-500",
										},
									},
									h3: {
										props: {
											className: "mt-5 mb-2 text-lg text-blue-700 font-semibold",
										},
									},
									ol: {
										component: MyOrderedList,
									},
									ul: {
										component: MyUnorderedList,
									},
								},
							}}
						>
							{contentValue}
						</Markdown>
					</div>
				</div>
			</CustomTabPanel>
		</Box>
	);
}
