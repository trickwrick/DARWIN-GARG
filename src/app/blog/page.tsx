import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import { getBlogs } from '@/app/actions/blogActions';
import styles from './page.module.css';

export const metadata = {
  title: 'Blog - When Gods Must Return',
  description: 'Insights and articles about ancient wisdom and modern chaos.',
};

export default async function BlogPage() {
  const blogs = await getBlogs();


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
              {blogs.length === 0 ? (
                <p style={{ textAlign: 'center', width: '100%' }}>No blogs published yet.</p>
              ) : (
                blogs.map((blog) => (
                  <BlogCard key={blog._id} {...blog} />
                ))
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
