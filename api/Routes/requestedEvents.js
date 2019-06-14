const express = require('express');
const router = express.Router();
const RequestedController = require('../controllers/requestedEvents')
const checkAuth = require('../middleware/check-auth').default;

 router.get('/', checkAuth, RequestedController.getRequestedEvents);
 router.delete('/:event',checkAuth, RequestedController.deleteRequestedEvent);

module.exports = router;