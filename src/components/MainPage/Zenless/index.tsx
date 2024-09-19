"use client"
import { ZenlessDB } from "@/common/database/Zenless/init";
import GachaLogApiRouteUrls from "@/common/enum/GachaLogRouteApiUrls";
import Games from "@/common/enum/Games";
import mainPageFactory from "@/common/factories/mainPageFactory";
import ZenlessGachaType from "@/common/types/dto/Zenless/GachaType";
import ZenlessRankType from "@/common/types/dto/Zenless/RankType";
const ZenlessMainPage = mainPageFactory({
    game: Games.ZENLESS,
    dbInstance: ZenlessDB,
    gachaTypes: ZenlessGachaType,
    rankTypes: ZenlessRankType,
    gachaTypeField: "real_gacha_type",
    apiUrl: GachaLogApiRouteUrls.ZENLESS
})
export default ZenlessMainPage