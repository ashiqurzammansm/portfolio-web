"use client";
import { useState } from "react";
import MotionSection from "@/components/motion-section";

export default function Contact() {
    const [status, setStatus] = useState<string | null>(null);

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const data = Object.fromEntries(new FormData(form).entries());
        try {
            const res = await fetch("/api/contact", { method: "POST", body: JSON.stringify(data) });
            if (!res.ok) throw new Error("Request failed");
            setStatus("Thanks! I’ll get back to you soon.");
            form.reset();
        } catch {
            setStatus("Something went wrong. Please email me: you@example.com");
        }
    }

    return (
        <MotionSection>
            <div>
                <h2 className="section-title">Contact</h2>
                <p className="section-lead">Let’s work together — tell me about your project.</p>
                <form onSubmit={onSubmit} className="mt-8 grid gap-4 max-w-xl">
                    <input name="name" required placeholder="Your name" className="card px-4 py-3" />
                    <input name="email" type="email" required placeholder="Email" className="card px-4 py-3" />
                    <input name="subject" placeholder="Subject" className="card px-4 py-3" />
                    <textarea name="message" required placeholder="Message" rows={5} className="card px-4 py-3" />
                    <button className="button bg-blue-600 text-white w-max">Send</button>
                    {status && <p className="text-sm opacity-80">{status}</p>}
                </form>
            </div>
        </MotionSection>
    );
}
