# code-test

## Getting started

#### Base URL
`link: 0.0.0.0:3000`

#### Installing dependancies

`sudo docker build -t pomelo-test .`

#### Starting server
`sudo docker run -it --name pomelo-container -p 3000:3000 pomelo-test `

## Swagger documentation

- `hapi-swagger` self documents all the APIs.

- swagger documentation is located at `0.0.0.0:3000/documentaion`

## Unit testing

`npm run test`

## Run linters

`npm run lint`
