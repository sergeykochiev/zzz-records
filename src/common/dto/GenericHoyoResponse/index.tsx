interface GenericHoyoResponse<HoyoData> {
    message: string,
    retcode: number,
    data: HoyoData
}
export default GenericHoyoResponse