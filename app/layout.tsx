import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anisa Chuzaimatuz Zahro | Portfolio",
  description:
    "Personal portfolio of Anisa Chuzaimatuz Zahro, Universitas Yudharta Pasuruan.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
