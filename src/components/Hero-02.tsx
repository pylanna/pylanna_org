"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import {
  FaCalendarDays,
  FaClock,
  FaMapLocationDot,
  FaCodeCommit,
} from "react-icons/fa6";

gsap.registerPlugin(SplitText);

const Hero2: React.FC = () => {
  const container = useRef<HTMLDivElement | null>(null);
  const splitRef = useRef<SplitText | null>(null);
  const backgroundRef = useRef<HTMLDivElement | null>(null);
  const registerBtnRef = useRef<HTMLDivElement | null>(null);

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

      gsap.set(registerBtnRef.current, {
        y: 40,
        autoAlpha: 0,
      });

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
      tl.to(registerBtnRef.current, {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
      });
    },
    { scope: container },
  );

  return (
    <div ref={container} className="flex flex-col max-w-8/10 mx-auto mt-4">
      <div className="text-animation text-neutral-950 dark:text-neutral-100 font-bold text-5xl md:text-7xl lg:text-8xl py-4">
        PyLanna x THMUG
      </div>

      <div className="text-animation md:text-neutral-800 text-neutral-600 dark:text-neutral-300 md:font-medium lg:text-3xl md:text-2xl text-xl md:my-8 md:py-2 mb-8">
        MUG Thailand Meetup #06
      </div>

      {/* ✅ Optional yellow box section to reference animation */}
      <div
        ref={backgroundRef}
        className="dark:text-cream-can-200 text-wine-berry-950  text-md md:text-xl lg:text-2xl py-4  flex flex-col justify-center items-center w-full"
      >
        <p className="mb-8 tracking-wide font-mono border-l-4 pl-8">
          From Django fundamentals to MongoDB CRUD operations
          <span className="block mt-4">
            Learn how to build practical Python applications with modern
            database tools
          </span>
        </p>

        <div>
          <div className="mt-2 flex gap-4 items-center ">
            <FaCalendarDays />
            <span>28 March 2026 &nbsp;&nbsp;(Saturday)</span>
          </div>
          <div className="mt-2 flex gap-4 items-center">
            <FaClock />
            <span>2 PM - 5 PM</span>
          </div>
          <div className="mt-2 flex gap-4 items-center">
            <FaMapLocationDot />
            <span>
              Science and Technology Park, Chiang Mai University &nbsp;&nbsp;
              <span className="hover:underline-offset-8 inline-block hover:underline">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=18.764784%2C%2098.937065"
                  target="_blank"
                >
                  (CMU STeP)
                </a>
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* register */}
      <div ref={registerBtnRef} className="my-4 flex justify-center">
        <a
          href="https://www.meetup.com/mongodb-usergroup-thailand/events/313289045"
          target="_blank"
          className="ring-cream-can-300 ring-2 rounded-full py-2 px-4 mt-2 hover:scale-105 hover:font-semibold"
        >
          <div className="flex gap-2 items-center dark:text-cream-can-200 text-md md:text-xl lg:text-2xl text-cream-can-300 px-4 py-2">
            <FaCodeCommit />
            <span>Register NOW</span>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Hero2;
