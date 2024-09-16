import { ZenlessDB } from "@/common/database/Zenless/init";
import Games from "@/common/enum/Games";
import ZenlessGachaType from "@/common/types/dto/Zenless/GachaType";
import ZenlessRankType from "@/common/types/dto/Zenless/RankType";
import MainPage from "@/components/MainPage";
export default function Page() {
    return <MainPage game={Games.GENSHIN} dbInstance={ZenlessDB} gachaTypes={ZenlessGachaType} rankTypes={ZenlessRankType}/>
}