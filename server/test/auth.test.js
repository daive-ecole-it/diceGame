const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index1'); // Assurez-vous que le chemin est correct
const should = chai.should();

chai.use(chaiHttp);

describe('Auth API', () => {
  it('it should register a new user', (done) => {
    chai.request(server)
        .post('/api/auth/register')
        .send({ name: 'Test User', email: 'test@example.com', password: '123456' })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('token');
          done();
        });
  });

  it('it should login a user', (done) => {
    chai.request(server)
        .post('/api/auth/login')
        .send({ email: 'test@example.com', password: '123456' })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('token');
          done();
        });
  });
});
