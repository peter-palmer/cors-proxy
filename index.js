const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const request = require('request');
const dotenv = require('dotenv');

dotenv.config();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  const imageUrl = req.query.url;
  if (!imageUrl) {
    return res.status(400).json({ error: 'Falta ?url=...' });
  }

  const options = {
    url: imageUrl,
    method: 'GET',
    encoding: null,  // entrega Buffer
    headers: {
      origin: req.headers.origin || '*',
      'x-requested-with': req.headers['x-requested-with'] || 'XMLHttpRequest'
    }
  };

  request(options, (err, response, body) => {
    if (err) return res.status(500).json({ error: 'Error al obtener imagen' });

    res.set('Content-Type', response.headers['content-type'] || 'application/octet-stream');
    res.send(body);
  });
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log('API listening on port 3000');
});
