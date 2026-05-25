import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './page.module.css';

export const metadata = {
  title: 'Buy When Gods Must Return | Ancient Wisdom for Modern Chaos',
  description: 'Order your copy of When Gods Must Return by Darwin Garg today.'
};

export default function BookPage() {
  const amazonLink = "https://www.amazon.com/dp/B0GSTW86RV?ref=cm_sw_r_ffobk_cso_cp_apin_dp_NKMTKPK611WNMXVQFFMZ&ref_=cm_sw_r_ffobk_cso_cp_apin_dp_NKMTKPK611WNMXVQFFMZ&social_share=cm_sw_r_ffobk_cso_cp_apin_dp_NKMTKPK611WNMXVQFFMZ&bestFormat=true&rsd=hqg5xwqYng5RCp/lnKaDx8l38NcZnENxBwYj3XQZX8k/z6hZnXJvunNP/m0ZucBH7/S0QJESGciBmGm6lF4PR6+GvmUM329z58oLrDd1hmRv&edk=AQIDAHi1lw/M8UbbSMD9ScOOFEmBMHMthHeEhqDaQYPJUAX3jQFXEt8qpz0kO4BIQ8kJ3NBpAAAAfjB8BgkqhkiG9w0BBwagbzBtAgEAMGgGCSqGSIb3DQEHATAeBglghkgBZQMEAS4wEQQMs/XGvuilmlJ4EXLCAgEQgDuyUuzPkCjCtWnwwk8nyGXQClvKa4f7x2NCl+N9uP7XmUH7/IuR8s82hyjs+XmEMPZxR1KhWYfToBSC0A==";

  return (
    <>
      <Navbar />

      <main className={styles.bookPage}>
        <div className={styles.bookContainer}>
          <div className={styles.productWrapper}>
            <div className={styles.imageSection}>
              <div className={styles.imageContainer}>
                <img src="/images/real_book_cover.jpg" alt="When Gods Must Return Book Cover" className={styles.bookImage} />
              </div>
            </div>

            <div className={styles.detailsSection}>
              <div className={styles.badge}>NEW RELEASE</div>
              <h1 className={styles.title}>When Gods Must Return</h1>
              <h2 className={styles.subtitle}>Ancient Wisdom for Modern Chaos</h2>
              <p className={styles.author}>by <strong>Darwin Garg</strong></p>

              <div className={styles.divider}></div>

              <div className={styles.description}>
                <p>The world isn't facing one crisis. It's facing ten — simultaneously.</p>
                <p>Misinformation floods every screen. Mental health crises touch nearly every family. The climate emergency accelerates. Authoritarianism rises. Corruption hollows out institutions. We face moral dilemmas with no clean answers. Addiction steals our presence. Technology reshapes the world faster than we can process it.</p>
                <p>No single idea, leader, or movement can fix this. What we need isn't one answer. We need ten.</p>
                <p>Thousands of years ago, Hindu tradition gave us the Dashavatar — ten avatars of Vishnu, each descending to Earth in a moment of crisis, each embodying a distinct form of wisdom the world urgently needed. They were never meant to be alternatives to each other. They were always meant to coexist.</p>
                <p><strong>When Gods Must Return: Ancient Wisdom for Modern Chaos</strong> brings these ten ancient forms of wisdom into urgent conversation with the defining crises of our time.</p>
              </div>

              <div className={styles.actionSection}>
                <div className={styles.price}>Available on Amazon</div>
                <a href={amazonLink} target="_blank" rel="noopener noreferrer" className={styles.buyButton}>
                  BUY NOW ON AMAZON
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
