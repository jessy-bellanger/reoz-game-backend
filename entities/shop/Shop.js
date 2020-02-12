const Effect        = require("../effects/Effect");
const Behaviour     = require("../effects/Behaviour");
const EffectTypes   = require("../effects/EffectTypes");
const Item          = require("../items/Item");
const Inventory     = require("../items/Inventory");
const InventoryItem = require("../items/Inventory").InventoryItem;
const EventEmitter  = require("events").EventEmitter;

// Some example of Items, TODO generate some more, and some randomly
const sampleItems = [
    new Item("Apple", new Behaviour([new Effect(EffectTypes.FOOD, 2)])),
    new Item("Banana", new Behaviour([new Effect(EffectTypes.FOOD, 2)])),
    new Item("Steak", new Behaviour([new Effect(EffectTypes.FOOD, 4)])),
    new Item("Hamburger", new Behaviour([new Effect(EffectTypes.FOOD, 5)])),
    new Item("Socks", new Behaviour([new Effect(EffectTypes.TOY, 1)])),
    new Item("Doll", new Behaviour([new Effect(EffectTypes.TOY, 2)])),
    new Item("Plane", new Behaviour([new Effect(EffectTypes.TOY, 3)])),
    new Item("Car", new Behaviour([new Effect(EffectTypes.TOY, 3)])),
    new Item("Skateboard", new Behaviour([new Effect(EffectTypes.TOY, 4)])),
    new Item("Rollers", new Behaviour([new Effect(EffectTypes.TOY, 4)])),
    new Item("Red Egg", new Behaviour([new Effect(EffectTypes.EGG, 0xFF0000)])),
    new Item("Green Egg", new Behaviour([new Effect(EffectTypes.EGG, 0x00FF00)])),
    new Item("Blue Egg", new Behaviour([new Effect(EffectTypes.EGG, 0x0000FF)])),
];

// This function regenerates the stock of the shop
function generateStock(shop) {
    const numberOfItems = 5;

    shop.items = {};
    for (let i = 0; i < numberOfItems; i++) {
        shop.addItem(sampleItems[Math.floor(Math.random() * sampleItems.length)], Math.floor(Math.random() * 10) + 1);
    }

    shop.emitter.emit("new-stock", shop.items);
}

/**
 * Do I really need to explain what a Shop is? :D
 *
 * @param emitter {EventEmitter}
 * @constructor
 */
function Shop(emitter = null) {
    Inventory.call(this);

    this.emitter = emitter || new EventEmitter();

    generateStock(this);

    this.initStockRenewal();
}

Shop.prototype = {
    ...Inventory.prototype,

    addItem: function(item, qty, price = 0) {
        let shopItem = null;
        if (typeof item === "string") {
            shopItem = this.items[item];
            shopItem.qty += qty;
        } else {
            shopItem                = new ShopItem(item, qty, price);
            this.items[shopItem.id] = shopItem;
        }

        return shopItem.id;

    },

    // Recursive method that emits an event with all the shop items
    initStockRenewal: function() {
        setTimeout(() => {
            generateStock(this);
            this.initStockRenewal();
        }, 10_000);
    }
};

/**
 * Basically, a shop is like an inventory, except that items
 * are not free to obtain. This is why this type inherits
 * from InventoryItem and only adds a price to it.
 *
 * @param id {string}
 * @param item {Item}
 * @param qty {int}
 * @param price {int} // no annoying cents!
 * @constructor
 */
function ShopItem(item, qty, price) {
    InventoryItem.call(this, item, qty);

    this.price = price;
}

// noinspection JSCheckFunctionSignatures
ShopItem.prototype             = InventoryItem.prototype;
ShopItem.prototype.constructor = ShopItem;

module.exports          = Shop;
module.exports.ShopItem = ShopItem;