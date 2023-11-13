import type { Station, Coordinates, LinkStation, Options } from '../src/helpers';

export const getRandomNum = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min) + min);
}

/**
 * Creates mock link stations
 * @param count Number of stations to create
 * @returns `LinkStation[]`
 */
export const createMockStations = (count: number): LinkStation[] => {
    const min = 0;
    const max = 101;

    const stations: LinkStation[] = [];

    for (let i = 0; i < count; i++) {
        stations.push([
            getRandomNum(min, max),
            getRandomNum(min, max),
            getRandomNum(min, max)
        ])
    }

    return stations;
}

type FuncType = (deviceCoords: Coordinates, linkStations: LinkStation[], options?: Options) => Station;

export const performanceTest = (iterations: number, func: FuncType, deviceCoords: Coordinates, linkStations: LinkStation[], title: string) => {

    const executionTimes: number[] = [];

    for (let i = 0; i < iterations + 1; i++) {
        const timerStart = performance.now()
        const bestStation = func(deviceCoords, linkStations)
        const timerEnd = performance.now()

        const executionTime = timerEnd - timerStart;
        executionTimes.push(executionTime);
    }

    let averageExecutionTime: number | undefined = average(executionTimes);

    console.log(title)
    console.log(`Average execution time (ms): ${averageExecutionTime}`)
    console.log("\n")
}

const average = (array: number[]): number => array.reduce((a, b) => a + b) / array.length;
