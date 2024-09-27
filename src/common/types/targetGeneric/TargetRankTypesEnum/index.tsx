import GenshinRankType from "../../game/Genshin/RankType";
import RankTypeUnion from "../../union/RankTypeUnion";
type TargetRankTypesEnum<RankType extends RankTypeUnion> = Record<keyof typeof GenshinRankType, RankType>
export default TargetRankTypesEnum