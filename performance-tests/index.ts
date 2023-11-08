import type { LinkStation } from "../src/helpers";
import { findBestStation } from "../src/helpers";

const linkStations: LinkStation[] =
    [[0, 0, 10],
    [20, 20, 5],
    [10, 0, 12]]

const timerStart = performance.now()
findBestStation([3, 4], linkStations)
const timerEnd = performance.now()

console.log(`Execution time (ms): ${timerEnd - timerStart}`)