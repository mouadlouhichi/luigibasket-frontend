import React, { FC, use, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { getUserFromSession } from "@/lib/getUserFromSession";
import { trpc } from "@/providers/trpcProvider";
import { PathName } from "@/routers/types";
import { AppUser } from "@/types";
import toast from "react-hot-toast";

import useSurveyStore from "@/hooks/useSurvey";

import Header from "./Header";

export type SiteHeaders = "Header 1" | "Header 2" | "Header 3";

interface SiteHeaderProps {
  type?: "moderated" | "main" | "dashboard";
  className?: string;
  hasBorder?: boolean;
}

const SiteHeader: FC<SiteHeaderProps> = ({ type = "main", className = "" }) => {
  const session = use(getCurrentUser());
  const user = getUserFromSession(session);


  return (
    <>
      <Header
        className={className}
        type={type}
        user={user as AppUser}
      />
      <div className="invisible absolute h-1"></div>
    </>
  );
};

export default SiteHeader;
