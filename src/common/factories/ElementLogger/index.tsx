import { MutableRefObject } from "react";
export default function ElementLogger<Element extends HTMLElement>(elementRef: MutableRefObject<Element | null>): (message: string) => void {
    function sendLogMessage(message: string) {
        elementRef.current!.textContent = message
    }
    return sendLogMessage
}