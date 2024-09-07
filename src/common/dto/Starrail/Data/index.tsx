import GenericHoyoData from "../../Hoyoverse/HoyoData";
import ZenlessPull from "../Pull";
interface ZenlessData extends GenericHoyoData {
    list: ZenlessPull[]
}
export default ZenlessData