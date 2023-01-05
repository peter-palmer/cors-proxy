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
    res.status(400).send({ error: 'Missing required headers (origin or x-requested-with)' });
    return;
  }
  if (!req.body.url) {
    res.send({
      error: "No URL provided",
    })
    return;
  }

  if(!req.body.headers) req.body.headers = {};
  req.body.headers['x-requested-with'] = req.headers['x-requested-with'];
  req.body.headers.origin = req.headers.origin;
  
  const options = {
    url: req.body.url,
    method: req.body.method,
    body: JSON.stringify(req.body.body),
    headers: JSON.stringify(req.body.headers)
  }
  
  request(options, (error, response, body) => {
    if (error) {
      res.send({ error });
    } else {
      try {
        const json = JSON.parse(body);
        res.send(json);
      } catch (err) {
        res.send(body);
      }
    }
  });
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log('API listening on port 3000');
});
