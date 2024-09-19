interface NoDataPlaceholder {
    message?: string
}
export default function NoDataPlaceholder({ message = "No data found" }: NoDataPlaceholder) {
    return <div className="py-[16px] px-[20px] text-hwh-placeholder-text-dark bg-hwh-background-dark w-full grid place-items-center outline outline-[2px] -outline-offset-[2px] outline-hwh-element-dark rounded-[8px]">{message}</div>
}