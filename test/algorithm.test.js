'use strict';

const Lab = require('@hapi/lab');
const {expect} = require('@hapi/code');
const {afterEach, beforeEach, describe, it} = exports.lab = Lab.script();
const {startServer} = require('../server');

describe('POST /algorithm', () => {
    let server;

    beforeEach(async () => {
        server = await startServer();
    });

    afterEach(async () => {
        await server.stop();
    });

    it('responds with 200', async () => {
        const res = await server.inject({
            method: 'POST',
            url: '/organize_children',
            payload: {
                "0": [
                    {
                        "id": 10,
                        "title": "House",
                        "level": 0,
                        "children": [],
                        "parent_id": null
                    }
                ],
                "1": [
                    {
                        "id": 12,
                        "title": "Red Roof",
                        "level": 1,
                        "children": [],
                        "parent_id": 10
                    },
                    {
                        "id": 18,
                        "title": "Blue Roof",
                        "level": 1,
                        "children": [],
                        "parent_id": 10
                    },
                    {
                        "id": 13,
                        "title": "Wall",
                        "level": 1,
                        "children": [],
                        "parent_id": 10
                    }
                ],
                "2": [
                    {
                        "id": 17,
                        "title": "Blue Window",
                        "level": 2,
                        "children": [],
                        "parent_id": 12
                    },
                    {
                        "id": 16,
                        "title": "Door",
                        "level": 2,
                        "children": [],
                        "parent_id": 13
                    },
                    {
                        "id": 15,
                        "title": "Red Window",
                        "level": 2,
                        "children": [],
                        "parent_id": 12
                    }
                ]
            }
        });
        expect(res.statusCode).to.equal(200);
    });

    it('responds with 422 - Invalid JSON Input', async () => {
        const res = await server.inject({
            method: 'POST',
            url: '/organize_children',
            payload: {
                "name": "name"
            }
        });
        expect(res.statusCode).to.equal(422);
    });
});

