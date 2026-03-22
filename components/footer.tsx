import Container from "./container";

export default function Footer() {
    return (
        <footer className="mt-24 border-t border-black/5 dark:border-white/5 py-8 text-sm">
            <Container>
                <div className="flex flex-col sm:flex-row gap-2 sm:items-center justify-between">
                    <p>© {new Date().getFullYear()} Random Kid. All rights reserved.</p>
                    <p className="opacity-70">Built with Next.js, Tailwind, and ❤️</p>
                </div>
            </Container>
        </footer>
    );
}
