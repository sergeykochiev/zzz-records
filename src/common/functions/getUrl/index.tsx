import HoyoParams from "@/common/dto/Hoyoverse/HoyoParams";
import stringifyParamsValues from "../stringifyParamsValues";
export default function getUrl(rootUrl: string, params: HoyoParams) {
    const stringifiedParams = stringifyParamsValues(params) //stringifies params
    return `${rootUrl}?${new URLSearchParams(stringifiedParams)}`
}