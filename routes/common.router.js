const githubRepoRouter = require('./listGithubRepos/repo.router');
const organizeElementRouter = require('./organizeElement/element.router');

// API routes are configured with swagger documentation
const routes = [
  githubRepoRouter,
  organizeElementRouter
];

module.exports = routes;
