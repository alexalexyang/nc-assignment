// May have to run this file multiple times to get proper results

import type { Coordinates, LinkStation } from "../src/helpers";
import { findBestStationUnoptimised, findBestStationOptimised } from "../src/helpers";
import { createMockStations, getRandomNum, performanceTest } from "./helpers";

const linkStations: LinkStation[] = createMockStations(100)
const deviceCoords: Coordinates = [getRandomNum(0, 101), getRandomNum(0, 101)]
const fewTries = 50;
const manyTries = 1000;

/*
* Warm-up is never logged to stdout for some reason.
*/
performanceTest(
    fewTries,
    findBestStationUnoptimised,
    deviceCoords,
    linkStations,
    "Warm-up, few tries"
)

performanceTest(
    manyTries,
    findBestStationUnoptimised,
    deviceCoords,
    linkStations,
    "Warm-up, many tries"
)

performanceTest(
    fewTries,
    findBestStationUnoptimised,
    deviceCoords,
    linkStations,
    "Unoptimised, few tries"
)

performanceTest(
    manyTries,
    findBestStationUnoptimised,
    deviceCoords,
    linkStations,
    "Unoptimised, many tries"
)

performanceTest(
    fewTries,
    findBestStationOptimised,
    deviceCoords,
    linkStations,
    "Optimised, few tries"
)

performanceTest(
    manyTries,
    findBestStationOptimised,
    deviceCoords,
    linkStations,
    "Optimised, many tries"
)
