import HoyoData from "../../HoyoData"
interface GenericHoyoResponse<D extends HoyoData> {
    message: string,
    retcode: number,
    data: D
}
export default GenericHoyoResponse