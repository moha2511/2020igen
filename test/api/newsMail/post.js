// process.env.NODE_ENV = "test";
// const expect = require("chai").expect;
// const request = require("supertest");
// const conn = require("../../../index");
// const app = require("../../../app");
// const mongoose = require("mongoose");
// const TestUtil = require("../../../api/TestUtility/TestUtil");

// describe("Post /newsMail", () => {
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

//   //-------- Post NewsMail --------

//   //---------- Add newsMail  ---------  if correct returns 200 (OK)
//   it("OK - Adds a newsMail", done => {
//     TestUtil.addMockNewsEmail("someEmail@live.dk")
//       .then(res => {
//         expect(res.status).to.equal(200);
//         done();
//         TestUtil.resetMockedData();
//       })
//       .catch(err => done(err));
//   });

//   //---------- Fails to Add a newsMail with wrong email regex  ---------  if correct returns 400 (BAD REQUEST)
//   it("Fail - Fails to Adds a newsMail", done => {
//     TestUtil.addMockNewsEmail("someEmaillive.dk")
//       .then(res => {
//         expect(res.status).to.equal(400);
//         done();
//         TestUtil.resetMockedData();
//       })
//       .catch(err => done(err));
//   });

//   //---------- Fails to Add a newsMail if email already exists  ---------  if correct returns 400 (BAD REQUEST)
//   it("Fail - Fails to Add a newsMail", done => {
//     const sameEmail = "myEmail@live.dk";
//     TestUtil.addMockNewsEmail(sameEmail).then(() => {
//       TestUtil.addMockNewsEmail(sameEmail)
//         .then(res => {
//           expect(res.status).to.equal(400);
//           done();
//           TestUtil.resetMockedData();
//         })
//         .catch(err => done(err));
//     });
//   });
//   //----------  Unsubscribes a newsMail ---------  if correct returns 200 (OK)

//   it("OK -  Unsubscribes a newsMail", done => {
//     const someEmail = "myEmail@live.dk";
//     TestUtil.addMockNewsEmail(someEmail).then(() => {
//       request(app)
//         .post("/newsMail/unsubscribeMail/")
//         .send({ email: someEmail })
//         .then(res => {
//           expect(res.status).to.equal(200);
//           done();
//           TestUtil.resetMockedData();
//         })
//         .catch(err => done(err));
//     });
//   });

//   //---------- Tries to Unsubscribes a newsMail with wrong email regex ---------  if correct returns 400 (BAD REQUEST)
//   it("FAIL -  Tries to Unsubscribe a newsMail", done => {
//     const someEmail = "myEmail@live.dk";
//     TestUtil.addMockNewsEmail(someEmail).then(() => {
//       request(app)
//         .post("/newsMail/unsubscribeMail/")
//         .send({ email: "myEmaillive.dk" })
//         .then(res => {
//           expect(res.status).to.equal(400);
//           done();
//           TestUtil.resetMockedData();
//         })
//         .catch(err => done(err));
//     });
//   });

//   //---------- Tries to Unsubscribes a newsMail which do not exist ---------  if correct returns 400 (BAD REQUEST)
//   it("FAIL -  Tries to Unsubscribe a newsMail", done => {
//     const someEmail = "myEmail@live.dk";
//     request(app)
//       .post("/newsMail/unsubscribeMail")
//       .send({ email: someEmail })
//       .then(res => {
//         expect(res.status).to.equal(400);
//         done();
//         TestUtil.resetMockedData();
//       })
//       .catch(err => done(err));
//   });
//   //---------- Send news email to all subsribers ---------  if correct returns 200 (OK)
//   it("OK, Sends newsMail to all subbsribers", done => {
//     const sameEmail = "myEmail@live.dk";
//     TestUtil.addMockNewsEmail(sameEmail).then(() => {
//       request(app)
//         .post("/newsMail/sendNewsMail")
//         .send({ text: "Some text", subject: "Some subject" })
//         .then(res => {
//           expect(res.status).to.equal(200);
//           done();
//           TestUtil.resetMockedData();
//         })
//         .catch(err => done(err));
//     });
//   });
//   //---------- Send news email on event updated ---------  if correct returns 200 (OK)
 
//   it("OK, Sends newsMail on event updated", done => {
//     TestUtil.mockCreateAdmin().then(() => {
//       TestUtil.mockLoginAsAdmin().then(loginRes => {
//         TestUtil.createMockEventWithUserId(loginRes.body.userId).then(
//           eventRes => {
//             TestUtil.mockAddAttendee(
//               eventRes.body.eventCreated._id,
//               "m.mousleh@live.dk"
//             ).then(() => {
//               request(app)
//                 .post("/newsMail/eventUpdated")
//                 .send({ id: eventRes.body.eventCreated._id })
//                 .then(res => {
//                   expect(res.status).to.equal(200);
//                   done();
//                   TestUtil.resetMockedData();
//                 })
//                 .catch(err => done(err));
//             });
//           }
//         );
//       });
//     });
//   });
//   //---------- Send news email on event deleted ---------  if correct returns 200 (OK)
//   it("OK, Sends newsMail on event deleted", done => {
//     TestUtil.mockCreateAdmin().then(() => {
//         TestUtil.mockLoginAsAdmin().then(loginRes => {
//           TestUtil.createMockEventWithUserId(loginRes.body.userId).then(
//             eventRes => {
//               TestUtil.mockAddAttendee(
//                 eventRes.body.eventCreated._id,
//                 "mm.mousleh@live.dk"
//               ).then(() => {
//                 request(app)
//                   .post("/newsMail/eventDeleted")
//                   .send({id: eventRes.body.eventCreated._id})
//                   .then(res => {
//                     expect(res.status).to.equal(200);
//                     done();
//                     TestUtil.resetMockedData();
//                   })
//                   .catch(err => done(err));
//               });
//             }
//           );
//         });
//       });
//     });

    
// });
