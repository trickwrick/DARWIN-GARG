import { getBlogById } from '@/app/actions/blogActions';
import EditBlogForm from './EditBlogForm';
import styles from '../../../admin.module.css';

export default async function EditBlogPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const blog = await getBlogById(id);

  if (!blog) {
    return (
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Blog Not Found</h1>
      </div>
    );
  }

  return <EditBlogForm blog={blog} />;
}
