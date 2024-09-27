"use client"
import { GenshinDB } from "@/common/database/Genshin/init";
import gachaTypePageFactory from "@/common/factories/component/gachaTypePageFactory";
import GenshinGachaType from "@/common/types/game/Genshin/GachaType";
import GenshinRankType from "@/common/types/game/Genshin/RankType";
const GenshinGachaTypePage = gachaTypePageFactory({
    dbInstance: GenshinDB,
    gachaTypes: GenshinGachaType,
    rankTypes: GenshinRankType,
    
})
export default GenshinGachaTypePage