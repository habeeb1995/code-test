const vision = require('@hapi/vision');
const handlebars = require('handlebars');
const Inert = require('@hapi/inert');
const HapiSwagger = require('hapi-swagger');
const Hapi = require('@hapi/hapi');
const Pack = require('../package');
const routes = require('../routes/common.router');
require('dotenv').config();

const startServer = async () => {
  const swaggerOptions = {
    info: {
      title: 'Pomelo Code Test Documentation',
      description: 'Documentation for the Tests List Github Repos and Organize children in Object.',
      version: Pack.version
    }
  };
  // Setting default Port and Host if no env found
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST
  });

  await server.register([
    Inert,
    vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    }
  ]);

  await server.start();
  server.views({
    engines: {
      html: handlebars
    },
    relativeTo: __dirname,
    path: '../templates',
    helpersPath: '../templates/helpers'
  });

  server.route(routes);

  console.log('Server running on %s', server.info.uri);
  return server;
};


process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});


module.exports = {
  startServer
};
