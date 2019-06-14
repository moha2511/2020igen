const express = require("express");
const router = express.Router();
const multer = require("multer");
const checkAuth = require("../middleware/check-auth").default;
const EventController = require("../controllers/event");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./images/");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage }).single("imagePath");



router.post("/publish", EventController.publishEvent);

router.post("/", upload, EventController.createEvent );

router.get("/", EventController.getLimitedAmountOfEvents);

router.get("/theme", EventController.getEventByTheme);

router.get("/:_id", EventController.getOneEvent);

router.put("/:_id",checkAuth, upload, EventController.updatedEvent);

router.delete("/:_id", checkAuth, EventController.deleteEvent);

router.get("/user/events/:userId",checkAuth, EventController.getSpecificUserEvents)

router.post("/addAttendee",EventController.addAttendee)

router.get('/get/allEvents',EventController.getAllEvents);

module.exports = router;


