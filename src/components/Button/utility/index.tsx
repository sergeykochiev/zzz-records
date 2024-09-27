import GameKinds from "@/common/enum/Games";
const buttonClassnameFromKind: Record<GameKinds, string> = {
    "hk4e": "hover:bg-hwh-genshin-green-light",
    "hkrpg": "hover:bg-hwh-starrail-blue-light",
    "nap": "hover:bg-hwh-zenless-yellow-light"
}
export default buttonClassnameFromKind