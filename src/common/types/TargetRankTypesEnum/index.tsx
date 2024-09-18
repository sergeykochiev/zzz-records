import GenshinRankType from "../dto/Genshin/RankType";
type TargetRankTypesEnum<RankType> = Record<keyof typeof GenshinRankType, RankType>
export default TargetRankTypesEnum