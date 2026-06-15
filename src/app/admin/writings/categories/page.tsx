import WritingsCategoriesManager from "@/components/admin/WritingsCategoriesManager";
import { getWritingCategoriesForAdmin } from "@/app/actions/writingCategoriesActions";

export default async function WritingsCategoriesPage() {
  const categories = await getWritingCategoriesForAdmin();

  return <WritingsCategoriesManager initialCategories={categories} />;
}
