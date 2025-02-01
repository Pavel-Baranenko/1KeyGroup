import React from "react";
import type { Metadata } from "next";
import styles from './index.module.scss'


export const metadata: Metadata = {
  title: "1Key Map",
  description: "Search for real estate on a map",
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
        <div className={styles.map}>
          {children}
        </div>
      </body>
    </html>
  );
}
