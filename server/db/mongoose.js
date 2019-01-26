// load in mongoose
var mongoose = require('mongoose');
// use built in promise library
mongoose.Promise = global.Promise;
// connect to the db
mongoose.connect('mongodb://localhost:27017/TodoApp');

// weve set the DB up & configured it to use promises
// mongoseconnect waits until the db is connected before running any code
module.exports = {
  mongoose
};
