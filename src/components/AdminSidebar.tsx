'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logoutAdmin } from '@/app/actions/authActions';
import styles from '@/app/admin/admin.module.css';

const navItems = [
  { name: 'Dashboard', path: '/admin' },
  { name: 'Homepage', path: '/admin/homepage' },
  { name: 'The Book', path: '/admin/book' },
  { name: 'The Journey', path: '/admin/journey' },
  { name: 'Writings', path: '/admin/writings' },
];

function isNavActive(pathname: string, path: string) {
  if (path === '/admin') {
    return pathname === '/admin';
  }
  return pathname.startsWith(path);
}

export default function AdminSidebar() {
  const pathname = usePathname();

  if (pathname === '/admin/login') {
    return null;
  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <p className={styles.sidebarEyebrow}>Darwin Garg</p>
        <h2 className={styles.sidebarTitle}>Admin Panel</h2>
      </div>
      <nav className={styles.sidebarNav}>
        {navItems.map((item) => {
          const isActive = isNavActive(pathname, item.path);
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
      </nav>
      <div className={styles.sidebarFooter}>
        <form action={logoutAdmin}>
          <button type="submit" className={styles.logoutBtn}>
            Logout
          </button>
        </form>
      </div>
    </aside>
  );
}
