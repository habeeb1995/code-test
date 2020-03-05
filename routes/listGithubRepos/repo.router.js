const RepoController = require('../../controller/listGithubRepos/Repos.controller');

module.exports = {
  method: 'GET',
  path: '/',
  options: {
    handler: RepoController.listRepos,
    description: 'List Github NodeJS repos list',
    tags: ['api']
  }
};
