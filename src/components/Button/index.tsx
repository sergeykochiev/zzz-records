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
    return <button onMouseDown={mouseDownAnimation} onMouseUp={mouseUpAnimation} ref={buttonRef} className={`px-[36px] py-[12px] active:scale-[0.95] hover:font-black hover:text-hwh-background-dark text-[14px] text-hwh-white-text-dark font-medium transition-all bg-hwh-element-dark rounded-[8px] ${conditionalClassname}`} {...p}>Fetch</button>
}