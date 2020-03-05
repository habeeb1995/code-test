require('dotenv').config();

const server = require('./bin/server');

if (process.env.NODE_ENV === 'production') {
  console.log = () => {};
}
module.exports = server.startServer();
