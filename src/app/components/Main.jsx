'use client'

import { useEffect, useRef, useState } from "react";
import ModernMBAHero from "./Hero";
import ParallaxSection from "./ParallaxSection";
import WhatWeOfferSection from "./Offer";


import logo from "../../../public/logo.png";

const Main = () => {
const heroRef = useRef(null);
const parallaxRef = useRef(null);

  const [isHeroSticky, setIsHeroSticky] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current || !parallaxRef.current) return;

      const heroRect = heroRef.current.getBoundingClientRect();
      const parallaxRect = parallaxRef.current.getBoundingClientRect();

      // When parallax section has fully covered the viewport and scrolled past
      // we release the hero from being sticky
      if (parallaxRect.top <= 0 && parallaxRect.bottom <= window.innerHeight) {
        setIsHeroSticky(false);
      } else if (parallaxRect.top > 0) {
        setIsHeroSticky(true);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative">
      {/* Hero Section - Sticky */}
      <div
        ref={heroRef}
        className={`${isHeroSticky ? "sticky top-0" : "relative"} z-10`}
        style={{ height: isHeroSticky ? "auto" : "auto" }}
      >
          <ModernMBAHero logoSrc={logo}/>
      </div>

      {/* Parallax Section - Overlays Hero */}
      <div ref={parallaxRef}       className={`${isHeroSticky ? "sticky top-0" : "relative"} z-10`}>
        <ParallaxSection />
      </div>

       <div ref={parallaxRef} className="relative z-20">
        <WhatWeOfferSection />
      </div>


    </main>
  );
};

export default Main;
