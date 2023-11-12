const winston = require('winston')
const dotenv = require('dotenv');
dotenv.config()

const logFilePath = process.env.LOG_FILE_PATH;
console.log('Log file path:', logFilePath);

//date + logger level + message 

const dateFormat = () => {
    return new Date(Date.now()).toLocaleDateString()
}

class LoggerService { // so i can call it in everywhere (ex:Controller)
    constructor (route) {
        this.route = route
        const logger = winston.createLogger({
            level: 'info',
            format: winston.format.printf(info => {
                let message =` ${dateFormat()} | ${info.level.toUpperCase()} | ${info.message} `;
                message = info.obj ? message + `data ${JSON.stringify(info.obj)} |` : message ;
                return message
            }),
            transports: [
            new winston.transports.Console(),
            new winston.transports.File({

                filename: `${process.env.LOG_FILE_PATH}/${this.route.log}.log`,
                handleExceptions: true, // Add this line
                humanReadableUnhandledExceptions: true // Add this line
            }),
            ],
        });
        this.logger = logger;
    }

    async info (message) {
        this.logger.log('info', message)
    }

    async info (message, obj) {
        this.logger.log('info', message , {obj})
    }

    async error (message) {
        this.logger.log('error', message)
    }

    async error (message, obj) {
        this.logger.log('error', message , {obj})
    }

    async debug (message) {
        this.logger.log('debug', message)
    }

    async debug (message, obj) {
        this.logger.log('debug', message , {obj})
    }
}


module.exports = LoggerService;