import { MutableRefObject } from "react"
export default function clickAnimationFactory(ref: MutableRefObject<HTMLElement | null>, scale: number = 0.95, duration: number = 100): [() => void, () => void] {
    return [
        function onMouseDownAnimation() {
            ref.current?.animate([
                    {
                        transform: "scale(1)"
                    },
                    {
                        transform: `scale(${scale})`
                    }
                ],
                {
                    duration: duration
                }
            )
        },
        function onMouseUpAnimation() {
            ref.current?.animate([
                    {
                        transform: `scale(${scale})`
                    },
                    {
                        transform: "scale(1)"
                    }
                ],
                {
                    duration: duration
                }
            )
        }
    ]
}