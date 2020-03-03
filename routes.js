const Element = require('./controller/Element');
const Repos = require('./controller/Repos');
// API routes with swagger documentation
const routes = [
  {
    method: 'GET',
    path: '/',
    options: {
      handler: Repos.getRepos,
      description: 'Github NodeJS repos list',
      tags: ['api']
    }
  },
  {
    method: 'POST',
    path: '/organize_children',
    options: {
      handler: Element.organizingChildren,
      description: 'Organising Children Tree',
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          validate: {
            payload: {}
          }
        }
      }
    }
  }
];

module.exports = routes;
