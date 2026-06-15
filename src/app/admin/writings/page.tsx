import WritingsListings from "@/components/admin/WritingsListings";
import { getWritingsPageContentForAdmin } from "@/app/actions/writingsPageActions";

export default async function AdminWritingsPage() {
  const content = await getWritingsPageContentForAdmin();

  return <WritingsListings content={content} />;
}
