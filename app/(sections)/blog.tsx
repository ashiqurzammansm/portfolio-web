"use client";
import Link from "next/link";
import { posts } from "@/lib/data";
import { motion } from "framer-motion";
import MotionSection from "@/components/motion-section";

const container = {
    hidden: { opacity: 1 },
    show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
};
const item = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

export default function Blog() {
    return (
        <MotionSection>
            <div>
                <h2 className="section-title">Blog</h2>
                <p className="section-lead">Recent thoughts and tutorials.</p>
                <motion.div
                    className="mt-10 grid md:grid-cols-2 gap-6"
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {posts.map((p) => (
                        <motion.article key={p.slug} className="card p-6" variants={item}>
                            <h3 className="font-semibold text-lg">{p.title}</h3>
                            <p className="mt-2 text-sm opacity-80">Published on {new Date(p.date).toLocaleDateString()}</p>
                            <Link href="/#" className="button mt-4 inline-block">Read →</Link>
                        </motion.article>
                    ))}
                </motion.div>
            </div>
        </MotionSection>
    );
}
