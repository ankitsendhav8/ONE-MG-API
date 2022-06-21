#!/usr/bin/env node

/* eslint-disable no-shadow */

/* eslint-disable no-restricted-globals */

/* eslint-disable no-console */

/* eslint-disable no-use-before-define */

/* eslint-disable import/order */

/**
 * Module dependencies.
 */
"use strict";

var _index = _interopRequireDefault(require("./app/index"));

var _http = _interopRequireDefault(require("http"));

var _log = require("./app/log.service");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`; // handle specific listen errors with friendly messages

  switch (error.code) {
    case 'EACCES':
      (0, _log.log)(`${bind} requires elevated privileges`);
      process.exit(1);
      break;

    case 'EADDRINUSE':
      (0, _log.log)(`${bind} is already in use`);
      process.exit(1);
      break;

    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  (0, _log.log)(`Listening on ${bind}`);
}

const port = normalizePort(process.env.PORT || '3000');

_index.default.set('port', port);

const server = _http.default.createServer(_index.default);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);