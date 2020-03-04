const vision = require('@hapi/vision');
const handlebars = require('handlebars');
const Inert = require('@hapi/inert');
const HapiSwagger = require('hapi-swagger');
const Hapi = require('@hapi/hapi');
const Pack = require('./package');
const routes = require('./routes');
require('dotenv').config();

const startServer = async () => {
  const swaggerOptions = {
    info: {
      title: 'API documentation',
      description: 'Here is given the api for organizing the children parent relation in appendix 1 input',
      version: Pack.version
    }
  };

  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: process.env.HOST || '0.0.0.0'
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
    path: 'templates',
    helpersPath: 'templates/helpers'
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
