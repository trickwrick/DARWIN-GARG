import HomepageEditor from "@/components/admin/HomepageEditor";
import { getHomepageContentForAdmin } from "@/app/actions/homepageActions";

export default async function AdminHomepagePage() {
  const content = await getHomepageContentForAdmin();

  return <HomepageEditor initialContent={content} />;
}
