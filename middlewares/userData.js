const JWT = require("jsonwebtoken");

const UserProvider = require("../providers/UserProvider");

const jwtSecret = "Highway to Hell";

/**
 * This middleware automatically verifies the user's token and create
 * a new one if they have corrupted their token or they don't have any.
 */
module.exports = (req, res, next) => {
    let {token} = req.body;
    let user    = null;

    // If the user doesn't have any token, or the token is altered, create
    // a new one and use it for this user (bye-bye eventual data).
    try {
        JWT.verify(token, jwtSecret);
    } catch {
        user           = UserProvider.createUser();
        token          = user.token;
        req.body.token = token;
    }

    // If the token seems correct but the user is not found
    // try to re-construct the user to avoid data loss.
    if (!UserProvider.getUser(token)) {
        const userData = JWT.decode(token);

        let inventory, garden, money = null;
        if (userData) {
            inventory = userData.inventory;
            garden    = userData.garden;
            money     = userData.money;
        }

        UserProvider.createUser(token, inventory, garden, money);
    }

    next();
};