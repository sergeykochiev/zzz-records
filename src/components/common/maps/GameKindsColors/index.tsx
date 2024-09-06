import { customColors } from "../../../../../tailwind.config";
import GameKinds from "../../types/GameKinds";
const GameKindsColors: Record<GameKinds, string> = {
    1: customColors["hwh-genshin-green"],
    2: customColors["hwh-starrail-blue"],
    3: customColors["hwh-zzz-yellow"]
} as const
export default GameKindsColors