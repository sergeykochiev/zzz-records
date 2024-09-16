import { StarrailDB } from "@/common/database/Starrail/init";
import Games from "@/common/enum/Games";
import StarrailGachaType from "@/common/types/dto/Starrail/GachaType";
import StarrailRankType from "@/common/types/dto/Starrail/RankType";
import MainPage from "@/components/MainPage";
export default function Page() {
    return <MainPage game={Games.GENSHIN} dbInstance={StarrailDB} gachaTypes={StarrailGachaType} rankTypes={StarrailRankType}/>
}