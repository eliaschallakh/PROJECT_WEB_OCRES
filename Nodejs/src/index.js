const app = require('./app');


let server;
server = app.listen(5000, () => {
    console.log(`Listening to port 5000`);
  });

const exitHandler = () => {
  if (server) {
    server.close(() => {
        console.log('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  console.log(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  console.log('SIGTERM received');
  if (server) {
    server.close();
  }
});