# Importer Challenge

Code for the Importer Challenge @Vizzuality.

The challenge consists in writting two endpoints:
  * POST. Uploads a CSV file to a database
  * GET. Performs queries on the inserted data
  
To solve this challenge, I decided to use MongoDB, as the data didn't had any special indexes, no relations, the csv provided as an example was simple enough to encapsulate it in a single collection in a mongo and afterwards make basic queries.

The endpoints are exposed trough 2 apps

## Writer

Located in the (reader)[!https://github.com/marianmoldovan/importer-challenge/tree/master/writer] folder. It contains a Node project that uses the framework Koa to expose a single endpoint, /upload that accepts a file and returns an 202 Accepted if there where no errors.

### Dependencies
  * koa
  * @koa/router. Library used to handle routing in the project
  * koa-depsi. Dependency injection library, used to bind external dependency to the koa app
  * mongodb. Client to connect to mongodb
  * neat-csv. Parses csv files
  
Also, for testing purposes, it also relies on:
  * chai. Popular framework for building tests
  * node-fetch. Performs http requests
  * mongo-unit. Fakes a mongo database
  
### Code

The app has only 6 files:
  * index.js. 
  * package.json. Node.js file with the dependencies
  * app.js. File with the koa app factory method. Creates the app and returns it
  * controller.js. It includes the logic of the single endpoint. Accepts an csv and uploads it to the 'data' collection of the provided db
  * routes.js. Includes the only route, /upload and links it to the controller
  * Dockerfile. Deployment package of the app
  
### Test

Located in the test folder, the command ```yarn run test``` will trigger the two tests. Using a mongodb mock, inserts a sample csv with 4 columns and after calling the api, checks if the API returned 202 and if the collection has the inserted documents.


## Reader
