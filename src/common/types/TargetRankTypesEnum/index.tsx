import GenshinRankType from "../Genshin/RankType";
import RankTypeUnion from "../RankTypeUnion";
type TargetRankTypesEnum<RankType extends RankTypeUnion> = Record<keyof typeof GenshinRankType, RankType>
export default TargetRankTypesEnum