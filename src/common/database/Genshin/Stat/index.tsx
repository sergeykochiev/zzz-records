import GenshinGachaType from "@/common/types/dto/Genshin/GachaType";
import StatEntity from "../../entities/Stat";
interface GenshinStatEntity extends StatEntity {
    gachaType: GenshinGachaType
}
export default GenshinStatEntity