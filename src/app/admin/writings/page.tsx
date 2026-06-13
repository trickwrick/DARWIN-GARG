import AdminPageShell from "@/components/admin/AdminPageShell";

export default function AdminWritingsPage() {
  return (
    <AdminPageShell
      title="Writings"
      description="Manage featured essay, writings list, filters, and individual essay pages."
      publicHref="/blog"
      publicLabel="View writings page"
    />
  );
}
