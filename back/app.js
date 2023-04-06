require('dotenv').config();
const express = require('express');
const cors = require('cors');

const personRoute = require('./routes/personRoute');
const requestRoute = require('./routes/requestRoute');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/persons', personRoute);
app.use('/requests', requestRoute);

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
