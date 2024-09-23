"use client"
import { ZenlessDB } from "@/common/database/Zenless/init";
import GachaLogApiRouteUrls from "@/common/api/routes/endpoints/GachaLog";
import Games from "@/common/enum/Games";
import mainPageFactory from "@/common/factories/component/mainPageFactory";
import ZenlessGachaType from "@/common/types/Zenless/GachaType";
import ZenlessRankType from "@/common/types/Zenless/RankType";
const ZenlessMainPage = mainPageFactory({
    game: Games.ZENLESS,
    dbInstance: ZenlessDB,
    gachaTypes: ZenlessGachaType,
    rankTypes: ZenlessRankType,
    gachaTypeField: "real_gacha_type",
    apiUrl: GachaLogApiRouteUrls.ZENLESS
})
export default ZenlessMainPage