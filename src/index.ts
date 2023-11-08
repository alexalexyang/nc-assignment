import type { LinkStation } from "./helpers";
import { findBestStation } from "./helpers";

const linkStations: LinkStation[] =
    [[0, 0, 10],
    [20, 20, 5],
    [10, 0, 12]]

console.log(findBestStation([3, 4], linkStations))
