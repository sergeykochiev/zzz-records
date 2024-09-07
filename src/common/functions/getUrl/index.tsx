import HoyoParams from "@/common/types/api/Hoyoverse/Params";
import stringifyParamsValues from "../stringifyParamsValues";
import StringifiedHoyoParams from "@/common/types/StringifiedHoyoParams";
export default function getUrl(rootUrl: string, params: StringifiedHoyoParams) {
    // const stringifiedParams = stringifyParamsValues(params) //stringifies params
    return `${rootUrl}?${new URLSearchParams(params)}`
}