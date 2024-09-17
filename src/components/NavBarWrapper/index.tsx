import { ReactNode } from "react";
export default function NavBarWrapper({ children }: { children: ReactNode }) {
    return <div className="flex items-center rounded-[8px] overflow-hidden w-full bg-hwh-element-dark">{children}</div>
}