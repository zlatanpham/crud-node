var mongoose = require('mongoose');

var InventorySchema = new mongoose.Schema({
  name: String,
  desc: String,
  vendor: String,
  paidBy: String,
  memo: String,
  date: Date,
  taxPaid: { type: Number, default: 0 },
  shipPaid: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  products: [
    {
      name: String,
      sku: String,
      cost: String,
      stock: [{ quantity: Number, location: String }],
    },
  ],
});

module.exports = mongoose.model('Inventory', InventorySchema);
