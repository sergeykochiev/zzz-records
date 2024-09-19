import HoyoPull from "../HoyoPull"
interface HoyoData {
    page: string,
    size: string,
    region: string,
    list: HoyoPull[]
    region_time_zone: number
}
export default HoyoData