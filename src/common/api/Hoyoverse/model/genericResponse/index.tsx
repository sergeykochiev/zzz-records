interface GenericHoyoResponse<HoyoData extends Record<string, any>> {
    message: string,
    retcode: number,
    data: HoyoData
}
export default GenericHoyoResponse