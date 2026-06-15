import JourneyPageEditor from "@/components/admin/JourneyPageEditor";
import { getJourneyPageContentForAdmin } from "@/app/actions/journeyPageActions";

export default async function AdminJourneyPage() {
  const content = await getJourneyPageContentForAdmin();

  return <JourneyPageEditor initialContent={content} />;
}
