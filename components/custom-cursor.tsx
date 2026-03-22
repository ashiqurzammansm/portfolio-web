"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Default: show blue dot + ring (custom cursor).
 * On interactive elements (a, button, .cursor-link): show OS pointer and hide the custom cursor.
 */
export default function CustomCursor() {
    const [showCustom, setShowCustom] = useState(true);

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
    const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });

    const blue = "rgb(37 99 235)";
    const dotSize = 6;
    const ringSize = 30;

    useEffect(() => {
        if (typeof window === "undefined") return;
        const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
        if (isTouch) return; // don’t run on touch

        const body = document.body;

        const move = (e: MouseEvent) => {
            x.set(e.clientX);
            y.set(e.clientY);
        };

        const over = (e: Event) => {
            const t = e.target as HTMLElement | null;
            if (!t) return;
            if (t.closest("a,button,.cursor-link")) {
                setShowCustom(false);                 // hide dot/ring
                body.classList.add("cursor-pointer-on"); // show OS pointer
            }
        };

        const out = (e: Event) => {
            const t = e.target as HTMLElement | null;
            if (!t) return;
            if (t.closest("a,button,.cursor-link")) {
                setShowCustom(true);                  // show dot/ring again
                body.classList.remove("cursor-pointer-on");
            }
        };

        const leave = () => {
            setShowCustom(true);
            body.classList.remove("cursor-pointer-on");
        };

        window.addEventListener("mousemove", move);
        document.addEventListener("mouseover", over);
        document.addEventListener("mouseout", out);
        window.addEventListener("mouseleave", leave);
        window.addEventListener("blur", leave);

        return () => {
            window.removeEventListener("mousemove", move);
            document.removeEventListener("mouseover", over);
            document.removeEventListener("mouseout", out);
            window.removeEventListener("mouseleave", leave);
            window.removeEventListener("blur", leave);
            body.classList.remove("cursor-pointer-on");
        };
    }, [x, y]);

    if (typeof window === "undefined") return null;

    const dotStyle = {
        width: dotSize,
        height: dotSize,
        x: sx,
        y: sy,
        marginLeft: -dotSize / 2,
        marginTop: -dotSize / 2,
        opacity: showCustom ? 1 : 0,
        backgroundColor: blue,
        boxShadow: `0 0 12px 2px ${blue}66`,
    };

    const ringStyle = {
        width: ringSize,
        height: ringSize,
        x: sx,
        y: sy,
        marginLeft: -ringSize / 2,
        marginTop: -ringSize / 2,
        opacity: showCustom ? 0.14 : 0,
        borderColor: blue,
        boxShadow: `0 0 22px 4px ${blue}44`,
    };

    return (
        <>
            <motion.div
                className="pointer-events-none fixed z-[99998] rounded-full"
                style={ringStyle}
                transition={{ type: "spring", stiffness: 220, damping: 24 }}
            >
                <div
                    className="w-full h-full rounded-full"
                    style={{ borderWidth: 2, borderColor: blue, backgroundColor: `${blue}12` }}
                />
            </motion.div>

            <motion.div
                className="pointer-events-none fixed z-[99999] rounded-full"
                style={dotStyle}
                transition={{ type: "spring", stiffness: 900, damping: 35 }}
            />
        </>
    );
}
