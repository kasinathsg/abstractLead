"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
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
  weight: "800",
});

const barlowSmall = Barlow_Semi_Condensed({
  subsets: ["latin"],
  weight: "400",
});

export default function ModernMBAHero({ logoSrc }) {
  const underlineRef = useRef(null);
  const heroRef = useRef(null);
  const [underlineDrawn, setUnderlineDrawn] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);
  const [activeMenu, setActiveMenu] = useState(null);
  const menuRef = useRef(null);

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
      className="relative  w-full h-screen flex flex-col overflow-hidden bg-white"
    >
{/* ===== NAVBAR ===== */}
<header className="w-full px-6 md:px-8 py-6 flex items-center justify-between z-30 relative">
  {/* Logo left */}
  <div className="flex items-center gap-4">
    {logoSrc ? (
      <Image
        src={"https://res.cloudinary.com/diuq0mz3b/image/upload/v1760569981/logo_juh3cs.png"}
        alt="College logo"
        width={120}
        height={40}
        className="object-contain"
      />
    ) : (
      <div className="h-10 w-10 bg-slate-800 rounded-md flex items-center justify-center text-white font-semibold">
        MBA
      </div>
    )}
  </div>

  {/* Nav center */}
  <nav ref={menuRef} className="hidden md:flex items-center gap-6 mx-auto">
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
            className={`text-md font-medium text-slate-700 hover:text-slate-900 transition-colors cursor-pointer ${barlowSmall.className}`}
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
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:text-slate-900 cursor-pointer"
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

  {/* Right: Download Prospectus */}
  <div className="hidden md:flex">
    <a
  
      className={`px-6 py-3 rounded-md bg-slate-900 text-white text-sm font-medium shadow-md hover:-translate-y-0.5 transition-transform ${barlowSmall.className}`}
    >
      Download Prospectus
    </a>
  </div>

  {/* Mobile hamburger */}
  <div className="md:hidden">
    <button className="p-2 rounded-md bg-white shadow-sm">
      <svg
        width="22"
        height="22"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
  </div>
</header>
      {/* ===== HERO CONTENT ===== */}
      <div className="flex  flex-col md:flex-row items-center w-full h-full px-6 md:px-0 gap-4 md:gap-0">
        {/* Left: Text */}
        <div
          className="flex flex-col justify-center w-full md:w-[45%] h-full md:pl-24 lg:pl-32"
          style={{ transform: `translateY(${parallaxY}px)` }}
        >
          <h1
            className={`text-4xl sm:text-5xl lg:text-5xl leading-tight tracking-tight text-slate-900 ${barlowSemi.className}`}
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
                    transition:
                      "stroke-dashoffset 6s cubic-bezier(.22,.9,.33,1)",
                  }}
                />
              </svg>
            </div>
          </h1>
          <p className={`mt-6 text-lg text-slate-600 ${barlowSmall.className}`}>
            Unlock your potential and become a future business leader with us.
            Enroll now and take the lead in shaping your successful career!
          </p>
{/* ===== HERO BUTTONS ===== */}
<div className="mt-8 flex gap-4 items-center">
  <a
    href="#admissions"
    className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-slate-900 text-white text-sm font-medium ${barlowSmall.className} shadow-lg transform transition-transform hover:-translate-y-0.5`}
  >
    Apply Now
  </a>
  <a
    href="#programs"
    className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-white text-slate-900 text-sm font-medium ${barlowSmall.className} shadow-lg transform transition-transform hover:-translate-y-0.5`}
  >
    Explore Programs
  </a>
</div>
        </div>

        {/* Right: Hero Image */}
{/* Right: Hero Image with Floating Boxes */}
<div className="relative w-full md:w-[55%] h-full flex items-end justify-center md:pr-24 lg:pr-32">
  <Image
    src={"https://res.cloudinary.com/diuq0mz3b/image/upload/v1760569778/beautiful-redhead-female-graduate-smiling-holding-books-diploma_mq79j8.png"}
    alt="Graduate woman"
    fill
    className="object-cover object-bottom"
    priority
  />

  {/* ===== FLOATING BOXES ===== */}
  <div className="absolute inset-0 pointer-events-none">
    {/* Top Floating Box */}
    <div className="absolute top-[10%] left-[15%] md:left-[25%] animate-float-slow">
      <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md shadow-2xl rounded-xl px-5 py-3 border border-slate-100 transform rotate-[-2deg]">
        <div className="bg-sky-500 text-white p-2 rounded-lg">
          <Lightbulb size={18} />
        </div>
        <div className={`${barlowSmall.className} text-slate-800 text-sm font-medium`}>
          Ranked Among Top <br /> Business Schools
        </div>
      </div>
    </div>

    {/* Left Floating Box */}
    <div className="absolute top-[45%] left-[5%] md:left-[15%] animate-float-medium">
      <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md shadow-2xl rounded-xl px-5 py-3 border border-slate-100 transform rotate-[1.5deg]">
        <div className="bg-amber-400 text-white p-2 rounded-lg">
          <Users size={18} />
        </div>
        <div className={`${barlowSmall.className} text-slate-800 text-sm font-medium`}>
          5000+ Alumni <br /> Global Network
        </div>
      </div>
    </div>

    {/* Right Bottom Floating Box */}
    <div className="absolute bottom-[12%] right-[8%] animate-float-fast">
      <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md shadow-2xl rounded-xl px-5 py-3 border border-slate-100 transform rotate-[-1deg]">
        <div className="bg-emerald-500 text-white p-2 rounded-lg">
          <Briefcase size={18} />
        </div>
        <div className={`${barlowSmall.className} text-slate-800 text-sm font-medium`}>
          100% Placement <br /> Assistance
        </div>
      </div>
    </div>
  </div>
</div>

      </div>

      <style jsx global>{`
  @keyframes floatSlow {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  @keyframes floatMedium {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-14px); }
  }

  @keyframes floatFast {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }

  .animate-float-slow {
    animation: floatSlow 6s ease-in-out infinite;
  }

  .animate-float-medium {
    animation: floatMedium 5s ease-in-out infinite;
  }

  .animate-float-fast {
    animation: floatFast 4s ease-in-out infinite;
  }
`}</style>

    </section>
  );
}