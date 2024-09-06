import GameUniqueComponentProps from "@/common/types/GameUniqueComponentProps"
import tabClassnameFromKind from "./utility"
import { InputHTMLAttributes } from "react"
interface TabProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type">, GameUniqueComponentProps {
    children: string
}
export default function Tab({ kind, children, ...p }: TabProps) {
    const conditionalClassname = tabClassnameFromKind[kind]
    return <label className={`transition-all grid place-items-center hover:shadow-sm has-[input:checked]:shadow-sm cursor-pointer has-[input:checked]:cursor-default px-[20px] py-[12px] font-medium has-[input:checked]:font-semibold outline outline-transparent outline-4 -outline-offset-4 rounded-[16px] text-[20px] ${conditionalClassname}`}>
        {children}
        <input type="radio" className="hidden absolute" {...p}/>
    </label>
}