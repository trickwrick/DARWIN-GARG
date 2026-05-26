import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthorSection from '@/components/AuthorSection';
import BookShowcase from '@/components/BookShowcase';
import styles from './page.module.css';

export const metadata = {
  title: 'Buy When Gods Must Return | Ancient Wisdom for Modern Chaos',
  description: 'Order your copy of When Gods Must Return by Darwin Garg today.'
};

export default function BookPage() {
  return (
    <>
      <Navbar />

      <main className={styles.bookPage}>
        <div className={styles.pageHeader}>
          <div className={styles.badge}>NEW RELEASE</div>
          <h1 className={`${styles.title} text-gradient-gold`}>When Gods Must Return</h1>
          <h2 className={styles.subtitle}>Ancient Wisdom for Modern Chaos</h2>
          <div className={styles.divider}></div>
        </div>

        <BookShowcase />


        {/* Meet the Author Section */}
        <div id="author" style={{ marginTop: '60px' }}>
          <AuthorSection />
        </div>
      </main>

      <Footer />
    </>
  );
}
