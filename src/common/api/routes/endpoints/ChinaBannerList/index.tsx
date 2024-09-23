import ApiEndpointsMapType from "@/common/types/ApiEndpointsMap"
const ChinaBannerListEndpoint: ApiEndpointsMapType = {
    1: "gacha_info/hk4e/cn_gf01/gacha/list.json",
    2: "gacha_info/hkrpg/prod_gf_cn/gacha/list.json",
    3: "gacha_info/nap/prod_gf_cn/gacha/list.json"
} as const
export default ChinaBannerListEndpoint