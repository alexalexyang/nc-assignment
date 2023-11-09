import type { LinkStation } from '../src/helpers';

export const getRandomNum = (min: number, max: number): number => {
    return Math.random() * (max - min) + min;
}

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