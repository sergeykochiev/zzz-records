"use client"
import { GenshinDB } from "@/common/database/Genshin/init";
import Games from "@/common/enum/Games";
import mainPageFactory from "@/common/factories/mainPageFactory";
import GenshinGachaType from "@/common/types/dto/Genshin/GachaType";
import GenshinRankType from "@/common/types/dto/Genshin/RankType";
const GenshinPage = mainPageFactory({
    game: Games.GENSHIN,
    dbInstance: GenshinDB,
    gachaTypes: GenshinGachaType,
    rankTypes: GenshinRankType
})
export default GenshinPage