"use client";

import { Barlow_Semi_Condensed } from "next/font/google";
import React from "react";
import Image from "next/image";
import {
  Sparkles,
  Home,
  Waves,
  TreePine,
  Dumbbell,
} from "lucide-react";


const barlowExtraBold = Barlow_Semi_Condensed({
  subsets: ["latin"],
  weight: "800",
});

const barlowRegular = Barlow_Semi_Condensed({
  subsets: ["latin"],
  weight: "400",
});

const iconMap = {
  Sparkles: Sparkles,
  Home: Home,
  Waves: Waves,
  TreePine: TreePine,
  Dumbbell: Dumbbell,
};

export default function LifeAtLeadSection() {
  const [isVisible, setIsVisible] = React.useState(false);
  const sectionRef = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  const features = [
    {
      icon: "Sparkles",
      title: "Pet-Friendly Campus",
      description: "Home to horses, camels, baby pythons, and other rare species.",
    },
    {
      icon: "Home",
      title: "Relaxing Huts",
      description: "Tranquil spaces amidst lush greenery for rest and reflection.",
    },
    {
      icon: "Waves",
      title: "Aquatic Beauty",
      description: "Vibrant fish tanks add calm and charm to the campus.",
    },
    {
      icon: "TreePine",
      title: "Playfulness & Tree Huts",
      description: "Swings and tree huts for relaxation and creativity.",
    },
    {
      icon: "Dumbbell",
      title: "Gym & Swimming Pool",
      description: "Facilities for fitness, wellness, and recreation.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-white py-20 px-6 md:px-20 lg:px-32 overflow-hidden"
    >
      {/* Title */}
      <h2
        className={`${barlowExtraBold.className} text-4xl md:text-5xl text-[#085eaa] mb-12 text-center transition-all duration-[2000ms] ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
        }`}
      >
        Life at LEAD
      </h2>

      <div className="grid md:grid-cols-2 gap-0 items-center">
        {/* Left Section - Features */}
        <div className="space-y-8 pr-4 md:pr-8">
          {features.map((feature, index) => {
       const Icon = iconMap[feature.icon];
            return (
              <div
                key={index}
                className={`flex items-start gap-4 transition-all duration-[1200ms] ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-20"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="flex-shrink-0 mt-1">
                  <Icon className="w-6 h-6 text-[#085eaa]" />
                </div>
                <div className={`${barlowRegular.className}`}>
                  <h3 className="text-xl font-bold text-[#085eaa] mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-black text-base leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Section - Image */}
        <div
          className={`relative transition-all duration-[1500ms] ${
            isVisible
              ? "opacity-100 translate-x-0 rotate-0 scale-100"
              : "opacity-0 translate-x-20 rotate-6 scale-90"
          }`}
          style={{
            transformStyle: "preserve-3d",
            perspective: "1000px",
            width: "130%",
            maxWidth: "130%",
          }}
        >

            
     <div className="relative w-full h-[500px] md:h-[600px] lg:h-[500px]">
  <Image
    src="https://res.cloudinary.com/diuq0mz3b/image/upload/v1760566463/Frame_1_1_wgyrce.png"
    alt="Life at LEAD"
    fill
    className="object-cover rounded-2xl"
  />
</div>

        </div>
      </div>
    </section>
  );
}