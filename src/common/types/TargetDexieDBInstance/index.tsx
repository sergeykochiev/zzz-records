import Dexie, { EntityTable } from "dexie";
import GachaTypeUnion from "../GachaTypeUnion";
import RankTypeUnion from "../RankTypeUnion";
import PullEntity from "@/common/database/entities/Pull";
import StatEntity from "@/common/database/entities/Stat";
import GameAccountEntity from "@/common/database/entities/GameAccount";
type TargetDexieDBInstance<GachaType extends GachaTypeUnion, RankType extends RankTypeUnion> = Dexie & {
    pulls: EntityTable<PullEntity<GachaType, RankType>, "id">
    gameaccs: EntityTable<GameAccountEntity, "uid">;
    stats: EntityTable<StatEntity<GachaType>>
}
export default TargetDexieDBInstance