import GenshinGachaType from "@/common/types/dto/Genshin/GachaType";
import NavBarWrapper from "../NavBarWrapper";
import StarrailGachaType from "@/common/types/dto/Starrail/GachaType";
import ZenlessGachaType from "@/common/types/dto/Zenless/GachaType";
import TargetGachaTypeEnum from "@/common/types/TargetGachaType";
import Tab from "../Tab";
import { usePathname, useRouter } from "next/navigation";
import { useId } from "react";
export default function GachaTypeNavBar<GachaType extends GenshinGachaType | StarrailGachaType | ZenlessGachaType>({ gachaTypePathIndex = 2, gachaTypes }: { gachaTypePathIndex?: number, gachaTypes: TargetGachaTypeEnum<GachaType> }) {
    const pathname = usePathname()
    const paths = pathname.split("/")
    const router = useRouter()
    const id = useId()
    return <NavBarWrapper>
        {
            Object.keys(gachaTypes).map(key => {
                if(!+key) return
                const currentGachaType = gachaTypes[key as keyof TargetGachaTypeEnum<GachaType>].toString().toLowerCase()
                return <Tab key={currentGachaType} huge name={id} checked={paths[gachaTypePathIndex] == currentGachaType} onChange={() => router.push(`./${currentGachaType}`)}>
                    {currentGachaType}
                </Tab>
            })
        }
    </NavBarWrapper>
}