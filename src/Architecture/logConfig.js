import winston from 'winston';
import path from 'path';
import 'winston-daily-rotate-file';
import { fileURLToPath } from 'url';
import fs from 'fs'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
if (!process.env.LOGS_PATH) {
    var dir = path.join(__dirname,'./logs');
    var error = path.join(__dirname,'/logs/error');

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    if (!fs.existsSync(error)) {
        fs.mkdirSync(error);
    }
}


const Logger = new (winston.Logger)({
    transports: [
        new (winston.transports.DailyRotateFile)({
            name: 'info-file',
            datePattern: '.yyyy-MM-dd',
            filename: process.env.LOGS_PATH ? process.env.LOGS_PATH + "\\filelog-info.log" : path.join(__dirname, "logs", 'filelog-info.log'),
            level: 'info'
        }),
        new (winston.transports.DailyRotateFile)({
            name: 'error-file',
            datePattern: '.yyyy-MM-dd',
            filename: process.env.LOGS_PATH ? process.env.LOGS_PATH + "\\filelog-info.log" : path.join(__dirname, "logs/error", 'filelog-error.log'),
            level: 'error'
        })
    ]
});


export default Logger;
