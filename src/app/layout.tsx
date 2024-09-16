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
                <main>
                    <header>
                        <MainNavBar/>
                    </header>
                </main>
                {children}
            </body>
        </html>
    )
}
