const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index1'); // Assurez-vous que le chemin est correct
const should = chai.should();

chai.use(chaiHttp);

describe('Game API', () => {
  let token;

  before((done) => {
    chai.request(server)
        .post('/api/auth/login')
        .send({ email: 'test@example.com', password: '123456' })
        .end((err, res) => {
          token = res.body.token;
          done();
        });
  });

  it('it should create a new game session', (done) => {
    chai.request(server)
        .post('/api/game/sessions')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Test Session' })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('_id');
          done();
        });
  });

  it('it should get a game session', (done) => {
    chai.request(server)
        .get('/api/game/sessions/1') // Assurez-vous que l'ID de session est correct
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('session');
          done();
        });
  });
});
