"use client"
import { ZenlessDB } from "@/common/database/Zenless/init";
import gachaTypePageFactory from "@/common/factories/gachaTypePageFactory";
import ZenlessGachaType from "@/common/types/dto/Zenless/GachaType";
import ZenlessRankType from "@/common/types/dto/Zenless/RankType";
const ZenlessGachaTypePage = gachaTypePageFactory({
    dbInstance: ZenlessDB,
    gachaTypes: ZenlessGachaType,
    rankTypes: ZenlessRankType
})
export default ZenlessGachaTypePage