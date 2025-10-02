import { useEffect, useRef, useState } from "react";
import { Award, Users, BookOpen, TrendingUp } from "lucide-react";
import { Barlow_Semi_Condensed } from "next/font/google";

const barlowExtraBold = Barlow_Semi_Condensed({ subsets: ["latin"], weight: "800" });
const barlowBold = Barlow_Semi_Condensed({ subsets: ["latin"], weight: "700" });
const barlowSemiBold = Barlow_Semi_Condensed({ subsets: ["latin"], weight: "600" });
const barlowRegular = Barlow_Semi_Condensed({ subsets: ["latin"], weight: "200" });

const ParallaxSection = ({ videoSrc = "/video.mp4" }) => {
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

  // Intersection Observer to trigger count-up when section enters viewport
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

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
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

  // Count-up animation triggers only when section is visible
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

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [countStarted]);

  const widthScale = 0.3 + scrollProgress * 0.7;
  const borderRadius = Math.max(0, (1 - scrollProgress) * 24);

  return (
    <section ref={sectionRef} className="relative z-20 overflow-hidden" style={{ minHeight: "100vh" }}>
      <div
        className="relative overflow-hidden bg-white"
        style={{
          width: `${widthScale * 100}%`,
          margin: "0 auto",
          borderRadius: `${borderRadius}px`,
          minHeight: "100vh",
          willChange: "width, border-radius",
        }}
      >
        {/* Video Background */}
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
        <div className="absolute inset-0 opacity-5" style={{ zIndex: 2 }}>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative scale-[0.85] z-10 max-w-7xl mx-auto px-6 md:px-8 py-20 lg:py-5" style={{ zIndex: 10 }}>
          {/* Heading */}
          <div
            className="text-center mb-16"
            style={{
              opacity: Math.min(1, scrollProgress * 2),
              transform: `translateY(${(1 - scrollProgress) * 50}px)`,
            }}
          >
            <h2 className={`text-5xl md:text-6xl lg:text-7xl mb-6 text-balance text-white ${barlowExtraBold.className}`}>
              Where Leaders Are Born
            </h2>
            <p className={`text-2xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed ${barlowRegular.className}`}>
              Join a legacy of excellence and innovation. Our MBA program has been shaping
              industry leaders for over five decades.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              const displayValue = stat.format ? stat.format(animatedNumbers[idx]) : animatedNumbers[idx];

              return (
                <div
                  key={idx}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center border border-white/30 hover:bg-white/15 transition-all duration-300"
                  style={{
                    opacity: Math.min(1, scrollProgress),
                    transform: `translateY(${(1 - scrollProgress) * 30}px)`,
                  }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-4">
                    <Icon size={32} className={stat.color} strokeWidth={2} />
                  </div>
                  <div className={`text-5xl md:text-6xl mb-2 text-white ${barlowExtraBold.className}`}>
                    {displayValue}{stat.suffix}
                  </div>
                  <div className={`text-base md:text-lg text-white/80 ${barlowSemiBold.className}`}>
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Feature Cards */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            style={{
              opacity: Math.max(0, Math.min(1, (scrollProgress - 0.4) / 0.3)),
              transform: `translateY(${Math.max(0, (1 - (scrollProgress - 0.4) / 0.3)) * 30}px)`,
            }}
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/30 hover:bg-white/15 transition-all duration-300">
              <h3 className={`text-3xl mb-4 text-white ${barlowBold.className}`}>Industry Connections</h3>
              <p className={`text-white/90 text-lg leading-relaxed ${barlowRegular.className}`}>
                Build your network with access to top industry leaders, Fortune 500 companies,
                and successful alumni who are making an impact globally.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/30 hover:bg-white/15 transition-all duration-300">
              <h3 className={`text-3xl mb-4 text-white ${barlowBold.className}`}>Global Perspective</h3>
              <p className={`text-white/90 text-lg leading-relaxed ${barlowRegular.className}`}>
                Experience international exposure through global immersion programs, international
                faculty, and partnerships with leading business schools worldwide.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent" style={{ zIndex: 3 }} />
      </div>
    </section>
  );
};

export default ParallaxSection;
