var server = require("./app/server");
var router = require("./app/router");

server.start(router.route);