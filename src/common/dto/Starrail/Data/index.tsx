import GenericHoyoData from "../../GenericHoyoData";
import ZenlessPull from "../Pull";
interface ZenlessData extends GenericHoyoData {
    list: ZenlessPull[]
}
export default ZenlessData