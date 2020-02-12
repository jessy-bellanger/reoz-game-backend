const UserProvider = require("./UserProvider");
const SessionProvider = require("./SessionProvider");

function initSocket(port = 8081) {
    const SOCKET_IO = require("socket.io")(port);

    SOCKET_IO.on("connection", socket => {
        const userToken = socket.request._query["token"];

        if (!userToken || !UserProvider.getUser(userToken)) {
            return console.log("UNKNOWN USER");
        }

        SessionProvider.createSession(userToken, socket);

        socket.on("disconnect", data => {
            console.log("Ba-bye, user!");

            // This is not a good way! It resets the shop each time the user refreshes the app!
            SessionProvider.destroySession(userToken);
        })
    });
}

module.exports = {init: initSocket};