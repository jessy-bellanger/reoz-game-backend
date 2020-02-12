const EventEmitter = require("events").EventEmitter;
const Shop         = require("../entities/shop/Shop");

/**
 *
 * @param user {User}
 * @param socket
 * @constructor
 */
function Session(user, socket) {
    this.user   = user;
    this.socket = socket;

    this.emitter = new EventEmitter();
    this.emitter.on("new-stock", (data) => {
        this.socket.emit("new-stock", data);
    });

    this.shop = new Shop(this.emitter);
}

module.exports = Session;