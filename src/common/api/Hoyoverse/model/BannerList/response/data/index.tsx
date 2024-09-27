import GachaTypeUnion from "@/common/types/union/GachaTypeUnion";
import HoyoBannerInfo from "../HoyoBannerInfo";
interface HoyoBannerListData<GachaType extends GachaTypeUnion> {
    list: HoyoBannerInfo<GachaType>[]
}
export default HoyoBannerListData