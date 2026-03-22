"use client";
import MotionSection from "@/components/motion-section";
import { Timeline, TimelineItem } from "@/components/timeline";
import SkillsGrid from "@/components/skills-grid";
import {
    profile, experience, volunteer,
    education, certifications, languages, licenses,
    skillGroups
} from "@/lib/data";
import { Download, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import Magnetic from "@/components/magnetic";

export default function About() {
    return (
        <MotionSection>
            <div className="space-y-10">
                {/* Header + Actions */}
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
                                aria-label="Download Resume as PDF"
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

                {/* Skills Section */}
                <section aria-label="Skills" className="space-y-4">
                    <h3 className="font-semibold text-lg">Skills</h3>
                    <SkillsGrid groups={skillGroups} />
                </section>

                {/* ====== Main Grid Layout ====== */}
                <div className="grid xl:grid-cols-12 gap-8 items-start">
                    {/* LEFT (8 cols): Work, Education, Volunteer */}
                    <section className="xl:col-span-8 space-y-8">
                        {/* Work Experience */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg">Work Experience</h3>
                            <div className="card p-6">
                                <Timeline>
                                    {experience.map((job, idx) => (
                                        <TimelineItem
                                            key={`${job.role}-${job.company}-${job.start}`}
                                            title={job.role}
                                            subtitle={`${job.company}${job.location ? ` • ${job.location}` : ""}`}
                                            period={`${job.start} — ${job.end}`}
                                        >
                                            <motion.ul
                                                className="list-disc ms-5 space-y-1"
                                                initial="hidden"
                                                whileInView="show"
                                                viewport={{ once: true, amount: 0.25 }}
                                                variants={{
                                                    hidden: { opacity: 1 },
                                                    show: {
                                                        opacity: 1,
                                                        transition: { staggerChildren: 0.06, delayChildren: 0.03 * idx },
                                                    },
                                                }}
                                            >
                                                {job.points.map((p, i) => (
                                                    <motion.li
                                                        key={i}
                                                        variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
                                                        transition={{ duration: 0.25 }}
                                                    >
                                                        {p}
                                                    </motion.li>
                                                ))}
                                            </motion.ul>
                                        </TimelineItem>
                                    ))}
                                </Timeline>
                            </div>
                        </div>

                        {/* Education */}
                        <section aria-label="Education" className="space-y-4">
                            <h3 className="font-semibold text-lg">Education</h3>
                            <div className="card p-6 space-y-4">
                                <Timeline>
                                    {education.map((e) => (
                                        <TimelineItem
                                            key={`${e.school}-${e.program}-${e.start}`}
                                            title={e.school}
                                            subtitle={e.program}
                                            period={`${e.start} — ${e.end}`}
                                        />
                                    ))}
                                </Timeline>
                            </div>
                        </section>

                        {/* Volunteer Experience */}
                        {volunteer.length > 0 && (
                            <section aria-label="Volunteer" className="space-y-4">
                                <h3 className="font-semibold text-lg">Volunteer Experience</h3>
                                <div className="card p-6">
                                    <Timeline>
                                        {volunteer.map((v) => (
                                            <TimelineItem
                                                key={`${v.role}-${v.company}-${v.start}`}
                                                title={v.role}
                                                subtitle={v.company}
                                                period={`${v.start} — ${v.end}`}
                                            >
                                                <ul className="list-disc ms-5 space-y-1">
                                                    {v.points.map((p, i) => (
                                                        <li key={i}>{p}</li>
                                                    ))}
                                                </ul>
                                            </TimelineItem>
                                        ))}
                                    </Timeline>
                                </div>
                            </section>
                        )}
                    </section>

                    {/* RIGHT (4 cols): Certifications, Languages, License */}
                    <aside className="xl:col-span-4 space-y-8 xl:sticky xl:top-24 self-start">
                        {/* Certifications & Training */}
                        <section className="space-y-4">
                            <h3 className="font-semibold text-lg">Certifications & Training</h3>
                            <div className="space-y-4">
                                {certifications.map((c, idx) => (
                                    <motion.article
                                        key={`${c.name}-${c.date}`}
                                        className="card p-5 transition hover:shadow-md hover:ring-blue-300/40 dark:hover:ring-blue-700/25"
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.25 }}
                                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                                    >
                                        <h4 className="font-semibold leading-tight">{c.name}</h4>
                                        <div className="opacity-70 text-sm mt-0.5">
                                            {c.issuer} • {c.date}
                                        </div>

                                        <div className="mt-4 flex flex-wrap gap-2">
                                            <Magnetic>
                                                <a
                                                    className="button cursor-link"
                                                    href={c.verifyUrl}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    aria-label={`Verify ${c.name}`}
                                                >
                                                    <ExternalLink size={16} />
                                                    Verify Link
                                                </a>
                                            </Magnetic>
                                            <Magnetic>
                                                <a
                                                    className="button cursor-link"
                                                    href={c.certificateUrl}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    aria-label={`View certificate for ${c.name}`}
                                                >
                                                    <Download size={16} />
                                                    View Certificate
                                                </a>
                                            </Magnetic>
                                        </div>
                                    </motion.article>
                                ))}
                            </div>
                        </section>

                        {/* Languages */}
                        <section aria-label="Languages" className="space-y-4">
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

                        {/* License */}
                        {licenses.length > 0 && (
                            <section aria-label="Licenses" className="space-y-4">
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
