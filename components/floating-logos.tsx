"use client";

import { motion, MotionConfig } from "framer-motion";
import React from "react";

/** Soft glow behind each logo */
function Glow() {
    return (
        <div
            aria-hidden
            className="absolute inset-0 -z-10 blur-md rounded-full
                 bg-gradient-to-br from-blue-500/25 via-fuchsia-500/20 to-emerald-400/20
                 dark:from-blue-500/20 dark:via-fuchsia-500/16 dark:to-emerald-400/16"
        />
    );
}

type FloatProps = {
    children: React.ReactNode;
    className?: string; // absolute placement on the image
    duration?: number;
    delay?: number;
    x?: number;
    y?: number;
    rotate?: number;
    scale?: number;
};

/** Floating animation wrapper for each logo */
function Float({
                   children,
                   className = "",
                   duration = 10,           // 9–11s natural loop
                   delay = 0,
                   x = 20,                  // amplitude (px)
                   y = 20,
                   rotate = 12,
                   scale = 1.1,
               }: FloatProps) {
    return (
        <motion.div
            className={`pointer-events-none absolute ${className}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay }}
            style={{ willChange: "transform" }}
        >
            <motion.div
                animate={{
                    x: [0, x, -x, 0],
                    y: [0, -y, y, 0],
                    rotate: [0, rotate, -rotate, 0],
                    scale: [1, scale, 0.98, 1],
                }}
                transition={{
                    duration,
                    delay,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                }}
                style={{ willChange: "transform" }}
            >
                <div className="relative">
                    {children}
                    <Glow />
                </div>
            </motion.div>
        </motion.div>
    );
}

/** Overlay with three official SVG logos (loaded from /public/logos) */
export default function FloatingLogos() {
    return (
        <MotionConfig reducedMotion="never">
            <div className="absolute inset-0 pointer-events-none z-10">
                {/* JavaScript — MORE margin from top: top-20 ≈ 80px */}
                <Float
                    className="top-20 left-6"
                    duration={10}
                    delay={0.1}
                    x={20}
                    y={20}
                    rotate={12}
                    scale={1.1}
                >
                    <motion.img
                        src="/logos/javascript.svg"
                        alt="JavaScript logo"
                        width={72}
                        height={72}
                        className="h-[72px] w-[72px] drop-shadow will-change-transform"
                        animate={{
                            y: [0, -12, 12, 0],
                            rotate: [0, 10, -10, 0],
                        }}
                        transition={{
                            duration: 9,
                            repeat: Infinity,
                            repeatType: "mirror",
                            ease: "easeInOut",
                        }}
                    />
                </Float>

                {/* Kotlin — MORE margin from bottom: bottom-20 ≈ 80px */}
                <Float
                    className="bottom-20 left-6"
                    duration={11}
                    delay={0.25}
                    x={20}
                    y={20}
                    rotate={12}
                    scale={1.1}
                >
                    <motion.img
                        src="/logos/kotlin.svg"
                        alt="Kotlin logo"
                        width={72}
                        height={72}
                        className="h-[72px] w-[72px] drop-shadow will-change-transform"
                        animate={{
                            y: [0, 14, -14, 0],
                            rotate: [0, -10, 10, 0],
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            repeatType: "mirror",
                            ease: "easeInOut",
                        }}
                    />
                </Float>

                {/* TypeScript — right side of the middle */}
                <Float
                    className="top-1/2 right-6 -translate-y-1/2"
                    duration={9.5}
                    delay={0.2}
                    x={20}
                    y={20}
                    rotate={12}
                    scale={1.1}
                >
                    <motion.img
                        src="/logos/typescript.svg"
                        alt="TypeScript logo"
                        width={74}
                        height={74}
                        className="h-[74px] w-[74px] drop-shadow will-change-transform"
                        animate={{
                            x: [0, -12, 12, 0],
                            rotate: [0, 10, -10, 0],
                        }}
                        transition={{
                            duration: 9.5,
                            repeat: Infinity,
                            repeatType: "mirror",
                            ease: "easeInOut",
                        }}
                    />
                </Float>
            </div>
        </MotionConfig>
    );
}
