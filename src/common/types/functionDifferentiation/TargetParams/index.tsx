import GenshinParamsClass, { GenshinParams } from "@/common/api/Genshin/Params"
import StarrailParamsClass, { StarrailParams } from "@/common/api/Starrail/Params"
import ZenlessParamsClass, { ZenlessParams } from "@/common/api/Zenless/Params"
import OneOf from "../../OneOf"
type TargetParams = OneOf<ZenlessParamsClass, GenshinParamsClass, StarrailParamsClass>
export default TargetParams