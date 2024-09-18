const STORES = {
    pulls: "id, [uid+gachaType], itemId, time, name, itemType, rankType",
    gameaccs: "++id, uid",
    stats: "[uid+gachaType]"
} as const
export default STORES