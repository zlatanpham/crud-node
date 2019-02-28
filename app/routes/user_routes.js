const yup = require('yup');

module.exports = function(app, db) {
  // app.get('/notes', (req, res) => {
  //   const result = db
  //     .collection('notes')
  //     .find({})
  //     .toArray((err, result) => {
  //       if (err) {
  //         res.send(err);
  //       } else {
  //         res.send(result);
  //       }
  //     });
  // });

  // app.get('/notes/:id', (req, res) => {
  //   const { id } = req.params;
  //   const details = { _id: id };
  //   console.log(details);
  //   db.collection('notes').findOne(details, (err, item) => {
  //     console.log(item);
  //     if (err) {
  //       res.send({ error: 'An error has occurred' });
  //     } else {
  //       res.send(item);
  //     }
  //   });
  // });

  app.post('/users', (req, res) => {
    const schema = yup.object().shape({
      firstName: yup.string().required(),
      lastName: yup.string().required(),
    });
    schema.isValid(req.body).then(valid => {
      if (valid) {
        db.collection('users').insertOne(
          { ...req.body, createdOn: new Date() },
          (err, result) => {
            if (err) {
              res.send({ error: 'An error has occurred' });
            } else {
              res.send(result.ops[0]);
            }
          },
        );
      } else {
        console.log('error 400');
        res.status(400).send({ err: 'errro' });
      }
    });
  });
};
