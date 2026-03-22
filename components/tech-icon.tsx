"use client";
import * as React from "react";

/**
 * Brand-colored SVG icons (inline). Icons use currentColor by default,
 * and we apply a per-brand color via the color map below.
 * Hover adds a subtle glow.
 */
export type TechSlug =
    | "mongodb" | "express" | "react" | "node" | "nextjs" | "tailwind"
    | "jwt" | "vercel" | "render" | "git" | "github" | "postman" | "figma" | "typescript"
    | "android" | "kotlin" | "jetpack" | "retrofit" | "firebase" | "room" | "mvvm";

const BRAND: Record<TechSlug, string> = {
    react: "#61DAFB",
    nextjs: "#000000",     // we’ll add a subtle gradient to keep it visible in dark mode
    node: "#5FA04E",
    express: "#000000",
    mongodb: "#47A248",
    tailwind: "#38BDF8",
    jwt: "#000000",
    vercel: "#000000",
    render: "#46E3B7",
    git: "#F34F29",
    github: "#24292F",
    postman: "#FF6C37",
    figma: "#F24E1E",
    typescript: "#3178C6",
    android: "#3DDC84",
    kotlin: "#A97BFF",
    jetpack: "#4285F4",
    retrofit: "#2BB673",
    firebase: "#FFCA28",
    room: "#7B61FF",
    mvvm: "#0EA5E9",
};

