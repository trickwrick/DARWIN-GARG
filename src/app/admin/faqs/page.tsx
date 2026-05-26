import styles from '../admin.module.css';

export default function AdminFAQs() {
  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Manage FAQs</h1>
        <button className={styles.submitBtn} style={{ width: 'auto' }}>+ Add New FAQ</button>
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
            <tr>
              <td>What is the main theme of the book?</td>
              <td><span style={{ color: 'green' }}>Active</span></td>
              <td>
                <button className={styles.actionBtn}>Edit</button> | 
                <button className={styles.actionBtn} style={{ color: 'red' }}>Delete</button>
              </td>
            </tr>
            <tr>
              <td>How does it connect ancient wisdom to modern chaos?</td>
              <td><span style={{ color: 'green' }}>Active</span></td>
              <td>
                <button className={styles.actionBtn}>Edit</button> | 
                <button className={styles.actionBtn} style={{ color: 'red' }}>Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
