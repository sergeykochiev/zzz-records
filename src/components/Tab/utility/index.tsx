import GameKinds from "@/common/enum/Games";
const tabClassnameFromKind: Record<GameKinds, string> = {
    1: "has-[input:checked]:bg-hwh-genshin-green-light",
    2: "has-[input:checked]:bg-hwh-starrail-blue-light",
    3: "has-[input:checked]:bg-hwh-zenless-yellow-light"
}
export default tabClassnameFromKind