const Event = require("../api/model/Event");
const mongoose = require("mongoose");
const RequestedEvent = require("../api/model/RequestedEvents");
const responseHelper = require('./responses');

/**
 * Returns a promise made from calling a mongoose query 
 * Query is an updateOne() on the event schema
 * @param {The event id of the event which an attendee should be added to} eventId 
 * @param {The email of the ateendee} email 
 */
exports.addAttendee = (eventId,email) => {
    return Event.updateOne(
      { _id: eventId },
      { $push: { attendees: email } }
    );
  }

  /**
   * Checks if an attendee already exists
   * Returns a boolean based on findOne query
   * @param {The event id which will be checked} eventId 
   * @param {The email of the attendee} email 
   */
  exports.checkIfAttendeeExists = (eventId, email) => {
    Event.findOne({ _id: eventId})
    .then(event => {
      event.attendees.forEach(attendee => {
        if (attendee === email) {
          return true;
        }
        return false;
      })
  }).catch(err => console.log(err))
  }
  /**
   * Returns a list of events filtered by creator id and end date of the event 
   * @param {List of events} events 
   */
  exports.getRelevantEvents = (events) =>{
   let relevantEvents = [];
    events.filter(event => {
      if (event.creator !== "arranger" && new Date(event.endTime) > new Date()) 
      {
        relevantEvents.push(event);
      }
  })
  return relevantEvents;
  }
  /**
   * Splices a list of event based on a from and to index
   * @param {An event list which will be spliced} events 
   * @param {The start index of the splice} from 
   * @param {The end index of the splice} to 
   */
  exports.getLimitedEvents = (events,from,to) => {
    if (events.length >= 5) {
      events = events.splice(from, to);
    }
    return events;
  }
  
  /**
   * Saves a requested event to the database
   * @param {Http Response} response 
   * @param {A requsted event} requstedEvent 
   */
   exports.saveRequestedEvent = (response, requstedEvent) => {
    
    requstedEvent
      .save()
      .then(() => {
        responseHelper.sendMessage(response,201, "Du vil få besked på email om eventen bliver accepteret eller afvist")
      })
      .catch(() => {
        sendMessage(response,400,"Noget gik galt prøv igen senere")
      });
  }
  
  /**
   * Takes an event and returns a requested event by manipulating the data of the event
   * @param {A event based on the Event schema} event 
   */
  exports.createRequestedEvent = (event) => {
    event.creator = "arranger";
    const requestedEvent = new RequestedEvent({
      _id: new mongoose.Types.ObjectId(),
      reqEvent: event
    });
    return requestedEvent;
  }
  
  /**
   * Takes the http requests body data and uses it to create an event
   * @param {A HTTP request} req 
   */
  exports.createEventFromRequest = (req) => {
    const url = req.protocol + "://" + req.get("host");
    let creatorId = req.body.creatorId;
  
    const event = new Event({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      description: req.body.description,
      cost: req.body.cost,
      ageLimit: req.body.ageLimit,
      theme: req.body.theme,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      imagePath: url + "/images/" + req.file.filename,
      creator: creatorId,
      address: {
        _id: new mongoose.Types.ObjectId(),
        city: req.body.city,
        zipCode: req.body.zipCode,
        line: req.body.line
      },
      contactPerson: {
        _id: new mongoose.Types.ObjectId(),
        contactEmail: req.body.contactEmail,
        contactPhone: req.body.contactPhone,
        contactName: req.body.contactName
      }
    });
  return event;
  }
  /**
   * Saves an event to the database 
   * @param {An HTTP response} res 
   * @param {An event based on the event schema} event 
   */
   exports.saveEvent = (res,event) => {
    event
    .save()
    .then(event => {
      res.status(201).json({
        message: "EVENTEN ER NU OPRETTET 🎉🎉",
        eventCreated: event
      });
    })
    .catch(error => {
        responseHelper.sendMessage(res,400,"Noget gik galt prøv ige senere")
    });
  }

  
/**
 * Returns a promise made from a Mongoose query 
 * The promise returns from an updateOne on the event schema
 * @param {The event id of the event you want to query} eventId 
 * @param {The creator id of the event you want to query} creatorId 
 * @param {The update event to replace with the old event} updatedEvent 
 */
exports.updateOneEvent = (eventId, creatorId, updatedEvent) => {
    return Event.updateOne({ _id: eventId, creator: creatorId }, updatedEvent);
  }