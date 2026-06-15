import { notFound } from "next/navigation";
import WritingsPostEditor from "@/components/admin/WritingsPostEditor";
import { getWritingPostForEdit } from "@/lib/writingsPostAdmin";

type EditWritingPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function EditWritingPage({ params }: EditWritingPageProps) {
  const { slug } = await params;
  const data = await getWritingPostForEdit(slug);

  if (!data) {
    notFound();
  }

  return (
    <WritingsPostEditor
      mode="edit"
      initialForm={data.form}
      originalSlug={slug}
    />
  );
}
