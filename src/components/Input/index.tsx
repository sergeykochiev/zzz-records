"use client"
import { InputHTMLAttributes } from "react";
import GameUniqueComponentProps from "@/common/types/GameUniqueComponentProps";
import inputClassnameFromKind from "./utility";
interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type">, GameUniqueComponentProps {}
export default function Input({ game, ...p }: InputProps) {
    const conditionalClassname = inputClassnameFromKind[game]
    return <input className={`w-full shadow-sm min-w-0 focus:placeholder:font-bold focus:placeholder:text-hwh-background-dark focus:text-black focus:font-bold rounded-[8px] py-[12px] transition-all outline-none border-none px-[16px] bg-hwh-element-dark  text-hwh-white-text-dark placeholder:text-hwh-placeholder-text-dark ${conditionalClassname}`} {...p}/>
}