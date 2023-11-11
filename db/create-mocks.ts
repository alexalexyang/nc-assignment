import fs from "fs"
import path from "path"
import { createMockStations, getRandomNum } from "../performance-tests/helpers"
import type { Input } from "../src/index"
import type { Coordinates } from "../src/helpers"

const stations = createMockStations(10)

const deviceCoords: Coordinates = [getRandomNum(0, 100), getRandomNum(0, 100)]

const data: Input = {
    deviceCoords,
    stations
}

const filepath = path.join(__dirname, "mock-data.json")

fs.writeFile(filepath, JSON.stringify(data), (err) => {
    if (err) throw err;
}) 