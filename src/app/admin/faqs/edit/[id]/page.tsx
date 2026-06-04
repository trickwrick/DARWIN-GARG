import { getFAQById } from '@/app/actions/faqActions';
import EditFAQForm from '@/app/admin/faqs/edit/[id]/EditFAQForm';
import styles from '../../../admin.module.css';

export default async function EditFAQPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const faq = await getFAQById(id);

  if (!faq) {
    return (
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>FAQ Not Found</h1>
      </div>
    );
  }

  return <EditFAQForm faq={faq} />;
}
