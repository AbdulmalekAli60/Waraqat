"use client";
import React, { useRef, useEffect } from "react";
import lottie from "lottie-web";
import animationData from "../app/Animation - 1740330503659.json";

export default function LottieBookAnimation() {
  const container = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const animationInstance = useRef<any>(null);

  useEffect(() => {
    if (container.current) {
      animationInstance.current = lottie.loadAnimation({
        container: container.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: animationData,
      });
    }

    return () => {
      if (animationInstance.current) {
        animationInstance.current.destroy();
      }
    };
  }, []);

  return <div className="w-full h-full" ref={container}></div>;
}
