const jwt = require('jsonwebtoken');
const User = require('../model/user');
const responseHelper = require('../../HeplerLogic/responses'); 

module.exports = (req,res,next) => {
    
    User.find().then(users => {
        if(users.length === 0) {
            next();
        }else {
            try{
                const token = req.headers.authorization.split(" ")[1]; 
                const decodedToken = jwt.verify(token,"qazxswewqazxswedcxswqazxswqazxswewqazxswedcxswqazxsw");
                req.userData = {email: decodedToken.email, userId: decodedToken.userId}
                 next();
             }
             catch(error) { 
                 responseHelper.sendMessage(res,401,"Adgang mislykkedes prøv igen")
             }
        }
    }).catch(() => {
        responseHelper.sendMessage(res,401,"Noget gik galt prøv igen senere")

    })
}

