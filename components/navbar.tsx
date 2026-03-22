"use client";
import Link from "next/link";
import Container from "./container";
import ThemeToggle from "./theme-toggle";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";

const links = [
    { href: "#home", id: "home", label: "Home" },
    { href: "#about", id: "about", label: "About" },
    { href: "#portfolio", id: "portfolio", label: "Portfolio" },
    { href: "#services", id: "services", label: "Services" },
    { href: "#blog", id: "blog", label: "Blog" },
    { href: "#contact", id: "contact", label: "Contact" },
] as const;

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState<string>("home");

    // Highlight nav item that matches the section in view
    useEffect(() => {
        const sectionEls = links
            .map((l) => document.getElementById(l.id))
            .filter(Boolean) as HTMLElement[];

        if (sectionEls.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                // find the most visible section
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0));
                if (visible[0]?.target?.id) {
                    setActive(visible[0].target.id);
                }
            },
            {
                // Trigger a bit before the top for nicer UX
                root: null,
                rootMargin: "0px 0px -60% 0px",
                threshold: [0.2, 0.4, 0.6, 0.8, 1],
            }
        );

        sectionEls.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <header className="sticky top-0 z-50 bg-white/70 dark:bg-slate-950/50 backdrop-blur border-b border-black/5 dark:border-white/5">
            <Container>
                <div className="flex h-16 items-center justify-between">
                    <Link href="#home" className="font-bold tracking-tight text-lg cursor-link">
                        MyLogo
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden md:flex items-center gap-6">
                        {links.map((l) => {
                            const isActive = active === l.id;
                            return (
                                <a
                                    key={l.href}
                                    href={l.href}
                                    className={`relative text-sm cursor-link transition ${
                                        isActive ? "text-blue-600 dark:text-blue-400" : "hover:opacity-80"
                                    }`}
                                >
                                    {l.label}
                                    {/* underline indicator */}
                                    <span
                                        className={`absolute left-0 -bottom-2 h-0.5 bg-blue-600 dark:bg-blue-400 transition-transform origin-left ${
                                            isActive ? "w-full scale-x-100" : "w-full scale-x-0"
                                        }`}
                                    />
                                </a>
                            );
                        })}
                        <div className="cursor-link">
                            <ThemeToggle />
                        </div>
                    </nav>

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden button cursor-link"
                        onClick={() => setOpen(!open)}
                        aria-label="Toggle menu"
                    >
                        <Menu size={18} />
                    </button>
                </div>

                {/* Mobile nav */}
                {open && (
                    <div className="md:hidden pb-4">
                        <div className="flex flex-col gap-2">
                            {links.map((l) => {
                                const isActive = active === l.id;
                                return (
                                    <a
                                        key={l.href}
                                        href={l.href}
                                        className={`py-2 cursor-link ${isActive ? "text-blue-600" : ""}`}
                                        onClick={() => setOpen(false)}
                                    >
                                        {l.label}
                                    </a>
                                );
                            })}
                            <div className="cursor-link">
                                <ThemeToggle />
                            </div>
                        </div>
                    </div>
                )}
            </Container>
        </header>
    );
}
