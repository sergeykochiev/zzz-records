import ApiEndpointsMapType from "@/common/types/ApiEndpointsMap"
const BasePublicOperationUrl: ApiEndpointsMapType = {
    "hk4e": "https://public-operation-hk4e-sg.hoyoverse.com",
    "hkrpg": "https://public-operation-hkrpg-sg.hoyoverse.com",
    "nap": "https://public-operation-nap-sg.hoyoverse.com"
} as const
export default BasePublicOperationUrl