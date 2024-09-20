const STORES = {
    pulls: "id, [uid+gachaType], itemId, time, name, itemType, rankType",
    gameaccs: "[uid]",
    stats: "[uid+gachaType]"
} as const
export default STORES