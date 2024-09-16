"use client"
import { ZenlessDB } from "@/common/database/Zenless/init";
import Games from "@/common/enum/Games";
import mainPageFactory from "@/common/factories/mainPageFactory";
import ZenlessGachaType from "@/common/types/dto/Zenless/GachaType";
import ZenlessRankType from "@/common/types/dto/Zenless/RankType";
const ZenlessPage = mainPageFactory({
    game: Games.ZENLESS,
    dbInstance: ZenlessDB,
    gachaTypes: ZenlessGachaType,
    rankTypes: ZenlessRankType
})
export default ZenlessPage