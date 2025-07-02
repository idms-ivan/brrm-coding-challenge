# brrm-coding-challenge

Brrm backend coding challenge

You can run the application either using Docker or with Node/npm.
To start application:

1.  With docker:
    docker-compose up --build

2.  With npm:
    a) create .env file in project root with properties(please fill with your credentials):

    PORT=3000
    DATABASE_NAME=brrm
    DATABASE_USERNAME=postgres
    DATABASE_PASSWORD=root
    DATABASE_HOST=db

    b)install dependencies: npm install

    c)start the application: npm run start

In root folder there is file brrm.postman_collections.json that can be imported in postman to see and test all API's
