import GenshinParams from "../../api/Genshin/Params";
import StarrailParams from "../../api/Starrail/Params";
import ZenlessParams from "../../api/Zenless/Params";
import Games from "../../Games";
import OneOf from "../../OneOf";
type WhichParams<T extends Games> = T extends Games.GENSHIN ? GenshinParams : T extends Games.STARRAIL ? StarrailParams : ZenlessParams
type TargetParams<T extends Games> = OneOf<WhichParams<T>, ZenlessParams, GenshinParams, StarrailParams>
export default TargetParams