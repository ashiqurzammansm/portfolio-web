"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
    const [dark, setDark] = useState(false);
    useEffect(() => {
        const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setDark(document.documentElement.classList.contains("dark") || prefers);
    }, []);
    const toggle = () => {
        const el = document.documentElement;
        el.classList.toggle("dark");
        setDark(el.classList.contains("dark"));
    };
    return (
        <button aria-label="Toggle theme" onClick={toggle} className="button">
            {dark ? <Sun size={18} /> : <Moon size={18} />}
            <span className="hidden sm:inline">{dark ? "Light" : "Dark"}</span>
        </button>
    );
}
