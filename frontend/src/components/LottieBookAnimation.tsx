"use client";

import React, { useRef, useEffect } from "react";
import lottie from "lottie-web";

// Import the animation data directly in the component
// We'll create a safer way to import the JSON
export default function LottieBookAnimation() {
  const container = useRef<HTMLDivElement>(null);
  const animationInstance = useRef<ReturnType<typeof lottie.loadAnimation> | null>(null);
  
  useEffect(() => {
    // Safe check for browser environment
    if (typeof window === 'undefined') return;
    
    // Dynamic import of the animation data
    const loadAnimation = async () => {
      try {
        // Dynamically import the animation data
        const animationModule = await import("../app/Animation - 1740330503659.json");
        const animationData = animationModule.default;
        
        if (container.current) {
          animationInstance.current = lottie.loadAnimation({
            container: container.current,
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData: animationData,
          });
        }
      } catch (error) {
        console.error("Failed to load animation:", error);
      }
    };
    
    loadAnimation();
    
    return () => {
      if (animationInstance.current) {
        animationInstance.current.destroy();
      }
    };
  }, []);
  
  return <div className="w-full h-full" ref={container}></div>;
}