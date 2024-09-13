import HoyoParams from "@/common/api/Hoyoverse/Params";
import CommonGachaTypeField from "../../CommonGachaTypeField";
type GenshinGachaTypeField = keyof Pick<HoyoParams, CommonGachaTypeField>
export default GenshinGachaTypeField