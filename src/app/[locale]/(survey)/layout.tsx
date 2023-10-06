import { usePathname } from "next/navigation";

import SiteHeader from "@/shared/Header/SiteHeader";
import Footer from "@/components/Footer";

interface SurveyLayoutProps {
  children: React.ReactNode;
  params: any;
}
export default function SurveyLayout({ children, params }: SurveyLayoutProps) {
  return (
    <div className="min-h-screen bg-lightGreen-500 bg-lines-pattern bg-cover bg-no-repeat  dark:bg-neutral-900 dark:bg-dark-lines md:bg-[center_15rem]">
      <SiteHeader type="moderated" className=" col-span-2 shadow-sm" />
      {children}
      <Footer className="bg-neutral-50 dark:bg-neutral-900" />
    </div>
  );
}
