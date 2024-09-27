import ApiEndpointsMapType from "@/common/types/ApiEndpointsMap"
const ChinaBannerListEndpoint: ApiEndpointsMapType = {
    "hk4e": "gacha_info/hk4e/cn_gf01/gacha/list.json",
    "hkrpg": "gacha_info/hkrpg/prod_gf_cn/gacha/list.json",
    "nap": "gacha_info/nap/prod_gf_cn/gacha/list.json"
} as const
export default ChinaBannerListEndpoint