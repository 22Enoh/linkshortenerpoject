import {
  ClerkProvider,
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { shadcn } from "@clerk/ui/themes";
import { Link2 } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LinkShortener | Long links, meet short links",
  description:
    "Create clean, easy-to-share short links and keep them organized in one simple dashboard.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ClerkProvider appearance={{ theme: shadcn }}>
          <header className="w-full border-b border-border/60">
            <nav
              aria-label="Main navigation"
              className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 sm:px-10 lg:px-12"
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 font-semibold tracking-tight text-foreground"
              >
                <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Link2 className="size-4" aria-hidden="true" />
                </span>
                LinkShortener
              </Link>
              <div className="flex items-center gap-2">
                <Suspense fallback={null}>
                  <Show when="signed-out">
                    <SignInButton mode="modal">
                      <Button variant="ghost">Sign in</Button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <Button>Sign up</Button>
                    </SignUpButton>
                  </Show>
                  <Show when="signed-in">
                    <UserButton />
                  </Show>
                </Suspense>
              </div>
            </nav>
          </header>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}