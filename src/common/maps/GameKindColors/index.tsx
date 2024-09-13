import GameKinds from "@/common/enum/Games";
const GameKindColors: Record<GameKinds, string> = {
    1: "hwh-genshin-green",
    2: "hwh-starrail-blue",
    3: "hwh-zzz-yellow"
} as const
export default GameKindColors