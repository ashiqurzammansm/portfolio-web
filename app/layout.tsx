import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CustomCursor from "@/components/custom-cursor";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "SM Ashiqur Zaman | Software Engineer (MERN, Kotlin, Flutter)",
    description:
        "Experienced Software Engineer with over 6 years of combined expertise in web and mobile app development. Skilled in the MERN stack, Flutter, and Android (Kotlin), with a strong focus on secure, scalable, and user-centric solutions.",
    keywords: [
        "SM Ashiqur Zaman",
        "Software Engineer",
        "Full Stack Developer",
        "MERN Stack",
        "Next.js",
        "Flutter Developer",
        "Android Kotlin",
        "Web Developer",
        "App Developer",
    ],
    authors: [{ name: "SM Ashiqur Zaman" }],
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body
            className={`${inter.className} bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100`}
        >
        <CustomCursor />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        </body>
        </html>
    );
}
