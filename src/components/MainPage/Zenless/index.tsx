"use client"
import { ZenlessDB } from "@/common/database/Zenless/init";
import Games from "@/common/enum/Games";
import mainPageFactory from "@/common/factories/component/mainPageFactory";
import ZenlessGachaType from "@/common/types/game/Zenless/GachaType";
import ZenlessRankType from "@/common/types/game/Zenless/RankType";
const ZenlessMainPage = mainPageFactory({
    game: Games.ZENLESS,
    dbInstance: ZenlessDB,
    gachaTypes: ZenlessGachaType,
    rankTypes: ZenlessRankType,
    gachaTypeField: "real_gacha_type",
})
export default ZenlessMainPage