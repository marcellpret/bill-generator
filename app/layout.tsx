import { GeistSans } from "geist/font/sans";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import AuthButton from "@/components/AuthButton";
import Link from "next/link";

const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const metadata = {
    metadataBase: new URL(defaultUrl),
    title: "Next.js and Supabase Starter Kit",
    description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={GeistSans.className}>
            <body>
                {/* <ThemeProvider
                    attribute="class"
                    // defaultTheme="light"
                    // enableSystem
                    // disableTransitionOnChange
                > */}
                <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                    <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
                        <AuthButton />
                        <Link href="/profile">Profile</Link>
                        <Link href="/bills">Bills</Link>
                        <Link href="/">Home</Link>
                    </div>
                </nav>
                <main className=" p-4">{children}</main>
                <Toaster />
                {/* </ThemeProvider> */}
            </body>
        </html>
    );
}
