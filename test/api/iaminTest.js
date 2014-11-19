process.env.MONGO_URL = 'mongodb://localhost/event_test';
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);

require('../../server');

var expect = chai.expect;

describe('Create new event', function() {
  var id;
  it('should be able to create a event', function(done) {
    chai.request('http://localhost:3000')
    .post('/api/newEvent')
    .send({event_name: 'Code Party',})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.event_name).to.eql('Code Party');
      expect(res.body).to.have.property('_id');
      id = res.body._id;
      done();
    });
  });

  it('should be able to view current events', function(done) {
    chai.request('http://localhost:3000')
    .get('/api/Event/' + id)
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.event_name).to.eql('Code Party');
      done();
    });
  });

  it('should be able to view current event attendees', function(done){
    chai.request('http://localhost:3000')
    .get('/api/Event/' + id)
    .end(function(err, res){
      expect(err).to.eql(null);
      expect(res.body.participants).to.eql(3);
      done();
    });
  });

  it('should be able to update specific event', function(done){
    chai.request('http://localhost:3000')
    .post('/api/Event/:_id')
    .send({event_name: 'Dance Party'})
    .end(function(err, res){
      expect(err).to.eql(null);
      expect(res.body.event._id).to.eql('Dance Party!');
      done();
    });
  });

it('should be able to create a new user', function(done){
  chai.request('http://localhost:3000')
  .post('/login/newUser')
  .send({name: "Brent", phone_numer: "5559993345", password: "abc123"})
  .end(function(err, res){
    expect(err).to.eql(null);
    expect(res.status.code).to.eql(200);
    done();
  });
});

  it('should be able to delete and event', function(done) {
    chai.request('http://localhost:3000')
    .delete('/api/delete/' + id)
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.msg).to.eql('success!');
      done();
    });
  });
});
