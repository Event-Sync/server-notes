process.env.MONGO_URL = 'mongodb://localhost/event_test';
var chai = require('chai');
var chaihttp = require('chai-http');
var Event = require('../../models/event');
var User = require('../../models/user');

chai.use(chaihttp);

require('../../server');

var expect = chai.expect;

after(function() {
  User.remove({}, function(err) {
    if (err) return res.status(500).send(err);
    console.log('users dusted')
  });

  Event.remove({}, function(err) {
    if (err) return res.status(500).send(err);
    console.log('events dusted');
  });
});

var jwt;
var event_id;
var initJwt;

before(function(done) {
  chai.request('http://localhost:3000')
  .post('/login/newUser')
  .send(
    {
      name: 'testtest',
      phone_number: '8888888888',
      password: 'testmanpass'
  })
  .end(function(err, res) {
    console.log('add start user')
    initJwt = res.body.jwt;
    done();
  })
});

before(function(done) {
  chai.request('http://localhost:3000')
  .post('/v1/api/newEvent')
  .send(
  {
    jwt: initJwt,
    owner_name:'inittest',
    user_phone_number: '6666666666',
    event_name: 'StandUp',
    event_location: 'Codefellows',
    event_description: 'test test test',
    event_time: Date.now(),
    invitees: [
      {
        name: 'atest1',
        phone_number: '+12111111111',
        confirmed: false
      },
        {
        name: 'atest2',
        phone_number: '+13222222222',
        confirmed: false
      },
        {
        name: 'atest3',
        phone_number: '+14333333333',
        confirmed: false
      }
    ]}
    )
  .end(function() {
    console.log('add start event')
    done();
  })
});

describe('Crud Events', function() {
  it('should be able to create a user and assign jwt', function(done) {
    chai.request('http://localhost:3000')
    .post('/login/newUser')
    .send(
      {
        name: 'testman',
        phone_number: '9999999999',
        password: 'testpass'
      }
    )
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body).to.have.property('jwt');
      jwt = res.body.jwt;
      done();
    });
  });

  it('should be able to get new jwt for user', function(done) {
    chai.request('http://localhost:3000')
    .post('/login')
    .send({
      phone_number: '9999999999',
      password: 'testpass'
    })
    .end(function(err, res) {
      expect(res.body).to.have.property('jwt');
      jwt = res.body.jwt;
      done();
    });
  });

  it('should be able to create an event', function(done) {
    chai.request('http://localhost:3000')
    .post('/v1/api/newEvent')
    .send(
      {
        jwt: jwt,
        owner_name:'test',
        user_phone_number: '5555555555',
        event_name: 'Code Party',
        event_location: 'TESTLOCATION',
        event_description: 'example example',
        event_time: Date.now(),
        invitees: [
          {
            name: 'test1',
            phone_number: '+11111111111',
            confirmed: false
          },
            {
            name: 'test2',
            phone_number: '+12222222222',
            confirmed: false
          },
            {
            name: 'test3',
            phone_number: '+13333333333',
            confirmed: false
          }
        ]}
        )
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.event_name).to.eql('Code Party');
      expect(res.body).to.have.property('_id');
      expect(res.body).to.have.property('event_id');
      expect(/^[a-z]{5}[0-9]{2}$/.test(res.body.event_id)).to.be.true;
      event_id = res.body.event_id;
      done();
    });
  });

  it('should be able to view all events', function(done) {
    chai.request('http://localhost:3000')
    .get('/v1/api/event?jwt=' + jwt)
    .end(function(err, res) {
      expect(err).to.eql(null);
      // expect(res.body.length).to.eql(2);
      done();
    });
  });

  it('should be able to view single event', function(done){
    chai.request('http://localhost:3000')
    .get('/v1/api/event/' + event_id +'?jwt=' + jwt)    .end(function(err, res){
      expect(err).to.eql(null);
      expect(res.body.user_phone_number).to.eql('5555555555');
      done();
    });
  });

  it('should update event parameter', function(done) {
    chai.request('http://localhost:3000')
    .put('/v1/api/event/put')
    .send({jwt:jwt,
          event_id: event_id,
          change: {
            event_name:'fun time'
          }})
    .end(function(err, res) {
      expect(err).to.eql.null;
      expect(res.body.event_name).to.eql('fun time');
      done();
    });
  });

  it('should update database with info from text', function(done) {
    chai.request('http://localhost:3000')
    .post('/api/event/confirm')
    .send({Body: event_id + ' Y',From:'+12222222222'})
    .end(function(err, res) {
      expect(err).to.eql.null;
      expect(res.body).to.have.property('msg');
      expect(res.body.msg).to.eql('sms sent');
      done();
    });
  });

  it('should be able to destroy an event', function(done) {
    chai.request('http://localhost:3000')
    .delete('/v1/api/event/delete')
    .send({jwt:jwt})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.msg).to.eql('event deleted');
      Event.find({}, function(err, data) {
        expect(data).to.eql.null;
      });
      done();
    });
  });

  it('should be able to destroy all events', function(done) {
    chai.request('http://localhost:3000')
    .delete('/v1/api/event/delete/ALL')
    .send({jwt:jwt})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.msg).to.eql('all events deleted');
      Event.find({}, function(err, data) {
        expect(data).to.eql.null;
      });
      done();
    });
  });

  it('should delete user', function(done) {
    chai.request('http://localhost:3000')
    .delete('/user/delete')
    .send({
      jwt: jwt,
      name: 'testman'
    })
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body).to.have.property('msg');
      expect(res.body.msg).to.eql('user deleted');
      User.find({name:'testuser'}, function(err, data) {
        expect(data).to.eql([]);
      });
      done();
    });
  });

  it('should not be able to create a user with a password that is too short', function (done) {
    chai.request('http://localhost:3000')
    .post('/login/newUser')
    .send({name: "Test", phone_number: "5553334444", password: "I"})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.status).to.be.equal(500);
      done();
    });
  });

  it('should block invalid password', function(done){
    chai.request('http://localhost:3000')
    .post('/login')
    .send({phone_number: "7032411210", password: "badhacker"})
    .end(function(err, res){
      expect(err).to.eql(null);
      expect(res.status).to.be.eql(404);
      done();
    });
  });
});
