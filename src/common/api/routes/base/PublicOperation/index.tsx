import ApiEndpointsMapType from "@/common/types/ApiEndpointsMap"
const BasePublicOperationUrl: ApiEndpointsMapType = {
    1: "https://public-operation-hk4e-sg.hoyoverse.com",
    2: "https://public-operation-hkrpg-sg.hoyoverse.com",
    3: "https://public-operation-nap-sg.hoyoverse.com"
} as const
export default BasePublicOperationUrl