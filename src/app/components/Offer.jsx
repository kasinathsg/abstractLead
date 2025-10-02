import { useEffect, useRef, useState } from "react";
import { Home, Clock, Lightbulb } from "lucide-react";
import { Barlow_Semi_Condensed } from "next/font/google";
import LaptopMockup from "./Laptop";

const barlowExtraBold = Barlow_Semi_Condensed({ subsets: ["latin"], weight: "800" });
const barlowBold = Barlow_Semi_Condensed({ subsets: ["latin"], weight: "700" });
const barlowRegular = Barlow_Semi_Condensed({ subsets: ["latin"], weight: "400" });

const OPEN_DELAY_MS = 400; // laptop opening delay

const WhatWeOfferSection = () => {
  const sectionRef = useRef(null);
  const [isMockupOpened, setIsMockupOpened] = useState(false);

  // controls reveal state for each card
  const [visibleCards, setVisibleCards] = useState([false, false, false]);
  const timersRef = useRef([]);

  // detect reduced motion preference
  const prefersReducedMotion = typeof window !== "undefined"
    ? window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Open laptop after delay
            const timer = window.setTimeout(() => setIsMockupOpened(true), OPEN_DELAY_MS);
            timersRef.current.push(timer);
          } else {
            // Section is scrolled past or above viewport, close laptop and reset cards
            setIsMockupOpened(false);
            setVisibleCards([false, false, false]);
            // clear any pending timers (safety)
            timersRef.current.forEach((t) => clearTimeout(t));
            timersRef.current = [];
          }
        });
      },
      { threshold: 0.5 } // trigger when 50% visible
    );

    observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      timersRef.current.forEach((t) => clearTimeout(t));
      timersRef.current = [];
    };
  }, []);

  // When mockup opens, start revealing cards one-by-one
  useEffect(() => {
    // clear previous timers
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];

    if (isMockupOpened) {
      if (prefersReducedMotion) {
        // If reduced motion requested, show all at once
        setVisibleCards([true, true, true]);
        return;
      }

      const STAGGER_MS = 260; // time between card starts
      const START_DELAY_MS = 320; // slight delay before first card begins (keeps in sync with laptop)
      const newVisible = [false, false, false];

      // schedule reveal for each card
      for (let i = 0; i < newVisible.length; i++) {
        const t = window.setTimeout(() => {
          // reveal the card
          setVisibleCards((prev) => {
            const copy = [...prev];
            copy[i] = true;
            return copy;
          });
        }, START_DELAY_MS + i * STAGGER_MS);
        timersRef.current.push(t);
      }
    } else {
      // close -> hide cards
      setVisibleCards([false, false, false]);
    }

    return () => {
      timersRef.current.forEach((t) => clearTimeout(t));
      timersRef.current = [];
    };
  }, [isMockupOpened, prefersReducedMotion]);

const features = [
  {
    icon: Home,
    title: "Fully Residential",
    description:
      "Immerse yourself in a vibrant campus environment designed to foster collaboration.",
    color: "bg-blue-500/20",
    iconColor: "text-blue-400",
  },
  {
    icon: Clock,
    title: "Flexible Timing",
    description:
      "Balance academic rigor with personal and professional commitments.",
    color: "bg-purple-500/20",
    iconColor: "text-purple-400",
  },
  {
    icon: Lightbulb,
    title: "Life Skill Training",
    description:
      "Gain essential life skills through experiential learning that bridges knowledge and wisdom. ",
    color: "bg-amber-500/20",
    iconColor: "text-amber-400",
  },
];

  return (
    <section
      ref={sectionRef}
      className="relative  min-h-screen bg-slate-900 py-20 lg:py-32 overflow-hidden"
    >
      <div className="max-w-7xl scale-[0.88] mx-auto px-6 md:px-8">
        <div  className="text-center  mb-10">
          <h2 className={`text-5xl md:text-6xl lg:text-7xl text-white mb-6 ${barlowExtraBold.className}`}>
            What We Offer
          </h2>
          <p className={`text-2xl text-white/70 max-w-3xl mx-auto ${barlowRegular.className}`}>
            Transforming potential into excellence through innovative programs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-25 items-center">
          {/* Laptop */}
          <div className="flex justify-center animate-scale-in" style={{ animationDelay: "300ms" }}>
            <LaptopMockup
              videoSrc="/trans.mp4"
              delay={0} // we control opening via parent state
              isOpened={isMockupOpened} // pass down
            />
          </div>

          {/* Features */}
          <div  className="space-y-8 scale-[0.8]">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              const isVisible = visibleCards[idx];

              // Base transition styles: transform + opacity; hardware-accelerated via translate3d
              const baseStyle = {
                transform: isVisible ? "translate3d(0,0,0)" : "translate3d(90px,0,0)",
                opacity: isVisible ? 1 : 0,
                transition: "transform 520ms cubic-bezier(.2,.9,.2,1), opacity 420ms ease",
                willChange: "transform, opacity",
              };

              return (
                <div
                  key={idx}
                  style={baseStyle}
                  aria-hidden={!isVisible}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10"
                >
                  <div className="flex  items-start gap-6">
                    <div
                      className={`flex-shrink-0 w-20 h-20 rounded-2xl ${feature.color} flex items-center justify-center`}
                    >
                      <Icon size={40} className={feature.iconColor} strokeWidth={2} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-3xl text-white mb-3 ${barlowBold.className}`}>{feature.title}</h3>
                      <p className={`text-lg text-white/80 leading-relaxed ${barlowRegular.className}`}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeOfferSection;
