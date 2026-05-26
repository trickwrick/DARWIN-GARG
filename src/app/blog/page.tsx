import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import styles from './page.module.css';

export const metadata = {
  title: 'Blog - When Gods Must Return',
  description: 'Insights and articles about ancient wisdom and modern chaos.',
};

export default function BlogPage() {
  const blogs = [
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
    },
    {
      title: "The Role of Mythology in Modern Leadership",
      excerpt: "How leaders today can draw lessons from ancient texts to navigate complex moral dilemmas in the workplace and society.",
      date: "DECEMBER 12, 2025",
      image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Finding Inner Peace in a Digital Age",
      excerpt: "Practical steps to disconnect from the constant noise of social media and reconnect with our deeper spiritual selves.",
      date: "NOVEMBER 05, 2025",
      image: "https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Understanding the Ten Avatars",
      excerpt: "A brief introduction to the Dashavatar and what each manifestation represents in the context of cosmic and human evolution.",
      date: "OCTOBER 20, 2025",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <>
      <Navbar />
      <main>
        <div className={styles.pageHeader}>
          <h1 className={`${styles.title} text-gradient-gold`}>Latest Insights</h1>
          <p className={styles.subtitle}>Thoughts, articles, and deep dives into the wisdom of the ages applied to today's world.</p>
          <div className={styles.divider}></div>
        </div>

        <section className={`section ${styles.blogSection}`}>
          <div className="container">
            <div className={styles.blogGrid}>
              {blogs.map((blog, idx) => (
                <BlogCard key={idx} {...blog} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
