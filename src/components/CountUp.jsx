"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";

// Counts from 0 to `to` the first time it scrolls into view.
export default function CountUp({ to, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (value) => {
        if (ref.current) ref.current.textContent = `${Math.round(value)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, to, suffix]);

  return <span ref={ref}>{`0${suffix}`}</span>;
}
