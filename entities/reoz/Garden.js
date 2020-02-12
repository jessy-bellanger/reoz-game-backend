const Faker = require("faker/locale/fr");
const Reoz = require("./Reoz");

/**
 * Simply the playground of Reozs =)... Why did I call it Garden, you ask?...
 * // TODO rename this class to Playground
 *
 * @constructor
 */
function Garden() {
    /** @type {Reoz[]} */
    this.reozs = [new Reoz(Faker.name.firstName())]
}

Garden.prototype = {
    getReozs: function() { return this.reozs; }
};

module.exports = Garden;