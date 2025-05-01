import winston from 'winston';
import path from 'path';
import 'winston-daily-rotate-file';
import fs from 'fs'
import packPath from "package-json-path";
console.log(process.env.npm_config_local_prefix)
console.log(packPath());
var dir = packPath(path.join(process.env.npm_config_local_prefix,'logs', 'logs')).replace('package.json','')
dir=dir.replace('package.json','').substring(0, dir.length-1);
var error = packPath(path.join('logs', 'logs', 'error')).replace('package.json','');
error=error.replace('package.json','').substring(0, error.length-1);

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, true);
}
if (!fs.existsSync(error)) {
    fs.mkdirSync(error, true);
}



const Logger = new (winston.Logger)({
    transports: [
        new (winston.transports.DailyRotateFile)({
            name: 'info-file',
            datePattern: '.yyyy-MM-dd',
            filename: path.join('logs', 'logs', 'filelog-info.log'),
            level: 'info'
        }),
        new (winston.transports.DailyRotateFile)({
            name: 'error-file',
            datePattern: '.yyyy-MM-dd',
            filename: path.join('logs', 'logs', 'error', 'filelog-error.log'),
            level: 'error'
        })
    ]
});


export default Logger;
