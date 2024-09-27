"use client"
import { ZenlessDB } from "@/common/database/Zenless/init";
import gachaTypePageFactory from "@/common/factories/component/gachaTypePageFactory";
import ZenlessGachaType from "@/common/types/game/Zenless/GachaType";
import ZenlessRankType from "@/common/types/game/Zenless/RankType";
const ZenlessGachaTypePage = gachaTypePageFactory({
    dbInstance: ZenlessDB,
    gachaTypes: ZenlessGachaType,
    rankTypes: ZenlessRankType
})
export default ZenlessGachaTypePage