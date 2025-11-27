"use client";
import React, { useState, useEffect } from "react";
import NavDesktop from "./nav-desktop";
import NavMobile from "./nav-mobile";

const SideBar = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return <NavMobile />;
  }
  return <NavDesktop />;
};

export default SideBar;