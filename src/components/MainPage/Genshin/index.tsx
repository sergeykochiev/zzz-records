"use client"
import { GenshinDB } from "@/common/database/Genshin/init";
import GachaLogApiRouteUrls from "@/common/api/routes/endpoints/GachaLog";
import Games from "@/common/enum/Games";
import mainPageFactory from "@/common/factories/component/mainPageFactory";
import GenshinGachaType from "@/common/types/game/Genshin/GachaType";
import GenshinRankType from "@/common/types/game/Genshin/RankType";
import GenshinStandartCharacters from "@/common/types/game/Genshin/StandartCharacters";
const GenshinMainPage = mainPageFactory({
    game: Games.GENSHIN,
    dbInstance: GenshinDB,
    gachaTypes: GenshinGachaType,
    rankTypes: GenshinRankType,
    standartCharacters: GenshinStandartCharacters,
    gachaTypeField: "gacha_type",
})
export default GenshinMainPage