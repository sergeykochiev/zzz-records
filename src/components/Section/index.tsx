import H2 from "../HeadingSecond"
interface SectionProps {
    children: React.ReactNode,
    label: string
}
export default function Section(props: SectionProps) {
    return <div className="w-full flex flex-col gap-[8px]">
        <H2>{props.label}</H2>
        {props.children}
    </div>
}