import GameKinds from "@/common/enum/Games";
const buttonClassnameFromKind: Record<GameKinds, string> = {
    1: "hover:bg-hwh-genshin-green",
    2: "hover:bg-hwh-starrail-blue",
    3: "hover:bg-hwh-zenless-yellow"
}
export default buttonClassnameFromKind