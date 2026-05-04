import express from 'express';
import logger from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger.js';
import path from 'path';
import http from 'http';
import dotenvx from '@dotenvx/dotenvx';
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import { testDBConnection } from './config/db.js';
import { connectMongo } from './config/mongo.js';

testDBConnection();
connectMongo();

dotenvx.config();

const port = process.env.PORT || '3000';

const app = express();

// #region Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// #region Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// #region Errors

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).send('Not Found');
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// #region Server Functions
// Event listener for HTTP server "error" event.
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
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

// Event listener for HTTP server "listening" event.
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}


// #region Server
// store port in Express
app.set('port', port);
// Create HTTP server.
var server = http.createServer(app);
// Listen on provided port, on all network interfaces.
if (process.env.NODE_ENV !== 'test') {
  server.listen(port);
}
server.on('error', onError);
server.on('listening', onListening);

export default app;