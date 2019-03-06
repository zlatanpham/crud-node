const yup = require('yup');
const mongoose = require('mongoose');
const Inventory = require('../model/Inventory');
const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  Inventory.find(function(err, Inventory) {
    if (err) return next(err);
    res.json(Inventory);
  });
});

router.post('/', (req, res, next) => {
  const schema = yup.object().shape({
    name: yup.string().required(),
    desc: yup.string().required(),
    memo: yup.string().required(),
    vendor: yup.string().required(),
    paidBy: yup.string().required(),
  });
  schema.isValid(req.body).then(valid => {
    if (valid) {
      Inventory.create(
        { ...req.body, createdAt: new Date() },
        (err, result) => {
          if (err) next(err);
          res.json(result);
        },
      );
    } else {
      // next(err);
      res.status(400).send({ err: 'err' });
    }
  });
});

router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  const schema = yup.object().shape({
    name: yup.string().required(),
    desc: yup.string().required(),
    memo: yup.string().required(),
    vendor: yup.string().required(),
    paidBy: yup.string().required(),
    products: yup.array(
      yup.object().shape({
        name: yup.string().required(),
        sku: yup.string().required(),
        cost: yup.number().required(),
        stock: yup.array(
          yup.object().shape({
            quantity: yup.number().required(),
            location: yup.string().required(),
          }),
        ),
      }),
    ),
  });
  schema.isValid(req.body).then(valid => {
    if (valid) {
      Inventory.findOneAndUpdate(
        { _id: id },
        { ...req.body },
        (err, result) => {
          if (err) next(err);
          res.json(result);
        },
      );
    } else {
      // next(err);
      res.status(400).send({ err: 'err' });
    }
  });
});

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  Inventory.findByIdAndDelete(id, err => {
    if (err) return next(err);
    res.send(`delete inventory _id: ${id}`);
  });
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Inventory.findById(id, (err, inventory) => {
    if (err) return next(err);
    res.json(inventory);
  });
});

module.exports = router;
