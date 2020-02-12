const User          = require("../entities/User");
const TokenProvider = require("./TokenProvider");

// TODO persist user list!
const USERS = {};

module.exports = {
    /**
     * @param userToken {string}
     * @returns {User}
     */
    getUser: userToken => {
        return USERS[userToken];
    },

    /**
     * @param userToken {string}
     * @param inventory {Inventory}
     * @param garden {Garden}
     * @param money {int}
     * @returns {User}
     */
    createUser: (userToken = null, inventory = null, garden = null, money = null) => {
        const newUser = new User(userToken || TokenProvider.getNewToken(), inventory, garden, money);
        USERS[newUser.token] = newUser;

        return newUser;
    },

    update: (user, oldToken) => {
        delete USERS[oldToken];
        USERS[user.token] = user;

        return user.token;
    }
};