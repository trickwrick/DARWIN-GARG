import styles from './admin.module.css';

export default function AdminDashboard() {
  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Dashboard Overview</h1>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statValue}>12</div>
          <div className={styles.statLabel}>Total Blogs</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>8</div>
          <div className={styles.statLabel}>Active FAQs</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>45</div>
          <div className={styles.statLabel}>User Queries</div>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Recent Queries</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Rahul Rathor - Book inquiry</td>
              <td>Oct 24, 2026</td>
              <td><span style={{ color: 'orange' }}>Pending</span></td>
              <td><button className={styles.actionBtn}>View</button></td>
            </tr>
            <tr>
              <td>John Doe - Speaking engagement</td>
              <td>Oct 23, 2026</td>
              <td><span style={{ color: 'green' }}>Resolved</span></td>
              <td><button className={styles.actionBtn}>View</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
