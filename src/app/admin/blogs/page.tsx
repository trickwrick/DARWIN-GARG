import Link from 'next/link';
import { getBlogs } from '@/app/actions/blogActions';
import BlogActionButtons from '@/components/BlogActionButtons';
import styles from '../admin.module.css';

export default async function AdminBlogs() {
  const blogs = await getBlogs();

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Manage Blogs</h1>
        <Link href="/admin/blogs/add" className={styles.submitBtn} style={{ width: 'auto', textDecoration: 'none' }}>
          + Add New Blog
        </Link>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center' }}>No blogs found. Add your first blog!</td>
              </tr>
            ) : (
              blogs.map((blog) => (
                <tr key={blog._id}>
                  <td>{blog.title}</td>
                  <td>{blog.date}</td>
                  <td><span style={{ color: 'green' }}>Published</span></td>
                  <td>
                    <BlogActionButtons id={blog._id} />
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
