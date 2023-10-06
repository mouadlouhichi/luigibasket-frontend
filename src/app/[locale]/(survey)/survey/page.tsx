"use client";

import React, { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup"; // Import the resolver you are using (e.g., yup)

import { FieldValues, Resolver, useForm } from "react-hook-form";
import { useWizard, Wizard } from "react-use-wizard";

import { initialFormState, surveyData, surveySchema } from "@/data/survey";
import { useIsClient } from "@/hooks/use-is-client";
import useSurveyStore from "@/hooks/useSurvey";
import IntroStep from "@/shared/Survey/IntroStep";
import LastStep from "@/shared/Survey/LastStep";
import Step from "@/shared/Survey/Step";

const SurveyPage = () => {
  const { control, watch } = useForm<FieldValues>({
    resolver: yupResolver(surveySchema) as any,
    shouldUnregister: false,
    defaultValues: initialFormState,
  });

  const previousStep = React.useRef<number>(0);

  // Callback version of watch.  It's your responsibility to unsubscribe when done.
  useEffect(() => {
    const subscription = watch((value, { name, type }) =>
      console.log(value, name, type),
    );
    return () => subscription.unsubscribe();
  }, [watch]);

  const allFields = watch();

  const renderSteps = () => {
    return surveyData.groups.map((group) => {
      return group.questions.map((item, id) => {
        return (
          <Step
            key={id}
            item={item}
            group={group}
            previousStep={previousStep}
            control={control}
            allFields={allFields}
          />
        );
      });
    });
  };

  const { showParagraph } = useSurveyStore();
  const mounted = useIsClient();

  return (
    <>
      <div className=" mx-auto mt-20 max-w-3xl text-center md:mt-8">
        <h2 className="px-4 text-3xl font-semibold">
          Help us match you to{" "}
          <span className="text-primary-500">the right therapist</span>
        </h2>
        {mounted && showParagraph && (
          <p className="mt-4 hidden text-neutral-500 dark:text-neutral-400 md:block">
            Please fill out this short questionnaire to provide some background
            information about you and the issues you&apos; d like to deal with
            in therapy. It would help us match you with the most suitable
            therapist for you. Your answers will also give this therapist a good
            starting point in getting to know you.
          </p>
        )}
      </div>

      <div
        className={`mx-auto min-h-[calc(100vh_-_80px)] max-w-2xl px-4  pt-6 sm:py-8 lg:pb-4`}
      >
        <div className="space-y-8">
          <div className="SurveySection__wrap bg-white  pb-4 shadow dark:bg-neutral-800">
            <Wizard>
              <IntroStep previousStep={previousStep} />
              {renderSteps()}
              <LastStep survey={allFields} />
            </Wizard>
          </div>
        </div>
      </div>
    </>
  );
};

export default SurveyPage;
