import GenshinResponse from "../../dto/Genshin/Response";
import StarrailResponse from "../../dto/Starrail/Response";
import ZenlessResponse from "../../dto/Zenless/Response";
import Games from "../../Games";
import OneOf from "../../OneOfChoice";
type WhichResponse<T extends Games> = T extends Games.GENSHIN ? GenshinResponse : T extends Games.STARRAIL ? StarrailResponse : ZenlessResponse
type TargetResponse<T extends Games> = OneOf<WhichResponse<T>, ZenlessResponse, GenshinResponse, StarrailResponse>
export default TargetResponse