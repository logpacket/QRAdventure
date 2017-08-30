var mongoose = require('mongoose');
var schema = mongoose.Schema;

var UserSchema =  new schema({
    username:{type:String},
    number:{type:Number},
    password:{type:String},
    solved:{type:Number},
    solved1:{type:Number}
});

var model=mongoose.model('User',UserSchema);
module.exports = model;