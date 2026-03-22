"use client";
import Image from "next/image";
import { useMemo, useState } from "react";
import { projects } from "@/lib/data";
import { motion } from "framer-motion";
import MotionSection from "@/components/motion-section";
import Magnetic from "@/components/magnetic";

const filters = ["all", "web", "mobile", "design", "other"] as const;
type Filter = typeof filters[number];

const container = {
    hidden: { opacity: 1 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.12 },
    },
};

const item = {
    hidden: { opacity: 0, y: 24 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function Portfolio() {
    const [filter, setFilter] = useState<Filter>("all");
    const items = useMemo(() => filter === "all" ? projects : projects.filter(p => p.tag === filter), [filter]);

    return (
        <MotionSection>
            <div>
                <div className="flex items-center justify-between gap-6">
                    <h2 className="section-title">Portfolio</h2>
                    <div className="flex flex-wrap gap-2">
                        {filters.map((f) => (
                            <Magnetic key={f} scale={1.05}>
                                <button
                                    onClick={() => setFilter(f)}
                                    className={`button cursor-link ${filter===f ? "bg-blue-600 text-white" : ""}`}
                                >
                                    {f}
                                </button>
                            </Magnetic>
                        ))}
                    </div>
                </div>

                <motion.div
                    className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.15 }}
                >
                    {items.map((p) => (
                        <motion.article key={p.title} className="card overflow-hidden" variants={item}>
                            <Image src={p.image} alt={p.title} width={640} height={400} className="h-44 w-full object-cover" />
                            <div className="p-4">
                                <h3 className="font-semibold text-lg">{p.title}</h3>
                                <p className="mt-2 text-sm opacity-80">{p.summary}</p>
                                <div className="mt-3 flex gap-2">
                                    {p.url && (
                                        <Magnetic>
                                            <a className="button cursor-link" href={p.url} target="_blank" rel="noreferrer">Live</a>
                                        </Magnetic>
                                    )}
                                    {p.repo && (
                                        <Magnetic>
                                            <a className="button cursor-link" href={p.repo} target="_blank" rel="noreferrer">Code</a>
                                        </Magnetic>
                                    )}
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </motion.div>
            </div>
        </MotionSection>
    );
}
