require('dotenv').config();
const express = require('express');
const cors = require('cors');

const categoryRoute = require('./routes/categoryRoute');
const transactionRoute = require('./routes/transactionRoute');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/categories', categoryRoute);
app.use('/transactions', transactionRoute);

app.use((req, res) => {
  res.status(404).json({ message: 'resource not found on this server' });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: err.message });
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
