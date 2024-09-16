import { GenshinDB } from "@/common/database/Genshin/init";
import Games from "@/common/enum/Games";
import GenshinGachaType from "@/common/types/dto/Genshin/GachaType";
import GenshinRankType from "@/common/types/dto/Genshin/RankType";
import MainPage from "@/components/MainPage";
export default function Page() {
    return <MainPage game={Games.GENSHIN} dbInstance={GenshinDB} gachaTypes={GenshinGachaType} rankTypes={GenshinRankType}/>
}