"use client";
import { motion } from "framer-motion";
import { services } from "@/lib/data";
import Magnetic from "@/components/magnetic";
import { Code2, Smartphone, PenTool, Wrench, ArrowRight } from "lucide-react";

function ServiceIcon({ id }: { id: string }) {
    switch (id) {
        case "web-dev":
            return <Code2 className="h-6 w-6" />;
        case "mobile-dev":
            return <Smartphone className="h-6 w-6" />;
        case "uiux":
            return <PenTool className="h-6 w-6" />;
        default:
            return <Wrench className="h-6 w-6" />;
    }
}

export default function Services() {
    return (
        <section id="services" className="section-pad">
            <div className="space-y-4 text-center">
                <h2 className="section-title">Services</h2>
                <p className="section-lead max-w-2xl mx-auto">
                    I provide a complete range of digital services — from design to development and
                    long-term maintenance — to help your ideas come alive.
                </p>
            </div>

            {/* Responsive Grid */}
            <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {services.map((svc, i) => (
                    <motion.article
                        key={svc.id}
                        className="relative group isolate"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.35, delay: i * 0.05 }}
                    >
                        {/* Glow layer (behind the card) */}
                        <div
                            aria-hidden
                            className="pointer-events-none absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 blur-xl -z-10
                         bg-gradient-to-br from-blue-500/30 via-fuchsia-500/25 to-emerald-400/25
                         dark:from-blue-500/20 dark:via-fuchsia-500/18 dark:to-emerald-400/18"
                        />
                        {/* Card */}
                        <div
                            className="card p-6 flex flex-col items-center text-center transition
                         hover:-translate-y-1 hover:shadow-lg
                         ring-1 ring-transparent group-hover:ring-blue-400/30 dark:group-hover:ring-blue-700/30"
                        >
                            <div className="flex items-center justify-center w-12 h-12 rounded-full
                              bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300 mb-3">
                                <ServiceIcon id={svc.id} />
                            </div>

                            <h3 className="font-semibold text-lg mb-2">{svc.title}</h3>
                            <p className="text-sm opacity-80 mb-5">{svc.desc}</p>

                            <Magnetic>
                                <a
                                    href="#contact"
                                    className="button text-sm cursor-link"
                                    aria-label={svc.cta}
                                >
                                    {svc.cta}
                                    <ArrowRight size={14} />
                                </a>
                            </Magnetic>
                        </div>
                    </motion.article>
                ))}
            </div>
        </section>
    );
}
