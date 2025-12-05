"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import {
	FaCalendarDays,
	FaClock,
	FaMapLocationDot,
	FaCode,
	FaCodeCommit,
} from "react-icons/fa6";

gsap.registerPlugin(SplitText);

const Hero: React.FC = () => {
	const container = useRef<HTMLDivElement | null>(null);
	const splitRef = useRef<SplitText | null>(null);
	const backgroundRef = useRef<HTMLDivElement | null>(null);
	const lumaRef = useRef<HTMLDivElement | null>(null);

	useGSAP(
		() => {
			if (splitRef.current) splitRef.current.revert();

			const split = SplitText.create(".text-animation", {
				type: "chars, words, lines",
			});
			splitRef.current = split;

			gsap.set(backgroundRef.current, {
				scaleX: 0,
				transformOrigin: "left center",
			});

			// Hide Luma button initially
			gsap.set(".luma-checkout--button", { autoAlpha: 0, y: 40 });

			const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

			tl.from(split.chars, {
				y: 100,
				autoAlpha: 0,
				stagger: {
					amount: 1,
					from: "random",
					yoyo: true,
				},
				duration: 1.2,
			});

			// Yellow box animation
			tl.to(backgroundRef.current, {
				scaleX: 1,
				autoAlpha: 1,
				duration: 1.2,
			});

			// Add a small delay before showing Luma button
			tl.to(
				".luma-checkout--button",
				{
					y: 0,
					autoAlpha: 1,
					duration: 0.8,
					ease: "power2.inOut",
				},
				"+=0.1" // 👈 delay 0.5s after yellow box animation
			);
		},
		{ scope: container }
	);

	// 👇 Load Luma script once on mount
	useEffect(() => {
		const script = document.createElement("script");
		script.src = "https://embed.lu.ma/checkout-button.js";
		script.id = "luma-checkout";
		script.async = true;
		lumaRef.current?.appendChild(script);

		return () => {
			// Clean up old script on unmount
			if (lumaRef.current?.contains(script)) {
				lumaRef.current.removeChild(script);
			}
		};
	}, []);

	return (
		<div
			ref={container}
			className="flex flex-col max-w-8/10 mx-auto mt-4"
		>
			<div className="text-animation text-neutral-950 dark:text-neutral-100 font-bold text-5xl md:text-7xl lg:text-8xl py-4">
				PyLanna
			</div>

			<div className="text-animation md:text-neutral-800 text-neutral-600 dark:text-neutral-300 md:font-medium lg:text-3xl md:text-2xl text-xl md:my-8 md:py-2 mb-8">
				Python User Group Community of Northern Thailand
			</div>

			{/* ✅ Optional yellow box section to reference animation */}
			<div
				ref={backgroundRef}
				className="dark:text-cream-can-200 text-wine-berry-950  text-md md:text-xl lg:text-2xl py-6  inline-block self-center text-centermin-w-screen"
			>
				<p className="text-center font-medium">
					Welcome to our Open House Event
				</p>
				<div className="mt-2 flex gap-4">
					<FaCalendarDays />
					<span>25 December 2025</span>
				</div>
				<div className="mt-2 flex gap-4">
					<FaClock />
					<span>6 PM (Register)</span>
				</div>
				<div className="mt-2 flex gap-4">
					<FaMapLocationDot />
					<span>Builds CMU</span>
				</div>
			</div>

			{/* ✅ Luma Embed Here */}
			<div
				ref={lumaRef}
				className="my-4 flex justify-center"
			>
				<a
					href="https://luma.com/event/evt-0F2MktKbup1EDHy"
					className="luma-checkout--button  ring-cream-can-300 ring-2"
					data-luma-action="checkout"
					data-luma-event-id="evt-0F2MktKbup1EDHy"
				>
					{/* <p className="font-medium">Register NOW 🎉</p> */}
					<div className="flex gap-2 items-center dark:text-cream-can-200 font-semi text-md md:text-xl lg:text-2xl text-cream-can-300 px-4 py-2">
						<FaCodeCommit />
						<span>Register NOW</span>
					</div>
				</a>
			</div>
		</div>
	);
};

export default Hero;
