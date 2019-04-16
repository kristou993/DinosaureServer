const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var dinosaureSchema = new Schema({
    login: {type:String},
    password: {type:String},
    age: {type:Number},
    race: {type:String},
    nourriture: {type:String},
    dinosaures : { type : Array,"default" : []}
}, { collection: 'dinosaure' });


module.exports =mongoose.model('Dinosaure', dinosaureSchema);