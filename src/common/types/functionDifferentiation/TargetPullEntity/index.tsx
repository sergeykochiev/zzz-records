import GenshinPullEntity from "@/common/database/Genshin/Pull";
import Games from "../../Games";
import OneOfChoice from "../../OneOfChoice";
import StarrailPullEntity from "@/common/database/Starrail/Pull";
import ZenlessPullEntity from "@/common/database/Zenless/Pull";
type WhichParams<T extends Games> = T extends Games.GENSHIN ? GenshinPullEntity : T extends Games.STARRAIL ? StarrailPullEntity : ZenlessPullEntity
type TargetPullEntity<T extends Games> = OneOfChoice<WhichParams<T>, GenshinPullEntity, StarrailPullEntity, ZenlessPullEntity>
export default TargetPullEntity