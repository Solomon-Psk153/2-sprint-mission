#!/usr/bin/env node

import app from '../app';
import http from 'http'
import dotenv from 'dotenv';
import { PORT } from '../utils/env.util';
import ScoketApp from '../sockets/socket-app.socket';

dotenv.config({ path: '../.env' });

// port setting
const port =
    (function (val: string | number): PortReturnType {
        let port: number = Number(val);

        // named pipe
        if (Object.is(port, NaN)) { return val; }

        // port number
        if (port >= 0) { return port; }

        return false;
    }(PORT));

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
};

/**
 * Event listener for HTTP server "listening" event.
 */

const onListening = function (): void {
    const addr: ServerAddressType = server.address();
    if (addr != null) {
        const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    }
};

app.set('port', port);
const server = http.createServer(app);
ScoketApp.initialize(server,
    {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
        transports: ["polling", "websocket"]
    }
);

server.listen(() => { console.log(`server start port ${port}`); });

server.on('error', onError);
server.on('listening', onListening);

process.on('SIGTERM', () => {
    server.close(() => {
        console.log(`server is closed by SIGTERM`);
    });
});