"use client";

import { useState } from "react";
import { BASE_URL, loginSocials } from "@/app";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Provider } from "@supabase/supabase-js";

import Button from "@/components/Button";

function SocialAuthProviders({ callbackUrl }: { callbackUrl: string }) {
  const [isLoading, setIsloading] = useState(false);
  const supabase = createClientComponentClient();

  return (
    <div className="flex justify-center gap-10">
      {loginSocials.map((item, index) => (
        <Button
          intent="circle"
          size="none"
          key={index}
          disabled={isLoading}
          className="h-[3rem] w-[3rem] bg-primary-50  dark:bg-neutral-800 "
          onClick={async () => {
            setIsloading(true);
            supabase.auth.signInWithOAuth({
              provider: item.provider as Provider,
              options: {
                redirectTo: `${BASE_URL}/auth/callback`,
              },
            });
          }}
        >
          {item.icon && item.icon}
        </Button>
      ))}
    </div>
  );
}

export default SocialAuthProviders;
