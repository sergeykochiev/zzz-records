import GenshinApiClass from "../api/Genshin";
import StarrailApiClass from "../api/Starrail";
import ZenlessApiClass from "../api/Zenless";
import InvalidCachedUrlError from "../error/InvalidCachedUrlError";
const DEFAULT_LANGUAGE = "en_US"
class HoyoCachedUrlHandler {
    params: Record<"authkey" | "lang" | "gameBiz", string> | Record<PropertyKey, never> = {}
    constructor(
        cachedUrl: string,
        private apiClass: { new(authkey: string, lang: string, gameBiz: string): ZenlessApiClass | GenshinApiClass | StarrailApiClass }
    ) {
        this.parseCachedUrlParams(cachedUrl)
    }
    constructApi() {
        return new this.apiClass(
            this.params.authkey,
            this.params.lang,
            this.params.gameBiz
        )
    }
    private parseCachedUrlParams(cachedUrl: string) {
        const url = new URL(cachedUrl)
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
    }
}
export default HoyoCachedUrlHandler