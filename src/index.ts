import { HandleRequest, HttpRequest, HttpResponse } from "@fermyon/spin-sdk"
import type { LinkStation } from "./helpers";
import { findBestStationUnoptimised } from "./helpers";

// const linkStations: LinkStation[] =
//     [[0, 0, 10],
//     [20, 20, 5],
//     [10, 0, 12]]

// console.log(findBestStationUnoptimised([3, 4], linkStations))


export const handleRequest: HandleRequest = async function (request: HttpRequest): Promise<HttpResponse> {

    const body = request.json() as { data: LinkStation[] }
    console.log(body.data)

    const bestStation = findBestStationUnoptimised([3, 4], body.data)

    console.log(bestStation)


    return {
        status: 200,
        headers: { "content-type": "text/plain" },
        body: JSON.stringify(bestStation)
    }
}
