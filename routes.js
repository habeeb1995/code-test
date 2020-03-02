const Element = require('./controller/Element');
const Repos = require('./controller/Repos');
const Joi = require('joi');

const routes = [
    {
        method: 'GET',
        path: '/',
        options: {
            handler: Repos.getRepos,
            description: 'Github NodeJS repos list',
            tags: ['api'], // ADD THIS TAG
        },
    },
    {
        method: 'POST',
        path: '/organize_children',
        options: {
            handler: Element.organizingChildren,
            description: 'Organising Children Tree',
            tags: ['api'], // ADD THIS TAG
            plugins: {
                'hapi-swagger': {
                    validate: {
                        payload: {}
                    }
                }
            },
        }
    }
];

module.exports = routes;
