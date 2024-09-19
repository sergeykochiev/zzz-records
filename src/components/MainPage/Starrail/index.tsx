"use client"
import { StarrailDB } from "@/common/database/Starrail/init";
import GachaLogApiRouteUrls from "@/common/enum/GachaLogRouteApiUrls";
import Games from "@/common/enum/Games";
import mainPageFactory from "@/common/factories/mainPageFactory";
import StarrailGachaType from "@/common/types/dto/Starrail/GachaType";
import StarrailRankType from "@/common/types/dto/Starrail/RankType";
const StarrailMainPage = mainPageFactory({
    game: Games.STARRAIL,
    dbInstance: StarrailDB,
    gachaTypes: StarrailGachaType,
    rankTypes: StarrailRankType,
    gachaTypeField: "gacha_type",
    apiUrl: GachaLogApiRouteUrls.STARRAIL
})
export default StarrailMainPage
