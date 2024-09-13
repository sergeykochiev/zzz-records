import ZenlessGachaType from "@/common/types/dto/Zenless/GachaType";
import StatEntity from "../../entities/Stat";
interface ZenlessStatEntity extends StatEntity {
    gachaType: ZenlessGachaType
}
export default ZenlessStatEntity