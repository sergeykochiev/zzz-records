"use client"
import { StarrailDB } from "@/common/database/Starrail/init";
import GachaLogApiRouteUrls from "@/common/api/routes/endpoints/GachaLog";
import Games from "@/common/enum/Games";
import mainPageFactory from "@/common/factories/component/mainPageFactory";
import StarrailGachaType from "@/common/types/Starrail/GachaType";
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
