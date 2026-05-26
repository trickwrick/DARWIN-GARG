'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { addBlog } from '@/app/actions/blogActions';
import styles from '../../admin.module.css';

export default function AddBlog() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const result = await addBlog(formData);

    if (result.success) {
      router.push('/admin/blogs');
    } else {
      setError(result.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Add New Blog</h1>
        <Link href="/admin/blogs" className={styles.actionBtn}>&larr; Back to Blogs</Link>
      </div>

      <div className={styles.loginBox} style={{ maxWidth: '600px', margin: '0 auto' }}>
        {error && <p style={{ color: 'red', marginBottom: '15px' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="title">Blog Title</label>
            <input 
              type="text" 
              name="title"
              id="title" 
              className={styles.input} 
              placeholder="Enter blog title"
              required 
            />
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="excerpt">Excerpt / Description</label>
            <textarea 
              name="excerpt"
              id="excerpt" 
              className={styles.input} 
              placeholder="Short description of the blog..."
              rows={4}
              required 
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="image">Blog Image</label>
            <input 
              type="file" 
              name="image"
              id="image" 
              className={styles.input} 
              accept="image/*"
              required 
            />
          </div>

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? 'Saving...' : 'Publish Blog'}
          </button>
        </form>
      </div>
    </div>
  );
}
