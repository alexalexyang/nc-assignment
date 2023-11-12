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

export type Station = {
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
export const findBestStationUnoptimised = (
    deviceCoords: Coordinates,
    linkStations: LinkStation[],
): Station => {

    let bestStation: Station = {
        coords: [0, 0],
        reach: 0,
        power: 0,
        distance: 0
    };

    for (const linkStation of linkStations) {
        const [x, y, reach] = linkStation;

        const distance = getDistance(deviceCoords, [x, y]);

        const power = calcPower(reach, distance)

        if (power > bestStation.power) {
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

export type Options = {
    /**
     * If true, return first station with the highest power.
     */
    greedy: boolean;
    minPower: number;
}

const defaultOptions: Options = {
    greedy: false,
    minPower: 0,
}

/**
 * Optimised version of findBestStationUnoptimised.
 */
export const findBestStationOptimised = (deviceCoords: Coordinates, linkStations: LinkStation[], options: Options = defaultOptions): Station => {
    let bestStation: Station = {
        coords: [0, 0],
        reach: 0,
        power: 0,
        distance: 0
    };

    for (const linkStation of linkStations) {
        const [x, y, reach] = linkStation;

        const distance = getDistance(deviceCoords, [x, y]);

        const power = calcPower(reach, distance)

        if (power > bestStation.power && power > options.minPower) {
            bestStation = {
                coords: [x, y],
                reach: reach,
                power: power,
                distance: distance
            }

            if (!options.greedy) {
                return bestStation
            }
        };
        console.log("\n")
    }

    return bestStation;
}


/**
 * Not real binary search. Uses binary search-inspired algorithm to find the first station with high enough power.
 * This won't work. It's just an idea.
 * 
 * @param deviceCoords 
 * @param stations Stations sorted by reach with lowest reach first.
 * @param target 
 * @param start 
 * @param end 
 * @returns 
 */
const pseudoBinarySearch = function (deviceCoords: Coordinates, stations: LinkStation[], target: number, start: number, end: number): (Station | undefined) {

    if (start > end) return undefined;

    let mid = Math.floor((start + end) / 2);

    const station = stations[mid];

    const [x, y, reach] = station;

    const distance = getDistance(deviceCoords, [x, y]);

    const power = calcPower(reach, distance)

    if (power > target) return {
        coords: [x, y],
        reach: reach,
        power: power,
        distance: distance
    }

    // Stations are sorted by reach, but power depends on distance. Even if reach is higher, power might be 0. So this won't always work.
    if (power < target) return pseudoBinarySearch(deviceCoords, stations, target, mid + 1, end);
}