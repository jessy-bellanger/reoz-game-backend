const Uuid = require("uuid");

/**
 * This represents the user's inventory.
 * @constructor
 */
function Inventory() {
    /**
     * @type {{string: InventoryItem}}
     */
    this.items = {};
}

/**
 * The Inventory's prototype assumes we always query correct item IDs.
 * //TODO add IDs correctness checks to avoid exceptions
 *        due to "null" or "undefined" values
 */
Inventory.prototype = {
    /**
     * @param uuid {string}
     * @returns {InventoryItem}
     */
    getItem: uuid => this.items[uuid],

    /**
     * @param item {Item|string}
     * @param qty {int}
     * @returns {string}
     */
    addItem: (item, qty = 1) => {
        let inventoryItem = null;
        if (typeof item === "string") {
            inventoryItem = this.items[item];
            inventoryItem.qty += qty;
        } else {
            inventoryItem                = new InventoryItem(item, qty);
            this.items[inventoryItem.id] = inventoryItem;
        }

        return inventoryItem.id;
    },

    removeItem: (uuid, qty) => {
        const remainingQty = Math.max(0, this.items[uuid].qty - qty);

        if (!remainingQty) {
            delete this.items[uuid];
        } else {
            this.items[uuid].qty = remainingQty;
        }

        return remainingQty;
    }
};

/**
 *
 * @param id {string}
 * @param item {Item}
 * @param qty {int}
 * @constructor
 */
function InventoryItem(item, qty) {
    this.id   = Uuid.v1();
    this.item = item;
    this.qty  = qty;
}

InventoryItem.prototype = {
    remove: function(qty) { return this.qty = Math.max(0, this.qty - qty); },
    add   : function(qty) { return this.qty += qty; }
};

module.exports               = Inventory;
module.exports.InventoryItem = InventoryItem;