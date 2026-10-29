import type { Metadata } from "next";
import Link from "next/link";
import EventAgenda from "@/components/events/EventAgenda";
import EventHero from "@/components/events/EventHero";
import EventPartners from "@/components/events/EventPartners";
import SchemaScript from "@/config/seo/SchemaScript";
import { buildEventSchema } from "@/config/seo/event.schema";
import { buildEventMetadata } from "@/config/seo/site.metadata";
import { getUpcomingEvent } from "@/data/events";

// Re-check the date hourly so a finished event rolls into the history
export const revalidate = 3600;

export function generateMetadata(): Metadata {
	const event = getUpcomingEvent();
	return event ? buildEventMetadata(event) : {};
}

export default function Home() {
	const event = getUpcomingEvent();

	if (!event) {
		return (
			<div className="min-h-full max-w-3xl mx-auto mt-8 text-center">
				<h1 className="text-5xl md:text-7xl font-bold text-neutral-950 dark:text-neutral-100">
					PyLanna
				</h1>
				<p className="mt-6 text-xl md:text-2xl text-neutral-700 dark:text-neutral-300">
					Python User Group Community of Northern Thailand
				</p>
				<p className="mt-10 text-2xl font-semibold text-wine-berry-950 dark:text-cream-can-300">
					Next event coming soon
				</p>
				<Link
					href="/events"
					className="mt-6 inline-block rounded-full px-6 py-3 text-lg font-semibold text-wine-berry-950 dark:text-cream-can-200 ring-2 ring-cream-can-300 hover:scale-105 transition"
				>
					See past events
				</Link>
			</div>
		);
	}

	return (
		<div className="min-h-full pb-8">
			<SchemaScript schema={buildEventSchema(event)} />
			<EventHero event={event} />
			{event.agenda && <EventAgenda agenda={event.agenda} />}
			{event.partners && <EventPartners partners={event.partners} />}
			<p className="mt-12 text-center">
				<Link
					href="/events"
					className="font-semibold text-wine-berry-700 dark:text-cream-can-300 underline-offset-4 hover:underline"
				>
					See all events
				</Link>
			</p>
		</div>
	);
}
