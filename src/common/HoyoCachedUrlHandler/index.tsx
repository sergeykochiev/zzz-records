import InvalidCachedUrlError from "../error/InvalidCachedUrlError";
const DEFAULT_LANGUAGE = "en_US"
class HoyoCachedUrlHandler {
    params: Record<"authkey" | "lang" | "gameBiz", string> | Record<PropertyKey, never> = {}
    constructor(
        public cachedUrl: string,
    ) {} 
    parseCachedUrlParams() {
        const url = new URL(this.cachedUrl)
        const cachedParams = url.searchParams
        this.params.lang = cachedParams.get("lang") || DEFAULT_LANGUAGE
        if (!cachedParams.get("authkey")) {
            throw new InvalidCachedUrlError("No authkey was found in the url")
        }
        this.params.authkey = cachedParams.get("authkey")!
        if (!cachedParams.get("game_biz")) {
            throw new InvalidCachedUrlError("No account region data was found in the url")
        }
        this.params.gameBiz = cachedParams.get("game_biz")!
        return this.params
    }
}
export default HoyoCachedUrlHandler