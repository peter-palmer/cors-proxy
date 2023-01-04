const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const request = require('request');
const dotenv = require('dotenv');

dotenv.config();

app.use(cors());
app.use(bodyParser.json());

app.post('/', (req, res) => {
  if (!req.headers.origin && !req.headers['x-requested-with']) {
    res.status(400).send({error: 'Missing required headers (origin or x-requested-with)'});
    return;
  }
  const options = {
    url: req.body.url,
    method: req.body.method,
    headers: req.body.headers,
    body: req.body.body
  }
  request(options, (error, response, body) => {
    if (error) {
      res.send({error});
    } else {
      res.send({response, body});
    }
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('API listening on port 3000');
});
