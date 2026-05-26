'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { deleteBlog } from '@/app/actions/blogActions';
import styles from '@/app/admin/admin.module.css';

export default function BlogActionButtons({ id }: { id: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    const isConfirmed = window.confirm("Are you sure you want to delete this blog? This action cannot be undone.");
    if (isConfirmed) {
      const result = await deleteBlog(id);
      if (result.success) {
        // Option to show a toast, but revalidatePath will refresh the list
      } else {
        alert(result.message);
      }
    }
  };

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <Link href={`/admin/blogs/edit/${id}`} className={`${styles.iconBtn} ${styles.editBtn}`} title="Edit">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      </Link>
      <button onClick={handleDelete} className={`${styles.iconBtn} ${styles.deleteBtn}`} title="Delete">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <line x1="10" y1="11" x2="10" y2="17" />
          <line x1="14" y1="11" x2="14" y2="17" />
        </svg>
      </button>
    </div>
  );
}
