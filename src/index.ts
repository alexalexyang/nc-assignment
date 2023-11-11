import { HandleRequest, HttpRequest, HttpResponse } from "@fermyon/spin-sdk"
import type { LinkStation } from "./helpers";
import { findBestStationUnoptimised } from "./helpers";
import { getClient } from '../db'
import { Redis, Config } from "@fermyon/spin-sdk"

export type Input = {
    deviceCoords: [number, number],
    stations: LinkStation[]
}

const encoder = new TextEncoder()
const decoder = new TextDecoder()

export const handleRequest: HandleRequest = async function (request: HttpRequest): Promise<HttpResponse> {
    try {
        const { deviceCoords, stations } = request.json() as Input

        if (!deviceCoords || !stations) {
            throw new Error("Missing device coordinates or link stations")
        }
        console.log("Device coords and stations found")

        const redisUrl = Config.get("redis")

        if (!redisUrl) {
            throw new Error("Redis URL not found")
        }

        console.log("Redis URL found")

        const key = deviceCoords.join(",")

        const saved = (decoder.decode(new Uint8Array(Redis.get(redisUrl, key))))

        if (saved.length > 0) {
            console.log("Device coord saved")
            const data = JSON.parse(saved)

            return {
                status: 200,
                headers: { "content-type": "text/plain" },
                body: JSON.stringify(data)
            }
        }
        console.log("Device coord not saved")

        const bestStation = findBestStationUnoptimised(deviceCoords, stations)

        Redis.set(redisUrl, key, encoder.encode(JSON.stringify(bestStation)).buffer)

        return {
            status: 200,
            headers: { "content-type": "text/plain" },
            body: JSON.stringify(bestStation)
        }

    } catch (error) {
        return {
            status: 500,
            headers: { "content-type": "text/plain" },
            body: JSON.stringify({ error })
        }
    }

}
