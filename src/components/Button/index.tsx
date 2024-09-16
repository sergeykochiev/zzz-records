"use client"
import clickAnimationFactory from "@/common/factories/clickAnimationFactory"
import GameUniqueComponentProps from "@/common/types/GameUniqueComponentProps"
import { ButtonHTMLAttributes, useRef } from "react"
import buttonClassnameFromKind from "./utility"
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, GameUniqueComponentProps {}
export default function Button({ game, ...p }: ButtonProps) {
    const buttonRef = useRef<HTMLButtonElement | null>(null)
    const [mouseDownAnimation, mouseUpAnimation] = clickAnimationFactory(buttonRef)
    const conditionalClassname = buttonClassnameFromKind[game]
    return <button onMouseDown={mouseDownAnimation} onMouseUp={mouseUpAnimation} ref={buttonRef} className={`px-[24px] py-[8px] hover:outline-slate-700 hover:border-white active:scale-[0.95] outline outline-[3px] outline-transparent border-transparent border-[2px] border-solid min-w-[200px] hover:font-black hover:text-black text-[14px] shadow-sm text-white font-medium transition-all bg-slate-700 rounded-full ${conditionalClassname}`} {...p}>Fetch</button>
}