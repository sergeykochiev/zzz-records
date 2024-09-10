import GenshinGachaType from "@/common/types/dto/Genshin/GachaType"
import StarrailGachaType from "@/common/types/dto/Starrail/GachaType"
import ZenlessGachaType from "@/common/types/dto/Zenless/GachaType"
import Games from "@/common/types/Games"
const GamesGachaTypes: Record<Games, typeof GenshinGachaType | typeof StarrailGachaType | typeof ZenlessGachaType> = {
    1: GenshinGachaType,
    2: StarrailGachaType,
    3: ZenlessGachaType
} as const
export default GamesGachaTypes