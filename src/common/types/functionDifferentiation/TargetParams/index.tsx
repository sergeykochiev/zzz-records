import GenshinParams from "../../../api/Genshin/Params";
import StarrailParams from "../../../api/Starrail/Params";
import ZenlessParams from "../../../api/Zenless/Params";
import Games from "../../Games";
import OneOfChoice from "../../OneOfChoice";
type WhichParams<T extends Games> = T extends Games.GENSHIN ? GenshinParams : T extends Games.STARRAIL ? StarrailParams : ZenlessParams
type TargetParams<T extends Games> = OneOfChoice<WhichParams<T>, ZenlessParams, GenshinParams, StarrailParams>
export default TargetParams