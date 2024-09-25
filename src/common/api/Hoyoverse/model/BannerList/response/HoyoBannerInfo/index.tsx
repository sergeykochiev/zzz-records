import GachaTypeUnion from "@/common/types/GachaTypeUnion"
interface HoyoBannerInfo<GachaType extends GachaTypeUnion = number> {
    begin_time: string
    end_time: string
    gacha_id: string
    gacha_name: string
    gacha_type: GachaType
    gacha_label?: number
}
export default HoyoBannerInfo