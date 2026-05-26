"use client";

import { useState } from 'react';
import styles from './BookShowcase.module.css';
export default function ExpandableDescription() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={styles.description}>
      <p><strong>The world isn&apos;t facing one crisis. It&apos;s facing ten — simultaneously.</strong></p>
      <p>Misinformation floods every screen. Mental health crises touch nearly every family. The climate emergency accelerates. Authoritarianism rises. Corruption hollows out institutions. We face moral dilemmas with no clean answers. Addiction steals our presence. Technology reshapes the world faster than we can process it.</p>
      <p>No single idea, leader, or movement can fix this. What we need isn&apos;t one answer. We need ten.</p>
      <p>Thousands of years ago, Hindu tradition gave us the <span className="highlight-text">Dashavatar</span> — ten avatars of Vishnu, each descending to Earth in a moment of crisis, each embodying a distinct form of wisdom the world urgently needed. They were never meant to be alternatives to each other. They were always meant to coexist.</p>
      <p><em>When Gods Must Return: Ancient Wisdom for Modern Chaos</em> brings these ten ancient forms of wisdom into urgent conversation with the defining crises of our time.</p>

      {isExpanded && (
        <div className={styles.expandedContent}>
          <ul className={styles.avatarList}>
            <li><strong>Matsya</strong> — navigating the flood of misinformation</li>
            <li><strong>Kurma</strong> — building inner stability in a mental health crisis</li>
            <li><strong>Varaha</strong> — recovering our connection to a dying planet</li>
            <li><strong>Narasimha</strong> — confronting authoritarianism and abuse of power</li>
            <li><strong>Vamana</strong> — humbling the ego that believes it knows best</li>
            <li><strong>Parashurama</strong> — dismantling deep institutional corruption</li>
            <li><strong>Rama</strong> — doing what&apos;s right when it costs everything</li>
            <li><strong>Krishna</strong> — choosing wisely when there are no good options</li>
            <li><strong>Buddha</strong> — breaking free from addiction and endless craving</li>
            <li><strong>Kalki</strong> — transforming systems that create these crises in the first place</li>
          </ul>

          <p>Through compelling stories of ordinary people facing extraordinary modern dilemmas, this book shows how timeless avatar wisdom speaks directly to where we are right now — regardless of your religious background or prior knowledge of Hindu tradition.</p>
          <p>This isn&apos;t a book that picks one solution for one crisis. Its deepest insight is that the crises are interconnected — and so must be the wisdom we bring to them. All ten avatars must return. Not as alternatives, but as one integrated whole.</p>
          <p><strong>The gods are returning. The only question is whether we&apos;re ready to receive their wisdom.</strong></p>
          <p><em>Perfect for readers of Karen Armstrong, Joseph Campbell, and Devdutt Pattanaik — and anyone searching for ancient wisdom that speaks to the present moment.</em></p>
        </div>
      )}

      <div className={styles.readMoreWrapper} onClick={() => setIsExpanded(!isExpanded)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
        <svg 
          width="14" 
          height="14" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="#007185" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          style={{ 
            marginRight: '6px', 
            transition: 'transform 0.2s', 
            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' 
          }}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
        <span className={styles.amzLink}>{isExpanded ? 'Read less' : 'Read more'}</span>
      </div>
    </div>
  );
}
