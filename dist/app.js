"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const server_1 = require("./server/server");
// const Server = require('./server/server');
const server = new server_1.Server();
server.listenPort();
//# sourceMappingURL=app.js.map