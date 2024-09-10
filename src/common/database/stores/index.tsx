const STORES = {
    pulls: "id, [uid+gacha_type], item_id, time, name, item_type, rank_type",
    gameaccs: "++id, uid",
    stats: "[uid+gacha_type]"
} as const
export default STORES