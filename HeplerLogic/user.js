const User = require("../api/model/user");
const token = require("jsonwebtoken");
const responseHelper = require("../HeplerLogic/responses");

/**
 * Created a random string 
 * @param {Specifies the length of the password} length 
 */
exports.createRandomPassword = (length) => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  /**
   * Returns a JWT 
   * @param {User data put in the token} user 
   * @param {The secret of the token} secret 
   * @param {The time for the token to expire define in h ("2h")} expiresIn 
   */
  exports.createToken = (user, secret, expiresIn)  => {
    return token.sign({ email: user.email, userId: user._id }, secret, {
      expiresIn: expiresIn
    });
  }
  /**
   * Retusn a promise based on HTTP Response
   * @param {HttP reponse} res 
   * @param {HTTP statuscode} statusCode 
   * @param {An user baed on user schema} user 
   * @param {A JWT} token 
   */
  exports.sendUserData = (res, statusCode, user, token) => {
    return res.status(statusCode).json({
      token: token,
      expiresIn: 3600,
      userId: user._id
    });
  }
  /**
   * Updates a user in the database 
   * @param {HTTP Response} res 
   * @param {Id of user to be updated} userId 
   * @param {The updated user} updatedUser 
   */
   exports.updateUser = (res,userId, updatedUser) => {
  
    User.updateOne({ _id: userId }, updatedUser)
    .then(() => {
      responseHelper.sendMessage(res, 200, "Adganskoden er nu ændret");
    })
    .catch(() => {
     responseHelper.sendMessage(res, 500, "Noget gik galt prøv igen senere");
    });
  }
  