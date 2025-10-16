"use client";
// import { AnimatedTestimonials } from "../../components/ui/animated-testimonials";
import { Barlow_Semi_Condensed } from "next/font/google";
import dynamic from "next/dynamic";
const AnimatedTestimonials = dynamic(
  () =>
    import("../../components/ui/animated-testimonials").then(
      (mod) => mod.AnimatedTestimonials
    ),
  { ssr: false }
);

const barlowExtraBold = Barlow_Semi_Condensed({
  subsets: ["latin"],
  weight: "800",
});

const barlowRegular = Barlow_Semi_Condensed({
  subsets: ["latin"],
  weight: "400",
});

const testimonials = [
  {
    name: "Outbound Training",
    designation: "Outbound Training Program",
    quote:
      "LEAD College of Management adopts a distinctive approach to enrich the MBA journey through a wide range of outbound activities. What makes this initiative stand out is its student-driven management and execution. This blend of academic rigor and real-world experiential learning develops capable, confident, and adaptable business professionals ready to excel globally.",
    src: "https://res.cloudinary.com/diuq0mz3b/image/upload/v1760562923/WhatsApp-Image-2023-08-18-at-5.56.14-AM_t1l1ru.jpg",
  },
  {
    name: "Turning Point",
    designation: "Leadership Workshop",
    quote:
      "Turning Point is an intensive six-day workshop crafted to help individuals identify their unique capabilities, set clear goals aligned with their strengths, and chart actionable plans to achieve them. The program nurtures interpersonal and intrapersonal relationships, builds confidence, and prepares participants to face interviews, public speaking, and group discussions with ease.",
    src: "https://res.cloudinary.com/diuq0mz3b/image/upload/v1760562924/lead-programs2_kqzyha.jpg",
  },
  {
    name: "LEAD Guru Shishya",
    designation: "Faculty Development Program",
    quote:
      "A three-day national-level Faculty Development Program designed to redefine the role of teachers beyond knowledge transfer. Guru Shishya inspires educators to empower students holistically by fostering empathy, curiosity, and performance. The program celebrates the teaching profession’s core essence—enabling educators to guide with insight, pride, and renewed confidence.",
    src: "https://res.cloudinary.com/diuq0mz3b/image/upload/v1760562924/WhatsApp-Image-2025-02-08-at-13.10.05-scaled_ghkqbg.jpg",
  },
];

export default function StandingOutSection() {
  return (
    <section
      className="w-full py-20 px-8 md:px-20 relative"
      style={{
        backgroundImage: `url('https://res.cloudinary.com/diuq0mz3b/image/upload/v1760566464/IMG_4044_exmewm.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay Gradient */}
<div className="absolute inset-0 bg-gradient-to-b from-[#0a0d12]/99 via-slate-900/99 to-[#05070a]/99 z-0" />






      {/* Title */}
      <h2
        className={`${barlowExtraBold.className} text-4xl md:text-5xl text-white mb-4 text-center relative z-10`}
      >
        Standing Out from the Rest
      </h2>

      {/* Divider */}
      <div className="h-full w-[3px] bg-[#085eaa] mx-auto rounded-full hidden md:block relative z-10" />

      {/* Animated Testimonials */}
      <div className="relative z-10">
        <AnimatedTestimonials testimonials={testimonials} />
      </div>
    </section>
  );
}
