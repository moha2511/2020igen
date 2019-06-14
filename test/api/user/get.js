// process.env.NODE_ENV = "test";
// const expect = require("chai").expect;
// const request = require("supertest");
// const conn = require("../../../index");
// const app = require("../../../app");
// const mongoose = require("mongoose");
// const TestUtil = require("../../../api/TestUtility/TestUtil");

// describe("GET /user", () => {
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

//   //-------- Get User --------

  
// //---------- Retrives users ---------  if correct returns body length of 1 
//   it("OK - Retieves all users", done => {
//   TestUtil.mockCreateAdmin().then(adminRes => {
//       TestUtil.mockLoginAsAdmin().then(loginRes => {
//           request(app).get("/user")
//          .set("authorization", "Bearer " + loginRes.body.token)
//          .then(res => {
//              expect(res.body.user.length).to.equal(1)
//              done();
//              TestUtil.resetMockedData();
//          }).catch(err => done(err))

//       })
//   })
// });
// });
