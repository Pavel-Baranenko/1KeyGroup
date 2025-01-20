import React from "react";
import type { Metadata } from "next";
import "@/styles/normalise.css"
import "@/styles/global.scss"
import { StoreWrapper } from "@/store/provider";
// import MobileBar from "@/components/layouts/ModileBar";


export const metadata: Metadata = {
  title: "1Key",
  description: "Real Estate Platform where clients meet brokers",
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
        <StoreWrapper>
          {children}
          {/* <MobileBar /> */}
        </StoreWrapper>
      </body>
    </html>
  );
}
