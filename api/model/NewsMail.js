const mongoose = require('mongoose'); 
const validator = require('mongoose-unique-validator');


const newsEmail = mongoose.Schema({
email: {type:String, required: true, unique:true}
}); 

newsEmail.plugin(validator);

module.exports = mongoose.model('NewsEmail', newsEmail); 