import React from "react";
import { FaPython, FaUserGroup } from "react-icons/fa6";

export type NavItem = {
	label: string;
	href: string;
	icon?: string | React.ComponentType;
};

// 2. Define the main navigation array (for the Header)
export const mainNav: NavItem[] = [
	{
		label: "Meetups",
		href: "https://luma.com/nehtko39?tk=6eDwg5",
		icon: FaPython,
	},
	// {
	// 	label: "Blog",
	// 	href: "/",
	// },
	// {
	// 	label: "About",
	// 	href: "/",
	// },
	{
		label: "Team",
		href: "/team",
		icon: FaUserGroup,
	},
	// {
	// 	label: "Contact",
	// 	href: "/contact",
	// },
];

// 3. Define the external social/community links (optional, for Footer)
// export const communityLinks: NavItem[] = [
// 	{
// 		label: "GitHub",
// 		href: "https://github.com/PyLanna-Community",
// 	},
// 	{
// 		label: "Discord",
// 		href: "https://discord.gg/PyLanna",
// 	},
// 	{
// 		label: "Contact",
// 		href: "mailto:contact@pylanna.org",
// 	},
// ];
