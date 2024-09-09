import HoyoParams from "@/common/types/api/Hoyoverse/Params";
export default function getUrl(rootUrl: string, params: HoyoParams) {
    // const stringifiedParams = stringifyParamsValues(params) //stringifies params
    return `${rootUrl}?${new URLSearchParams(params as Record<keyof HoyoParams, string>)}`
}