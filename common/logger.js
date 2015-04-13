var config = require('config');
var winston = require('winston');

var useConsoleLogger = config.get('logging.useConsoleLogger');
var useFileLogger = config.get('logging.useFileLogger');
var logfile = config.get('logging.logfile');
var fileLogLevel = config.get('logging.fileLogLevel');
var consoleLogLevel = config.get('logging.consoleLogLevel');
var maxFileSize = config.get('logging.maxFileSize');
var maxFiles = config.get('logging.maxFiles');

// Instantiate and configure winston logger
var transports = [];
if (useConsoleLogger) {
	transports.push(new winston.transports.Console({
		level: consoleLogLevel,
		handleExceptions: true,
		json: false,
		colorize: true,
		silent: false,
		timestamp: true
	}));
}
if (useFileLogger) {
	transports.push(new winston.transports.File({
		level: fileLogLevel,
		filename: logfile,
		handleExceptions: true,
		json: false,
		maxsize: maxFileSize,
		maxFiles: maxFiles,
		colorize: false,
		timestamp: true
	}));
}
var logger = new winston.Logger({
	transports: transports,
	exitOnError: false
});

module.exports = logger;
