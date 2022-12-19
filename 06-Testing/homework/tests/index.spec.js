const session = require('supertest-session');
const app = require('../index.js'); // Importo el archivo de entrada del server de express.

const agent = session(app);

describe('Test de APIS', () => {
  describe('GET /', () => {
    it('responds with 200', () => agent.get('/').expect(200));
    it('responds with an object with message `hola`', () =>
      agent.get('/').then((res) => {
        expect(res.body.message).toEqual('hola');
      }));
  });

  describe('GET /test', () => {
    it('responds with 200', () => agent.get('/test').expect(200));
    it('responds with an object with message `test`', () =>
      agent.get('/test').then((res) => {
        expect(res.body.message).toEqual('test');
      }));
  });

  describe('POST /sum', () => {
    it('responds with 200', () => agent.post('/sum').expect(200));
    it('responds with the sum of 2 and 3', () =>
      agent
        .post('/sum')
        .send({ a: 2, b: 3 })
        .then((res) => {
          expect(res.body.result).toEqual(5);
        }));
  });

  describe('POST /producto', () => {
    it('responds with 200', () => agent.post('/product').expect(200));
    it('responds with the product of 2 and 3', () =>
      agent
        .post('/product')
        .send({ a: 2, b: 3 })
        .then((res) => {
          expect(res.body.result).toEqual(6);
        }));
  });

  describe('POST /sumArray', () => {
    it('responds with 200', () => agent.get('/test').expect(200));
    it('if the sum of two elements of the array equals num, responds with an object with result `true`', () =>
      agent
        .post('/sumArray')
        .send({ array: [2, 5, 7, 10, 11, 15, 20], num: 13 })
        .then((res) => {
          expect(res.body.result).toEqual(true);
        }));
    it('if the sum of two elements of the array is not num, responds with an object with result `false`', () =>
      agent
        .post('/sumArray')
        .send({ array: [2, 5, 7, 10, 11, 15, 20], num: 14 })
        .then((res) => {
          expect(res.body.result).toEqual(false);
        }));
    it('must not sum the same number if repeated in the array', () =>
      agent
        .post('/sumArray')
        .send({ array: [2, 5, 7, 10, 11, 15, 20, 7], num: 14 })
        .then((res) => {
          expect(res.body.result).toEqual(false);
        }));
    it('if false, responds with 404', () =>
      agent
        .post('/sumArray')
        .send({ array: [2, 5, 7, 10, 11, 15, 20], num: 19 })
        .then((res) => {
          expect(res.status).toEqual(404);
        }));
  });

  describe('POST /numString', () => {
    let strings = [
      { string: '' },
      { string: 'hola' },
      { string: 'la vaca voladora' },
      { string: 'welcomeToNarnia' },
      { string: 1234 },
    ];

    it('responds with 200 if the input is a string and is not empty', () =>
      agent
        .post('/numString')
        .send(strings[1])
        .then((res) => {
          expect(res.status).toEqual(200);
        }));
    it('responds with 400 if the input is an empty string', () =>
      agent
        .post('/numString')
        .send(strings[0])
        .then((res) => {
          expect(res.status).toEqual(400);
        }));
    it('responds with 400 if the input is NOT a string', () =>
      agent
        .post('/numString')
        .send(strings[4])
        .then((res) => {
          expect(res.status).toEqual(400);
        }));
    it('responds with an object with a property result that equals the number of characters in the string withouth counting white spaces between words', () =>
      agent
        .post('/numString')
        .send(strings[1])
        .then((res) => {
          expect(res.body.result).toEqual(4);
        }));
    it('responds with an object with a property result that equals the number of characters in the string withouth counting white spaces between words', () =>
      agent
        .post('/numString')
        .send(strings[2])
        .then((res) => {
          expect(res.body.result).toEqual(14);
        }));
    it('responds with an object with a property result that equals the number of characters in the string withouth counting white spaces between words', () =>
      agent
        .post('/numString')
        .send(strings[3])
        .then((res) => {
          expect(res.body.result).toEqual(15);
        }));
  });
  describe('POST /pluck', () => {
    let array = [
      { enHowarts: 'se la re fuman' },
      { enHowarts: 'se lo garcharon a valdomero' },
      { narnia: 'y los huerfanitos' },
      { narnia: 'y el secreto en el armario' },
      { cristina: 'se la come' },
      { cristina: 'chorra' },
    ];
    it('responds with 200 if the input is an array', () =>
      agent
        .post('/pluck')
        .send({ array, key: 'test' })
        .then((res) => {
          expect(res.status).toEqual(200);
        }));
    it('responds with 400 if the input is NOT an array', () =>
      agent
        .post('/pluck')
        .send({ number: 1234, key: 'test' })
        .then((res) => {
          expect(res.status).toEqual(400);
        }));
    it('responds with 400 if the property is empty', () =>
      agent
        .post('/pluck')
        .send({ array, key: '' })
        .then((res) => {
          expect(res.status).toEqual(400);
        }));
    it('responds with an array with the values of this property', () =>
      agent
        .post('/pluck')
        .send({ array, key: 'enHowarts' })
        .then((res) => {
          expect(res.body.result).toEqual([
            'se la re fuman',
            'se lo garcharon a valdomero',
          ]);
        }));
    it('responds with an array with the values of this property', () =>
      agent
        .post('/pluck')
        .send({ array, key: 'narnia' })
        .then((res) => {
          expect(res.body.result).toEqual([
            'y los huerfanitos',
            'y el secreto en el armario',
          ]);
        }));
    it('responds with an array with the values of this property', () =>
      agent
        .post('/pluck')
        .send({ array, key: 'cristina' })
        .then((res) => {
          expect(res.body.result).toEqual(['se la come', 'chorra']);
        }));
  });
});
