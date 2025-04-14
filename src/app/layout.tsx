import "@/styles/globals.css";

import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { type Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { TRPCReactProvider } from "@/trpc/react";

export const metadata: Metadata = {
  title: "My Bucket - Secure, Scalable File Storage for Your Applications",
  description: "Store and serve files with ease. Our storage bucket solution provides a simple, reliable way to manage your application's files.",
  keywords: ["storage", "file storage", "cloud storage", "bucket", "file management", "object storage"],
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${geist.variable}`}>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
