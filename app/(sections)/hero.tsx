"use client";
import Image from "next/image";
import { motion, MotionConfig } from "framer-motion";
import { ArrowRight, Github, Linkedin, Download } from "lucide-react";
import Magnetic from "@/components/magnetic";
import FloatingLogos from "@/components/floating-logos";

export default function Hero() {
    return (
        <MotionConfig reducedMotion="never">
            <section className="grid gap-10 md:grid-cols-2 items-center">
                {/* Left content */}
                <div>
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl sm:text-5xl font-extrabold tracking-tight"
                    >
                        Hi, I’m{" "}
                        <span className="text-blue-600 dark:text-blue-400">
              ASHIQURZAMMAN
            </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="section-lead max-w-prose mt-4"
                    >
                        I’m a <span className="font-semibold">Software Engineer</span> with
                        over <span className="font-semibold">6 years of experience</span> in
                        web and mobile app development. I craft secure, scalable, and
                        user-focused solutions using <span className="font-semibold">MERN</span> and{" "}
                        <span className="font-semibold">Kotlin</span> with a passion for clean
                        design and seamless performance.
                    </motion.p>

                    {/* Buttons */}
                    <div className="mt-8 flex flex-wrap items-center gap-3">
                        <Magnetic>
                            <a
                                href="#portfolio"
                                className="button bg-blue-600 text-white cursor-link"
                            >
                                View Portfolio <ArrowRight size={16} />
                            </a>
                        </Magnetic>

                        <Magnetic>
                            <a href="#contact" className="button cursor-link">
                                Contact Me
                            </a>
                        </Magnetic>

                        <Magnetic>
                            <a
                                className="button cursor-link"
                                href="https://github.com/smashiqurzamman"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Github size={16} /> GitHub
                            </a>
                        </Magnetic>

                        <Magnetic>
                            <a
                                className="button cursor-link"
                                href="https://www.linkedin.com/in/smashiqurzamman"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Linkedin size={16} /> LinkedIn
                            </a>
                        </Magnetic>

                        <Magnetic>
                            <a
                                className="button bg-slate-900 text-white cursor-link"
                                href="/resume/resume.pdf"
                                download
                            >
                                <Download size={16} /> Resume
                            </a>
                        </Magnetic>
                    </div>
                </div>

                {/* Right image with animated gradient glow border */}
                <div className="justify-self-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative p-[3px] rounded-3xl overflow-hidden"
                    >
                        {/* Animated gradient border layer */}
                        <motion.div
                            aria-hidden
                            className="absolute inset-0 rounded-3xl opacity-80 blur-[3px]"
                            style={{
                                background:
                                    "conic-gradient(from 0deg, #3B82F6, #D946EF, #34D399, #3B82F6)",
                            }}
                            initial={{ rotate: 0 }}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 16, ease: "linear", repeat: Infinity }}
                        />

                        {/* Inner card */}
                        <div className="relative bg-white dark:bg-slate-900 rounded-2xl p-3 shadow-md">
                            <div className="relative overflow-hidden rounded-2xl">
                                <Image
                                    src="/avatar.png"   // ensure this exists in /public/
                                    width={380}
                                    height={380}
                                    alt="Profile photo of ASHIQURZAMMAN"
                                    className="rounded-2xl object-cover"
                                    priority
                                />

                                {/* Floating animated logos overlay (above the image) */}
                                <FloatingLogos />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </MotionConfig>
    );
}
