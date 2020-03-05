const organizeRepoRouter = require('../../controller/organizeElement/Element.controller');

module.exports = {
  method: 'POST',
  path: '/organize_children',
  options: {
    handler: organizeRepoRouter.organizingChildren,
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
};
