import HoyoParams from "@/common/api/Hoyoverse/Params";
export default function getUrl(rootUrl: string, params: HoyoParams) {
    // const stringifiedParams = stringifyParamsValues(params) //stringifies params
    return `${rootUrl}?${new URLSearchParams(params as Record<keyof HoyoParams, string>)}`
}