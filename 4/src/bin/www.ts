#!/usr/bin/env node

import app from '../app';
import debug from 'debug';
import http from 'http'
import dotenv from 'dotenv';
import { portType, addrType } from '../types/www';

dotenv.config({ path: '../.env' });

const serverDebug = debug("server:onListening");

// port setting
const port: portType =
    (function (val: string | number) {
        let port: number = Number(val);

        // named pipe
        if (Object.is(port, NaN)) { return val; }

        // port number
        if (port >= 0) { return port; }

        return false;
    }(process.env.PORT || 3000));

app.set('port', port);

const onError = function (
    error: NodeJS.ErrnoException
): void {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

const onListening = function (): void {
    const addr: addrType = server.address();
    if (addr != null) {
        const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
        serverDebug('Listening on ' + bind);
    }
}

const server = http.createServer(app);

server.listen(port, () => { console.log(`server start port ${port}`); });

server.on('error', onError);
server.on('listening', onListening);

process.on('SIGTERM', () => {
    serverDebug('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        serverDebug('HTTP server closed')
    });
});