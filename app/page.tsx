import Hero from "./(sections)/hero";
import About from "./(sections)/about";
import Portfolio from "./(sections)/portfolio";
import Services from "./(sections)/services";
import Blog from "./(sections)/blog";
import Contact from "./(sections)/contact";

export default function Page() {
    return (
        <main>
            <section id="home" className="section"><Hero /></section>
            <section id="about" className="section"><About /></section>
            <section id="portfolio" className="section"><Portfolio /></section>
            <section id="services" className="section"><Services /></section>
            <section id="blog" className="section"><Blog /></section>
            <section id="contact" className="section"><Contact /></section>
        </main>
    );
}
