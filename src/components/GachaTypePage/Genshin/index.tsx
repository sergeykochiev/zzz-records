"use client"
import { GenshinDB } from "@/common/database/Genshin/init";
import gachaTypePageFactory from "@/common/factories/gachaTypePage";
import GenshinGachaType from "@/common/types/dto/Genshin/GachaType";
import GenshinRankType from "@/common/types/dto/Genshin/RankType";
const GenshinGachaTypePage = gachaTypePageFactory({
    dbInstance: GenshinDB,
    gachaTypes: GenshinGachaType,
    rankTypes: GenshinRankType
})
export default GenshinGachaTypePage