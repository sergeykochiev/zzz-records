const STORES = {
    pulls: "id, [uid+gachaType], itemId, time, name, itemType, rankType",
    gameaccs: "&uid, region, name",
    stats: "[uid+gachaType]"
} as const
export default STORES