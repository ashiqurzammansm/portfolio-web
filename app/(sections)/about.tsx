// app/(sections)/about.tsx

"use client";
import { useEffect, useState } from "react";
import MotionSection from "@/components/motion-section";
import { Timeline, TimelineItem } from "@/components/timeline";
import SkillsGrid from "@/components/skills-grid";
import {
    profile, experience, volunteer,
    education, languages, licenses,
    skillGroups
} from "@/lib/data";
import { Download, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import Magnetic from "@/components/magnetic";

export default function About() {

    const [certifications, setCertifications] = useState<any[]>([]);

    useEffect(() => {
        fetch("/api/admin/certifications")
            .then(res => res.json())
            .then(data => setCertifications(data));
    }, []);

    return (
        <MotionSection>
            <div className="space-y-10">

                {/* Header */}
                <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                    <div>
                        <h2 className="section-title">About</h2>
                        <p className="section-lead max-w-prose">
                            {profile.summary}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <Magnetic>
                            <motion.a
                                href="/resume/resume.pdf"
                                className="button bg-blue-600 text-white cursor-link"
                                download
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Download size={16} />
                                Download Resume
                            </motion.a>
                        </Magnetic>
                        <Magnetic>
                            <a
                                href={profile.linkedin}
                                target="_blank"
                                rel="noreferrer"
                                className="button cursor-link"
                            >
                                LinkedIn
                            </a>
                        </Magnetic>
                    </div>
                </header>

                {/* Skills */}
                <section className="space-y-4">
                    <h3 className="font-semibold text-lg">Skills</h3>
                    <SkillsGrid groups={skillGroups} />
                </section>

                <div className="grid xl:grid-cols-12 gap-8 items-start">

                    {/* LEFT */}
                    <section className="xl:col-span-8 space-y-8">

                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg">Work Experience</h3>
                            <div className="card p-6">
                                <Timeline>
                                    {experience.map((job) => (
                                        <TimelineItem
                                            key={job.role}
                                            title={job.role}
                                            subtitle={job.company}
                                            period={`${job.start} — ${job.end}`}
                                        >
                                            <ul className="list-disc ms-5 space-y-1">
                                                {job.points.map((p, i) => (
                                                    <li key={i}>{p}</li>
                                                ))}
                                            </ul>
                                        </TimelineItem>
                                    ))}
                                </Timeline>
                            </div>
                        </div>

                        <section className="space-y-4">
                            <h3 className="font-semibold text-lg">Education</h3>
                            <div className="card p-6">
                                <Timeline>
                                    {education.map((e) => (
                                        <TimelineItem
                                            key={e.school}
                                            title={e.school}
                                            subtitle={e.program}
                                            period={`${e.start} — ${e.end}`}
                                        />
                                    ))}
                                </Timeline>
                            </div>
                        </section>

                    </section>

                    {/* RIGHT (ORIGINAL STRUCTURE FULLY RESTORED) */}
                    <aside className="xl:col-span-4 space-y-8 xl:sticky xl:top-24 self-start">

                        {/* ✅ Certifications (EXACT POSITION) */}
                        <section className="space-y-4">
                            <h3 className="font-semibold text-lg">Certifications & Training</h3>

                            {certifications.length === 0 && (
                                <div className="card p-5 text-sm opacity-70">
                                    No certifications found.
                                </div>
                            )}

                            <div className="space-y-4">
                                {certifications.map((c, idx) => (
                                    <motion.article
                                        key={c._id}
                                        className="card p-5 transition hover:shadow-md"
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                                    >
                                        <h4 className="font-semibold">{c.title}</h4>

                                        <div className="opacity-70 text-sm mt-0.5">
                                            {c.authority} • {c.issueDate || c.expectedDate}
                                        </div>

                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {c.verifyUrl && (
                                                <a className="button" href={c.verifyUrl} target="_blank">
                                                    <ExternalLink size={16} />
                                                    Verify Link
                                                </a>
                                            )}

                                            {c.certificateUrl && (
                                                <a className="button" href={c.certificateUrl} target="_blank">
                                                    View Certificate
                                                </a>
                                            )}
                                        </div>
                                    </motion.article>
                                ))}
                            </div>
                        </section>

                        {/* Languages */}
                        <section className="space-y-4">
                            <h3 className="font-semibold text-lg">Languages</h3>
                            <div className="card p-6">
                                <ul className="text-sm space-y-1">
                                    {languages.map((l) => (
                                        <li key={l.name}>
                                            <span className="font-medium">{l.name}</span> — {l.level}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>

                        {/* ✅ License RESTORED (THIS FIXES POSITION SHIFT) */}
                        {licenses.length > 0 && (
                            <section className="space-y-4">
                                <h3 className="font-semibold text-lg">License</h3>
                                <div className="card p-6 space-y-2">
                                    {licenses.map((lic) => (
                                        <div key={lic.name} className="text-sm">
                                            <div className="font-medium">{lic.name}</div>
                                            <div className="opacity-70">
                                                {lic.issuer} • {lic.valid}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                    </aside>

                </div>
            </div>
        </MotionSection>
    );
}