const router        = require("express").Router();
const UserProvider  = require("../providers/UserProvider");
const TokenProvider = require("../providers/TokenProvider");

/**
 * This route is the first one that is called from the client app.
 * It initializes all the environment needed for the user to play.
 */
router.post("/", (req, res) => {
    const {token} = req.body;
    const user    = UserProvider.getUser(token);

    TokenProvider.updateToken(user);
    UserProvider.update(user, token);
    res.json({token: user.token, ...user.getInfo()});
});

module.exports = router;