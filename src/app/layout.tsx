import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Tab from "@/components/Tab";
import Games from "@/common/enum/Games";
import MainNavBar from "@/components/MainNavBar";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "ZZZ RECORDS",
    description: "a website for saving your ZZZ wishes",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <main className="flex flex-col items-center bg-hwh-background-dark min-h-screen">
                    <div className="w-[1440px] flex flex-col gap-[24px]">
                        <MainNavBar/>
                        {children}
                    </div>
                </main>
            </body>
        </html>
    )
}
