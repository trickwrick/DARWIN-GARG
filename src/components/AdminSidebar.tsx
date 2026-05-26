'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logoutAdmin } from '@/app/actions/authActions';
import styles from '@/app/admin/admin.module.css';

export default function AdminSidebar() {
  const pathname = usePathname();

  if (pathname === '/admin/login') {
    return null;
  }

  const navItems = [
    { name: 'Dashboard', path: '/admin' },
    { name: 'Manage Blogs', path: '/admin/blogs' },
    { name: 'Manage FAQs', path: '/admin/faqs' },
    { name: 'Queries', path: '/admin/queries' },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <h2 className={styles.sidebarTitle}>Admin Panel</h2>
      </div>
      <nav className={styles.sidebarNav}>
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link 
              key={item.path} 
              href={item.path}
              className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
            >
              {item.name}
            </Link>
          );
        })}
        <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #eaeaea' }}>
          <form action={logoutAdmin}>
            <button type="submit" className={styles.navLink} style={{ color: 'red', display: 'block', width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer' }}>
              Logout
            </button>
          </form>
        </div>
      </nav>
    </aside>
  );
}
