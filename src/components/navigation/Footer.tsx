import React from "react";

const Footer: React.FC = () => {
	return (
		<footer className="w-full bg-wine-berry-950 text-cream-can-300 p-8 text-center text-sm mt-auto shadow-inner">
			<div className="max-w-7xl mx-auto space-y-3">
				<p className="text-base font-semibold">
					&copy; {new Date().getFullYear()} PyLanna - Python User Group
					Community of Northern Thailand
				</p>

				<p className="text-wine-berry-200 hidden md:block">
					A hub for learning, networking, and deepening Python skills.
				</p>

				{/* Simple Social/Link Placeholders */}
				{/* <div className="flex justify-center space-x-6 text-xl">
					<a
						href="#"
						title="GitHub Link"
						className="hover:text-cream-can-400 transition"
					>
						<span className="text-2xl">🔗</span>
					</a>
					<a
						href="#"
						title="Meetup Group"
						className="hover:text-cream-can-400 transition"
					>
						<span className="text-2xl">🗓️</span>
					</a>
					<a
						href="#"
						title="Discord/Community Chat"
						className="hover:text-cream-can-400 transition"
					>
						<span className="text-2xl">💬</span>
					</a>
				</div> */}
			</div>
		</footer>
	);
};

export default Footer;
