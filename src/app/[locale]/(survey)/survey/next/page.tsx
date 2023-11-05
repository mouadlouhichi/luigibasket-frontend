/* TODO:
 * POST Survey data
 * hasSurvey -> true
 * Redirect To Choose or PLP (psychologist list page)
 */

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import loadingSvg from "@/images/animations/walking.gif";
import { trpc } from "@/providers/trpcProvider";
import useAppStore from "@/store";
import toast from "react-hot-toast";
import { StateStorage, StorageValue } from "zustand/middleware";

import { surveySchema } from "@/data/valids/survey";
import { useIsClient } from "@/hooks/use-is-client";
import { useLocalStorage } from "@/hooks/use-local-storage";
import useSurveyStore, {
  initialSurveyState,
  SurveyStateProps,
} from "@/hooks/useSurvey";
import Button from "@/components/Button";

function Next() {
  const mounted = useIsClient();

  const { user } = useAppStore();
  const { survey, setSurvey } = useSurveyStore();

  const toggleSurveyMutation = trpc.survey.toggle.useMutation({
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const { mutate: saveSurvey, isLoading } = trpc.survey.create.useMutation({
    retry: false,
    onSuccess: () => {
      toggleSurveyMutation.mutate({ userId: user?.id || "" });
      setMessage("Your results are ready!, you will be redirected shortly...");
      setSurvey(initialSurveyState);
      toast.success(` data successfully saved`);
    },
    onError: (err) => toast.error(err.message),
  });

  const [message, setMessage] = useState(
    "We're making magic happen behind the scenes....",
  );
  /*   const messages = [
    "We're making progress, please hold on...",
    "Your results are ready!, you will be redirected shortly...",
  ]; */
  const surveyData = {
    ...survey,
    user: {
      id: user?.id,
    },
  };
  let validate: any;
  try {
    validate = surveySchema.parse(surveyData);
  } catch (e) {
    //console.log(err);
  }
  const router = useRouter();
  const lng = useLocale();

  useEffect(() => {
    if (mounted) {
      if (!validate) {
        if (user?.id) {
          router.push(`/${lng}/account`);
        } else {
          router.push(`/${lng}/survey`);
        }
      } else {
        saveSurvey({
          ...survey,
          user: {
            id: user?.id,
          },
        });
      }
    }
  }, [mounted]);

  return (
    <>
      <div className=" mx-auto mt-20 max-w-3xl text-center md:mt-8">
        <h2 className="px-4 text-3xl font-semibold">
          We're working on finding <br /> the{" "}
          <span className="text-primary-500">perfect therapist for you</span>
        </h2>
      </div>

      <div
        className={`mx-auto min-h-[calc(100vh_-_80px)] max-w-2xl px-4  pt-6 sm:py-8 lg:pb-4`}
      >
        <div className="space-y-8">
          <div className="SurveySection__wrap bg-white  pb-4 shadow dark:bg-neutral-800 p-0">
            <h3 className="text-center font-display mt-4 hidden text-neutral-500 dark:text-neutral-400 md:block">
              {isLoading && message}
            </h3>{" "}
            <Image src={loadingSvg} alt="loading" />
            {isLoading && <div>Saving...</div>}
            {/*  <Button
        className="btn btn-primary"
        onClick={() =>
          saveSurvey({
            ...survey,
            user: {
              id: user?.id,
            },
          })
        }
      >
        Save
      </Button> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Next;
