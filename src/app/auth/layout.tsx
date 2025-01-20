import type { Metadata } from "next";
import { StoreWrapper } from "@/store/provider";
import React from "react";

export const metadata: Metadata = {
  title: "1Key Auth",
  description: "Login to 1Key Group",
};

export default function RootLayout(
  {
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

  return (
    <html lang="en">
      <body >
        <StoreWrapper>{children}</StoreWrapper>
      </body>
    </html>
  );
}
