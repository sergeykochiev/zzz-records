import GenshinGachaType from "../../dto/Genshin/GachaType";
import StarrailGachaType from "../../dto/Starrail/GachaType";
import ZenlessGachaType from "../../dto/Zenless/GachaType";
import Games from "../../Games";
import OneOfChoice from "../../OneOfChoice";
type WhichGachaType<T extends Games> = T extends Games.GENSHIN ? GenshinGachaType : T extends Games.STARRAIL ? StarrailGachaType : ZenlessGachaType
type TargetGachaType<T extends Games> = OneOfChoice<WhichGachaType<T>, GenshinGachaType, StarrailGachaType, ZenlessGachaType>
export default TargetGachaType