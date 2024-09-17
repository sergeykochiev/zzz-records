import GameKinds from "@/common/enum/Games";
const buttonClassnameFromKind: Record<GameKinds, string> = {
    1: "hover:bg-hwh-genshin-green-light",
    2: "hover:bg-hwh-starrail-blue-light",
    3: "hover:bg-hwh-zenless-yellow-light"
}
export default buttonClassnameFromKind