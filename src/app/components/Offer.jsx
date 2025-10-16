import { useEffect } from "react";
import { Home, BookOpen, Users, UserCheck, Clock, MapPin, Briefcase, TrendingUp, CreditCard } from "lucide-react";
import { Barlow_Semi_Condensed } from "next/font/google";

const barlowSemi = Barlow_Semi_Condensed({
  subsets: ["latin"],
  weight: "800",
});

const barlowSemismall = Barlow_Semi_Condensed({
  subsets: ["latin"],
  weight: "600",
});

const barlowSmall = Barlow_Semi_Condensed({
  subsets: ["latin"],
  weight: "400",
});

const accreditationData = [
  {
    logo: "https://res.cloudinary.com/diuq0mz3b/image/upload/v1760557843/University_of_calicut_logo_jzafuj.png",
    type: "Affiliated to",
  },
  {
    logo: "https://res.cloudinary.com/diuq0mz3b/image/upload/v1760557958/AICTE-Logo-Vector_wjscno.jpg",
    type: "Approved by",
  },
  {
    logo: "https://res.cloudinary.com/diuq0mz3b/image/upload/v1760557842/National_Board_of_Accreditation.svg_jeyofe.png",
    type: "Accredited by",
  },
  {
    logo: "https://res.cloudinary.com/diuq0mz3b/image/upload/v1760557843/Amdisa_Membership_Logo_uoqvec.jpg",
    type: "Member of AMDISA",
  },
  {
    logo: "https://res.cloudinary.com/diuq0mz3b/image/upload/v1760557842/ACBSP_logo_mdqoe9.png",
    type: "Member of ACBSP",
  },
  {
    logo: "https://res.cloudinary.com/diuq0mz3b/image/upload/v1760559441/Certificates-2023_tcgyhy.jpg",
    type: "A+++ Grade",
  },
];

const features = [
  { title: "Programme Benefits", text: "Fully Residential programmes allow flexibility, mentoring, and practical business exposure.", icon: Home },
  { title: "Life Skill Training", text: "Experiential training bridges knowledge and wisdom, preparing students for real life.", icon: BookOpen },
  { title: "Industry Interaction", text: "Periodic industry interactions provide exposure to real work environments.", icon: Users },
  { title: "Mentoring", text: "Personalized mentoring helps students excel in their unique talents and skills.", icon: UserCheck },
  { title: "Flexible Timing", text: "Programme schedule optimized for learning efficiency with intense training and breaks.", icon: Clock },
  { title: "Deschooling", text: "Outdoor training builds responsibility, team skills, and practical experience.", icon: MapPin },
  { title: "Entrepreneurship Focus", text: "Specialized training and hands-on projects instill entrepreneurial skills.", icon: Briefcase },
  { title: "Practical Business Exposure", text: "Real business environments reinforce classroom learning and provide live experience.", icon: TrendingUp },
  { title: "Earn While You Learn", text: "Students earn through practical activities like events, marketing, and trading.", icon: CreditCard },
];

const WhatWeOfferSection = () => {

  return (
    <section className="relative min-h-screen bg-white py-16 overflow-hidden">
      <div className="w-full bg-white px-8 md:px-32 font-sans">
        {/* Section Title */}
        <h2 className={`${barlowSemi.className} text-5xl md:text-5xl mb-12 text-center text-[#085eaa]`}>
          What We Offer
        </h2>

        {/* 3x3 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-4">
              <feature.icon className="w-5 h-5 text-[#085eaa] mt-1 flex-shrink-0" />
              <div>
                <h3 className={`${barlowSemismall.className} text-lg mb-1 text-[#085eaa]`}>{feature.title}</h3>
                <p className={`${barlowSmall.className} text-gray-700 text-xs`}>{feature.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Accreditations Title */}
        <h3 className={`${barlowSemi.className} text-2xl mt-12 mb-6 text-center text-[#085eaa]`}>
          Accreditations
        </h3>

        {/* Infinite Scroll Container */}
        <div className="overflow-hidden relative">
          <div className="flex animate-scroll whitespace-nowrap">
            {[...accreditationData, ...accreditationData].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center min-w-max mx-6">
                <img src={item.logo} alt={`Accreditation ${idx}`} className="h-20 object-contain mb-1" />
                <p className={`${barlowSmall.className} text-xs text-black text-center`}>{item.type}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS animation */}
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          display: flex;
          gap: 2rem;
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default WhatWeOfferSection;
