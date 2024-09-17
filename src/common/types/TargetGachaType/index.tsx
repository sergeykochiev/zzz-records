import GenshinGachaType from "../dto/Genshin/GachaType";
import StarrailGachaType from "../dto/Starrail/GachaType";
import ZenlessGachaType from "../dto/Zenless/GachaType";
type TargetGachaTypeEnum<GachaType> = Record<keyof typeof GenshinGachaType, GachaType> | Record<keyof typeof ZenlessGachaType, GachaType> | Record<keyof typeof StarrailGachaType, GachaType>
export default TargetGachaTypeEnum