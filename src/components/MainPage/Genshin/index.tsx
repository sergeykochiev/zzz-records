"use client"
import { GenshinDB } from "@/common/database/Genshin/init";
import GachaLogApiRouteUrls from "@/common/enum/GachaLogRouteApiUrls";
import Games from "@/common/enum/Games";
import mainPageFactory from "@/common/factories/component/mainPageFactory";
import GenshinGachaType from "@/common/types/Genshin/GachaType";
import GenshinRankType from "@/common/types/Genshin/RankType";
const GenshinMainPage = mainPageFactory({
    game: Games.GENSHIN,
    dbInstance: GenshinDB,
    rankTypes: GenshinRankType,
    gachaTypeField: "gacha_type",
    apiUrl: GachaLogApiRouteUrls.GENSHIN
})
export default GenshinMainPage