"use client"
import { StarrailDB } from "@/common/database/Starrail/init";
import gachaTypePageFactory from "@/common/factories/component/gachaTypePageFactory";
import StarrailGachaType from "@/common/types/Starrail/GachaType";
import StarrailRankType from "@/common/types/dto/Starrail/RankType";
const StarrailGachaTypePage = gachaTypePageFactory({
    dbInstance: StarrailDB,
    gachaTypes: StarrailGachaType,
    rankTypes: StarrailRankType
})
export default StarrailGachaTypePage