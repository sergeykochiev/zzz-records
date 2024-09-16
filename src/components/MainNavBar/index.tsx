"use client"
import { usePathname, useRouter } from "next/navigation";
import Tab from "../Tab";
import Games from "@/common/enum/Games";
interface MainNavBarProps {
    gameNamePathIndex?: number
}
export default function MainNavBar({ gameNamePathIndex = 1 }: MainNavBarProps) {
    const pathname = usePathname()
    const paths = pathname.split("/")
    const router = useRouter()
    const gameRoutes = {
        1: "genshin",
        2: "starrail",
        3: "zenless"
    }
    return <div className="flex items-center w-full">
        <Tab name="main-nav" checked={paths[gameNamePathIndex]==gameRoutes[Games.GENSHIN]} game={Games.GENSHIN} onChange={() => router.push(`/${gameRoutes[Games.GENSHIN]}`)}>
            Genshin Impact
        </Tab>
        <Tab name="main-nav" checked={paths[gameNamePathIndex]==gameRoutes[Games.STARRAIL]} game={Games.STARRAIL} onChange={() => router.push(`/${gameRoutes[Games.STARRAIL]}`)}>
            Honkai: Star Rail
        </Tab>
        <Tab name="main-nav" checked={paths[gameNamePathIndex]==gameRoutes[Games.ZENLESS]} game={Games.ZENLESS} onChange={() => router.push(`/${gameRoutes[Games.ZENLESS]}`)}>
            Zenless Zone Zero
        </Tab>
    </div>
}