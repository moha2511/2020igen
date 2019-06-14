//process.env.NODE_ENV = 'test'
//const expect = require("chai").expect;
//const request = require("supertest");
//const conn = require("../../../index");
//const app = require("../../../app");
//const mongoose = require('mongoose');
//const TestUtil = require("../../../api/TestUtility/TestUtil");
//
//
//describe("POST /event", () => {
//    
//  before(done => {
//    conn
//      .connect()
//      .then(() => done())
//      .catch(err => done(err));
//  })
//
//  after(done => {
//    conn
//      .close()
//      .then(() => done())
//      .catch(err => done(err));
//  });
//
////---------- Creting event ----------
//
///**
// * Tests creation of event - if test is correct returns 201
// */
//  it("OK, createing a new event works", done => {
//    TestUtil.mockCreateAdmin().then(res => {
//    TestUtil.mockLoginAsAdmin().then(resLogin => {
//    TestUtil.createMockEventWithUserId(resLogin.body.userId)
//        .then(res => {
//            expect(res.status).to.equal(201)
//            TestUtil.resetMockedData();
//            done();
//        }).catch(err => done(err))
//    })
//    })
//   
//  })
///**
// * Tests if wrong data send when crating event will fail - if test is correct and returns 400
// */
//  it("Fail, event requires name", done => {
//    TestUtil.mockCreateAdmin().then(res => {
//        TestUtil.mockLoginAsAdmin().then(resLogin => {
//        TestUtil.createMockEventWithUserId(resLogin.body.userId)
//             .then(res => {
//                const event = res.body.eventCreated;
//                event.name = undefined;
//                request(app).post('/event/').send(event)
//                .then(res => {
//                    expect(res.status).to.equal(500)
//                    TestUtil.resetMockedData();
//                    done();
//                }).catch(err => done(err))  
//            })
//        })
//        })
//  })
//
//  // ---------- Requesting event to administrators --------------
//
///**
// * Tests requesting an event works - if test is correct returns 201
// */
//  it("OK, requesting a new event works", done => {
//    TestUtil.mockCreateAdmin().then(res => {
//    TestUtil.createMockEventWithUserId("arranger")
//    .then(res => {
//        expect(res.status).to.equal(201)
//        TestUtil.resetMockedData();
//        done();
//    }).catch(err => done(err))
//})
//  })
//
//  // ---------- Adding attendee to event ----------
//
//  /**
//   * Test if adding attendee to event works - if test is correct returns 200
//   */
//  it("OK, adding an attendee", done => {
//   TestUtil.mockCreateAdmin().then(res => {
//    TestUtil.mockLoginAsAdmin().then(resLogin => {
//    TestUtil.createMockEventWithUserId(resLogin.body.userId).then(eventRes => {
//        const eventId = eventRes.body.eventCreated._id
//        TestUtil.mockAddAttendee(eventId,"someEmail@live.dk")
//        .then(res => {
//          expect(res.status).to.equal(200)
//          TestUtil.resetMockedData();
//          done();
//        })
//        .catch(err => done(err));
//        })
//    })
//})
//})
//    
//  /**
//   * Test if adding attendee to event with wrong data fails - if test is correct returns 500
//   */
//  it("Fail, adding attendee to event requries valid  email", done => {
//    TestUtil.mockCreateAdmin().then(res => {
//        TestUtil.mockLoginAsAdmin().then(resLogin => {
//        TestUtil.createMockEventWithUserId(resLogin.body.userId).then(eventRes => {
//            const eventId = eventRes.body.eventCreated._id
//            TestUtil.mockAddAttendee(eventId,undefined)
//            .then(res => {
//              expect(res.status).to.equal(400)
//              TestUtil.resetMockedData();
//              done();
//            })
//            .catch(err => done(err));
//            })
//        })
//    })
//})
//
//})
//