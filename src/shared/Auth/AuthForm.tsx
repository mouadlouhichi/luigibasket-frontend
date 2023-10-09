import React from "react";
import { hash } from "bcrypt";
import { Control, Controller } from "react-hook-form";

import { ISignUp } from "@/data/valids/auth";
import Button from "@/components/Button";
import Input from "@/components/Input";

interface Props {
  onSubmit: any;
  type?: "login" | "signup";
  control: Control<
    {
      email: string;
      password: string;
      username?: string | undefined;
    },
    any
  >;
}

const AuthForm: React.FC<Props> = ({ onSubmit, type, control }) => {
  // Define the component's logic and rendering here

  const handleSubmit = async (data: any) => {
    const { password } = data;
    const hashedPassword = await hash(password, 10);
    const payload = {
      ...data,
      password: hashedPassword,
    };
    return onSubmit(payload);
  };

  return (
    <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
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
  );
};

export default AuthForm;
