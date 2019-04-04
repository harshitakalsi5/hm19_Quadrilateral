var mongoose =require('mongoose');
mongoose.connect('mongodb://localhost:27017/donorDatabase');
var Schema=mongoose.Schema;
var personSchema=new Schema({
        name:{type: String, required:true, unique: true},
		age: {type: Number},
		bloodgroup: {type: String},
		address: {type: String},
		password: {type: String},
		donation: {type: [String]},
		helpme: {type: [String]},
		});
	module.exports = mongoose.model('Person',personSchema);