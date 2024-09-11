import { GenshinParams } from "@/common/api/Genshin/Params"
import { StarrailParams } from "@/common/api/Starrail/Params"
import { ZenlessParams } from "@/common/api/Zenless/Params"
import OneOf from "../../OneOf"
type TargetParams = OneOf<ZenlessParams, GenshinParams, StarrailParams>
export default TargetParams