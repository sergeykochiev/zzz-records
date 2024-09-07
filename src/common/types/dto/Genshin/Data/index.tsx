import GenericHoyoData from "../../Hoyoverse/HoyoData";
import GenshinPull from "../Pull";
interface GenshinData extends GenericHoyoData {
    list: GenshinPull[]
}
export default GenshinData