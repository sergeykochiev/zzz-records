import ZenlessGachaType from "@/common/types/dto/Zenless/GachaType"
import HoyoParams from "../../Hoyoverse/Params"
import ZenlessGachaTypeField from "@/common/types/Zenless/GachaTypeField"
import ZenlessCachedUrlParams from "@/common/types/Zenless/CachedUrlParams"
import HoyoParamsAbstractClass from "../../Hoyoverse/Params"
import minimumNeccesarryParams from "@/common/types/MinimumNessesaryParams"
interface ZenlessParams extends HoyoParams, Record<ZenlessGachaTypeField, ZenlessGachaType> {
    getStringifiedParams: () => Pick<ZenlessCachedUrlParams, minimumNeccesarryParams | ZenlessGachaTypeField>
}
class ZenlessParamsClass extends HoyoParamsAbstractClass implements ZenlessParams {
    constructor(
        public authkey: string,
        public authkey_ver: number,
        public game_biz: string,
        public lang: string,
        public size: number,
        public end_id: number,
        public real_gacha_type: ZenlessGachaType
    ) {
        super(authkey_ver, authkey, lang, game_biz, size, end_id)
    }
    getStringifiedParams() {
        return Object.assign(super.getStringifiedParams(), {
            real_gacha_type: ('' + this.real_gacha_type) as `${ZenlessGachaType}`
        })
    }
}
export type { ZenlessParams }
export default ZenlessParamsClass