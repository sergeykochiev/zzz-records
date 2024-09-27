import GenshinGachaType from "../../game/Genshin/GachaType";
import StarrailGachaType from "../../game/Starrail/GachaType";
import ZenlessGachaType from "../../game/Zenless/GachaType";
import GachaTypeUnion from "../../union/GachaTypeUnion";
type TargetGachaTypesEnum<GachaType extends GachaTypeUnion> = Record<keyof typeof GenshinGachaType, GachaType> | Record<keyof typeof ZenlessGachaType, GachaType> | Record<keyof typeof StarrailGachaType, GachaType>
export default TargetGachaTypesEnum