class InvalidCachedUrlError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "InvalidCachedUrlError"
    }
}
export default InvalidCachedUrlError