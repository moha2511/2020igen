// process.env.NODE_ENV = "test";
// const expect = require("chai").expect;
// const request = require("supertest");
// const conn = require("../../../index");
// const app = require("../../../app");
// const mongoose = require("mongoose");
// const TestUtil = require("../../../api/TestUtility/TestUtil");

// describe("GET /event", () => {
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

//   //---------- Retrieving specific user event -----------

//   //---------- Retrieving all events ----------

//   /**
//    * Tests Retrieving of all events when 1 event exist - if test is correct returns event array length of 1
//    */
//   it("OK, Retrieving events has 1 event", done => {
//          TestUtil.init().then(() => {
//           request(app)
//             .get("/event/get/allEvents")
//             .then(res => {
//               const events = res.body;
//               expect(events.length).to.equal(1);
//               TestUtil.resetMockedData();
//               done();
//             })
//             .catch(err => done(err));
//       })
//   });

//   //---------- Retrieving ONE Event ----------

//   /**
//    * Tests Retrieving One event - if test is correct returns object with propery _id name address contactPerson etc.
//    */
//   it("OK, Retrieving ONE Event", done => {
//     TestUtil.mockCreateAdmin().then(userRes => {
//       TestUtil.mockLoginAsAdmin().then(loginRes => {
//         TestUtil.createMockEventWithUserId(loginRes.body.userId).then(
//           eventRes => {
//             request(app)
//               .get("/event/" + eventRes.body.eventCreated._id)
//               .then(res => {
//                 const body = res.body;
//                 expect(body).to.contain.property("_id");
//                 expect(body).to.contain.property("name");
//                 expect(body).to.contain.property("address");
//                 expect(body).to.contain.property("contactPerson");
//                 TestUtil.resetMockedData();
//                 done();
//               })
//               .catch(err => done(err));
//           }
//         );
//       });
//     });
//   });

//   /**
//    * Tests Retrieving One event with bad id - if test is correct returns status code 400 (BAD REQUEST)
//    */
//   it("Fail, Retrieving ONE Event with bad id", done => {
//     TestUtil.createMockEvent().then(res => {
//       request(app)
//         .get("/event/" + "feonjnofr")
//         .then(res => {
//           expect(res.status).to.equal(400);
//           TestUtil.resetMockedData();
//           done();
//         })
//         .catch(err => done(err));
//     });
//   });

//   //---------- Retrieving specific user events----------

//   /**
//    * Test Retriving specific user events  - if test is correct returns status code 200 (OK)
//    */
//   it("OK, Retrieving specific user events", done => {
//     TestUtil.mockCreateAdmin().then(userRes => {
//       TestUtil.mockLoginAsAdmin().then(loginRes => {
//         TestUtil.addMockSpecificUserEvent(loginRes.body.userId).then(() => {
//           request(app)
//             .get(
//               "/event/user/events/" +
//                 loginRes.body.userId +
//                 "?startAmount=0&endAmount=5"
//             )
//             .set("authorization", "Bearer " + loginRes.body.token)
//             .then(res => {
//               const body = res.body;
//               expect(body.events.length).to.equal(1);
//               TestUtil.resetMockedData();
//               done();
//             })
//             .catch(err => done(err));
//         });
//       });
//     });
//   });

//   /**
//    * Test Retriving specific user events with no token - if test is correct returns status code 401 (UNAUTHORIZED)
//    */
//   it("Fail, retrieving specifc user events with no token", done => {
//     TestUtil.mockCreateAdmin().then(res => {
//       TestUtil.addMockSpecificUserEvent("userId").then(() => {
//         request(app)
//           .get("/event/user/events/" + "userId" + "?startAmount=0&endAmount=5")
//           .then(res => {
//             expect(res.status).to.equal(401);
//             TestUtil.resetMockedData();
//             done();
//           })
//           .catch(err => done(err));
//       });
//     });
//   });

//   //---------- Retrieving limited amount of events----------
//   /**
//    * Test retriving limited amount of events - if test is correct arrray length bigger than 0
//    */
//   it("OK, Retrieving limited amount events", done => {
//     TestUtil.mockCreateAdmin().then(userRes => {
//       TestUtil.mockLoginAsAdmin().then(loginRes => {
//         TestUtil.createMockEventWithUserId(loginRes.body.userId).then(
//           eventRes => {
//             request(app)
//               .get("/event/?startAmount=0&endAmount=5")
//               .then(res => {
//                 const body = res.body;
//                 expect(body.events.length).to.equal(1);
//                 TestUtil.resetMockedData();
//                 done();
//               })
//               .catch(err => done(err));
//           }
//         );
//       });
//     });
//   });
// });
