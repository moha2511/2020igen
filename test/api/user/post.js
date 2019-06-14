// process.env.NODE_ENV = "test";
// const expect = require("chai").expect;
// const request = require("supertest");
// const conn = require("../../../index");
// const app = require("../../../app");
// const mongoose = require("mongoose");
// const TestUtil = require("../../../api/TestUtility/TestUtil");

// describe("Post /user", () => {
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

//   //---------- Post User----------
//   /**
//    * Tests if an Admin can create a user - if correct returns 201 (Created)
//    */
//   it("OK - Signup a user", done => {
//     TestUtil.init().then(initRes => {
//       const token = initRes.loginData.token;
//           TestUtil.mockCreateUser("newUser@email.com", "newUserPassword")
//             .set("authorization", "Bearer " + token)
//             .then(res => {
//               expect(res.status).to.equal(201);
//               done();
//               TestUtil.resetMockedData();
//             })
//             .catch(err => done(err));
//     });
//   });

//     //---------- Post User----------
//   /**
//    * Tests if an Admin can create a user without logging in - if correct returns 401 (Unauthorized)
//    */
//   it("FAIL - Signup a user without logging in", done => {
  
//     TestUtil.mockCreateAdmin().then(adminRes => {
//      TestUtil.mockCreateUser("someEmail@live.dk", "dhkefeof")
//      .then(res => {
//        expect(res.status).to.equal(401); 
//        done(); 
//        TestUtil.resetMockedData();
//      }).catch(err => done(err))
//     })

//   });

//   //---------- Post User----------
//   /**
//    * Tests if a (Admin) can create a user - if correct returns 201 (Created)
//    */
//   it("OK - Login a user", done => {
//     TestUtil.mockCreateAdmin().then(res => {
//       TestUtil.mockLoginAsAdmin()
//         .then(res => {
//           expect(res.status).to.equal(200);
//           done();
//           TestUtil.resetMockedData();
//         })
//         .catch(err => done(err));
//     });
//   });
// });
