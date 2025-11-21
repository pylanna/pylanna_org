"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { mainNav } from "@/config/navigation";
import { FaFacebook } from "react-icons/fa6";

const Header: React.FC = () => {
	const linkClasses =
		"p-2 md:border-b-2 md:border-transparent md:hover:border-cream-can-400 transition cursor-pointer hover:font-semibold";
	const navLinkClasses =
		"text-wine-berry-700 hover:text-wine-berry-950 transition-colors";

	return (
		<header className="sticky top-0 z-10 w-full bg-wine-berry-50 dark:bg-neutral-950 shadow-lg py-4 px-6 flex justify-between items-center border-b border-wine-berry-100 dark:border-neutral-600 h-16">
			{/* Logo + Title */}
			<Link
				href="/"
				className="flex items-center space-x-3"
			>
				<Image
					src="/logo.png"
					alt="PyLanna Logo"
					width={40}
					height={40}
					className="rounded-full"
				/>
				<h1 className="text-base font-bold md:text-2xl md:font-extrabold text-wine-berry-950 dark:text-cream-can-300">
					PyLanna
				</h1>
			</Link>

			{/* NAVIGATION */}
			<div className="flex items-center gap-6 text-lg font-medium">
				{/* Desktop view — text labels */}
				<nav className="text-wine-berry-950 hidden md:flex items-center gap-4">
					{mainNav.map((item) => (
						<Link
							key={item.label}
							href={item.href}
							className={`${linkClasses} ${navLinkClasses} dark:text-neutral-300 dark:hover:text-cream-can-400`}
						>
							{item.label}
						</Link>
					))}
				</nav>

				{/* Mobile view — icons */}
				<nav className="flex md:hidden items-center gap-6">
					{mainNav.map((item) => {
						const Icon = item.icon as React.ComponentType;
						return (
							<Link
								key={item.label}
								href={item.href}
								className="text-2xl text-wine-berry-950 dark:text-cream-can-300 hover:text-wine-berry-700 dark:hover:text-cream-can-400 transition-colors "
								aria-label={item.label}
							>
								{Icon ? <Icon /> : item.label[0]}
							</Link>
						);
					})}
				</nav>

				{/* Facebook link (always visible) */}
				<Link
					href="https://www.facebook.com/groups/1181951933835645"
					target="_blank"
					rel="noopener noreferrer"
					className={`text-2xl text-wine-berry-950 dark:text-cream-can-300 hover:text-wine-berry-700 dark:hover:text-cream-can-400 transition-colors  md:dark:text-neutral-300 md:dark:hover:text-cream-can-400 p-2 border-transparent  cursor-pointer hover:font-semibold `}
					aria-label="Facebook Group"
				>
					<FaFacebook />
				</Link>
			</div>
		</header>
	);
};

export default Header;
