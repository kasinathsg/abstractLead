"use client";

import { Barlow_Semi_Condensed } from "next/font/google";
import Image from "next/image";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const barlowRegular = Barlow_Semi_Condensed({
  subsets: ["latin"],
  weight: "400",
});

const barlowBold = Barlow_Semi_Condensed({
  subsets: ["latin"],
  weight: "700",
});

export default function Footer() {
  return (
    <footer className={`w-full bg-slate-900 text-white py-16 px-8 md:px-20 ${barlowRegular.className}`}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo */}
        <div>
          <Image
            src="https://res.cloudinary.com/diuq0mz3b/image/upload/v1760570128/lead-logo-white1_ihzwxd.png"
            alt="LEAD College Logo"
            width={150}
            height={50}
            className="mb-4"
          />
        </div>

        {/* Quick Links */}
        <div>
          <h3 className={`text-xl font-bold mb-4 ${barlowBold.className}`}>Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-[#085eaa] transition-colors">Home</a></li>
            <li><a href="#" className="hover:text-[#085eaa] transition-colors">Programs</a></li>
            <li><a href="#" className="hover:text-[#085eaa] transition-colors">Admissions</a></li>
            <li><a href="#" className="hover:text-[#085eaa] transition-colors">Campus Life</a></li>
            <li><a href="#" className="hover:text-[#085eaa] transition-colors">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className={`text-xl font-bold mb-4 ${barlowBold.className}`}>Contact</h3>
          <p className="text-sm mb-2">
            LEAD College of Management<br/>
            Dhoni PO, Palakkad<br/>
            Kerala, India – 678009
          </p>
          <p className="text-sm mb-2">Landline: 0491 2553693, 2553663</p>
          <p className="text-sm mb-2">Mobile: +91 9497713693</p>
          <p className="text-sm">Emails: info@lead.ac.in, mail@lead.ac.in</p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className={`text-xl font-bold mb-4 ${barlowBold.className}`}>Follow Us</h3>
          <div className="flex gap-4 text-white">
            <a href="#" className="hover:text-[#085eaa] transition-colors"><Facebook className="h-5 w-5" /></a>
            <a href="#" className="hover:text-[#085eaa] transition-colors"><Instagram className="h-5 w-5" /></a>
            <a href="#" className="hover:text-[#085eaa] transition-colors"><Linkedin className="h-5 w-5" /></a>
            <a href="#" className="hover:text-[#085eaa] transition-colors"><Twitter className="h-5 w-5" /></a>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-white/20 pt-6 text-center text-sm text-white/60">
        &copy; {new Date().getFullYear()} LEAD College of Management. All rights reserved.
      </div>
    </footer>
  );
}
