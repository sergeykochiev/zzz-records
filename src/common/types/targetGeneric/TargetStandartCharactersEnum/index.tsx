import GenshinStandartCharacters from "../../game/Genshin/StandartCharacters"
import StarrailStandartCharacters from "../../game/Starrail/StandartCharacters"
import ZenlessStandartCharacters from "../../game/Zenless/StandartCharacters"
import StandartCharactersUnion from "../../union/StandartCharactersUnion"
type TargetStandartCharactersEnum<StandartCharacters extends StandartCharactersUnion> = Record<keyof typeof GenshinStandartCharacters, StandartCharacters> | Record<keyof typeof StarrailStandartCharacters, StandartCharacters> | Record<keyof typeof ZenlessStandartCharacters, StandartCharacters>
export default TargetStandartCharactersEnum