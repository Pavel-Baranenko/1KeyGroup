import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "1Key Create Object",
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
        {children}
      </body>
    </html>
  );
}
