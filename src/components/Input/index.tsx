"use client"
import { InputHTMLAttributes } from "react";
import GameKinds from "../common/types/GameKinds";
import GameKindsColors from "../common/maps/GameKindsColors";
interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
    kind: GameKinds
}
export default function Input({ kind, ...p }: InputProps) {
    const targetColor = GameKindsColors[kind]
    const className = `focus:bg-[${targetColor}]`
    return <input className={`w-full shadow-sm min-w-0 focus:placeholder:font-bold focus:placeholder:text-black focus:text-black focus:font-bold rounded-full py-[8px] focus:outline-slate-700 focus:border-white outline outline-[3px] outline-transparent border-transparent transition-all border-[2px] border-solid px-[24px] bg-slate-700 text-white placeholder:text-gray-300 ${className}`} {...p}/>
}