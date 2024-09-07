import HoyoParams from "@/common/dto/Hoyoverse/HoyoParams";
import StringifiedHoyoParams from "@/common/types/StringifiedHoyoParams";
export default function stringifyParamsValues(params: HoyoParams): StringifiedHoyoParams {
    const keys = Object.keys(params) as (keyof HoyoParams)[]
    let newParams = {} as StringifiedHoyoParams
    for (let i = 0; i < keys.length; i++) {
        newParams[keys[i]] = '' + params[keys[i]]
    }
    return newParams
}