"use client";

import React from "react";
import { NextIntlClientProvider } from "next-intl";
import _ from "lodash";

/**
 * Next.js 13 internationalization library
 * @see https://next-intl-docs.vercel.app
 */

export function NextIntlProvider({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode;
  locale: string;
  messages: any;
}) {
  return (
    <NextIntlClientProvider
      onError={() => {}}
      getMessageFallback={({ error, key, namespace }) => {
        const nestedMessages = _.get(messages, namespace ?? "");
        if (!nestedMessages) return key;
        if (error.code === "MISSING_MESSAGE") return nestedMessages["default"];
        return nestedMessages[key];
      }}
      locale={locale}
      messages={messages}
    >
      {children}
    </NextIntlClientProvider>
  );
}
