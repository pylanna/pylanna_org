import React from "react";
import { FaCalendarDays, FaClock, FaLocationDot } from "react-icons/fa6";
import RegisterButton from "@/components/events/RegisterButton";
import {
	formatEventDate,
	formatEventTime,
	isPastEvent,
	type PyLannaEvent,
} from "@/data/events";

interface EventCardProps {
	event: PyLannaEvent;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
	const isPast = isPastEvent(event);

	return (
		<article className="rounded-3xl bg-white dark:bg-neutral-900 ring-2 ring-wine-berry-950 dark:ring-neutral-600 px-6 py-6 shadow-md">
			<p className="font-mono text-xs font-bold tracking-widest uppercase text-wine-berry-700 dark:text-cream-can-300">
				{event.kind}
			</p>
			<h3 className="mt-1 text-2xl font-extrabold text-neutral-900 dark:text-neutral-100">
				{event.title}
			</h3>
			{event.subtitle && (
				<p className="font-semibold text-neutral-700 dark:text-neutral-300">
					{event.subtitle}
				</p>
			)}
			{event.description && (
				<p className="mt-3 text-neutral-700 dark:text-neutral-300">
					{event.description}
				</p>
			)}

			<ul className="mt-4 space-y-2 text-neutral-800 dark:text-neutral-200">
				<li className="flex items-center gap-3">
					<FaCalendarDays aria-hidden />
					<span>{formatEventDate(event)}</span>
				</li>
				<li className="flex items-center gap-3">
					<FaClock aria-hidden />
					<span>{formatEventTime(event)}</span>
				</li>
				<li className="flex items-center gap-3">
					<FaLocationDot aria-hidden />
					<a
						href={event.venue.mapUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="underline-offset-4 hover:underline"
					>
						{event.venue.name}
					</a>
				</li>
			</ul>

			<div className="mt-5">
				{isPast ? (
					<a
						href={event.registration.url}
						target="_blank"
						rel="noopener noreferrer"
						className="font-semibold text-wine-berry-700 dark:text-cream-can-300 underline-offset-4 hover:underline"
					>
						View event page
					</a>
				) : (
					<RegisterButton registration={event.registration} />
				)}
			</div>
		</article>
	);
};

export default EventCard;
