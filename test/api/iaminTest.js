process.env.MONGO_URL = 'mongodb://localhost/notes_test';
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);

require('../../server');

var expect = chai.expect;

describe('Create new event', function() {
  var id;
  it('should be able to create a note', function(done) {
    chai.request('http://localhost:3000')
    .post('/api/newEvent')
    .send({event_name: 'Code Party'})
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
    });
  });

  it('should be able to destroy a note', function(done) {
    chai.request('http://localhost:3000')
    .delete('/api/delete/' + id)
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.msg).to.eql('success!');
      done();
    });
  });
});
