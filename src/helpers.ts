type Coordinate = [number, number];

/**
 * Uses Pythagoras' theorem to calculate the distance between two points.
 */
export const getDistance = (pointA: Coordinate, pointB: Coordinate): number => {
    return Math.sqrt(Math.pow(Math.abs(pointA[0] - pointB[0]), 2) + Math.pow(Math.abs(pointA[1] - pointB[1]), 2));
};

