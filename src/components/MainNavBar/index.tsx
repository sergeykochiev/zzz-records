"use client"
import Games from "@/common/enum/Games";
import NavBarWrapper from "../NavBarWrapper";
import { usePathname, useRouter } from "next/navigation";
import Tab from "../Tab";
import { useId } from "react";
export default function MainNavBar({ gamePathIndex = 1 }: { gamePathIndex?: number }) {
    const router = useRouter()
    const pathname = usePathname()
    const id = useId()
    const paths = pathname.split("/")
    const gameNames: Record<Games, string> = {
        1: "Genshin Impact",
        2: "Honkai: Star Rail",
        3: "Zenless Zone Zero"
    }
    return <NavBarWrapper>
        {Object.keys(Games).map(key => {
            if (!+key) return
            const gameName = Games[key as keyof typeof Games].toString().toLowerCase()
            return <Tab key={gameName} game={+key as Games} onChange={() => router.push(`/${gameName}`)} checked={paths[gamePathIndex] == String(gameName)} name={id}>
                {gameNames[Number(key) as Games]}
            </Tab>
        })}
    </NavBarWrapper>
}