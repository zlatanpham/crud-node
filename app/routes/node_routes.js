module.exports = function(app, db) {
  app.get('/notes', (req, res) => {
    const result = db
      .collection('notes')
      .find({})
      .toArray((err, result) => {
        if (err) {
          res.send(err);
        } else {
          res.send(result);
        }
      });
  });

  app.get('/notes/:id', (req, res) => {
    const { id } = req.params;
    const details = { _id: id };
    console.log(details);
    db.collection('notes').findOne(details, (err, item) => {
      console.log(item);
      if (err) {
        res.send({ error: 'An error has occurred' });
      } else {
        res.send(item);
      }
    });
  });

  app.post('/notes', (req, res) => {
    // You'll create your note here.
    console.log(req.body);
    db.collection('notes').insertOne({ test: 'test' }, (err, result) => {
      if (err) {
        res.send({ error: 'An error has occurred' });
      } else {
        console.log('success');
        res.send(result.ops[0]);
      }
    });
  });
};
