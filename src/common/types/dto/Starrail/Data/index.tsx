import HoyoData from "../../Hoyoverse/HoyoData"
import StarrailPull from "../Pull"
interface StarrailData extends HoyoData {
    list: StarrailPull[]
}
export default StarrailData