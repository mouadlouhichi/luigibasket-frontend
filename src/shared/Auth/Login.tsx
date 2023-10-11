import React, { useCallback } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { BASE_URL } from "@/app";
import { Link } from "@/lib/router-events";
import { trpc } from "@/providers/trpcProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { authSchema, ILogin, ISignUp } from "@/data/valids/auth";
import Button from "@/components/Button";
import Input from "@/components/Input";

import AuthForm from "./AuthForm";
import SocialAuthProviders from "./SocialAuthProviders";

interface Props {
  heading: string;
  description: string;
  callbackUrl: string;
  type?: "login" | "signup";
}

function Auth({ heading, description, callbackUrl, type }: Props) {
  //TODO add form error
  const { handleSubmit, control, reset, formState } = useForm<ILogin>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(authSchema),
  });

  const router = useRouter();
  const supabase = createClientComponentClient();

  const onSubmit = useCallback(async (data: ILogin) => {
    try {
      await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error("Error signing in");
    }
  }, []);
  const handleSignIn = async (data: ISignUp) => {
    try {
      await signIn("credentials", { ...data, callbackUrl: "/home" });
      reset();
    } catch (err) {
      toast.error("Error signing in");
      console.error(err);
    }
  };

  const onSubmitLogin = useCallback(
    async (data: ISignUp) => {
      await handleSignIn(data);
    },
    [reset],
  );

  const onSubmitHandler = type === "login" ? onSubmitLogin : onSubmit;
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
            onSubmit={handleSubmit(onSubmitHandler)}
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
