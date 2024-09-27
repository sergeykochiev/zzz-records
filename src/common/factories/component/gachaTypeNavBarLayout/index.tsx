import GachaTypeUnion from "@/common/types/GachaTypeUnion"
import TargetGachaTypesEnum from "@/common/types/targetGeneric/TargetGachaTypesEnum"
import GachaTypeNavBar from "@/components/GachaTypeNavBar"
interface GachaTypeNavBarLayoutArgs<GachaType extends GachaTypeUnion> {
    gachaTypes: TargetGachaTypesEnum<GachaType>
}
export default function gachaTypeNavBarLayoutFactory<GachaType extends GachaTypeUnion>(args: GachaTypeNavBarLayoutArgs<GachaType>) {
    const GachaTypeNavBarLayout = function({ children }: { children: React.ReactNode }) {    
        return <>
            <GachaTypeNavBar gachaTypes={args.gachaTypes}/>
            {children}
        </>
    }
    return GachaTypeNavBarLayout
}