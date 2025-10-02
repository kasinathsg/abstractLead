"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import CardSwap, { Card } from "../../components/CardSwap";
import {
  BookText,
  Eye,
  Users,
  MessageSquare,
  Shield,
  Image as ImageIcon,
  BookOpen,
  Calendar,
  Newspaper,
  FileCheck,
  FileDown,
  MousePointerClick,
  FileBarChart,
  Lightbulb,
  Briefcase,
  FlaskConical,
} from "lucide-react";
import { Barlow_Semi_Condensed } from "next/font/google";

const barlowSemi = Barlow_Semi_Condensed({
  subsets: ["latin"],
  weight: "800", // ExtraBold
});

const barlowSmall = Barlow_Semi_Condensed({
  subsets: ["latin"],
  weight: "400", // Regular
});

export default function ModernMBAHero({ logoSrc }) {
  const underlineRef = useRef(null);
  const heroRef = useRef(null);
  const [underlineDrawn, setUnderlineDrawn] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);
  const [activeMenu, setActiveMenu] = useState(null);
  const menuRef = useRef(null);

  const campusImages = ["/one.jpg", "/twoimage.jpg", "/threeimagejpg.jpg"];

  useEffect(() => {
    const onScroll = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      const diff = (window.innerHeight / 2 - centerY) / 20;
      setParallaxY(diff);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = (idx) => {
    setActiveMenu(activeMenu === idx ? null : idx);
  };

  useEffect(() => {
    if (!underlineRef.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setUnderlineDrawn(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    obs.observe(underlineRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative bg-gradient-to-b from-white via-slate-50 to-white overflow-hidden pb-40 lg:pb-60"
      // Ensure the hero has a good minimum height on large screens while staying responsive.
      style={{ minHeight: "780px" }}
    >
      {/* Decorative shapes */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl transform-gpu"
        style={{
          background:
            "linear-gradient(135deg, rgba(8, 94, 170, 0.25) 0%, rgba(51, 153, 255, 0.05) 80%)",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-24 w-80 h-80 rounded-full opacity-20 blur-2xl transform-gpu"
        style={{ background: "linear-gradient(135deg,#7dd3fc,#60a5fa)" }}
      />

      {/* Header */}
      <header className="max-w-7xl mx-auto px-6 md:px-8 py-6 flex items-center justify-between z-30 relative">
        <div className="flex items-center gap-4">
          {logoSrc ? (
            <Image
              src={logoSrc}
              alt="College logo"
              width={120}
              height={40}
              className="object-contain"
            />
          ) : (
            <div className="h-10 w-10 bg-slate-800 rounded-full flex items-center justify-center text-white font-semibold">
              MBA
            </div>
          )}
          <span className="sr-only">MBA College</span>
        </div>

        <nav ref={menuRef} className="hidden md:flex items-center gap-6">
          {[
            {
              title: "About Us",
              items: [
                { label: "The Lead Story", icon: BookText },
                { label: "Vision and Mission", icon: Eye },
                { label: "Leadership", icon: Users },
                { label: "Director's Message", icon: MessageSquare },
                { label: "Policies", icon: Shield },
                { label: "Gallery", icon: ImageIcon },
              ],
            },
            {
              title: "Academics",
              items: [
                { label: "MBA", icon: BookOpen },
                { label: "MCA", icon: BookOpen },
                { label: "Academic Calendar", icon: Calendar },
                { label: "Newsletter", icon: Newspaper },
              ],
            },
            {
              title: "Admissions",
              items: [
                { label: "Overview", icon: FileCheck },
                { label: "Brochure", icon: FileDown },
                { label: "Apply Online", icon: MousePointerClick },
              ],
            },
            {
              title: "Research",
              items: [
                { label: "Publications", icon: FileBarChart },
                { label: "Leader Journal", icon: Lightbulb },
                { label: "Consulting and Projects", icon: Briefcase },
                { label: "Lead Research Center", icon: FlaskConical },
              ],
            },
          ].map((nav, idx) => {
            const isOpen = activeMenu === idx;
            return (
              <div key={idx} className="relative">
                <button
                  onClick={() => toggleMenu(idx)}
                  className={`text-lg font-medium text-slate-700 hover:text-slate-900 transition-colors ${barlowSmall.className} cursor-pointer`}
                >
                  {nav.title}
                </button>
                <div
                  className={`absolute right-0 mt-3 w-56 bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-out ${
                    isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                  }`}
                  style={{
                    transformOrigin: "top right",
                    maxHeight: isOpen ? `${nav.items.length * 48}px` : "0px",
                    clipPath: isOpen ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
                  }}
                >
                  <ul className="py-2">
                    {nav.items.map((item, i2) => {
                      const ItemIcon = item.icon;
                      return (
                        <li key={i2} className={`hover:bg-slate-50 ${barlowSmall.className}`}>
                          <a
                            href="#"
                            className="flex items-center gap-2.5 px-4 py-2.5 text-md text-slate-700 hover:text-slate-900 cursor-pointer"
                          >
                            <ItemIcon size={16} className="flex-shrink-0" />
                            <span>{item.label}</span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            );
          })}
        </nav>

        <div className="md:hidden">
          <button className="p-2 rounded-md bg-white shadow-sm">
            <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Hero content */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 lg:py-28 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left */}
        <div className="lg:col-span-6 z-20 relative">
          <div className="max-w-2xl" style={{ transform: `translateY(${parallaxY}px)` }}>
            <h1
              className={`text-4xl sm:text-5xl lg:text-6xl leading-tight tracking-tight text-slate-900 ${barlowSemi.className}`}
            >
              <div>Reinventing Business.</div>
              <div className="mt-2 relative inline-block">
                Redefining You.
                <svg
                  ref={underlineRef}
                  viewBox="0 0 400 60"
                  className="absolute left-0 -bottom-3 w-full h-6"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 30 C100 -10, 300 70, 380 30"
                    fill="none"
                    stroke="#085eaa"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      strokeDasharray: 1000,
                      strokeDashoffset: underlineDrawn ? 0 : 1000,
                      transition: "stroke-dashoffset 6s cubic-bezier(.22,.9,.33,1)",
                    }}
                  />
                </svg>
              </div>
            </h1>

            <p className={`mt-6 text-lg text-slate-600 ${barlowSmall.className}`}>
              Unlock your potential and become a future business leader with us. Enroll now and take the lead in shaping your successful career!
            </p>

            <div className="mt-8 flex gap-4 items-center">
              <a
                href="#admissions"
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 text-white text-sm font-medium ${barlowSmall.className} shadow-lg transform transition-transform hover:-translate-y-1`}
              >
                Apply Now
              </a>
              <a href="#programs" className={`text-sm text-slate-700 hover:text-slate-900 ${barlowSmall.className}`}>
                Explore Programs
              </a>
            </div>
          </div>
        </div>

        {/* Right - React Bits CardSwap */}
        <div className="lg:col-span-6 z-10 relative">
          <div style={{ height: "400px", position: "relative" }}>
            <CardSwap cardDistance={60} verticalDistance={70} delay={3000} pauseOnHover={false}>
              {campusImages.map((img, idx) => (
                <Card key={idx}>
                  <Image src={img} alt={`Campus ${idx}`} fill className="object-cover rounded-xl" />
                </Card>
              ))}
            </CardSwap>
          </div>
        </div>
      </div>

      {/* Optional extra spacer — adjust h-24 / h-40 for more/less extra bottom area */}
      <div className="w-full" aria-hidden>
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="h-24 lg:h-40" />
        </div>
      </div>
    </section>
  );
}
