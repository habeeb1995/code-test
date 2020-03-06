const axios = require('axios');
const Helper = require('../utils/Helper');
const Response = require('../utils/Response');
// Limit for the repo to be shown
const perPage = 10;

class GithubRepoController {
  /**
   * Class with function for returning GitHub Repos.
   *
   * Function: listRepos
   * 1, Fetch list using axios by passing current page and total limit
   * 2, send back response by serving html using default rendering
   *
   * @query {number} page - Current page number
   * @return {html} - Rendered HTML response.
   */
  async listRepos(req, reply) {
    try {
      const activePage = req.query.page ? req.query.page : 1;
      // Helper class to count for pagination
      const pageList = Helper.getPageList(100, activePage, 10);
      // Fetching github repo using axios
      const res = await axios.get(`${process.env.API_BASE_URL}/search/repositories?q=nodejs&page=${
        activePage}&per_page=${perPage}`);
      return reply.view('index', { data: res.data, page_list: pageList, active_page: activePage });
    } catch (e) {
      const res = Response.apiError('not found');
      return reply.response(res).code(422);
    }
  }
}

module.exports = new GithubRepoController();
