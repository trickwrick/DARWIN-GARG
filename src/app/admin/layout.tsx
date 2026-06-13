import AdminSidebar from '@/components/AdminSidebar';
import styles from './admin.module.css';

export const metadata = {
  title: 'Admin Dashboard - Darwin Garg',
  description: 'Admin panel for content management',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.adminLayout}>
      <AdminSidebar />
      <main className={styles.mainContent}>{children}</main>
    </div>
  );
}
