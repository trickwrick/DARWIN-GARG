import styles from "../admin.module.css";
import QueriesList from "@/components/admin/QueriesList";
import { getContactInquiriesForAdmin } from "@/app/actions/contactInquiryActions";

export default async function AdminQueries() {
  const inquiries = await getContactInquiriesForAdmin();

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>User Queries</h1>
          <p className={styles.pageDescription}>
            Contact form submissions from the Connect page.
          </p>
        </div>
      </div>

      <QueriesList initialInquiries={inquiries} />
    </div>
  );
}
