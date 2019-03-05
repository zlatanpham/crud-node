const yup = require('yup');
const mongoose = require('mongoose');
const User = require('../model/User');
const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  User.find(function(err, users) {
    if (err) return next(err);
    res.json(users);
  });
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  User.findById(id, (err, user) => {
    if (err) return next(err);
    res.json(user);
  });
});

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  User.findByIdAndDelete(id, err => {
    if (err) next(err);
    console.log(id);
    res.send('ok');
  });
});

router.post('/', (req, res, next) => {
  const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    address: yup.string().required(),
  });
  schema.isValid(req.body).then(valid => {
    if (valid) {
      User.create({ ...req.body, createdAt: new Date() }, (err, result) => {
        if (err) next(err);
        res.json(result);
      });
    } else {
      // next(err);
      res.status(400).send({ err: 'err' });
    }
  });
});

router.post('/deletes', (req, res) => {
  const schema = yup.object().shape({
    ids: yup.array(yup.string()).required(),
  });

  schema.isValid(req.body).then(valid => {
    if (valid) {
      User.deleteMany({ _id: { $in: req.body.ids } }, (err, result) => {
        if (err) throw err;
        res.send(result);
      });
    } else {
      // next(err);
      res.status(400).send({ err: 'err' });
    }
  });
});

module.exports = router;
