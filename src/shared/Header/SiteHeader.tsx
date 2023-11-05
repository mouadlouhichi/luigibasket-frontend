import React, { FC, use, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { getCurrentUser, getHasSurvey } from "@/lib/getCurrentUser";
import { getUserFromSession } from "@/lib/getUserFromSession";
import { trpc } from "@/providers/trpcProvider";
import { PathName } from "@/routers/types";
import { AppUser } from "@/types";
import toast from "react-hot-toast";

import useSurveyStore from "@/hooks/useSurvey";

import Header from "./Header";

export type SiteHeaders = "Header 1" | "Header 2" | "Header 3";

const OPTIONS = {
  root: null,
  rootMargin: "0px",
  threshold: 1.0,
};
//let OBSERVER: IntersectionObserver | null = null;
const PAGES_HIDE_HEADER_BORDER: PathName[] = [
  "/" as PathName,
  "/account" as PathName,
  "/account-password" as PathName,
  "/account-billing" as PathName,
];

interface SiteHeaderProps {
  type?: "moderated" | "main" | "dashboard";
  className?: string;
  hasBorder?: boolean;
}

const SiteHeader: FC<SiteHeaderProps> = ({
  type = "main",
  className = "",
  hasBorder = false,
}) => {
  //const anchorRef = useRef<HTMLDivElement>(null);

  //const [isTopOfPage, setIsTopOfPage] = useState(true);
  // const pathname = usePathname();

  /*   useEffect(() => {
    setIsTopOfPage(window.pageYOffset < 5);
  }, []);


  const intersectionCallback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      setIsTopOfPage(entry.isIntersecting);
    });
  };

  useEffect(() => {
    // disconnect the observer
    // observer for show the LINE bellow header
    if (!PAGES_HIDE_HEADER_BORDER.includes(pathname as PathName)) {
      OBSERVER && OBSERVER.disconnect();
      OBSERVER = null;
      return;
    }
    if (!OBSERVER) {
      OBSERVER = new IntersectionObserver(intersectionCallback, OPTIONS);
      anchorRef.current && OBSERVER.observe(anchorRef.current);
    }
  }, [pathname]);
 */
  /* const renderHeader = () => {
    let headerClassName =
      "border-b border-neutral-200 dark:border-b dark:border-neutral-700";
    if (PAGES_HIDE_HEADER_BORDER.includes(pathname as PathName)) {
      headerClassName =
        isTopOfPage && !hasBorder
          ? ""
          : " shadow-sm border-b border-neutral-200 dark:border-b dark:border-neutral-700";
    }
    // add logic for partner
    return <Header className={className + headerClassName} type={type} />;
  }; */

  const session = use(getCurrentUser());
  const user = getUserFromSession(session);
  const hasSurvey = use(getHasSurvey(user?.id));

  return (
    <>
      <Header
        className={className}
        type={type}
        user={user as AppUser}
        hasSurvey={hasSurvey}
      />
      <div className="invisible absolute h-1"></div>
    </>
  );
};

export default SiteHeader;
