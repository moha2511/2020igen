const User = require("../model/user");
const bcrypt = require("bcryptjs");
const token = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const emailHelper = require("../../HeplerLogic/mail");
const responseHelper = require("../../HeplerLogic/responses");
const userHelper = require("../../HeplerLogic/user")

/**
 * Sends a news mail when event is declined for arrangers
 */
exports.sendDeclineMail = (req, res, next) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "2020genforeningen@gmail.com",
      pass: "ztt53tzg"
    }
  });

  transporter
    .sendMail({
      from: '"2020genforeningen@gmail.com', // sender address
      to: req.body.email,
      subject:
        "Dit ansøgte arrangement  " + req.body.eventName + "  blev afvist 😩😩", // Subject line
      text:
        "Hej " +
        req.body.personName +
        "😁😄." +
        "\n" +
        "Dit arrangement blev afvist fordi : \n" +
        req.body.reason +
        " \n" +
        "Prøv at sende det samme arrangement ind med de påpejde rettelser \n" +
        "Med Venlig Hilsen 2020 Genforeningen - Sønderborg Kommune ✌🤞" // plain text body
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => console.log(err));
};

/**
 * Sends news mail when event is published for arranger
 */
exports.sendPublishedMail = (req, res, next) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "2020genforeningen@gmail.com",
      pass: "ztt53tzg"
    }
  });

  transporter
    .sendMail({
      from: '"2020genforeningen@gmail.com', // sender address
      to: req.body.email,
      subject:
        "Dit ansøgte arrangement  " +
        req.body.eventName +
        "  blev accepteret 🎉🎉", // Subject line
      text:
        "Hej " +
        req.body.personName +
        "😁😄." +
        "\n" +
        "Dit arrangement blev Accepteret \n" +
        "Gå ind på vores hjemmeside for at finde arrangementet \n" +
        "Med Venlig Hilsen 2020 Genforeningen - Sønderborg Kommune ✌🤞" // plain text body
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => console.log(err));
};


/**
 * Created a user to the databse
 * Needs email
 * Needs password
 */
exports.createUser = (req, res, next) => {
  
  if(!emailHelper.validateEmail(req.body.email)){
    responseHelper.sendMessage(res,400,"Emailen er uglydig - skriv en gyldig email for at oprette en bruger")
  } else{

  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });

      user.save()
        .then(() => {
          responseHelper.sendMessage(res, 201, "Brugeren er blevet oprettet");
        })
        .catch(() => {
          responseHelper.sendMessage(res,500,"Denne email er allerede brugt prøv med en anden");
        });
    });
  }
};

// Tested //Refactored
/**
 * Verefies a user existince
 *  If user exist a token will be send with reponse
 * Needs email 
 * Needs password 
 */
exports.userLogin = (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        responseHelper.sendMessage(res, 401, "Denne bruger eksistere ikke");
      }
      fetchedUser = user;

      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        responseHelper.sendMessage(res, 401, "Adgangskoden er forkert");
      }
      const webToken =  userHelper.createToken(fetchedUser, "qazxswewqazxswedcxswqazxswqazxswewqazxswedcxswqazxsw", "2h");
      userHelper.sendUserData(res, 200, fetchedUser, webToken);
    })
    .catch(error => {
      responseHelper.sendMessage(res, 401, "Noget gik galt prøv igen senere");
    });
};

//Tested //Refactored
/**
 * Returns a list of all usersin the databse
 */
exports.getAllUsers = (req, res, next) => {
  User.find()
    .select("-password")
    .then(user => {
      res.status(200).json({
        user: user
      });
    })
    .catch(error => {
      responseHelper.sendMessage(res, 500, "Noget gik galt prøv igen senere");
    });
};

// Tested //Refactored
/**
 * Deletes a user from the databse
 * Makes sure you canoot delete yourself
 * Needs a moongose id (user)
 */
exports.deleteUser = (req, res, next) => {
  if (req.params.id === req.userData.userId) {
    responseHelper.sendMessage(res, 400, "Du kan ikke slette dig selv");
  } else {
    User.findByIdAndDelete(req.params.id)
      .then(() => {
        responseHelper.sendMessage(res, 200, "Brugeren er nu slettet");
      })
      .catch(() => {
        responseHelper.sendMessage(res, 500, "Noget gik galt prøv igen senere");
      });
  }
};

//Tested //Refactored
/**
 * Reset a password for a speciifc user 
 * New password wil be created by random string 
 * New password will be hashed by bcyptjs 
 * New password will be sent to user email
 */
exports.resetPassword = (req, res, next) => {
  const randomString = userHelper.createRandomPassword(6);
  bcrypt
    .hash(randomString, 10)
    .then(hash => {
      User.findOneAndUpdate(
        { email: req.body.email },
        { $set: { password: hash } },
        { new: false }
      )
        .then(() => {
          emailHelper.sendMail(req.body.email, "Ny adgangskode", randomString);
          responseHelper.sendMessage(res, 200, "En ny adgangskode er nu sendt");
        })
        .catch(() => {
          responseHelper.sendMessage(res, 500, "Noget gik galt prøv igen senere");
        });
    }).catch(() => {
      responseHelper.sendMessage(res, 500, "Noget gik galt prøv igen senere");
    })
  };

// Tested //Refactored
/**
 * Changes a password for a specifc user 
 * Needs an old password 
 * Needs a new password
 */
exports.changePassword = (req, res, next) => {
  User.findOne({ email: req.userData.email })
    .then(user => {
      if (!user) {
        responseHelper.sendMessage(res, 400, "Email er forkert prøv igen");
      }
      fetchedUser = user;

      return bcrypt.compare(req.body.oldPassword, user.password);
    })
    .then(result => {
      if (!result) {
        responseHelper.sendMessage(res, 400, "adgangskoden er forkert");
      }
      return bcrypt.hash(req.body.newPassword, 10).then(hash => {
        const updatedUser = {
          email: req.userData.email,
          password: hash
        };
       userHelper.updateUser(res,req.userData.userId,updatedUser);
      });
    });
};

