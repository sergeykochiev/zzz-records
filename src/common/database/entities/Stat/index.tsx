interface StatEntity {
    uid: string
    gachaType: number
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