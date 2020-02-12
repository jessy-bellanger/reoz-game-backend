const Session      = require("../session/Session");
const UserProvider = require("./UserProvider");

const sessions = {};

/**
 * This is not the greatest way to do it. We must AVOID sessions, since
 * we have web tokens!
 */

module.exports = {
    createSession: function(token, socket) {
        const user = UserProvider.getUser(token);

        if (user) {
            sessions[token] = new Session(user, socket);
        }

        return sessions[token];
    },

    destroySession: function(token) {
        delete sessions[token];
    }
};