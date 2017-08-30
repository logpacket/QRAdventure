var mongoose = require('mongoose');
var schema = mongoose.Schema;

var ProblemSchema = new schema({
    string:{type:String},
    pnumber:{type:Number},
    answer:{type:String}
});

var ProblemModel = mongoose.model('Problem',ProblemSchema);
module.exports = ProblemModel;