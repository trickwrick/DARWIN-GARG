import AdminPageShell from "@/components/admin/AdminPageShell";

export default function AdminBookPage() {
  return (
    <AdminPageShell
      title="The Book"
      description="Manage book page copy, cover details, avatars, reviews, FAQ, and retailer links."
      publicHref="/book"
      publicLabel="View book page"
    />
  );
}
