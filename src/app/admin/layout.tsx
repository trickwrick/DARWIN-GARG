import AdminLayoutShell from "@/components/admin/AdminLayoutShell";
import styles from "./admin.module.css";

export const metadata = {
  title: "Admin Dashboard - Darwin Garg",
  description: "Admin panel for content management",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayoutShell>{children}</AdminLayoutShell>;
}
