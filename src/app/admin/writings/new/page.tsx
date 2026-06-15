import WritingsPostEditor from "@/components/admin/WritingsPostEditor";
import { emptyPostForm } from "@/data/writingsPage";

export default function NewWritingPage() {
  return <WritingsPostEditor mode="new" initialForm={emptyPostForm()} />;
}
