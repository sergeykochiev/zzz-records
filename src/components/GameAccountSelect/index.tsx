import GameAccountEntity from "@/common/database/entities/GameAccount";
import SelectField, { OptionElement } from "../Select";
import { useParams, usePathname, useRouter } from "next/navigation";
import NoDataPlaceholder from "../NoDataPlaceholder";
interface GameAccountProps {
    gameAccounts: GameAccountEntity[] | undefined
    gameAccountPathSegmentIndex?: number
}
export default function GameAccountSelect({ gameAccounts, gameAccountPathSegmentIndex = 2 }: GameAccountProps) {
    const pathname = usePathname()
    const paths = pathname.split("/")
    const router = useRouter()
    const params = useParams()
    const getNewRoute = (gameAccount: string) => `${paths.slice(0,gameAccountPathSegmentIndex).join("/")}/${gameAccount}/${paths.slice(gameAccountPathSegmentIndex+1).join("/")}`
    return <SelectField placeholder="Choose game account uid..." defaultValue="">
        {(gameAccounts && gameAccounts.length) ? gameAccounts.map(gameAccount => {
            return <OptionElement name="game-account-selector" onChange={() => router.push(getNewRoute(gameAccount.id.toString()))} checked={params.gameAccount as string == gameAccount.id.toString()}>
                {gameAccount.uid}
            </OptionElement>
        }) : <NoDataPlaceholder message="No game account found. Perhaps you accidentally deleted your data or never fetched it in the first place?"/>}
    </SelectField>
}