import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthorSection from '@/components/AuthorSection';
import ExpandableDescription from '@/components/ExpandableDescription';
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
        <div className={styles.pageHeader}>
          <div className={styles.badge}>NEW RELEASE</div>
          <h1 className={`${styles.title} text-gradient-gold`}>When Gods Must Return</h1>
          <h2 className={styles.subtitle}>Ancient Wisdom for Modern Chaos</h2>
          <div className={styles.divider}></div>
        </div>

        <div className={styles.bookContainer}>
          <div className={styles.productWrapper}>
            <div className={styles.imageSection}>
              <div className={styles.imageContainer}>
                <img src="/images/real_book_cover.jpg" alt="When Gods Must Return Book Cover" className={styles.bookImage} />
              </div>
            </div>

            <div className={styles.detailsSection}>
              <div className={styles.amzHeader}>
                <h1 className={styles.amzTitle}>When Gods Must Return: Ancient Wisdom for Modern Chaos <span className={styles.amzFormat}>Paperback</span></h1>
                <div className={styles.amzDate}>– March 25, 2026</div>
                <div className={styles.amzAuthor}>
                  by <img src="/images/author.jpg" alt="Darwin Garg" className={styles.amzAuthorImg} /> <a href="#" className={styles.amzLink}>Darwin Garg</a> (Author)
                </div>
                <div className={styles.amzRating}>
                  <span className={styles.ratingNumber}>5.0</span>
                  <span className={styles.stars}>★★★★★</span>
                  <a href="#" className={styles.amzLink}>(5)</a>
                </div>
              </div>
              <div className={styles.amzDivider}></div>

              <ExpandableDescription />

              <div className={styles.actionSection}>
                <a href={amazonLink} target="_blank" rel="noopener noreferrer" className={styles.buyButton}>
                  BUY NOW ON AMAZON
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Meet the Author Section */}
        <div style={{ marginTop: '60px' }}>
          <AuthorSection />
        </div>
      </main>

      <Footer />
    </>
  );
}
