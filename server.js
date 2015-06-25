var express = require('./config/express'),
	mongoose = require('./config/mongoose');

var app = express();
var db = mongoose();

app.listen(app.get('port'), function() {
  console.log('Express server running on port %d in %s mode', app.get('port'), app.get('env'));
});

module.exports = app;