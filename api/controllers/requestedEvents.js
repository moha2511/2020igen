const Event = require("../model/Event");
const RequestedEvent = require("../model/RequestedEvents");

/**
 * Gets a list of requeted events
 */
exports.getRequestedEvents =  (req, res, next) => {
    const startAmount = +req.query.startAmount;
    const endAmount = +req.query.endAmount;
    const eventQuery = RequestedEvent.find({},{reqEvent:1, _id:1});

    let requestedEventsList = []; 

    eventQuery.then(requestedEvents => {
        requestedEvents.forEach(requestedEvent => {
            requestedEventsList.push(requestedEvent.reqEvent);
        });

        if(requestedEventsList.length >= 5){
            requestedEventsList = requestedEventsList.splice(startAmount,endAmount);
             }

             res.status(200).json({
                message: "Requsted Events Fetched Successfully",
                events: requestedEventsList,
                maxEvents: requestedEventsList.length
            });

    }).catch(error => {
            res.status(400).json({
                message: 'Something Went Wrong Trying To Fetch The Requsted Events',
                error: error
            });
        })
 };

/**
 * Gets one specfic requested event 
 * Not implmented!
 */
exports.getOneRequestedEvent =  (req, res, next) => {

    Event.findById(req.params._id)
        .then(result => {
            res.send(result.name)
        })
        .catch(error => console.log(error))
};

/**
 * Deletes a specifc requested event 
 * Needs requetsed event object id
 */
exports.deleteRequestedEvent = (req,res,next) => {
    let eventToDelete
    RequestedEvent.find().then(result => {
        result.forEach(element => {
            if(element.reqEvent._id == req.params.event._id){
                eventToDelete = element.reqEvent;
            }
        });

    RequestedEvent.deleteOne(eventToDelete).then(result => res.send(result)).catch(error => res.send(error));
    }).catch(error => res.send(error))
};

