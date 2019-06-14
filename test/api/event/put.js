//process.env.NODE_ENV = "test";
//const expect = require("chai").expect;
//const conn = require("../../../index");
//const TestUtil = require("../../../api/TestUtility/TestUtil");
//
//describe("PUT /event", () => {
//  before(done => {
//    conn
//      .connect()
//      .then(() => done())
//      .catch(err => done(err));
//  });
//
//  after(done => {
//    conn
//      .close()
//      .then(() => done())
//      .catch(err => done(err));
//  });
//
//  ---------- Update event----------
//
//  /**
//   * Updates an Event - if test is correct returns status code 200
//   */
//  it("OK - Update an event", done => {
//    TestUtil.mockCreateAdmin().then(() => {
//      TestUtil.mockLoginAsAdmin().then(resToken => {
//        const userId = resToken.body.userId;
//        TestUtil.createMockEventWithUserId(userId).then(eventRes => {
//          const updatedEvent = { ...eventRes.body.eventCreated };
//          const token = resToken.body.token;
//          updatedEvent.name = "new event name";
//          TestUtil.updateMockEvent(updatedEvent)
//            .set("authorization", "Bearer " + token)
//            .then(res => {
//              expect(res.status).to.equal(200);
//              done();
//              TestUtil.resetMockedData();
//            })
//            .catch(err => done(err));
//        });
//      });
//    });
//  });
//
//  /**
//   * Tires to Update an Event with no Token - if test is correct returns status code 500 (Internal server error)
//   */
//  it("Fail - Tries to update an event with no authentication", done => {
//    TestUtil.mockCreateAdmin().then(() => {
//      TestUtil.mockLoginAsAdmin().then(resToken => {
//        const userId = resToken.body.userId;
//        TestUtil.createMockEventWithUserId(userId).then(eventRes => {
//          const updatedEvent = { ...eventRes.body.eventCreated };
//          updatedEvent.name = "new event name";
//          TestUtil.updateMockEvent(updatedEvent)
//            .then(res => {
//              expect(res.status).to.equal(401);
//              done();
//            })
//            .catch(err => done(err));
//        });
//      });
//    });
//  });
//});
//