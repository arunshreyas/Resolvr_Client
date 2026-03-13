"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { LoadingUI } from "./LoadingUI";

/**
 * MANDATORY 1s PAGE TRANSITION
 * 
 * Logic:
 * - Listens for pathname change.
 * - Forces 1000ms "transitioning" state.
 * - Shows LoadingUI overlay until delay expires.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [showContent, setShowContent] = useState(true);

  useEffect(() => {
    // 1. Kick off the transition sequence
    setIsOverlayVisible(true);
    setShowContent(false);

    // 2. Middle of animation: swap the children
    const swapTimer = setTimeout(() => {
      setDisplayChildren(children);
      setShowContent(true);
    }, 500);

    // 3. End of animation: fade out the overlay
    const endTimer = setTimeout(() => {
      setIsOverlayVisible(false);
    }, 1000);

    return () => {
      clearTimeout(swapTimer);
      clearTimeout(endTimer);
    };
  }, [pathname, children]);

  return (
    <>
      <div className={`transition-opacity duration-500 fixed inset-0 z-[100] pointer-events-none ${isOverlayVisible ? "opacity-100" : "opacity-0"}`}>
        <LoadingUI />
      </div>
      <div className={`transition-opacity duration-300 ${showContent ? "opacity-100" : "opacity-0"}`}>
        {displayChildren}
      </div>
    </>
  );
}
