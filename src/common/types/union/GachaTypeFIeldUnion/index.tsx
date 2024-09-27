import GenshinGachaTypeField from "../../game/Genshin/GachaTypeField";
import StarrailGachaTypeField from "../../game/Starrail/GachaTypeField";
import ZenlessGachaTypeField from "../../game/Zenless/GachaTypeField";
type GachaTypeFieldUnion = GenshinGachaTypeField | StarrailGachaTypeField | ZenlessGachaTypeField
export default GachaTypeFieldUnion