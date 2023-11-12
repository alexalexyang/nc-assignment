import assert from "assert";

import { When, Then } from "@cucumber/cucumber";
import { Coordinates, LinkStation, calcPower, findBestStationUnoptimised, getOutputString } from "../../src/helpers";

const stations: LinkStation[] = [
    [0, 0, 10],
    [20, 20, 5],
    [10, 0, 12]
]

interface Result {
    power: number;
    outputStrings: string[];
}

const deviceCoords: Coordinates[] = [
    [0, 0],
    [100, 100],
    [15, 10],
    [18, 18]
]

const outputStrings: string[] = []

for (const deviceCoord of deviceCoords) {
    const bestStation = findBestStationUnoptimised(deviceCoord, stations)

    const outputString = getOutputString(deviceCoord, bestStation)

    outputStrings.push(outputString)
}


When("device coords", function (this: Result) {
    this.outputStrings = outputStrings;
});

const expected = [
    "Best link station for point 0,0 is 0,0 with power 100",
    "No link station within reach for point 100,100",
    "Best link station for point 15,10 is 10,0 with power 0.6718427000252355",
    "Best link station for point 18,18 is 20,20 with power 4.715728752538098",
]

Then("output strings",
    function (this: Result) {

        expected.forEach((expected) => {
            const hasString = this.outputStrings.includes(expected)
            assert.equal(hasString, true);
        })
    }
);

