module.exports = function() {

  return function(req, res, next) {
    process.on('exit', function() {});

    // catch ctrl+c event and exit normally
    process.on('SIGINT', function() {
      process.exit(2);
    });

    //catch uncaught exceptions, trace, then exit normally
    process.on('uncaughtException', function(e) {
      console.log('Uncaught Exception...');
      console.log(e.stack);
      process.exit(99);
    });
    next();
  }
};