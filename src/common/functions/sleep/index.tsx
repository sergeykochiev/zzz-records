export default async function sleep(duration: number) {
    return new Promise(e => setTimeout(e, duration))
}