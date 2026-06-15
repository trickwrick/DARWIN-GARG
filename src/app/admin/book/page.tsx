import BookPageEditor from "@/components/admin/BookPageEditor";
import { getBookPageContentForAdmin } from "@/app/actions/bookPageActions";

export default async function AdminBookPage() {
  const content = await getBookPageContentForAdmin();

  return <BookPageEditor initialContent={content} />;
}
