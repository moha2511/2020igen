const Event = require("../model/Event");
const mongoose = require("mongoose");
const User = require("../model/user");
const responseHelper = require('../../HeplerLogic/responses');
const mailHelper = require('../../HeplerLogic/mail');
const eventHelper = require('../../HeplerLogic/event');


/**
 * Publshes an event 
 * It changes the creator id for arranger to a user id
 * Need an event
 */
exports.publishEvent = (req, res) => {
  const event = new Event({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    description: req.body.description,
    cost: req.body.cost,
    ageLimit: req.body.ageLimit,
    theme: req.body.theme,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    imagePath: req.body.imagePath,
    creator: req.body.creator,
    address: req.body.address,
    contactPerson: req.body.contactPerson
  });

  event
    .save()
    .then(event => {
      res.status(200).json({
        eventToPublish: event
      });
    })
    .catch(error => {
      res.status(400).json({
        message: "Could not publish event, please try to refresh the page",
        error: error
      });
    });
};

//Tested //Refactored¨
/**
 * Creates an event in the database
 */
exports.createEvent = (req, res) => {
  const creatorId = req.body.creatorId
  const event = eventHelper.createEventFromRequest(req);

  if (creatorId.match(/^[0-9a-fA-F]{24}$/)) {
    User.findById(creatorId).then(user => {
      if (!user) {
        const requestedEvent = eventHelper.createRequestedEvent(event);
        eventHelper.saveRequestedEvent(res,requestedEvent);
      } else {
        eventHelper.saveEvent(res,event);
      }
    });
  } else {
    const requestedEvent = eventHelper.createRequestedEvent(event);
    eventHelper.saveRequestedEvent(res,requestedEvent);
  }
}

//Tested // Refactored
/**
 * Gets all events from the database
 */
exports.getAllEvents = (req,res) => {
  Event.find()
    .then(events => {
      res.send(events);
    })
    .catch(error => console.log(error));
};

//Tested //Refactored
/**
 * Gets a limited amount of events from the databse 
 * A queery will define the amount of eventes returned
 * Used to filter 5 events at a time
 */
exports.getLimitedAmountOfEvents = (req, res) => {
  const from = +req.query.startAmount;
  const to = +req.query.endAmount;
  let fetchedEvents;
  const eventQuery = Event.find();

  eventQuery
    .then(events => {
      fetchedEvents = eventHelper.getRelevantEvents(events);
      fetchedEvents = eventHelper.getLimitedEvents(fetchedEvents,from,to);
      console.log(fetchedEvents)
      return Event.countDocuments();
    })
    .then(count => {
      res.status(200).json({
        message: "",
        events: fetchedEvents,
        maxEvents: count
      });
    }).catch(error => {
      res.status(400).json({
        message:
          "Noget gik galt prøv igen senere",
          error: error
      });
    });
};

// Not implemented
/**
 * Returns a list  of events based on a theme
 */
exports.getEventByTheme = (req, res) => {
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.page;
  const theme = req.query.theme;
  const eventQuery = Event.find({ theme: theme });
  let fetchedEvents;
  if (pageSize && currentPage) {
    eventQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }

  eventQuery
    .then(documents => {
      fetchedEvents = documents;
      return Event.countDocuments();
    })
    .then(count => {
      res.status(200).json({
        message: "Events Fetched Successfully",
        events: fetchedEvents,
        maxEvents: count
      });
    })
    .catch(error => console.log(error));
};

//Tested  // Refactored
/**
 * Returns one event from the database based on an object id 
 */
exports.getOneEvent = (req, res) => {
  Event.findById(req.params._id)
    .then(event => {
      res.send(event);
    })
    .catch(error => {
      res.status(400).json({
        message: "Noget gik galt prøv igen senere",
      });
      responseHelper.sendMessage(res,400,"Noget gik galt - prøv igen senere")
    });
};
//Tested // Refactored
/**
 * Deletes an event from the database 
 * Needs the obejct id of the event which will be deleted
 */
exports.deleteEvent = (req, res) => {
  let attendees = [];
  let currentEvent = undefined;

  Event.findOne({ _id: req.params._id })
    .then(event => {
      attendees = event.attendees;
      currentEvent = event;

      return Event.deleteOne({ _id: req.params._id });
    })
    .then(result => {
      if (result.n > 0) {
        responseHelper.sendMessage(res,200,"Eventen er nu slettet")
        mailHelper.sendDeleteMail(attendees,currentEvent)
      }
    })
    .catch(error => {
      responseHelper.sendMessage(res,401,"Der gik noget galt - prøv igen senere");
    });
};


/**
 * Updates an existing event 
 * Needs an updated event 
 * Needs the object id of the event to update
 * Needs a creator id so only the creator of an event can update it
 */
exports.updatedEvent = (req, res) => {
  const eventId = req.params._id;
  const creatorId = req.userData.userId;
  const event = req.body;

  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    req.body.imagePath = url + "/images/" + req.file.filename;
  }
  eventHelper.updateOneEvent(eventId, creatorId, event)
    .then(result => {
      if (result.nModified > 0) {
        responseHelper.sendMessage(res, 200, "Eventen er nu opdateret");
      } else {
        responseHelper.sendMessage(res, 400,"Der er ikke ændret noget - være venlig at ændre noget for at opdatere");
      }
    })
    .catch(() => {
      responseHelper.sendMessage(res, 400, "Noget gik galt - prøv igen senere");
    });
};

/**
 * Pushes an attendde to the attenddees list of an event
 * Needs an email 
 * Needs the object id of the event which will be updated
 */
exports.addAttendee = (req, res) => {
  
  if(!mailHelper.validateEmail(req.body.email)) {
    responseHelper.sendMessage(res,400,"Denne Email er ikke gyldig")
  }
  
  if(eventHelper.checkIfAttendeeExists(req.body.id,req.body.email)) {
      responseHelper.sendMessage(res,400,"Du er allerede tilmeldt denne event");

  }
  else {
    eventHelper.addAttendee(req.body.id, req.body.email).then(user => {
      responseHelper.sendMessage(res,200,"Du er nu tilmedt arrangementet");
    }).catch(() => {
     responseHelper.sendMessage(res,500,"Noget gik galt prøv igen senere")
    })
  }
};

//Tested 
/**
 * Returns a list of events based on a creator id 
 * Needs a creator id 
 * A query can define the amount of events which will be returned
 */
exports.getSpecificUserEvents = (req, res) => {
  const startAmount = +req.query.startAmount;
  const endAmount = +req.query.endAmount;
  let fetchedEvents;

  const eventQuery = Event.find({ creator: req.params.userId });

  eventQuery
    .then(events => {
      if (events.length >= 5) {
        fetchedEvents = events.splice(startAmount, endAmount);
      } else {
        fetchedEvents = events;
      }

      res.status(200).json({
        message: "Events Fetched Successfully",
        events: fetchedEvents,
        maxEvents: fetchedEvents
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Noget gik galt prøv igen senere",
        error: error
      });
    });
};


