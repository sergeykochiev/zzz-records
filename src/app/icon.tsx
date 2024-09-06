import { ImageResponse } from "next/og";
import { relative } from "path";
export const contentType = "image/png"
export const runtime = "edge"
export const size = {
    width: 32,
    height: 32,
}
export default function Icon() {
    return new ImageResponse(<div style={{
        backgroundColor: "black",
        borderRadius: "9999px",
        border: "4px solid #ffd129",
        color: "#ffd129",
        height: "100%",
        width: "100%",
    }}>
    </div>, {...size})
}