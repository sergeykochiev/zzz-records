import OneOf from "@/common/types/OneOf";
import ZenlessParams from "../../Zenless/Params";
import GenshinParams from "../../Genshin/Params";
import StarrailParams from "../../Starrail/Params";
type OneOfParams = OneOf<ZenlessParams, GenshinParams, StarrailParams>
export default OneOfParams