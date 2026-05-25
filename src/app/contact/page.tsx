import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './page.module.css';

export const metadata = {
  title: 'Contact Us | When Gods Must Return',
  description: 'Get in touch regarding When Gods Must Return: Ancient Wisdom for Modern Chaos.',
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      
      <main className={styles.contactPage}>
        <div className="container">
          <div className={styles.contactWrapper}>
            <div className={styles.infoSection}>
              <h1 className={styles.title}>Get In Touch</h1>
              <div className={styles.divider}></div>
              <p className={styles.description}>
                We would love to hear from you. Whether you have questions about the book, want to arrange an interview, or just want to share your thoughts on the Dashavatar, please send us a message.
              </p>
            </div>
            
            <div className={styles.formSection}>
              <form className={styles.contactForm}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.label}>Name</label>
                  <input type="text" id="name" placeholder="Your Name" className={styles.input} required />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>Email Address</label>
                  <input type="email" id="email" placeholder="you@example.com" className={styles.input} required />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="subject" className={styles.label}>Subject</label>
                  <input type="text" id="subject" placeholder="What is this regarding?" className={styles.input} required />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.label}>Message</label>
                  <textarea id="message" rows={6} placeholder="Type your message here..." className={styles.textarea} required></textarea>
                </div>
                
                <button type="submit" className="btn-primary">SEND MESSAGE</button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
