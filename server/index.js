require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const CreditCard = require('./models/credit-card.model');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000 ',
  })
);

app.post('/', async (req, res) => {
  try {
    const data = req.body;
    const { _id, Amount } = await CreditCard.create(data);
    return res.json({ RequestId: _id, Amount });
  } catch (error) {
    return res.status(400).json({ msg: 'Ошибка' });
  }
});

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
