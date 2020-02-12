const Inventory = require("./items/Inventory");
const Garden    = require("./reoz/Garden");

/**
 * In this app the users don't have to identify themselves.
 * BUT they have to keep safe their token if they want to keep their data.
 *
 * @param token {string}
 * @param inventory {Inventory}
 * @param garden {Garden}
 * @param money {int} // no annoying cents!
 * @constructor
 */
function User(token, inventory = null, garden = null, money = null) {
    this.token = token;

    this.inventory = inventory || new Inventory();
    this.garden    = garden || new Garden();
    this.money     = money || money === 0 ? money : 10; // Avoids giving money if value is actually 0 :)
}

User.prototype = {
    getInfo: function() {
        console.log(this);
        return {inventory: this.inventory.items, garden: this.garden.reozs, money: this.money};
    }
};

module.exports = User;