const express = require('express');
const app = express();

app.use(express.json()); // for parsing application/json

app.get('/', (req, res) => {
  res.send({
    message: 'hola',
  });
});

app.get('/test', (req, res) => {
  res.send({ message: 'test' });
});

app.post('/sum', (req, res) => {
  res.send({
    result: req.body.a + req.body.b,
  });
});

app.post('/product', (req, res) => {
  res.send({
    result: req.body.a * req.body.b,
  });
});

app.post('/sumArray', (req, res) => {
  let { array, num } = req.body;
  let numero;
  for (let k = 0; k < array.length; k++) {
    numero = array[k];
    for (let i = 0; i < array.length; i++) {
      if (numero !== array[i]) {
        if (numero + array[i] === num) {
          return res.send({ result: true });
        }
      }
    }
  }
  res.status(404).send({ result: false });
});

app.post('/numString', (req, res) => {
  let { string } = req.body;
  if (typeof string !== 'string' || string === '')
    return res.status(400).send('error');
  let cuantity = string.split(' ').join('').length;
  res.send({ result: cuantity });
});

app.post('/pluck', (req, res) => {
  let { array, key } = req.body;
  if (!Array.isArray(array) || !key)
    return res.status(400).send({ result: false });
  let answer = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i][key]) answer.push(array[i][key]);
  }
  res.send({ result: answer });
});

module.exports = app; // Exportamos app para que supertest session la pueda ejecutar
