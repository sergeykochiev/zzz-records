"use client"
import Games from "@/common/enum/Games";
import NavBarWrapper from "../NavBarWrapper";
import { usePathname, useRouter } from "next/navigation";
import Tab from "../Tab";
import { useId } from "react";
export default function MainNavBar({ gamePathSegmentIndex = 1 }: { gamePathSegmentIndex?: number }) {
    const router = useRouter()
    const pathname = usePathname()
    const id = useId()
    const paths = pathname.split("/")
    const gameNames: Record<Games, string> = {
        "hk4e": "Genshin Impact",
        "hkrpg": "Honkai: Star Rail",
        "nap": "Zenless Zone Zero"
    }
    return <NavBarWrapper>
        {Object.values(Games).map(key => {
            return <Tab key={key} game={key as Games} onChange={() => {
                router.push(`/${key}`)
            }} checked={paths[gamePathSegmentIndex] == String(key)} name={id}>
                {gameNames[key as Games]}
            </Tab>
        })}
    </NavBarWrapper>
}