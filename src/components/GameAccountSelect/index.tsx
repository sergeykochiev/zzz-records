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
    const currentGameAccount = params.gameAccount as string
    const getNewRoute = (gameAccount: string) => `${paths.slice(0,gameAccountPathSegmentIndex).join("/")}/${gameAccount}/${paths.slice(gameAccountPathSegmentIndex+1).join("/")}`
    return <SelectField placeholder="Choose game account uid..." defaultValue={currentGameAccount}>
        {(gameAccounts && gameAccounts.length) ? gameAccounts.map(gameAccount => {
            return <OptionElement key={gameAccount.id} name="game-account-selector" onChange={() => {
                router.push(getNewRoute(gameAccount.uid))
            }} checked={currentGameAccount == gameAccount.uid}>
                {gameAccount.uid}
            </OptionElement>
        }) : <NoDataPlaceholder message="No game account found. Perhaps you accidentally deleted your data or never fetched it in the first place?"/>}
    </SelectField>
}