export default function TechIcon({
                                     slug,
                                     size = 22,
                                     className,
                                     colorize = true,
                                 }: {
    slug: TechSlug;
    size?: number;
    className?: string;
    /** set to false to keep monochrome (inherits text color) */
    colorize?: boolean;
}) {
    const stroke = colorize ? BRAND[slug] : "currentColor";
    const fill = colorize ? BRAND[slug] : "currentColor";
    const common = {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        className: `transition filter ${className ?? ""}`,
        // default to stroke icons; components override as needed
        fill: "none" as const,
        stroke: stroke,
        strokeWidth: 1.8,
        strokeLinecap: "round" as const,
        strokeLinejoin: "round" as const,
        style: { filter: colorize ? "drop-shadow(0 0 6px rgba(0,0,0,0.0))" : undefined },
    };

    const glow = colorize ? { style: { filter: `drop-shadow(0 0 4px ${BRAND[slug]}55)` } } : {};

    switch (slug) {
        // --- Web / MERN ---
        case "react":
            return (
                <svg {...common} {...glow}>
                    <circle cx="12" cy="12" r="2.2" />
                    <ellipse rx="9" ry="4" transform="rotate(60 12 12)" cx="12" cy="12" />
                    <ellipse rx="9" ry="4" transform="rotate(-60 12 12)" cx="12" cy="12" />
                    <ellipse rx="9" ry="4" cx="12" cy="12" />
                </svg>
            );
        case "nextjs":
            return (
                <svg {...common}>
                    {/* ring (use gradient if color is black to be visible in dark mode) */}
                    <defs>
                        <linearGradient id="nextGrad" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor={colorize ? "#111" : "currentColor"} />
                            <stop offset="100%" stopColor={colorize ? "#555" : "currentColor"} />
                        </linearGradient>
                    </defs>
                    <circle cx="12" cy="12" r="9" stroke="url(#nextGrad)" />
                    <path d="M9 9h6" stroke="url(#nextGrad)"/>
                    <path d="M9 12h3" stroke="url(#nextGrad)"/>
                    <path d="M12 12l6 6" stroke="url(#nextGrad)"/>
                </svg>
            );
        case "node":
            return (
                <svg {...common} {...glow}>
                    <path d="M12 2l8 4.5v11L12 22l-8-4.5v-11z" />
                    <path d="M8 9.5v5l4 2.2 4-2.2v-5L12 7.3 8 9.5z" />
                </svg>
            );
        case "express":
            return (
                <svg {...common} {...glow}>
                    <path d="M4 16l4-8 4 8" />
                    <path d="M17 8l3 4-3 4" />
                    <path d="M14 8l-3 4 3 4" />
                </svg>
            );
        case "mongodb":
            return (
                <svg {...common} {...glow}>
                    <path d="M12 3c2 3 4 6 4 9.5 0 3.5-2 6.5-4 8.5-2-2-4-5-4-8.5S10 6 12 3z" />
                    <path d="M12 3v18" />
                </svg>
            );
        case "tailwind":
            return (
                <svg {...common} {...glow}>
                    <path d="M4 13c2-4 5-6 8-4 1 .7 2 2 4 2 2 0 3-1 4-3-2 4-5 6-8 4-1-.7-2-2-4-2-2 0-3 1-4 3z" />
                </svg>
            );
        case "jwt":
            return (
                <svg {...common} {...glow}>
                    <path d="M12 2v8" />
                    <path d="M12 14v8" />
                    <path d="M4.2 6.5l6.9 4" />
                    <path d="M12.9 13.5l6.9 4" />
                    <path d="M19.8 6.5l-6.9 4" />
                    <path d="M10.9 13.5L4 17.5" />
                </svg>
            );
        case "vercel":
            return (
                <svg {...common} stroke="none" fill={fill} style={{ filter: `drop-shadow(0 0 4px ${fill}55)` }}>
                    <path d="M12 4l8 14H4l8-14z" />
                </svg>
            );
        case "render":
            return (
                <svg {...common} {...glow}>
                    <path d="M3 12h18" />
                    <path d="M6 6h12" />
                    <path d="M6 18h12" />
                    <rect x="4" y="4" width="16" height="16" rx="2" />
                </svg>
            );
        case "git":
            return (
                <svg {...common} {...glow}>
                    <path d="M4 12L12 4l8 8-8 8-8-8z" />
                    <circle cx="12" cy="8" r="1.6" />
                    <circle cx="9" cy="12" r="1.6" />
                    <circle cx="15" cy="12" r="1.6" />
                    <path d="M12 8l-3 4 3 4 3-4-3-4z" />
                </svg>
            );
        case "github":
            return (
                <svg {...common} stroke={stroke} fill="none" style={{ filter: `drop-shadow(0 0 4px ${stroke}33)` }}>
                    <path d="M15 22v-3.5c0-.8.1-1.2-.5-1.8 3.5-.4 7-1.7 7-7.6 0-1.7-.6-3-1.5-4.1.1-.4.4-1.9-.2-3.9 0 0-1.3-.4-4.2 1.6-1.2-.3-2.6-.5-4-.5s-2.8.2-4 .5C5.7.7 4.4 1.1 4.4 1.1c-.6 2-.3 3.5-.2 3.9C3.3 6 2.7 7.3 2.7 9c0 5.9 3.5 7.2 7 7.6-.5.6-.5 1-.5 1.8V22" />
                </svg>
            );
        case "postman":
            return (
                <svg {...common} {...glow}>
                    <circle cx="12" cy="12" r="9" />
                    <path d="M7.5 12H16.5" />
                    <path d="M12 7.5v9" />
                </svg>
            );
        case "figma":
            return (
                <svg {...common} stroke="none" fill={fill} style={{ filter: `drop-shadow(0 0 4px ${fill}55)` }}>
                    <path d="M9 3h3a3 3 0 110 6H9V3z" />
                    <path d="M9 9h3a3 3 0 110 6H9V9z" />
                    <path d="M9 15h1a3 3 0 110 6H9v-6z" />
                    <path d="M9 3H8a3 3 0 100 6h1V3z" />
                    <path d="M12 3h1a3 3 0 110 6h-1V3z" />
                </svg>
            );
        case "typescript":
            return (
                <svg {...common} {...glow}>
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M8 8h8" />
                    <path d="M12 8v8" />
                    <path d="M9 16h6" />
                </svg>
            );

        // --- Android / Kotlin ---
        case "android":
            return (
                <svg {...common} {...glow}>
                    <rect x="6" y="8" width="12" height="10" rx="2" />
                    <path d="M8 8l-2-3" />
                    <path d="M16 8l2-3" />
                    <circle cx="9" cy="11" r="0.9" />
                    <circle cx="15" cy="11" r="0.9" />
                    <path d="M6 12v4M18 12v4" />
                </svg>
            );
        case "kotlin":
            return (
                <svg {...common} stroke="none" fill={fill} style={{ filter: `drop-shadow(0 0 4px ${fill}55)` }}>
                    <path d="M4 4h16L12 12l8 8H4z" />
                </svg>
            );
        case "jetpack":
            return (
                <svg {...common} {...glow}>
                    <path d="M12 3l3 5-3 2-3-2 3-5z" />
                    <path d="M6 14l6 7 6-7" />
                    <path d="M6 14h12" />
                </svg>
            );
        case "retrofit":
            return (
                <svg {...common} {...glow}>
                    <path d="M4 12h16" />
                    <path d="M12 4v16" />
                    <circle cx="12" cy="12" r="4" />
                </svg>
            );
        case "firebase":
            return (
                <svg {...common} stroke="none" fill={fill} style={{ filter: `drop-shadow(0 0 4px ${fill}55)` }}>
                    <path d="M6 18l3-12 3 6 3-4 3 10H6z" />
                </svg>
            );
        case "room":
            return (
                <svg {...common} {...glow}>
                    <rect x="4" y="6" width="16" height="12" rx="2" />
                    <path d="M8 10h8M8 14h8" />
                </svg>
            );
        case "mvvm":
            return (
                <svg {...common} {...glow}>
                    <path d="M4 18l4-12 4 12 4-12 4 12" />
                </svg>
            );
        default:
            return null;
    }
}
