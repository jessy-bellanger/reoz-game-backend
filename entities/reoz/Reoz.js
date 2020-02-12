const Uuid = require("uuid");

const MAX_HAPPINESS = 10;
const MAX_SATIETY   = 10;

/**
 * A Reoz is the game's creature. Don't ask me why they have this name...
 * Did I roll my face onto the keyboard?...
 *
 * @param name {string}
 * @param color {string|int}
 * @constructor
 */
function Reoz(name, color = null) {
    this.id    = Uuid.v1();
    this.name  = name;
    this.color = color || this.getRandomColor();

    /** @type {number} */
    this.happiness = 5;
    /** @type {number} */
    this.satiety   = 5;
}

Reoz.prototype = {
    use           : item => item.effect(),
    addHappiness  : points => this.happiness = Math.min(MAX_HAPPINESS, this.happiness + points),
    addSatiety    : points => this.satiety = Math.min(MAX_SATIETY, this.satiety + points),
    getRandomColor: () => {
        // This makes a string that represents a hexadecimal number formatted on 6 characters
        return Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
    }
};

module.exports = Reoz;