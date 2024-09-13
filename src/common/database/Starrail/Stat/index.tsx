import StarrailGachaType from "@/common/types/dto/Starrail/GachaType";
import StatEntity from "../../entities/Stat";
interface StarrailStatEntity extends StatEntity {
    gachaType: StarrailGachaType
}
export default StarrailStatEntity