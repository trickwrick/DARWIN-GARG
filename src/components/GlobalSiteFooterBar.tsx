import SiteFooterBar from "@/components/SiteFooterBar";
import { getHomepageContent } from "@/lib/homepage";

export default async function GlobalSiteFooterBar() {
  const { socialLinks } = await getHomepageContent();
  return <SiteFooterBar socialLinks={socialLinks} />;
}
