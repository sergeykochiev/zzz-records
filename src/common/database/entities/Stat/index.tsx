import GachaTypeUnion from "@/common/types/GachaTypeUnion"
interface StatEntity<GachaType extends GachaTypeUnion> {
    uid: string
    gachaType: GachaType
    currentEpicPity: number
    currentLegendaryPity: number
    nextEpicIsUp: boolean
    nextLegendaryIsUp: boolean
    countEpic: number
    countLegendary: number
    avgEpicPity: number
    avgLegendaryPity: number
    count: number
}
export default StatEntity