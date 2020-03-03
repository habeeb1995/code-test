const axios = require('axios');
const Helper = require('../helpers/Helper');
const Response = require('../response/Response');
// Limit for the repo to be shown
const perPage = 10;

class Repos {
  // 1, Fetch Repos using axios by passing current page and total limit
  // 2, send back response by serving html using default rendering
  async getRepos(req, reply) {
    try {
      const activePage = req.query.page ? req.query.page : 1;
      const res = await axios.get(`${process.env.API_BASE_URL}/search/repositories?q=nodejs&page=${
        activePage}&per_page=${perPage}`);
      // Helper class to count for pagination
      const pageList = Helper.getPageList(100, activePage, 10);
      return reply.view('index', { data: res.data, page_list: pageList, active_page: activePage });
    } catch (e) {
      const res = Response.apiError('not found');
      return reply.response(res).code(422);
    }
  }
}

module.exports = new Repos();
