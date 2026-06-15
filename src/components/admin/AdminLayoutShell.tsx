"use client";

import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";
import styles from "@/app/admin/admin.module.css";

export default function AdminLayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLogin = pathname === "/admin/login";

  return (
    <div className={styles.adminLayout}>
      <AdminSidebar />
      <main
        className={`${styles.mainContent} ${
          isLogin ? styles.mainContentFull : ""
        }`}
      >
        {children}
      </main>
    </div>
  );
}
