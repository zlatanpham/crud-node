const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const db = require('./config/db');
dotenv.config();

const app = express();

console.log(`Your port is ${process.env.PORT}`); // 8626

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
