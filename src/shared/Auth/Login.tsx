import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { Link } from "@/lib/router-events";
import { trpc } from "@/providers/trpcProvider";
import { useUserContext } from "@/providers/UserProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { authSchema, ILogin } from "@/data/valids/auth";

import AuthForm from "./AuthForm";
import SocialAuthProviders from "./SocialAuthProviders";

interface Props {
  heading: string;
  description: string;
  callbackUrl: string;
  type?: "login" | "signup";
}

function Auth({ heading, description, callbackUrl, type }: Props) {
  const { setUser } = useUserContext();
  //TODO add form error
  const { handleSubmit, control, reset, formState } = useForm<ILogin>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(authSchema),
  });

  const router = useRouter();

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (data: ILogin) => {
      return fetch("/api/auth/login", {
        method: "POST",
        cache: "no-cache",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });
    },

    onSuccess: async (data) => {
      const user = await data.json();
      /*   setUser({
        id: user.id,
        email: user.email,
        name: user.user_metadata.username,
        image: user.user_metadata.image,
        hasSurvey: user.app_metadata.hasSurvey,
        userRole: user.app_metadata.userRole,
      });

      console.log(user, "user from login___"); */
      toast.success("Login successfully");
      router.push("/home");
    },
    onError: () => {
      toast.error("Error signing");
    },
  });

  const onSubmit = useCallback(
    async (data: ILogin) => {
      try {
        await mutateAsync({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        console.error(err);
        toast.error("Error signing up");
      }
    },
    [mutateAsync, router, reset],
  );

  return (
    <>
      <div className={`nc-PageLogin  relative row-start-3 md:row-start-2`}>
        <h2 className="mt-4 flex items-center justify-center text-2xl font-semibold leading-[115%] text-neutral-900 dark:text-neutral-100 md:text-3xl md:leading-[115%]">
          {heading}
        </h2>
        <p className="mb-6 flex  justify-center">{description}</p>
        <div className="mx-auto max-w-md space-y-6 ">
          <SocialAuthProviders callbackUrl={callbackUrl} />
          {/* OR */}
          <div className="relative text-center">
            <span className="relative z-10 inline-block bg-white px-4 text-sm font-medium dark:bg-neutral-900 dark:text-neutral-400">
              OR
            </span>
            <div className="absolute left-0 top-1/2 w-full -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
          </div>
          {/* FORM */}
          <AuthForm
            type={type}
            control={control}
            formState={formState}
            onSubmit={handleSubmit(onSubmit)}
            loading={isLoading}
          />

          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            New user? {` `}
            <Link href="/signup" className="font-semibold underline">
              Create an account
            </Link>
          </span>
        </div>
      </div>
    </>
  );
}

export default Auth;
