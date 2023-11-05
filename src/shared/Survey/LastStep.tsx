/**
 * LastStep component of Survey
 * This component is used to render the last step of the survey
 * TODO 1: guest user  -> login > Saving... -> save survey
 * TODO 2: authenticated user -> Saving... -> save survey
 *
 */

"use client";

import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { trpc } from "@/providers/trpcProvider";

import toast from "react-hot-toast";

import useSurveyStore from "@/hooks/useSurvey";
import Auth from "@/shared/Auth/Signup";
import Button from "@/components/Button";
import useAppStore from "@/store";

interface Props {
  survey: any;
}

function LastStep({ survey }: Props) {
  const lng = useLocale();
  const callbackUrl = `/${lng}/survey/next`;
  const { setSurvey } = useSurveyStore();
  const { user } = useAppStore();

  useEffect(() => {
    setSurvey(survey);
  }, []);

  const router = useRouter();
  if (user?.name) {
    router.push(`/${lng}/survey/next`);
  }
  return (
    <>
      <Auth
        type="signup"
        heading="Create account"
        description="Login with Social Media or enter your details."
        callbackUrl={callbackUrl}
      />
    </>
  );
}

export default LastStep;
