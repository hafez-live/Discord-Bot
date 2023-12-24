const winston = require('winston');

module.exports = () =>
{
    const logFormat = winston.format.printf(({ level, message, label, timestamp, stack }) =>
    {
        return `[${label}] - ${timestamp} ${level}: ${stack || message}`;
    });

    return winston.createLogger(
        {
            format: winston.format.combine(
                winston.format.label({ label: 'HafezBot' }),
                winston.format.timestamp({ format: 'YYYY/MM/DD HH:mm:ss' }),
                winston.format.colorize(),
                winston.format.errors({ stack: true }),
                logFormat
            ),
            defaultMeta: { service: 'user-service' },
            transports: [ new winston.transports.Console() ]
        });
}
