const { Schema, model } = require('mongoose');

const CreditCardSchema = new Schema({
  CardNumber: { type: String, unique: true, required: true },
  ExpDate: { type: String, required: true },
  Cvv: { type: String, required: true },
  Amount: { type: Number, required: true },
});

module.exports = model('CreditCard', CreditCardSchema);
