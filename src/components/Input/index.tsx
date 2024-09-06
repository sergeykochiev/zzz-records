"use client"
import { InputHTMLAttributes } from "react";
import GameUniqueComponentProps from "@/common/types/GameUniqueComponentProps";
import inputClassnameFromKind from "./utility";
interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type">, GameUniqueComponentProps {}
export default function Input({ kind, ...p }: InputProps) {
    const conditionalClassname = inputClassnameFromKind[kind]
    return <input className={`w-full shadow-sm min-w-0 focus:placeholder:font-bold focus:placeholder:text-black focus:text-black focus:font-bold rounded-full py-[8px] focus:outline-slate-700 focus:border-white outline outline-[3px] outline-transparent border-transparent transition-all border-[2px] border-solid px-[24px] bg-slate-700 text-white placeholder:text-gray-300 ${conditionalClassname}`} {...p}/>
}