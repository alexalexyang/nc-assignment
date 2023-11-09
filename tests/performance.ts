import type { Coordinates, LinkStation } from "../src/helpers";
import { findBestStationUnoptimised, findBestStationOptimised } from "../src/helpers";
import { createMockStations, getRandomNum } from "./helpers";

const linkStations: LinkStation[] = createMockStations(100)
const deviceCoords: Coordinates = [getRandomNum(0, 101), getRandomNum(0, 101)]

const timerStart00 = performance.now()
const bestStation00 = findBestStationUnoptimised(deviceCoords, linkStations)
const timerEnd00 = performance.now()

const timerStart0 = performance.now()
const bestStation0 = findBestStationUnoptimised(deviceCoords, linkStations)
const timerEnd0 = performance.now()

const timerStart1 = performance.now()
const bestStationUnoptimised = findBestStationUnoptimised(deviceCoords, linkStations)
const timerEnd1 = performance.now()


const timerStart2 = performance.now()
const bestStationOptimised = findBestStationOptimised(deviceCoords, linkStations)
const timerEnd2 = performance.now()

// console.log("Best station (warm-up): ", bestStationUnoptimised)
// console.log(`Execution time (ms): ${timerEnd0 - timerStart0}`)
// console.log("\n")

// console.log("Best station (warm-up): ", bestStationUnoptimised)
// console.log(`Execution time (ms): ${timerEnd0 - timerStart0}`)
// console.log("\n")

console.log("Best station (unoptimised): ", bestStationUnoptimised)
console.log(`Execution time (ms): ${timerEnd1 - timerStart1}`)
console.log("\n")

console.log("Best station (optimised): ", bestStationOptimised)
console.log(`Execution time (ms): ${timerEnd2 - timerStart2}`)
console.log("\n")