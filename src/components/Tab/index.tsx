import GameUniqueComponentProps from "@/common/types/GameUniqueComponentProps"
import tabClassnameFromKind from "./utility"
import { InputHTMLAttributes } from "react"
interface TabProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type">, Partial<GameUniqueComponentProps> {
    children: string
    huge?: boolean
}
export default function Tab({ game, children, huge, ...p }: TabProps) {
    const conditionalClassname = game ? tabClassnameFromKind[game] : "has-[input:checked]:bg-hwh-body-text-dark"
    return <label className={`w-full transition-all grid place-items-center cursor-pointer has-[input:checked]:cursor-default px-[20px] text-hwh-white-text-dark has-[input:checked]:text-hwh-background-dark has-[input:checked]:font-bold rounded-[16px] ${conditionalClassname} ${huge ? "font-normal text-[32px] py-[40px]" : "font-medium text-[20px] py-[20px]"}`}>
        {children}
        <input type="radio" className="hidden absolute" {...p}/>
    </label>
}