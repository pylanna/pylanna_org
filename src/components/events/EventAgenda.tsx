import React from "react";
import type { AgendaItem } from "@/data/events";

interface EventAgendaProps {
	agenda: AgendaItem[];
}

const EventAgenda: React.FC<EventAgendaProps> = ({ agenda }) => (
	<section
		aria-labelledby="agenda-heading"
		className="max-w-5xl mx-auto mt-12"
	>
		<h2
			id="agenda-heading"
			className="text-2xl md:text-3xl font-extrabold text-wine-berry-950 dark:text-cream-can-300"
		>
			Agenda
		</h2>

		<ol className="mt-4 divide-y divide-wine-berry-100 dark:divide-neutral-700 rounded-2xl bg-white dark:bg-neutral-900 ring-2 ring-wine-berry-950 dark:ring-neutral-600 overflow-hidden">
			{agenda.map((item) => (
				<li
					key={`${item.start}-${item.title}`}
					className={`flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:gap-6 ${
						item.isBreak
							? "text-neutral-500 dark:text-neutral-400"
							: "font-semibold text-neutral-900 dark:text-neutral-100"
					}`}
				>
					<span className="font-mono text-sm sm:w-40 shrink-0">
						{item.start} – {item.end}
					</span>
					<span className="text-lg">{item.title}</span>
				</li>
			))}
		</ol>
	</section>
);

export default EventAgenda;
