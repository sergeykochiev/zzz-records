import GenshinGachaType from "@/common/types/dto/Genshin/GachaType"
import HoyoParams from "../../Hoyoverse/Params"
import GenshinGachaTypeField from "@/common/types/Genshin/GachaTypeField"
import GenshinCachedUrlParams from "@/common/types/Genshin/CachedUrlParams"
import HoyoParamsAbstractClass from "../../Hoyoverse/Params"
import minimumNeccesarryParams from "@/common/types/MinimumNessesaryParams"
interface GenshinParams extends HoyoParams, Record<GenshinGachaTypeField, GenshinGachaType> {
    getStringifiedParams: () => Pick<GenshinCachedUrlParams, minimumNeccesarryParams | GenshinGachaTypeField>
}
class GenshinParamsClass extends HoyoParamsAbstractClass implements GenshinParams {
    constructor(
        public authkey: string,
        public authkey_ver: number,
        public game_biz: string,
        public lang: string,
        public size: number,
        public end_id: number,
        public gacha_type: GenshinGachaType
    ) {
        super(authkey_ver, authkey, lang, game_biz, size, end_id)
    }
    getStringifiedParams() {
        return Object.assign(super.getStringifiedParams(), {
            gacha_type: ('' + this.gacha_type) as `${GenshinGachaType}`
        })
    }
}
export type { GenshinParams }
export default GenshinParamsClass