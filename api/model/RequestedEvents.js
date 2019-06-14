const mongoose = require('mongoose');
const Event = require('./Event');

const requestedEvent = mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId},
    reqEvent: {type: Object, requied:true}

})

module.exports = mongoose.model('RequestedEvent',requestedEvent); 