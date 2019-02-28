const noteRoutes = require('./node_routes');
const userRoutes = require('./user_routes');

module.exports = function(app, db) {
  noteRoutes(app, db);
  userRoutes(app, db);
  // Other route groups could go here, in the future
};
