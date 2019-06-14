const mongoose = require('mongoose'); 


const contactPersonSchema = mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId},
    contactName: {type: String, required: true},
    contactPhone: {type: String, required: true},
    contactEmail: {type: String, required: true}
});

const addressSchema = mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId},
    city: {type: String, required:true}, 
    zipCode: {type: Number, required:true}, 
    line: {type: String, required: true},
 })

const eventSchema = mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId},
    name: {type:String, required:true},
    description: {type:String, required:true},
    cost: {type: Number, required:true},
    ageLimit: {type: Number, required: true},
    theme: {type: String, required:true},
    startTime: {type: String, required:true},
    endTime: {type: String, required: true},
    imagePath: {type: String, required:true},
    address: {type:addressSchema ,required:true},
    contactPerson: {type: contactPersonSchema, required :true},
    creator: {type: String, ref: "User", required:false},
    attendees: {type: [], required: false  }
})

module.exports = mongoose.model('Event',eventSchema);