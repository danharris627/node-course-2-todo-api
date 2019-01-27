const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

beforeEach((done) => {
  Todo.remove({}).then(() => done()); // make sure the DB is empty before test. Will only move onto test case once we call done
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app) // going to make a request on our app
      .post('/todos') // call .post, sets up a post request
      .send({text}) // sending data along with the request as our body - we pass in our text above
      .expect(200) // We expect a status code of 200
      .expect((res) => {
        expect(res.body.text).toBe(text);
      }) // we expect the results body text to be the text that we passed in
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      }); // check mongodb to see what got added in
  });

  // test that it doesnt create one with bad data
  it('should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({}) // we pass in empty object
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find().then((todos) => {
          expect(todos.length).toBe(0); // should be no todos in DB
          done();
        }).catch((e) => done(e));
      });
  });
});
