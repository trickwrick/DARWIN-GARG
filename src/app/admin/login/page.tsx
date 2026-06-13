'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginAdmin } from '@/app/actions/authActions';
import styles from '../admin.module.css';

export default function AdminLogin() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const result = await loginAdmin(formData);

    if (result.success) {
      router.push('/admin');
    } else {
      setError(result.message || 'Login failed.');
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <p className={styles.loginEyebrow}>Darwin Garg</p>
        <h1 className={styles.loginTitle}>Admin Login</h1>
        {error && <p className={styles.loginError}>{error}</p>}
        <form onSubmit={handleLogin}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="email">
              Email / Username
            </label>
            <input
              type="text"
              name="email"
              id="email"
              className={styles.input}
              placeholder="admin@example.com or admin"
              required
              autoComplete="username"
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className={styles.input}
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? 'Logging in...' : 'Login to Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
}
