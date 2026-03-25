"use client";
import { ReactNode } from "react";
import { motion, Variants } from "framer-motion";

const base: Variants = {
    hidden: { opacity: 0, y: 24 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

type Props = {
    children: ReactNode;
    variants?: Variants;
};

export default function MotionSection({ children, variants }: Props) {
    return (
        <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={variants ?? base}
        >
            {children}
        </motion.div>
    );
}
