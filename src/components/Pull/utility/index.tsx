import GameKinds from "@/common/types/Games";
const tabClassnameFromKind: Record<GameKinds, string> = {
    1: "has-[input:checked]:bg-hwh-genshin-green hover:outline-hwh-genshin-green",
    2: "has-[input:checked]:bg-hwh-starrail-blue hover:outline-hwh-starrail-blue",
    3: "has-[input:checked]:bg-hwh-zenless-yellow hover:outline-hwh-zenless-yellow"
}
export default tabClassnameFromKind