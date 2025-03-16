var mongoose = require('mongoose');
var Schema = mongoose.Schema;

userSchema = new Schema( {
	email: {
        type:String,
        required:true,
        unique:true
    },
	username:  {
        type:String,
        required:true
        // unique:true
    },
	password:  {
        type:String,
        required:true,
    },
    mobile_number:{
        type:String,
        required:true,
    }
}),

User = mongoose.model('User', userSchema);
module.exports = User;