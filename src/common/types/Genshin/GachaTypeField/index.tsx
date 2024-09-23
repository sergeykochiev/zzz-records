import HoyoParams from "@/common/api/Hoyoverse/Params/WishHistory";
import CommonGachaTypeField from "../../CommonGachaTypeField";
type GenshinGachaTypeField = keyof Pick<HoyoParams, CommonGachaTypeField>
export default GenshinGachaTypeField