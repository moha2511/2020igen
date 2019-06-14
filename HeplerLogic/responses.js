
/**
 * Returns a respnse containing a statuscode and a message
 * @param {HTTP Response from an http request} res 
 * @param {HTTP status code} statusCode 
 * @param {A message to be sent together with the response} message 
 */
 exports.sendMessage = (res, statusCode, message)  =>{
    return res.status(statusCode).json({
      message: message
    });
  }