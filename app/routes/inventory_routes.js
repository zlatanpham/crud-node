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
    date: yup.string().required(),
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

module.exports = router;

// router.get('/:id', (req, res, next) => {
//   const { id } = req.params;
//   Inventory.findById(id, (err, Inventory) => {
//     if (err) return next(err);
//     res.json(Inventory);
//   });
// });

// router.delete('/:id', (req, res, next) => {
//   const { id } = req.params;
//   Inventory.findByIdAndDelete(id, err => {
//     if (err) next(err);
//     console.log(id);
//     res.send('ok');
//   });
// });

// router.post('/deletes', (req, res) => {
//   const schema = yup.object().shape({
//     ids: yup.array(yup.string()).required(),
//   });

//   schema.isValid(req.body).then(valid => {
//     if (valid) {
//       Inventory.deleteMany({ _id: { $in: req.body.ids } }, (err, result) => {
//         if (err) throw err;
//         res.send(result);
//       });
//     } else {
//       // next(err);
//       res.status(400).send({ err: 'err' });
//     }
//   });
// });
