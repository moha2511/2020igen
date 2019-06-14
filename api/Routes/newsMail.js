const express = require("express");
const router = express.Router();
const NewsMailController = require('../controllers/newsMail');

router.post('/',NewsMailController.addNewsMail);
router.post('/sendNewsMail',NewsMailController.sendNewsMailToAll);
router.post('/unsubscribeMail',NewsMailController.unsubscribeMail);
router.post('/eventUpdated', NewsMailController.newsOnEventUpdate);
router.post('/eventDeleted',NewsMailController.newOnEventDelete)

module.exports = router;