import React, { useCallback } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Link } from "@/lib/router-events";
import { trpc } from "@/providers/trpcProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { getHashedPassword } from "@/server/actions/auth";
import { authSchema, ISignUp } from "@/data/valids/auth";
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
  const renderAuthFooter = () => {
    switch (type) {
      case "login":
        return (
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            New user? {` `}
            <Link href="/signup" className="font-semibold underline">
              Create an account
            </Link>
          </span>
        );

      case "signup":
        return (
          <span className="block text-center  text-neutral-700 dark:text-neutral-300">
            Already have an account? {` `}
            <Link href="/login" className="font-semibold underline">
              Sign in
            </Link>
          </span>
        );

      default:
        break;
    }
  };
  //TODO add form error
  const { handleSubmit, control, reset } = useForm<ISignUp>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(authSchema),
  });

  const { mutateAsync } = trpc.auth.signup.useMutation({
    onSuccess: async (_, validate) => {
      reset();
      handleSignIn(validate);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  const router = useRouter();

  const onSubmit = useCallback(
    async (data: ISignUp) => {
      const hashedPassword = await getHashedPassword(data.password);
      try {
        const result = await mutateAsync({
          email: data.email,
          password: hashedPassword,
          username: data.username,
        });
        if (result.status === 201) {
          reset();
          router.push("/home");
        }
      } catch (err) {
        console.error(err);
      }
    },
    [mutateAsync, router, reset],
  );
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
          {/*  <AuthForm
            type={type}
            control={control}
            onSubmit={handleSubmit(onSubmitHandler)}
          /> */}

          <form
            className="grid grid-cols-1 gap-6"
            onSubmit={handleSubmit(onSubmitHandler)}
          >
            {type === "signup" && (
              <label className="block">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Username
                </span>
                <Controller
                  name="username"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder="Adon Shaka"
                      className="mt-1"
                      {...field}
                    />
                  )}
                />
              </label>
            )}
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email address
              </span>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    type="email"
                    placeholder="example@example.com"
                    className="mt-1"
                    {...field}
                  />
                )}
              />
            </label>
            <label className="block">
              <span className="flex items-center justify-between text-neutral-800 dark:text-neutral-200">
                Password
              </span>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input type="password" className="mt-1" {...field} />
                )}
              />
            </label>
            <Button type="submit">Continue</Button>
          </form>
          {renderAuthFooter()}
        </div>
      </div>
    </>
  );
}

export default Auth;
