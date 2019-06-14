const mongoose = require("mongoose");
const NewsMail = require("../model/NewsMail");
const nodemailer = require("nodemailer");
const Event = require('../model/Event');

//Tested //Refactored
/**
 * Adds a news mail to the database 
 * Needs an email
 */
exports.addNewsMail = (req,res,next) => {

    if(!validateEmail(req.body.email)){
         sendMessage(res,400,"Denne email er ugyldig");
    }
    const newsMail = new NewsMail({
        email: req.body.email
    });

    NewsMail.findOne({email:req.body.email})
    .then(email => {
        if(email){
            sendMessage(res,400,"Du er allerede tilmedt nyhedsbrevet ")
        }else
        newsMail.save()
        .then(() => {
            sendMessage(res,200,"Du er nu tilmeldt nyhedsbrevet");
        })
    }).catch(() => {
        sendMessage(res,500,"Noget gik galt prøv igen senere")
    })
}

// Tested // Refactored
/**
 * Deletes a news mail from the database 
 * Needs an email
 */
exports.unsubscribeMail = (req,res,next) => {
    if(!validateEmail(req.body.email)){
        sendMessage(res,400,"Denne email er ugyldig");
   }
    NewsMail.deleteOne({email: req.body.email})
    .then(result => {
        if(result.n > 0){
            sendMessage(res,200,"Du er nu afmeldt Nyhedsbrevet")
        }else{
            sendMessage(res,400,"Du er ikke tilmeldt nyhedsbrevet");
        }
    }).catch(() => {
        sendMessage(res,500,"Noget gik galt prøv igen senere");
    })
}

//Tested //Refactored
/**
 * Sends a news mail to all subsribers
 * Needs a subject 
 * Needs a text
 */
exports.sendNewsMailToAll = (req, res, next) => {
    NewsMail.find()
    .then(allMails => {
        allMails.forEach(newsMail => {
            sendMail(newsMail.email,req.body.subject,req.body.text)
        });
        sendMessage(res,200,"Nyhedsbrevet er nu sendt til alle tilmeldte");
    })
    .catch(() => {
        sendMessage(res,500,"Noget gik galt prøv igen senere");
    })

}

// Tested // Refactored
/**
 * Sends an news mail to all subsribers for a specific event when event is updated 
 * Needs an event id
 */
exports.newsOnEventUpdate = (req,res,next) => {

    Event.findById(req.body.id)
    .then(event => {
        event.attendees.forEach(attendee => {
            sendMail(attendee,"En event du er tilmeldt er blevet opdateret 👀",
            "Navn : " + event.name + "\n" +
            "start tid : " + event.startTime + "\n" +
            "slut tid : " + event.endTime + "\n" +
            "Pris : " + event.cost + "\n" +
            "Kontakt nummer : " + event.contactPerson.contactPhone + "\n" +
            "Addresse : " + event.address.line + "\n" +
            "By: " + event.address.city + "\n");
        })
        res.status(200).json({});
    }).catch(() => {
        sendMessage(res, 500,"Notifikations email ikke sendt til deltagere");
    })
}
// Tested // Refactored
/**
 * Sends a news mail to all subsribers when event is delected (cancelled)
 * Needs an event id
 */
exports.newOnEventDelete = (req,res,next) => {

    console.log(req.body.id)
    Event.findById(req.body.id)
    .then(event => {
        console.log(event)
        event.attendees.forEach(attendee => {
            console.log(attendee)
            sendMail(attendee,"En event du er tilmeldt er blevet aflyst 👀",
            "Navn : " + event.name + "\n" +
            "Kontakt nummer : " + event.contactPerson.contactPhone + "\n" +
            "Addresse : " + event.address.line + "\n" +
            "By: " + event.address.city + "\n");
        })
        res.status(200).json({});
    }).catch(() => {
        sendMessage(res, 500,"Notifikations email ikke sendt deltagere");
    })
}


function sendMail(reciverMail, subject, text) {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "2020genforeningen@gmail.com",
        pass: "ztt53tzg"
      }
    });
  
    transporter.sendMail({
      from: '"2020genforeningen@gmail.com', // sender address
      to: reciverMail,
      subject: subject, // Subject line
      text: text
    }).then().catch(err => console.log(err));
  }

function sendMessage(res, statusCode, message) {
    return res.status(statusCode).json({
      message: message
    });
  }

  function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  