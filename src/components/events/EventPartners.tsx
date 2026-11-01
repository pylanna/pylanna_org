import React from "react";
import Image from "next/image";
import type { EventPartner } from "@/data/events";

interface EventPartnersProps {
	partners: EventPartner[];
}

const EventPartners: React.FC<EventPartnersProps> = ({ partners }) => (
	<section
		aria-labelledby="partners-heading"
		className="max-w-5xl mx-auto mt-12"
	>
		<h2
			id="partners-heading"
			className="text-2xl md:text-3xl font-extrabold text-wine-berry-950 dark:text-cream-can-300"
		>
			Partners &amp; Supporters
		</h2>

		<ul className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
			{partners.map((partner) => (
				<li
					key={partner.name}
					className="flex h-28 items-center justify-center rounded-2xl bg-white px-4 ring-2 ring-wine-berry-950 dark:ring-neutral-600"
				>
					{partner.logo ? (
						<Image
							src={partner.logo}
							alt={partner.name}
							width={partner.logoWidth ?? 200}
							height={partner.logoHeight ?? 100}
							className="max-h-16 w-auto max-w-full object-contain"
						/>
					) : (
						<span className="text-lg font-bold text-neutral-900">
							{partner.name}
						</span>
					)}
				</li>
			))}
		</ul>
	</section>
);

export default EventPartners;
