import { useEffect, useRef, useState } from "react";
import { Award, Users, BookOpen, TrendingUp } from "lucide-react";
import { Barlow_Semi_Condensed } from "next/font/google";

const barlowExtraBold = Barlow_Semi_Condensed({ subsets: ["latin"], weight: "800" });
const barlowBold = Barlow_Semi_Condensed({ subsets: ["latin"], weight: "700" });
const barlowSemiBold = Barlow_Semi_Condensed({ subsets: ["latin"], weight: "600" });
const barlowRegular = Barlow_Semi_Condensed({ subsets: ["latin"], weight: "200" });

const ParallaxSection = ({ videoSrc = "https://res.cloudinary.com/diuq0mz3b/video/upload/v1760575331/video_e1imxc.mp4" }) => {
  const sectionRef = useRef(null);
  const rafRef = useRef(null);
  const targetProgressRef = useRef(0);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [animatedNumbers, setAnimatedNumbers] = useState([0, 0, 0, 0]);
  const [countStarted, setCountStarted] = useState(false);

  const stats = [
    { icon: Award, value: 50, suffix: "+", label: "Years of Excellence", color: "text-white" },
    { icon: Users, value: 10000, suffix: "+", label: "Alumni Network", color: "text-white", format: (val) => `${(val / 1000).toFixed(0)}K` },
    { icon: BookOpen, value: 100, suffix: "+", label: "Expert Faculty", color: "text-white" },
    { icon: TrendingUp, value: 95, suffix: "%", label: "Placement Rate", color: "text-white" },
  ];

  // Intersection Observer to trigger count-up
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !countStarted) {
            setCountStarted(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [countStarted]);

  // Scroll & parallax animation
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const start = windowHeight;
      const end = windowHeight * 0.5;
      const rawProgress = (start - rect.top) / (start - end);
      const progress = Math.max(0, Math.min(1, rawProgress));
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      targetProgressRef.current = easedProgress;
    };

    const animate = () => {
      setScrollProgress((prev) => {
        const target = targetProgressRef.current;
        const diff = target - prev;
        return prev + diff * 0.15;
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    handleScroll();
    rafRef.current = requestAnimationFrame(animate);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Count-up animation
  useEffect(() => {
    if (!countStarted) return;
    const duration = 2000;
    const startTime = performance.now();

    const step = (timestamp) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const updatedNumbers = stats.map((stat) =>
        Math.floor(stat.value * progress)
      );
      setAnimatedNumbers(updatedNumbers);
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [countStarted]);

  const widthScale = 0.3 + scrollProgress * 0.7;
  const borderRadius = Math.max(0, (1 - scrollProgress) * 24);

  return (
    <section
      ref={sectionRef}
      className="relative z-20 overflow-hidden flex items-center justify-center"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="relative overflow-hidden bg-white flex items-center justify-center"
        style={{
          width: `${widthScale * 100}%`,
          margin: "0 auto",
          borderRadius: `${borderRadius}px`,
          minHeight: "100vh",
          willChange: "width, border-radius",
        }}
      >
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 0 }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 z-[2]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* CONTENT */}
        <div
          className="relative scale-[0.9] z-10 w-full max-w-6xl mx-auto px-4 md:px-6 flex flex-col items-center text-center gap-6"
          style={{
            transform: `translateY(${(1 - scrollProgress) * 20}px)`,
            opacity: Math.min(1, scrollProgress * 2),
          }}
        >
          {/* Heading */}
          <div>
            <h2
              className={`text-4xl md:text-5xl lg:text-6xl mb-2 text-white ${barlowExtraBold.className}`}
            >
              Where Leaders Are Born
            </h2>
            <p
              className={`text-base md:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed ${barlowRegular.className}`}
            >
              Join a legacy of excellence and innovation. Our MBA program has
              been shaping industry leaders for over five decades.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-4">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              const displayValue = stat.format
                ? stat.format(animatedNumbers[idx])
                : animatedNumbers[idx];

              return (
                <div
                  key={idx}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 text-center border border-white/20 hover:bg-white/15 transition-all duration-300"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/20 mb-3">
                    <Icon size={28} className={stat.color} strokeWidth={2} />
                  </div>
                  <div
                    className={`text-3xl md:text-4xl mb-1 text-white ${barlowExtraBold.className}`}
                  >
                    {displayValue}
                    {stat.suffix}
                  </div>
                  <div
                    className={`text-sm md:text-base text-white/80 ${barlowSemiBold.className}`}
                  >
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Vision & Mission Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto mt-4">
            {/* Vision */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/30 hover:bg-white/15 transition-all duration-300">
              <h3 className={`text-2xl mb-3 text-white ${barlowBold.className}`}>
                Vision
              </h3>
              <p
                className={`text-white/90 text-base leading-relaxed ${barlowRegular.className}`}
              >
                To be a leader in management and technology education —
                nurturing innovation, leadership, and entrepreneurial excellence
                to create professionals who shape the future with purpose and
                integrity.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/30 hover:bg-white/15 transition-all duration-300">
              <h3 className={`text-2xl mb-3 text-white ${barlowBold.className}`}>
                Mission
              </h3>
              <p
                className={`text-white/90 text-base leading-relaxed ${barlowRegular.className}`}
              >
                Our mission is to empower individuals to become capable leaders
                and entrepreneurs by delivering innovative learning experiences,
                fostering research-driven knowledge, and engaging with industry
                and society through impactful partnerships and sustainable
                practices.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-900/90 to-transparent z-[3]" />
      </div>
    </section>
  );
};

export default ParallaxSection;
