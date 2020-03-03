
const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');

exports.lab = Lab.script();
const {
  afterEach, beforeEach, describe, it
} = exports.lab;
const { startServer } = require('../server');

describe('GET /', () => {
  let server;

  beforeEach(async () => {
    server = await startServer();
  });

  afterEach(async () => {
    await server.stop();
  });

  it('responds with 200', async () => {
    const res = await server.inject({
      method: 'get',
      url: '/'
    });
    expect(res.statusCode).to.equal(200);
  });

  it('responds with 422 - For invalid query params', async () => {
    const res = await server.inject({
      method: 'get',
      url: '/?page=200'
    });
    expect(res.statusCode).to.equal(422);
  });
});
