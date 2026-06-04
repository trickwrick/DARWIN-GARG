'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { updateFAQ } from '@/app/actions/faqActions';
import styles from '../../../admin.module.css';

interface FAQ {
  _id: string;
  question: string;
  answer: string;
}

export default function EditFAQForm({ faq }: { faq: FAQ }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const result = await updateFAQ(faq._id, formData);

    if (result.success) {
      router.push('/admin/faqs');
    } else {
      setError(result.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Edit FAQ</h1>
        <Link href="/admin/faqs" className={styles.actionBtn}>&larr; Back to FAQs</Link>
      </div>

      <div className={styles.loginBox} style={{ maxWidth: '600px', margin: '0 auto' }}>
        {error && <p style={{ color: 'red', marginBottom: '15px' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="question">Question</label>
            <input 
              type="text" 
              name="question"
              id="question" 
              className={styles.input} 
              placeholder="Enter question"
              defaultValue={faq.question}
              required 
            />
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="answer">Answer</label>
            <textarea 
              name="answer"
              id="answer" 
              className={styles.input} 
              placeholder="Enter answer..."
              rows={4}
              defaultValue={faq.answer}
              required 
            />
          </div>

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? 'Saving...' : 'Update FAQ'}
          </button>
        </form>
      </div>
    </div>
  );
}
