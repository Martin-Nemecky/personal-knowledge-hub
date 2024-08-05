"use client";

import * as React from "react";
import { useState } from "react";
import BooksSection from "./feat-sections/book-section";
import FactsSection from "./feat-sections/facts-sections";
import ExperiencesSection from "./feat-sections/experiences-section";
import ThoughtsSection from "./feat-sections/thought-section";
import Tabs from "./tabs";

export default function Features() {
	const [selectedValue, setSelectedValue] = useState(0);
	const contents = [
		<BooksSection key={0} />,
		<ThoughtsSection key={1} />,
		<ExperiencesSection key={2} />,
		<FactsSection key={3} />,
	];

	return (
		<main>
			<Tabs selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
			{contents[selectedValue]}
		</main>
	);
}
