class HoyoApiError extends Error {
    constructor(retcode: number, message: string) {
        const customHoyoMessage = `Returned response with retcode ${retcode}: ${message}`
        super(customHoyoMessage)
        this.name = "HoyoApiError"
    }
}
export default HoyoApiError