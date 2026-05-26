import styles from '../admin.module.css';

export default function AdminQueries() {
  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>User Queries</h1>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Rahul Rathor</td>
              <td>rahul@example.com</td>
              <td>Bulk Order Inquiry</td>
              <td>Oct 24, 2026</td>
              <td><span style={{ color: 'orange' }}>Pending</span></td>
              <td>
                <button className={styles.actionBtn}>View / Reply</button>
              </td>
            </tr>
            <tr>
              <td>John Doe</td>
              <td>john@example.com</td>
              <td>Speaking Engagement</td>
              <td>Oct 23, 2026</td>
              <td><span style={{ color: 'green' }}>Resolved</span></td>
              <td>
                <button className={styles.actionBtn}>View</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
