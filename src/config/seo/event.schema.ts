import {
	getEventEndIso,
	getEventStartIso,
	type PyLannaEvent,
} from "@/data/events";

const SITE_URL = "https://www.pylanna.org";

// schema.org Event JSON-LD so search engines can show date, venue and seats
export function buildEventSchema(event: PyLannaEvent) {
	return {
		"@context": "https://schema.org",
		"@type": "Event",
		name: event.subtitle ? `${event.title} – ${event.subtitle}` : event.title,
		description: event.description,
		startDate: getEventStartIso(event),
		endDate: getEventEndIso(event),
		eventStatus: "https://schema.org/EventScheduled",
		eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
		location: {
			"@type": "Place",
			name: event.venue.name,
			address: {
				"@type": "PostalAddress",
				addressLocality: "Chiang Mai",
				addressRegion: "Chiang Mai",
				addressCountry: "TH",
				...(event.venue.address && { streetAddress: event.venue.address }),
			},
		},
		image: event.ogImage ? [`${SITE_URL}${event.ogImage}`] : undefined,
		organizer: {
			"@type": "Organization",
			name: "PyLanna",
			url: SITE_URL,
		},
		...(event.seats && { maximumAttendeeCapacity: event.seats }),
		offers: {
			"@type": "Offer",
			url: event.registration.url,
			price: 0,
			priceCurrency: "THB",
			availability: "https://schema.org/LimitedAvailability",
		},
	};
}
