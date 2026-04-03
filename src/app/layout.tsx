import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ShopRight",
  description:
    "ShopRight is the AI decision layer for real-world commerce.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
