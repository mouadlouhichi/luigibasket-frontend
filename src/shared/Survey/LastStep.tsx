/**
 * LastStep component of Survey
 * This component is used to render the last step of the survey
 * TODO 1: guest user  -> login > Saving... -> save survey
 * TODO 2: authenticated user -> Saving... -> save survey
 *
 */

"use client";

import { use, useEffect } from "react";
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

  const renderLastStep = () => {
    if (!user) {
      return (
        <Auth
          heading="Create account"
          description="Login with Social Media or enter your details."
          callbackUrl={callbackUrl}
        />
      );
    } else {
      return <Button onClick={(e) => save(e)}>Save</Button>;
    }
  };

  const toggleSurveyMutation = trpc.survey.toggle.useMutation({
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const createSurveyMutation = trpc.survey.create.useMutation({
    onSuccess: () => {
      toggleSurveyMutation.mutateAsync({ userId: user?.id || "" });
      toast.success("Added to My List");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const save = (e: any) => {
    e.preventDefault();
    createSurveyMutation.mutate({
      ...survey,
      user: {
        id: user?.id,
      },
    });
  };
  return (
    <>
      <Auth
        heading="Create account"
        description="Login with Social Media or enter your details."
        callbackUrl={callbackUrl}
      />
      <button onClick={(e) => save(e)}>Save</button>
    </>
  );
}

export default LastStep;
