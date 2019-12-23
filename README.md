# Importer Challenge

Code for the Importer Challenge @Vizzuality.

The challenge consists in writting two endpoints:
  * POST. Uploads a CSV file to a database
  * GET. Performs queries on the inserted data
  
To solve this challenge, I decided to use MongoDB, as the data didn't had any special indexes, no relations, the csv provided as an example was simple enough to encapsulate it in a single collection in a mongo and afterwards make basic queries.

The endpoints are exposed trough 2 apps

## Writer

Located in the [writer](https://github.com/marianmoldovan/importer-challenge/tree/master/writer) folder. It contains a Node project that uses the framework Koa to expose a single endpoint, /upload that accepts a file and returns an 202 Accepted if there where no errors.

### Usage

 * POST /upload
 * binary file containg a csv file

### Dependencies
  * [koa](https://github.com/koajs/koa). Choosen because of simplicity and big support in the community
  * [@koa/router](https://github.com/koajs/router). Library used to handle routing in the project
  * [koa-depsi](https://github.com/SachaCR/koa-depsi). Dependency injection library, used to bind external dependencies to the koa app, like the database client
  * [mongodb](https://github.com/mongodb/node-mongodb-native). Client to connect to mongodb
  * [neat-csv](https://github.com/sindresorhus/neat-csv). Parses csv files, wrapper of csv-parser
  
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
  
### Development
  * To install the dependencies, run: ```yarn install```. For this you need yarn installed
  * To run this app isolated, run in the shell: ```yarn run start```
  * You need a mongodb instance to run the code, you could use a dockerized instance. Try ```docker run -d -p 27017-27019:27017-27019 --name mongodb mongo:4.0.4```
  
### Test

Located in the test folder, the command ```yarn run test``` will trigger the two tests. Using a mongodb mock, inserts a sample csv with 4 columns and after calling the api, checks if the API returned 202 and if the collection has the inserted documents.


## Reader

Located in the [reader](https://github.com/marianmoldovan/importer-challenge/tree/master/reader) folder. It contains a Python project using Flask microframework. Node project that uses the framework Koa to expose a single endpoint, /upload that accepts a file and returns an 202 Accepted if there where no errors.

### Usage

 * GET /query
 * Params:
   * country. Optional. Filter by country
   * sector. Optional. Filters the response by sector
   * parent. Optional. Filters for the desired parent sector
 * Pagination. By default the endpoint will return the first 20 items. You can paginate using the following url parameters:
   * limit. Optional, by default, 20. Indicates how many items you want in the response.
   * offset. Optional, by default, 0. Indicates how many items the query should skip.

### Dependencies
  * [Flask](https://www.palletsprojects.com/p/flask/). Microframework for web apps. Simple to use, one of the most popular frameworks.
  * [Flask-PyMongo](https://github.com/dcrosta/flask-pymongo). MongoDB client library in python 
  
Also, for testing purposes, it also relies on:
  * pytest. Library for performing tests

### Code

The directory reader has a folder called [application](https://github.com/marianmoldovan/importer-challenge/tree/master/reader/application) containing a Flask app. There are 4 files:
  * __init__.py. Contains the factory method that builds the Flask app along with it's necesary dependencies
  * config.py. Containing the necessary configuration for the project
  * db.py. Containing the mongo client
  * reader.py. Containing the flask blueprint for the query endpoint. Where is located all the logic related to the endpoint itself
  
### Development
  * To install the dependencies you need to do the following steps:
    * First create a virtualenv: ```python3 -m venv .flaskenv```
    * Then activate it: ```source .flaskenv/bin/activate```
    * Finally install the dependencies, ```pip install -r requirements.txt```
  * To run this app isolated, run in the shell: ```flask run```
  * You need a mongodb instance to run the code, you could use a dockerized instance. Try ```docker run -d -p 27017-27019:27017-27019 --name mongodb mongo:4.0.4```
  
### Test

The project tests it's set up with pytest and has a local configuration file, so to trigger the test, you only have to call ```pytest```from the root folder. 
  
## Deploy/instalation

In order to deploy, test and use the api, there is a Dockerfile in each app and a docker-compose file in the root directory of the repository. The docker compoose contains the following services:
  * mongodb. A mongodb instance shared by the two apps (reader and writer)
  * proxy. A nginx docker configured as a proxy, so you can make requests to a single host, that will redirect each request, based on the url to the appropiate container.
  * reader. Python app that contains the GET /query endpoint
  * writer. Node app that contains the POST /upload endpoint
  
To deploy all you need is docker and docker-compose and hit the following commands in root directory:

```
docker-compose build
docker-compose up
```

To manually test the app you can do it simply with curl:
 * writer app. Put a csv file (sample.csv) in the directory and type: ```curl --upload-file sample.csv -X POST localhost/upload```
 * reader app. Just ```curl localhost/query``` or ```curl localhost/query?country=ROU```
