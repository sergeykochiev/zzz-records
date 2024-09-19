import { InputHTMLAttributes, SelectHTMLAttributes, useRef, useState } from "react"
interface SelectFieldProps extends Pick<SelectHTMLAttributes<HTMLSelectElement>, "defaultValue">, Pick<InputHTMLAttributes<HTMLInputElement>, "placeholder"> {
    children: React.ReactNode
    placeholder: string
    defaultValue?: string
}
export default function SelectField(props: SelectFieldProps) {
    const [currentLabel, setCurrentLabel] = useState<string>(props.defaultValue || props.placeholder)
    const selectToggleRef = useRef<HTMLInputElement | null>(null)
    window.addEventListener("click", e => {
        if (!selectToggleRef.current) return
        if (e.target == selectToggleRef.current) return
        e.stopPropagation()
        selectToggleRef.current.checked = false
    }, { capture: true })
    return <div className="flex flex-col gap-[8px] relative">
        <label className="transition-all select-none text-[16px] peer/select-toggle cursor-pointer py-[12px] px-[16px] text-hwh-white-text-dark font-medium rounded-[8px] bg-hwh-element-dark has-[input:checked]:bg-hwh-body-text-dark has-[input:checked]:text-hwh-background-dark has-[input:checked]:font-bold">
            {currentLabel}
            <input ref={selectToggleRef} className="hidden absolute" name="select-field" type="checkbox"/>
        </label>
        <div className="hidden flex-col gap-[4px] absolute w-full top-[calc(100%+8px)] peer-has-[input:checked]/select-toggle:flex" onChange={e => {
            setCurrentLabel((e.target as HTMLElement).textContent || "")
        }}>
            {props.children}
        </div>
    </div>
}
interface OptionElementProps extends Pick<InputHTMLAttributes<HTMLInputElement>, "name" | "onChange" | "checked"> {
    children: string
}
export function OptionElement(props: OptionElementProps) {
    return <label className="bg-hwh-element-dark outline outline-2px -outline-offset-1 outline-transparent has-[input:checked]:outline-hwh-white-text-dark rounded-[8px] text-hwh-white-text-dark px-[16px] py-[12px]" onChange={e => {
        e.target = e.currentTarget
    }}>
        {props.children}
        <input className="hidden absolute" type="radio" name={props.name}/>
    </label>
}