const axios = require('axios');
const Helper = require('../helpers/Helper');
const Response = require('../response/Response');

const per_page = 10;


class Repos {
    async getRepos(req, h) {
        try {
            let active_page = req.query.page ? req.query.page : 1;
            let res = await axios.get(`${process.env.API_BASE_URL}/search/repositories?q=nodejs&page=${active_page}&per_page=${per_page}`);
            let page_list = Helper.getPageList(100, active_page, 10);
            return h.view('index', {data: res.data, page_list, active_page});
        } catch (e) {
            let res = Response.apiError("not found");
            return h.response(res).code(422);
        }

    }
}

module.exports = new Repos();
