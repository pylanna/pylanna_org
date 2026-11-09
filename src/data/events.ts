export type EventPartner = {
	name: string;
	logo?: string;
	logoWidth?: number;
	logoHeight?: number;
	href?: string;
};

export type AgendaItem = {
	start: string;
	end: string;
	title: string;
	// Breaks are shown muted so Sessions stand out
	isBreak?: boolean;
};

export type EventKind = "Meetup" | "Devs Day";

export type PyLannaEvent = {
	slug: string;
	title: string;
	subtitle?: string;
	tagline?: string;
	kind: EventKind;
	description?: string;
	// Calendar day in Asia/Bangkok, YYYY-MM-DD
	date: string;
	startTime?: string;
	endTime?: string;
	// Shown instead of start/end when the event has no fixed end
	timeLabel?: string;
	venue: {
		name: string;
		address?: string;
		mapUrl: string;
	};
	seats?: number;
	registration: {
		url: string;
		label: string;
		note?: string;
	};
	agenda?: AgendaItem[];
	partners?: EventPartner[];
	// Header artwork used by the hero, and the social share image
	// `text` is the part of the title shown beside the logo image
	logo?: { src: string; width: number; height: number; text?: string };
	ogImage?: string;
};

// All events are in Chiang Mai, so dates are compared in Asia/Bangkok (UTC+7)
const BANGKOK_OFFSET = "+07:00";

export const events: PyLannaEvent[] = [
	{
		slug: "cnx-devs-day-2026",
		title: "CNX Devs Day 2026",
		tagline: "NoAI === Not Only AI",
		kind: "Devs Day",
		description:
			"A full day of developer talks on AI-assisted coding, AI memory databases, LLM serving, cloud and observability in Chiang Mai.",
		date: "2026-12-12",
		startTime: "09:00",
		endTime: "16:35",
		venue: {
			name: "Science and Technology Park, Chiang Mai University (CMU STeP)",
			address:
				"Suthep, Mueang Chiang Mai District, Chiang Mai 50200, Thailand",
			mapUrl:
				"https://www.google.com/maps/search/?api=1&query=18.764784%2C%2098.937065",
		},
		seats: 50,
		registration: {
			url: "https://luma.com/a63eb8j0",
			label: "Request to Join",
			note: "50 seats · host approval required",
		},
		agenda: [
			{ start: "09:00", end: "09:30", title: "Registration", isBreak: true },
			{ start: "09:30", end: "09:40", title: "Keynote and Challenge" },
			{
				start: "09:40",
				end: "10:30",
				title: "Not Only AI: Staying in Control When AI Writes the Code",
			},
			{
				start: "10:35",
				end: "11:25",
				title: "Designing DB for AI Memory Layer",
			},
			{
				start: "11:30",
				end: "12:20",
				title: "vLLM: Efficiently Serving Local LLM Model at Scale",
			},
			{ start: "12:20", end: "13:20", title: "Lunch", isBreak: true },
			{ start: "13:20", end: "14:10", title: "Merman Collaborator SIGMA IDP" },
			{ start: "14:15", end: "15:05", title: "Cloud Solution 101" },
			{ start: "15:05", end: "15:15", title: "Afternoon tea", isBreak: true },
			{
				start: "15:15",
				end: "16:05",
				title: "Grafana and Friends (LGTM and Beyond)",
			},
			{
				start: "16:05",
				end: "16:35",
				title: "Redeem, Lucky Draw, and Closing",
				isBreak: true,
			},
		],
		partners: [
			{
				name: "Sukjai Lab",
				logo: "/partners/sukjai-lab.png",
				logoWidth: 432,
				logoHeight: 350,
			},
			{
				name: "MongoDB",
				logo: "/partners/mongodb.png",
				logoWidth: 530,
				logoHeight: 1136,
			},
			{
				name: "PDKM",
				logo: "/partners/pdkm.png",
				logoWidth: 800,
				logoHeight: 218,
			},
			{
				name: "I Gear Geek",
				logo: "/partners/igeargeek.png",
				logoWidth: 800,
				logoHeight: 195,
			},
		],
		logo: {
			src: "/events/cnx-devs-day-logo.png",
			width: 930,
			height: 370,
			text: "Devs Day 2026",
		},
		ogImage: "/og-cnx-devs-day.png",
	},
	{
		slug: "pylanna-x-thmug-meetup-06",
		title: "PyLanna x THMUG",
		subtitle: "MUG Thailand Meetup #06",
		kind: "Meetup",
		description:
			"From Django fundamentals to MongoDB CRUD operations. Learn how to build practical Python applications with modern database tools.",
		date: "2026-03-28",
		startTime: "14:00",
		endTime: "17:00",
		venue: {
			name: "Science and Technology Park, Chiang Mai University (CMU STeP)",
			mapUrl:
				"https://www.google.com/maps/search/?api=1&query=18.764784%2C%2098.937065",
		},
		registration: {
			url: "https://www.meetup.com/mongodb-usergroup-thailand/events/313289045",
			label: "Register NOW",
		},
	},
	{
		slug: "open-house-meetup",
		title: "Open House Meetup",
		kind: "Meetup",
		description: "Welcome to our Open House Event.",
		date: "2025-12-25",
		timeLabel: "6 PM (Register)",
		venue: {
			name: "Builds CMU",
			mapUrl: "https://maps.app.goo.gl/9Pw2XEFauEyFCUgi9",
		},
		registration: {
			url: "https://luma.com/event/evt-0F2MktKbup1EDHy",
			label: "Register NOW",
		},
	},
];

// An event stays "upcoming" until the end of its calendar day in Asia/Bangkok
export function isPastEvent(event: PyLannaEvent, now: Date = new Date()) {
	return now > new Date(`${event.date}T23:59:59${BANGKOK_OFFSET}`);
}

// Soonest event that has not finished, or undefined when nothing is scheduled
export function getUpcomingEvent(now: Date = new Date()) {
	return events
		.filter((event) => !isPastEvent(event, now))
		.sort((a, b) => a.date.localeCompare(b.date))[0];
}

// Past events, most recent first
export function getPastEvents(now: Date = new Date()) {
	return events
		.filter((event) => isPastEvent(event, now))
		.sort((a, b) => b.date.localeCompare(a.date));
}

export function formatEventDate(event: PyLannaEvent) {
	const [year, month, day] = event.date.split("-").map(Number);
	// Noon UTC avoids the date shifting across time zones
	return new Intl.DateTimeFormat("en-GB", {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric",
		timeZone: "UTC",
	}).format(new Date(Date.UTC(year, month - 1, day, 12)));
}

export function formatEventTime(event: PyLannaEvent) {
	if (event.startTime && event.endTime) {
		return `${event.startTime} – ${event.endTime}`;
	}
	return event.timeLabel ?? event.startTime ?? "";
}

export function getEventStartIso(event: PyLannaEvent) {
	return event.startTime
		? `${event.date}T${event.startTime}:00${BANGKOK_OFFSET}`
		: event.date;
}

export function getEventEndIso(event: PyLannaEvent) {
	return event.endTime
		? `${event.date}T${event.endTime}:00${BANGKOK_OFFSET}`
		: undefined;
}
