// process.env.NODE_ENV = "test";
// const expect = require("chai").expect;
// const request = require("supertest");
// const conn = require("../../../index");
// const app = require("../../../app");
// const mongoose = require("mongoose");
// const TestUtil = require("../../../api/TestUtility/TestUtil");

// describe("Put /user", () => {
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

//   //-------- Update User --------

//   // ---- Changes Login --------- if correcnt returns statuscode 200 (OK)
//   it("OK - Change Login", done => {
//     TestUtil.mockCreateUser("Mm.mousleh@live.dk", "ztt53tzg").then(res => {
//       TestUtil.mockLoginUser("Mm.mousleh@live.dk", "ztt53tzg").then(
//         loginRes => {
//           request(app)
//             .put("/user/change")
//             .send({ oldPassword: "ztt53tzg", newPassword: "dolce123dg" })
//             .set("authorization", "Bearer " + loginRes.body.token)
//             .then(res => {
//               expect(res.status).to.equal(200);
//               done();
//               TestUtil.resetMockedData();
//             })
//             .catch(err => done(err));
//         }
//       );
//     });
//   });
// //---------- Reseta password of an existing user ---------  if correct returns 200 (OK)
//   it("OK - Reset Password", done => {
//     TestUtil.mockCreateAdmin().then(adminRes => {
//       TestUtil.mockLoginAsAdmin().then(adminLoginRes => {
//         TestUtil.mockCreateUser("Mm.mousleh@live.dk", "ztt53tzg")
//         .set("authorization", "Bearer " + adminLoginRes.body.token)
//         .then(userCrestedRes => {
//               request(app)
//                 .put("/user/resetPassword")
//                 .send({email: "Mm.mousleh@live.dk"})
//                 .set("authorization", "Bearer " + adminLoginRes.body.token)
//                 .then(res => {
//                   expect(res.status).to.equal(200);
//                   done();
//                   TestUtil.resetMockedData();
//                 }).catch(err => done(err));
//             });
//     });
//   });
// });
// });
