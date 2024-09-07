interface PullListHeadingProps {
    children: string
}
export default function PullListHeading({ children }: PullListHeadingProps) {
    return <div className="w-full grid place-items-center text-[48px] font-black text-slate-800 drop-shadow-xl">{children}</div>
}