import H2 from "../HeadingSecond"
interface SectionProps {
    children: React.ReactNode,
    label: string
}
export default function Section(props: SectionProps) {
    return <div className="flex flex-col w-full [&:not(:last-child)]:mr-[10px] [&:not(:first-child)]:ml-[10px] gap-[8px]">
        <H2>{props.label}</H2>
        {props.children}
    </div>
}