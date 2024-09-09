import Games from "@/common/types/Games"
const GachaLogApiRouteUrls: Record<Games, string> =  {
    1: "https://public-operation-hk4e-sg.hoyoverse.com/gacha_info/api/getGachaLog",
    2: "https://public-operation-hkrpg-sg.hoyoverse.com/common/gacha_record/api/getGachaLog",
    3: "https://public-operation-nap-sg.hoyoverse.com/common/gacha_record/api/getGachaLog"
}
export default GachaLogApiRouteUrls