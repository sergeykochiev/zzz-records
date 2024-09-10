import StarrailGachaType from "@/common/types/dto/Starrail/GachaType"
import HoyoParams from "../../Hoyoverse/Params"
import StarrailGachaTypeField from "@/common/types/Starrail/GachaTypeField"
import StarrailCachedUrlParams from "@/common/types/Starrail/CachedUrlParams"
import HoyoParamsAbstractClass from "../../Hoyoverse/Params"
import minimumNeccesarryParams from "@/common/types/MinimumNessesaryParams"
interface StarrailParams extends HoyoParams, Record<StarrailGachaTypeField, StarrailGachaType> {
    getStringifiedParams: () => Pick<StarrailCachedUrlParams, minimumNeccesarryParams | StarrailGachaTypeField>
}
class StarrailParamsClass extends HoyoParamsAbstractClass implements StarrailParams {
    constructor(
        public authkey: string,
        public authkey_ver: number,
        public game_biz: string,
        public lang: string,
        public size: number,
        public end_id: number,
        public gacha_type: StarrailGachaType
    ) {
        super(authkey_ver, authkey, lang, game_biz, size, end_id)
    }
    getStringifiedParams() {
        return Object.assign(super.getStringifiedParams(), {
            gacha_type: ('' + this.gacha_type) as `${StarrailGachaType}`
        })
    }
}
export type { StarrailParams }
export default StarrailParamsClass