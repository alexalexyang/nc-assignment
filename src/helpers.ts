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
    station: LinkStation;
    power: number;
}


/**
 * Best station is the one with most power
 */
export const findBestStation = (deviceCoords: Coordinates, linkStations: LinkStation[]) => {

    let bestStation: BestStation = {
        station: [0, 0, 0],
        power: 0
    };

    linkStations.forEach((linkStation) => {
        const [x, y, reach] = linkStation;

        const distance = getDistance(deviceCoords, [x, y]);

        const power = calcPower(reach, distance)

        console.log(x, y, reach, distance, power)

        if (power > bestStation.power) {
            console.log("Change: ", power, bestStation)
            bestStation = {
                station: linkStation,
                power: power
            }
        };
        console.log("\n")
    })

    return bestStation;
}