import Link from 'next/link';
import { getFAQs } from '@/app/actions/faqActions';
import FAQActionButtons from '@/components/FAQActionButtons';
import styles from '../admin.module.css';

export default async function AdminFAQs() {
  const faqs = await getFAQs();

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Manage FAQs</h1>
        <Link href="/admin/faqs/add" className={styles.submitBtn} style={{ width: 'auto', textDecoration: 'none' }}>
          + Add New FAQ
        </Link>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Question</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {faqs.length === 0 ? (
              <tr>
                <td colSpan={3} style={{ textAlign: 'center' }}>No FAQs found. Add your first FAQ!</td>
              </tr>
            ) : (
              faqs.map((faq) => (
                <tr key={faq._id}>
                  <td>{faq.question}</td>
                  <td><span style={{ color: 'green' }}>Active</span></td>
                  <td>
                    <FAQActionButtons id={faq._id} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
