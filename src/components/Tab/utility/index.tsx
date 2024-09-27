import GameKinds from "@/common/enum/Games";
const tabClassnameFromKind: Record<GameKinds, string> = {
    "hk4e": "has-[input:checked]:bg-hwh-genshin-green-light",
    "hkrpg": "has-[input:checked]:bg-hwh-starrail-blue-light",
    "nap": "has-[input:checked]:bg-hwh-zenless-yellow-light"
}
export default tabClassnameFromKind