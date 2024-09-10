import CachedUrlParams from "@/common/types/CachedUrlParams"
import minimumNeccesarryParams from "@/common/types/MinimumNessesaryParams"
interface HoyoParams extends Record<keyof Pick<CachedUrlParams, minimumNeccesarryParams>, string | number> {
    authkey_ver: number,
    authkey: string,
    lang: string,
    game_biz: string,
    size: number
    end_id: number
    getStringifiedParams: () => Pick<CachedUrlParams, minimumNeccesarryParams>
}
class HoyoParamsAbstractClass implements HoyoParams {
    constructor(
        public authkey_ver: number,
        public authkey: string,
        public lang: string,
        public game_biz: string,
        public size: number,
        public end_id: number
    ) {}
    getStringifiedParams() {
        return {
            authkey_ver: '' + this.authkey_ver,
            authkey: '' + this.authkey,
            lang: '' + this.lang,
            game_biz: '' + this.game_biz,
            size: '' + this.size,
            end_id: '' + this.end_id
        }
    }
}
export type { HoyoParams }
export default HoyoParamsAbstractClass