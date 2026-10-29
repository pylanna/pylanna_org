import React from "react";
import Image from "next/image";
import {
	FaCalendarDays,
	FaClock,
	FaLocationDot,
	FaUserGroup,
} from "react-icons/fa6";
import RegisterButton from "@/components/events/RegisterButton";
import {
	formatEventDate,
	formatEventTime,
	type PyLannaEvent,
} from "@/data/events";

interface EventHeroProps {
	event: PyLannaEvent;
}

// Poster-style card for the upcoming event. Colours are fixed (not themed)
// so the card looks the same as the poster in light and dark mode.
const EventHero: React.FC<EventHeroProps> = ({ event }) => {
	const taglineParts = event.tagline?.split("===");
	const venueShortName = event.venue.name.match(/\(([^)]+)\)/)?.[1];

	const details = [
		{
			icon: FaCalendarDays,
			label: "Date",
			value: formatEventDate(event),
		},
		{
			icon: FaClock,
			label: "Time",
			value: formatEventTime(event),
		},
		...(event.seats
			? [
					{
						icon: FaUserGroup,
						label: "Seats",
						value: `${event.seats} participants`,
					},
				]
			: []),
		{
			icon: FaLocationDot,
			label: "Venue",
			value: venueShortName ?? event.venue.name,
			href: event.venue.mapUrl,
		},
	];

	return (
		<section className="animate-fade-up max-w-5xl mx-auto rounded-3xl bg-[#fdfcf5] text-wine-berry-950 ring-4 ring-wine-berry-950 shadow-xl px-5 py-8 md:px-12 md:py-10">
			<div className="flex justify-between font-mono text-xs md:text-sm font-bold tracking-widest uppercase">
				<span>Tech Event</span>
				<span>Chiang Mai</span>
			</div>

			<h1
				aria-label={event.title}
				className="mt-6 flex flex-col items-center text-center"
			>
				{event.logo && (
					<Image
						src={event.logo.src}
						alt=""
						width={event.logo.width}
						height={event.logo.height}
						priority
						className="w-3/4 max-w-sm md:max-w-md h-auto"
					/>
				)}
				<span className="mt-4 font-extrabold tracking-tight text-5xl md:text-7xl">
					{event.logo?.text ?? event.title}
				</span>
			</h1>

			{event.subtitle && (
				<p className="mt-2 text-center font-semibold text-lg md:text-2xl">
					{event.subtitle}
				</p>
			)}

			{event.tagline && (
				<p className="mt-6 mx-auto w-fit max-w-full rounded-2xl bg-wine-berry-950 px-6 py-3 text-center font-mono font-semibold text-cream-can-50 text-base md:text-2xl [font-variant-ligatures:none]">
					{taglineParts && taglineParts.length > 1 ? (
						<>
							{taglineParts[0].trim()}{" "}
							<span className="text-cream-can-300 tracking-[0.25em]">
								===
							</span>{" "}
							{taglineParts[1].trim()}
						</>
					) : (
						event.tagline
					)}
				</p>
			)}

			<dl className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
				{details.map(({ icon: Icon, label, value, href }) => (
					<div
						key={label}
						className="flex items-center gap-4 rounded-2xl ring-2 ring-wine-berry-950 px-4 py-4"
					>
						<span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cream-can-300 text-xl">
							<Icon aria-hidden />
						</span>
						<div className="min-w-0">
							<dt className="font-mono text-xs font-bold tracking-widest uppercase text-wine-berry-800">
								{label}
							</dt>
							<dd className="text-lg md:text-xl font-extrabold">
								{href ? (
									<a
										href={href}
										target="_blank"
										rel="noopener noreferrer"
										className="underline-offset-4 hover:underline"
									>
										{value}
									</a>
								) : (
									value
								)}
							</dd>
						</div>
					</div>
				))}
			</dl>

			<p className="mt-4 text-center text-sm md:text-base text-wine-berry-900">
				{event.venue.name}
				{event.venue.address ? `, ${event.venue.address}` : ""}
			</p>

			<div className="mt-8 flex flex-col items-center gap-2">
				<RegisterButton
					registration={event.registration}
					variant="solid"
				/>
				{event.registration.note && (
					<p className="font-mono text-xs md:text-sm font-semibold tracking-wide uppercase">
						{event.registration.note}
					</p>
				)}
			</div>
		</section>
	);
};

export default EventHero;
