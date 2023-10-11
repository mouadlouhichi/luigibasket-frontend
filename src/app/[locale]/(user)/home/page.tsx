import React from "react";
import { cookies } from "next/headers";
import { Database } from "@/lib/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import PsychologistsListening from "@/shared/PsychologistsListening";
import BackgroundSection from "@/shared/PsychologistsListening/BackgroundSection";

export default async function Home() {
  return (
    <main className="min-h-[50vh] container">
      <h1 className="text-center font-bold text-4xl text-primary-6000 mt-12 font-sans">
        Welcome to Mindrested
      </h1>
      <div className="relative py-16  mt-12">
        <BackgroundSection className="bg-orange-50 dark:bg-black/20" />

        <PsychologistsListening />
      </div>
    </main>
  );
}
