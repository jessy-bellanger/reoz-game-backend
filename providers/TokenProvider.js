const JWT    = require("jsonwebtoken");
const SECRET = "Highway to Hell";

module.exports = {
    getNewToken: () => JWT.sign({}, SECRET),
    updateToken: (user) => {
        user.token = JWT.sign({inventory: user.inventory, garden: user.garden, money: user.money}, SECRET);
        return user.token;
    }
};