import OneOf from "@/common/types/OneOf";
import GenshinGachaType from "../../Genshin/GachaType";
import StarrailGachaType from "../../Starrail/GachaType";
import ZenlessGachaType from "../../Zenless/GachaType";
type OneOfGachaType = OneOf<typeof GenshinGachaType, typeof StarrailGachaType, typeof ZenlessGachaType>
export default OneOfGachaType