const nodemailer = require("nodemailer");


/**
 *  Sends an email to all attendees connected to a specifc event
 * @param {A list of attenddes from an event} attendeesList 
 * @param {The event which is now cancelled (Deleted)} currentEvent 
 */
 exports.sendDeleteMail = (attendeesList,currentEvent) => {
    attendeesList.forEach(attendee => {
      sendMail(
        attendee,
        "Et arrangement du er tilmeldt er blevet aflyst 👀",
        "Navn : " +
          currentEvent.name +
          "\n" +
          "Kontakt nummer : " +
          currentEvent.contactPerson.contactPhone +
          "\n" +
          "Addresse : " +
          currentEvent.address.line +
          "\n" +
          "By: " +
          currentEvent.address.city +
          "\n"
      );
    });
  }

   exports.sendMail = (reciverMail, subject, text) => {
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
    });
  }
  /**
   * Validates an email based on regex 
   * @param {The email which will be validated} email 
   */
   exports.validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }