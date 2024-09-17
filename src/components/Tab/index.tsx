import GameUniqueComponentProps from "@/common/types/GameUniqueComponentProps"
import tabClassnameFromKind from "./utility"
import { InputHTMLAttributes } from "react"
interface TabProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type">, GameUniqueComponentProps {
    children: string
}
export default function Tab({ game, children, ...p }: TabProps) {
    const conditionalClassname = tabClassnameFromKind[game]
    return <label className={`w-full transition-all grid place-items-center cursor-pointer has-[input:checked]:cursor-default px-[20px] text-hwh-white-text-dark has-[input:checked]:text-hwh-background-dark py-[20px] font-medium has-[input:checked]:font-bold rounded-[16px] text-[20px] ${conditionalClassname}`}>
        {children}
        <input type="radio" className="hidden absolute" {...p}/>
    </label>
}