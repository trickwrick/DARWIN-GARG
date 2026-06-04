'use client';

import { useState } from 'react';
import Link from 'next/link';
import { deleteFAQ } from '@/app/actions/faqActions';
import styles from '@/app/admin/admin.module.css';

export default function FAQActionButtons({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this FAQ?')) {
      setIsDeleting(true);
      const result = await deleteFAQ(id);
      if (!result.success) {
        alert(result.message);
        setIsDeleting(false);
      }
    }
  };

  return (
    <>
      <Link href={`/admin/faqs/edit/${id}`} className={styles.actionBtn}>
        Edit
      </Link>
      {' | '}
      <button 
        className={styles.actionBtn} 
        style={{ color: 'red' }} 
        onClick={handleDelete}
        disabled={isDeleting}
      >
        {isDeleting ? 'Deleting...' : 'Delete'}
      </button>
    </>
  );
}
