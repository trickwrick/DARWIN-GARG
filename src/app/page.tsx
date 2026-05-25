import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSlider from '@/components/HeroSlider';
import WelcomeSection from '@/components/WelcomeSection';
import TestimonialVideo from '@/components/TestimonialVideo';
import AboutCard from '@/components/AboutCard';
import AuthorSection from '@/components/AuthorSection';
import BlogCard from '@/components/BlogCard';
import FAQAccordion from '@/components/FAQAccordion';
import styles from './page.module.css';

export default function Home() {
  const dummyBlogs = [
    {
      title: "The Return of the Dashavatar",
      excerpt: "Why ancient forms of wisdom are more relevant today than ever before. Exploring the philosophical roots of When Gods Must Return.",
      date: "MARCH 15, 2026",
      image: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Navigating Modern Chaos",
      excerpt: "From misinformation to climate emergency, how can we use ancient archetypes to find stability in a world seemingly spinning out of control?",
      date: "FEBRUARY 28, 2026",
      image: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Author Interview: Darwin Garg",
      excerpt: "A deep dive into the inspiration behind the book and the process of connecting ten ancient avatars with ten contemporary global crises.",
      date: "JANUARY 10, 2026",
      image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <>
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section id="home">
          <HeroSlider />
        </section>

        {/* Welcome Section */}
        <section id="welcome" className="section">
          <div className="container">
            <WelcomeSection />
          </div>
        </section>

        {/* Testimonial/Video Section */}
        <section id="testimonial">
          <TestimonialVideo />
        </section>

        {/* Blog Section */}
        <section id="blog" className={`section ${styles.blogSection}`}>
          <div className="container">
            <h2 className={styles.sectionHeading}>Latest Insights</h2>
            <div className={styles.sectionDivider}></div>
            <div className={styles.blogGrid}>
              {dummyBlogs.map((blog, idx) => (
                <BlogCard key={idx} {...blog} />
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className={`section ${styles.faqSection}`}>
          <div className="container">
            <FAQAccordion />
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" className={`section ${styles.aboutSection}`}>
          <div className="container">
            <AboutCard />
          </div>
        </section>

        {/* Author Section */}
        <section id="author">
          <AuthorSection />
        </section>
      </main>

      <Footer />
    </>
  );
}
