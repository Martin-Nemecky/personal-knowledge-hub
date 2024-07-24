"use client";

import clsx from "clsx";
import * as React from "react";
import { useState } from "react";
import BooksSection from "./feat-sections/book-section";
import FactsSection from "./feat-sections/facts-sections";
import ExperiencesSection from "./feat-sections/experiences-section";
import ThoughtsSection from "./feat-sections/thought-section";
import Tabs from "./tabs";

export default function Features() {
	const [selectedValue, setSelectedValue] = useState(0);
	let content: React.ReactNode = null;
	switch (selectedValue) {
		case 0: {
			content = <BooksSection />;
			break;
		}
		case 1: {
			content = <ThoughtsSection />;
			break;
		}
		case 2: {
			content = <ExperiencesSection />;
			break;
		}
		default: {
			content = <FactsSection />;
		}
	}

	return (
		<div>
			<Tabs selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
			{content}
		</div>
	);
}
