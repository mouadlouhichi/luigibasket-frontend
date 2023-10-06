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
import { useUserContext } from "@/providers/UserProvider";
import toast from "react-hot-toast";

import useSurveyStore from "@/hooks/useSurvey";
import Auth from "@/shared/Auth/Auth";
import Button from "@/components/Button";

interface Props {
  survey: any;
}

function LastStep({ survey }: Props) {
  const lng = useLocale();
  const callbackUrl = `/${lng}/survey/next`;
  const { setSurvey } = useSurveyStore();
  const { user } = useUserContext();

  useEffect(() => {
    setSurvey(survey);
  }, []);

  const router = useRouter();
  if (user) {
    router.push(`/${lng}/survey/next`);
  }
  console.log("survey__", survey);
  return (
    <>
      <Auth
        heading="Create account"
        description="Login with Social Media or enter your details."
        callbackUrl={callbackUrl}
      />
    </>
  );
}

export default LastStep;
