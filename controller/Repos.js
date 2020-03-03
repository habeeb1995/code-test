const axios = require('axios');
const Helper = require('../helpers/Helper');
const Response = require('../response/Response');

const perPage = 10;

class Repos {
  async getRepos(req, h) {
    try {
      const activePage = req.query.page ? req.query.page : 1;
      const res = await axios.get(`${process.env.API_BASE_URL}/search/repositories?q=nodejs&page=${
        activePage}&per_page=${perPage}`);
      const pageList = Helper.getPageList(100, activePage, 10);
      return h.view('index', { data: res.data, page_list: pageList, active_page: activePage });
    } catch (e) {
      const res = Response.apiError('not found');
      return h.response(res).code(422);
    }
  }
}

module.exports = new Repos();
