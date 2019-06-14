// process.env.NODE_ENV = "test";
// const expect = require("chai").expect;
// const request = require("supertest");
// const conn = require("../../../index");
// const app = require("../../../app");
// const mongoose = require("mongoose");
// const TestUtil = require("../../../api/TestUtility/TestUtil")

// describe("DELETE /event", () => {
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
 

// //--------- Delete events----------
// /**
//  * Deletes an event based on a event id -- if test correct return status code 200 (OK)
//  */
//   it("OK, Deletes One Event", done => {
//         TestUtil.mockCreateAdmin().then(res => {
//           TestUtil.mockLoginAsAdmin().then(resToken => {
//             TestUtil.createMockEventWithUserId(resToken.body.userId).then(res => {
//                 const token = resToken.body.token
//                 const evnetId = res.body.eventCreated._id
//                 request(app).delete('/event/'+ evnetId)
//                 .set("authorization", "Bearer " + token)
//                 .then(res => {
//                     expect(res.status).to.equal(200)
//                     done();
//                     TestUtil.resetMockedData();
//                 }).catch(err => done(err))
//             })
//     })
//         })
       
//   });

//   /**
//  * Tries to Delete an event based on a event id without authentication -- if test correct return status code 401 (unauthorized)
//  */
//   it("Fail, Triesto delete without authentication", done =>  {
//       TestUtil.mockCreateAdmin().then(res => {
//         TestUtil.mockLoginAsAdmin().then(resToken => {
//           TestUtil.createMockEventWithUserId(resToken.body.userId).then(res => {
//               const evnetId = res.body.eventCreated._id
//               request(app).delete('/event/'+ evnetId)
//               .then(res => {
//                   expect(res.status).to.equal(401)
//                   done();
//                   TestUtil.resetMockedData();
//               }).catch(err => done(err))
//           })
//   })
// })
//   });
// });

