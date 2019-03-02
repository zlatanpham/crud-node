const faker = require('faker');
const MongoClient = require('mongodb').MongoClient;
const db = require('../config/db');

MongoClient.connect(db.url, { useNewUrlParser: true }, (err, database) => {
  if (err) return console.log(err);
  // Make sure you add the database name and not the collection name
  dtb = database.db('local');
  dtb.collection('users').insertMany(
    Array.from({ length: 20 }, () => ({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      address: faker.address.streetAddress(),
      dateOfBirth: faker.date.past(),
      createdOn: new Date(),
    })),
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Successfully insert`);
      }
      process.exit();
    },
  );
});
