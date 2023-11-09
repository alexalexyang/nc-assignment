export type Coordinates = [number, number];

/**
 * Uses Pythagoras' theorem to calculate the distance between two points.
 */
export const getDistance = (pointA: Coordinates, pointB: Coordinates): number => {
    return Math.sqrt(Math.pow(Math.abs(pointA[0] - pointB[0]), 2) + Math.pow(Math.abs(pointA[1] - pointB[1]), 2));
};

/**
 * Calculates the power of a link station based on its reach and distance from the device.
 */
export const calcPower = (reach: number, distance: number): number => {

    if (reach < 0 || distance < 0) {
        throw new Error("Reach and distance must be positive numbers.")
    };

    if (reach === distance) {
        throw new Error("For the purpose of this exercise, reach and distance cannot be the same.")
    };

    try {
        if (distance > reach) return 0;

        return Math.pow((reach - distance), 2)

    } catch (error) {
        return error
    }
}

/**
 * Coordinates and reach of the station: x, y, reach
 */
export type LinkStation = [number, number, number]

type BestStation = {
    coords: Coordinates;
    reach: number;
    power: number;

    /**
     * Distance from the device to the station
     */
    distance: number;
}


/**
 * Best station is the one with most power.
 * This function has O(n) complexity.
 * This is the base function with which we compare the performance of alternatives
 */
export const findBestStationUnoptimised = (deviceCoords: Coordinates, linkStations: LinkStation[]) => {
    let bestStation: BestStation = {
        coords: [0, 0],
        reach: 0,
        power: 0,
        distance: 0
    };

    for (const linkStation of linkStations) {
        const [x, y, reach] = linkStation;

        const distance = getDistance(deviceCoords, [x, y]);

        const power = calcPower(reach, distance)

        // console.log(x, y, reach, distance, power)

        if (power > bestStation.power) {
            // console.log("Change: ", power, bestStation)
            bestStation = {
                coords: [x, y],
                reach: reach,
                power: power,
                distance: distance
            }
        };
        console.log("\n")
    }

    return bestStation;
}

/**
 * Optimised version of findBestStationUnoptimised.
 */
export const findBestStationOptimised = (deviceCoords: Coordinates, linkStations: LinkStation[]) => {
    let bestStation: BestStation = {
        coords: [0, 0],
        reach: 0,
        power: 0,
        distance: 0
    };

    for (const linkStation of linkStations) {
        const [x, y, reach] = linkStation;

        const distance = getDistance(deviceCoords, [x, y]);

        const power = calcPower(reach, distance)

        // console.log(x, y, reach, distance, power)

        if (power > bestStation.power) {
            // console.log("Change: ", power, bestStation)
            bestStation = {
                coords: [x, y],
                reach: reach,
                power: power,
                distance: distance
            }
        };
        console.log("\n")
    }

    return bestStation;
}