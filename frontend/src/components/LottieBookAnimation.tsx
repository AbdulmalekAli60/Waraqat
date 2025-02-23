"use client";
import React, { useRef, useEffect } from "react";
import lottie from "lottie-web";
import animationData from "../app/Animation - 1740330503659.json";
export default function LottieBookAnimation() {
  const container = useRef(null);

  useEffect(() => {
    if (container.current) {
      lottie.loadAnimation({
        container: container.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: animationData, 
      });
    }
  }, []);

  return <div ref={container}></div>;
}
