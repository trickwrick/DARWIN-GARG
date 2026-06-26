import AboutPageEditor from "@/components/admin/AboutPageEditor";
import { getAboutPageContentForAdmin } from "@/app/actions/aboutPageActions";

export default async function AdminAboutPage() {
  const content = await getAboutPageContentForAdmin();

  return <AboutPageEditor initialContent={content} />;
}
