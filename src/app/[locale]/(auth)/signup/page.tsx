"use client";

import React from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import authBackground from "@/images/backgrounds/authBackground-l.jpg";

import Auth from "@/shared/Auth/Signup";

function PageSignup() {
  const lng = useLocale();
  const callbackUrl = `/${lng}`;
  return (
    <>
      <div className="relative h-[30vh] md:row-span-2 md:h-screen">
        <Image
          fill
          alt="Feel MindRested"
          className="object-cover"
          src={authBackground}
          placeholder="blur"
        />
      </div>
      <Auth
        type="signup"
        heading=" Welcome back"
        description="Login with Social Media or enter your details."
        callbackUrl={callbackUrl}
      />
    </>
  );
}

export default PageSignup;
