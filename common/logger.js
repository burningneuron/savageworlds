var winston = require('winston');

// Instantiate and configure winston logger
var transports = [];
if (useConsoleLogger) {
  transports.push(new winston.transports.Console({
    level: "debug",
    handleExceptions: true,
    json: false,
    colorize: true,
    silent: false,
    timestamp: true
  }));
}

var logger = new winston.Logger({
  transports: transports,
  exitOnError: false
});

module.exports = logger;
