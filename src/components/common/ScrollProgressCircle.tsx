"use client";

import { useState, useEffect } from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function ScrollProgressCircle() {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  const styles = buildStyles({
    pathColor: "#ffc400",
    trailColor: "#FFFFFF",
    backgroundColor: "#FFFFFF",
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const percentage = (scrollTop / scrollHeight) * 100;
      setScrollPercentage(percentage);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Link
      href="/blog"
      className="hidden md:block w-16 fixed top-52 left-20 hover:scale-110 transition-all"
    >
      <svg style={{ position: "absolute" }} width="0" height="0">
        <defs>
          <filter id="drop-shadow" y="-25%" width="200%" height="200%">
            <feDropShadow
              dx="0"
              dy="3"
              stdDeviation="3"
              floodColor="rgba(0, 0, 0, 0.3)"
            />
          </filter>
        </defs>
      </svg>
      <CircularProgressbarWithChildren
        value={scrollPercentage + 10}
        strokeWidth={2}
        background={true}
        styles={{
          ...styles,
          root: { filter: "url(#drop-shadow)" },
        }}
        className="w-16"
      >
        <ArrowLeftIcon className="h-6 w-6" />
      </CircularProgressbarWithChildren>
    </Link>
  );
}
