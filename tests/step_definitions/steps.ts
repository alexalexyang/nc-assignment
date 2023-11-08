import assert from "assert";

import { When, Then } from "@cucumber/cucumber";
import { getDistance } from "../../src/helpers";

interface PythagorasTheorem {
    distance: number;
}

When("coordinates contain negative number and float: [-5, 1.5], [2, 3]", function (this: PythagorasTheorem) {
    this.distance = getDistance([-5, 1.5], [2, 3]);
});

When("coordinates contain a zero: [-5, 4], [2, 0]", function (this: PythagorasTheorem) {
    this.distance = getDistance([-5, 4], [2, 0]);
});

Then(
    "the distance should be {float}",
    function (this: PythagorasTheorem, expected: number) {
        assert.equal(this.distance, expected);
    }
);