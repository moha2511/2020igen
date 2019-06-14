const request = require("supertest");
const app = require('../../app')
const mongoose = require("mongoose");
const MockGoose = require("mockgoose").Mockgoose;
const mockgoose = new MockGoose(mongoose);

module.exports =  {

  getAdminLogin: function() {
    return {email: "m.mousleh@live.dk",password:"ztt53tzg"}
  },

  /**
   * Creates a mocked event 
   * Returns http request
   */
     createMockEvent: function(){
        return request(app)
          .post("/event/")
          .field("name", "Light House")
          .field("description", "some description")
          .field("theme", "Party")
          .field("ageLimit", 20)
          .field(
            "startTime",
            "Fri Jun 21 2019 00:57:57 GMT+0200 (Central European Summer Time)"
          )
          .field(
            "endTime",
            "Sun Jun 30 2019 00:57:57 GMT+0200 (Central European Summer Time)"
          )
          .field("cost", 20)
          .field("line", "agtoftsvej 31")
          .field("zipCode", 6400)
          .field("city", "Sønderborg")
          .field("creatorId", "someCreatorId")
          .field("contactName", "Mohammed")
          .field("contactPhone", "21323243")
          .field("contactEmail", "m.mousleh@live.dk")
          .attach(
            "imagePath",
            "C:/Users/ASUS/node-rest-event/images/flower.jpg",
            "flower.jpg"
          );
      },
      
      /** 
       * Create a mocked specdifc user event
       * Returns an http request
       * @param {A user id of an event} userId 
       */
       addMockSpecificUserEvent: function(userId) {
        return request(app)
          .post("/event/")
          .field("name", "Light House")
          .field("description", "some description")
          .field("theme", "Party")
          .field("ageLimit", 20)
          .field(
            "startTime",
            "Fri Jun 21 2019 00:57:57 GMT+0200 (Central European Summer Time)"
          )
          .field(
            "endTime",
            "Sun Jun 30 2019 00:57:57 GMT+0200 (Central European Summer Time)"
          )
          .field("cost", 20)
          .field("line", "agtoftsvej 31")
          .field("zipCode", 6400)
          .field("city", "Sønderborg")
          .field("creatorId", userId)
          .field("contactName", "Mohammed")
          .field("contactPhone", "21323243")
          .field("contactEmail", "m.mousleh@live.dk")
          .attach(
            "imagePath",
            "C:/Users/ASUS/node-rest-event/images/flower.jpg",
            "flower.jpg"
          );
      },

      /**
       * Updates a mocked event
       * @param {An event of type event model (schema)} event 
       */
      updateMockEvent: function(event){
        return request(app).put("/event/"+ event._id).send(event);
      },
      
      /**
       * Creates a mocked user 
       * Returns a http request
       */
       mockCreateUser: function(email, password) {
        return request(app)
          .post("/user/signup")
          .send({ email: email, password: password });
      },
      
      /**
       * Mocks login of user
       * @param {Email of user} email 
       * @param {Password of user} password 
       */
       mockLoginUser: function(email, password) {
        return request(app)
          .post("/user/login")
          .send({ email: email, password: password });
      },
      
      
       mockAuthorization: function(email, password) {
        addMockCreateUser(email, password).then(res => {
          mockLoginUser(email, password).then(res => {
            return res.body;
          });
        });
      },

      /** 
       * Create a mocked specdifc user event
       * Returns an http request
       * @param {A user id of an event} userId 
       */
      createMockEventWithUserId: function(userId){
        return request(app)
        .post("/event/")
        .field("name", "Light House")
        .field("description", "some description")
        .field("theme", "Party")
        .field("ageLimit", 20)
        .field(
          "startTime",
          "Fri Jun 21 2019 00:57:57 GMT+0200 (Central European Summer Time)"
        )
        .field(
          "endTime",
          "Sun Jun 30 2019 00:57:57 GMT+0200 (Central European Summer Time)"
        )
        .field("cost", 20)
        .field("line", "agtoftsvej 31")
        .field("zipCode", 6400)
        .field("city", "Sønderborg")
        .field("creatorId", userId)
        .field("contactName", "Mohammed")
        .field("contactPhone", "21323243")
        .field("contactEmail", "m.mousleh@live.dk")
        .attach(
          "imagePath",
          "C:/Users/ASUS/node-rest-event/images/flower.jpg",
          "flower.jpg"
        );
      },
      /**
       * Mocks logining in as an admin
       */
      mockLoginAsAdmin: function(){
        
        return request(app)
          .post("/user/login")
          .send({ email: 'm.mousleh@live.dk', password: "ztt53tzg"});
      },
      /**
       * Mock creation of an admin
       */
      mockCreateAdmin: function() {
        return request(app)
          .post("/user/signup")
          .send({ email: "m.mousleh@live.dk", password: "ztt53tzg"});
      },

      /**
       * Deletes all mocked data
       */
      resetMockedData: function(){
        mockgoose.helper.reset();
      },
     /**
       * Adding an attende to a mocked event
       * @param {Event id where attendde needs to be added} eventId 
       * @param {Email of the attendee} email 
       */
      mockAddAttendee: function(eventId, email){
        return request(app).post("/event/addAttendee")
    .send({id: eventId, email:email})
      }, 
      /**
       * Adds a news mail to a the mocked database
       * @param {Email of the subsriber} email 
       */
      addMockNewsEmail: function(email){
        return request(app).post("/newsMail/")
        .send({email: email})
      }, 
      /**
       * Adds 9 mocked events to the mocked dataabse 
       * 
       */
      mockEventsList: function() {
        for(var i = 0; i < 10; i++) {
          this.createMockEvent().then(() => {

          })
        }
      },

      /**
       * Creates some data into the mocked database 
       * Admin is created
       * Admin is logged in 
       * Requested event created
       * Publsihed event cretaed
       */
      init: async function() {
        var adminRes = await this.mockCreateAdmin();
        var loginRes = await this.mockLoginAsAdmin(); 
        var eventRes = await this.createMockEvent(); 
        var userEventRes = await this.createMockEventWithUserId(loginRes.body.userId); 

         return Promise.resolve({
          adminData: adminRes.body,
          loginData: loginRes.body,
          eventData: eventRes.body, 
          userEventData: userEventRes.body
          });
      }
}

