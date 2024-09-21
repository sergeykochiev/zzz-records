import GenshinGachaType from "../Genshin/GachaType";
import StarrailGachaType from "../Starrail/GachaType";
import ZenlessGachaType from "../Zenless/GachaType";
import GachaTypeUnion from "../GachaTypeUnion";
type TargetGachaTypesEnum<GachaType extends GachaTypeUnion> = Record<keyof typeof GenshinGachaType, GachaType> | Record<keyof typeof ZenlessGachaType, GachaType> | Record<keyof typeof StarrailGachaType, GachaType>
export default TargetGachaTypesEnum