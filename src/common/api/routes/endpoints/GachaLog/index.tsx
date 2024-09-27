import ApiEndpointsMapType from "@/common/types/ApiEndpointsMap"
const GachaLogEndpoint: ApiEndpointsMapType = {
    "hk4e": "gacha_info/api/getGachaLog",
    "hkrpg": "common/gacha_record/api/getGachaLog",
    "nap": "common/gacha_record/api/getGachaLog"
} as const
export default GachaLogEndpoint