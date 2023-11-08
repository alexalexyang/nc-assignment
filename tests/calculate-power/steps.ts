import assert from "assert";

import { When, Then } from "@cucumber/cucumber";
import { calcPower } from "../../src/helpers";

interface Power {
    power: number;
    error: string;
}

When("distance is greater than reach", function (this: Power) {
    this.power = calcPower(1, 2);
});

When("reach is 19 and distance is 6.5", function (this: Power) {
    this.power = calcPower(19, 6.5);
});


Then("the power is {float}",
    function (this: Power, expected: number) {
        assert.equal(this.power, expected);
    }
);


When("reach and distance are both 12", function (this: Power) {
    try {
        calcPower(12, 12);
    } catch (error) {
        this.error = error.message
    }
});


Then("there is an error for reach === distance",
    function (this: Power) {
        assert.equal(this.error, "For the purpose of this exercise, reach and distance cannot be the same.")
    }
);


When("reach is -15", function (this: Power) {
    try {
        calcPower(-15, 12);
    } catch (error) {
        this.error = error.message
    }
});

Then("there is an error for reach < 0",
    function (this: Power) {
        assert.equal(this.error, "Reach and distance must be positive numbers.")
    }
);