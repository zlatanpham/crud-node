var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  address: String,
  createdOn: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);
