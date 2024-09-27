"use client"
import { StarrailDB } from "@/common/database/Starrail/init";
import Games from "@/common/enum/Games";
import mainPageFactory from "@/common/factories/component/mainPageFactory";
import StarrailGachaType from "@/common/types/game/Starrail/GachaType";
import StarrailRankType from "@/common/types/game/Starrail/RankType";
const StarrailMainPage = mainPageFactory({
    game: Games.STARRAIL,
    dbInstance: StarrailDB,
    gachaTypes: StarrailGachaType,
    rankTypes: StarrailRankType,
    gachaTypeField: "gacha_type",
})
export default StarrailMainPage
