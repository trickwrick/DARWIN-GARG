import ContactPageEditor from "@/components/admin/ContactPageEditor";
import { getContactPageContentForAdmin } from "@/app/actions/contactPageActions";

export default async function AdminConnectPage() {
  const content = await getContactPageContentForAdmin();

  return <ContactPageEditor initialContent={content} />;
}
