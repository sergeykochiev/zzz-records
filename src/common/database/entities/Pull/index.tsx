interface PullEntity {
    uid: string,
    gacha_type: "1" | "2" | "3" | "5"
    item_id: string
    time: string
    name: string
    item_type: "Agents" | "W-Engines" | "Bangboo"
    rank_type: "2" | "3" | "4"
    id: string
    pity: number
}
export default PullEntity