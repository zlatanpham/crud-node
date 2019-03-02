const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const db = require('./config/db');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const methodOverride = require('method-override');

dotenv.config();

const app = express();

console.log(`Your port is ${process.env.PORT}`); // 8626

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());

app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  );

  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type',
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

const port = 8000;

MongoClient.connect(db.url, { useNewUrlParser: true }, (err, database) => {
  if (err) return console.log(err);

  // Make sure you add the database name and not the collection name
  dtb = database.db('local');
  require('./app/routes')(app, dtb);
  app.listen(port, () => {
    console.log('We are live on ' + port);
  });
});
