import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Tab from "@/components/Tab";
import Games from "@/common/enum/Games";

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
                        <div className="flex items-center gap-[8px]">
                            <Tab name="main-nav" game={Games.GENSHIN}>
                                Genshin Impact
                            </Tab>
                            <Tab name="main-nav" game={Games.STARRAIL}>
                                Honkai: Star Rail
                            </Tab>
                            <Tab name="main-nav" game={Games.ZENLESS}>
                                Zenless Zone Zero
                            </Tab>
                        </div>
                    </header>
                </main>
                {children}
            </body>
        </html>
    )
}
