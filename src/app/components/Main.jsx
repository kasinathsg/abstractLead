'use client'

import { useEffect, useRef, useState } from "react";
import ModernMBAHero from "./Hero";
import ParallaxSection from "./ParallaxSection";
import WhatWeOfferSection from "./Offer";
import StandingOutSection from "./Features";
import LifeAtLeadSection from "./Life";
import Footer from "./Footer";

const Main = () => {
  const heroRef = useRef(null);
  const parallaxRef = useRef(null);
  const [isHeroSticky, setIsHeroSticky] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return; // Disable scroll logic on mobile

    const handleScroll = () => {
      if (!heroRef.current || !parallaxRef.current) return;

      const heroRect = heroRef.current.getBoundingClientRect();
      const parallaxRect = parallaxRef.current.getBoundingClientRect();

      if (parallaxRect.top <= 0 && parallaxRect.bottom <= window.innerHeight) {
        setIsHeroSticky(false);
      } else if (parallaxRect.top > 0) {
        setIsHeroSticky(true);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  return (
    <main className="relative">
      {/* Hero Section */}
      <div
        ref={heroRef}
        className={`${!isMobile && isHeroSticky ? "sticky top-0" : "relative"} z-10`}
      >
        <ModernMBAHero logoSrc="https://res.cloudinary.com/diuq0mz3b/image/upload/v1760569981/logo_juh3cs.png" />
      </div>

      {/* Parallax Section */}
      <div
        ref={parallaxRef}
        className={`${!isMobile && isHeroSticky ? "sticky top-0" : "relative"} z-10`}
      >
        <ParallaxSection />
      </div>

      <div   ref={parallaxRef}
        className={`${!isMobile && isHeroSticky ? "sticky top-0" : "relative"} z-10`}>
        <WhatWeOfferSection />
      </div>

      <div   ref={parallaxRef}
        className={`${!isMobile && isHeroSticky ? "sticky top-0" : "relative"} z-10`}>
        <StandingOutSection />
      </div>

      <div className="relative z-20">
        <LifeAtLeadSection />
      </div>

      <div className="relative z-20">
        <Footer />
      </div>
    </main>
  );
};

export default Main;
