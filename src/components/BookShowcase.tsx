'use client';
import { useState } from 'react';
import ExpandableDescription from './ExpandableDescription';
import styles from './BookShowcase.module.css';

interface BookShowcaseProps {
  showBuyButton?: boolean;
}

export default function BookShowcase({ showBuyButton = true }: BookShowcaseProps = {}) {
  const [activeImg, setActiveImg] = useState('/images/real_book_cover.jpg');
  
  const amazonLink = "https://www.amazon.com/dp/B0GSTW86RV?ref=cm_sw_r_ffobk_cso_cp_apin_dp_NKMTKPK611WNMXVQFFMZ&ref_=cm_sw_r_ffobk_cso_cp_apin_dp_NKMTKPK611WNMXVQFFMZ&social_share=cm_sw_r_ffobk_cso_cp_apin_dp_NKMTKPK611WNMXVQFFMZ&bestFormat=true&rsd=hqg5xwqYng5RCp/lnKaDx8l38NcZnENxBwYj3XQZX8k/z6hZnXJvunNP/m0ZucBH7/S0QJESGciBmGm6lF4PR6+GvmUM329z58oLrDd1hmRv&edk=AQIDAHi1lw/M8UbbSMD9ScOOFEmBMHMthHeEhqDaQYPJUAX3jQFXEt8qpz0kO4BIQ8kJ3NBpAAAAfjB8BgkqhkiG9w0BBwagbzBtAgEAMGgGCSqGSIb3DQEHATAeBglghkgBZQMEAS4wEQQMs/XGvuilmlJ4EXLCAgEQgDuyUuzPkCjCtWnwwk8nyGXQClvKa4f7x2NCl+N9uP7XmUH7/IuR8s82hyjs+XmEMPZxR1KhWYfToBSC0A==";

  return (
    <div className={styles.bookContainer}>
      <div className={`${styles.productWrapper} ${showBuyButton ? styles.alignTop : styles.alignCenter}`}>
        <div className={styles.imageSection}>
          <div className={styles.imageContainer}>
            <img src={activeImg} alt="When Gods Must Return Book Cover" className={styles.bookImage} />
            <div className={styles.thumbnails}>
              <div 
                className={`${styles.thumbnail} ${activeImg === '/images/real_book_cover.jpg' ? styles.activeThumb : ''}`}
                onMouseEnter={() => setActiveImg('/images/real_book_cover.jpg')}
                onClick={() => setActiveImg('/images/real_book_cover.jpg')}
              >
                <img src="/images/real_book_cover.jpg" alt="Front Cover" />
              </div>
              <div 
                className={`${styles.thumbnail} ${activeImg === '/images/god secound.jpg' ? styles.activeThumb : ''}`}
                onMouseEnter={() => setActiveImg('/images/god secound.jpg')}
                onClick={() => setActiveImg('/images/god secound.jpg')}
              >
                <img src="/images/god secound.jpg" alt="Back Cover" />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.detailsSection}>
          <div className={styles.amzHeader}>
            <h1 className={styles.amzTitle}>When Gods Must Return: Ancient Wisdom for Modern Chaos</h1>
            <div className={styles.amzAuthor}>
              by <a href="#author"><img src="/images/author.jpg" alt="Darwin Garg" className={styles.amzAuthorImg} /></a> <a href="#author" className={styles.amzLink}>Darwin Garg</a> (Author)
              <span style={{ color: '#ddd', margin: '0 8px' }}>|</span>
              <span className={styles.amzFormat}>Format: <strong>Paperback</strong></span>
            </div>
            <div className={styles.amzRating}>
              <span className={styles.ratingNumber}>5.0</span>
              <a href="/#testimonial" style={{ textDecoration: 'none' }}><span className={styles.stars}>★★★★★</span></a>
              <a href="/#testimonial" className={styles.amzLink}>(5)</a>
            </div>
          </div>
          <div className={styles.amzDivider}></div>

          <ExpandableDescription />

          {showBuyButton && (
            <div className={styles.actionSection}>
              <a href={amazonLink} target="_blank" rel="noopener noreferrer" className={styles.buyButton}>
                BUY NOW ON AMAZON
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
