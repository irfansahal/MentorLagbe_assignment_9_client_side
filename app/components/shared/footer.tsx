
import React from "react";
import Image from "next/image";
import Link from "next/link";
// import { Facebook, Instagram, Linkedin, Youtube } from ""
import logo from "@/app/assets/Gemini_Generated_Image_dqy9vydqy9vydqy9.jpg";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "Browse Tuitions", href: "/browse-tuitions" },
    { label: "Pricing/Pro Plans", href: "/checkout" },
    { label: "About", href: "/about" },
];

const Footer = () => {
    return (
        <footer className="bg-[#050505] text-white">
            <div className="mx-auto max-w-7xl px-4 py-12">

                {/* First div: logo + subheading */}
                <div className="flex flex-col items-start gap-4 text-center w-[400px]">
                    <Image
                        src={logo}
                        alt="MentorLagbe"
                        className="h-20 w-auto rounded"
                    />
                    <p className="max-w-md text-lg text-white/90 text-start">
                        Discover experienced tutors and mentorship programs to build your skills, achieve your goals, and unlock your potential.
                    </p>
                </div>

                {/* Second div: three divs with flex */}
                <div className="mt-10 flex flex-col gap-8 md:flex-row md:justify-between">

                    {/* Div 1: quick navigation links */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-lg font-bold">Quick Links</h3>
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="text-sm text-white/90 hover:text-white hover:underline"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Div 2: contact info */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-lg font-bold">Contact Us</h3>
                        <a href="mailto:info@mentolagbe.com" className="text-sm text-white/90 hover:text-white hover:underline">
                            info@mentolagbe.com
                        </a>
                        <a href="tel:+8801700000000" className="text-sm text-white/90 hover:text-white hover:underline">
                            +880 1700-000000
                        </a>
                        <p className="text-sm text-white/90">Dhaka, Bangladesh</p>
                    </div>

                    {/* Div 3: social media links */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-lg font-bold">Follow Us</h3>
                        <div className="flex items-center gap-4">
                            {/* X (new Twitter logo) */}
                            <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X" className="hover:text-white/80">
                                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>

                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-white/80">
                                <FaFacebook className="h-5 w-5" />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-white/80">
                                <FaInstagram className="h-5 w-5" />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-white/80">
                                <FaLinkedin className="h-5 w-5" />
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-white/80">
                                <FaYoutube className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                </div>

                {/* Third div: copyright */}
                <div className="mt-10 border-t border-white/30 pt-6 text-center text-sm text-white/90">
                    © {new Date().getFullYear()} MentorLagbe. All rights reserved.
                </div>

            </div>
        </footer>
    );
};

export default Footer;
