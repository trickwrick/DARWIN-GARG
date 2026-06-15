import WritingsTagsManager from "@/components/admin/WritingsTagsManager";
import { getWritingTagsForAdmin } from "@/app/actions/writingTagsActions";

export default async function WritingsTagsPage() {
  const tags = await getWritingTagsForAdmin();

  return <WritingsTagsManager initialTags={tags} />;
}
