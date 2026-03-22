import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Siddhesh Salve | Data Engineer",
  description: "Data Engineer & Analytics Specialist. Building scalable ETL/ELT pipelines, streaming architectures, and cloud-native analytics on AWS.",
  keywords: ["Data Engineer", "Data Analyst", "AWS", "Python", "PySpark", "SQL", "ETL", "Analytics", "Siddhesh Salve"],
  authors: [{ name: "Siddhesh Salve" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Siddhesh Salve | Data Engineer",
    description: "Building scalable ETL/ELT pipelines and cloud-native analytics solutions on AWS",
    url: "https://siddhesh-salve-portfolio.vercel.app",
    siteName: "Siddhesh Salve Portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
        suppressHydrationWarning
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
