import Image from "next/image";
import Link from "next/link";
import { AUTHOR_IMAGE } from "@/data/images";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section id="home" className={styles.hero}>
      <div className={styles.grid}>
        <div className={styles.portrait}>
          <div className={styles.portraitFrame}>
            <Image
              src={AUTHOR_IMAGE}
              alt="Darwin Garg, author of When Gods Must Return"
              width={510}
              height={680}
              priority
              sizes="(max-width: 768px) 220px, 255px"
              className={styles.portraitImage}
            />
          </div>
        </div>

        <div className={styles.content}>
          <p className={styles.eyebrow}>Author · Strategist · Storyteller</p>

          <h1 className={styles.heading}>Darwin Garg</h1>

          <p className={styles.tagline}>
            I write at the meeting of ancient stories and modern chaos.
          </p>

          <div className={styles.buttons}>
            <Link href="/about" className={styles.btnPrimary}>
              Read my story
            </Link>
            <Link href="/book" className={styles.btnOutline}>
              Discover the book
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
