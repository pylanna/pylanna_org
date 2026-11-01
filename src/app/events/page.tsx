import type { Metadata } from "next";
import EventCard from "@/components/events/EventCard";
import { getPastEvents, getUpcomingEvent } from "@/data/events";

// Re-check the date hourly so a finished event rolls into the history
export const revalidate = 3600;

export const metadata: Metadata = {
	title: "Events | PyLanna",
	description:
		"Upcoming and past PyLanna events: Python meetups and Devs Day in Chiang Mai.",
};

export default function EventsPage() {
	const upcoming = getUpcomingEvent();
	const past = getPastEvents();

	return (
		<div className="max-w-4xl mx-auto px-4 -mt-2 pb-8">
			<h1 className="text-4xl font-extrabold text-neutral-900 dark:text-cream-can-300 mb-2 text-center">
				Events
			</h1>
			<p className="text-center text-neutral-700 dark:text-neutral-300 mb-8">
				Python meetups and community days from PyLanna in Chiang Mai.
			</p>

			<section aria-labelledby="upcoming-heading">
				<h2
					id="upcoming-heading"
					className="text-2xl font-extrabold text-wine-berry-950 dark:text-cream-can-300 mb-4"
				>
					Upcoming
				</h2>
				{upcoming ? (
					<EventCard event={upcoming} />
				) : (
					<p className="text-neutral-700 dark:text-neutral-300">
						Next event coming soon.
					</p>
				)}
			</section>

			<section
				aria-labelledby="past-heading"
				className="mt-12"
			>
				<h2
					id="past-heading"
					className="text-2xl font-extrabold text-wine-berry-950 dark:text-cream-can-300 mb-4"
				>
					Past events
				</h2>
				<div className="grid gap-6">
					{past.map((event) => (
						<EventCard
							key={event.slug}
							event={event}
						/>
					))}
				</div>
			</section>
		</div>
	);
}
