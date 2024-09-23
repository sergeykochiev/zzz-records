import HoyoParams from "@/common/api/Hoyoverse/Params/WishHistory"
import CommonGachaTypeField from "../../CommonGachaTypeField"
type StarrailGachaTypeField = keyof Pick<HoyoParams, CommonGachaTypeField>
export default StarrailGachaTypeField