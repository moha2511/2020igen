// process.env.NODE_ENV = "test";
// const expect = require("chai").expect;
// const request = require("supertest");
// const conn = require("../../../index");
// const app = require("../../../app");
// const mongoose = require("mongoose");
// const TestUtil = require("../../../api/TestUtility/TestUtil");

// describe("GET /requestedEvent", () => {
//   before(done => {
//     conn
//       .connect()
//       .then(() => done())
//       .catch(err => done(err));
//   });

//   after(done => {
//     conn
//       .close()
//       .then(() => done())
//       .catch(err => done(err));
//   });


//   //---------- Retrieving all requstedEvents ----------

//   /**
//    * Tests Retrieving of all requsted events where list body length is 1- if test is correct returns event array length of 1
//    */
//   it("OK, Retrieving requsted events", done => {
//     TestUtil.createMockEvent().then(res => {
//         TestUtil.mockCreateAdmin().then(() => {
//             TestUtil.mockLoginAsAdmin().then(loginRes => {
//                 request(app).get("/requestedEvents/" + "?startAmount=0&endAmount=5")
//                 .set("authorization", "Bearer " + loginRes.body.token)
//                 .then(res => {
//                     const requestedEvents = res.body.events;
//                     expect(requestedEvents.length).to.equal(1); 
//                     done();
//                     TestUtil.resetMockedData();
//                 }).catch(err => done(err))
//             })
//         })
//     })
//  })  
// /**
//    * Tests Retrieving of all requsted events using query where list body is equal to 5 
//    * Query == ?startAmount=0&endAmount=5"
//    * - if test is correct returns event array length  equal to 5
//    */
//  it("OK, Retrieving requsted events with 5 events", done => {

//         TestUtil.mockEventsList();
//         TestUtil.mockCreateAdmin().then(() => {
//             TestUtil.mockLoginAsAdmin().then(loginRes => {
//                 request(app).get("/requestedEvents/" + "?startAmount=0&endAmount=5")
//                 .set("authorization", "Bearer " + loginRes.body.token)
//                 .then(res => {
//                     const requestedEvents = res.body.events;
//                     expect(requestedEvents.length).to.equal(5)
//                     done();
//                     TestUtil.resetMockedData();
//                 }).catch(err => done(err))
//             })
//         })
//     })
// });
