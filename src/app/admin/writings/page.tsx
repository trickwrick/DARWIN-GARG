import WritingsPageEditor from "@/components/admin/WritingsPageEditor";
import { getWritingsPageContentForAdmin } from "@/app/actions/writingsPageActions";

export default async function AdminWritingsPage() {
  const content = await getWritingsPageContentForAdmin();

  return <WritingsPageEditor initialContent={content} />;
}
