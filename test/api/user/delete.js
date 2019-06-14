// process.env.NODE_ENV = "test";
// const expect = require("chai").expect;
// const request = require("supertest");
// const conn = require("../../../index");
// const app = require("../../../app");
// const mongoose = require("mongoose");
// const TestUtil = require("../../../api/TestUtility/TestUtil");

// describe("Delete /user", () => {
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

//   //-------- Deletes User --------

  
// //---------- Deletes a user ---------  if correct returns 200 (OK)
//   it("OK - Deletes a user", done => {
//   TestUtil.mockCreateAdmin().then(adminRes => {
//       TestUtil.mockLoginAsAdmin().then(loginRes => {
//           TestUtil.mockCreateUser("notAdminUser@live.dk","ztt53tzg")
//           .set("authorization", "Bearer " + loginRes.body.token)
//           .then(userRes => {
//             request(app).get("/user")
//             .set("authorization", "Bearer " + loginRes.body.token)
//             .then(userListRes => {
//                 const userId = userListRes.body.user[1]._id;
//                 request(app).delete("/user/" + userId)
//                 .set("authorization", "Bearer " + loginRes.body.token)
//                 .then(deletedRes => {
//                     expect(deletedRes.status).to.equal(200);
//                     done();
//                     TestUtil.resetMockedData();
//                 }).catch(err => done(err))
//             })
//           })
//       })
//   })
// });
// });
