import type { LinkStation } from "./helpers";
import { findBestStationUnoptimised } from "./helpers";

const linkStations: LinkStation[] =
    [[0, 0, 10],
    [20, 20, 5],
    [10, 0, 12]]

console.log(findBestStationUnoptimised([3, 4], linkStations))
