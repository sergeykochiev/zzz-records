import HoyoData from "../../Hoyoverse/HoyoData";
import ZenlessPull from "../Pull";
interface ZenlessData extends HoyoData {
    list: ZenlessPull[]
}
export default ZenlessData