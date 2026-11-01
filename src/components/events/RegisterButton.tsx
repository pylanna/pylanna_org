import React from "react";
import { FaCodeCommit } from "react-icons/fa6";
import type { PyLannaEvent } from "@/data/events";

interface RegisterButtonProps {
	registration: PyLannaEvent["registration"];
	// "solid" sits on the poster-style card, "outline" on the themed page
	variant?: "solid" | "outline";
}

const variantClasses = {
	solid:
		"bg-wine-berry-950 text-cream-can-300 ring-2 ring-wine-berry-950 hover:bg-wine-berry-800",
	outline:
		"text-wine-berry-950 dark:text-cream-can-200 ring-2 ring-cream-can-300 hover:scale-105",
};

const RegisterButton: React.FC<RegisterButtonProps> = ({
	registration,
	variant = "outline",
}) => (
	<a
		href={registration.url}
		target="_blank"
		rel="noopener noreferrer"
		className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-lg md:text-xl font-semibold transition ${variantClasses[variant]}`}
	>
		<FaCodeCommit aria-hidden />
		<span>{registration.label}</span>
	</a>
);

export default RegisterButton;
