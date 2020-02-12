// Express server related imports
const EXPRESS            = require("express");
const CORS               = require("cors");
const userDataMiddleware = require("./middlewares/userData");

// Express server initialization
const APP  = EXPRESS();
const PORT = 8080;

APP.use(CORS({origin: "http://localhost:3000"}));
APP.use(EXPRESS.json());
APP.use(userDataMiddleware);

// Express server routes initialization
APP.use("/setup", require("./routes/setup"));

// LAUNCH THIS ROCKET!
APP.listen(PORT, () => {
    console.log(`Listening on port ${PORT}.`);
});

// WebSocket related imports
const SocketProvider = require("./providers/SocketProvider");

// Socket.io initialization
SocketProvider.init();