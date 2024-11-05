import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/provider/ThemeProvider";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "remindeme",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={cn(
          `${geistSans.variable} ${geistMono.variable} antialiased`,
          "dark"
        )}
        style={{
          colorScheme: "dark",
        }}
      >
        <body>
          <ThemeProvider>
            <div className=" flex max-h-screen w-full flex-col items-center dark:bg-black">
              <Navbar />
              <Separator />
              <main className=" flex flex-grow w-full h-full items-center justify-center dark:bg-neutral-950">
                {children}
                <Toaster />
              </main>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
